var map,infoWindow;
var locations = [];
var mapcenter = {lat: 33.0597, lng: -96.7512};
var halaqa="";
var spreadsheetid="";

  /**
   * The CenterControl adds a control to the map that recenters the map on
   * mapcenter.
   * This constructor takes the control DIV as an argument.
   * @constructor
   */
  function CenterControl(controlDiv, map) {

	// Set CSS for the control border.
	var controlUI = document.createElement('div');
	controlUI.style.backgroundColor = '#fff';
	controlUI.style.border = '2px solid #fff';
	controlUI.style.borderRadius = '3px';
	controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
	controlUI.style.cursor = 'pointer';
	controlUI.style.marginBottom = '22px';
	controlUI.style.textAlign = 'center';
	controlUI.title = 'Click to recenter the map';
	controlDiv.appendChild(controlUI);

	// Set CSS for the control interior.
	var controlText = document.createElement('div');
	controlText.style.color = 'rgb(25,25,25)';
	controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
	controlText.style.fontSize = '16px';
	controlText.style.lineHeight = '38px';
	controlText.style.paddingLeft = '5px';
	controlText.style.paddingRight = '5px';
	controlText.innerHTML = 'Nearby';
	controlUI.appendChild(controlText);

	// Setup the click event listeners: simply set the map to Chicago.
	controlUI.addEventListener('click', function() {
	  //map.setCenter(chicago);
		//alert(' in set center ');
		infoWindow = new google.maps.InfoWindow;
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
			var pos = {
			  lat: position.coords.latitude,
			  lng: position.coords.longitude
			};
			//infoWindow.setPosition(pos);
			//infoWindow.setContent('Location found.');
			//infoWindow.open(map);
			map.setCenter(pos);
			map.setZoom(17);
		  }, function() {
			handleLocationError(true, infoWindow, map.getCenter());
		  });
		}
	});

  }
  function handleLocationError(browserHasGeolocation, infoWindow, pos) {

	//  alert(' position is'+pos);
			  map.setCenter(pos);
			map.setZoom(16);
	/*infoWindow.setPosition(pos);
	//infoWindow.setContent(browserHasGeolocation ?
						  'Error: The Geolocation service failed.' :
						  'Error: Your browser doesn\'t support geolocation.');
	//infoWindow.open(map); */
  }
  function initializeMap(){
	  console.log ('halaqa is '+halaqa);
	$.urlParam = function(name){
		var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		if (results==null){
		   return null;
		}
		else{
		   return results[1] || 0;
		}
	}
	//var id='1U7JJDnTvClhdpHCje29uLwTNCiBhdPfUPxzChbxoXNQ'; //'1vgbRfRFBBCgZ9V0CNEmAUCAJX4C2ClrYpVPaAEPO';
	var id=spreadsheetid;
	var mySpreadsheet = 'https://docs.google.com/spreadsheets/d/'+id+'/edit#gid=0';
	console.log('my spreadsheet id is : '+mySpreadsheet);
	var city=decodeURIComponent($.urlParam('City'));	
	console.log('cityparam '+city);
	var stts=decodeURIComponent($.urlParam('S'));
	console.log('stts in the url is '+stts);
	
		var sql= 'select A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V WHERE M <> \'placemark_circle_highlight\'  ';
		var whereClause="";
		if (city!="null"){			
			var temp=city.replace("=="," AND H = ");			
			var addlClause=temp.replace("!="," AND H <> ");	
			console.log('city clause  is '+addlClause);
			whereClause += addlClause;
		}
		addlClause="";
		if (stts!="null"){
			console.log('Status request  is '+stts); 
			if (stts =="S"){
				addlClause =" AND  N like '%Student%' ";
			}
			if (stts =="K"){
				addlClause =" AND  N like '%Khususi%'  ";
			}
			if (stts =="F"){
				addlClause =" AND  N  like '%Follow%'  ";
			}			
			if (stts =="W"){
				console.log('assigning status addtl clause');	
				addlClause =" AND  N  like '%Worker%'  ";
			}
			console.log('clause  is '+addlClause);
			whereClause += addlClause;
		}		
		console.log('where clause '+whereClause);
		//var sql = sql +'and city = "The Colony"    ';
		sql = sql + whereClause;
		console.log(' about to query '+sql);	
	
	
	console.log('locations size before query '+locations.length);	
	sheetrock.defaults.url =mySpreadsheet;
	console.log('spreadsheet is  '+sheetrock.defaults.url);
	//sheetrock.defaults.query ="select A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V where M <> 'placemark_circle_highlight' and N like '%Student%'  ";
	sheetrock.defaults.query =sql;
	sheetrock(
	{
		//url: mySpreadsheet,
		//query: "select A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V where M <> 'placemark_circle_highlight'  ",
		//query: sql,
		fetchSize: 7000,
		callback: drawMap
	}
	);
	//console.log('locations size after sheetrock '+locations.length);
	  
  };
  
