import pyodbc
# import sqlalchemy
import datetime

class DatabaseHandler:
    CONNECTION_STRING = r'Driver=SQL Server;Server=BIS-SQLPDAT-P01;Database=CAPSTONE;Trusted_Connection=yes;'
    def __init__(self, conn_str=None):
        self._connection = pyodbc.connect(conn_str if conn_str else self.CONNECTION_STRING)
        self._cursor = self._connection.cursor()

    def get(self, from_date, to_date, parking_lot=None):
        req = f'SELECT * FROM [CAPSTONE].[dbo].[parkingDurations] WHERE '
        if from_date:
            req += f"fromTime >= '{from_date}'"
        if to_date:
            req += f" AND toTime <= '{to_date}'"
        if parking_lot:
            req += f"AND parkade='{parking_lot}'"
        print(req)
        self._cursor.execute(req)
        rows = self._cursor.fetchall()
        return rows

    def close(self):
        self._connection.close()
        