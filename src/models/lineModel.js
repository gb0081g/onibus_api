const pool = require('../config/db');

// Função para criar uma nova linha
const create = async (data) => {
  const { route_name,route_number,route_origin,route_destination,route_way,bus_number } = data;
  const sql = 'INSERT INTO route (route_name,route_number,route_origin,route_destination,route_way,bus_number) VALUES (?, ?, ?, ?, ?, ?)';
  
  const [result] = await pool.execute(sql, [route_name, route_number, route_origin, route_destination, route_way, bus_number]);
  return { id_route: result.insertId, ...data };
};

// Função para buscar todoas as linhas
const findAll = async () => {
  const [rows] = await pool.execute('SELECT * FROM bus_db.route');
  return rows;
};

// Função para buscar uma linha pelo ID
const findById = async (id) => {
  const [rows] = await pool.execute('SELECT id_route, route_name,route_number,route_origin,route_destination,route_way,bus_number FROM route WHERE id_route = ?', [id]);
  return rows[0];
};

// Função para editar uma linha pelo ID
const update = async (id, data) => {
  const { route_name, route_number, route_origin, route_destination, route_way, bus_number } = data;
  const sql = 'UPDATE route SET route_name = ?, route_number = ?, route_origin = ?, route_destination = ?, route_way = ?, bus_number = ? WHERE id_route = ?';
  
  await pool.execute(sql, [route_name, route_number, route_origin, route_destination, route_way, bus_number, id]);
  return { id_linha: id, ...data };
};

// Função para deletar uma linha pelo ID
const remove = async (id) => {
  const [result] = await pool.execute('DELETE FROM linha WHERE id_linha = ?', [id]);
  return result.affectedRows;
};

// Exporta as funções
module.exports = {
  create, 
  findAll,
  findById,
  update,
  remove
};