const lineModel = require('../models/lineModel');

// CREATE
const createLine = async (req, res) => {
  try {
    const { route_name, route_number, route_origin, route_destination, route_way, bus_number } = req.body;

    const lineData = {
      route_name,
      route_number,
      route_origin,
      route_destination,
      route_way,
      bus_number
    };

    const newLine = await lineModel.create(lineData);
    
    res.status(201).json(newLine);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar a linha de onibus', error: error.message });
  }
};

// READ (All)
const getAllLine = async (req, res) => {
  try {
    const lines = await lineModel.findAll();
    res.status(200).json(lines);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar as linhas', error: error.message });
  }
};

// READ (id)
const getLineById = async (req, res) => {
  try {
    const { id } = req.params;
    const line = await lineModel.findById(id);

    if (!line) {
      return res.status(404).json({ message: 'Linha não encontrada.' });
    }
    res.status(200).json(line);

  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar a linha', error: error.message });
  }
};

// UPDATE
const updateLine = async (req, res) => {
  try {
    const { id } = req.params;
    const { route_name,route_number,route_origin,route_destination,route_way,bus_number } = req.body;

    // Verificamos se a linha existe antes de atualizar
    const lineExists = await lineModel.findById(id);
    if (!lineExists) {
      return res.status(404).json({ message: 'Linha de onibus não encontrada para atualização.' });
    }

    const updatedData = { route_name, route_number, route_origin, route_destination, route_way, bus_number };
    const updatedLine = await lineModel.update(id, updatedData);

    res.status(200).json(updatedLine);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar a linha', error: error.message });
  }
};

// DELETE
const deleteLine = async (req, res) => {
  try {
    const { id } = req.params;
    const affectedRows = await lineModel.remove(id);

    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Linha não encontrada para exclusão.' });
    }
    
    // 204 = No Content (sucesso, mas não retorna nada, precisa adicionar mensagem)
    res.status(204).send(); 
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar a linha.', error: error.message });
  }
};

//exporta as funções
module.exports = {
  createLine,
  getAllLine,
  getLineById,
  updateLine,
  deleteLine
};