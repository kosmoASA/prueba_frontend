import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: FormGroup;
  loading = false;



  constructor(private fb: FormBuilder,
              private router: Router)
  {
    this.form = this.fb.group({
      EMAIL: ['', [Validators.required, Validators.email]] ,
      PASSWORD: ['', [Validators.required, Validators.minLength(8)]],
      PASSWORD_REPEAT: ['', [Validators.required, Validators.minLength(8)]],

    })
  }




  //* Metodos

  login() {
  
  }



}
