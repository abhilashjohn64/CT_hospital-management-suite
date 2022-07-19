import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomMatIconComponent } from './custom-mat-icon.component';

describe('CustomMatIconComponent', () => {
  let component: CustomMatIconComponent;
  let fixture: ComponentFixture<CustomMatIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomMatIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomMatIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
