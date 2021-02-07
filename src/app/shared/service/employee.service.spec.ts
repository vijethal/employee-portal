import { EmployeeService } from './employee.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { EmployeeModel } from '../model/employee.model';

describe('Employee service', () => {
    let service: EmployeeService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [EmployeeService],
            imports: [HttpClientTestingModule]
        });

        service = TestBed.get(EmployeeService);
        httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('employee Service should be created', inject([EmployeeService], (service: EmployeeService) => {
        expect(service).toBeTruthy();
    }));

    it('loadAllEmployees should be get method', inject([EmployeeService], (service: EmployeeService) => {
        service.loadAllEmployees().subscribe();
        const req = httpMock.expectOne(`/api/employee`);
        expect(req.request.method).toBe('GET');
    }));

    it('registerEmployee should be post method', inject([EmployeeService], (service: EmployeeService) => {
        const payload: EmployeeModel =
        {
            id: 12,
            firstName: "vijetha",
            lastName: "l",
            gender: "female",
            dob: new Date(),
            department: "IT"
        };

        service.registerEmployee(payload).subscribe();
        const req = httpMock.expectOne(`/api/employee`);
        expect(req.request.method).toBe('POST');
    }));

});
