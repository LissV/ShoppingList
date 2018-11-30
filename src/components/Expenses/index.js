import React from 'react'
import './style.css'
import 'bootstrap/dist/css/bootstrap.css';

class Expenses extends React.Component{
    render(){
        return(
            <div>
                <div className="expenses">Потрачено на текущий список: <div style={{float: 'right'}}>{this.countCurrentList()}</div></div>
                <hr/>
                <div>Потрачено за все время: <div style={{float: 'right'}}>{this.countAllLists()} </div> </div>    
            </div>
        )
    }

    countCurrentList = () => {
        var sum = 0;
        if (this.props.filtered === true) {
            this.props.filteredItems.forEach(item => {
                sum = sum + Number(item.price)
            });
        } else {
            if (this.props.sortedItems.length > 0 && this.props.sortedItems.every(item => item.list === this.props.requiredList)){
                this.props.sortedItems.forEach(item => {
                    sum = sum + Number(item.price)
                });
            } else {
                this.props.items.filter(item => item.list === this.props.requiredList).forEach(item => {
                    sum = sum + Number(item.price)
                });
            }
        }
        return sum
    }
    
    countAllLists = () => {
        var sum = 0;
        this.props.items.forEach(item => {
            sum = sum + Number(item.price)
        });
        return sum
    }
}

export default Expenses