import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../../login/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(public authService: LoginService) { }

  ngOnInit(): void {
  }
}
