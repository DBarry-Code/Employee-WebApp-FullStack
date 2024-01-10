import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeesService } from '../service/employees.service';
import { Employee } from '../Types/employees';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [AsyncPipe, CommonModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
})
export class EmployeesComponent implements OnInit {
  employees$!: Observable<Employee[]>;

  employeeService = inject(EmployeesService);

  ngOnInit(): void {
    this.employees$ = this.employeeService.getEmploees();
  }
}
