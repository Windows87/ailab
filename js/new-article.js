const modalExit = document.querySelector('.modal-exit');
const viewPreview = document.querySelector('#view-preview');
const form = document.querySelector('form');
const body = document.querySelector('body');

function openPreview() {
  const modal = document.querySelector('.modal-background');
  const article = document.querySelector('article');

  modal.style.display = 'flex';
  body.style.overflow = 'hidden';

  article.innerHTML = `
    <h2>${form.title.value}</h2>
    ${form.text.value}
  `;
}

function closePreview() {
  const modal = document.querySelector('.modal-background');
  modal.style.display = 'none';
  body.style.overflow = 'auto';
}

viewPreview.addEventListener('click', openPreview);
modalExit.addEventListener('click', closePreview);