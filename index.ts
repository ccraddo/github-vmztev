/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
let map: google.maps.Map, infoWindow: google.maps.InfoWindow;
let gl = navigator.geolocation;
//function initMap(): void {}

function initMap(): void {
  // -29.79442995581478, 30.881423982836903
  // map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
  //   center: { lat: -29.79442995581478, lng: 30.881423982836903 },
  //   zoom: 6,
  // });

  let gl = navigator.geolocation;
  // let map: google.maps.Map;
  let es = new google.maps.ElevationService();

  let latitude = 0;
  let longitude = 0;
  let elevation = 0;

  const loc = document.getElementById('loc');
  const ele = document.getElementById('ele');

  var glo = gl.getCurrentPosition((l) => {
    latitude = l.coords.latitude;
    longitude = l.coords.longitude;

    loc?.appendChild(
      document.createTextNode(`lat = ${latitude} lng = ${longitude}`)
    );

    console.table(l);
    
    let pww = { lat: latitude, lng: longitude };
     //let pww = { lat: 34.0518066 , lng: -84.2384067 };
    
      let lcn = new Array<google.maps.LatLngLiteral>(1);
      lcn[0] = pww;
      let v = { locations: lcn };
    
    
    
      var esCall = es.getElevationForLocations(v, (r) => {
        if (r) {
          console.table(r);
          elevation = r[0].elevation;
          ele?.appendChild(document.createTextNode(`ele = ${elevation}`));
        }
      });

  });


  // let mhg: google.maps.LatLngLiteral = {
  //   lat: -29.79442995581478,
  //   lng: 30.881423982836903,
  // };

  // let pww = { lat: 34.04263435649451, lng: -84.23210781791254 };
  // let l = new Array<google.maps.LatLngLiteral>(1);
  // l[0] = pww;
  // let v = { locations: l };
  // //google.maps.LocationElevationRequest

  // var elevationService =
  //   new google.maps.ElevationService().getElevationForLocations(v, (r) => {
  //     if (r) {
  //       const s = r[0];
  //       const e = s.elevation;
  //       const l = s.location;
  //       const resl = s.resolution;

  //       console.table(s);
  //     }
  //   });

  // var glo = gl.getCurrentPosition((l) => {
  //   console.table(l);
  //   console.log(l);
  // });

  // infoWindow = new google.maps.InfoWindow();

  // const locationButton = document.createElement('button');

  // locationButton.textContent = 'Pan to Current Location';
  // locationButton.classList.add('custom-map-control-button');

  // map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

  // locationButton.addEventListener('click', () => {
  //   // Try HTML5 geolocation.
  //   console.log(`click locaton button`);
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position: GeolocationPosition) => {
  //         const pos = {
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude,
  //         };

  //         infoWindow.setPosition(pos);
  //         infoWindow.setContent('Location found.');
  //         infoWindow.open(map);
  //         map.setCenter(pos);
  //         console.table(pos);
  //       },
  //       () => {
  //         handleLocationError(true, infoWindow, map.getCenter()!);
  //       }
  //     );
  //   } else {
  //     // Browser doesn't support Geolocation
  //     handleLocationError(false, infoWindow, map.getCenter()!);
  //   }
  // });
}

function handleLocationError(
  browserHasGeolocation: boolean,
  infoWindow: google.maps.InfoWindow,
  pos: google.maps.LatLng
) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? 'Error: The Geolocation service failed.'
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
