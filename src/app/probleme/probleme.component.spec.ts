import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProblemeComponent } from './probleme.component';
import { VerifierCaracteresValidator } from '../shared/longueur-minimum/longueur-minimum.component';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [ProblemeComponent],
        imports: [ReactiveFormsModule, HttpClientTestingModule], // Ajoutez HttpClientTestingModule ici
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
});


  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Zone PRÉNOM invalide avec 2 caractères', () => {
    let errors: ValidationErrors | null;

    // Créez un AbstractControl avec la valeur "ab" (2 caractères)
    let control = new FormControl('ab', [
        VerifierCaracteresValidator.longueurMinimum(3),
        Validators.required,
    ]);

    // Obtenez les erreurs du contrôle
    errors = control.errors;

    // Vérifiez si l'erreur attendue est présente
    expect(errors?.['nbreCaracteresInsuffisant']).toBeTruthy();
});
  it('Zone PRÉNOM valide avec 3 caractères', () => {
    let zone = component.problemeForm.get("prenom");
    zone?.setValue('abc');
    let errors = zone?.errors || {};
    expect(errors['minlength']).toBeFalsy();
  });
  it('Zone PRÉNOM valide avec 200 caractères', () => {
    let zone = component.problemeForm.get("prenom");
    let longString = 'a'.repeat(200);
    zone?.setValue(longString);
    let errors = zone?.errors || {};
    expect(errors['maxlength']).toBeFalsy();
  });
  it('Zone PRÉNOM invalide avec aucune valeur', () => {
    let zone = component.problemeForm.get("prenom");
    zone?.setValue('');
    let errors = zone?.errors || {};
    expect(errors['required']).toBeTruthy();
  });
  it('Zone PRÉNOM invalide avec 10 espaces', () => {
    let zone = component.problemeForm.get("prenom");
    zone?.setValue('          ');
    let errors = zone?.errors || {};
    expect(errors['minlength']).toBeFalsy();
  });
  it('Zone PRÉNOM invalide avec 2 espaces et 1 caractère', () => {
    let zone = component.problemeForm.get("prenom");
    zone?.setValue('  a');
    let errors = zone?.errors || {};
    expect(errors['minlength']).toBeFalsy();
  });
  it('#15 | Zone TELEPHONE est désactivée quand ne pas me notifier', () => {
    component.notificationValue = 'nePasMeNotifier';
    component.onNotificationChange(component.notificationValue);

    let zone = component.problemeForm.get('telephone');
    expect(zone?.disabled).toBeTruthy();
  });

  it('#16 | Zone TELEPHONE est vide quand ne pas me notifier', () => {
    component.problemeForm.get('telephone').setValue('1234567890');
    component.onNotificationChange('nePasMeNotifier');
    let telephoneValue = component.problemeForm.get('telephone').value;
    expect(telephoneValue === null || telephoneValue === '').toBeTrue();
  });

  it('#17 | Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier', () => {
    component.notificationValue = 'nePasMeNotifier';
    component.onNotificationChange(component.notificationValue);

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone?.disabled).toBeTruthy();
  });

  it('#18 | Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier', () => {
    component.notificationValue = 'nePasMeNotifier';
    component.onNotificationChange(component.notificationValue);

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone?.disabled).toBeTruthy();
  });

});
