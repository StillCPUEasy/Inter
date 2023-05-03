import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ProblemeComponent } from './probleme.component';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProblemeComponent ],
      imports: [ ReactiveFormsModule ]
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
    let zone = component.problemeForm.get("prenom");
    zone?.setValue('ab');
    let errors = zone?.errors || {};
    expect(errors['minlength']).toBeTruthy();
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
    expect(errors['espace']).toBeTruthy();
  });
  
});
