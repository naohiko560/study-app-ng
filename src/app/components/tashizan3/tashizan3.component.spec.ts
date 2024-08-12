import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tashizan3Component } from './tashizan3.component';

describe('Tashizan3Component', () => {
  let component: Tashizan3Component;
  let fixture: ComponentFixture<Tashizan3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tashizan3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tashizan3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
