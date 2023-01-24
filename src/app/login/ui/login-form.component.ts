import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Credentials } from 'src/app/shared/interfaces/credentials';
import { LoginStatus } from '../data-access/login.store';

@Component({
  selector: 'app-login-form',
  template: `
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
      <ion-item lines="none">
        <ion-icon color="light" slot="start" name="mail-outline"></ion-icon>
        <ion-input
          formControlName="email"
          type="email"
          placeholder="email"
        ></ion-input>
      </ion-item>
      <ion-item lines="none">
        <ion-icon
          color="light"
          slot="start"
          name="lock-closed-outline"
        ></ion-icon>
        <ion-input
          formControlName="password"
          type="password"
          placeholder="password"
        ></ion-input>
      </ion-item>

      <ion-button type="submit" color="tertiary" expand="full">
        Login
      </ion-button>
    </form>
  `,
  styles: [
    `
      ion-badge {
        width: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  @Input() loginStatus!: LoginStatus;
  @Output() login = new EventEmitter<Credentials>();

  loginForm = this.fb.nonNullable.group({
    email: [''],
    password: [''],
  });

  constructor(private fb: FormBuilder) {}

  protected onSubmit() {
    this.login.emit(this.loginForm.getRawValue());
  }
}

@NgModule({
  declarations: [LoginFormComponent],
  exports: [LoginFormComponent],
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
})
export class LoginFormComponentModule {}
