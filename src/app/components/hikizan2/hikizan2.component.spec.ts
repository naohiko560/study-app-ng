import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hikizan2Component } from './hikizan2.component';

describe('Hikizan2Component', () => {
  let component: Hikizan2Component;
  let fixture: ComponentFixture<Hikizan2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hikizan2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hikizan2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
