import React, { useState } from "react";
import "./Projects.css";
let firstTime = true;
let isEdit = false;
const initialIssue = {
  _id: "",
  projectName: "",
  description: "",
  priority: "Medium",
  status: "Open",
};

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [issues, setIssues] = useState([]);
  const [editIssue, setEditIssue] = useState(initialIssue);

  const fetchProjectById = (id) => {
    fetch(`http://localhost:3000/api/projects/${id}`)
      .then((response) => response.json())
      .then((data) => setEditIssue(data));
  };

  /// Fetch projects from backend
  const fetchProjects = async () => {
    fetch("http://localhost:3000/api/projects")
      .then((response) => response.json())
      .then((data) => setIssues(data));
  };

  /// Create project via API call to backend
  /// then fetch projects from backend to update state
  const createProject = async (ticket) => {
    fetch("http://localhost:3000/api/projects/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticket),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        fetchProjects();
      })
      .catch((error) => {
        alert(error);
        console.error("Error:", error);
      });
  };
  if (firstTime) {
    fetchProjects();
    firstTime = false;
  }

  const updateProject = (id, project) => {
    isEdit = false;
    fetch(`http://localhost:3000/api/projects/edit/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((response) => response.json().then((data) => ({ code: response.status, data })))
      .then((result) => {
        if (result.code == 400) {
          alert(result.data.message);
        }
        fetchProjects();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  /// Delete project via API call to backend
  /// then fetch projects from backend to update state
  const deleteProject = async (title) => {
    fetch(`http://localhost:3000/api/projects/delete/${title}`, {
      method: "DELETE",
    })
<<<<<<< Updated upstream
      .then(response => response.json().then(data => ({ code: response.status, data })))
      .then(result => {
=======
      .then((response) => response.json().then((data) => ({ code: response.status, data })))
      .then((result) => {
>>>>>>> Stashed changes
        if (result.code == 400) {
          alert(result.data.message);
        }
        fetchProjects();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  /// Handle form submission for creating a new project
  /// TODO: Add validation
  const handleSubmit = (event) => {
    event.preventDefault();
    const { _id, title_input, description_input, priority_select, status_select } = Object.fromEntries(
      new FormData(event.target)
    );
    console.log(_id, title_input, description_input, priority_select, status_select);

    const isNew = _id != -1;

    const newIssue = {
      _id: isNew ? _id : "",
      projectName: title_input,
      description: description_input,
      priority: priority_select,
      status: status_select,
    };

    isNew ? updateProject(_id, newIssue) : createProject(newIssue);
    setShowForm(false);
    setEditIssue(initialIssue);
    event.target.reset();
  };

  ///Toggle form visibility for creating a new project or editing an existing project
  const toggleForm = () => {
    isEdit = false;
    setEditIssue(initialIssue);
    setShowForm(!showForm);
  };

  const handleEdit = (id) => {
    console.log(id);
    fetchProjectById(id);
    toggleForm();
    isEdit = true;
  };

  /// Sort projects by name, assignee, priority, or status
  /// We sort here and not in the backend because there is no API endpoint for sorting
  const sortFunction = (event) => {
    const sortBy = event.target.value;
    const sortedIssues = [...issues];

    if (sortBy === "name") {
      sortedIssues.sort((a, b) => a.projectName.localeCompare(b.projectName));
    } else if (sortBy === "priority-Low-to-High") {
      sortedIssues.sort((a, b) => {
        const priorityOrder = { Low: 1, Medium: 2, High: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
    } else if (sortBy === "status-In Progress-to-Done") {
      sortedIssues.sort((a, b) => {
        const statusOrder = { "In progress": 1, Done: 2 };
        return statusOrder[a.status] - statusOrder[b.status];
      });
    }

    setIssues(sortedIssues);
  };

  /// Create Project button
  const createIssueButton = (
    <button className="edit-button" id="create-issue-button" onClick={toggleForm}>
      Create Project
    </button>
  );

  /// Form for creating a new project
  const newIssueForm = showForm && (
    <form className="ticket-form" id="new-issue-form" onSubmit={handleSubmit}>
      <label className="ticket-label" htmlFor="title_input">
        Project title:
      </label>
      <input
        className="ticket-input"
        type="text"
        id="title_input"
        name="title_input"
        defaultValue={editIssue.projectName}
        required
      />
      <label className="ticket-label" htmlFor="description_input">
        Project Description:
      </label>
      <textarea
        className="ticket-textarea"
        id="description_input"
        name="description_input"
        defaultValue={editIssue.description}
        required
      />
      <label className="ticket-label" htmlFor="priority_input">
        Priority:
      </label>
      <select className="ticket-select" class="ticket-select" id="priority_select" name="priority_select">
        {editIssue.priority == "High" ? (
          <option value="High" selected>
            High
          </option>
        ) : (
          <option value="High">High</option>
        )}

        {editIssue.priority == "Medium" ? (
          <option value="Medium" selected>
            Medium
          </option>
        ) : (
          <option value="Medium">Medium</option>
        )}

        {editIssue.priority == "Low" ? (
          <option value="Low" selected>
            Low
          </option>
        ) : (
          <option value="Low">Low</option>
        )}
      </select>
      <label className="ticket-label" htmlFor="status_select">
        Status:
      </label>
      <select className="ticket-select" id="status_select" name="status_select">
        {editIssue.status == "Done" ? (
          <option value="Done" selected>
            Done
          </option>
        ) : (
          <option value="Done">Done</option>
        )}

        {editIssue.status == "In progress" ? (
          <option value="In progress" selected>
            In Progress
          </option>
        ) : (
          <option value="In progress">In Progress</option>
        )}
      </select>
      <input type="hidden" id="_id" name="_id" value={editIssue._id || -1}></input>
      <div>
        <button className="edit-button" type="submit">
          {isEdit ? "Edit" : "Create"}
        </button>
        <button className="delete-button" type="button" id="cancel-button" onClick={toggleForm}>
          Cancel
        </button>
      </div>
    </form>
  );

  /// Map projects to JSX
  const issueListItems = issues.map((issue) => (
    <div className={"ticket-form"}>
      <h2 className="project-title">{issue.projectName}</h2>
      <p className="project-description">
        <strong>Description:</strong> {issue.description}
      </p>
      <p className="project-priority">
        <strong>Priority:</strong> {issue.priority}
      </p>
      <p className="project-status">
        <strong>Status:</strong> {issue.status}
      </p>
      <div>
        <button className="edit-button" onClick={() => handleEdit(issue._id)}>
          Edit
        </button>
        <button className="delete-button" onClick={() => deleteProject(issue.projectName)}>
          Delete
        </button>
      </div>
    </div>
  ));

  /// Render
  return (
    <div>
      <header className="ticket-header2">
        {/* <img src={logo} alt="Logo" style={{ float: 'left', height: '80px', width: '90px', backgroundColor: '#fcfcfc' }} /> */}
        <h1 style={{ marginLeft: "60px" }}>Projects</h1>
      </header>
      <main className="ticket-main">
        {createIssueButton}
        <select className="ticket-select" onChange={(e) => sortFunction(e)}>
          <option value="">Sort by:</option>
          <option value="name">Title</option>
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
