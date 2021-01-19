import { style } from '@angular/animations';
import { Component } from '@angular/core';
import { RandomNumberService } from './services/random-number.service';

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
    ship: false,
  };

  triggerChanges = {
    patch: false,
    trinket: false,
    core: false,
    rim: false,
    generic: false,
  };

  previousSaying = [];
  tableToSearch = '';
  randomSaying = [];
  showPrint = false;
  styleToPass = '';
  wardenSubtext = this.random.getRandomSaying(99, 0).text;

  constructor(
    private random: RandomNumberService,
  ) {}

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

    this.showPrint = true;
    this.getRandomWardenSubtext();
  }

  getRandomWardenSubtext() {
    this.randomSaying[2] = this.random.getRandomSaying(this.previousSaying[2], 0);
    this.wardenSubtext = this.randomSaying[2].text;
    this.previousSaying[2] = this.randomSaying[2].num;
  }

  print() {
    window.print();
  }
}
