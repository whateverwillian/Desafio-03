import React, { useState, useEffect } from "react";

import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    api.post('repositories', {
      title: `New Example at ${Date.now()}`,
      url: 'example.com',
      techs: [
        'Nodejs',
        'Reactjs',
        'React Native'
      ]
    }).then(response => {
      const data = response.data
      setRepositories([...repositories, data])
    })
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(response => {
      const index = repositories.findIndex(repositorie => repositorie.id === id)
      const newRepositorie = [...repositories]
      newRepositorie.splice(index, 1)
      setRepositories(newRepositorie)

    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
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
