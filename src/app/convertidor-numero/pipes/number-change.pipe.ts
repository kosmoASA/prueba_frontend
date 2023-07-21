import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberChange'
})
export class NumberChangePipe implements PipeTransform {

  transform(value: string, millarOption: string, decimalOption: string): string {

    
    const numValue = Number(value);
    const addDecimales = numValue.toFixed(2); // Redondear los decimales
    
    const separacion = addDecimales.split('.'); // Separar la parte decimal de la otra
    let parteEnteros = separacion[0];
    let parteDecimal = separacion[1];

    
    parteEnteros = parteEnteros.replace(/\B(?=(\d{3})+(?!\d))/g, `${ millarOption }`); // Agregar el separador de miles cada tres numeros

    const result = `${parteEnteros}${decimalOption}${parteDecimal}`;

    return result;
  }

}
