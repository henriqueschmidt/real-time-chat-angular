import { Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { NewChatComponent } from './components/new-chat/new-chat.component';
import { ChatDetailComponent } from './components/chat-detail/chat-detail.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

export const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'chats',
    component: ChatListComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'chat/:chatId',
    component: ChatDetailComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'new-chat',
    component: NewChatComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: '',
    redirectTo: '/chats',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/chats',
  },
];
