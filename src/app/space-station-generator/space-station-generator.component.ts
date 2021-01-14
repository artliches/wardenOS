import { Component, Input, OnChanges, ViewEncapsulation } from '@angular/core';
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
  amalgamationStructure = [];
  commonIssues = '';
  coreStationMarketStatus = '';
  coreStationText = '';
  notableLocations = [];
  stationName = '';
  stationStructure = '';

  constructor(
    private randNum: RandomNumberService
  ) { }

  ngOnChanges() {
    this.coreStationText = this.composeCoreStationText();
    this.coreStationMarketStatus = this.composeMarketStatus();
    this.stationStructure = this.createStationStructure(this.stationName);
    this.commonIssues = this.getStationInfo('common_problems');
    this.notableLocations = this.getNotableLocations();
  }

  composeCoreStationText() {
    this.stationName = this.getStationName();
    const coreStationDescription = this.getStationInfo('core_station');
    const coreLeader = this.getStationInfo('core_leader');
    const backingGroup = this.getStationInfo('group');

    return `<b>${this.stationName}</b> is a(n) <b>${coreStationDescription}</b>. It\'s run by
      a(n) <b>${coreLeader}</b> backed by <b>${backingGroup}</b>. Docking costs
      <b>${this.randNum.getRandomNumber(1, 10) * 100}</b>cr, and a cheap room is
      <b>${this.randNum.getRandomSum(2, 0, 99)}</b>cr/night.`;
  }

  composeMarketStatus() {
    let crisisSection = '';
    let crisisText = '';
    let marketSection = '';
    let marketText = '';
    let resourceText = '';

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
      ${crisisSection ? crisisSection : marketSection}
    `;
  }

  createAmalgamationStructure(numberOfRolls: number) {
    for (let i = numberOfRolls; i > 0; i--) {
      const rand = this.randNum.getRandomNumber(0, 9);
      if (rand === 9) {
        this.createAmalgamationStructure(i + 2);
      } else {
        this.amalgamationStructure.push(`>> ${SPACE_STATION.structure[rand]}`);
      }
    }
  }

  createStationStructure(name: string): string {
    this.amalgamationStructure = [];
    let structure =  `<b>${name}</b>`;
    const structureAttribute = this.getStationInfo('structure');
    if (structureAttribute.indexOf('Asteroid') !== -1) {
      structure += ` is built on an ${structureAttribute}.`;
    } else if (structureAttribute.indexOf('Modular') !== -1) {
      structure += ` is ${structureAttribute}.`;
    } else if (structureAttribute.indexOf('Amalgamation') !== -1) {
      this.createAmalgamationStructure(2);
      structure += ` is an amalagamation, with the following modules haphazardly conjoined:`;
    } else {
      structure += ` is built like a ${structureAttribute}.`;
    }

    return structure;
  }

  getNotableLocations() {
    const numLocations = this.randNum.getRandomNumber(1, 10);
    const locationDescrips = [];

    for (let i = 0; i < numLocations; i++) {
      const local = this.getStationInfo('noteworthy_locations');
      locationDescrips.push(this.getStationInfo(local).trim());
    }

    return locationDescrips;
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
