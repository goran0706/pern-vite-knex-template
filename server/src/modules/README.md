# Layered software architecture

## **Repository Layer:**

**Definition:** The repository layer is responsible for managing data access and
storage. It abstracts the interaction with the underlying database or data
source. It often includes operations for creating, reading, updating, and
deleting (CRUD) data entities.

Repository is a module that contains functions related to database operations
for a specific entity (e.g., users).

**Responsibility:**

- Manages the data storage and retrieval operations.
- These functions abstract away the details of database queries.

**Examples:**

- Implementation to fetch user from the database
- Implementation to save user data to the database
- Other data-related methods...

## **Service Layer:**

**Definition:** The service layer contains business logic and serves as an
intermediary between the repository (data access) layer and the controller
(presentation) layer. It encapsulates the application's business rules, performs
operations, and coordinates interactions between different components.

This layer can contain business logic and coordinate multiple database
operations if needed.

**Responsibility:**

- Contains business logic and acts as an intermediary between the controller and
  the repository.
- It encapsulates operations that involve multiple steps or complex logic.
- It utilizes the repository functions.

**Examples:**

- Validate input, perform business logic, and interact with the repository
- Additional logic...send to loggingSystem, sendEmail...
- Other service methods...

## **Controller Layer:**

**Definition:** The controller layer handles incoming requests from the user
interface or external systems. It interprets these requests, invokes the
appropriate actions in the service layer, and manages the flow of data between
the service layer and the user interface.

This layer keeps your route definitions clean allowing to map routes with
request handlers. This layer focuses on handling HTTP requests.

**Responsibility:**

- Handles HTTP requests, processes input data, and interacts with the service
  layer to perform business logic.
- It returns an appropriate HTTP status code and response.
- It handles errors directly or passes the error to the next request handler or
  a centralized error handler.

**Examples:**

- Endpoints to handle user registration
- Other controller endpoints...

## **DAO Layer (Data Access Object Layer):**

**Definition:** The DAO layer is similar to the repository layer and is
responsible for encapsulating the details of data access and storage. DAOs
provide a more abstract interface for data operations, typically associated with
a specific data source. The term "DAO" is often used in the context of
object-relational mapping (ORM) frameworks.

## **DTO Layer (Data Transfer Object Layer):**

**Definition:** The DTO layer is responsible for defining objects that transfer
data between different layers of an application. DTOs are used to package and
transfer data between the service layer and the controller layer or between
different services. They often represent a subset of the data model tailored for
specific use cases.

---

### Router:

Defines the routes for your application and connects them to the corresponding
controller methods (HTTP handlers).

**Responsibility:**

- It maps the routes to the controller methods.
- It acts as a bridge between incoming HTTP requests and the controllers.

**Examples:**

- Mapping user creation endpoint to the request handler
  router.post('/api/users/', userCtrl.createUser)
- Other routes declarations and route params

### In summary:

- **Repository Layer:** Manages data access and storage operations, abstracting
  interactions with the database.

- **Service Layer:** Contains business logic, coordinates interactions between
  components, and serves as an intermediary between the repository layer and the
  controller layer.

- **Controller Layer:** Handles incoming requests, interprets them, and manages
  the flow of data between the user interface and the service layer.

- **DAO Layer:** Manages data access and encapsulates details of data storage,
  often associated with ORM frameworks.

- **DTO Layer:** Defines objects for transferring data between different layers
  of the application, facilitating communication between components.

**Note:** The terms "DAO" (Data Access Object) and "repository" are used
interchangeably. Both refer to a component in the application responsible for
handling data access and storage operations, abstracting the interaction with
the underlying database or data source.

REST-api example included in this template.

```js
User
Routes

GET: /api/us
ers                           // Get all users
POST: /api/us
ers                          // Create a new user
GET: /api/us
ers /
:
userId                   // Get user by ID
PUT: /api/us
ers /
:
userId                   // Update user
DELETE: /api/us
ers /
:
userId                // Delete user
```

```js
User
's Posts Routes

GET: /api/us
ers /
:
userId / posts             // Get posts for a specific user
POST: /api/us
ers /
:
userId / posts            // Create a new post for the user
GET: /api/us
ers /
:
userId / posts /
:
postId     // Get a specific post for a user
PUT: /api/us
ers /
:
userId / posts /
:
postId     // Update a specific post for a user
DELETE: /api/us
ers /
:
userId / posts /
:
postId  // Delete a specific post for a user
```
