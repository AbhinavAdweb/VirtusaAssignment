# Virtusa Assignment

### Steps:
1) Open the project in the VS code
2) Use **npm install** to install all the npm modules
3) Create a database **virtusa** in the mySQl (or any database of your choice)
4) Create a table **vusers** with the following definitions


| Field     | Type         | Null | Key | Default | Extra          |
|-----------|--------------|------|-----|---------|----------------|
| id        | int(11)      | NO   | PRI | NULL    | auto_increment |
| name      | varchar(100) | NO   |     | NULL    |                |
| age       | int(3)       | NO   |     | NULL    |                |
| email     | varchar(100) | NO   |     | NULL    |                |
| createdAt | date         | YES  |     | NULL    |                |
| updatedAt | date         | YES  |     | NULL    |                |

5) Update the database configuration in the database.js file in config directory. Update with the correct user name, password, host etc
6) Now run using command **npm start**
7) In the browser you can start with the index URL at "http://localhost:3000" and in the token input box, enter **virtusa**
8) You can run test cases using **npm test**

### Note that some of the changes on the page http://localhost:3000/users after adding/updating/deleting user will only load after a refresh