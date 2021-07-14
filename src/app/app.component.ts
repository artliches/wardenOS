import { Component, OnInit, ViewChild } from '@angular/core';
import { RandomNumberService } from './services/random-number.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('fileUploadInput', {static: false}) inputRef;

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
    char: false,
    cb: false,
    funnel: false,
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
    char: false,
    funnel: false,
  };
  jsonToDownload: any;
  previousSaying = [];
  pagePrintTitle = '';
  tableToSearch = '';
  randomSaying = [];
  showDownload = false;
  showPrint = false;
  styleToPass = '';
  wardenSubtext = this.random.getRandomSaying(99, 0).text;
  uploadedSheet: any;

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

  displayInfo(name: string, searchString?: string, styleToPass?: string, charUpload?: any) {
    this.showDownload = false;
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
    if (name === 'char') {
      this.showDownload = true;
    }

    this.showPrint = name === 'cb' ? false : true;
    this.getRandomWardenSubtext();
  }

  clearUploads() {
    this.uploadedSheet = null;
  }

  download() {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.jsonToDownload));
    const dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', `${this.pagePrintTitle}.json`);
  }

  getPageTitle(event: string) {
    this.pagePrintTitle = event;
  }

  getRandomWardenSubtext() {
    this.randomSaying[2] = this.random.getRandomSaying(this.previousSaying[2], 0);
    this.wardenSubtext = this.randomSaying[2].text;
    this.previousSaying[2] = this.randomSaying[2].num;
  }

  getUploadedCharSheet(event: any) {
    this.jsonToDownload = event;
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

  uploadFile(event: any) {
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();

    fileReader.readAsText(selectedFile, 'UTF-8');
    fileReader.onload = () => {
     this.uploadedSheet = JSON.parse(fileReader.result.toString());
     this.displayInfo('char');
     this.reset();
    };
    fileReader.onerror = (error) => {
      console.log(error);
    };
  }

  reset() {
    this.inputRef.nativeElement.value = '';
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
