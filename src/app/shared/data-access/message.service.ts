import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
  limit,
  orderBy,
  query,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Message } from '../interfaces/message';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private firestore: Firestore, private authService: AuthService) {}

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

  addMessage(message: string) {
    this.authService.user$.pipe(take(1)).subscribe((user) => {
      if (user?.email) {
        const newMessage: Message = {
          author: user.email,
          content: message,
          created: Date.now().toString(),
        };
        // Create a reference to the collection
        const messagesCollection = collection(this.firestore, 'messages');
        // Add the new document to the messages collection
        addDoc(messagesCollection, newMessage);
      }
    });
  }
}
