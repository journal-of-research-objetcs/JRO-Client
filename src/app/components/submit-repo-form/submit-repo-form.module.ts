import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmitRepoFormComponent } from './submit-repo-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { ChipsModule } from 'primeng/chips';

@NgModule({
  declarations: [SubmitRepoFormComponent],
  exports: [SubmitRepoFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    ChipsModule
  ]
})
export class SubmitRepoFormModule { }
