import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeesService } from '../service/employees.service';
import { Employee } from '../Types/employees';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [AsyncPipe, CommonModule, RouterLink],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
})
export class EmployeesComponent implements OnInit {
  employees$!: Observable<Employee[]>;

  constructor(private toastr: ToastrService) {}

  employeeService = inject(EmployeesService);

  ngOnInit(): void {
    this.getEmployess();
  }

  delete(id: number) {
    this.employeeService.deleteEmployee(id).subscribe({
      next: (reponse) => {
        this.toastr.success('Employee Deleted');
        this.getEmployess();
      },
    });
  }

  private getEmployess(): void {
    this.employees$ = this.employeeService.getEmployees();
  }
}
