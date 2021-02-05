import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cb-red-mock',
  templateUrl: './cb-red-mock.component.html',
  styleUrls: ['./cb-red-mock.component.scss']
})
export class CbRedMockComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  statsArray = ['INT', 'REF', 'DEX', 'TECH', 'COOL', 'WILL', 'LUCK', 'MOVE', 'BODY', 'EMP'];
  rows = ['ROW1', 'ROW2', 'ROW3', 'ROW4'];

  constructor() { }

  ngOnInit() {
  }

}
