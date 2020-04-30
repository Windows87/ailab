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

		const ctx = document.getElementById('canvas').getContext('2d');
		window.myLine = new Chart(ctx, config);

        var color = Chart.helpers.color;

		const barChartData = {
			labels: ['Machine Learning', 'Deep Learning', 'Visão Computacional'],
			datasets: [{
				label: 'Visualizações',
				backgroundColor: color('#f00').alpha(0.5).rgbString(),
				borderColor: '#f00',
				borderWidth: 1,
				data: [
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor()
				]
			}]

		};

		var barCtx = document.getElementById('horizontal-canvas').getContext('2d');
		window.myBar = new Chart(barCtx, {
				type: 'bar',
				data: barChartData,
				options: {
					responsive: true,
					legend: {
						position: 'top',
					},
					title: {
						display: true,
						text: 'Visualizações por Tópico'
					}
				}
			});

		var configChart = {
			type: 'doughnut',
			data: {
				datasets: [{
					data: [
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
					],
					backgroundColor: [
						'#ff5722',
                        '#03a9f4',
                        '#4caf50',
					],
					label: 'Dataset 1'
				}],
				labels: [
					'Machine Learning',
					'Deep Learning',
					'Visão Computacional',
				]
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

		var chartCtx = document.getElementById('chart-area').getContext('2d');
		window.myDoughnut = new Chart(chartCtx, configChart);