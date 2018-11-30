import React from 'react'
import './style.css'
import FormForLists from './FormForLists'
import Octicon, {Trashcan, Pencil} from '@githubprimer/octicons-react'
import 'bootstrap/dist/css/bootstrap.css';

class EditPanel extends React.Component{
    state = {
        showForm: false
    }
    
    render() {
        return(
            <div className="edit-panel-btns">
                <button className="edit-btn" type="button" onClick={() => this.props.deleteList(this.props.list)}>
                    <Octicon icon={Trashcan} size='small'/> 
                </button>
                <button className="edit-btn" type="button" onClick={this.onButtonClick}>
                    <Octicon icon={Pencil} size='small'/> 
                </button>
                {this.state.showForm ? <FormForLists lists={this.props.lists} list={this.props.list.title} 
                action={"edit"} getChanges={this.getChanges}/> : null}
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

    getChanges = (vissible,value) => {
        this.setState({showForm: vissible});
        this.props.editLists(value, this.props.list);
    }

}

export default EditPanel