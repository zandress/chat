import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  Firestore,
  limit,
  orderBy,
  query,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from '../interfaces/message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private firestore: Firestore) {}

  getMessages() {
    const messagesCollection = query(
      // Return 50 documents ordered by their CREATED date in descending order
      collection(this.firestore, 'messages'),
      orderBy('created', 'desc'),
      limit(50)
    );
    // Then supply it to the collectionData method
    // Using idField to return a unique id
    // We use map to display the messages in reverse order so latests are at the bottom of screen
    return collectionData(messagesCollection, { idField: 'id' }).pipe(
      map((messages) => [...messages].reverse())
    ) as Observable<Message[]>;
  }
}
