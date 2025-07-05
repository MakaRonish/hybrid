import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-a',
  templateUrl: './a.component.html',
  styleUrls: ['./a.component.scss'],
  imports: [IonicModule, FormsModule],
})
export class AComponent implements OnInit {

  constructor(private serv: DataService) { }
  newMessage() { this.serv.setMessage(this.myMsg); }

  ngOnInit() { }
  myMsg!: any;
}
