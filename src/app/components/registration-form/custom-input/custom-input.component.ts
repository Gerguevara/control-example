import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true
    }
  ]
})
export class CustomInputComponent implements OnInit, ControlValueAccessor {

  currentValue = 1;
  onChange = (_: any) => { };
  onTouch = () => { };
  isDisabled!: boolean;
  messages!: string |null;

  constructor() { }

  ngOnInit(): void {
  }

  add() {
    if (this.currentValue >= 8) {
      this.showMessage('You cannot have more than 8 Warehouse')
      return;
    }

    this.currentValue = this.currentValue + 1;
    this.onTouch();
    this.onChange(this.testing(this.currentValue));
  }

  sub() {
    if (this.currentValue < 2) {
      this.showMessage('You need at least one');
      this.currentValue = 1;
      return;
    }
    this.currentValue = this.currentValue - 1;
    this.onTouch();
    this.onChange(this.testing(this.currentValue));
  }

  writeValue(value: number): void {
    if (value) {
      this.currentValue = value;
    }
  }

  // Interface methods
  registerOnChange(fn: any): void {
    this.onChange = fn;

  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }


  //custon functions
  showMessage(mensaje: string) {
    this.messages = mensaje;
    setTimeout(() => {
      this.messages = null;
    }, 3000);
  }

  testing( value: number) {
    console.log('value', value);
    return value;
  }

}
