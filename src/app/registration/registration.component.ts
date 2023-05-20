import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { AuthService } from '../auth.service'
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(
    private authService: AuthService,
    private location: Location,
    private formBuilder: FormBuilder,
    private router: Router 
  ) { };

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.formGroup = new FormGroup({
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      confirm: new FormControl("", [Validators.required]),
    }, { validators: this.passwordMatchValidator });
  }

  registProces() {
    if (this.formGroup.valid && !this.formGroup.hasError('passwordMismatch')) {
      //console.log("in condition data are : { ", this.formGroup.value, " }");
      //const {confirm, ...data} = this.formGroup.value;
      this.authService.regist(this.formGroup.value).subscribe({
        next: (response) => {
          if (response.status == 200) {
            this.router.navigate(['/login']); 
            alert("Register Successful ");
          } else {
            alert("Register Fail, Please try again");
          }
        },
        error: (error) => {
          console.error('registration error: ', error);
        }
      });
    } else {
      alert("Please fill in all required fields and ensure the passwords match.");
    }
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirm = control.get('confirm');

    if (password && confirm && password.value !== confirm.value) {
      return { passwordMismatch: true };
    }

    return null;
  }
}
