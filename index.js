const express = require('express');
const app = express();
const port = 3000;

const usersController = require('./src/controllers/users');
const bodyParser = require('body-parser');
   
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))

app.get('/users/get', usersController.userGet)

app.post('/users/register', usersController.signUp);
app.post('/users/login', usersController.signIn);
app.post('/users/update/:id', usersController.updateAccount);

app.delete('/users/delete/:id', usersController.deleteAccount);

app.listen(port, function () { 
    console.log(`Server Running on localhost:${port}`);
});  