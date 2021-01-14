import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnChanges, OnInit, ViewEncapsulation, ɵConsole } from '@angular/core';
import { RandomNumberService } from '../services/random-number.service';
import { SPACE_STATION } from '../services/random-tables.constants';

@Component({
  selector: 'app-space-station-generator',
  templateUrl: './space-station-generator.component.html',
  styleUrls: ['./space-station-generator.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SpaceStationGeneratorComponent implements OnChanges {
  @Input() genSpaceStation = false;
  coreStationText = '';
  stationName = '';


  constructor(
    private randNum: RandomNumberService
  ) { }

  ngOnChanges() {
    this.coreStationText = this.composeCoreStationText();
  }

  composeCoreStationText() {
    let crisisSection = '';
    let crisisText = '';
    let marketSection = '';
    let marketText = '';
    let resourceText = '';
    this.stationName = this.getStationName();
    const coreStationDescription = this.getStationInfo('core_station');
    const coreLeader = this.getStationInfo('core_leader');
    const backingGroup = this.getStationInfo('group');

    const introText = `<b>${this.stationName}</b> is a(n) <b>${coreStationDescription}</b>. It\'s run by
      a(n) <b>${coreLeader}</b> backed by <b>${backingGroup}</b>. Docking costs
      <b>${this.randNum.getRandomNumber(1, 10) * 100}</b>cr, and a cheap room is
      <b>${this.randNum.getRandomSum(2, 0, 99)}</b>cr/night.`;

    if (this.randNum.getRandomNumber(1, 100) <= 5) {
      crisisText = this.getStationInfo('crisis');
      crisisSection = `
        <div><b>!!WARNING!!</b></div>
        <article>${this.randNum.rollStringDice(crisisText, 'd1')}</article>
        <div><b>!!WARNING!!</b></div>
      `;
    } else {
      marketText = this.getStationInfo('goods');
      resourceText = this.getStationInfo('resource');
      marketSection = `
        You can buy supplies and fuel as per normal, though at a hefty markup of
        <b>${this.randNum.getRandomSum(2, 1, 100)}%</b>. They also buy <b>${marketText}</b> at
        <b>${this.randNum.getRandomNumber(1, 100) - 10}%</b> off and local free-traders
        have a line on where to find <b>${resourceText}</b>.
      `;
    }

    return `
      <article>${introText}</article>
      <article style='padding-top: 1rem'>${crisisSection ? crisisSection : marketSection}</article>
    `;

  }

  getStationInfo(key: string) {
    return SPACE_STATION[key]
      [this.randNum.getRandomNumber(0, SPACE_STATION[key].length - 1)];
  }

  getStationName() {
    const stationFirstName = SPACE_STATION.station_name1
      [this.randNum.getRandomNumber(0, SPACE_STATION.station_name1.length - 1)];
    const stationLastName = SPACE_STATION.station_name2
      [this.randNum.getRandomNumber(0, SPACE_STATION.station_name2.length - 1)];

    return `${stationFirstName} ${stationLastName}`;
  }

}
