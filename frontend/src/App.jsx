import { useEffect, useState } from 'react';
import api from './services/api';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  async function carregarTarefas() {
    const response = await api.get('/tarefas');

    setTarefas(response.data);
  }

  async function criarTarefa(e) {
    e.preventDefault();

    await api.post('/tarefas', {
      titulo,
      descricao
    });

    setTitulo('');
    setDescricao('');

    carregarTarefas();
  }

  async function deletarTarefa(id) {
    await api.delete(`/tarefas/${id}`);

    carregarTarefas();
  }

  useEffect(() => {
    carregarTarefas();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">

        <h1 className="text-3xl font-bold mb-6">
          Sistema de Tarefas
        </h1>

        <form
          onSubmit={criarTarefa}
          className="flex flex-col gap-4 mb-6"
        >
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="border p-3 rounded"
          />

          <input
            type="text"
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="border p-3 rounded"
          />

          <button
            className="bg-blue-500 text-white p-3 rounded"
          >
            Criar tarefa
          </button>
        </form>

        <div className="flex flex-col gap-4">
          {tarefas.map((tarefa) => (
            <div
              key={tarefa.id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <h2 className="font-bold">
                  {tarefa.titulo}
                </h2>

                <p>
                  {tarefa.descricao}
                </p>
              </div>

              <button
                onClick={() => deletarTarefa(tarefa.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Excluir
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;