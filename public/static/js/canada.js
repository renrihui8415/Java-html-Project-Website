//<script type="text/javascript">
google.charts.load('current', {
  //'packages':['corechart'],
  'packages':['geochart'],
  // Note: you might need to get a mapsApiKey for your project.
  // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
  
});
google.charts.setOnLoadCallback(drawMap);

function drawMap() {
  //var jsonData=$.ajax({
    //url: "getData.php",
    //dataType: "json", // type of data we're expecting from server
    //async: false // make true to avoid waiting for the request to be complete
    //});

  // Create our data table out of JSON data loaded from server.
  //var data = new google.visualization.DataTable(jsonData.responseText);

  var data = google.visualization.arrayToDataTable([
  ["Province","Popularity"],
  ["CA-AB", 1],
  ["CA-BC", 2],
  ["CA-MB", 3],
  ["CA-NB", 4],
  ["CA-NL", 5],
  ["CA-NS", 6],
  ["CA-ON", 7],
  ["CA-PE", 8],
  ["CA-QC", 9],
  ["CA-SK", 10],
  ["CA-NT", 11],
  ["CA-NU", 12],
  ["CA-YT", 13],
  //["GL","CA-YT", 3],
  //["PM","CA-YT", 3],

  ]);

  var options = {
      region: 'CA',
      enableRegionInteractivity : true,
      resolution:'provinces',
      backgroundColor : {fill: 'transparent'},
      //backgroundColor : {stroke: '#transparent'},
      //backgroundColor : {strokeWidth: '50'},
      keepAspectRatio:true,
      colorAxis: {
        colors:['#11dcec','2b277c','1c20b6','0e0e32']
        //colors: ['#DF6040', '#E5954E','#F7B44B','#FFE2A6','#A59679','#c93756']
        //colors: ['#fb9b00', '#e4430b','#aa1906','#3a1008','#e4f9f6','#a9e6f5']
      },
      //defaultColor: '#161D15',
      datalessRegionColor: 'transparent',
      forceIFrame: true, 
      explorer: { 
        actions: ['dragToZoom', 'rightClickToReset'],
        axis: 'horizontal',
        keepInBounds: true,
        maxZoomIn: 4.0
      },
  };

  var container = document.getElementById('map_canada');
  var chart = new google.visualization.GeoChart(container);
  //google.visualization.events.addListener(chart, 'ready', $( ".draggable" ).draggable({ grid: [ 40, 40 ], containment: "#playfield", scroll:false}));
  google.visualization.events.addListener(chart, 'ready', function () {
    var countries = container.getElementsByTagName('path');
    Array.prototype.forEach.call(countries, function(path) {
      path.setAttribute('stroke', 'red');
    });
  });

  chart.draw(data, options);


  window.onload=resize();
  window.onresize=resize;
  window.addEventListener("resize", function() {
    chart.resize();
});
};

//</script>
