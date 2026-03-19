const usersModel = require('../models/usersModel');

// CREATE
const createUser = async (req, res) => {
    try {
        const { user_id, user_name, fav_routes } = req.body;

        const userData = {
            user_id,
            user_name,
            fav_routes
        };
    
        const newUser = await usersModel.create(userData);
        
        res.status(201).json(newUser);
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar o usuário', error: error.message });
    }
};

// READ (All)
const getAllUsers = async (req, res) => {
  try {
    const users = await usersModel.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar os usuários', error: error.message });
  }
};

// READ (id)
const getUsersById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar o usuário', error: error.message });
  }
};

// UPDATE
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_name, fav_routes } = req.body;

    // Verificamos se o usuário existe antes de atualizar
    const userExists = await usersModel.findById(id);
    if (!userExists) {
      return res.status(404).json({ message: 'Usuário não encontrado para atualização.' });
    }

    const updatedData = { user_name, fav_routes };
    const updatedUser = await usersModel.update(id, updatedData);

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar o usuário', error: error.message });
  }
};
    // DELETE
    const deleteUser = async (req, res) => {
      try {
        const { id } = req.params;
        const affectedRows = await usersModel.remove(id);
    
        if (affectedRows === 0) {
          return res.status(404).json({ message: 'Usuário não encontrado para exclusão.' });
        }
        
        // 204 = No Content (sucesso, mas não retorna nada, precisa adicionar mensagem)
        res.status(204).send(); 
      } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar o usuário.', error: error.message });
      }
    };

    //exporta as funções
module.exports = {
  createUser,
  getAllUsers,
  getUsersById,
  updateUser,
  deleteUser
};