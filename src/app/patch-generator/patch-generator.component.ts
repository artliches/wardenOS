import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { RandomNumberService } from '../services/random-number.service';
import { PATCH_TABLE } from '../services/random-tables.constants';

@Component({
  selector: 'app-patch-generator',
  templateUrl: './patch-generator.component.html',
  styleUrls: ['./patch-generator.component.scss']
})
export class PatchGeneratorComponent implements OnChanges {
  @Input() getPatch = false;
  patchInfo: any;

  constructor(
    private randNum: RandomNumberService
  ) { }

  ngOnChanges() {
    const rand = this.randNum.getRandomNumber(0, 99);
    this.patchInfo = PATCH_TABLE[rand];
  }
}
