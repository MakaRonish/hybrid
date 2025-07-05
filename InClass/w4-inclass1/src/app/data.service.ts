import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  message = new BehaviorSubject<any>('');
  asObserver = this.message.asObservable();
  setMessage(msg: any) {
    this.message.next(msg);
  }

}
