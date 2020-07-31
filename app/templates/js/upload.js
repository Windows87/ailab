const token = localStorage.getItem('token');

const fileExit = document.querySelector('#modal-exit-file');
const form = document.querySelector('form');
const headerExit = document.querySelector('#header-exit');
const body = document.querySelector('body');

let tags = [];

let tagsSelected = [];

function escapeRegExp(string) {
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function openModal(type) {
  const modal = document.querySelector(`#modal-background-${type}`);
  const article = document.querySelector('article');

  modal.style.display = 'flex';
  body.style.overflow = 'hidden';
}

function closeModal(type) {
  const modal = document.querySelector(`#modal-background-${type}`);
  modal.style.display = 'none';
  body.style.overflow = 'auto';
}

function isTokenInvalid(item) {
  if(item.status === 401)
    return true;
}

function goToLogin() {
  localStorage.setItem('token', '');
  window.location.href = '/login';
}

function setUrlModal(imageUploaded) {
  document.querySelector('#url').innerText = imageUploaded.url;
}

function setSubmitButtonToDefault(submit) {
  submit.disabled = false;
  submit.value = 'Fazer Upload';  
}

async function onFormSubmit(event) {
  event.preventDefault();

  const { image, submit } = form;

  submit.disabled = true;
  submit.value = 'Fazendo Upload..';

  try {
    const formDataImage = new FormData();

    formDataImage.append('image', image.files[0]);

    const imageUploaded = await postFormDataAPI('upload', formDataImage, token);

    setUrlModal(imageUploaded);
    openModal('file');

    setSubmitButtonToDefault(submit);
  } catch(error) {
    if(isTokenInvalid(error))
      goToLogin()
    setSubmitButtonToDefault(submit);
    alert('Erro ao Fazer Upload');
  }
}

async function start() {
  try {
    await getAPI('authors', token);
  } catch(error) {
    console.log(error);
    if(isTokenInvalid(error))
      goToLogin()
  }
}

fileExit.addEventListener('click', () => closeModal('file'));
headerExit.addEventListener('click', goToLogin);

start();

form.addEventListener('submit', onFormSubmit);