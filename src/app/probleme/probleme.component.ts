import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit{
  problemeForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.problemeForm = this.fb.group({
      prenom: ['', [Validators.required,Validators.minLength(3),this.verifEspace]],
    });
  }

  ngOnInit(): void {
  }

  save(): void{}
  
  verifEspace(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const isEspace = (value || '').trim().length === 0;
  
    if (isEspace) {
      return { 'espace': true };
    }
  
    return null;
  }

}
