import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss']
})
export class ImagePreviewComponent implements OnInit {

  @Input() imageUrl:string;

  @Output() closeImagePreview = new EventEmitter<void>();

  safeImageUrl:SafeUrl

  constructor(private sanitazer:DomSanitizer) { }

  ngOnInit(): void {
    this.safeImageUrl = this.sanitazer.bypassSecurityTrustResourceUrl(this.imageUrl);
  }

  back(){
    this.closeImagePreview.emit();
  }

}
