import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportsalariesComponent } from './importsalaries.component';

describe('ImportsalariesComponent', () => {
  let component: ImportsalariesComponent;
  let fixture: ComponentFixture<ImportsalariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportsalariesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportsalariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
