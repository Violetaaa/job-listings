import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  registerForm: FormGroup;
  protected isLogin!: boolean;
  @ViewChild('loginDialog') dialog!: ElementRef<any>;

  constructor(private authService: AuthService) {
    this.isLogin = true;
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{6,}$/)])
    })
  }
  ngOnInit(): void {
    this.isLogin = true;
  }

  registerUser(value: any) {
    this.authService.register(this.registerForm.value)
      .then((response: any): void => {
        alert("REGISTER OK");
        console.log(response);
        this.dialog.nativeElement.close();
      })
      .catch((error: any) => alert(error))
  }

  loginUser(value: any) {
    this.authService.login(this.registerForm.value)
      .then((response: any): void => {
        alert("LOGIN OK");
        console.log(response);
        this.dialog.nativeElement.close();
      })
      .catch(error => alert(error))
  }

  closeForm(): void {
    this.dialog.nativeElement.close();
    this.registerForm.reset();
  }

  toggleForm(): void {
    this.isLogin = !this.isLogin;
    this.registerForm.reset();
  }

  get email() { return this.registerForm.get('email')!; }

  get password() { return this.registerForm.get('password')!; }

}
