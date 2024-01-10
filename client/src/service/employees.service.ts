import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../Types/employees';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  apiUrl = 'http://localhost:5093/api/Employees';
  constructor(private http: HttpClient) {}

  getEmployees = (): Observable<Employee[]> =>
    this.http.get<Employee[]>(this.apiUrl);

  addEmployee = (data: Employee) => this.http.post(this.apiUrl, data);

  getEmployee = (id: number): Observable<Employee> =>
    this.http.get<Employee>(this.apiUrl + '/' + id);

  deleteEmployee = (id: number) => this.http.delete(this.apiUrl + '/' + id);

  editEmployee = (id: number, data: Employee) =>
    this.http.put(this.apiUrl + '/' + id, data);
}
