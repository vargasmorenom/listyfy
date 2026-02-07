import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TendenciesPage } from './tendencies.page';

describe('TendenciesPage', () => {
  let component: TendenciesPage;
  let fixture: ComponentFixture<TendenciesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TendenciesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
