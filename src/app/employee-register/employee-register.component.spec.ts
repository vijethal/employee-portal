import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { EmployeeRegisterComponent } from './employee-register.component';
import { EmployeeService } from '../shared/service/employee.service';
import { EmployeeModel } from '../shared/model/employee.model';



const mockEmployee :EmployeeModel = 
  {
    id: 12,
    firstName: "vijetha",
    lastName: "l",
    gender: "female",
    dob: new Date(),
    department: "IT"
  };


class EmployeeServiceMock {
  registerEmployee(){
    return of(mockEmployee);
  }
}

describe('EmployeeRegisterComponent', () => {
  let component: EmployeeRegisterComponent;
  let fixture: ComponentFixture<EmployeeRegisterComponent>;
  let employeeService: EmployeeService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule, FormsModule],
      declarations: [ EmployeeRegisterComponent ],
      providers: [{ provide: EmployeeService, useClass: EmployeeServiceMock}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeRegisterComponent);
    component = fixture.componentInstance;
    employeeService = TestBed.inject(EmployeeService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
   var form =  component.employeeForm.form;
console.log(form.status);
    expect(component).toBeTruthy();
  });



  it('should disbale the submit button if fields are empty', () => {
    component.loader = true;
    component.employee =  {
      firstName: "",
      lastName: "",
      gender: "",
      dob: new Date(),
      department: "IT"
    };
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('#btn-submit').disabled).toBeTruthy();
   });

   it('should enable the submit with proper inputs',() => {
    component.loader = false;
    component.employee = mockEmployee;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('#btn-submit').disabled).toBeFalsy();
 
  });

  it('should onSubmit method on clik of register',() => {
    spyOn(component,'onSubmit');
    fixture.detectChanges();
    fixture.debugElement.nativeElement.querySelector('#btn-submit').click()
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should not navigate when service throws an error', () => {
    component.onSubmit();
    spyOn(employeeService,'registerEmployee').and.returnValue(throwError(""));
    const spy = spyOn(router, 'navigateByUrl');
    fixture.detectChanges();
    expect(spy).not.toHaveBeenCalled();
  });
   
  it('should navigate wen service returns success', () => {
    component.onSubmit();
    spyOn(employeeService,'registerEmployee').and.returnValue(of({ success: true }));
   // const spy = spyOn(router, 'navigateByUrl');
    fixture.detectChanges();
    expect(component.loader).toBeFalsy();
    //expect(spy).toHaveBeenCalled();
  });

});
