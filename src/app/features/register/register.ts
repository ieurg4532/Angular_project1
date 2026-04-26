import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'travel-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.registerForm.valid) {
      const userData = {
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
      };

      this.authService.register(userData).subscribe({
        next: (response) => {
          console.log('Відповідь сервера:', response);
          alert('Реєстрація успішна! Тепер увійдіть.');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Деталі помилки:', err);
          alert('Помилка реєстрації.');
        },
      });
    }
  }
}
