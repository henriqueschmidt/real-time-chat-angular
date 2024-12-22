import { Component, inject, input, OnInit } from '@angular/core';
import { useChatStore } from '../../stores/chat.store';
import { useAuthStore } from '../../stores/auth.store';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-detail',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat-detail.component.html',
  styleUrl: './chat-detail.component.scss'
})
export class ChatDetailComponent implements OnInit {
  chatId = input.required<string>();
  chatStore = inject(useChatStore);
  authStore = inject(useAuthStore);
  newMessage = '';

  ngOnInit() {
    this.chatStore.listenToMessages(this.chatId());
  }

  sendMessage() {
    if (this.newMessage.trim() && this.authStore.currentUser()) {
      this.chatStore.sendMessage(
        this.chatId(),
        this.authStore.currentUser()!.uid,
        this.newMessage
      );
      this.newMessage = '';
    }
  }
}