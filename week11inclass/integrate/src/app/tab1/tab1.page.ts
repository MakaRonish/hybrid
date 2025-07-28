import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ExpressMongoService } from
  '../express-mongo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonicModule, FormsModule, CommonModule],
})
export class Tab1Page {
  outMsg: any; cId: any; wDay: any; prof: any;
  outRec: any = [];
  constructor(private mongo: ExpressMongoService) { }
  insert() {
    const params = {
      cid: this.cId, wday: this.wDay,
      prof: this.prof
    };
    this.mongo.insert(params).subscribe({
      next: (data: any) => {
        console.log(data);
        this.outMsg = 'Record added.';
        this.outRec = [];
      },
      error: (e) => {
        console.error(e);
        this.outMsg = e.message;
      },
      complete: () => console.info('Complete')
    });
  }
  retrieve() {
    const params = { cid: this.cId };
    this.mongo.retrieve(params).subscribe({
      next: (data: any) => {
        console.log(data);
        this.outRec = data;
        this.outMsg = this.outRec.length + ' retrieved';
      },
      error: (e: any) => {
        console.error(e);
        this.outMsg = e.message;
      },
      complete: () => console.info('Complete')
    });
  }


}
