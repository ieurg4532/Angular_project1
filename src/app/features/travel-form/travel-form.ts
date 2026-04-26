import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TravelService } from '../../shared/services/travel';
import { Router, ActivatedRoute } from '@angular/router';
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
export class TravelFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private travelService = inject(TravelService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  statuses = Object.values(TravelStatus);
  isEditMode = false;
  travelId: string | null = null;

  form: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/адмін/i)]],
    description: ['', [Validators.required, Validators.maxLength(200)]],
    price: [0, [Validators.required, Validators.min(100)]],
    imageUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
    status: [TravelStatus.Available, Validators.required],
    country: ['', Validators.required],
    region: ['', Validators.required],
  });

  ngOnInit(): void {
    this.travelId = this.route.snapshot.paramMap.get('id');

    if (this.travelId && this.travelId !== 'new') {
      this.isEditMode = true;
      this.loadTravelData(this.travelId);
    }
  }

  private loadTravelData(id: string): void {
    this.travelService.getById(id).subscribe({
      next: (travel) => {
        if (travel) {
          // Заповнюємо форму даними з бази
          this.form.patchValue({
            title: travel.title,
            description: travel.description,
            price: travel.price,
            imageUrl: travel.imageUrl,
            status: travel.status,
            country: travel.location?.country,
            region: travel.location?.region,
          });
        }
      },
      error: (err) => console.error('Помилка завантаження даних:', err),
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const rawValue = this.form.getRawValue();

      if (this.isEditMode) {
        console.log('Режим редагування: дані готові до оновлення', rawValue);
        this.router.navigate(['/travels']);
      } else {
        const newTravel = {
          ...rawValue,
          id: Date.now().toString(),
          startDate: new Date().toISOString().split('T')[0],
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
            this.router.navigate(['/travels']);
          },
          error: (err) => console.error('Помилка при збереженні:', err),
        });
      }
    } else {
      this.form.markAllAsTouched();
    }
  }
}
