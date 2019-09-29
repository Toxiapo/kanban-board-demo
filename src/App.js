import React, { Component } from 'react';
import './App.css';

import { DragDropContext } from 'react-beautiful-dnd';
import storage from './component/model'
import Boards from './component/Board';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: storage.data.boards,
      tickets: storage.data.tickets,
      addTicket: this.addTicket.bind(this),
      deleteTicket: this.deleteTicket.bind(this)
    }

    this.onDragEnd = this.onDragEnd.bind(this)
  }

  addTicket(status) {
    const content = prompt("Create New Ticket");
    if (content) {
      storage.addTicket(status, content);
      this.setState({
        tickets: storage.data.tickets
      })
    }
  }

  deleteTicket(id) {
    storage.deleteTicket(id);
    this.setState({
      tickets: storage.data.tickets
    });
  }

  onDragEnd(result) {
    const { destination, source, draggableId } = result;

    // DOn't allow reordering
    if(destination && destination.droppableId !== source.droppableId) {
      storage.updateTicket(draggableId, destination.droppableId);
      this.setState({
        tickets: storage.data.tickets
      }); 
    } 
    return false;
  }

  render() {
    return (
      <>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div className="container">
            <h1>Kanban Board &#9997;</h1>
            <Boards {...this.state} />
          </div>
        </DragDropContext>
      </>
    );
  }
}

export default App;
