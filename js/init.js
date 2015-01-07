  function initialize() {
  	lat = 28.546863;
  	lng = 77.273633;
  }
  var myMap = initializeMap();
  setTimeout(function () {
  	google.maps.event.trigger(myMap, 'resize');
  }, 100);

  function initializeMap() {
  	initialize();
  	var mapOptions = {
  		center: new google.maps.LatLng(lat, lng),
  		zoom: 16,
  		mapTypeId: google.maps.MapTypeId.ROADMAP
  	};
  	var map = new google.maps.Map(document.getElementById("map"), mapOptions);
  	var marker = new google.maps.Marker({
  		position: mapOptions['center'],
  		map: map,
  	});
  	return map;
  }