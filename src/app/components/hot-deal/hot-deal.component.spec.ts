/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HotDealComponent } from './hot-deal.component';

describe('HotDealComponent', () => {
  let component: HotDealComponent;
  let fixture: ComponentFixture<HotDealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotDealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
