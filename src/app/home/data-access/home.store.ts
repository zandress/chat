import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { switchMap } from 'rxjs/operators';
import { MessageService } from 'src/app/shared/data-access/message.service';
import { Message } from 'src/app/shared/interfaces/message';

export interface HomeState {
  messages: Message[];
}

@Injectable()
export class HomeStore extends ComponentStore<HomeState> {
  messages$ = this.select((state) => state.messages);

  loadMessages = this.effect(($) =>
    $.pipe(
      switchMap(() =>
        this.messageService.getMessages().pipe(
          tapResponse(
            (messages) => this.patchState({ messages }),
            (err) => console.log(err)
          )
        )
      )
    )
  );

  constructor(private messageService: MessageService) {
    super({ messages: [] });
  }
}
