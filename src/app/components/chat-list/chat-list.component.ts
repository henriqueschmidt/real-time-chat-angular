import { Component, inject } from '@angular/core';
import { Chat, useChatStore } from '../../stores/chat.store';
import { useAuthStore } from '../../stores/auth.store';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [RouterModule, DatePipe, CommonModule],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.scss'
})
export class ChatListComponent {
  chatStore = inject(useChatStore);
  authStore = inject(useAuthStore);
  router = inject(Router);

  ngOnInit() {
    const userId = this.authStore.currentUser()?.uid;
    if (userId) {
      this.chatStore.listenToChats(userId);
    } else {
      this.router.navigate(['/login']);
    }
  }

  getChatName(chat: Chat): string {
    if (chat.participantNames) {
      return chat.participantNames
        .filter((name) => name !== this.authStore.currentUser()?.displayName)
        .join(', ');
    }
    return 'Loading...';
  }

  logout() {
    this.authStore.logout();
    this.router.navigate(['/login']);
  }
}
