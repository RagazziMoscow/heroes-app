import { Component } from '@angular/core';
import { MessageService } from "../message.service";
import Button from "../button";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  constructor(public messageService: MessageService) {}

  readonly button: Button = {
    name: "Clear messages",
    action: this.clear.bind(this)
  };

  clear(): void {
    this.messageService.clear();
  }
}
