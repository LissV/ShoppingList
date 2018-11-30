import React from 'react'
import './style.css'
import 'bootstrap/dist/css/bootstrap.css';

class Title extends React.Component {
    render () {
        var {list} = this.props
        return(
            <div className="list-title">
                <h1>
                    {list}
                </h1>
            </div>
        )
    }
}

export default Title