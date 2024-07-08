import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tashizan1Component } from './tashizan1.component';

describe('Tashizan1Component', () => {
  let component: Tashizan1Component;
  let fixture: ComponentFixture<Tashizan1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tashizan1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tashizan1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
