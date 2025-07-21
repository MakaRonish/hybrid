import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListContactsPage } from './list-contacts.page';

describe('ListContactsPage', () => {
  let component: ListContactsPage;
  let fixture: ComponentFixture<ListContactsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListContactsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
