import { Component, inject, signal } from '@angular/core';
import { useAuthStore } from '../../stores/auth.store';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = signal<string | null>(null);
  private authStore = inject(useAuthStore);
  private router = inject(Router);

  async onSubmit() {
    try {
      await this.authStore.login(this.email, this.password);
      this.router.navigate(['/chat']);
      // Navigate to chat list after successful login
    } catch (error) {
      console.error('Login error:', error);
      if (error instanceof Error) {
        this.errorMessage.set(error.message);
      } else {
        this.errorMessage.set(
          'An unexpected error occurred. Please try again.'
        );
      }
    }
  }
}
