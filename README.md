#### Repository for the Issue Tracker Project Of Group №2

The project consists of 4 parts: 
* Frontend(Login/Register)
* Frontend(client)
* Backend(Server)
* Database(MongoDB)

----

## Architecture diagram of the whole project

To be updated

---

## Frontend(Login/Register)

To be updated

---

## Frontend(client)
The frontend is created with React. The project is divided in 3 parts. The parts are
Dashboard, Tickets and Projects. The Dashboard part is the main part of the project. It
contains the header, main content (which is both Tickets and Projects) and footer. The
Tickets part contains the tickets of the project. The Projects part contains the projects
of the users.

Projects and Tickets follow the same structure. The documentations for what they do are in
the Projects part. The only difference is the API calls.

---

## Backend(Server)

To be updated

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