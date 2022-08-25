import { Pipe, PipeTransform } from '@angular/core';
import { Contacts } from '../services/contacts.service';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(chats: Contacts[], search: string = ''): Contacts[] {
    if (!search.trim()) {
      return chats
    }else {
      return chats.filter(chat => {
        
        return  chat.name.toLowerCase().includes(search.toLowerCase())
        
      })
    }
  }

}
