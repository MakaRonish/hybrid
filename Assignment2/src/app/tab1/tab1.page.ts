import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonButton, IonList, IonListHeader, IonInput } from '@ionic/angular/standalone';

import { TaskService } from '../task.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tab1',
  standalone: true,
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonListHeader, IonList, IonButton, IonLabel, IonItem, IonHeader, IonToolbar, IonTitle, IonContent, FormsModule, CommonModule, IonInput],
})
export class Tab1Page {
  name = '';
  members: any[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.members$.subscribe(m => this.members = m);
  }

  signIn() {
    if (this.name.trim()) {
      this.taskService.addMember({ name: this.name, time: new Date() });
      this.name = '';
    }
  }
}
