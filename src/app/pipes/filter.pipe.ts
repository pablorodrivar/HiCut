import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(data: any[], text: string): any[] {
    if(text.length === 0) { return data; }

    text = text.toLocaleLowerCase();

   return data.filter( element => {
      return element.brb.name.toLocaleLowerCase().includes(text) 
      || element.brb.address.toLocaleLowerCase().includes(text);
    });
  }

}
