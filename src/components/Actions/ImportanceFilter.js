import React from 'react'
import './style.css'
import 'bootstrap/dist/css/bootstrap.css';

class ImportanceFilter extends React.Component {
    render () {
        return(
            <div>
                <hr/>
                <button className="dropdown-item" type="button" onClick={() => {this.filterItems('Срочно')}}>Срочно</button>
                <button className="dropdown-item" type="button" onClick={() => {this.filterItems('Нейтрально')}}>Нейтрально</button>
                <button className="dropdown-item" type="button" onClick={() => {this.filterItems('Купить по возможности')}}>Купить по возможности</button>
                <hr/>
            </div>
        )
    }

    filterItems = (importance) => {
        var array = this.props.items.filter(item => item.importance === importance);
        this.props.getFilteredItems(importance, array, true);
    }
}

export default ImportanceFilter