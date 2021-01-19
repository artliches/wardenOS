import { Component, EventEmitter, Input, OnChanges, Output, ViewEncapsulation, } from '@angular/core';
import { RandomNumberService } from '../services/random-number.service';
import { LOOT_POF, CYBERNETIC_MUTATIONS } from '../services/random-tables.constants';


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
