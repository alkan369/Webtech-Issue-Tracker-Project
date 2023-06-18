import React, { useState } from 'react';
import '../dashboard/Dashboard.css';

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [issues, setIssues] = useState([]);

  /// Fetch projects from backend
  const fetchProjects = async () => {
    fetch('http://localhost:3001/projects')
      .then(response => response.json())
      .then(data => setIssues(data));
  }

  /// Create project via API call to backend
  /// then fetch projects from backend to update state
  const createProject = async (ticket) => {
    fetch('http://localhost:3001/projects/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticket),
    })
      .then(response => response.json())
      .then(data => {
        // console.log('Success:', data);
        fetchProjects();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  /// Edit project via API call to backend
  /// then fetch projects from backend to update state
  const editProject = async (project) => {
    fetch(`http://localhost:3001/projects/edit/${project.title}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then(response => response.json())
      .then(data => {
        // console.log('Success:', data);
        fetchProjects();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  /// Delete project via API call to backend
  /// then fetch projects from backend to update state
  const deleteProject = async (title) => {
    fetch(`http://localhost:3001/projects/delete/${title}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        // console.log('Success:', data);
        fetchProjects();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  /// Handle form submission for creating a new project
  /// TODO: Add validation
  const handleSubmit = (event) => {
    event.preventDefault();
    const projectTitle = document.getElementById('project-title-input').value;
    const projectDescription = document.getElementById('project-description-input').value;
    const projectPriority = document.getElementById('project-priority-select').value;
    const projectStatus = document.getElementById('project-status-select').value;
  
    const newIssue = {
      projectTitle: projectTitle,
      description: projectDescription,
      projectPriority,
      projectStatus,
    };

    createProject(newIssue);
    setShowForm(false);
    event.target.reset();
  };

  /// Handle form submission for editing a project
  /// TODO: Add validation
  const handleEdit = (index) => {
    const updatedIssues = [...issues];
    const project = updatedIssues[index];
    toggleForm(true);
    document.getElementById('project-title-input').value = project.projectTitle;
    document.getElementById('project-description-input').value = project.description;
    document.getElementById('project-priority-select').value = project.projectPriority;
    document.getElementById('project-status-select').value = project.projectStatus;
  };

  const handleEditSubmit = (event) => { 
    event.preventDefault();
    const projectTitle = document.getElementById('project-title-input').value;
    const projectDescription = document.getElementById('project-description-input').value;
    const projectPriority = document.getElementById('project-priority-select').value;
    const projectStatus = document.getElementById('project-status-select').value;

    const updatedIssue = {
      projectTitle: projectTitle,
      description: projectDescription,
      projectPriority,
      projectStatus,
    };

    editProject(updatedIssue);
    setShowEditForm(false);
    event.target.reset();
  };
    

  ///Toggle form visibility for creating a new project or editing an existing project
  const toggleForm = (isEdit = false) => {
    if(isEdit) {
      setShowEditForm(!showEditForm);
    }
    else{
      setShowForm(!showForm);
    }
  };

  /// Handle delete project
  const handleDelete = (index) => {
    const updatedIssues = [...issues];
    const title = updatedIssues[index].title;
    deleteProject(title);
  };

  /// Sort projects by name, assignee, priority, or status
  /// We sort here and not in the backend because there is no API endpoint for sorting
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

  /// Self explanatory
  const createIssueButton = (
    <button id="create-issue-button" onClick={toggleForm}>
      Create Ticket
    </button>
  );

  /// Form for creating a new project
  const newIssueForm = showForm && (
    <form id="new-issue-form" onSubmit={handleSubmit}>
      <label htmlFor="project-title-input">Project title:</label>
      <input type="text" id="title-input" name="title-input" required />
      <label htmlFor="project-description-input">Project Description:</label>
      <textarea id="description-input" name="description-input" required />
      <label htmlFor="project-input">Priority:</label>
      <select class="ticket-select" id="project-priority-select" name="project-priority-select">
        <option value="high">High</option>
        <option value="medium" selected>Medium</option>
        <option value="low">Low</option>
      </select>
      <label htmlFor="project-status-select">Status:</label>
      <select id="project-status-select" name="project-status-select">
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

  /// Form for editing an existing project (same as new project form but with different submit handler)
  const editIssueForm = showEditForm && (
    <form id="new-issue-form" onSubmit={handleEditSubmit}>
    <label htmlFor="project-title-input">Project title:</label>
    <input type="text" id="title-input" name="title-input" required />
    <label htmlFor="project-description-input">Project Description:</label>
    <textarea id="description-input" name="description-input" required />
    <label htmlFor="project-input">Priority:</label>
    <select class="ticket-select" id="project-priority-select" name="project-priority-select">
      <option value="high">High</option>
      <option value="medium" selected>Medium</option>
      <option value="low">Low</option>
    </select>
    <label htmlFor="project-status-select">Status:</label>
    <select id="project-status-select" name="project-status-select">
      <option value="open">Open</option>
      <option value="closed">Closed</option>
      <option value="in-progress">In Progress</option>
    </select>
    <div>
      <button type="submit">Edit</button>
      <button type="button" id="cancel-button" onClick={toggleForm}>
        Cancel
      </button>
    </div>
  </form>
  );

  /// Map projects to JSX
  const issueListItems = issues.map((issue, index) => (
    <div className={`project ${issue.priority}`} key={index}>
      <h2 className="project-title">{issue.projectTitle}</h2>
      <p className="project-priority">
        <strong>Priority:</strong> {issue.projectPriority}
      </p>
      <p className="project-status">
        <strong>Status:</strong> {issue.projectStatus}
      </p>
      <button className="edit-button" onClick={() => handleEdit(index)}> Edit </button>
      <button className="delete-button" onClick={() => handleDelete(index)}>
        Delete
      </button>
    </div>
  ));

  /// Render
  return (
    <div>
      <header>
        {/* <img src={logo} alt="Logo" style={{ float: 'left', height: '80px', width: '90px', backgroundColor: '#fcfcfc' }} /> */}
        <h1 style={{ marginLeft: '60px' }}>Issue Tracker</h1>
      </header>
      <main>
        {createIssueButton}
        {newIssueForm}
        {editIssueForm}
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
