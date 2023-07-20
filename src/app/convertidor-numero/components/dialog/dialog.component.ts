import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Converter } from 'src/app/interfaces/converter';



@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements AfterViewInit{

  form: FormGroup;

  @ViewChild('optionInput') optionInput!: ElementRef;

  optionsToSelectMiles: Converter[] = [
    {value: 'punto', viewValue: 'Punto ( . )'},
    {value: 'coma', viewValue: 'Coma ( , )'},
  ];

  optionsToSelectDecimal: Converter[] = [
    {value: 'punto', viewValue: 'Punto ( . )'},
    {value: 'coma', viewValue: 'Coma ( , )'},
  ];

  constructor ( private fb: FormBuilder,
                private dialogRef: MatDialogRef<DialogComponent>,
                private renderer: Renderer2 )
  {
    this.form = this.fb.group({
      optionSelected: [''],
      number: [''],
      optionsMiles: this.optionSelectedMiles,
      optionsDecimal: this.optionSelectedDecimal,

    })



  }

  optionSelectedMiles = new FormControl(this.optionsToSelectMiles[0].value);
  optionSelectedDecimal = new FormControl(this.optionsToSelectDecimal[0].value);

  ngAfterViewInit() {
    
    
  }

  disabledOption(event : any) {
    
    if(event.value === this.form.controls['optionsMiles'].value){
    
      const option = this.optionInput.nativeElement;
      this.renderer.setStyle(option, 'display', "none")
    } 

  }

  

  modifyNumber(event: any) {
    let datoMiles = this.optionSelectedMiles.value
    let datoDecimal = this.optionSelectedDecimal.value;
    let number = this.form.get('number')?.value;

    console.log( datoMiles )

    if( datoMiles === 'coma' ) {
      number = this.agregarSeparadorComa(number);
      
      console.log( number )
    }

    if( datoMiles === 'punto'  ) {
      number = this.agregarSeparadorPunto(number)
      console.log( number )
    }

    this.form.get('number')?.patchValue(number);

  }

  submitModal() {
    if(this.form.invalid) return;

    const num = this.form.value.number;
    this.dialogRef.close(num)
  }

  agregarSeparadorComa(num: number) {
    let newNumber = num.toString().split('.');

    newNumber[0] = newNumber[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return newNumber.join('.')
  }

  agregarSeparadorPunto(num: number) {
    let newNumber = num.toString().split(',');
    
    newNumber[0] = newNumber[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return newNumber.join(',')
  }

  
}
