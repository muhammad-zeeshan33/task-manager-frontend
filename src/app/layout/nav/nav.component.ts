import { Component, OnChanges, OnInit } from '@angular/core';
import { AuthService } from '../../services/authService/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {

  constructor(public _authService: AuthService) {}

  logout() {
    this._authService.logout();
  }
}
