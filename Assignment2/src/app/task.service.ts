import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }
  private members = new BehaviorSubject<any[]>([]);
  private tasks = new BehaviorSubject<any[]>([]);

  members$ = this.members.asObservable();
  tasks$ = this.tasks.asObservable();

  addMember(member: any) {
    const updated = [...this.members.value, member];
    this.members.next(updated);
  }

  assignTask(task: any) {
    const updated = [...this.tasks.value, task];
    this.tasks.next(updated);
  }
}
