import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hikizan1Component } from './hikizan1.component';

describe('Hikizan1Component', () => {
  let component: Hikizan1Component;
  let fixture: ComponentFixture<Hikizan1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hikizan1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hikizan1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
