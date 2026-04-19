import { Component } from '@angular/core';
import { AppInfo } from '../../shared/models/appInfo';

@Component({
  selector: 'travel-footer',
  standalone: true,
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  public footerConfig: AppInfo = {
    title: 'Travel App Inc.',
    year: new Date().getFullYear(), // Отримає 2026 автоматично
  };
}
