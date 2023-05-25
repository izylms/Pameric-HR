import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponentPage } from './company/company.component';
import { CompanyRoutingModule } from './company-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CompanyComponent } from './company.component';
import { CompanyModalComponent } from './company-modal/company-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    CompanyComponent,
    CompanyComponentPage,
    CompanyModalComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CompanyModule { }
