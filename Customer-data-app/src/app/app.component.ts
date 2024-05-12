import { Component, NgZone } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cmmd-app';
  showHead: boolean;
  constructor(private zone: NgZone, private router: Router) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/register' || event.url === '/login' || event.url === '/') {
          this.showHead = false;
        } else {
          this.showHead = true;
        }
      }
    });
  }
}
