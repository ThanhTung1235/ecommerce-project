/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HightLightsComponent } from './hight-lights.component';

describe('HightLightsComponent', () => {
  let component: HightLightsComponent;
  let fixture: ComponentFixture<HightLightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HightLightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HightLightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
