import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityScapeComponent } from './city-scape.component';

describe('CityScapeComponent', () => {
  let component: CityScapeComponent;
  let fixture: ComponentFixture<CityScapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityScapeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityScapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
