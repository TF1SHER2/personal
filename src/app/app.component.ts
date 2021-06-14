import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { siteAnimations } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    siteAnimations
  ]
})
export class AppComponent implements OnInit {

  subs: Subscription[] = [];

  constructor(private router: Router) {
    this.state = "";
    this.pastState = "";
  }

  ngOnInit() {
    this.subs.push(this.router.events.subscribe((routeData: any) => {
      if (routeData instanceof NavigationStart) {
        //console.log("From: " + this.router.url);
        this.pastRoute = this.router.url;
      } else if (routeData instanceof NavigationEnd) {
        //console.log("To: " + this.router.url);
        this.nextRoute = this.router.url;
        this.prepareAnimationState();
      }
    }));
  }

  ngOnDestroy() {
    for (var i in this.subs) {
      this.subs[i].unsubscribe();
    }
  }

  title = 'personal';
  private swipeCoord: [number, number] = [0,0];
  private swipeTime: number = 0;
  currentRouteIndex = 0;
  state: "isLeft" | "isRight" | "continuing" | "" = "";
  pastState: "isLeft" | "isRight" | "continuing" | "" = "";

  routes: any[] = [
    { route: "/", name: "Home", active: true },
    { route: "/about-me", name: "About Me" },
  ];

  pastRoute = "/";
  nextRoute = "/";

  swipe(e: TouchEvent, when: string): void {
    const coord: [number, number] = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
    const time = new Date().getTime();

    if (when === 'start') {
      this.swipeCoord = coord;
      this.swipeTime = time;
    } else if (when === 'end') {
      const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
      const duration = time - this.swipeTime;
      if (duration < 500 //
        && Math.abs(direction[1]) > 30 // Long enough
        && Math.abs(direction[0]) < Math.abs(direction[1] * 2)) { // Horizontal enough
        const swipe = direction[1] < 0 ? 'next' : 'previous';
        switch (swipe) {
          case 'next':
            this.movePageRight();
            break;

          case 'previous':
            this.movePageLeft();
            break;
        }
      }
    }
  }

  movePageRight() {
    if (this.currentRouteIndex != this.routes.length) {
      this.currentRouteIndex++;
      this.routeToNewPage();
    }
  }

  movePageLeft() {
    if (this.currentRouteIndex > 0) {
      this.currentRouteIndex--;
      this.routeToNewPage();
    }
  }

  prepareAnimationState() {
    this.pastState = this.state;
    var pastIndex = this.routes.indexOf(this.routes.find(x => x.route == this.pastRoute));
    var nextIndex = this.routes.indexOf(this.routes.find(x => x.route == this.nextRoute));

    if (nextIndex < 0) {
      this.state = "";
    } else {
      this.currentRouteIndex = nextIndex;
      if (this.routes[pastIndex])
        this.routes[pastIndex].active = false;
      if (this.routes[nextIndex])
        this.routes[nextIndex].active = true;

      if (pastIndex > nextIndex) {
        this.state = 'isLeft';
      } else if (pastIndex < nextIndex) {
        this.state = 'isRight';
      }

      if (this.state == this.pastState) {
        this.state = 'continuing';
      }
    }

    //console.log(this.state);
  }

  routeToNewPage() {
    if (this.currentRouteIndex >= 0 && this.currentRouteIndex < this.routes.length) {
      this.router.navigate([this.routes[this.currentRouteIndex].route]);
    }
  }
}
