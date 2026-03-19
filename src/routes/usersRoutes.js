const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Rota para CRIAR (Create) um usuário
router.post('/users', usersController.createUser);



//Rota para LER (Read) todos os registros de usuário
router.get('/users/all', usersController.getAllUsers);

//Rota para LER (Read) um usuário pelo ID
router.get('/users/:id', usersController.getUsersById);

//Rota para ATUALIZAR (Update) um usuário pelo ID
router.put('/users/:id', usersController.updateUser);

//Rota para DELETAR (Delete) um usuário pelo ID
router.delete('/users/:id', usersController.deleteUser);

module.exports = router;