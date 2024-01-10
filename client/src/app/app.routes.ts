import { Routes } from '@angular/router';
import { EmployeesComponent } from '../employees/employees.component';
import { Component } from '@angular/core';
import { EmployeeFromComponent } from '../employees/employee-from/employee-from.component';

export const routes: Routes = [
  {
    path: 'employees',
    component: EmployeesComponent,
  },
  { path: 'employees/:id', component: EmployeeFromComponent },
];
