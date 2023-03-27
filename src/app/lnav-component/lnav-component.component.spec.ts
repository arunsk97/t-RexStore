import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LnavComponentComponent } from './lnav-component.component';

describe('LnavComponentComponent', () => {
  let component: LnavComponentComponent;
  let fixture: ComponentFixture<LnavComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LnavComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LnavComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
