import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
  },
  {
    path: 'add-contact',
    loadComponent: () => import('./add-contact/add-contact.page').then(m => m.AddContactPage),
  },
  {
    path: 'list-contacts',
    loadComponent: () => import('./list-contacts/list-contacts.page').then(m => m.ListContactsPage),
  },
];

