import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { VerifierCaracteresValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { TypeProbleme } from './probleme.service';
import { ITypeProbleme } from './probleme';

@Component({
  selector: 'app-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit{
  problemeForm: FormGroup;
  typesProbleme:ITypeProbleme[]
  errorMessage: string;
  constructor(private fb: FormBuilder, private typeproblemeService:TypeProbleme ) {
    this.problemeForm = this.fb.group({
      prenom: ['', [VerifierCaracteresValidator.longueurMinimum(3),Validators.required]],
      nom: ['',[Validators.required, Validators.maxLength(50)]],
      typeprobleme: [''],
      
    });

    this.typeproblemeService.obtenirTypesProbleme()
    .subscribe(typesProbleme => this.typesProbleme = typesProbleme,
               error => this.errorMessage = <any>error);  
  }

  ngOnInit(): void {
  }

  save(): void{}

}
