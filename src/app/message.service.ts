import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  public isDanger: boolean | undefined = false;
  public messages: string[] = [];

  add(message: string, isDanger?:boolean) {
    this.isDanger = isDanger;
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}