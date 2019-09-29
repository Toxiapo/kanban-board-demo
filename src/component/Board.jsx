import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import storage from './model.js';

class Board extends Component {
  render() {
    const { boards, addTicket, deleteTicket } = this.props;

    return (
      <div className="boardContainer">
        {boards.map((boardLabel, index) => (
          <Droppable droppableId={boardLabel} type="TASK" key={index}>
            {(provided, snapshot) => (
              <div className="board" >
                <h2 className="label">{boardLabel}</h2>
                <div className="header">
                  <div className="ticketCount">{storage.getFilteredSize(boardLabel)} tickets</div>
                  <div className="newTicket" onClick={addTicket.bind(this, boardLabel)}>New</div> 
                </div>
                <div
                  className="tickets"
                  ref={provided.innerRef}
                  style={{
                    backgroundColor: snapshot.isDraggingOver
                      ? '#bfbaba'
                      : '#E5E5E5',
                    ...provided.droppableProps.style
                  }}
                >
                  {storage.filterTickets(boardLabel).map(ticket => (
                    <Draggable draggableId={ticket.id} index={index} key={ticket.id}>
                      {provided => (
                        <div
                          className="ticket"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {ticket.content}
                          <span className="delete" onClick={deleteTicket.bind(this, ticket.id)}>x</span>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    );
  }
}

Board.propTypes = {
  boards: PropTypes.arrayOf(PropTypes.string).isRequired,
  addTicket: PropTypes.func.isRequired,
  deleteTicket: PropTypes.func.isRequired
};

export default Board;
