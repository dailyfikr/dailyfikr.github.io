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
async function myfunctionMap() {
//  const {Map} = await google.maps.importLibrary('maps');
  
  // Notice that we don't care about the return value of this statement -- it only populates `google.maps.marker`
//   const { AdvancedMarkerElement } =await google.maps.importLibrary('marker');
// const { AdvancedMarkerElement, PinElement } = (await loader.importLibrary('marker')) ;
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
    "marker",
  );
 
   
      var mapOptions = {
       // center: {},
	    zoom: 16  ,
		center: frisco,
		mapId: "e27b61c873ecc792"		     
      };
	  

		const map = new Map(document.getElementById("map"), mapOptions);   
  console.log('async main called    ');
}

	  
async function  initialiseMap() {
	/*
(async() => {
  console.log('before start');

  //await start();
  await myfunctionMap();
  
  console.log('after start');
})();
*/	
	//await myfunctionMap();
	const {Map} = await google.maps.importLibrary('maps');
	//const { AdvancedMarkerElement } =await google.maps.importLibrary('marker');
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
    "marker",
  );	
	  const pinBackground = new PinElement({
		background: 'black'
	  })
	  console.log('ping background is '+pinBackground);
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
  $.getJSON("https://sheets.googleapis.com/v4/spreadsheets/1SJaFLEDj7RfJMPBP_23ohuaKdMFR6OOr6RMtQqOvfdk/values/DFWDB!A2:AA?key=AIzaSyCY34yD907-oluFNjjPjiZEXQ8_xvLU52Y", function(data) {
  //$.getJSON("https://sheets.googleapis.com/v4/spreadsheets/1lUKN37-F0zRy2xOe5CkBpi1R2GepYqDC40VGTYAxY7M/values/DFWDB!A2:V?key=AIzaSyBLGdVkQljgks3GZavPHcOWjn0F7G6FWOc", function(data) {
  
  
 // 
 // $.getJSON("https://docs.google.com/a/google.com/spreadsheets/d/1U7JJDnTvClhdpHCje29uLwTNCiBhdPfUPxzChbxoXNQ/gviz/tq?tq=select%20A%2CD%20where%20D%20like%20'ZAHIR%25'", function(data) {
    	// data.values contains the array of rows from the spreadsheet. Each row is also an array of cell values.
    	// Modify the code below to suit the structure of your spreadsheet.
		console.log('gettting data new');
		
		//console.log('data is '+data.values);
    	$(data.values).each(function() {
    		var location = {};
				location.db = this[0];
				location.county = this[1];
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
				location.FourM=this[22];
				location.Forty=this[23];
				location.IntFour=this[24];
				location.IntForty=this[25];
				if (location.county =="Collin"){
					location.cadurl="https://www.collincad.org/propertysearch?prop="+location.id;
					//console.log('locations is in condition '+location.cadurl);
				}
				
	  		    locations.push(location);
			//console.log('locations is    '+location.county+' | '+location.FourM+' | '+location.cadurl);				
    	});
		console.log('locations size    '+locations.length);
		//console.log('locations is    '+location);
		
		var city=decodeURIComponent($.urlParam('City'));
		
		console.log('cityparam '+city);
		var stts=decodeURIComponent($.urlParam('S'));
		console.log('stts '+stts);
	        var searchname=decodeURIComponent($.urlParam('F'));
	        console.log('search is     '+searchname);
		//
		var sql= 'SELECT name,visitdate,marker,comments,latitude,longtitude, address,db,id, city ,sts,rowid,cadurl,county FROM ? where marker <> "placemark_circle_highlight"  ';
		var whereClause="";
		if (searchname == "Search"){	
			/*
			addlClause =" AND  name like \"%"+searchname+"%\" ";	
			console.log('name clause  is '+addlClause);
			whereClause += addlClause;
			*/
		}else{
			addlClause =" AND  name like \"%"+searchname+"%\" ";	
			console.log('name clause  is '+addlClause);
			whereClause += addlClause;			
		}
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
		center: frisco,
		mapId: "4504f8b37365c3d0"		     
      };
	  

		const map = new Map(document.getElementById("map"), mapOptions);
  
	  
      //var map = new google.maps.Map(document.getElementById('map'), mapOptions);
	  
	  infoWindow = new google.maps.InfoWindow;
	    setLocations(map, res,pinBackground);
		//setLocations(map, locations);
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


async function setLocations(map, locations,pinBackground) {
  var bounds = new google.maps.LatLngBounds();
  // Create nice, customised pop-up boxes, to appear when the marker is clicked on
  var infowindow = new google.maps.InfoWindow({
    content: "Content String",
    maxWidth: 350 ,
    maxHeight: 400
  });
  for (var i = 0; i < locations.length; i++) {
	//console.log("in set locations cadurl is  "+locations[i].cadurl);
    var new_marker = createMarker(map, locations[i], infowindow,pinBackground);
	//console.log("after createmarker "+locations[i].latitude);    
    //bounds.extend(new_marker.position);
  }
  google.maps.event.trigger(map, "resize");	
  //map.fitBounds(bounds);
}

 async function createMarker(map, location, infowindow,pinBackground) {
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
    "marker",
  );	 

  // Modify the code below to suit the structure of your spreadsheet (stored in variable 'location')
  var position = {
    lat: parseFloat(location.latitude),
    lng: parseFloat(location.longtitude)
  };
  var markerurl="https://maps.google.com/mapfiles/kml/paddle/"+location.marker+".png";
  var i=location.id;
  var gColor='';
  var bColor='blue';
  if(location.marker=='grn-blank'){
	  gColor='black';
	  bColor='lime';
  }
  if(location.marker=='wht-blank'){
	  gColor='black';
	  bColor='white';
  }
  if(location.marker=='orange-stars'){
	  gColor='black';
	  bColor='orange';
  }  
  if(location.marker=='green'){
	  gColor='black';
	  bColor='green';
  }   
  if(location.marker=='purple-blank'){
	  gColor='black';
	  bColor='purple';
  }   
  if(location.marker=='ylw-blank'){
	  gColor='black';
	  bColor='yellow';
  }    
	const pinBackground1 = new PinElement({
                    //glyph: `${i + 1}`,
					//glyph: `${i}`,
					glyph: `${location.name}`,
					borderColor: 'black',
                    glyphColor: gColor,
					background :bColor,
	});  
  
 // console.log('adding marker for location '+location.name +' '+pinBackground.element+' at position '+position.lat+' '+position.lng );
  var marker = new google.maps.marker.AdvancedMarkerElement({	  
    position: position,
    map: map,
    title: location.name,		
	content: pinBackground1.element
  });  
  
  /*
  var marker = new google.maps.Marker({	  
    position: position,
    map: map,
    title: location.name,
    icon :{
		url: markerurl,
		scaledSize: new google.maps.Size(30, 30)
	},
  });
  */
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent('<div>'+
    '' + 
	('<a href='+location.cadurl+' target ="_blank"> <p><strong>'+location.name+' </strong></p> </a>')+	
	//((location.name === undefined) ? "" : ('<p><strong>  ' + location.name +' </strong></p>')) +
    ((location.address === undefined) ? location.address : ('<a href=https://www.google.com/maps/dir/?api=1&destination="' + encodeURIComponent(location.address) +'">' + location.address + '</a>')) + '</strong></p>' +
	((location.county === undefined) ? "" : ('<p><strong>County: </strong>' + location.county + '</p>')) +
	((location.comments === undefined) ? "" : ('<p><strong>Comments: </strong>' + location.comments + '</p>')) +
	((location.visitdate === undefined) ? "" : ('<p><strong>Last Visit Date: </strong>' + location.visitdate + '</p>')) +
	//((location.sts === undefined) ? "" : ('<p><strong>STATUS: </strong>' + location.sts + '</p>')) +
    ('<a href=https://dailyfikr.github.io/VisitDetails.html?DB='+location.db+'&ID='+location.rowid+'&Name='+encodeURI(location.name)+'&Sts='+encodeURI(location.sts)+' target ="_blank"> Visit Details </a>')+
	'</div>');
    infowindow.open(map, marker);
  });
  return marker;
}
