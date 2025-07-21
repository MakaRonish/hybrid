import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

import { IonicModule, AlertController } from '@ionic/angular';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.page.html',
  styleUrls: ['./add-contact.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, HttpClientModule, RouterModule]
})
export class AddContactPage implements OnInit {



  ngOnInit() {
  }
  contact = {
    name: '',
    phone: '',
    address: '',
    email: '',
    role: 'Member'
  };

  constructor(private alertCtrl: AlertController, private http: HttpClient) { }

  async addContact() {
    const alert = await this.alertCtrl.create({
      header: 'Confirm',
      message: 'Do you want to add this contact?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Add',
          handler: () => {
            const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
            contacts.push(this.contact);
            localStorage.setItem('contacts', JSON.stringify(contacts));

            // Send to Express server
            this.http.post('http://localhost:3000/addContact', this.contact)
              .subscribe(response => console.log('Server Response:', response));

            // Clear form
            this.contact = { name: '', phone: '', address: '', email: '', role: 'Member' };
          }
        }
      ]
    });

    await alert.present();
  }

}
