import {  defaultBoard, defaultTicket } from './config';

class Storage {
  constructor() { 
    const defaultData = {
      tickets: [...defaultTicket ],
      boards: [...defaultBoard], 
    }

    if(window.localStorage.getItem("kanban-data") !== null) { 
      try { 
        const data = window.localStorage.getItem("kanban-data"); 
        this.data = JSON.parse(data);
      } catch (error) { 
        this.data = defaultData;

        this._saveToStorage(defaultData);
      }
    } else { 
      this.data = defaultData; 

      this._saveToStorage(defaultData);
    }
  } 

  deleteTicket(id) {
    this.data.tickets = this.data.tickets.filter(ticket => ticket.id !== id);

    this._saveToStorage(this.data); 
  }

  addTicket(status, content) {
    const size = this.data.tickets.length; 
    this.data.tickets.push({ id: `ticket-${size + 1}`, status, content });

    this._saveToStorage(this.data); 
  }

  updateTicket(id, status) {
    this.data.tickets.forEach((item, index) => {
      if(item.id === id) {
        this.data.tickets[index].status = status;
      }
    })

    this._saveToStorage(this.data); 
  }

  filterTickets(status) {
    return this.data.tickets.filter(ticket => ticket.status === status);
  }

  getFilteredSize(status) { 
    return this.data.tickets.filter(ticket => ticket.status === status).length;
  }

  getDefaultTickets() {
    return this.data.tickets;
  }

  _saveToStorage(data) { 
    window.localStorage.setItem("kanban-data", JSON.stringify(data)); 
  } 
}

const storage = new Storage();

export default storage;
