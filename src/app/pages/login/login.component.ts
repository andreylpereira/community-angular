import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Login from 'src/app/models/login.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private loginService: LoginService) {
  }


  ngOnInit(): void {
  }


  public loginForm: FormGroup = this.formBuilder.group({
    login: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  login() {
    let user: Login = {
      login: this.loginForm.get('login')?.value,
      password: this.loginForm.get('password')?.value,
    };
    this.loginService.login(user);
    this.loginForm.reset();
  }
}
