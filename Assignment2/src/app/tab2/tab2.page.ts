import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonItem,
  IonLabel, IonSelect, IonSelectOption, IonRadio,
  IonRadioGroup, IonList, IonListHeader, IonButton
} from '@ionic/angular/standalone';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, CommonModule, FormsModule, IonItem, IonLabel, IonSelect, IonSelectOption, IonRadio, IonRadioGroup, IonList, IonListHeader, IonButton],
  standalone: true,
})
export class Tab2Page {

  members: any[] = [];
  tasks: any[] = [];
  selectedMember = '';
  selectedTask = '';
  taskList = ['Design UI', 'Write Code', 'Test Features', 'Update Docs'];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.members$.subscribe(m => this.members = m);
    this.taskService.tasks$.subscribe(t => this.tasks = t);
  }

  assign() {
    if (this.selectedMember && this.selectedTask) {
      this.taskService.assignTask({
        member: this.selectedMember,
        task: this.selectedTask,
        time: new Date()
      });
      this.selectedTask = '';
    }
  }

}
