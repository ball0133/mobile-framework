//document.addEventListener("DOMContentLoaded", function geo(){
document.addEventListener("deviceready", function geo(){
    
    if( navigator.geolocation ){ 
        //code goes here to find position
        var params = {enableHighAccuracy: false, timeout:360000, maximumAge:6000000};
        //enableHighAccuracy means try to use GPS and drain the battery
        //for improved accuracy within a few meters.
        //maximum age is how long to cache the location info
        //timeout is how long to wait for the network to respond after the user says ok
        navigator.geolocation.getCurrentPosition( reportPosition, gpsError, params ); 
    
        //to continually check the position (in case it changes) use
        // navigator.geolocation.watchPosition( reportPosition, gpsError, params)
    }else{
        //browser does not support geolocation api
        alert("Sorry, but your browser does not support location based awesomeness.")
    }
});
function reportPosition( position ){ 
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    canvas.width  = 400;
    canvas.height = 400;
    
    var latlon = position.coords.latitude+","+position.coords.longitude;
    var img_url = "http://maps.google.com/maps/api/staticmap?sensor=false&center=&zoom=14&size=400x400&markers=color:gray|label:A|" + latlon;
    
    var imageObj = new Image();
    imageObj.onload = function() {
        context.drawImage(imageObj, 0, 0);
    };
    imageObj.src = img_url;
    
    pages[1].appendChild(canvas);
}

function gpsError( error ){   
  var errors = {
    1: 'Permission denied',
    2: 'Position unavailable',
    3: 'Request timeout'
  };
  alert("Error: " + errors[error.code]);
}
