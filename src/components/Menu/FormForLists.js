import React from 'react'
import './style.css'
import 'bootstrap/dist/css/bootstrap.css';

class FormForLists extends React.Component{
    state = {
        enableButton: false,
        list: this.props.list,
        action: this.props.action,
        validList: 0

    }

    render(){
        const vissible = false
        const button = this.state.enableButton === true ? <button type="button" className="btn btn-primary" onClick={() => this.sendForm(vissible)} style={{marginLeft: '20%'}}>Добавить</button> :
        <button type="button" className="btn btn-primary" onClick={() => this.sendForm(vissible)} disabled style={{marginLeft: '20%'}}>Добавить</button>
        return(
            <form style={{marginLeft: '1%', marginRight: '1%'}}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Название списка</label>
                    <input type="text" className="form-control" value={this.state.list} onChange={this.handleUserInput} onFocus={this.checkCurrentValue} placeholder="Введите название списка"/>
                    {this.state.validList === -1 ? <div className="alert alert-danger" role="alert">
                         Введите название листа!
                    </div> : null}
                </div>
                {button}
            </form>
        )
    }

    handleUserInput = (e) => {
        const value = e.target.value;
        this.setState({list: value}, () => {this.validateField(value)});
    }

    checkCurrentValue = (e) => {
        const value = e.target.value;
        this.setState({list: value}, () => {this.validateField(value)});
    }

    sendForm = (formState) => {
        if(this.state.action === "add"){
            this.props.addNewList(formState, this.state.list)
        } else {
            this.props.getChanges(formState, this.state.list)
        }  
    }

    validateField = (value) => {
        var count = 0;

        this.props.lists.forEach(list => {
            if (value === list.title) {
                ++count;
            }
        });

        if (value === '-' || value === '' || count > 0) {
            this.setState({validList: -1})
        } else {
            this.setState({validList: 1})
        }
        
        this.validateForm(this.state.validList);
    }

    validateForm = (validList) => {
        if (validList === 1) {
            this.setState({enableButton: true})
        } else{
            this.setState({enableButton: false})
        }
    }
}

export default FormForLists