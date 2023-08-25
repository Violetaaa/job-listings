import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserCredential } from '@angular/fire/auth';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  registerForm: FormGroup;

  @ViewChild('dialogLogin') dialog!: ElementRef<any>;

  constructor(private authService: AuthService) {

    this.registerForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })
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

}
