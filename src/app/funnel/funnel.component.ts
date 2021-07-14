import { KeyValue } from '@angular/common';
import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { RandomNumberService } from '../services/random-number.service';
import { FIRST_NAMES, LAST_NAMES, SKILLS, CONVICTIONS, MATERIAL } from '../services/random-tables.constants';

@Component({
  selector: 'app-funnel',
  templateUrl: './funnel.component.html',
  styleUrls: ['./funnel.component.scss']
})
export class FunnelComponent implements OnChanges {
  @Input() genFunnel = false;
  @Output() pageTitle = new EventEmitter<string>();
  funnelArray = [];

  constructor(
    private rand: RandomNumberService
  ) { }

  ngOnChanges() {
    this.createFunnelCharacters();
  }

  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  }

  private createFunnelCharacters() {
    this.funnelArray = [];
    for (let i = 0; i < 16; i++) {
      const currStats = this.shuffle([20, 25, 25, 30]);
      this.funnelArray.push(
        {
          name: `${this.rand.getRandomFromSimpleArray(FIRST_NAMES)} ${this.rand.getRandomFromSimpleArray(LAST_NAMES)}`.trim(),
          hp: 0,
          stress: 2,
          stats: {
            STR: currStats[0],
            SPD: currStats[1],
            INT: currStats[2],
            COM: currStats[3]
          },
          saves: {
            SAN: 25,
            FEA: 25,
            BOD: 25,
            ARM: 0
          },
          SKILL: this.getSkill(),
          CRIME: this.rand.getRandomFromSimpleArray(CONVICTIONS),
          MATERIAL: this.rand.getRandomFromSimpleArray(MATERIAL)
        });
    }

    this.funnelArray.forEach(char => {
      char.hp = char.stats.STR;
      char.MATERIAL = {item1: char.MATERIAL, item2: char.CRIME.item};
      if (char.CRIME.crime.includes('Android')) {
        char.saves.FEA = 50;
      }
    });

    this.pageTitle.emit(`FUNNEL CARDS`);
  }

  private getSkill() {
    const rawSkill = this.rand.getRandomFromSimpleArray(SKILLS.filter(x => x.cost === 1));
    return `${rawSkill.title}. ${rawSkill.descrip}`;
  }

  shuffle(array) {
    // tslint:disable-next-line: one-variable-per-declaration
    let currentIndex = array.length,
                      randomIndex: number;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }
}
