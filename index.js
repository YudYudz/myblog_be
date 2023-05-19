const express = require('express');
const app = express();
const port = 3030;
const cors = require('cors');

const usersController = require('./src/controllers/users');
const bodyParser = require('body-parser');

app.use(cors());    
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))

app.post('/users/register', usersController.signUp);
app.post('/users/login', usersController.signIn);
app.post('/users/update/:id', usersController.updateAccount);

app.delete('/users/delete/:id', usersController.deleteAccount);

app.listen(port, function () { 
    console.log(`Server Running on localhost:${port}`);
});  