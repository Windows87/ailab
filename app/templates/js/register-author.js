const form = document.querySelector('form');

function getSocialNetworks() {
  const socialNetworks = [];
  const socialNetworksContainers = document.querySelectorAll('.socialnetwork-container');

  socialNetworksContainers.forEach(socialNetworkContainer => {
    const socialNetworkId = Number(socialNetworkContainer.querySelector('input').getAttribute('social-network'));
    const link = socialNetworkContainer.querySelector('input').value;
    if(link)
      socialNetworks.push({ socialNetworkId, link });
  });

  return socialNetworks;
}

async function onSubmit(event) {
  event.preventDefault();

  const body = {};
  const formItens = ['name', 'image', 'description', 'username', 'password', 'secretcode'];

  formItens.forEach(formItem => body[formItem] = form[formItem].value);

  body.socialnetworks = getSocialNetworks();

  form.submit.value = 'Criando..';

  try {
    await postAPI('authors', body);

    formItens.forEach(formItem => form[formItem].value = '');
    document.querySelectorAll('.socialnetwork-container').forEach(container => container.querySelector('input').value = '');

    form.submit.value = 'Criar';
  } catch(error) {
    form.submit.value = 'Criar';
    alert(error);
  }
}

form.addEventListener('submit', onSubmit);