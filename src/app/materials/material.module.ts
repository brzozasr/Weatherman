import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatTabsModule } from "@angular/material/tabs";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatTabsModule,
    BrowserAnimationsModule,
  ],
  exports: [
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatTabsModule,
    BrowserAnimationsModule
  ]
})
export class MaterialModule {
}
