import React from 'react'
import './style.css'
import CategoryFilter from './CategoryFilter'
import ImportanceFilter from './ImportanceFilter'
import 'bootstrap/dist/css/bootstrap.css';

class Actions extends React.Component {
    state = {
        showCtgFltr: false,
        showImprtFltr: false
    }

    render () {
        const {items, list, lists} = this.props
        return(
            <div className="btn-group dropleft actions">
                <button type="button" className="btn btn-dark dropdown-toggle btn-lg" id="action-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Actions
                </button>
                <div className="dropdown-menu noclose" aria-labelledby="dropdownMenu">
                    <button className="dropdown-item" type="button" onClick={() => {this.sortItemsAlphabet(items, list)}}>Сортировка содержимого списка в алфавитном порядке</button>
                    <button className="dropdown-item" type="button" onClick={() => {this.sortListsAlphabet(lists)}}>Сортировка списков в алфавитном порядке</button>
                    <button className="dropdown-item" type="button" onClick={() => {this.getExtraMenu('category')}}>Найти по категории...</button>
                    {this.state.showCtgFltr ? <CategoryFilter items={items} getFilteredItems={this.getFilteredItems}/> : null}
                    <button className="dropdown-item" type="button" onClick={() => {this.getExtraMenu('importance')}}>Найти по важности...</button>
                    {this.state.showImprtFltr ? <ImportanceFilter items={items} getFilteredItems={this.getFilteredItems}/> : null}
                    <button className="dropdown-item" type="button" onClick={() => {this.getNotBoughtItems(items)}}>Еще не купленные товары</button>
                </div>
            </div>
        )
    }

    sortItemsAlphabet = (listItems, reqList) => {
        if (this.props.filtered !== true){
            var array = listItems.filter(item => item.list === reqList);
            array.sort((a,b) => (a.item > b.item) ? 1 : ((b.item > a.item) ? -1 : 0));
            this.props.getSortedItems(array);
        }
    }

    sortListsAlphabet = (lists) => {
        var array = lists;
        array.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
        this.props.getSortedItems(array);
    }

    getExtraMenu = (currentState) => {
        switch(currentState){
            case 'category':
                if (this.state.showCtgFltr === true) {
                    this.setState({showCtgFltr: false})
                } else {
                    this.setState({showCtgFltr: true})
                }
                break;
            default:
            if (this.state.showImprtFltr === true) {
                this.setState({showImprtFltr: false})
            } else {
                this.setState({showImprtFltr: true})
            }
            break;
        }
    }

    getFilteredItems = (attribute,filteredArray, filter) => {
        this.props.getfilteredItems(filteredArray, filter);
        this.props.getRequiredList(attribute);
    }

    getNotBoughtItems = (items) => {
        const filteredArray = items.filter(item => item.checked === false);
        this.props.getfilteredItems(filteredArray, true);
        this.props.getRequiredList('Еще не купленные товары');
    }
}

export default Actions