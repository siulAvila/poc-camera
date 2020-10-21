import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PrintScreenComponent } from './print-screen/print-screen.component';
import { ImagePreviewComponent } from './image-preview/image-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    PrintScreenComponent,
    ImagePreviewComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