var drawMap = function (error, options, response) {
	console.log(' error is '+error);
	//console.log(error, options, response): 
  if (!error) {
		for (var key in response.rows) {
			var obj = response.rows[key];
			//console.log('in obj ' +obj.cellsArray);
			//console.log('in obj lat'+obj.cellsArray[0]);
							var location = {};
							location.db = obj.cellsArray[0];
							location.id = obj.cellsArray[2];
							location.name = obj.cellsArray[3];
							location.address = obj.cellsArray[4];
							location.add=encodeURIComponent(obj.cellsArray[4]);
							location.latitude = parseFloat(obj.cellsArray[5]);
							location.longtitude = parseFloat(obj.cellsArray[6]);
							location.city = obj.cellsArray[7];
							location.zip=obj.cellsArray[8];
							location.unit=obj.cellsArray[11];
							location.marker=obj.cellsArray[12];
							location.sts = obj.cellsArray[13];
							location.visitcode=obj.cellsArray[14];
							location.comments=obj.cellsArray[15];
							location.visitdate=obj.cellsArray[16];
							location.rowid=obj.cellsArray[21];
							locations.push(location);
		};
		console.log('locations size in drawmap '+locations.length);
					var mapOptions = {
					// center: {},
					zoom: 16  ,
					center: mapcenter

					};
					var map = new google.maps.Map(document.getElementById('map'), mapOptions);
					infoWindow = new google.maps.InfoWindow;
					//    setLocations(map, res); // this is working
					console.log(" location size berfore set location "+locations.length);
					setLocations(map, locations); // this is working
					var centerControlDiv = document.createElement('div');
					var centerControl = new CenterControl(centerControlDiv, map);

					centerControlDiv.index = 1;
					map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(centerControlDiv);	 
  }
};
	
	

function setLocations(map, locations) {
  var bounds = new google.maps.LatLngBounds();
  // Create nice, customised pop-up boxes, to appear when the marker is clicked on
  var infowindow = new google.maps.InfoWindow({
    content: "Content String",
    maxWidth: 350 ,
    maxHeight: 400
  });
  for (var i = 0; i < locations.length; i++) {
	//console.log("in set locations "+locations[i].latitude);
    var new_marker = createMarker(map, locations[i], infowindow);
	//console.log("after createmarker "+locations[i].latitude);    
    bounds.extend(new_marker.position);
  }
  google.maps.event.trigger(map, "resize");	
  //map.fitBounds(bounds);
}

function createMarker(map, location, infowindow) {

  // Modify the code below to suit the structure of your spreadsheet (stored in variable 'location')
  var position = {
    lat: parseFloat(location.latitude),
    lng: parseFloat(location.longtitude)
  };
  var markerurl="https://maps.google.com/mapfiles/kml/paddle/"+location.marker+".png";
  var marker = new google.maps.Marker({	  
    position: position,
    map: map,
    title: location.name,
    icon :{
		url: markerurl,
		scaledSize: new google.maps.Size(30, 30)
	},
  });
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent('<div>'+
    '' + 
	((location.name === undefined) ? "" : ('<p><strong> Name: ' + location.name + ' </strong></p>')) +
    ((location.address === undefined) ? location.address : ('<a href=https://www.google.com/maps/dir/?api=1&destination="' + encodeURIComponent(location.address) +'">' + location.address + '</a>')) + '</strong></p>' +
    //((location.db === undefined) ? "" : ('<p><strong>DB: </strong>' + location.db + '</p>')) +
	//((location.id === undefined) ? "" : ('<p><strong>ID: </strong>' + location.id + '</p>')) +
	((location.comments === undefined) ? "" : ('<p><strong>Comments: </strong>' + location.comments + '</p>')) +
	((location.visitdate === undefined) ? "" : ('<p><strong>Last Visit Date: </strong>' + location.visitdate + '</p>')) +
	//((location.sts === undefined) ? "" : ('<p><strong>STATUS: </strong>' + location.sts + '</p>')) +
    ('<a href=https://dailyfikr.github.io/VisitDetails.html?DB='+location.db+'&ID='+location.rowid+'&Name='+encodeURI(location.name)+'&Sts='+encodeURI(location.sts)+' target ="_blank"> Visit Details </a>')+
	'</div>');
    infowindow.open(map, marker);
  });
  return marker;
}
