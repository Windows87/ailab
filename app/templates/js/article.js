const moreDetailsButton = document.querySelector('#more-details');
const modalExit = document.querySelector('.modal-exit');
const body = document.querySelector('body');

function openAuthorDetails() {
  const modal = document.querySelector('.modal-background');
  modal.style.display = 'flex';
  body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.querySelector('.modal-background');
  modal.style.display = 'none';
  body.style.overflow = 'auto';
}

moreDetailsButton.addEventListener('click', openAuthorDetails);
modalExit.addEventListener('click', closeModal);