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
  notification: string;
  isNotificationEnabled: boolean;
  notificationValue: string = 'nePasMeNotifier';

  constructor(private fb: FormBuilder, private typeproblemeService:TypeProbleme ) {
    this.problemeForm = this.fb.group({
      prenom: ['', [VerifierCaracteresValidator.longueurMinimum(3),Validators.required]],
      nom: ['',[Validators.required, Validators.maxLength(50)]],
      typeprobleme: [''],
      courrielGroup: this.fb.group({
        courriel: [{value: '', disabled: true}],
        courrielConfirmation: [{value: '', disabled: true}],
      }),
    telephone: [{value: '', disabled: true}],
    });

    this.typeproblemeService.obtenirTypesProbleme()
    .subscribe(typesProbleme => this.typesProbleme = typesProbleme,
               error => this.errorMessage = <any>error);  
  }

  ngOnInit(): void {
    this.notification = "nePasMeNotifier";
    this.isNotificationEnabled = false;
  }

  onNotificationChange(value: string): void {
    if (value === 'meNotifier') {
      this.problemeForm.get('courrielGroup').get('courriel').enable();
      this.problemeForm.get('courrielGroup').get('courrielConfirmation').enable();
      this.problemeForm.get('telephone').enable();
    } else {
      this.problemeForm.get('courrielGroup').get('courriel').disable();
      this.problemeForm.get('courrielGroup').get('courrielConfirmation').disable();
      this.problemeForm.get('telephone').disable();
      this.problemeForm.get('telephone').reset();
    }
  }
  

  save(): void{}

}
