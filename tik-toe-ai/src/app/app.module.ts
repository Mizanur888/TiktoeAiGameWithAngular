import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TikToeAiComponent } from './Games/tik-toe-ai/tik-toe-ai.component';

@NgModule({
  declarations: [
    AppComponent,
    TikToeAiComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
