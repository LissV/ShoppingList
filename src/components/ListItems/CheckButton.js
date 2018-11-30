import React from 'react'
import './style.css'
import Octicon, {Check} from '@githubprimer/octicons-react'
import 'bootstrap/dist/css/bootstrap.css';

class CheckButton extends React.Component{
    state = {
        checked: this.props.item.checked
    }
    
    render(){
        return(
            <div className="check-button">
                <button type="button" className="btn btn-dark" id="check-button" aria-label="Left Align" onClick={this.checkButton}>
                    {this.state.checked ? <Octicon icon={Check} size='small'/> : null}
                </button>
            </div>
        )
    }

    checkButton = () => {
        this.props.getFlag(this.state.checked, this.props.item)
        if(this.state.checked === false){
            this.setState({checked: true})
        } else {
            this.setState({checked: false})
        } 
    }
}

export default CheckButton
