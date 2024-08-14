import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TashizanDojo2Component } from './tashizan-dojo2.component';

describe('TashizanDojo2Component', () => {
  let component: TashizanDojo2Component;
  let fixture: ComponentFixture<TashizanDojo2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TashizanDojo2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TashizanDojo2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
