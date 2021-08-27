import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from './Models/Student';


const HeraderOption={
  headers:new HttpHeaders({'Content-Type':'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  //baseUrl:string="";
  baseUrl:string=`http://localhost:3398/Item/SaveBtn/`;
  PiSave:string=`http://localhost:3398/Exp/SavePostMethodng/`;

  constructor(private http:HttpClient) { }

  // Save(student:any){

  //  //var listData=JSON.stringify({student})
  //   debugger;
  //   this.http
  //   .post<any>(`http://localhost:3398/Item/SaveBtn/`,student)
  //   .subscribe((resData) => {
  //     console.log(resData);
  //   });

  // }

  SaveMethod(student:any):Observable<any>{
    return this.http.post<any>(this.baseUrl,student,HeraderOption);
  }

  save(exportInvoice:any,packingInfo:any,dataList:any,termsAndConditions:any):Observable<any>{
    debugger;
    exportInvoice.exp_PackingInfo=packingInfo;
    exportInvoice.termsAndConditions=termsAndConditions;
    exportInvoice.dataList=dataList;
    return this.http.post<any>(this.PiSave,exportInvoice,HeraderOption);
  }

}
