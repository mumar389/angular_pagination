import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";

@Injectable({
    providedIn:"root"
})
export class EmployeeService{

    http=inject(HttpClient);

    getEmployeeData(pageNumber:any,pageSize:any){
        return this.http.get("http://localhost:8080/api/get-page",{
            params:{
                pageNumber:pageNumber,
                pageSize:pageSize
            }
        })
    }
}