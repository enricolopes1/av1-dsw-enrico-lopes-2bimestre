const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.listar = async (req, res) => {
  const tarefas = await prisma.tarefa.findMany();

  res.json(tarefas);
};

exports.buscar = async (req, res) => {
  const { id } = req.params;

  const tarefa = await prisma.tarefa.findUnique({
    where: {
      id: Number(id)
    }
  });

  res.json(tarefa);
};

exports.criar = async (req, res) => {
  const { titulo, descricao } = req.body;

  const tarefa = await prisma.tarefa.create({
    data: {
      titulo,
      descricao
    }
  });

  res.json(tarefa);
};

exports.atualizar = async (req, res) => {
  const { id } = req.params;

  const { titulo, descricao, concluida } = req.body;

  const tarefa = await prisma.tarefa.update({
    where: {
      id: Number(id)
    },
    data: {
      titulo,
      descricao,
      concluida
    }
  });

  res.json(tarefa);
};

exports.deletar = async (req, res) => {
  const { id } = req.params;

  await prisma.tarefa.delete({
    where: {
      id: Number(id)
    }
  });

  res.json({
    mensagem: 'Tarefa deletada'
  });
};