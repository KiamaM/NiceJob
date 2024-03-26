import { Pipe, PipeTransform } from '@angular/core';
import { profile } from '../Interfaces/profile.interface';

@Pipe({
  name: 'searchPipe',
  standalone: true
})
export class SearchPipePipe implements PipeTransform {

  transform( profiles:profile[], name: string): profile[] {
    if(!profiles || name == ''){
      return profiles
    }

    const filtered: profile[] =[]

    for(let profile of profiles){
      if(profile.serviceName.toLowerCase().includes(name.toLowerCase())){
        filtered.push(profile)
      }
    }

    return filtered
  }

}
