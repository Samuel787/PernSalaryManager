const makeApp = require("./app");
const database = require('./database');

const app = makeApp(database)

app.listen(5000, () => {
    console.log("server has started on port 5000")
})
