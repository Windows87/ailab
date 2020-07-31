const apiUrl = 'http://localhost:5000';

function getAPI(url, token) {
  return new Promise(async (next, reject) => {
    try {
      const chamada = await fetch(`${apiUrl}/api/${url}/`, { headers: { Authorization: token } });
      const dados = await chamada.json();


      if(dados.error)
        return reject({...dados, status: chamada.status});
    
      next(dados);
    } catch(error) {
      reject('Não foi Possível Conectar ao Servidor');
    }
  });
}
  
function deleteAPI(url, id, token) {
  return new Promise(async (next, reject) => {
    try {
      const chamada = await fetch(`${apiUrl}/api/${url}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: token }
      });
    
      const dados = await chamada.json();
    
      if(dados.error)
        return reject({...dados, status: chamada.status});
    
      next();
    } catch(erro) {
      reject('Erro ao Conectar com o Servidor');  
    }
  });
}
  
function editAPI(url, id, dadosParaEdicao, token) {
  return new Promise(async (next, reject) => {
    const body = JSON.stringify(dadosParaEdicao);
    
    try {
      const chamada = await fetch(`${apiUrl}/api/${url}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body
      });
            
      const dados = await chamada.json();
          
      if(dados.error)
        return reject({...dados, status: chamada.status});
     
      next(dados);
    } catch(erro) {
      reject('Erro ao Conectar ao Servidor');
    }
  });
}
    
  
function postAPI(url, dadosParaCadastro, token) {
  return new Promise(async (next, reject) => {
    const body = JSON.stringify(dadosParaCadastro);
    
    try {
      const chamada = await fetch(`${apiUrl}/api/${url}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body
      });
            
      const dados = await chamada.json();
          
      if(dados.error)
        return reject({...dados, status: chamada.status});
  
      next(dados);
    } catch(erro) {
      console.log(erro);
      reject('Erro ao Conectar ao Servidor');
    }
  });
}

function postFormDataAPI(url, body, token) {
  return new Promise(async (next, reject) => { 
    console.log(body);
       
    try {
      const chamada = await fetch(`${apiUrl}/api/${url}/`, {
        method: 'POST',
        headers: {
          'Authorization': token
        },
        body
      });
            
      const dados = await chamada.json();
          
      if(dados.error)
        return reject({...dados, status: chamada.status});
  
      next(dados);
    } catch(erro) {
      console.log(erro);
      reject('Erro ao Conectar ao Servidor');
    }
  });
}