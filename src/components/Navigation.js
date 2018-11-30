import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';

class Nav extends React.Component {
    render () {
        return(
            <nav className="navbar navbar-dark bg-primary text-white">
                <h2 className="nav-title">
                    Shopping List
                </h2>
                <div className="nav-title">
                  {this.getDate()}
                </div>
            </nav>
        )
    }

    getDate = () => {
        var date = new Date();
        var weekday = date.getDay();
        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();

        var weekdayToString, monthToString;

        switch(weekday){
            case 0:
                weekdayToString = 'Sun'
                break;
            case 1:
                weekdayToString = 'Mon'
                break;
            case 2:
                weekdayToString = 'Tue'
                break;
            case 3:
                weekdayToString = 'Wed'
                break;
            case 4:
                weekdayToString = 'Thu'
                break;
            case 5:
                weekdayToString = 'Fri'
                break;
            default:
                weekdayToString = 'Sat'
                break;
        }

        switch(month){
            case 0:
                monthToString = 'Jan'
                break;
            case 1:
                monthToString = 'Feb'
                break;
            case 2:
                monthToString = 'Mar'
                break;
            case 3:
                monthToString = 'Apr'
                break;
            case 4:
                monthToString = 'May'
                break;
            case 5:
                monthToString = 'Jun'
                break;
            case 6:
                monthToString = 'Jul'
                break;
            case 7:
                monthToString = 'Aug'
                break;
            case 8:
                monthToString = 'Sep'
                break;
            case 9:
                monthToString = 'Oct'
                break;
            case 10:
                monthToString = 'Nov'
                break;
            default:
                monthToString = 'Dec'
                break;
        }
        
        return  <h4>{weekdayToString + ' ' + day + ' ' + monthToString + ' ' + year}</h4> 
    }
}

export default Nav