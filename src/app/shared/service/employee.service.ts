import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeModel } from '../model/employee.model';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    constructor(private http: HttpClient) {

    }

    loadAllEmployees(): Observable<EmployeeModel[]> {
        return this.http.get<EmployeeModel[]>("/api/employee")
            .pipe(
                map(res => res["payload"]),
                shareReplay()
            );
    }

    registerEmployee(employee: EmployeeModel): Observable<any> {
        return this.http.post(`/api/employee`, employee)
            .pipe(
                shareReplay()
            );
    }

}

