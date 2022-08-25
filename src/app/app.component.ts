import { Component, OnInit, OnChanges } from '@angular/core';
import { MessageService } from './services/messages.service';
import {ContactsSercive} from './services/contacts.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'chat-app';
  currentChatID:string = ''
  search = ''

  constructor(
    private messagesService: MessageService,
    public contactsService: ContactsSercive,
  ){}

  ngOnInit(): void {
    
  }

  getCurrentUser(id:string){
    this.currentChatID = id
  }

}
