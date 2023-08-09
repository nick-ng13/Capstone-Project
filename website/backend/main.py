import uvicorn
import numpy as np
import pandas as pd
import joblib
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
from datetime import datetime, timedelta
from typing import List
import pyodbc
from DatabaseHandler import DatabaseHandler
from custom_types import Entry_data, Entry_list

app = FastAPI()
lgbm_model = joblib.load("saved_model/tree_model.joblib") # load the saved ML model

# Firebase initialization
# Use the application default credentials

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/test")
async def Test(val: int):
    print(val)
    return {"status" : "success"}

@app.get("/get_data")
async def get_data(from_date:str, to_date:str, parking_lot: str):
    db = DatabaseHandler()
    rows = db.get(from_date=from_date, to_date=to_date, parking_lot=parking_lot)
    db.close()
    rows = [list(e) for e in rows]
    return rows


def get_raw_data(to_date, from_date, parkade):
    def str_to_date(obj):
        format = '%m/%d/%Y %H:%M'
        try:
            return datetime.strptime(obj, format)
        except ValueError:
            return obj

    def format_date_str(date):
        format = '%Y-%m-%d %H:%M'
        date_obj = datetime.strptime(date, format)
        format = '%m/%d/%Y %H:%M'
        return date_obj.strftime(format)

        
    db = DatabaseHandler()
    result = db.get(from_date=format_date_str(from_date), 
                    to_date=format_date_str(to_date), 
                    parking_lot=parkade)
    db.close()
    
    raw_data = [list(e) for e in result]
    return [[str_to_date(i) for i in e] for e in raw_data]

def get_raw_data_day(date, parkade):
    from_date = date + " 00:00"
    to_date = date + " 23:59"
    return get_raw_data(to_date, from_date, parkade)

def strip_time(date: datetime):
    return date.strftime("%Y-%m-%d")

def increment_date(date: str):
    format = "%Y-%m-%d"
    date = datetime.strptime(date, format)
    date += timedelta(days=1)
    return date.strftime(format)

"""
TODO: MAKE THE QUERY BE OR AND THEN FIX THE STRIP_TIME
"""

@app.get("/average_time")
async def get_average_time(date: str):
    parkade = None
    raw_data = get_raw_data_day(date, parkade)
    res = dict()
    counts = dict()
    
    for row in raw_data:
        [from_date, to_date, _, parkade] = row
        date = strip_time(from_date)
        if (to_date - from_date).total_seconds() / 3600 < 0:
            continue
        if date not in res:
            res[date] = dict()
            counts[date] = dict()
        if parkade not in res[date]:
            res[date][parkade] = 0
            counts[date][parkade] = 0
        res[date][parkade] += (to_date - from_date).total_seconds() / 3600
        counts[date][parkade] += 1 

    for k1, v1 in res.items():
        for p in v1.keys():
            v1[p] /= counts[k1][p]

    return res


@app.get("/total_usage")
async def get_total_usage(date: str, parkade: str = None):
    raw_data = get_raw_data_day(date, parkade)

    res = dict()
    counts = dict()
    
    for row in raw_data:
        [from_date, to_date, plate, parkade] = row
        date = strip_time(from_date)
        if date not in res:
            res[date] = dict()
        if parkade not in res[date]:
            res[date][parkade] = set()
        res[date][parkade].add(plate)

    for k1, v1 in res.items():
        for p, s in v1.items():
            v1[p] = len(s)

    return res

@app.get("/peak_usage")
async def get_peak_usage_per_day(toDate: str, fromDate: str, parkade: str):
    def one_day_peak(day):
        raw_data = get_raw_data_day(day, parkade)

        v = list()
        for row in raw_data:
            [from_date, to_date, plate, _] = row
            v.append((from_date, 1))
            v.append((to_date, -1))
        curr_overlap = 0
        max_overlap = 0
        max_hour = ""
        for e in sorted(v):
            curr_overlap += e[1]    
            if curr_overlap > max_overlap:
                max_overlap = curr_overlap
                max_hour = e[0].hour

        return {
            parkade: {
                "max_hour": max_hour,
                "max_overlap": max_overlap
            }
        }
    res = dict()
    date = fromDate
    for i in range(5):
        res[date] = one_day_peak(date)
        date = increment_date(date)

    return res   


@app.post("/next_day_forecast") 
# Assuming all the input data is historical data 
async def get_next_day_forecast(raw_data: Entry_data):
    data = raw_data.data
    if len(data) == 0:
        return []
    if any(set(d.keys()) != set(["parkade", "Timestamp", "total_count"]) for d in data):
        raise HTTPException(status_code=400, detail="Invalid input") 
    
    # add an empty entry for the next day
    add_new_entry(0, data)
    
    df = create_features(data)
    prediction = lgbm_model.predict(df)
    return round(list(prediction.tolist())[-1])

@app.post("/recursive_forecast")
async def get_forecast_upto(raw_data: Entry_list):
    data, num_of_days = raw_data.data, raw_data.num_of_days
    if len(data) == 0:
        return []
    if any(set(d.keys()) != set(["parkade", "Timestamp", "total_count"]) for d in data):
        raise HTTPException(status_code=400, detail="Invalid input") 
    
    res = data
    add_new_entry(0, res)
    
    for _ in range(num_of_days):
        df = create_features(res)
        last_prediction = lgbm_model.predict(df)[-1]
        # set the prediction for the current day
        res[-1]["total_count"] = round(last_prediction)
        # add the new entry to res
        add_new_entry(last_prediction, res)
    return res[(-num_of_days - 1):-1]

def add_new_entry(new_count, data):         
    new_entry = dict()
    new_date = (pd.to_datetime(data[-1]["Timestamp"]) + pd.DateOffset(days=1)).date()
    new_entry["Timestamp"] = str(new_date)
    new_entry["total_count"] = new_count 
    new_entry["parkade"] = data[-1]["parkade"]
    
    data.append(new_entry)
    return data
    
def create_features(data): 
    def get_season(month):
        SUMMER_MONTHS = [6, 7, 8] 
        SPRING_MONTHS = [3, 4, 5]
        WINTER_MONTHS = [12, 1, 2]
        FALL_MONTHS = [9, 10, 11]
        if month in WINTER_MONTHS:
            return "Winter"
        elif month in FALL_MONTHS:
            return "Autumn"
        elif month in SUMMER_MONTHS:
            return "Summer"
        else:
            return "Spring"
    
    def get_school_term(month):
        SUMMER_TERM = [5, 6, 7, 8]
        WINTER_TERM = [9, 10, 11, 12]
        SPRING_TERM = [1, 2, 3, 4]

        if month in SUMMER_TERM:
            return "Summer_term"
        elif month in WINTER_TERM:
            return "Winter_term"
        else:
            return "Spring_term"
        
    def create_lag_df(df, lag, cols):
        return df.assign(
            **{f"{col}_{n}_days_ago": df[col].shift(n) for n in range(1, lag + 1) for col in cols}
        )

    new_df = pd.DataFrame(data)
    new_df['year'] = pd.DatetimeIndex(new_df['Timestamp']).year
    new_df['month'] = pd.DatetimeIndex(new_df['Timestamp']).month
    new_df['day'] = pd.DatetimeIndex(new_df['Timestamp']).day
    new_df['day_of_week'] = pd.DatetimeIndex(new_df['Timestamp']).day_name()
    new_df = new_df.assign(season=new_df["month"].apply(get_season))
    new_df = new_df.assign(term=new_df["month"].apply(get_school_term))
    new_df = create_lag_df(new_df, 7, ['total_count'])
    
    return new_df