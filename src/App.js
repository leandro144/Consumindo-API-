import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi'
import './styles.css';
import api from './services/api'


function App() {

const [input, setInput] = useState('');
const [cep, setCep] = useState({});

async function handlesearch(){
  if(input === ''){
    alert("Por favor preencha este campo")
    return;
  }

  try {
    const response = await api.get(`${input}/json`)
    setCep(response.data);
    setInput("")
  } catch {
    alert("Erro ao buscar");
    setInput("")
  }
}

  return (
    <div className="container">
     <h1 className="title"> Buscador CEP</h1>

     <div className="containerInput">
      <input 
        type="text"
        placeholder="Digite seu cep..." 
        value={input}
        onChange={((e) => setInput(e.target.value))}
        />

        <button className="buttonSearch" onClick={handlesearch}>
          <FiSearch size={25} color="#fff" />
        </button>
     </div>

    {Object.keys(cep).length > 0 && (
      <main>
        <h2>CEP: {cep.cep}</h2>

        <span>{cep.logradouro}</span>
        <span>Complemento: {cep.complemento}</span>
        <span>{cep.bairro}</span>
        <span>{cep.localidade} - {cep.uf}</span>
     </main>
    )}
    </div>
  );
}

export default App;
