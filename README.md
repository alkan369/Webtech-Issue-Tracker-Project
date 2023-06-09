#### Repository for the Issue Tracker Project Of Group №2

The project consists of 4 parts: 
* Frontend(Login/Register)
* Frontend(client)
* Backend(Server)
* Database(MongoDB)

----

## Architecture diagram of the whole project

A png file is present

---

## Frontend(Login/Register)

The login/register functionality is implemented using React. It is separated into two files:  
**Welcome.js:**  
The file creates a registration form that has an animated login form which slides up/down
when the labels Login/Register are clicked. All the fields in the forms are required.
The data is validated before it is sent to the server to check the data in the database.

**FormFunctions.js:**  
This file contains various form handling functions used in the welcome page.
- useFormState()  
  Custom hook for managing form state.  
  Returns an object containing form state values and setter functions.
- handleRegistration(navigate, registrationData)  
  Handles the user registration process.  
  Parameters:  
    - navigate (function): The navigation function to redirect the user.  
    - registrationData (object): The user registration data.
- handleLogin(navigate, loginData)  
  Handles the user login process.  
  Parameters:  
    - navigate (function): The navigation function to redirect the user.  
    - loginData (object): The user login data.
- handleTogglePasswordVisibility(inputId, setEyeClass)  
  Toggles the visibility of a password field.  
  Parameters:  
    - inputId (string): The ID of the password field.  
    - setEyeClass (function): The state setter function for the eye icon class.
- handleLoginVisibility(setLoginVisibility, isLoginVisible)  
  Toggles the visibility of the login form.
  Parameters
    - setLoginVisibility (function): The state setter function for login form visibility.
    - isLoginVisible (boolean): The current login form visibility state.


---

## Frontend(client)
The client is created with React. The project is divided in 3 parts. The parts are
Dashboard, Tickets and Projects. The Dashboard part is the main part of the project. It
contains the header, main content (which is both Tickets and Projects) and footer. Each contain
their respective issues.

Projects and Tickets follow the same structure. The documentations for what they do are in
the Projects part (specifically Projects.js). The only differences are the API calls.
Each step is commented on so that the entire process may be clear.

---

## Backend(Server)

The Server is used to connect to the database. It has different variety of endpoits for Tickets, Projects and Users.

The endpoints for the tickets are:
* GET
  * View all existing tickets
  * View a specific ticket by its title
  * View all existing tickets by projectName\
  * View all existing tickets by asignee
  * View all existing tickets by status
* POST
  * Creation of a ticket
* PUT
  * Edit of an existing ticket
* DELETE
  * Deletion of an existing ticket
* 

The endpoints for the projects are:
* GET
  * View all existing projects
  * View a specific project by its name
  * View all existing projects by status
* POST
  * Creation of a project
* PUT
  * Edit of an existing project
* DELETE
  * Deletion of an existing project

The endpoints for the users are:
* GET
  * View all existing users
  * View all existing users by their username
  * View all existing users by their first name
  * View all existing users by their last name
  * View all existing users by their email
* POST
  * Creation of a user
* PUT
  * Edit of a user
* DELETE
  * Deletion of a user

---

## Database(MongoDB)

### MongoDB
The database is created on MongoDB which is popular document-oriented NoSQL database
designed for storing high-volume data. Unlike traditional relational databases with
tables and rows, MongoDB organizes data into documents and collections. Each document
consists of key-value pairs, and collections, which are sets of documents, are analogous
to tables in relational databases.


### Mongoose Library
To facilitate working with MongoDB in Node.js, is used the Mongoose library. Mongoose
serves as an Object Data Modeling (ODM) tool, providing higher-lever abstraction for
MongoDB operations. It helps manage data relations, enforces schema validation, and
facilitates the translation between objects in the code and their representation in
MongoDB.


### Issue-Tracker Database
The project's database consists of 3 collections - Users, Ticket and Projects. Every
collection of the database is divided in 3 parts. The parts are schemas, models and methods.
In the schema part are the schemas of the collections. The schemas define the document's
properties, default values, types of data, validators, etc. The models of the collections
are in the models part. Mongoose model provides an interface for the database to create,
query, update, delete and so on. In the methods part are all the methods of the collections.
They are used for CRUD operations in the endpoints. They are not implemented in the endpoints
so they can be reused. Thus only the data check is implemented in the endpoints.
