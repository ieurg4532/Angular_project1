import { Component } from '@angular/core';
import { AppInfo } from '../../shared/models/appInfo';

@Component({
  selector: 'travel-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  public headerConfig: AppInfo = {
    title: 'Мій щоденник подорожей',
    year: 2026,
  };
}
