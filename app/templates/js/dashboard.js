const token = localStorage.getItem('token');
const headerExit = document.querySelector('#header-exit');

const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

function setDaysViews(daysViews) {
  let labels = [];
  let data = [];

  daysViews.forEach(day => {
	labels.push(`${day.day}/${day.month}`);
	data.push(day.views);
  });

  const spliceNumber = labels.length > 30 ? 30 : labels.length;

  labels = labels.splice(0, spliceNumber);
  data = data.splice(0, spliceNumber);

  const config = {
    type: 'line',
	  data: {
	    labels,
		datasets: [{
		  label: 'Visualizações em Artigos',
		  backgroundColor: '#F00',
		  borderColor: '#F00',
		  data,
		  fill: false,
		}]
	  },
	  options: {
		responsive: true,

		title: {
		  display: true,
		  text: 'Visualizações'
		},
		tooltips: {
		  mode: 'index',
		  intersect: false,
		},
		hover: {
		  mode: 'nearest',
		  intersect: true
		},
		scales: {
		  xAxes: [{
		    display: true,
			scaleLabel: {
			  display: true,
			  labelString: 'Dia'
			}
		  }],
		  yAxes: [{
			display: true,
			ticks: {
			  beginAtZero: true,
			  min: 0
			},			
			scaleLabel: {
			  display: true,		  
			  labelString: 'Visualizações'
			}
		  }]
		}
	  }
  };

  const ctx = document.getElementById('canvas').getContext('2d');
  window.myLine = new Chart(ctx, config);  
}

function setTagsViews(tags) {
  const color = Chart.helpers.color;

  const labels = tags.map(tag => tag.name);
  const data = tags.map(tag => tag.views);

  const barChartData = {
    labels,
	datasets: [{
	  label: 'Visualizações',
	  backgroundColor: color('#f00').alpha(0.5).rgbString(),
	  borderColor: '#f00',
	  borderWidth: 1,
	  data
	}]
  };

  const barCtx = document.getElementById('horizontal-canvas').getContext('2d');

  window.myBar = new Chart(barCtx, {
	type: 'bar',
	data: barChartData,
	options: {
	  responsive: true,
	  scales: {
		yAxes: [{
		  ticks: {
			beginAtZero: true,
			min: 0
		  }
		}]
	  },	  
	  legend: {
	    position: 'top',
	  },
	  title: {
		display: true,
		text: 'Visualizações por Tags'
	  }
	}
  });
}

function setTagsNumber(tags) {
  const labels = tags.map(tag => tag.name);
  const data = tags.map(tag => tag.numberOfArticles);  

  const configChart = {
	type: 'doughnut',
	data: {
	  datasets: [{
	    data,
		backgroundColor: [
		  '#ff5722',
          '#03a9f4',
		  '#4caf50',
		  '#e91e63',
		  '#9c27b0',
		  '#673ab7',
		  '#009688',
		  '#8bc34a',
		  '#cddc39',
		  '#ffeb3b',
		  '#ffc107',
		  '#ff9800',
		  '#795548'
		],
		label: 'Dataset 1'
	  }],
	  labels
	},
	options: {
	  responsive: true,
	  legend: {
	    position: 'top',
	  },
	  title: {
	    display: true,
		text: 'Número de Artigos por Tag'
	  },
	  animation: {
		animateScale: true,
		animateRotate: true
	  }
	}
  };

  const chartCtx = document.getElementById('chart-area').getContext('2d');
  window.myDoughnut = new Chart(chartCtx, configChart);
}

function setStatisticData(numberOfArticles, totalViews, monthViews) {
  const articleData = document.querySelector('#article-data');
  const viewsData = document.querySelector('#views-data');
  const viewsMonthData = document.querySelector('#views-month-data');

  articleData.innerText = numberOfArticles;
  viewsData.innerText = totalViews;
  viewsMonthData.innerText = monthViews;
}

function createRelatedItem(article, anotherInfo) {
  const container = document.createElement('div');
  const title = document.createElement('h4');
  const description = document.createElement('p');
  const date = document.createElement('b');
  
  title.innerText = article.title;
  description.innerText = article.description;
  date.innerText = `${article.created_at.getDate()} de ${months[article.created_at.getMonth()]} de ${article.created_at.getFullYear()}`;

  container.setAttribute('class', 'related-item');

  container.appendChild(title);
  container.appendChild(description);

  if(anotherInfo !== undefined) {
	const anotherInfoElement = document.createElement('p');
	anotherInfoElement.innerText = `${anotherInfo} Views`;
	container.appendChild(anotherInfoElement);
  }

  container.addEventListener('click', () => window.location.href = `/article/${article.id}/`);

  container.appendChild(date);

  return container;
}

function setMostViewedArticles(articles) {
  const orderedArticles = articles.sort((a, b) => b.views - a.views);
  const mostViewedArticlesContainer = document.querySelector('#most-viewed-list');
  const numberOfArticles = orderedArticles.length < 3 ? orderedArticles.length : 3;

  for(let i = 0; i < numberOfArticles; i++)
    mostViewedArticlesContainer.appendChild(createRelatedItem(orderedArticles[i], orderedArticles[i].views));
}


function setMostViewedArticlesByAuthor(articles, authorId) {
  articles = articles.filter(article => article.author.id == authorId);

  const orderedArticles = articles.sort((a, b) => b.views - a.views);
  const mostViewedArticlesByAuthorContainer = document.querySelector('#most-viewed-list-by-author');
  const numberOfArticles = orderedArticles.length < 3 ? orderedArticles.length : 3;
  
  for(let i = 0; i < numberOfArticles; i++)
    mostViewedArticlesByAuthorContainer.appendChild(createRelatedItem(orderedArticles[i], orderedArticles[i].views));
}

function isTokenInvalid(item) {
  if(item.status === 401)
    return true;
}

function getTagsIdsFromArticle(article) {
  return article.tags.map(tag => tag.id);
}

function goToLogin() {
  localStorage.setItem('token', '');
  window.location.href = '/login';
}

async function start() {
  try {
    let articles = await getAPI('articles', token);
    let tags = await getAPI('tags', token);
	let daysViews = await getAPI('days', token);
	let author = await getAPI('authors', token);

	console.log(articles);

    tags = tags.map(tag => {
	  tag.views = 0;
	  tag.numberOfArticles = 0;
	  return tag;
    });

    const numberOfArticles = articles.length;
    let totalViews = 0;
    let monthViews = 0;

    articles = articles.map(article => {
	  totalViews += article.views;

	  article.created_at = new Date(article.created_at);

	  tags = tags.map(tag => {
		const tagsIdsFromArticle = getTagsIdsFromArticle(article);
		console.log(tagsIdsFromArticle);
	    if(tagsIdsFromArticle.includes(tag.id)) {
		  tag.views += article.views;
		  tag.numberOfArticles += 1;
	    }

	    return tag;
	  });

  	  return article;
    });

    for(let i = 0; i < daysViews.length; i++) {
	  const date = new Date();

	  if(daysViews[i].month - 1 === date.getMonth())
	    monthViews += daysViews[i].views;
	  else
  	    break;
    }

    setStatisticData(numberOfArticles, totalViews, monthViews);
    setTagsViews(tags);
    setTagsNumber(tags);
    setMostViewedArticles(articles);
    setMostViewedArticlesByAuthor(articles, author.id);
    setDaysViews(daysViews);
  } catch(error) {
	console.log(error);
	if(isTokenInvalid(error))
	  goToLogin()
  } 
}

headerExit.addEventListener('click', goToLogin);

start();