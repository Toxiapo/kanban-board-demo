import {  defaultBoard, defaultTicket } from './config';

class Storage {
  constructor() {
    this.data = {
      tickets: [...defaultTicket ],
      boards: [...defaultBoard], 
    }
  }

  deleteTicket(id) {
    
    this.data.tickets = this.data.tickets.filter(ticket => ticket.id !== id);
  }

  addTicket(status, content) {
    const size = this.data.tickets.length;

    this.data.tickets.push({ id: `ticket-${size + 1}`, status, content });
  }

  updateTicket(id, status) {
    this.data.tickets.forEach((item, index) => {
      if(item.id === id) {
        this.data.tickets[index].status = status;
      }
    })
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
}

const storage = new Storage();

export default storage;
