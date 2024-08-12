import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tashizan2Component } from './tashizan2.component';

describe('Tashizan2Component', () => {
  let component: Tashizan2Component;
  let fixture: ComponentFixture<Tashizan2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tashizan2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tashizan2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
