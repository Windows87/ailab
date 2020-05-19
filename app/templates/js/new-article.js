const token = localStorage.getItem('token');

const previewExit = document.querySelector('#modal-exit-preview');
const newTagExit = document.querySelector('#modal-exit-newTag');
const viewPreview = document.querySelector('#view-preview');
const form = document.querySelector('form');
const formNewTag = document.querySelector('#form-newTag');
const headerExit = document.querySelector('#header-exit');
const body = document.querySelector('body');

let tags = [];
let topics = [];

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

  article.innerHTML = `
    <h2>${form.title.value}</h2>
    ${form.content.value}
  `;
}

function closeModal(type) {
  const modal = document.querySelector(`#modal-background-${type}`);
  modal.style.display = 'none';
  body.style.overflow = 'auto';
}

function createTagElement(tag) {
  const div = document.createElement('div');
  const isSelected = tagsSelected.indexOf(tag.id) !== -1;

  div.innerText = tag.name;

  if(isSelected)
    div.classList.add('selected');

  div.onclick = () => {
    const isDivSelected = div.classList == 'selected';

    if(isDivSelected) {
      tagsSelected = tagsSelected.filter(tagSelected => tagSelected !== tag.id);
      div.classList.remove('selected');
    } else {
      tagsSelected.push(tag.id);
      div.classList.add('selected');
    }
  }

  return div;
}

function createNewTagElement() {
  const div = document.createElement('div');

  div.innerText = 'Novo';

  div.classList.add('selected');

  div.onclick = () => openModal('newTag');

  return div;
}

function createSelectOption(value, name) {
  const option = document.createElement('option');

  option.value = value;
  option.innerText = name;

  return option;
}

async function setTags() {
  tags = await getAPI('tags');

  const selectBox = document.querySelector('.selectbox');
  selectBox.innerHTML = '';
  tags.forEach(tag => selectBox.appendChild(createTagElement(tag)));
  selectBox.appendChild(createNewTagElement());
}

async function setTopics() {
  topics = await getAPI('topics');

  const selectTopic = document.querySelector('#select-topics');
  const selectSubTopic = document.querySelector('#select-subtopics');

  topics.forEach(topic => selectTopic.appendChild(createSelectOption(topic.id, topic.name)));

  selectTopic.addEventListener('change', () => {
    topics.forEach(topic => {
      if(topic.id == selectTopic.value) {
        selectSubTopic.innerHTML = `<option value="">Selecione um Sub-Tópico</option>`;
        topic.subtopics.forEach(subtopic => selectSubTopic.appendChild(createSelectOption(subtopic.id, subtopic.name)))
        selectSubTopic.value = '';
      }
    });
  });
}

async function submitNewTag(event) {
  event.preventDefault();

  const name = event.target.name.value;

  try {
    const newTag = postAPI('tags', { name });
    tags.push(newTag);

    event.target.name.value = '';

    setTags();
    closeModal('newTag');    
  } catch(error) {
    alert('Erro ao Criar Tag');
    console.log(error);
  }
}

function isTokenInvalid(item) {
  if(item.status === 401)
    return true;
}

function goToLogin() {
  localStorage.setItem('token', '');
  window.location.href = '/login';
}

async function onFormSubmit(event) {
  event.preventDefault();

  const { title, image, description, topic, subtopic, content, submit } = form;

  submit.disabled = true;
  submit.value = 'Criando..';

  try {
    const article = await postAPI('articles', {
      title: title.value,
      image: image.value,
      description: description.value,
      topic_id: topic.value,
      tags: tagsSelected,
      subtopic_id: subtopic.value,
      content: content.value
    });

    window.location.pathname = `/article/${article.id}`;
  } catch(error) {
    console.log(error);

    if(isTokenInvalid(error))
      goToLogin()

    submit.disabled = false;
    submit.value = 'Criar';    

    alert('Erro ao Criar Artigo');
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

viewPreview.addEventListener('click', () => openModal('preview'));
previewExit.addEventListener('click', () => closeModal('preview'));
newTagExit.addEventListener('click', () => closeModal('newTag'));
formNewTag.addEventListener('submit', submitNewTag);
headerExit.addEventListener('click', goToLogin);

start();
setTags();
setTopics();

form.addEventListener('submit', onFormSubmit);