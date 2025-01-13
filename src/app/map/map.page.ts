import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-map',
    templateUrl: './map.page.html',
    styleUrls: ['./map.page.scss'],
    standalone: false
})
export class MapPage implements OnInit {
  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  zoom = 2;
  markers: any = [];

  constructor() {}

  ngOnInit() {
    this.setInitialLocation();
  }

  private setInitialLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.zoom = 10;
        },
        (error) => {
          console.error('Erro ao obter localização:', error);
        }
      );
    }
  }

  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.markers.push({
        position: event.latLng.toJSON(),
        title: `Local Selecionado (${event.latLng.lat()}, ${event.latLng.lng()})`,
      });
    }
  }
}
