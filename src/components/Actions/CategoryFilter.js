import React from 'react'
import './style.css'
import 'bootstrap/dist/css/bootstrap.css';

class CategoryFilter extends React.Component {
    render () {
        return(
            <div>
                <hr/>
                <button className="dropdown-item" type="button" onClick={() => {this.filterItems('Одежда')}}>Одежда</button>
                <button className="dropdown-item" type="button" onClick={() => {this.filterItems('Еда')}}>Еда</button>
                <button className="dropdown-item" type="button" onClick={() => {this.filterItems('Бытовая химия')}}>Бытовая химия</button>
                <button className="dropdown-item" type="button" onClick={() => {this.filterItems('Косметика')}}>Косметика</button>
                <button className="dropdown-item" type="button" onClick={() => {this.filterItems('Техника')}}>Техника</button>
                <button className="dropdown-item" type="button" onClick={() => {this.filterItems('Другое')}}>Другое</button>
                <hr/>
            </div>
        )
    }

    filterItems = (category) => {
        var array = this.props.items.filter(item => item.category === category);
        this.props.getFilteredItems(category, array, true);
    }
}

export default CategoryFilter