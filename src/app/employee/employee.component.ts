import { Component, OnInit, inject } from '@angular/core';
import { EmployeeService } from '../Services/employee.service';
import { Employee } from '../Services/Employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employeeService=inject(EmployeeService);

  empData:Employee[]=[];
  pageSize=5;
  pageNumber=0;
  totalNumberOfPages=0;
  pageIndexes:any[]=[];

  ngOnInit(): void {
   this.getPagedData();
  }

  getPagedData(){
    this.employeeService.getEmployeeData(this.pageNumber,this.pageSize).subscribe({
      next:(resp:any)=>{
        console.log("Backend",resp);
        
        this.empData=resp.content;
        this.totalNumberOfPages=resp.totalPages;
        this.pageIndexes=[];
        for(let index=0;index<resp.totalPages;index++){
          this.pageIndexes.push(index);
        }
        
      },
      error:(err:any)=>{
        console.log("Error while interacting with backend--",err);
        
      }
    })
  }
  nextPage(){
    if(this.pageNumber+1<this.totalNumberOfPages){
      this.pageNumber++;
      this.getPagedData();
    }
  }
  previousPage(){
    if(this.pageNumber>0){
      this.pageNumber--;
      this.getPagedData();
    }
  }
  selectPage(pageNo:any){
    this.pageNumber=pageNo;
    this.getPagedData();
  }



}
