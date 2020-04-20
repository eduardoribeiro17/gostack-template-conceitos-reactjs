import React, { useState, useEffect } from 'react';

import api from './services/api';
import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    api.get('repositories').then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'gostack-template-conceitos-reactjs',
      owner: 'eduardoribeiro17',
      url:
        'https://github.com/eduardoribeiro17/gostack-template-conceitos-reactjs',
      techs: ['React', 'ReactJS'],
      likes: '2',
    });
    console.log(response.data);
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`).then((response) => {
      if (response.status === 204) {
        const newRepositories = repositories.filter((r) => r.id !== id);
        setRepositories(newRepositories);
      }
    });

    console.log(`Removido Repositório ID: `, id);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
