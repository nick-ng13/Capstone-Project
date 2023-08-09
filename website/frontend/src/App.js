import './App.css';
import Navbar from './Navbar';
import Home from './Home';
import Utilization from './Utilization';
import Forecasting from './Forecasting';
import EVUtilization from './EVUtilization';
import AverageTimeSpent from './AverageTimeSpent';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TotalUsage from './TotalUsage';
import PeakUsagePerDay from './PeakUsagePerDay';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/Utilization">
              <Utilization />
            </Route>
            <Route path="/EVUtilization">
              <EVUtilization />
            </Route>
            <Route path="/TotalUsage">
              <TotalUsage />
            </Route>
            <Route path="/PeakUsagePerDay">
              <PeakUsagePerDay />
            </Route>
            <Route path="/Forecasting">
              <Forecasting />
            </Route>
            <Route path="/AvgTimeSpent">
              <AverageTimeSpent />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
