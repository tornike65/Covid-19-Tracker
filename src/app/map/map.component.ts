import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  private long: any = 20.8282;
  private lat: any = 10.5795;
  private zoom: any = 1;
  @Input() countries: any;
  @Input() currentCountry: any;
  @Input() allData:boolean;
  public geojson1 = {
    type: "FeatureCollection",
    features: [],
  }
  constructor() { }

  ngAfterViewInit(): void {
    //this.initMap(this.countries);
  }

  ngOnInit(): void {
    this.convertJsonToGeoJSon();
    this.initMap(this.long, this.lat, this.zoom);
  }

  ngOnChanges() {
    this.initMap(this.long, this.lat, this.zoom);
  }


  private initMap(long: any, lat: any, zoom): void {
    if (this.currentCountry != null) {
      console.log(this.currentCountry)
      long = this.currentCountry.countryInfo.long;
      lat = this.currentCountry.countryInfo.lat;
      zoom = 7;
      this.currentCountry = null;
    }

    else if(this.currentCountry == null){
      zoom = 1;
      this.allData = false;
    }

    mapboxgl.accessToken = 'pk.eyJ1IjoidG9ybmlrZTY1IiwiYSI6ImNrc2c3MWJoczFoZm4ydnFrM2xwdm00djYifQ.H1YeZ1y1n2zunMZXaU0-PA';
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/tornike65/cksg75e1o6mr417rzp8xnocve', // style URL
      center: [long, lat], // starting position [lng, lat]
      zoom: zoom // starting zoom
    });

    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
      })
    );

    map.on('load', () => {
      map.addSource('coronavirus-data', {
        // This GeoJSON contains features that include an "icon"
        // property. The value of the "icon" property corresponds
        // to an image in the Mapbox Streets style's sprite.
        'type': 'geojson',
        data: this.geojson1,
      });

      // Add a layer showing the places.
      map.addLayer({
        'id': 'coronavirus-layer',
        'type': 'circle',
        'source': 'coronavirus-data',
        'paint': {
          'circle-radius': 12,
          'circle-stroke-width': 2,
          'circle-color': 'red',
          'circle-stroke-color': 'white'
        }
      });

      // When a click event occurs on a feature in the places layer, open a popup at the
      // location of the feature, with description HTML from its properties.
      map.on('click', 'coronavirus-layer', (e) => {
        // Copy coordinates array.
        
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(map);
      });

      // Change the cursor to a pointer when the mouse is over the places layer.
      map.on('mouseenter', 'coronavirus-layer', () => {
        map.getCanvas().style.cursor = 'pointer';
      });

      // Change it back to a pointer when it leaves.
      map.on('mouseleave', 'coronavirus-layer', () => {
        map.getCanvas().style.cursor = '';
      });
    });
  }

  convertJsonToGeoJSon() {
    for (var i = 0; i < this.countries.length; i++) {
      this.geojson1.features.push({
        "type": "Feature",
        'properties': {
          'description': `<div class="info-container">
          <div class="info-flag" style='background-image: url("${this.countries[i].countryInfo.flag}")';
          ></div>
          <div class="info-name">${this.countries[i].country}</div>
          <div class="info-confirmed">
            Cases: ${this.countries[i].cases}
          </div>
          <div class="info-recovered">
            Recovered: ${this.countries[i].recovered}
          </div>
          <div class="info-deaths">
            Deaths: ${this.countries[i].deaths}
          </div>
        </div>`,
        },
        "geometry": {
          "type": "Point",
          "coordinates": [this.countries[i].countryInfo.long, this.countries[i].countryInfo.lat]
        }
      });
    }
  }

}
