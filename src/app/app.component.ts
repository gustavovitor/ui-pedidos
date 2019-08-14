import { Component } from '@angular/core';
import { LogoutService } from './services/security/logout.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private logoutService: LogoutService,
              private title: Title) {
    this.title.setTitle('Desafio Manutenção Java');
  }
}
