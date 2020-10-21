import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss']
})
export class ImagePreviewComponent implements OnInit {

  @Input() imageUrl:string;

  safeImageUrl:SafeUrl

  constructor(private sanitazer:DomSanitizer) { }

  ngOnInit(): void {
    this.safeImageUrl = this.sanitazer.bypassSecurityTrustResourceUrl(this.imageUrl);
  }

}
