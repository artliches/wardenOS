import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  displaySection = {
    patch: false,
    trinket: false,
    core: false,
    rim: false,
  };

  triggerChanges = {
    patch: false,
    trinket: false,
    core: false,
    rim: false,
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
