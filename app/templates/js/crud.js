const apiUrl = 'http://localhost:5000';

function getAPI(url, token) {
  return new Promise(async (next, reject) => {
    try {
      const chamada = await fetch(`${apiUrl}/api/${url}/`, { headers: { Authorization: `Bearer ${token}` } });
      const dados = await chamada.json();

      if(dados.erro)
        return reject(dados.erro);
    
      next(dados);
    } catch(error) {
      reject('Não foi Possível Conectar ao Servidor');
    }
  });
}
  
function deleteAPI(url, id) {
  return new Promise(async (next, reject) => {
    try {
      const chamada = await fetch(`${apiUrl}/api/${url}/${id}`, {
        method: 'DELETE'
      });
    
      const dados = await chamada.json();
    
      if(dados.erro)
        return reject(dados.erro);
    
      next();
    } catch(erro) {
      reject('Erro ao Conectar com o Servidor');  
    }
  });
}
  
function editAPI(url, id, dadosParaEdicao) {
  return new Promise(async (next, reject) => {
    const body = JSON.stringify(dadosParaEdicao);
    
    try {
      const chamada = await fetch(`${apiUrl}/api/${url}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body
      });
            
      const dados = await chamada.json();
          
      if(dados.erro)
        return reject(dados.erro);
     
      next(dados);
    } catch(erro) {
      reject('Erro ao Conectar ao Servidor');
    }
  });
}
    
  
function postAPI(url, dadosParaCadastro) {
  return new Promise(async (next, reject) => {
    const body = JSON.stringify(dadosParaCadastro);
    
    try {
      const chamada = await fetch(`${apiUrl}/api/${url}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body
      });
            
      const dados = await chamada.json();
          
      if(dados.erro)
        return reject(dados.erro);
  
      next(dados);
    } catch(erro) {
      console.log(erro);
      reject('Erro ao Conectar ao Servidor');
    }
  });
}