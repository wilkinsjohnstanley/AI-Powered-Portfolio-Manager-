const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
//Sample route
app.get('/', (req, res) => {
    res.send('Backend is running!');
});
//Start server
app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`);
});