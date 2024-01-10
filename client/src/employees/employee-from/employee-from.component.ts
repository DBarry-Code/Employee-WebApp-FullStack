import { JsonPipe } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmployeesService } from '../../service/employees.service';
import { Subscription } from 'rxjs';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-from',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, JsonPipe],
  templateUrl: './employee-from.component.html',
  styleUrl: './employee-from.component.css',
})
export class EmployeeFromComponent implements OnInit, OnDestroy {
  form!: FormGroup;

  employeefromSubscription!: Subscription;
  paramsSubscription!: Subscription;
  employeeService = inject(EmployeesService);

  isEdit = false;
  id = 0;

  constructor(
    private fb: FormBuilder,
    private activedRouter: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnDestroy(): void {
    if (this.employeefromSubscription) {
      this.employeefromSubscription.unsubscribe();
    }

    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }

  onSubmit() {
    if (!this.isEdit) {
      this.employeefromSubscription = this.employeeService
        .addEmployee(this.form.value)
        .subscribe({
          next: (response) => {
            this.toastr.success('Employee successfully added');
            this.router.navigateByUrl('/employees');
          },
          error: (err) => {
            this.toastr.error('Unable to add');
          },
        });
    } else {
      this.employeeService.editEmployee(this.id, this.form.value).subscribe({
        next: (response) => {
          this.toastr.success('Employee updated');
          this.router.navigateByUrl('/employees');
        },
        error: (err) => {
          this.toastr.error('Unable to edit');
        },
      });
    }
  }

  ngOnInit(): void {
    this.paramsSubscription = this.activedRouter.params.subscribe({
      next: (response) => {
        let id = response['id'];
        this.id = id;
        if (!id) return;

        this.employeeService.getEmployee(id).subscribe({
          next: (response) => {
            this.form.patchValue(response);
            this.isEdit = true;
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.form = this.fb.group({
      name: ['', Validators.required],
      address: [],
      phoneNumber: [],
      email: ['', Validators.email],
    });
  }
}
