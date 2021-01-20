import { Component, EventEmitter, Input, OnChanges, Output, ViewEncapsulation, } from '@angular/core';
import { RandomNumberService } from '../services/random-number.service';
import { DERELICT, HULL_SIZE, ROOM_INFO, SHIP_NAMES, SHIP_WEAPONS } from '../services/random-tables.constants';

@Component({
  selector: 'app-ship-generator',
  templateUrl: './ship-generator.component.html',
  styleUrls: ['./ship-generator.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ShipGeneratorComponent implements OnChanges {
  @Input() genShip = false;
  @Output() pageTitle = new EventEmitter<string>();

  roomArray = [];
  shipName = '';
  shipProp = {
    cause_of_ruination : '',
    ship_class : '',
    engine_status : '',
    habitation_status : '',
    salvage_1 : '',
    salvage_2 : '',
    survivors : '',
    weird : '',
    cargo_type: '',
  };

  titlesObj = {
    cause_of_ruination : 'Cause of Ruination',
    ship_class : 'Ship Class',
    engine_status : 'Engine Status',
    habitation_status : 'Habitation Status',
    salvage_1 : 'Salvage',
    shipName : 'Ship Name',
    survivors : 'Survivors\'s Status',
    weird : 'Weird',
    cargo_type: 'Cargo Type'
  };


  constructor(
    private randNum: RandomNumberService,
  ) { }

  ngOnChanges() {
    this.getShipName();
    this.getShipProperties();
    this.roomArray = this.getRoomArray();
    console.log(this.roomArray);

    this.pageTitle.emit(this.shipName);
  }

  private getRoomArray() {
    this.roomArray = [];
    const shipHullObj = HULL_SIZE[this.shipProp.ship_class];
    const hullInfo = this.randNum.getRandomNumberArray(1, 6, shipHullObj.die);
    const tempRoomArray = [];

    hullInfo.forEach((hullIndex, index) => {
      let roomInfo = ROOM_INFO[hullIndex][this.randNum.getRandomNumber(0, ROOM_INFO[hullIndex].length - 1)];

      if (roomInfo.includes('WEAPON')) {
        roomInfo = `${roomInfo} ${SHIP_WEAPONS[this.randNum.getRandomNumber(0, SHIP_WEAPONS.length - 1)]}`;
      } else if (roomInfo.toLowerCase().includes('cargo table')) {
        roomInfo = roomInfo.slice(0, roomInfo.indexOf(':') + 1);
        roomInfo = `${roomInfo} ${DERELICT.cargo_type[this.randNum.getRandomNumber(0, DERELICT.cargo_type.length - 1)]}`;
      } else {
        roomInfo = this.randNum.rollStringDice(roomInfo, 'd1');
      }

      tempRoomArray.push(`${index + 1}. ${roomInfo}`);
    });
    return tempRoomArray;
  }

  private getShipProperties() {
    Object.keys(DERELICT).forEach(key => {
      const tableInfo = DERELICT[key];

      this.shipProp[key] = tableInfo[this.randNum.getRandomNumber(0, tableInfo.length - 1)];
      this.shipProp[key] = this.randNum.rollStringDice(this.shipProp[key], 'd1').trim();
    });

    this.shipProp.salvage_1 = `${this.shipProp.salvage_1}, ${this.shipProp.salvage_2}`;
    delete this.shipProp.salvage_2;
  }

  private getShipName() {
    this.shipName = '';

    for (let i = 0; i < 3; i++) {
      const randomName = this.randNum.getRandomNumber(0, SHIP_NAMES[i].length - 1);
      this.shipName += `${SHIP_NAMES[i][randomName]} `;
    }
  }
}
