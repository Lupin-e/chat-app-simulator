import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ContactsSercive} from '../services/contacts.service'
import {MessageService} from '../services/messages.service'

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit{
  @Output() onGet: EventEmitter<string> = new EventEmitter<string>()
  @Input() search: string = ''
  currentChatID = ''
  inputValue = ''


  constructor(
    public contactsService: ContactsSercive,
    public messagesService: MessageService) {
  }

  ngOnInit(){
    this.messagesService.getChats() //отримую чати
    this.contactsService.getContacts() //виводить список контактів
    this.messagesService.getLastMessage() //виводить time та value останнього повідомлення для контакту
  }

  chooseChat(id:string){

    this.currentChatID = id //отримання chatId 
    this.onGet.emit(this.currentChatID)
  }
}
