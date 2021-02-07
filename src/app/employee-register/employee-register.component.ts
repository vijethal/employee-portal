import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../shared/service/employee.service';

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.css']
})
export class EmployeeRegisterComponent implements OnInit {
  @ViewChild(NgForm) employeeForm: NgForm;
  employee: any = {};
  loader = false;
  department = [
    { name: "Legal" },
    { name: "E-commerce" },
    { name: "IT" },
    { name: "Medical" }
  ];
  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.loader = true;
    this.employeeService.registerEmployee(this.employee).subscribe(
      (response) => {
        this.router.navigate(['/employee-list']);
        this.loader = false;
      },
      error => {
        console.log('error')
        console.error('error in fetching data : ', error);
      }
    )

  }

}
