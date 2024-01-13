import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignarTarefaComponent } from './designar-tarefa.component';

describe('DesignarTarefaComponent', () => {
  let component: DesignarTarefaComponent;
  let fixture: ComponentFixture<DesignarTarefaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesignarTarefaComponent]
    });
    fixture = TestBed.createComponent(DesignarTarefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
