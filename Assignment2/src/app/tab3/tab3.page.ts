import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonImg, IonLabel, IonItem
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { CommonModule } from '@angular/common';
import { Device } from '@capacitor/device';
import { Toast } from '@capacitor/toast';





@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonButton, IonImg, IonLabel, IonItem, CommonModule],
})
export class Tab3Page {
  image: string | null = null;
  deviceInfo: any = null;

  async takePhoto() {
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt,
        quality: 90
      });
      this.image = photo.dataUrl!;
    } catch (err) {
      console.log('Camera cancelled or failed', err);
    }
  }

  async showToast() {
    await Toast.show({
      text: 'This is a toast message from Tab 3!',
      duration: 'short'
    });
  }

  async getDeviceInfo() {
    this.deviceInfo = await Device.getInfo();
  }
}
