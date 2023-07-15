import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucessModalComponent } from './sucess-modal.component';

describe('SucessModalComponent', () => {
  let component: SucessModalComponent;
  let fixture: ComponentFixture<SucessModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SucessModalComponent]
    });
    fixture = TestBed.createComponent(SucessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
