import React from 'react'
import './style.css'
import Octicon, {Plus} from '@githubprimer/octicons-react'
import FormForLists from './FormForLists'
import EditPanel from './EditPanel';
import 'bootstrap/dist/css/bootstrap.css';

class Menu extends React.Component {
    state = {
        showForm: false
    }

    render () {
        const {lists, sortedLists} = this.props;
        var listsn = sortedLists.length > 0 ? sortedLists.map(list => <div>
                <button key={list.id} onClick={() => {this.changeStates(list)}} className="dropdown-item" type="button">
                    {list.title} 
                </button>
                <EditPanel list={list} deleteList={this.deleteList} lists={lists} editLists={this.editLists}/>
            </div>
        ) :
        lists.map(list => <div key={list.id}>
                <button onClick={() => {this.changeStates(list)}} className="dropdown-item" type="button">
                    {list.title} 
                </button>
                <EditPanel list={list} deleteList={this.deleteList} lists={lists} editLists={this.editLists}/>
            </div>
        );
        return(
            <div className="btn-group noclose dropright" id="menu">
                <button type="button" className="btn btn-dark dropdown-toggle btn-lg" id="list-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    Lists
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                    <button type="button" className="dropdown-item" onClick={this.onButtonClick} >
                        <div className="d-inline" style={{marginRight: '5%', marginLeft: '15%'}}><Octicon icon={Plus} size='small'/></div> 
                        <div className="d-inline">Cписок</div>
                    </button>
                    {this.state.showForm ? <FormForLists lists={lists} list={''} addNewList={this.addNewList} action={"add"}/> : null}
                    <hr/>
                    {listsn}
                </div>
            </div>
        )
    }

    changeStates = (list) => {
        this.props.getRequiredList(list.title);
        this.props.getfilteredItems([], false);
    }

    onButtonClick = () => {
        if (this.state.showForm === true){
            this.setState({showForm: false})
        } else{
            this.setState({showForm: true})
        }
    }

    addNewList = (vissible,value) => {
        this.setState({showForm: vissible})
        var list = {
            "id": this.props.indexList + 1,
            "title": value
        }
        this.props.lists.push(list)
        this.props.getNewLists(this.props.lists)
        this.props.getIndexList(this.props.indexList + 1)
    }

    deleteList = (list) => {
        if(this.props.requiredList === list.title){
            this.props.getRequiredList('-');
        }

        var index = this.props.lists.indexOf(list);
        this.props.lists.splice(index,1);
        this.props.getNewLists(this.props.lists);

        var array = this.props.items.filter(item => item.list !== list.title);
        this.props.getNewItems(array);
    }
    
    editLists = (editValue, currentList) => {
        var editList = {
            "id": currentList.id,
            "title": editValue
        }
        
        var index = this.props.lists.indexOf(currentList);
        this.props.lists[index] = editList;
        console.log('l:', this.props.lists)
        this.props.getNewLists(this.props.lists);

        this.props.items.forEach((item) => {
            if(item.list === currentList.title){
                item.list = editList.title;
            }
        })
        
        this.props.getNewItems(this.props.items);
    }
}

export default Menu