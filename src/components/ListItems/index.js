import React from 'react'
import './style.css'
import Octicon, {Plus} from '@githubprimer/octicons-react'
import FormForItems from './FormForItems'
import CheckButton from './CheckButton'
import 'bootstrap/dist/css/bootstrap.css'
import EditPanel from './EditPanel';
import { Droppable, Draggable} from 'react-beautiful-dnd';

var contentItemsn

class ListItems extends React.Component{
    state = {
        showForm: false,
        showEdForm: false
    }

    render () {
        const {items, list, sortedItems} = this.props;
        if (this.props.filtered === true) {
            contentItemsn = this.props.filteredItems.map((item, index) => (
                <Draggable key={item.id} index={index} draggableId={item.id}>
                    {(provided) => (
                        <div key = {item.id} className="list-group-item list-group-item-dark item" ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}>
                        <div className="d-inline"><CheckButton getFlag={this.getFlag} item={item}/></div>
                        <div className="d-inline"><EditPanel item={item} deleteItem={this.deleteItem} items={this.props.items} editItems={this.editItems}
                        getFormState={this.getFormState} edForm={this.state.showEdForm}/></div>
                        <div className="d-inline" style={{textAlign: 'center'}}>
                            <div className="d-block">{item.item}</div>
                            <div className="d-block">Цена: {item.price}</div>
                        </div> 
                        <div className="d-block" style={{textAlign: 'center'}}>
                            <div className="d-inline" style={{marginRight: '1%'}}>{this.getCategory(item.category)}</div>
                            <div className="d-inline">{this.getImportance(item.importance)}</div>
                        </div>  
                        {this.state.showEdForm ?  <hr/> : null}
                        {this.state.showEdForm ? <FormForItems currentItem={item} editItems={this.editItems} item={item.item} requiredList={list} 
                        price={item.price} category={item.category} importance={item.importance} action={"edit"}/> : null}
                    </div>
                    )}
                </Draggable>
            ))
        } else {
            if (sortedItems.length > 0 && sortedItems.every(item => item.list === list)) {
                contentItemsn = sortedItems.map((item, index) => (  
                <Draggable key={item.id} index={index} draggableId={item.id}>
                    {(provided) => (
                        <div key = {item.id} className="list-group-item list-group-item-dark item" ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}>
                        <div className="d-inline"><CheckButton getFlag={this.getFlag} item={item}/></div>
                        <div className="d-inline"><EditPanel item={item} deleteItem={this.deleteItem} items={this.props.items} editItems={this.editItems}
                        getFormState={this.getFormState} edForm={this.state.showEdForm}/></div>
                        <div className="d-inline" style={{textAlign: 'center'}}>
                            <div className="d-block">{item.item}</div>
                            <div className="d-block">Цена: {item.price}</div>
                        </div> 
                        <div className="d-block" style={{textAlign: 'center'}}>
                            <div className="d-inline" style={{marginRight: '1%'}}>{this.getCategory(item.category)}</div>
                            <div className="d-inline">{this.getImportance(item.importance)}</div>
                        </div>  
                        {this.state.showEdForm ?  <hr/> : null}
                        {this.state.showEdForm ? <FormForItems currentItem={item} editItems={this.editItems} item={item.item} requiredList={list} 
                        price={item.price} category={item.category} importance={item.importance} action={"edit"}/> : null}
                    </div>
                    )}
                </Draggable>
                ))
            } else {
                contentItemsn = items.filter(item => item.list === list).map((item, index) => (  
                <Draggable key={item.id} index={index} draggableId={item.id}>
                    {(provided) => (
                        <div key = {item.id} className="list-group-item list-group-item-dark item" ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}>
                        <div className="d-inline"><CheckButton getFlag={this.getFlag} item={item}/></div>
                        <div className="d-inline"><EditPanel item={item} deleteItem={this.deleteItem} items={this.props.items} editItems={this.editItems}
                        getFormState={this.getFormState} edForm={this.state.showEdForm}/></div>
                        <div className="d-inline" style={{textAlign: 'center'}}>
                            <div className="d-block">{item.item}</div>
                            <div className="d-block">Цена: {item.price}</div>
                        </div> 
                        <div className="d-block" style={{textAlign: 'center'}}>
                            <div className="d-inline" style={{marginRight: '1%'}}>{this.getCategory(item.category)}</div>
                            <div className="d-inline">{this.getImportance(item.importance)}</div>
                        </div>  
                        {this.state.showEdForm ?  <hr/> : null}
                        {this.state.showEdForm ? <FormForItems currentItem={item} editItems={this.editItems} item={item.item} requiredList={list} 
                        price={item.price} category={item.category} importance={item.importance} action={"edit"}/> : null}
                    </div>
                    )}
                </Draggable>
                ))
            }
        } 
        return (
            <div className="list-group">
                {this.props.list !== '-' && this.props.filtered !== true 
                ? <button type="button" onClick={this.onButtonClick} className="list-group-item list-group-item-dark">
                    <div><Octicon icon={Plus} size='medium'/></div>
                </button> : 
                <button type="button" onClick={this.onButtonClick} className="list-group-item list-group-item-dark" disabled>
                    <div className="d-inline"><Octicon icon={Plus} size='medium'/></div>
                </button>  
                }
                {this.state.showEdForm ?  <hr/> : null}  
                {this.state.showForm ? <FormForItems addNewItem={this.addNewItem} item={''} requiredList={list} 
                price={0} category={"Другое"} importance={"Нейтрально"} action={"add"}/> : null}
                <Droppable droppableId="droppable">
                    { (provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}> 
                            {contentItemsn} 
                            {provided.placeholder}
                        </div>
                    )}          
                </Droppable>
               
            </div>
        )
    }

    onButtonClick = () => {
        if (this.state.showForm === true){
            this.setState({showForm: false})
        } else{
            this.setState({showForm: true})
        }
    }

    onItemClick = () => {
        if (this.state.showAdP === true){
            this.setState({showAdP: false})
        } else{
            this.setState({showAdP: true})
        }
    }

    addNewItem = (vissible,item,category,importance,price) => {
        this.setState({showForm: vissible})
        var newItem = {
            "id": this.props.indexItem + 1, 
            "list": this.props.list,
            "item": item,
            "checked": false,
            "category": category,
            "importance": importance,
            "price": Number(price),
            "date": new Date()
        }
        
        this.props.items.push(newItem)
        this.props.getNewItems(this.props.items)

        if(this.props.sortedItems.length > 0 && this.props.sortedItems.every(item => item.list === this.props.list)){
            this.props.sortedItems.push(newItem)
            this.props.getSortedItems(this.props.sortedItems)
        }

        this.props.getIndexItem(this.props.indexItem + 1)
    }

    deleteItem = (item) => {
        var index = this.props.items.indexOf(item);
        this.props.items.splice(index,1);
        this.props.getNewItems(this.props.items)

        if(this.props.sortedItems.length > 0 && this.props.sortedItems.every(item => item.list === this.props.list)){
            index = this.props.sortedItems.indexOf(item);
            this.props.sortedItems.splice(index,1);
            this.props.getSortedItems(this.props.sortedItems)
        }

        if(this.props.filtered === true){
            index = this.props.filteredItems.indexOf(item);
            this.props.filteredItems.splice(index,1);
            this.props.getfilteredItems(this.props.filteredItems, this.props.filtered)
        }
    }

    editItems = (currentItem,item,category,importance,price) => {
        this.setState({showEdForm: false})
        var editItem = {
            "id": currentItem.id,
            "list": currentItem.list,
            "item": item,
            "checked": currentItem.checked,
            "category": category,
            "importance": importance,
            "price": Number(price),
            "date": new Date()
        }

        var index = this.props.items.indexOf(currentItem);
        this.props.items[index] = editItem;
        this.props.getNewItems(this.props.items);

        if(this.props.sortedItems.length > 0 && this.props.sortedItems.every(item => item.list === this.props.list)){
            index = this.props.sortedItems.indexOf(currentItem);
            this.props.sortedItems[index] = editItem;
            this.props.getSortedItems(this.props.sortedItems)
        }

        if(this.props.filtered === true){
            index = this.props.filteredItems.indexOf(currentItem);
            this.props.filteredItems[index] = editItem;
            this.props.getfilteredItems(this.props.filteredItems, this.props.filtered)
        }
    }

    getFlag = (flag, item) => {
        flag = !flag
        var editItem = {
            "id": item.id,
            "list": item.list,
            "item": item.item,
            "checked": flag,
            "category": item.category,
            "importance": item.importance,
            "price": item.price,
            "date": item.date
        }

        var index = this.props.items.indexOf(item);
        this.props.items[index] = editItem;
        this.props.getNewItems(this.props.items);

        if(this.props.sortedItems.length > 0 && this.props.sortedItems.every(item => item.list === this.props.list)){
            index = this.props.sortedItems.indexOf(item);
            this.props.sortedItems[index] = editItem;
            this.props.getSortedItems(this.props.sortedItems)
        }

        if(this.props.filtered === true){
            index = this.props.filteredItems.indexOf(item);
            this.props.filteredItems[index] = editItem;
            this.props.getfilteredItems(this.props.filteredItems, this.props.filtered)
        }
    }

    getFormState = (formState) => {
        this.setState({showEdForm: formState})
    }

    getCategory = (category) => {
        var categoryLabel;

        switch(category){
            case 'Одежда':
                categoryLabel = <span className="badge badge-warning">{category}</span>;
                break;
            case 'Еда':
                categoryLabel = <span className="badge badge-success">{category}</span>;
                break;
            case 'Бытовая химия':
                categoryLabel = <span className="badge badge-info">{category}</span>;
                break;
            case 'Косметика':
                categoryLabel = <span className="badge badge-dark">{category}</span>;
                break;
            case 'Техника':
                categoryLabel = <span className="badge badge-primary">{category}</span>;
                break;
            default:
                categoryLabel = <span className="badge badge-secondary">{category}</span>;
                break;
        }

        return categoryLabel
    }

    getImportance = (importance) => {
        var importanceLabel;

        switch(importance){
            case 'Срочно':
                importanceLabel = <span className="badge badge-danger">{importance}</span>;
                break;
            case 'Купить по возможности':
                importanceLabel = <span className="badge badge-success">{importance}</span>;
                break;
            default:
                importanceLabel = <span className="badge badge-secondary">{importance}</span>;
                break;
        }

        return importanceLabel
    }
}

export default ListItems