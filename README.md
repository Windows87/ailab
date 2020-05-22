<div style="text-align: center">
<img src="https://www.pngkey.com/png/full/96-967577_ai-artificial-intelligence-transparent-background.png">
</div>

# AILab

Site de Estudos (sendo) criado em Python, Flask e MySQL para depositar artigos sobre Inteligência Artificial.

## Screenshots

<img src="https://raw.githubusercontent.com/Windows87/deeplab/master/screenshots/desktop-1.png" width="100%">
<img src="https://raw.githubusercontent.com/Windows87/deeplab/master/screenshots/desktop-2.png" width="100%">
<img src="https://raw.githubusercontent.com/Windows87/deeplab/master/screenshots/desktop-10.png" width="100%">
<img src="https://raw.githubusercontent.com/Windows87/deeplab/master/screenshots/desktop-3.png" width="100%">
<img src="https://raw.githubusercontent.com/Windows87/deeplab/master/screenshots/desktop-4.png" width="100%">
<img src="https://raw.githubusercontent.com/Windows87/deeplab/master/screenshots/desktop-8.png" width="100%">
<img src="https://raw.githubusercontent.com/Windows87/deeplab/master/screenshots/desktop-5.png" width="100%">
<img src="https://raw.githubusercontent.com/Windows87/deeplab/master/screenshots/desktop-6.png" width="100%">
<img src="https://raw.githubusercontent.com/Windows87/deeplab/master/screenshots/desktop-7.png" width="100%">
<img src="https://raw.githubusercontent.com/Windows87/deeplab/master/screenshots/desktop-9.png" width="100%">

## Rotas
- ```/``` -> Início
- ```/about-us``` -> Sobre Nós
- ```/article/:id/``` -> Artigo
- ```/list/:type/:id``` -> Lista de Tópicos/SubTópicos/Tags/Autores
- ```/``` -> Login
- ```/dashboard``` -> Dashboard Geral e do Autor
- ```/new-article``` -> Escrever Novo Artigo
- ```/register-author``` -> Registra Novo Autor no Sistema

## Como Iniciar
1. Inicie o MySQL
2. Importe o model.sql (também disponível pra Workbench como model.mwb)
3. Rode no Terminal
```bash
# Clone o repositório
git clone https://github.com/Windows87/ailab/
# Entre no repositório
cd ailab
# Instale as Dependências
pip install -r requirements.txt
# Inicialize
python run.py
```
4. Entre em http://localhost:5000

## Outros Detalhes
- Caso vá rodar em algum servidor, mude o valor da variável ```url``` em ```__init__.py```

- Modifique o valor secret dos tokens da variável ```TOKEN_SECRET``` em ```config.py```

- Modifique o valor de registro secreto da variável ```REGISTER_SECRET_CODE``` em ```config.py```