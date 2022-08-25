import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable} from "rxjs";
import data  from  '../data/chatsData.json'
import { ContactsSercive } from "./contacts.service";

export interface Message {
  value: string
  photo?: string
  id?:string
  time: string | Date
}

export interface ChatData {
  chatId: string
  chats: Message[]
}

@Injectable({providedIn: 'root'})

export class MessageService {
  constructor(
    private http: HttpClient,
    private contactsService: ContactsSercive){
  }

  messages: ChatData []
  
  //отримую з JSON історію повідомлень
  getChats(){

    const localStorageChats = localStorage.getItem('messages')

    if(localStorageChats) {
      this.messages = JSON.parse(localStorageChats)
      
    }else{
      this.messages = data.chatsData //отримую історію повідомлень з JSON
      localStorage.setItem('messages', JSON.stringify(data.chatsData))
    }
    
  }

  // отримую дані останнього повідомлення з чату для кожного контакту
  getLastMessage() {
    return this.messages.forEach((element: ChatData)  => {
      let lastMessageTime: string | Date = ''
      let lastMessage= ''
      
      lastMessageTime= element.chats[element.chats.length - 1].time
      lastMessage= element.chats[element.chats.length - 1].value
       this.contactsService.contacts.forEach((item) => {
        if(element.chatId === item.chatId) {
          item.value = lastMessage
          item.time = lastMessageTime
        }
        localStorage.setItem('contacts', JSON.stringify(this.contactsService.contacts))
      })
      
    })
  }

  getReply(): Observable<Message>{  
    return this.http.get<Message>('https://api.chucknorris.io/jokes/random')
  }
}