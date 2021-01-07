import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  dynamicFormArray: any;
  registrationForm!: FormGroup;

  constructor(private httpClient: HttpClient, private fb: FormBuilder) { }

  ngOnInit(): void {

    // se incializa vacio
    this.registrationForm = this.fb.group({});

    this.httpClient.get('assets/D-form/DynamicForm.json').subscribe(data => {
      this.dynamicFormArray = data;
      this.createFormControl();
      this.createListen();
    });
  }


  createFormControl(): void {
    // recorre el array para ir creando los controles
    this.dynamicFormArray.forEach((element: any) => {

      this.registrationForm.addControl(element.ID, new FormControl('',{validators: [Validators.required],
        updateOn: element.Control,
      }));

      // if (element.Required) {
      //   this.registrationForm.addControl(element.ID, new FormControl('',{validators: [Validators.required],
      //     updateOn: element.Control,
      //   }));
      // } else {
      //   this.registrationForm.addControl(element.ID, new FormControl(''));
      // }
    });
    console.log(this.registrationForm);
  }


  createListen() {
    this.registrationForm.get('FirstName')?.valueChanges.subscribe(data => {
      console.log('cambio valor');
    })
  }



  showStatus(): void {
    if (this.registrationForm.valid) {
      alert('Formulario enviado');
    } else {
      alert('Formulario no valido');
    }
  }


}
