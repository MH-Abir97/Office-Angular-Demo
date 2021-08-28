import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject, Subscription } from 'rxjs';

const HeraderOption={
  headers:new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root',
})

export class ItemServiceService {

  private messageSource = new Subject<any>();
  currentMessage = this.messageSource.asObservable();

  changeMessage(message: any) {
    debugger;
    this.messageSource.next(message);
  }


  private salesOrderItemSource=new Subject<any>();
  CurrentsalesOrderItem=this.salesOrderItemSource.asObservable();

  changeSalesOrder(obj:any){
    debugger;
    this.salesOrderItemSource.next(obj);
  }


  private dataListSubject=new Subject<any>();

  //baseUrl=`http://localhost:3398/Exp/Post/`;
  baseUrl:string=`http://localhost:3398/Exp/Post/`;
  baseUrlGet="http://localhost:3398/Exp/GetAllInvoice/";

  constructor(private httpClient: HttpClient) {}
  private modifiedTableDataChange = new Subject<any>();
  public modifiedTableData = [];

 



  SendDataSource(){
    this.dataListSubject.next();
  }

  getDataSourceEvent():Observable<any>{
    return this.dataListSubject.asObservable();
  }


  changeModifiedTableData(modifiedTableData) {
    debugger;
    this.modifiedTableData=modifiedTableData;
    this.modifiedTableDataChange.next(this.modifiedTableData.slice());
    //this.getOrderListData(this.modifiedTableData)
    //this.orderList=this.modifiedTableData;
  }




  getModifiedTableData() {
    debugger;
    return this.modifiedTableData.slice()}
  save(exportInvoice:any,packingInfo:any,dataList:any,termsAndConditions:any){
    var invoiceDetailList=[
      {
        "InvoiceId":102,
        "SalesOrderId":2001,
        "ItemId":273,
        "OrderUnitId":1,
        "Quantity":1,
        "UnitPrice":100,
        "DescriptionOne":"",
        "DescriptionTwo":"",
        "Amount":100,
        "UnitId":1,
        "PackageId":1,
        "UnitPerPackage":1,
        "ContainerId":1,
        "PackagePerContainer":"",
        "PackageWeight":10,
        "ContainerWeight":100,
        "ContainerSize":""
    }
    ]
    debugger;
     exportInvoice.exp_PackingInfo=packingInfo;
     exportInvoice.termsAndConditions=termsAndConditions;
     exportInvoice.modifiedDataList=dataList;
     exportInvoice.invoiceDetailList=invoiceDetailList;
    //  var A=JSON.stringify(exportInvoice)
    //  var B=JSON.stringify(packingInfo)
    //  var C=JSON.stringify(dataList)
     var D=JSON.stringify(exportInvoice)

      this.httpClient
      .post<any>(`http://localhost:3398/Exp/SavePostMethod/`,D,HeraderOption)
      .subscribe((resData) => {
        
      });
  }

  getCompany():Observable<any>{
    return this.httpClient.get<any>(`http://localhost:3398/Exp/GetCompanyDynamic/`);
  }

  GetExporter():Observable<any>{
    return this.httpClient.get<any>(`http://localhost:3398/Exp/GetAllExporter/`);
  }

  getAllBank(){
    return this.httpClient.get<any>(`http://localhost:3398/Exp/GetBankAccountByTypeAndRefId/`);
  }
  getAllItem(){
    return this.httpClient.get<any>(`http://localhost:3398/Exp/GetAllItem/`);
  }

  getAllPOList(companyId:number){
    return this.httpClient.get<any>(`http://localhost:3398/Exp/GetSalesOrderCompanyForPi/`+`${companyId}`);
  }

  getAllItemInfo(SalesOrderId:number):Observable<any>{
    debugger;
    return this.httpClient.get<any>(`http://localhost:3398/Exp/InvoiceDetailGetBySalesOrderId/`+`${SalesOrderId}`);
  }


  expGetaPaged(prams:string):Observable<any>{
    debugger;
    console.log("prams", prams)
    return this.httpClient.get<any>(`http://localhost:3398/Exp/GetInvoicePaged?`+`${prams}`);
  }

  itemEntry(itemData: any) {
    debugger;
    // for(var i=0;itemData.length;i++){
    //   const formData = new FormData();

    //   for (const propertyKey of Object.keys(itemData[i])) {
    //     formData.append(propertyKey, itemData[i][propertyKey]);

    //   }

    //   this.httpClient.post<any>(`http://localhost:3000/itementry`, formData)
    //   .subscribe(resData => {
    //      alert("saved")
    //   })

    // }
    const formData = new FormData();

    for (const propertyKey of Object.keys(itemData)) {
      formData.append(propertyKey, itemData[propertyKey]);
    }

   
    this.httpClient
      .post<any>(`http://localhost:3000/itementry`, formData)
      .subscribe((resData) => {
       
      });
  }
}
