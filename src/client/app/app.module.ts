import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF, HashLocationStrategy, Location, LocationStrategy } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AboutModule } from './about/about.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { FeaturesModule } from './features/index';

@NgModule({
  //imports: [BrowserModule, HttpModule, AppRoutingModule, AboutModule, HomeModule, SharedModule.forRoot()],
  imports: [BrowserModule, HttpModule, FeaturesModule, AppRoutingModule, SharedModule.forRoot()],
  declarations: [AppComponent],
  providers: [
   Location, {provide: LocationStrategy, useClass: HashLocationStrategy},
    {
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>',
  }],
  bootstrap: [AppComponent]

})
export class AppModule { }
