((parm) => {
  let gl = navigator.geolocation;
  let map: google.maps.Map;
  let es = new google.maps.ElevationService();

  let latitude = 0;
  let longitude = 0;
  let elevation = 0;

  const loc = document.getElementById('loc');
  const ele = document.getElementById('ele');

  var glo = gl.getCurrentPosition((l) => {
    latitude = l.coords.latitude;
    longitude = l.coords.longitude;

    // var newdiv = document.createElement("div");
    loc?.appendChild(
      document.createTextNode(`lat = ${latitude} lng = ${longitude}`)
    );
    //loc?.appendChild(document.createTextNode('<br>'));
    console.table(l);
  });
  let mhg: google.maps.LatLngLiteral = {
    lat: -29.79442995581478,
    lng: 30.881423982836903,
  };

  let pww = { lat: latitude, lng: -longitude };

  let l = new Array<google.maps.LatLngLiteral>(1);
  l[0] = pww;
  let v = { locations: l };

  var esCall = es.getElevationForLocations(v, (r) => {
    if (r) {
      console.table(r);
      elevation = r[0].elevation;
      ele?.appendChild(document.createTextNode(`ele = ${elevation}`));
    }
  });
})();
