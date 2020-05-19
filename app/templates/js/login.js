const form = document.querySelector('form');

const errorList = {
  '1': 'Usuário não existe',
  '2': 'Senha Incorreta'
};

const goToDashboard = () => window.location.href = '/dashboard';

function verifyToken() {
  const token = localStorage.getItem('token');

  if(token) goToDashboard();
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  
  const username = form.username.value;
  const password = form.password.value;
  const submit = form.submit;

  submit.value = 'Entrando..';

  try {
    const token = await postAPI('authors/authenticate', { username, password });
    localStorage.setItem('token', token.token);
    goToDashboard();
  } catch(error) {
    submit.value = 'Entrar';
    alert(errorList[error.id]);
  }
});

verifyToken();