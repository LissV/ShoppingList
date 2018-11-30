import React from 'react'
import Nav from './Navigation'
import Menu from './Menu'
import Title from './ListTitle'
import Actions from './Actions'
import items from '../itemsArray'
import lists from '../listsArray'
import Expenses from './Expenses'
import ListItems from './ListItems'
import './style.css'
import 'bootstrap/dist/css/bootstrap.css';
import { DragDropContext} from 'react-beautiful-dnd';

const reorder = (list, globalList, startIndex, endIndex) => {
    const result = Array.from(list);
    const globalResult = Array.from(globalList);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    const globalStartIndex = globalList.indexOf(list[startIndex]);
    const globalEndIndex = globalList.indexOf(list[endIndex]);
    const [globalRemoved] = globalResult.splice(globalStartIndex, 1);
    globalResult.splice(globalEndIndex, 0, globalRemoved);
    var tempArray = [];
    tempArray.push(globalResult);
    tempArray.push(result);
    return tempArray;
};

class Page extends React.Component {
    state = {
        initialItems: items,
        initialLists: lists,
        requiredList: lists.length === 0 ? '-' : lists[0].title,
        sortedItems: [],
        sortedLists: [],
        filteredItems: [],
        filtered: false,
        indexItem: items.length,
        indexList: lists.length
    }
    onDragEnd = result => {
        const { destination, source} = result;
        if (!destination) {
            return;
        }
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        var currentList;
        var typeOfList;

        if (this.state.filtered) {
            currentList = this.state.filteredItems;
            typeOfList = 'filtered';
        } else {
            if (this.state.sortedItems.length > 0 && this.state.sortedItems.every(item => item.list === this.state.requiredList)) {
                currentList = this.state.sortedItems;
                typeOfList = 'sorted';
            } else {
                currentList = this.state.initialItems.filter(item => item.list === this.state.requiredList);
                typeOfList = 'current';
            }
        }

        const newList = reorder(currentList, this.state.initialItems, result.source.index, result.destination.index);

        switch(typeOfList){
            case 'filtered':
                this.setState({initialItems: newList[0], filteredItems: newList[1]});
                break;
            case 'sorted':
                this.setState({initialItems: newList[0], sortedItems: newList[1]});
                break;
            default:
                this.setState({initialItems: newList[0]});
                break;
        }
      };

    render () {
        return(
            <div className="main"> 
                <Nav />
                <div className="bg-secondary">
                    <Menu getRequiredList={this.getRequiredList} requiredList={this.state.requiredList}
                        lists={this.state.initialLists} getNewLists={this.getNewLists} sortedLists={this.state.sortedLists} 
                        items={this.state.initialItems} getNewItems={this.getNewItems} getfilteredItems={this.getfilteredItems}
                        indexList={this.state.indexList} getIndexList={this.getIndexList}/>
                    <Actions items={this.state.initialItems} list={this.state.requiredList} 
                    lists={this.state.initialLists} getSortedItems={this.getSortedItems} getSortedLists={this.getSortedLists}
                    getfilteredItems={this.getfilteredItems} getRequiredList={this.getRequiredList} filtered={this.state.filtered}/>
                </div>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <div className="container" style={{width: '60%', marginTop: '1%', marginBottom: '1%'}}>
                        <div className="p-2 text-white bg-dark text-center list-title">
                            <Title list={this.state.requiredList} />
                        </div>
                        <div className="border-right border-left content">
                            <ListItems items={this.state.initialItems} list={this.state.requiredList} sortedItems={this.state.sortedItems} 
                            getNewItems={this.getNewItems} getSortedItems={this.getSortedItems} filtered={this.state.filtered} filteredItems={this.state.filteredItems}
                            getfilteredItems={this.getfilteredItems} indexItem={this.state.indexItem} getIndexItem={this.getIndexItem}/>
                        </div>
                        <div className="p-2 text-white bg-dark expenses">
                            <Expenses requiredList={this.state.requiredList} items={this.state.initialItems} sortedItems={this.state.sortedItems}
                            filteredItems={this.state.filteredItems} filtered={this.state.filtered}/>
                        </div>
                    </div>
                </DragDropContext>
            </div>
        )
    }

    getRequiredList = (listTitle) => {
        this.setState({requiredList: listTitle})
    }

    getSortedItems = (itemsList) => {
        this.setState({sortedItems: itemsList})
    }

    getSortedLists = (lists) => {
        this.setState({sortedLists: lists})
    }

    getNewLists = (lists) => {
        this.setState({initialLists: lists})
    }

    getNewItems = (items) => {
        this.setState({initialItems: items})
    }

    getfilteredItems = (items, filter) =>{
        this.setState({filteredItems: items, filtered: filter})
    }

    getIndexItem = (value) => {
        this.setState({indexItem: value})
    }

    getIndexList = (value) => {
        this.setState({indexList: value})
    }
}

export default Page