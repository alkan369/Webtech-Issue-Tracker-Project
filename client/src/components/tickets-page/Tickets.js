import React, { useState } from 'react';
import './Tickets.css';

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [issues, setIssues] = useState([]);

  const fetchTickets = async () => {
    fetch('http://localhost:3001/tickets')
      .then(response => response.json())
      .then(data => setIssues(data));
  }

  const createTicket = async (ticket) => {
    fetch('http://localhost:3001/tickets/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticket),
    })
      .then(response => response.json())
      .then(data => {
        // console.log('Success:', data);
        fetchTickets();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const editTicket = async (ticket) => {
    fetch(`http://localhost:3001/tickets/edit/${ticket.title}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticket),
    })
      .then(response => response.json())
      .then(data => {
        // console.log('Success:', data);
        fetchTickets();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const deleteTicket = async (title) => {
    fetch(`http://localhost:3001/tickets/delete/${title}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        // console.log('Success:', data);
        fetchTickets();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const project = event.target.elements['project-input'].value;
    const title = event.target.elements['title-input'].value;
    const description = event.target.elements['description-input'].value;
    const priority = event.target.elements['priority-select'].value;
    const assignee = event.target.elements['assign-select'].value;
    const status = event.target.elements['status-select'].value;

    const newIssue = {
      projectName: project,
      title: title,
      description: description,
      priority: priority,
      assignedTo: assignee,
      status: status,
    };

    createTicket(newIssue);
    setShowForm(false);
    event.target.reset();
  };

  const toggleForm = (isEdit = false) => {
    if(isEdit) {
      setShowEditForm(!showEditForm);
    }
    else{
      setShowForm(!showForm);
    }
  };

  const handleDelete = (index) => {
    const updatedIssues = [...issues];
    const title = updatedIssues[index].title;
    deleteTicket(title);
  };

  const handleEdit = (index) => {
    const updatedIssues = [...issues];
    const ticket = updatedIssues[index];
    toggleForm(true);
    document.getElementById('title-input').value = ticket.title;
    document.getElementById('description-input').value = ticket.description;
    document.getElementById('project-input').value = ticket.projectName;
    document.getElementById('assign-select').value = ticket.assignedTo;
    document.getElementById('priority-select').value = ticket.priority;
    document.getElementById('status-select').value = ticket.status;
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    const project = event.target.elements['project-input'].value;
    const title = event.target.elements['title-input'].value;
    const description = event.target.elements['description-input'].value;
    const priority = event.target.elements['priority-select'].value;
    const assignee = event.target.elements['assign-select'].value;
    const status = event.target.elements['status-select'].value;

    const newIssue = {
      projectName: project,
      title: title,
      description: description,
      priority: priority,
      assignedTo: assignee,
      status: status,
    };

    editTicket(newIssue);
    setShowEditForm(false);
    event.target.reset();
  };

  const sortFunction = (event) => {
    const sortBy = event.target.value;
    const sortedIssues = [...issues];

    if (sortBy === 'project') {
      sortedIssues.sort((a, b) => a.projectName.localeCompare(b.projectName));
    } else if (sortBy === 'assignee') {
      sortedIssues.sort((a, b) => a.assignee.localeCompare(b.assignee));
    } else if (sortBy === 'priority-low-to-high') {
      sortedIssues.sort((a, b) => {
        const priorityOrder = { low: 1, medium: 2, high: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
    } else if (sortBy === 'status-open-to-closed') {
      sortedIssues.sort((a, b) => {
        const statusOrder = { open: 1, 'in-progress': 2, closed: 3 };
        return statusOrder[a.status] - statusOrder[b.status];
      });
    }

    setIssues(sortedIssues);
  };

  const createIssueButton = (
    <button className = 'edit-button' id="create-issue-button" onClick={toggleForm}>
      Create Ticket
    </button>
  );

  const newIssueForm = showForm && (
    <form className = 'ticket-form' id="new-issue-form" onSubmit={handleSubmit}>
      <label className = 'ticket-input' htmlFor="title-input">Title:</label>
      <input className = 'ticket-label' type="text" id="title-input" name="title-input" required />
      <label className = 'ticket-label' htmlFor="description-input">Description:</label>
      <textarea className = 'ticket-textarea' id="description-input" name="description-input" required />
      <label className = 'ticket-label' htmlFor="project-input">Project:</label>
      <textarea className = 'ticket-textarea' id="project-input" name="project-input" required />
      <label className = 'ticket-label' htmlFor="assign-select">Assign:</label>
      <input className = 'ticket-input' type="text" id="assign-select" name="assign-select" required />
      <label className = 'ticket-label' htmlFor="priority-select">Priority:</label>
      <select className = 'ticket-select' id="priority-select" name="priority-select">
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <label className = 'ticket-label' htmlFor="status-select">Status:</label>
      <select className = 'ticket-select' id="status-select" name="status-select">
        <option value="open">Open</option>
        <option value="closed">Closed</option>
        <option value="in-progress">In Progress</option>
      </select>
      <div>
        <button className = 'edit-button' type="submit">Create</button>
        <button className = 'delete-button' type="button" id="cancel-button" onClick={toggleForm}>
          Cancel
        </button>
      </div>
    </form>
  );

  const editIssueForm = showEditForm && (
    <form className = 'ticket-form' id="new-issue-form" onSubmit={handleEditSubmit}>
      <label className = 'ticket-label' htmlFor="title-input">Title:</label>
      <input className = 'ticket-input' type="text" id="title-input" name="title-input" required />
      <label className = 'ticket-label' htmlFor="description-input">Description:</label>
      <textarea className = 'ticket-textarea' id="description-input" name="description-input" required />
      <label className = 'ticket-label' htmlFor="project-input">Project:</label>
      <textarea className = 'ticket-textarea' id="project-input" name="project-input" required />
      <label className = 'ticket-label' htmlFor="assign-select">Assign:</label>
      <input className = 'ticket-input' type="text" id="assign-select" name="assign-select" required />
      <label className = 'ticket-label' htmlFor="priority-select">Priority:</label>
      <select className = 'ticket-select' id="priority-select" name="priority-select">
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <label className = 'ticket-label' htmlFor="status-select">Status:</label>
      <select className = 'ticket-select' id="status-select" name="status-select">
        <option value="open">Open</option>
        <option value="closed">Closed</option>
        <option value="in-progress">In Progress</option>
      </select>
      <div>
        <button className = 'edit-button' type="submit">Edit</button>
        <button className = 'delete-button' type="button" id="cancel-button" onClick={toggleForm(true)}>
          Cancel
        </button>
      </div>
    </form>
  );

  const issueListItems = issues.map((issue, index) => (
    <form className={'ticket-form'}>
      <h2 className="issue-title">{issue.title}</h2>
      <p>{issue.project}</p>
      <p className="issue-assignee">
        <strong>Assignee:</strong> {issue.assignee}
      </p>
      <p>{issue.description}</p>
      <p className="issue-priority">
        <strong>Priority:</strong> {issue.priority}
      </p>
      <p className="issue-status">
        <strong>Status:</strong> {issue.status}
      </p>
      <button className="edit-button" onClick={() => handleEdit(index)}>Edit</button>
      <button className="delete-button" onClick={() => handleDelete(index)}>
        Delete
      </button>
    </form>
  ));

  return (
    <div>
      <header className="ticket-header">
        {/* <img src={logo} alt="Logo" style={{ float: 'left', height: '80px', width: '90px', backgroundColor: '#fcfcfc' }} /> */}
        <h1 style={{ marginLeft: '60px' }}>Tickets</h1>
      </header>
      <main className="ticket-main">
        {createIssueButton}
        {newIssueForm}
        {editIssueForm}
        <div className="ticket-list" id="issue-list">
          {issueListItems}
        </div>
      </main>
      <select className="ticket-select" onChange={sortFunction}>
        <option value="">Sort by:</option>
        <option value="name">Project</option>
        <option value="assignee">Assignee</option>
        <option value="priority-low-to-high">Priority (Low to High)</option>
        <option value="status-open-to-closed">Status (Open to Closed)</option>
      </select>
    </div>
  );
};

export default App;
