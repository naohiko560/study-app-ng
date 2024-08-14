import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HikizanDojo2Component } from './hikizan-dojo2.component';

describe('HikizanDojo2Component', () => {
  let component: HikizanDojo2Component;
  let fixture: ComponentFixture<HikizanDojo2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HikizanDojo2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HikizanDojo2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
