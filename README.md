# PB19 -- Data Visualization and Dashboard Development

## FME
The FME workflow is in /fme/count_unique_plates.fmw. You can open this workflow file with FME and then run the workflow which writes to the consolidated database. 

### Setup
1. Install the 2022.2 version of FME: https://engage.safe.com/support/downloads/
2. Obtain an FME lisence

### How to run
1. Edit the query to obtain the desired date range. This will determine how much data is fetched and formatted.
2. Click the run button to start the workflow and wait for completion. 

## Website
The website frontend can be found under /website/frontend and the backend code can be found in /website/backend.

### Setup
For the frontend:
1. Install node (version >= 16): https://nodejs.org/en/download
2. In a command line, run `npm install`

For the backend:
1. Install Python (version >= 3.6): https://www.python.org/downloads/
2. Run `pip install -r requirements.txt`

### How to run
For the frontend:
1. Run `npm start`
2. Go to http://localhost:3000/

For the backend:
1. Run `python run_server_debug.py`

After completing the steps above, you should have a functioning website at http://localhost:3000/

## Forecasting
The forecasting code can be found in /forecasting. The model we trained can be found in /forecasting/saved_model. We use the forecasting code on the website backend and it is fully integrated so that there is no need to modify the forecasting code, unless you are making modifications to the model itself.
