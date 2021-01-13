import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wardenOS';
  displaySection = {
    patch: false,
    trinket: false,
  };

  triggerChanges = {
    patch: false,
    trinket: false,
  };

  displayInfo(name: string) {
    // tslint:disable-next-line: forin
    for (const key in this.displaySection) {
      this.displaySection[key] = false;
    }
    this.displaySection[name] = true;
    this.triggerChanges[name] = !this.triggerChanges[name];
  }
}
