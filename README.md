# PernSalaryManager
A salary manager developed with PERN stack

![Landing Page](/docs/image1.png)

## Setting up
1. Clone the project into a local directory by running the command in that dir:
`$ git clone https://github.com/Samuel787/PernSalaryManager.git`

2. Install PostgreSQL as it is used as the local database for this project.
3. Navigate to `server/db.js` and change the code to use your local PostgreSQL:
```javascript
const pool = new Pool({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "employee_manager"
});
```
4. Since this project was created with Node.js, Node is required. Install the latest version of node and npm: https://nodejs.org/en/
5. Run `npm install` in `/server` to install all the required dependencies for node server
6. Run `npm install` in ` /client` to install all the required dependencies for web client
7. To start the server run the following command in the root directory: 
`$ node server`
The server will run on port 5000 upon starting successfully.
8. To start the client, run the following command in the `/client` directory:
`npm start`
This will open up the client web page on your browswer.

## User Story 1: Upload Users
###Steps to upload users csv file
1. Click on the upload button as shown in the image below
![Uploading ]
