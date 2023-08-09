import logo from './images/UBC_logo-big.png';
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="navbar">
            <div>
                <Link to="/">
                    <div className="chartCard">
                        <img src={logo} className="navbar-logo" alt="logo"/>
                        <h1>&nbsp;&nbsp;Parking Dashboard</h1>
                    </div>  
                </Link>
            </div>
            <div className="links">
                {/* <Link to="/">Home</Link> */}
                {/* <Link to="/Utilization">Utilization</Link> */}
                <Link to="/TotalUsage">Total Usage</Link>
                <Link to="/PeakUsagePerDay">Peak Usage Per Day</Link>
                <Link to="/Forecasting">Forecasting</Link>
                <Link to="/AvgTimeSpent">Average Time Spent</Link>
            </div>
        </nav>
    );
}
 
export default Navbar;