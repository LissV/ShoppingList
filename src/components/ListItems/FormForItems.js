import React from 'react'
import './style.css'
import 'bootstrap/dist/css/bootstrap.css';

class FormForItems extends React.Component{
    state = {
        enableButton: false,
        list: this.props.requiredList,
        item: this.props.item,
        price: this.props.price,
        category: this.props.category,
        importance: this.props.importance,
        action: this.props.action,
        validItem: 0,
        validPrice: 0
    }
    
    render(){
        const vissible = false
        const button = this.state.enableButton === true ? <button type="button" className="btn btn-primary" onClick={() => this.sendForm(vissible)}>Добавить</button> :
        <button type="button" className="btn btn-primary" onClick={() => this.sendForm(vissible)} disabled>Добавить</button>
        return(
            <form style={{marginLeft: '1%', marginRight: '1%', marginBottom: '1%'}}>
                <div className="form-group">
                    <label htmlFor="item">Нужно купить</label>
                    <input name="item" type="text" className="form-control" id="exampleInputEmail1" value={this.state.item} onChange={this.handleUserInput} onFocus={this.checkCurrentValue} placeholder="Введите название товара"/>
                    {this.state.validItem === -1 ? <div className="alert alert-danger" role="alert">
                         Введите название товара!
                    </div> : null}
                </div>
                <div className="form-group">
                    <label htmlFor="price">Цена</label>
                    <input name="price" type="text" className="form-control" value={this.state.price} onChange={this.handleUserInput} onFocus={this.checkCurrentValue} placeholder="Введите цену товара"/>
                    {this.state.validPrice === -1 ? <div className="alert alert-danger" role="alert">
                         Введите цену - число!
                    </div> : null}
                </div>
                <div className="form-group">
                <label htmlFor="category">Категория</label>
                    <select name="category" className="form-control form-control-sm" onChange={this.handleUserInput}>
                        <option value="Другое">Другое</option>
                        <option value="Одежда">Одежда</option>
                        <option value="Еда">Еда</option>
                        <option value="Бытовая химия">Бытовая химия</option>
                        <option value="Косметика">Косметика</option>
                        <option value="Техника">Техника</option>
                    </select>
                </div>
                <div className="form-group">
                <label htmlFor="importance">Важность</label>
                    <select name="importance" className="form-control form-control-sm" onChange={this.handleUserInput}>
                        <option value="Нейтрально">Нейтрально</option>
                        <option value="Срочно">Срочно</option>
                        <option value="Купить по возможности">Купить по возможности</option>
                    </select>
                </div>
                {button}
            </form>
        )
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value}, () => {this.validateField(name, value)});
    }

    sendForm = (formState) => {
        if(this.state.action === "add"){
            this.props.addNewItem(formState, this.state.item, this.state.category, this.state.importance, this.state.price)
        } else {
            this.props.editItems(this.props.currentItem, this.state.item, this.state.category, this.state.importance, this.state.price)
        }  
    }

    checkCurrentValue = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({[name]: value}, () => {this.validateField(name, value)});
    }

    validateField = (name, value) => {
        switch(name){
            case 'item':
                if (value !== ''){
                    this.setState({validItem: 1})
                } else {
                    this.setState({validItem: -1})
                }
                break;
            case 'price':
                if (value !== '' && !isNaN(Number(value)) && (Number(value)) >= 0){
                    this.setState({validPrice: 1})
                } else {
                    this.setState({validPrice: -1})
                }
                break;
            default:
                break;
        }
        this.validateForm(this.state.validItem, this.state.validPrice)
    }

    validateForm = (validItem, validPrice) =>{
        if (validItem === 1 && validPrice === 1) {
            this.setState({enableButton: true})
        } else{
            this.setState({enableButton: false})
        }
    }
}

export default FormForItems