import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hikizan3Component } from './hikizan3.component';

describe('Hikizan3Component', () => {
  let component: Hikizan3Component;
  let fixture: ComponentFixture<Hikizan3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hikizan3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hikizan3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
