import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-print-screen',
  templateUrl: './print-screen.component.html',
  styleUrls: ['./print-screen.component.scss']
})
export class PrintScreenComponent implements OnInit {
  @ViewChild('video', { static: true }) videoElement: ElementRef;
  @ViewChild('canvas', { static: true }) canvas: ElementRef;

  videoWidth = 0;
videoHeight = 0;

camera: 'user' | 'environment' =  'environment';

constraints = {
  video: {
      facingMode: this.camera,
      width: { ideal: 1920 },
      height: { ideal: 1080 }
  }
};

urlImage:string;
showPreview = false;

  constructor(private renderer:Renderer2) { }

  ngOnInit(): void {
    this.startCamera()
  }

  startCamera() {
    if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) { 
 navigator.mediaDevices.getUserMedia(this.constraints).then(this.attachVideo.bind(this)).catch(this.handleError);
    } else {
        alert('Sorry, camera not available.');
    }
  }

    handleError(error) {
      console.log('Error: ', error);
  }

  attachVideo(stream) {
    this.renderer.setProperty(this.videoElement.nativeElement, 'srcObject', stream);
    this.renderer.listen(this.videoElement.nativeElement, 'play', (event) => {
        this.videoHeight = this.videoElement.nativeElement.videoHeight;
        this.videoWidth = this.videoElement.nativeElement.videoWidth;
    });
}

  capture() {
    this.renderer.setProperty(this.canvas.nativeElement, 'width', this.videoWidth);
    this.renderer.setProperty(this.canvas.nativeElement, 'height', this.videoHeight);
    this.canvas.nativeElement.getContext('2d').drawImage(this.videoElement.nativeElement, 0, 0);
    this.urlImage = this.canvas.nativeElement.toDataURL("image/jpeg");
    this.showPreview= true;
}

changeCamera(){
  this.camera = this.camera === 'environment' ? 'user' : 'environment';
  this.startCamera();
}

}
