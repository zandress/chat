import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  NgModule,
  Output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Credentials } from 'src/app/shared/interfaces/credentials';

@Component({
  selector: 'app-create-form',
  template: `
    <form [formGroup]="createForm" (ngSubmit)="onSubmit()" #form="ngForm">
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
      <ion-item lines="none">
        <ion-icon
          color="light"
          slot="start"
          name="lock-closed-outline"
        ></ion-icon>
        <ion-input
          formControlName="confirmPassword"
          type="password"
          placeholder="confirm password"
        ></ion-input>
      </ion-item>
      <ion-button type="submit" expand="full"> Submit </ion-button>
    </form>
  `,
  styles: [
    `
      :host {
        height: 100%;
      }

      form {
        text-align: right;
      }

      ion-note {
        margin: 0 1rem 1rem 1rem;
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateFormComponent {
  @Output() create = new EventEmitter<Credentials>();

  createForm = this.fb.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(8), Validators.required]],
    confirmPassword: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    if (this.createForm.valid) {
      const { confirmPassword, ...credentials } = this.createForm.getRawValue();
      this.create.emit(credentials);
    }
  }
}

@NgModule({
  declarations: [CreateFormComponent],
  exports: [CreateFormComponent],
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
})
export class CreateFormComponentModule {}
