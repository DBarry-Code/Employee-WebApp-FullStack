import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../Types/employees';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  constructor(private http: HttpClient) {}

  getEmploees = (): Observable<Employee[]> =>
    this.http.get<Employee[]>('http://localhost:5093/api/Employees');
}
