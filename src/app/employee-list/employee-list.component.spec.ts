import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs/internal/observable/of';
import { HttpClientModule } from '@angular/common/http';

import { EmployeeListComponent } from './employee-list.component';
import { EmployeeService } from '../shared/service/employee.service';
import { EmployeeModel } from '../shared/model/employee.model';
import { By } from '@angular/platform-browser';

const mockEmployees :Array<EmployeeModel> = [
  {
    id:1,
    firstName: "vijetha",
    lastName: "l",
    gender: "female",
    dob: new Date(),
    department: "IT"
  },
  {
    id:2,
    firstName: "test",
    lastName: "e",
    gender: "female",
    dob: new Date(),
    department: "IT"
  },
  {
    id:3,
    firstName: "yae",
    lastName: "s",
    gender: "female",
    dob: new Date(),
    department: "IT"
  }
];

class EmployeeServiceMock {
  loadAllEmployees() {
    return of(mockEmployees);
  }
}


describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;
  let employeeService: EmployeeService;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ EmployeeListComponent ],
      providers: [
        {
          provide: EmployeeService,
          useClass: EmployeeServiceMock
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    employeeService = TestBed.inject(EmployeeService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be same length of response', () => {
    component.loadEmployees();
    spyOn(employeeService,'loadAllEmployees').and.returnValue(of(mockEmployees));
    fixture.detectChanges();
    expect(component.loader).toBeFalsy();
    expect(component.employees.length).toEqual(mockEmployees.length);
  });

  it('should load the data in table',()=>{
    component.loader = false;
    spyOn(employeeService,'loadAllEmployees').and.returnValue(of(mockEmployees));
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('tr')).length).toEqual(4);
  });

  it('should have 2 row and one header in first page',()=>{
    component.pageSize = 2;
    spyOn(employeeService,'loadAllEmployees').and.returnValue(of(mockEmployees));
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('tr')).length).toEqual(3);
  });

  it('should have one row and one header in second page',()=>{
    component.pageSize = 2;
    component.page = 2;
    spyOn(employeeService,'loadAllEmployees').and.returnValue(of(mockEmployees));
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('tr')).length).toEqual(2);
  });

  it('should sort by firstname',()=>{
    component.pageSize = 4;
    spyOn(employeeService,'loadAllEmployees').and.returnValue(of(mockEmployees));
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('tr >td'))[0].nativeElement.innerHTML).toBe('test ');
    expect(fixture.debugElement.queryAll(By.css('tr >td'))[4].nativeElement.innerHTML).toBe('vijetha ');
    expect(fixture.debugElement.queryAll(By.css('tr >td'))[8].nativeElement.innerHTML).toBe('yae ');
  });

  
});
