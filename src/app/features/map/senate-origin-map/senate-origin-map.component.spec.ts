import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenateOriginMapComponent } from './senate-origin-map.component';

describe('SenateOriginMapComponent', () => {
  let component: SenateOriginMapComponent;
  let fixture: ComponentFixture<SenateOriginMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SenateOriginMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SenateOriginMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
