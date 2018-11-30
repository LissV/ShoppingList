import React from 'react'
import './style.css'
import Octicon, {KebabVertical, Trashcan, Pencil} from '@githubprimer/octicons-react'
import 'bootstrap/dist/css/bootstrap.css';

class EditPanel extends React.Component{
    render() {
        return(
            <div className="btn-group dropright noclose edit-panel">
                <button type="button" className="edit-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <Octicon icon={KebabVertical} size='medium'/> 
                </button> 
                <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                    <button className="dropdown-item" type="button" onClick={() => this.props.deleteItem(this.props.item)}>
                        <Octicon icon={Trashcan} size='small'/> 
                    </button>
                    <button className="dropdown-item" type="button" onClick={this.onEditClick}>
                        <Octicon icon={Pencil} size='small'/> 
                    </button>
                </div>
             </div>  
        )
    }

    onEditClick = () => {
        this.props.getFormState(!this.props.edForm)
    }
}

export default EditPanel