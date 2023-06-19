import React, { useState } from 'react';
import './Projects.css';
let firstTime = true;

const App = () => {
  const [showForm, setShowForm] = useState(false);
  // const [showEditForm, setShowEditForm] = useState(false);

  const [issues, setIssues] = useState([]);


    /// Fetch projects from backend
    const fetchProjects = async () => {
      fetch('http://localhost:3000/api/projects')
        .then(response => response.json())
        .then(data => setIssues(data));
    }
  

  /// Create project via API call to backend
  /// then fetch projects from backend to update state
  const createProject = async (ticket) => {
    fetch('http://localhost:3000/api/projects/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticket),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        fetchProjects();
      })
      .catch((error) => {
        alert(error);
        console.error('Error:', error);
      });
  }
  if(firstTime){
    fetchProjects();
    firstTime = false;
  }

  /// Edit project via API call to backend
  /// then fetch projects from backend to update state
  // const editProject = async (project) => {
  //   fetch(`http://localhost:3000/api/projects/edit/${project.title}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(project),
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       // console.log('Success:', data);
  //       fetchProjects();
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  // }

  /// Delete project via API call to backend
  /// then fetch projects from backend to update state
  const deleteProject = async (title) => {
    fetch(`http://localhost:3000/api/projects/delete/${title}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
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
    const projectName = document.getElementById('title-input').value;
    const projectDescription = document.getElementById('description-input').value;
    const projectPriority = document.getElementById('project-priority-select').value;
    const projectStatus = document.getElementById('project-status-select').value;
  
    const newIssue = {
      projectName: projectName,
      description: projectDescription,
      priority: projectPriority,
      status: projectStatus,
    };

    createProject(newIssue);
    setShowForm(false);
    event.target.reset();
  };

  /// Handle form submission for editing a project
  /// TODO: Add validation
  // const handleEdit = (index) => {
  //   const updatedIssues = [...issues];
  //   const project = updatedIssues[index];
  //   toggleForm(true);
  //   document.getElementById('project-title-input').value = project.projectName;
  //   document.getElementById('project-description-input').value = project.description;
  //   document.getElementById('project-priority-select').value = project.projectPriority;
  //   document.getElementById('project-status-select').value = project.projectStatus;
  // };

  // const handleEditSubmit = (event) => { 
  //   event.preventDefault();
  //   const projectName = document.getElementById('title-input').value;
  //   const projectDescription = document.getElementById('description-input').value;
  //   const projectPriority = document.getElementById('priority-select').value;
  //   const projectStatus = document.getElementById('status-select').value;

  //   const updatedIssue = {
  //     projectName: projectName,
  //     description: projectDescription,
  //     projectPriority,
  //     projectStatus,
  //   };

  //   editProject(updatedIssue);
  //   setShowEditForm(false);
  //   event.target.reset();
  // };
    

  ///Toggle form visibility for creating a new project or editing an existing project
  const toggleForm = (isEdit = false) => {
    // console.log(isEdit)
    // if(isEdit) {
    //   setShowEditForm(!showEditForm);
    // }
    // else{
      setShowForm(!showForm);
    // }
  };

  /// Sort projects by name, assignee, priority, or status
  /// We sort here and not in the backend because there is no API endpoint for sorting
  const sortFunction = (event) => {
    const sortBy = event.target.value;
    const sortedIssues = [...issues];

    if (sortBy === 'name') {
      sortedIssues.sort((a, b) => a.projectName.localeCompare(b.projectName));
    } else if (sortBy === 'priority-Low-to-High') {
      sortedIssues.sort((a, b) => {
        const priorityOrder = { Low: 1, Medium: 2, High: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
    } else if (sortBy === 'status-In Progress-to-Done') {
      sortedIssues.sort((a, b) => {
        const statusOrder = { 'In progress': 1, Done: 2 };
        return statusOrder[a.status] - statusOrder[b.status];
      });
    }

    setIssues(sortedIssues);
  };

  /// Create Project button
  const createIssueButton = (
    <button className = 'edit-button' id="create-issue-button" onClick={toggleForm}>
      Create Project
    </button>
  );

  /// Form for creating a new project
  const newIssueForm = showForm && (
    <form className = 'ticket-form' id="new-issue-form" onSubmit={handleSubmit}>
      <label className = 'ticket-label' htmlFor="project-title-input">Project title:</label>
      <input className = 'ticket-input' type="text" id="title-input" name="title-input" required />
      <label className = 'ticket-label' htmlFor="project-description-input">Project Description:</label>
      <textarea className = 'ticket-textarea' id="description-input" name="description-input" required />
      <label className = 'ticket-label' htmlFor="project-input">Priority:</label>
      <select className = 'ticket-select' class="ticket-select" id="project-priority-select" name="project-priority-select">
        <option value="High">High</option>
        <option value="Medium" selected>Medium</option>
        <option value="Low">Low</option>
      </select>
      <label className = 'ticket-label' htmlFor="project-status-select">Status:</label>
      <select className = 'ticket-select' id="project-status-select" name="project-status-select">
        <option value="In progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <div>
        <button className = 'edit-button' type="submit">Create</button>
        <button className = 'delete-button'type="button" id="cancel-button" onClick={toggleForm}>
          Cancel
        </button>
      </div>
    </form>
  );

  /// Form for editing an existing project (same as new project form but with different submit handler)
  // const editIssueForm = showEditForm && (
  //   <form className = 'ticket-form' id="new-issue-form" onSubmit={handleEditSubmit}>
  //   <label className = 'ticket-label' htmlFor="project-title-input">Project title:</label>
  //   <input className = 'ticket-input' type="text" id="title-input" name="title-input" required />
  //   <label className = 'ticket-label' htmlFor="project-description-input">Project Description:</label>
  //   <textarea className = 'ticket-textarea' id="description-input" name="description-input" required />
  //   <label className = 'ticket-label' htmlFor="project-input">Priority:</label>
  //   <select className = 'ticket-select' class="ticket-select" id="project-priority-select" name="project-priority-select">
  //     <option value="high">High</option>
  //     <option value="medium" selected>Medium</option>
  //     <option value="low">Low</option>
  //   </select>
  //   <label className = 'ticket-label' htmlFor="project-status-select">Status:</label>
  //   <select className = 'ticket-select' id="project-status-select" name="project-status-select">
  //     <option value="open">Open</option>
  //     <option value="closed">Closed</option>
  //     <option value="in-progress">In Progress</option>
  //   </select>
  //   <div>
  //     <button className = 'edit-button' type="submit">Edit</button>
  //     <button className = 'delete-button' type="button" id="cancel-button" onClick={toggleForm(true)}>
  //       Cancel
  //     </button>
  //   </div>
  // </form>
  // );

  /// Map projects to JSX
  const issueListItems = issues.map((issue, index) => (
    <div className={'ticket-form'}>
      <h2 className="project-title">{issue.projectName}</h2>
      <p className="project-priority">
        <strong>Priority:</strong> {issue.priority}
      </p>
      <p className="project-status">
        <strong>Status:</strong> {issue.status}
      </p>
      {/* <button className="edit-button" onClick={() => handleEdit(index)}> Edit </button> */}
      <button className="delete-button" onClick={() => deleteProject(issue.projectName)}>
        Delete
      </button>
    </div>
  ));

  /// Render
  return (
    <div>
      <header className="ticket-header2">
        {/* <img src={logo} alt="Logo" style={{ float: 'left', height: '80px', width: '90px', backgroundColor: '#fcfcfc' }} /> */}
        <h1 style={{ marginLeft: '60px' }}>Projects</h1>
      </header>
      <main className="ticket-main">
        {createIssueButton}
        <select className="ticket-select" onChange={sortFunction}>
          <option value="">Sort by:</option>
          <option value="name">Title</option>
          <option value="assignee">Assignee</option>
          <option value="priority-Low-to-High">Priority (Low to High)</option>
          <option value="status-In Progress-to-Done">Status (In Progress to Done)</option>
        </select>
        {newIssueForm}
        {/* {editIssueForm} */}
        <div id="issue-list" className="ticket-project">
          {issueListItems}
        </div>
      </main>
    </div>
  );
};

export default App;
