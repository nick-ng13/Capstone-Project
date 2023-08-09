import axios from 'axios'

const base_route = "http://localhost:8080";

function get(route, params) {
    const url = base_route + route;
    return axios.get(url, params);
}

function post(route, params) {
    const url = base_route + route;
    return axios.post(url, params);
}


export default class ParkingApi {
    static async getAverageTime(date, parkade=null) {
        const data = await get("/average_time", {params: {date, parkade}}); // {result: average_time}
        return data?.data;
    }

    static async getTotalUsage(date, parkade=null) {
        const data = await get("/total_usage", {params: {date, parkade}}); // {result: {hour: amount}}
        return data?.data;
    }
    
    static async getPeakUsagePerDay(date, parkade) {
        const data = await get("/peak_usage", {params: {toDate: date, fromDate: date, parkade}}); // {result: {hour: amount}}
        return data?.data;
    }

    static async getForecast(data, num_of_days) {
        const ret = await post("/recursive_forecast", {data, num_of_days}); // {result: {List[amount]}}
        return ret?.data;  
    }

}