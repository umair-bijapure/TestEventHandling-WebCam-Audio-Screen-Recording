require("dotenv").config();
const express = require('express');
const app = express();
app.use(express.json());
require("./database/database").connect();



const cors = require("cors");
const auth = require('./routes/auth');
const users = require('./routes/user');

app.use(cors());


app.get('/', (req, res) => {
    res.send('Welcome to Promaestro!');
  });



console.log("Step 1")
app.use('/api/auth', auth);
app.use("/api/user", users);


console.log(process.env.MONGODB_URI,"EventHandleTest");



const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});
