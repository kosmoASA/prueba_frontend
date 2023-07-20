import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberChange'
})
export class NumberChangePipe implements PipeTransform {

  transform(value: string, millarOption: string, decimalOption: string): string {

    // Redondear los decimales
    const numValue = Number(value);
    const addDecimales = numValue.toFixed(3);

    // Separar la aprte decimal de la otra
    const separacion = addDecimales.split('.');
    let parteEnteros = separacion[0];
    let parteDecimal = separacion[1];

    // Agregar el separador de miles cada tres numeros
    parteEnteros = parteEnteros.replace(/\B(?=(\d{3})+(?!\d))/g, `${ millarOption }`);


    //Combinar todo
    const result = `${parteEnteros}${decimalOption}${parteDecimal}`;

    return result;
  }

}
