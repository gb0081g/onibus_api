const pool = require('../config/db');

// Função para criar um novo usuário
const create = async (data) => {
    const {user_name,fav_routes} = data;
    const sql = 'INSERT INTO users (user_name,fav_routes) VALUES ( ?, ?)';

const [result] = await pool.execute(sql, [user_name,fav_routes]);
return { id_user: result.insertId, ...data };
};

// Função para buscar todos os usuários
const findAll = async () => {
    const [rows] = await pool.execute('SELECT * FROM bus_db.users');
    return rows;
};

// Função para buscar um usuário pelo ID
const findById = async (id) => {
    const [rows] = await pool.execute('SELECT user_id, user_name, fav_routes FROM users WHERE user_id = ?', [id]);
    return rows[0];
};

// Função para editar um usuário pelo ID
const update = async (id, data) => {
    const { user_name, fav_routes } = data;
    const sql = 'UPDATE users SET user_name = ?, fav_routes = ? WHERE user_id = ?';

    await pool.execute(sql, [user_name, fav_routes, id]);
    return { id_user: id, ...data };
};

// Função para deletar um usuário pelo ID
const remove = async (id) => {
    const [result] = await pool.execute('DELETE FROM users WHERE user_id = ?', [id]);
    return result.affectedRows;
}

//exporta as funções
module.exports = {
    create,
    findAll,
    findById,
    update,
    remove
};