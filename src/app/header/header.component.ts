import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  registerForm: FormGroup;

  constructor(private authService: AuthService) {
    // authService: AuthService = inject(AuthService);

    this.registerForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })
  }

  onSubmit(value: any) {
    console.log(this.registerForm.value);
    this.authService.register(this.registerForm.value)
      .then((response: any) => {
        alert("REGISTER OK");
      })
      .catch((error: any) => alert(error))
  }
}
