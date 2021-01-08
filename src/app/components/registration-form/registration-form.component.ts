import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit, OnDestroy {

  dynamicFormArray: any;
  registrationForm!: FormGroup;
  triguerRef: Subscription | any;
  constructor(private httpClient: HttpClient, private fb: FormBuilder) { }


  ngOnInit(): void {
    // se incializa el formGroup vacio;
    this.registrationForm = this.fb.group({});

    this.httpClient.get('assets/D-form/DynamicForm.json').subscribe(data => {
      this.dynamicFormArray = data;
      this.createFormControl();
      this.createFormListener();
    // this.createFormValidators();
    });
  }

  createFormControl(): void {
    // recorre el array para ir creando los controles
    this.dynamicFormArray.forEach((element: any) => {
      if (element.Required) {
        this.registrationForm.addControl(element.ID, new FormControl('', {
          validators: [Validators.required],
          updateOn: element.Control,
        }));
      } else {
        this.registrationForm.addControl(element.ID, new FormControl(''));
      }
    });
    console.log(this.registrationForm);
  }


  createFormListener() {
    const trigguer = this.dynamicFormArray.filter((control: any) => control.Triguer === true)[0] || null;
    this.triguerRef = this.registrationForm.get(trigguer.ID)?.valueChanges.subscribe(data => {
      alert('Trigger input changed: ' + trigguer.Label)
    });
  }

  // testing validator
  // createFormValidators() {
  //   for (const control of this.dynamicFormArray) {
  //     if (control.Required) {
  //       this.registrationForm.controls[control.ID].setValidators(
  //         [Validators.required]);
  //     }
  //   }
  // }

  showStatus(): void {
    if (this.registrationForm.valid) {
      alert('Formulario enviado');
    } else {
      alert('Formulario no valido');
    }
  }

  ngOnDestroy(): void {
    this.triguerRef.unsubscribe();
  }

}
