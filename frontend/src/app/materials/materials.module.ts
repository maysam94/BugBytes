import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {FileInputAccessorModule} from "file-input-accessor";
import {MatIconModule} from '@angular/material/icon';

const materials = [MatInputModule, MatButtonModule, MatFormFieldModule, BrowserAnimationsModule,BrowserModule,FileInputAccessorModule, MatIconModule];

@NgModule({
  imports: [materials],
  exports: [materials],
})
export class MaterialsModule {}
