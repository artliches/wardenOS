import { Component, EventEmitter, Input, OnChanges, Output, ViewEncapsulation, } from '@angular/core';
import { RandomNumberService } from '../services/random-number.service';
import { LOOT_POF, CYBERNETIC_MUTATIONS, CACHE, WARP_DRIVE, WARP_WEIRD, VAULT, NIGHTMARES } from '../services/random-tables.constants';


@Component({
  selector: 'app-generic-random-search',
  templateUrl: './generic-random-search.component.html',
  styleUrls: ['./generic-random-search.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GenericRandomSearchComponent implements OnChanges {
  @Input() tableToSearch = '';
  @Input() generateSearch = false;
  @Input() styleToUse = '';
  @Output() pageTitle = new EventEmitter<string>();

  title = '';
  results = '';

  constructor(
    private randNum: RandomNumberService,
  ) { }

  ngOnChanges() {
    this.results = '';
    switch (this.tableToSearch) {
      case 'cyber': {
        const index = this.randNum.getRandomNumber(0, CYBERNETIC_MUTATIONS.length - 1);
        this.title = 'Cybernetic Mutation';
        if (index === 99) {
          this.explodingCybermutations(2);
        } else {
          this.results = CYBERNETIC_MUTATIONS[index];
        }
        break;
      }
      case 'lootPOF': {
        this.title = 'Loot from the Propero';
        this.results = LOOT_POF
          [this.randNum.getRandomNumber(0, LOOT_POF.length - 1)];
        this.results = this.randNum.rollStringDice(this.results, 'd1');
        break;
      }
      case 'cache': {
        this.title = 'Loot from the Cache';
        this.results = CACHE
          [this.randNum.getRandomNumber(0, CACHE.length - 1)];
        break;
      }
      case 'warp': {
        this.title = 'Warp Core Malfunction';
        this.results = WARP_DRIVE
          [this.randNum.getRandomNumber(0, WARP_DRIVE.length - 1)];
        this.results = this.randNum.rollStringDice(this.results, 'd4');

        if (this.results.includes('AQUARIUM')) {
          this.results = `${this.results} <b>${WARP_WEIRD.fish[this.randNum.getRandomNumber(0, WARP_WEIRD.fish.length - 1)]}</b>`;
        } else if (this.results.includes('TIME RIPPLE')) {
          this.results = `${this.results} ${WARP_WEIRD.time_ripple[this.randNum.getRandomNumber(0, WARP_WEIRD.time_ripple.length - 1)]}`
        } else if (this.results.includes('PHYSICAL CONTINUITY')) {
          this.results = `${this.results} ${WARP_WEIRD.room_orientation
            [this.randNum.getRandomNumber(0, WARP_WEIRD.room_orientation.length - 1)]}`;
        }
        break;
      }
      case 'vault': {
        this.title = 'Loot from the Vault';
        this.results = VAULT
          [this.randNum.getRandomNumber(0, VAULT.length - 1)];
        break;
      }
      case 'nightmare': {
        this.title = 'The Nightmare';
        this.results = NIGHTMARES
          [this.randNum.getRandomNumber(0, NIGHTMARES.length - 1)];
        break;
      }
    }
    this.pageTitle.emit(this.title.toUpperCase());
 }

 explodingCybermutations(mutationNumber: number) {
   for (let i = 0; i < mutationNumber; i++) {
     const index = this.randNum.getRandomNumber(0, CYBERNETIC_MUTATIONS.length - 1);
     if (index === 99) {
       this.explodingCybermutations(2);
     } else {
       this.results += CYBERNETIC_MUTATIONS[index];
     }
   }
 }

}
