import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HikizanDojoComponent } from './hikizan-dojo.component';

describe('HikizanDojoComponent', () => {
  let component: HikizanDojoComponent;
  let fixture: ComponentFixture<HikizanDojoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HikizanDojoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HikizanDojoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
