import React, { useState } from 'react';
import './Tickets.css';

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [issues, setIssues] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const project = event.target.elements['project-input'].value;
    const title = event.target.elements['title-input'].value;
    const description = event.target.elements['description-input'].value;
    const priority = event.target.elements['priority-select'].value;
    const assignee = event.target.elements['assign-select'].value;
    const status = event.target.elements['status-select'].value;

    const newIssue = {
      project,
      title,
      description,
      priority,
      assignee,
      status,
    };

    setIssues([...issues, newIssue]);
    setShowForm(false);
    event.target.reset();
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleDelete = (index) => {
    const updatedIssues = [...issues];
    updatedIssues.splice(index, 1);
    setIssues(updatedIssues);
  };

  const sortFunction = (event) => {
    const sortBy = event.target.value;
    const sortedIssues = [...issues];

    if (sortBy === 'name') {
      sortedIssues.sort((a, b) => a.title.localeCompare(b.title));
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
    <button id="create-issue-button" onClick={toggleForm}>
      Create Ticket
    </button>
  );

  const newIssueForm = showForm && (
    <form id="new-issue-form" onSubmit={handleSubmit}>
      <label htmlFor="title-input">Title:</label>
      <input type="text" id="title-input" name="title-input" required />
      <label htmlFor="description-input">Description:</label>
      <textarea id="description-input" name="description-input" required />
      <label htmlFor="project-input">Project:</label>
      <textarea id="project-input" name="project-input" required />
      <label htmlFor="assign-select">Assign:</label>
      <select id="assign-select" name="assign-select">
        <option value="Yavor">Yavor</option>
        <option value="Alkan">Alkan</option>
        <option value="Daniel">Daniel</option>
        <option value="Slavi">Slavi</option>
      </select>
      <label htmlFor="priority-select">Priority:</label>
      <select id="priority-select" name="priority-select">
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <label htmlFor="status-select">Status:</label>
      <select id="status-select" name="status-select">
        <option value="open">Open</option>
        <option value="closed">Closed</option>
        <option value="in-progress">In Progress</option>
      </select>
      <div>
        <button type="submit">Create</button>
        <button type="button" id="cancel-button" onClick={toggleForm}>
          Cancel
        </button>
      </div>
    </form>
  );

  const issueListItems = issues.map((issue, index) => (
    <div className={`issue ${issue.priority}`} key={index}>
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
      <button className="delete-button" onClick={() => handleDelete(index)}>
        Delete
      </button>
    </div>
  ));

  return (
    <div>
      <header>
        {/* <img src={logo} alt="Logo" style={{ float: 'left', height: '80px', width: '90px', backgroundColor: '#fcfcfc' }} /> */}
        <h1 style={{ marginLeft: '60px' }}>Issue Tracker</h1>
      </header>
      <main>
        {createIssueButton}
        {newIssueForm}
        <div id="issue-list">
          {issueListItems}
        </div>
      </main>
      <select onChange={sortFunction}>
        <option value="">Sort by:</option>
        <option value="name">Title</option>
        <option value="assignee">Assignee</option>
        <option value="priority-low-to-high">Priority (Low to High)</option>
        <option value="status-open-to-closed">Status (Open to Closed)</option>
      </select>
    </div>
  );
};

export default App;
