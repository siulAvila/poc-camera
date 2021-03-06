import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-print-screen',
  templateUrl: './print-screen.component.html',
  styleUrls: ['./print-screen.component.scss']
})
export class PrintScreenComponent implements OnInit {
  @ViewChild('video', { static: true }) videoElement: ElementRef;
  @ViewChild('canvas', { static: true }) canvas: ElementRef;

  videoWidth = document.documentElement.clientWidth;
videoHeight = document.documentElement.clientHeight;

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
    this.renderer.setProperty(this.canvas.nativeElement, 'width', this.videoHeight);
    this.renderer.setProperty(this.canvas.nativeElement, 'height', this.videoWidth);
    this.canvas.nativeElement.getContext('2d').drawImage(this.videoElement.nativeElement, 0, 0);
    this.urlImage = this.canvas.nativeElement.toDataURL("image/jpeg");
    this.showPreview= true;
}

changeCamera(){
  this.constraints.video.facingMode = this.constraints.video.facingMode === 'environment' ? 'user' : 'environment';
  console.log(this.camera);
  
  this.stopCamera();
  this.startCamera();
}

stopCamera(){
  console.log(this.videoElement.nativeElement.srcObject);
  
  this.videoElement.nativeElement.srcObject.getVideoTracks().forEach(track => {
    track.stop()
  });
}

}
