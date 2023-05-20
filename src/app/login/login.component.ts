import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service'
import { Router } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formGroup!: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.formGroup = new FormGroup({
      Username: new FormControl("", [Validators.required]),
      Password: new FormControl("", [Validators.required])
    })
  }
  loginProces() {
    console.log("in login Process !! ");
    if (this.formGroup.valid) {
      this.authService.login(this.formGroup.value).subscribe({
        next: (response: any) => {
          if (response.token) {
            this.authService.storeToken(response.token);
            alert("Login Successful");
            this.router.navigate(['/home']);
          } else {
            alert("Please Check Username and Password!");
          }
        },
        error: (error: any) => {
          console.error("An error occurred during login:", error);
          alert("An error occurred during login. Please try again later.");
        }
      });
    }
  }
}
