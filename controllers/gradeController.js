import { db } from '../models/index.js';
import { logger } from '../config/logger.js';
import { studentModel } from '../models/student.js';
import cors from 'cors';

const create = async (req, res) => {
  console.log('famigerado create');

  const student = new studentModel(req.body);

  console.log("ins", req.body);

  try {

    await student.save();
    res.send(student);
    logger.info(`POST /grade - ${JSON.stringify()}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  console.log('famigerado find all');
  const name = req.query.name;
  
  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};

    console.log("condition", condition);
    const student = await studentModel.find(condition);

  try {
    res.send(student);
    logger.info(`GET /grade`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  console.log('famigerado idaaaaaaaaaaaaaaaaaaaaa', id);

  const student = await studentModel.findById(id);
  
  try {
    res.send(student);

    logger.info(`GET /grade - ${id}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  
  const id = req.params.id;
  
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }
    
  const student = await studentModel.findByIdAndUpdate(
    id,
    req.body
  );

  try {
    res.send({ message: 'Grade atualizado com sucesso' });

    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  
  const id = req.params.id;

  const student = await studentModel.findByIdAndDelete(
    id
  );

  try {
    res.send({ message: 'Grade excluido com sucesso' });

    logger.info(`DELETE /grade - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  console.log('famigerado removeAll');
  
  const student = await studentModel.deleteMany();

  try {
    res.send({
      message: `Grades excluidos`,
    });
    logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
