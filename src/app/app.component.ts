import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { QrScannerComponent } from 'angular2-qrscanner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  scanResult;
  @ViewChild(QrScannerComponent, { static: false })
  qrScannerComponent: QrScannerComponent;

  get canvasWidth(): number {
    return window.outerHeight;
  }

  get canvasHeight(): number {
    return window.outerHeight;
  }

  constructor() {}

  ngOnInit() {
    console.log('🚀 canvasWidth', this.canvasWidth);
    console.log('🚀 canvasHeight', this.canvasHeight);
  }

  ngAfterViewInit(): void {
    this.qrScannerComponent.getMediaDevices().then((devices) => {
      const videoDevices: MediaDeviceInfo[] = [];
      for (const device of devices) {
        if (device.kind.toString() === 'videoinput') {
          videoDevices.push(device);
        }
      }
      if (videoDevices.length > 0) {
        console.log('🚀 videoDevices', videoDevices);
        let choosenDev;
        for (const dev of videoDevices) {
          if (dev.label.includes('back')) {
            choosenDev = dev;
            break;
          }
        }
        console.log('🚀 choosenDev', choosenDev);
        if (choosenDev) {
          this.qrScannerComponent.chooseCamera.next(choosenDev);
        } else {
          this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
        }
      }
    });

    this.qrScannerComponent.capturedQr.subscribe((dataQR) => {
      console.log(dataQR);
      this.scanResult = dataQR;
      //window.location.href=dataQR
    });
  }
}
