import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { RandomNumberService } from '../services/random-number.service';
import { TRINKET_TABLE } from '../services/random-tables.constants';

@Component({
  selector: 'app-trinket-generator',
  templateUrl: './trinket-generator.component.html',
  styleUrls: ['./trinket-generator.component.scss']
})
export class TrinketGeneratorComponent implements OnChanges {
  @Input() getTrinket = false;
  @Output() pageTitle = new EventEmitter<string>();
  trinketInfo: any;

  constructor(
    private randNum: RandomNumberService
  ) { }

  ngOnChanges() {
    const rand = this.randNum.getRandomNumber(0, 99);
    this.trinketInfo = TRINKET_TABLE[rand];
    this.pageTitle.emit('TRINKET');
  }
}
