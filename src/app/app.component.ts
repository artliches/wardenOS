import { style } from '@angular/animations';
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
    generic: false,
  };

  triggerChanges = {
    patch: false,
    trinket: false,
    core: false,
    rim: false,
    generic: false,
  };

  tableToSearch = '';
  styleToPass = '';

  displayInfo(name: string, searchString?: string, styleToPass?: string) {
    this.tableToSearch = '';
    this.styleToPass = '';
    // tslint:disable-next-line: forin
    for (const key in this.displaySection) {
      this.displaySection[key] = false;
    }
    this.displaySection[name] = true;
    this.triggerChanges[name] = !this.triggerChanges[name];

    if (searchString) {
      this.tableToSearch = searchString;
    }
    if (styleToPass) {
      this.styleToPass = styleToPass;
    }
  }
}
