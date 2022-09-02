import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../Interfaces/project';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(value:Project[], name:string): Project[] {
    if(value.length==0 || name==''){
      return value
    }
    const filtered:Project[]=[]
    for(let stud of value){
      if(stud.name.toLocaleLowerCase().indexOf(name.toLocaleLowerCase())!==-1){
        filtered.push(stud)
      }
    }
    return filtered
  }



}
