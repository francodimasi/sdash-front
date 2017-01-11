import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DataComponent } from './data/data.component';
import { BubbleComponent } from './bubble/bubble.component';
import { BarComponent } from './bar/bar.component';
import { TrendComponent } from './trend/trend.component';

@NgModule({
  declarations: [
    AppComponent,
    DataComponent,
    BubbleComponent,
    BarComponent,
    TrendComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
