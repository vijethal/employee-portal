import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/service/employee.service';
import { EmployeeModel } from '../shared/model/employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  page = 1;
  pageSize = 4;
  collectionSize:number;
  loader:boolean;
  employees: EmployeeModel[];
  compare = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

  constructor(private employeeService:EmployeeService) {
   
  }

  ngOnInit(): void {
    this.loadEmployees();
  }


  loadEmployees() {
    this.loader = true;
    this.employeeService.loadAllEmployees()
    .subscribe(
      (response: EmployeeModel[]) => {
      this.employees = JSON.parse(JSON.stringify(response))
      .sort((emp, b) => {
        return this.compare(emp['firstName'], b['firstName']);
      })
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
      this.collectionSize = response.length;
      this.loader = false;
    },
    (error) => {
      console.error("failed to retrieve data", error);
      this.loader = false;
    });
  }

 
}
