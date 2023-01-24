import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { combineLatest, map } from 'rxjs';
import { HomeStore } from './data-access/home.store';
import { MessageListComponentModule } from './ui/message-list.component';
import { MessageInputComponentModule } from './ui/message-input.component';
import { MessageService } from '../shared/data-access/message.service';

@Component({
  selector: 'app-home',
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ion-header class="ion-no-border">
        <ion-toolbar color="primary">
          <ion-title>
            <img src="assets/images/logo.png" />
          </ion-title>
          <ion-buttons slot="start">
            <ion-button (click)="store.logout()">
              <ion-icon name="log-out-outline" slot="icon-only"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <app-message-list [messages]="vm.messages"></app-message-list>
      </ion-content>
      <ion-footer>
        <app-message-input
          (send)="messageService.addMessage($event)"
        ></app-message-input>
      </ion-footer>
    </ng-container>
  `,
  styles: [
    `
      ion-content {
        --ion-background-color: var(--ion-color-primary);
      }

      ion-title img {
        max-height: 39px;
        margin-top: 9px;
        filter: drop-shadow(2px 4px 6px var(--ion-color-primary-shade));
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HomeStore],
})
export class HomeComponent implements OnInit {
  vm$ = combineLatest([this.store.messages$]).pipe(
    map(([messages]) => ({ messages }))
  );

  constructor(public store: HomeStore, public messageService: MessageService) {}

  ngOnInit() {
    this.store.loadMessages();
  }
}
@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
    ]),
    MessageListComponentModule,
    MessageInputComponentModule,
  ],
})
export class HomeComponentModule {}
