$(function() {
	var ctx = $('#chart').get(0).getContext('2d');

	var data = [
		{
			value: 270,
			color: 'blue',
			highlight: 'lightblue',
			label: 'JS'
		},
		{
			value: 50,
			color: 'lightgreen',
			highlight: 'green',
			label: 'CSS'
		},
		{
			value: 40,
			color: 'orange',
			highlight: 'darkorange',
			label: 'HTML'
		}
	];

	//draw
	var piechart = new Chart(ctx).Pie(data);
});