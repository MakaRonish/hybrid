import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-contacts',
  templateUrl: './list-contacts.page.html',
  styleUrls: ['./list-contacts.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule, RouterModule],
})
export class ListContactsPage implements OnInit {
  contacts: any[] = [];
  editingIndex: number | null = null;
  updatedContact: any = { name: '', phone: '', address: '', email: '', role: 'Member' };

  constructor(private alertCtrl: AlertController, private http: HttpClient) { }

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts() {
    const stored = localStorage.getItem('contacts');
    this.contacts = stored ? JSON.parse(stored) : [];
  }

  async deleteContact(index: number) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm',
      message: 'Are you sure you want to delete this contact?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: () => {
            const deleted = this.contacts.splice(index, 1)[0];
            localStorage.setItem('contacts', JSON.stringify(this.contacts));
            this.http.post('http://localhost:3000/deleteContact', deleted).subscribe();
          }
        }
      ]
    });
    await alert.present();
  }

  startEdit(index: number) {
    this.editingIndex = index;
    this.updatedContact = { ...this.contacts[index] };
  }

  saveUpdate() {
    if (this.editingIndex !== null) {
      this.contacts[this.editingIndex] = { ...this.updatedContact };
      localStorage.setItem('contacts', JSON.stringify(this.contacts));

      this.http.post('http://localhost:3000/updateContact', this.updatedContact)
        .subscribe(res => console.log('Updated on server:', res));

      this.editingIndex = null;
    }
  }

  cancelEdit() {
    this.editingIndex = null;
  }
}
