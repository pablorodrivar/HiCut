import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(list: any[], text: string): any[] {
    if(text.length === 0) { return list; }

    text = text.toLocaleLowerCase();

    return list.filter(brb => {
      return brb.name.toLocaleLowerCase().indexOf(text) >= 0;
    });
  }  

}
