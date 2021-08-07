import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ItemFilterComponent } from './components/item-filter/item-filter.component';
import { ItemSorterComponent } from './components/item-sorter/item-sorter.component';
import { PatientItemComponent } from './components/patient-item/patient-item.component';
import { PatientsContainerComponent } from './components/patients-container/patients-container.component';
import { PatientsViewControllerComponent } from './components/patients-view-controller/patients-view-controller.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReplyTimePipe } from './pipes/reply-time-pipe';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    PatientsContainerComponent,
    PatientItemComponent,
    PatientsViewControllerComponent,
    ItemFilterComponent,
    ItemSorterComponent,
    ReplyTimePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSelectModule,
    MatSliderModule,
    FormsModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }