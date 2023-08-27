import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserCredential } from '@angular/fire/auth';



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
  protected errorMessage!: string;
  @ViewChild('loginDialog') dialog!: ElementRef<any>;
  protected userEmail!: string;
  protected user!: UserCredential;

  constructor(private authService: AuthService, private router: Router) {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })

    // this.userEmail = "test@test.com"
  }
  ngOnInit(): void {
    this.isLogin = true;
  }

  registerUser() {
    this.authService.register(this.registerForm.value)
      .then((response: UserCredential): void => {
        console.log(`REGISTER OK: ${response}`);


        this.dialog.nativeElement.close();


      })
      .catch((error: any) => {
        this.errorMessage = "Something went wrong..."
        this.registerForm.reset();
        console.log(error)
      })
  }

  loginUser() {
    this.authService.login(this.registerForm.value)
      .then((response: any): void => {
        console.log(`LOGIN OK: ${response}`);
        this.userEmail = response.user.email ?? '';

        // save on localStorage
        this.user = JSON.parse(JSON.stringify(response));
        localStorage.setItem('user', JSON.stringify(this.user))

        // redirect and close dialog
        this.router.navigate(['/jobs']);
        this.dialog.nativeElement.close();
      })
      .catch((error: any) => {
        this.errorMessage = "Something went wrong..."
        this.registerForm.reset();
        console.log(error)
      })
  }

  closeForm(): void {
    this.dialog.nativeElement.close();
    this.registerForm.reset();
    this.errorMessage = '';
  }

  toggleForm(): void {
    this.isLogin = !this.isLogin;
    this.registerForm.reset();
  }

  get email() { return this.registerForm.get('email')!; }

  get password() { return this.registerForm.get('password')!; }

}
