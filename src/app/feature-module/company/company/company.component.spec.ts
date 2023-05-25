import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyComponentPage } from './company.component';

describe('CompanyComponentPage', () => {
  let component: CompanyComponentPage;
  let fixture: ComponentFixture<CompanyComponentPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyComponentPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyComponentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
