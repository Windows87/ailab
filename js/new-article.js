const modalExit = document.querySelector('.modal-exit');
const viewPreview = document.querySelector('#view-preview');
const form = document.querySelector('form');
const body = document.querySelector('body');

function escapeRegExp(string) {
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function openPreview() {
  const modal = document.querySelector('.modal-background');
  const article = document.querySelector('article');

  modal.style.display = 'flex';
  body.style.overflow = 'hidden';

  article.innerHTML = `
    <h2>${form.title.value}</h2>
    <div class="tag-list">
      ${ replaceAll(form.tags.value, ', ', ',').split(',').map(tag => `<div class="tag">${ tag.toUpperCase() }</div>`) }
      <div class="tag">BY: YURI FARIA</div>
      <div class="tag">27/JAN/2020</div>
    </div>
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