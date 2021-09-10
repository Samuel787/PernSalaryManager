# PernSalaryManager

A salary manager developed with PERN stack

![Landing Page](/docs/image1.png)

## Setting up

1. Clone the project into a local directory by running the command in that dir:
   `$ git clone https://github.com/Samuel787/PernSalaryManager.git`

2. Install PostgreSQL as it is used as the local database for this project. Run the commands in `/server/database.sql` to set up the database and table in your local PostgreSQL engine.
3. Navigate to `server/db.js` and change the code to use your local PostgreSQL:

```javascript
const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "employee_manager",
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

### Steps to upload users csv file

1. Click on the upload button as shown in the image below
   ![Upload Button](/docs/us1-1.png)
2. The pop up shown below will open up. Click on "Choose File" to pick the csv file that you want to upload and press the green `Upload` button.
   > :exclamation: Only csv files will be accepted by the backend
   > ![Choose File](/docs/us1-2.png)
3. The backend will process the CSV file based on the following rules:
   - File should be in UTF-8 encoding to allow for non-English characters.
   - It contains 4 columns in the following order:
     - id - employee ID
     - login - employee login
     - name - non-unique name.
     - salary - decimal that is >= 0.0.
   - First row is for heading information that is ignored.
   - All 4 columns must be filled.
   - Any row starting ZLWK ³#´ LV cRQVLdeUed a cRPPeQW aQd LgQRUed.
   - id and login must be unique. They cannot be repeated in another row.
4. Upon successful upload of the CSV file (also successfully inserting and updating the data into the database), the client will be able to observe an alert saying that upload has been successful.
   ![Upload successful](/docs/us1-3.png)
5. If the upload was a failure (concurrent uploads are not allowed), then a failure alert will be displayed as shown below:
   ![Upload failure](/docs/us1-4.png)

## User Story 2: Employee Dashboard feature

1. The image of the client dashboard is already shown above.
2. Pagination with API call is implemented so that only a maximum of 30 employees' details can be viewed at a time.
3. Redux was adopted as state management tool

### Filtering based on salary range

1. Users can filter the employees based on their salary range as shown in the screenshot of the UI below. After inputting the minimum and maximum salary, they have to press `Filter`
   ![Salary Range Filter](/docs/us2-1.png)
2. :computer: <b>Edge Case 1</b>: If mimimum salary is left empty, it will default to 0
3. :computer: <b>Edge Case 2</b>: If maximum salary is left empty, it will default trillion. (I made a reasonable assumption that no one's going to have that big of a salary)
4. :computer: <b>Edge Case 3</b>: If maximum salary is less than minimum salary, user will be alerted with an error.
   ![Max less than Min salary](/docs/us2-2.png)

### Sorting by id, employee name, login or salary (ascending or descending)

1. Users can view sorted employee data by using the side bar:
   ![Sorting Employees](/docs/us2-3.png)
2. When an option is green, that means the data is sorted by that attribute. In the image above, the data has been sorted by employee id (which is the default). By clicking on it again, it will turn red to indicate that now the data is sorted in descending order as shown in the image below:
   ![Descending sort by employee id](/docs/us2-4.png)
3. By clicking another attribute in the sidebar, you can sort the data either in ascending or descending order of that attribute
   > :exclamation: The data can only be sorted by 1 attribute at a time

### Exposed API for automated testing

The following API are exposed:

- HTTP Get /users
- RequestParams: One example as follows
  - /users?minSalary=0&maxSalary=4000&offset=0&limit=30&sort=+name
  - offset is the position of the starting point to retrieve in the SQL query
  - limit is the total number of items to retrieve, should be fixed as 30
  - - means ascending, - means descending.
  - The sort order columns are id, name, login, salary
  - The sort request param takes in one sort key at a time
- If any of request params is missing, HTTP 400 status is returned
- If any of request params data format is invalid, HTTP 400 status is returned
- If successful, return data in json format as follows
  - {results:[{id:e0001, name: John, login: john, salary: 1000.00}, ...]}
