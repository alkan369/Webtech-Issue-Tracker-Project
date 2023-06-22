import React, { useEffect, useState } from "react";
import "./Tickets.css";

let firstTime = true;
let isEdit = false;
const initialIssue = {
  _id: "",
  projectName: "",
  title: "",
  description: "",
  priority: "Medium",
  assignedTo: "",
  status: "Open",
};

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [issues, setIssues] = useState([]);
  const [editIssue, setEditIssue] = useState(initialIssue);

  const fetchTicketById = (id) => {
    fetch(`http://localhost:3000/api/tickets/${id}`,{
      headers:{
        "Authorization": `Bearer ${sessionStorage.getItem("userToken")}`
      }
    })
      .then((response) => response.json())
      .then((data) => setEditIssue(data));
  };

  const fetchTickets = async () => {
    fetch("http://localhost:3000/api/tickets",{
      headers:{
        "Authorization": `Bearer ${sessionStorage.getItem("userToken")}`
      }
    })
      .then((response) => response.json())
      .then((data) => setIssues(data));
  };

  const createTicket = async (ticket) => {
    fetch("http://localhost:3000/api/tickets/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem("userToken")}`
      },
      body: JSON.stringify(ticket),
    })
      .then((response) => response.json().then((data) => ({ code: response.status, data })))
      .then((result) => {
        if (result.code == 400) {
          alert(result.data.message);
        }
        fetchTickets();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const updateTicket = (id, ticket) => {
    isEdit = false;
    fetch(`http://localhost:3000/api/tickets/edit/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem("userToken")}`
      },
      body: JSON.stringify(ticket),
    })
      .then((response) => response.json().then((data) => ({ code: response.status, data })))
      .then((result) => {
        if (result.code == 400) {
          alert(result.data.message);
        }
        fetchTickets();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  if (firstTime) {
    fetchTickets();
    firstTime = false;
  }

  const deleteTicket = async (title) => {
    fetch(`http://localhost:3000/api/tickets/delete/${title}`, {
      method: "DELETE",
      headers:{
        "Authorization": `Bearer ${sessionStorage.getItem("userToken")}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('Success:', data);
        fetchTickets();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { _id, project_input, title_input, description_input, priority_select, assignee_input, status_select } =
      Object.fromEntries(new FormData(event.target));
    const isNew = _id != -1;

    const newIssue = {
      _id: isNew ? _id : "",
      projectName: project_input,
      title: title_input,
      description: description_input,
      priority: priority_select,
      assignedTo: assignee_input,
      status: status_select,
    };

    isNew ? updateTicket(_id, newIssue) : createTicket(newIssue);
    setShowForm(false);
    setEditIssue(initialIssue);
    event.target.reset();
  };

  const toggleForm = () => {
    isEdit = false;
    setEditIssue(initialIssue);
    setShowForm(!showForm);
  };

  const handleDelete = (index) => {
    const updatedIssues = [...issues];
    const title = updatedIssues[index].title;
    deleteTicket(title);
  };

  const handleEdit = (id) => {
    fetchTicketById(id);
    toggleForm();
    isEdit = true;
  };

  const sortFunction = (event) => {
    const sortBy = event.target.value;
    const sortedIssues = [...issues];

    if (sortBy === "name") {
      sortedIssues.sort((a, b) => a.projectName.localeCompare(b.projectName));
    } else if (sortBy === "assignee") {
      sortedIssues.sort((a, b) => a.assignee.localeCompare(b.assignee));
    } else if (sortBy === "priority-Low-to-High") {
      sortedIssues.sort((a, b) => {
        const priorityOrder = { Low: 1, Medium: 2, High: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
    } else if (sortBy === "status-Open-to-Resolved") {
      sortedIssues.sort((a, b) => {
        const statusOrder = { Open: 1, "In progress": 2, Resolved: 3 };
        return statusOrder[a.status] - statusOrder[b.status];
      });
    }
    setIssues(sortedIssues);
  };

  const createIssueButton = (
    <button className="edit-button" id="create-issue-button" onClick={() => toggleForm()}>
      Create Ticket
    </button>
  );

  const issueForm = showForm && (
    <form className="ticket-form" id="new-issue-form" onSubmit={handleSubmit}>
      <label className="ticket-label" htmlFor="title_input">
        Title:
      </label>
      <input
        className="ticket-input"
        type="text"
        id="title_input"
        name="title_input"
        defaultValue={editIssue.title || ""}
        required
      />
      <label className="ticket-label" htmlFor="description_input">
        Description:
      </label>
      <textarea
        className="ticket-textarea"
        id="description_input"
        name="description_input"
        defaultValue={editIssue.description || ""}
      />
      <label className="ticket-label" htmlFor="project_input">
        Project:
      </label>
      <textarea
        className="ticket-textarea"
        id="project_input"
        name="project_input"
        defaultValue={editIssue.projectName || ""}
      />
      <label className="ticket-label" htmlFor="assignee_input">
        Assign:
      </label>
      <input
        className="ticket-input"
        type="text"
        id="assignee_input"
        name="assignee_input"
        defaultValue={editIssue.assignedTo || ""}
      />
      <label className="ticket-label" htmlFor="priority_select">
        Priority:
      </label>
      <select className="ticket-select" id="priority_select" name="priority_select">
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
        {editIssue.status == "Open" ? (
          <option value="Open" selected>
            Open
          </option>
        ) : (
          <option value="Open">Open</option>
        )}

        {editIssue.status == "Resolved" ? (
          <option value="Resolved" selected>
            Resolved
          </option>
        ) : (
          <option value="Resolved">Resolved</option>
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
        <button className="delete-button" type="button" id="cancel-button" onClick={() => toggleForm()}>
          Cancel
        </button>
      </div>
    </form>
  );

  const issueListItems = issues.map((issue, index) => (
    <div className={"ticket-form"}>
      <h2 className="issue-title">{issue.title}</h2>
      <p>{issue.project}</p>
      <p className="issue-assignee">
        <strong>Assignee:</strong> {issue.assignedTo}
      </p>
      <p className="issue-assignee">
        <strong>Description:</strong> {issue.description}
      </p>
      <p className="issue-project">
        <strong>Project:</strong> {issue.projectName}
      </p>
      <p className="issue-priority">
        <strong>Priority:</strong> {issue.priority}
      </p>
      <p className="issue-status">
        <strong>Status:</strong> {issue.status}
      </p>
      <div>
        <button className="edit-button" onClick={() => handleEdit(issue._id)}>
          Edit
        </button>
        <button className="delete-button" onClick={() => handleDelete(index)}>
          Delete
        </button>
      </div>
    </div>
  ));

  return (
    <div>
      <header className="ticket-header1">
        <h1 style={{ marginLeft: "60px" }}>Tickets</h1>
      </header>
      <main className="ticket-main">
        {createIssueButton}
        <select className="ticket-select" onChange={(e) => sortFunction(e)}>
          <option value="">Sort by:</option>
          <option value="name">Project</option>
          <option value="assignee">Assignee</option>
          <option value="priority-Low-to-High">Priority (Low to High)</option>
          <option value="status-Open-to-Resolved">Status (Open to Resolved)</option>
        </select>
        {issueForm}
        <div className="ticket-list" id="issue-list">
          {issueListItems}
        </div>
      </main>
    </div>
  );
};

export default App;
