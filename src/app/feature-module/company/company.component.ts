import { Component, OnInit,HostListener, NgZone } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/core/core.index';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',  
  styleUrls: ['./company.component.scss']
})


export class CompanyComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
  
  }
}

