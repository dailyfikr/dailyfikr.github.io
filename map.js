var map,infoWindow;
var locations = [];
var frisco = {lat: 33.0597, lng: -96.7512};

      /**
       * The CenterControl adds a control to the map that recenters the map on
       * Frisco.
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

	  
function initialiseMap() {
	
	$.urlParam = function(name){
		var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		if (results==null){
		   return null;
		}
		else{
		   return results[1] || 0;
		}
	}

  // Load data from an example Google spreadsheet that contains latitude and longitude columns using Google Sheets API v4 that returns JSON.
  // Replace the ID of your Google spreadsheet and you API key in the URL:
  // https://sheets.googleapis.com/v4/spreadsheets/ID_OF_YOUR_GOOGLE_SPREADSHEET/values/Sheet1!A2:Q?key=YOUR_API_KEY
  // Also make sure your API key is authorised to access Google Sheets API - you can enable that through your Google Developer console.
  // Finally, in the URL, fix the sheet name and the range that you are accessing from your spreadsheet. 'Sheet1' is the default name for the first sheet.
  $.getJSON("https://sheets.googleapis.com/v4/spreadsheets/1U7JJDnTvClhdpHCje29uLwTNCiBhdPfUPxzChbxoXNQ/values/DFWDB!A2:V?key=AIzaSyBLGdVkQljgks3GZavPHcOWjn0F7G6FWOc", function(data) {
  //$.getJSON("https://sheets.googleapis.com/v4/spreadsheets/1lUKN37-F0zRy2xOe5CkBpi1R2GepYqDC40VGTYAxY7M/values/NEWDFWDB!A2:V?key=AIzaSyBLGdVkQljgks3GZavPHcOWjn0F7G6FWOc", function(data) {
  
  
 // 
 // $.getJSON("https://docs.google.com/a/google.com/spreadsheets/d/1U7JJDnTvClhdpHCje29uLwTNCiBhdPfUPxzChbxoXNQ/gviz/tq?tq=select%20A%2CD%20where%20D%20like%20'ZAHIR%25'", function(data) {
    	// data.values contains the array of rows from the spreadsheet. Each row is also an array of cell values.
    	// Modify the code below to suit the structure of your spreadsheet.
		console.log('gettting data');
		
		//console.log('data is '+data.values);
    	$(data.values).each(function() {
    		var location = {};
				location.db = this[0];
				location.id = this[2];
				location.name = this[3];
				location.address = this[4];
				location.add=encodeURIComponent(this[4]);
				location.latitude = parseFloat(this[5]);
      	        location.longtitude = parseFloat(this[6]);
                location.city = this[7];
				location.zip=this[8];
				location.unit=this[11];
				location.marker=this[12];
				location.sts = this[13];
				location.visitcode=this[14];
				location.comments=this[15];
				location.visitdate=this[16];
				location.rowid=this[21];
	  		    locations.push(location);
    	});
		console.log('locations size    '+locations.length);
		
		var city=decodeURIComponent($.urlParam('City'));
		
		console.log('cityparam '+city);
		var stts=decodeURIComponent($.urlParam('S'));
		console.log('stts '+stts);
		//
		var sql= 'SELECT name,visitdate,marker,comments,latitude,longtitude, address,db,id, city ,sts,rowid FROM ? where marker <> "placemark_circle_highlight"  ';
		var whereClause="";
		if (city!="null"){			
			var temp=city.replace("=="," AND city = ");			
			var addlClause=temp.replace("!="," AND city <> ");	
			console.log('city clause  is '+addlClause);
			whereClause += addlClause;
		}
		if (stts!="null"){
			console.log('Status request  is '+stts); 
			if (stts =="S"){
				addlClause =" AND  sts like \"%Student%\" ";
			}
			if (stts =="K"){
				addlClause =" AND  sts like \"%Khususi%\"  ";
			}
			if (stts =="F"){
				addlClause =" AND  sts  like \"%Follow%\"  ";
			}			
			if (stts =="W"){
				addlClause =" AND  sts  like \"%Week%\"  ";
			}
			console.log('clause  is '+addlClause);
			whereClause += addlClause;
		}		
		console.log('where clause '+whereClause);
		//var sql = sql +'and city = "The Colony"    ';
		sql = sql + whereClause;
		console.log(' about to query '+sql);
		var res = alasql(sql, [locations] );

		console.log(" result length is "+res.length);

      var mapOptions = {
       // center: {},
	    zoom: 16  ,
		center: frisco
		     
      };
      var map = new google.maps.Map(document.getElementById('map'), mapOptions);
	  infoWindow = new google.maps.InfoWindow;
	    setLocations(map, res);
        var centerControlDiv = document.createElement('div');
        var centerControl = new CenterControl(centerControlDiv, map);

        centerControlDiv.index = 1;
        map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(centerControlDiv);	  
     /// //setLocations(map, locations);
	  //setLocations(map, res);

  		//alert(' in init map ');
        // Create the DIV to hold the control and call the CenterControl()
        // constructor passing in this DIV.
     //   var centerControlDiv = document.createElement('div');
     //   var centerControl = new CenterControl(centerControlDiv, map);

        //centerControlDiv.index = 1;
        //map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(centerControlDiv);	 
		;
	  
	  
  });

}


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
	//((location.comments === undefined) ? "" : ('<p><strong>Comments: </strong>' + location.comments + '</p>')) +
	((location.visitdate === undefined) ? "" : ('<p><strong>Last Visit Date: </strong>' + location.visitdate + '</p>')) +
	//((location.sts === undefined) ? "" : ('<p><strong>STATUS: </strong>' + location.sts + '</p>')) +
    ('<a href=https://dailyfikr.github.io/VisitDetails.html?DB='+location.db+'&ID='+location.rowid+'&Name='+encodeURI(location.name)+'&Sts='+encodeURI(location.sts)+' target ="_blank"> Visit Details </a>')+
	'</div>');
    infowindow.open(map, marker);
  });
  return marker;
}
