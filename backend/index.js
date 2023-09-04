const express = require('express');
const app = express();
const port = 5000;
const mongoDB = require('./db');
const cors = require('cors');
app.use(express.json());

app.use(cors());

mongoDB();


app.use('/api', require('./Routes/CreateUser'))
app.use('/api', require('./Routes/DisplayData'))

app.listen(port, ()=> {
    console.log(`App listening on port ${port}`)
})
