import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeesService } from '../service/employees.service';
import { Employee } from '../Types/employees';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
})
export class EmployeesComponent implements OnInit {
  employees!: Observable<Employee[]>;

  employeeService = inject(EmployeesService);

  ngOnInit(): void {
    this.employeeService.getEmploees().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
