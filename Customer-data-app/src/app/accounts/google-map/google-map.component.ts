import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone,
  Inject,
} from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit{
  latitude!: number;
  longitude!: number;
  zoom!: number;
  address!: string;
  private geoCoder: any;

  @ViewChild('search')
  public searchElementRef: ElementRef | undefined;
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private matDialogRef: MatDialogRef<GoogleMapComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: {
      address: string;
      latitude: number;
      longitude: number;
    }
  ) {}

  ngOnInit() {
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();

      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef?.nativeElement
      );
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
          this.getAddress(this.latitude, this.longitude);
        });
      });
    });
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  markerDragEnd($event: any) {
    this.latitude = $event.latLng.lat();
    this.longitude = $event.latLng.lng();
    this.getAddress(this.latitude, this.longitude);
    
  }

  getAddress(latitude: number, longitude: number) {
    this.geoCoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results: any, status: any) => {
        if (status === 'OK') {
          if (results[0]) {
            this.zoom = 12;
            this.address = results[0].formatted_address;
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      }
    );
  }

  closeDialog(sendData:any)
  {
    this.matDialogRef.close(sendData);
  }

  saveLocation(){
    const data = {
      address: this.address,
      latitude: this.latitude,
      longitude: this.longitude
    }
    this.matDialogRef.close(data);
  }
}
