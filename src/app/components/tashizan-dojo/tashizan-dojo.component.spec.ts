import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TashizanDojoComponent } from './tashizan-dojo.component';

describe('TashizanDojoComponent', () => {
  let component: TashizanDojoComponent;
  let fixture: ComponentFixture<TashizanDojoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TashizanDojoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TashizanDojoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
