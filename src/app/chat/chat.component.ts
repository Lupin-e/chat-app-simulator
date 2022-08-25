import { Component, ElementRef, Input, OnChanges, ViewChild, OnInit} from '@angular/core';
import {MessageService, Message} from '../services/messages.service'
import {ContactsSercive} from '../services/contacts.service'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})

export class ChatComponent implements OnChanges{
  
  @ViewChild('scrollMe') private scrollContainer: ElementRef
  @Input() currentChatID: string = ''
  
  replyToUser = ''
  inputValue = ''
  h3 = ''
  img = ''

  constructor(
    public messagesService: MessageService,
    public contactsService: ContactsSercive){
  }

  ngOnInit(){
    
  }

  ngOnChanges(){
    this.contactsService.contacts.forEach(contact =>{
      if(contact.chatId === this.currentChatID) {
        this.h3 = contact.name
        this.img = contact.photo
      }
    })
    this.inputValue = ''
    this.defaultScrollToBottom()
    this.messagesService.getChats()
  }

  sendMessage(){
    let sendTime = new Date() 
    let userMessage: Message = {
      value: this.inputValue,
      id: '0',
      time: sendTime
    }
       
    this.messagesService.messages[+this.currentChatID - 1].chats.push(userMessage) //надсилаю повідомлення
    localStorage.setItem('messages', JSON.stringify(this.messagesService.messages))
    this.inputValue=''
    this.defaultScrollToBottom()
    this.contactsService.updateChatList(this.currentChatID) //оновлюю список контактів
    this.messagesService.getLastMessage() //виводить time та value останнього повідомлення для контакту

    this.messagesService.getReply() //отримую відповідь
      
      .subscribe(response => {
        let replyPhoto = ''
        this.replyToUser = this.currentChatID
        this.contactsService.contacts.filter(contact => {
          if (contact.chatId === this.replyToUser) {
            replyPhoto = contact.photo
          }
        }) 
        let replyTime = new Date()
        let replyMessage: Message = {
          value: response.value,
          photo: replyPhoto,
          id:  this.replyToUser,
          time: replyTime
        }
        setTimeout(()=> {
            this.messagesService.messages[+this.replyToUser -1].chats.push(replyMessage)
            localStorage.setItem('messages', JSON.stringify(this.messagesService.messages)) 
            this.contactsService.updateChatList(this.replyToUser) //оновлюю список контактів
            this.messagesService.getLastMessage() //виводить time та value останнього повідомлення для контакту
            
            this.defaultScrollToBottom()

            let replyFromContact : string
            this.contactsService.contacts.forEach(contact => {
              if (contact.chatId === this.replyToUser) {
                replyFromContact = contact.name
              }
            })
            setTimeout(()=>  alert(`Ви отримали нове повідомлення від ${replyFromContact}`), 500) //отримую сповіщення про повідомлення
            console.log(this.messagesService.messages);
        }, 5000)
      })
     
  }

  defaultScrollToBottom() {
    setTimeout(()=>this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight,0)
  }
}







