import { Component, OnInit } from '@angular/core';
import { RandomNumberService } from './services/random-number.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  theme = 'dark';
  isClicked = true;
  openDisplaySection = false;
  displaySection = {
    patch: false,
    trinket: false,
    core: false,
    rim: false,
    generic: false,
    ship: false,
  };

  buttonSectionObj = {
    pof: false,
    dead: false,
    grad: false
  };

  triggerChanges = {
    patch: false,
    trinket: false,
    core: false,
    rim: false,
    generic: false,
  };

  previousSaying = [];
  pagePrintTitle = '';
  tableToSearch = '';
  randomSaying = [];
  showPrint = false;
  styleToPass = '';
  wardenSubtext = this.random.getRandomSaying(99, 0).text;

  constructor(
    private random: RandomNumberService,
  ) {}

  ngOnInit() {
    document.title = 'WARDEN OS ONLINE';
  }

  changeTheme(themeName: string) {
    const body = document.body;
    const prevTheme = body.classList.value;

    body.classList.replace(prevTheme, themeName);
  }

  toggle() {
    this.isClicked = !this.isClicked;
  }

  displayInfo(name: string, searchString?: string, styleToPass?: string) {
    this.openDisplaySection = true;
    this.pagePrintTitle = '';
    this.tableToSearch = '';
    this.styleToPass = '';
    this.hideDisplaySection();
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

  getPageTitle(event: string) {
    this.pagePrintTitle = event;
  }

  getRandomWardenSubtext() {
    this.randomSaying[2] = this.random.getRandomSaying(this.previousSaying[2], 0);
    this.wardenSubtext = this.randomSaying[2].text;
    this.previousSaying[2] = this.randomSaying[2].num;
  }

  openSection(name: string) {
    this.showPrint = false;
    this.hideDisplaySection();
    this.hideButtonSubSection(name);
    this.buttonSectionObj[name] = !this.buttonSectionObj[name];
  }

  print() {
    document.title = `WARDEN OS_${this.pagePrintTitle}`;
    window.print();
    document.title = 'WARDEN OS ONLINE';
  }

  private hideDisplaySection() {
    // tslint:disable-next-line: forin
    for (const key in this.displaySection) {
      this.displaySection[key] = false;
    }
  }

   hideButtonSubSection(ignore?: string) {
    // tslint:disable-next-line: forin
    for (const key in this.buttonSectionObj) {
      if (key !== ignore) {
        this.buttonSectionObj[key] = false;
      }
    }
  }
}
