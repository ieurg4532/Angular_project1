import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TravelService } from '../../shared/services/travel';
import { Router } from '@angular/router';
import { TravelStatus } from '../../shared/models/travel';
import { CommonModule } from '@angular/common';
import { forbiddenNameValidator } from '../../shared/validators/custom.validators';

@Component({
  selector: 'app-travel-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './travel-form.html',
  styleUrl: './travel-form.css',
})
export class TravelFormComponent {
  private fb = inject(FormBuilder);
  private travelService = inject(TravelService);
  private router = inject(Router);

  statuses = Object.values(TravelStatus);

  form: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/адмін/i)]],
    description: ['', [Validators.required, Validators.maxLength(200)]],
    price: [0, [Validators.required, Validators.min(100)]],
    imageUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
    status: [TravelStatus.Available, Validators.required],
    country: ['', Validators.required],
    region: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.form.valid) {
      const rawValue = this.form.getRawValue();

      const newTravel = {
        ...rawValue,
        id: Date.now().toString(),
        startDate: new Date().toISOString().split('T')[0], // формат YYYY-MM-DD
        location: {
          country: rawValue.country,
          region: rawValue.region,
        },
        tags: ['Новинка'],
        isHot: false,
      };

      this.travelService.addItem(newTravel).subscribe({
        next: () => {
          console.log('Подорож успішно додана!');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Помилка при збереженні:', err);
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
