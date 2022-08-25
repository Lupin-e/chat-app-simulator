import { Injectable } from "@angular/core"
import data  from  '../data/contacts.json'

export interface Contacts {
  name: string
  value: string
  photo: string 
  time: string | Date
  chatId: string
}

export interface ContactsData {
  contacts:Contacts[]
}

@Injectable({providedIn: 'root'})

export class ContactsSercive{
  contacts: Contacts[] = []
  
  getContacts(){

    const localStorageContacts = localStorage.getItem('contacts')

    if(localStorageContacts) {
      this.contacts = JSON.parse(localStorageContacts)
      console.log('Contacts loaded from LS', this.contacts);
      
    }else{
      this.contacts = data.contacts //отримую дані контактів з JSON
      console.log('Contacts loaded from mock');
      localStorage.setItem('contacts', JSON.stringify(data.contacts))
    }
  }

  updateChatList(chatID:string){
    let contact : Contacts;
    this.contacts.forEach((item, index) => {
      if (item.chatId === chatID) {
      contact = item
      this.contacts.splice(index, 1)
      this.contacts.unshift(contact)
      localStorage.setItem('contacts', JSON.stringify(this.contacts))
      }
    })
  }
}




















