const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const authorId = 1;

var randomScalingFactor = function() {
			return Math.round(Math.random() * 100);
		};

		const config = {
			type: 'line',
			data: {
				labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril'],
				datasets: [{
					label: 'Visualizações em Artigos',
					backgroundColor: '#F00',
					borderColor: '#F00',
					data: [
					  randomScalingFactor(),
                      randomScalingFactor(),
                      randomScalingFactor(),
                      randomScalingFactor()
					],
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
							labelString: 'Mês'
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Visualizações'
						}
					}]
				}
			}
		};

function setTopicsViews(topics) {
  const ctx = document.getElementById('canvas').getContext('2d');
  window.myLine = new Chart(ctx, config);

  const color = Chart.helpers.color;

  const labels = topics.map(topic => topic.name);
  const data = topics.map(topic => topic.views);

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
		text: 'Visualizações por Tópico'
	  }
	}
  });
}

function setTopicsNumber(topics) {
  const labels = topics.map(topic => topic.name);
  const data = topics.map(topic => topic.numberOfArticles);  

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
		text: 'Número de Artigos por Tópico'
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

function setStatisticData(numberOfArticles, totalViews) {
  const articleData = document.querySelector('#article-data');
  const viewsData = document.querySelector('#views-data');

  articleData.innerText = numberOfArticles;
  viewsData.innerText = totalViews;
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
  
async function start() {
  let articles = await getAPI('articles');
  let topics = await getAPI('topics');

  topics = topics.map(topic => {
	topic.views = 0;
	topic.numberOfArticles = 0;
	return topic;
  });

  const numberOfArticles = articles.length;
  let totalViews = 0;

  articles = articles.map(article => {
	totalViews += article.views;

	article.created_at = new Date(article.created_at);

	topics = topics.map(topic => {
	  if(topic.id === article.topic.id) {
		topic.views += article.views;
		topic.numberOfArticles += 1;
	  }

	  return topic;
	});

	return article;
  });

  setStatisticData(numberOfArticles, totalViews);
  setTopicsViews(topics);
  setTopicsNumber(topics);
  setMostViewedArticles(articles);
  setMostViewedArticlesByAuthor(articles, authorId);
}

start();