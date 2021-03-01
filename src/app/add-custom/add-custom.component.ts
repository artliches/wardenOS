import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-custom',
  templateUrl: './add-custom.component.html',
  styleUrls: ['./add-custom.component.scss']
})
export class AddCustomComponent implements OnInit {

  genericForm = this.fb.group({
    title: ['', Validators.required],
    descrip: ['', Validators.required],
    skills: this.fb.group({
      pointsCost: [0],
      percent: [0],
    }),
    equipment: this.fb.group({
      cost: [0],
      dmg: [''],
      critEffect: [''],
      range: [''],
      ammo: [''],
      magSize: ['']
    })
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.genericForm.value);
  }

}
