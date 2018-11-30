import React from 'react'
import './style.css';
import 'bootstrap/dist/css/bootstrap.css';

class AdditionalPanel extends React.Component{
    render(){
        return(
            <div className="list-group-item list-group-item-dark" style={{zIndex: '3'}}>
                <div>{this.props.item.price}</div>
                <div>{this.props.item.date.toString()}</div>
                <span class="badge badge-secondary">{this.props.item.category}</span>
                <span class="badge badge-secondary">{this.props.item.importance}</span>
            </div>
        )
    }
}

export default AdditionalPanel