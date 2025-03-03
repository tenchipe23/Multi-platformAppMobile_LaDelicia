import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabBarPage } from './tab-bar.page';

describe('TabBarPage', () => {
  let component: TabBarPage;
  let fixture: ComponentFixture<TabBarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TabBarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
