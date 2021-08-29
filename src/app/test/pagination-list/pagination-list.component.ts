import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ItemServiceService } from 'src/app/services/item-service.service';

@Component({
  selector: 'app-pagination-list',
  templateUrl: './pagination-list.component.html',
  styleUrls: ['./pagination-list.component.css']
})
export class PaginationListComponent implements OnInit {
  getPagedList:any[]=[];
  getPaginatiedList:any[]=[];
  dataSource:any;
  displayedColumns: string[] = ['SL','InvoiceNo','CompanyName', 'InvoiceDate', 'SalesOrderNos','DocStatus'];
 
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
 }
  // length = 500;
  // pageSize = 10;
  // pageIndex = 0;
  // pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;

  filterValue='';
  applyFilter(event:Event){
    this.filterValue=(event.target as HTMLInputElement).value;
    console.log(this.filterValue);

    this.getNextData("10","0","10",this.filterValue,"0");
  }

  handlePageEvent(event: PageEvent) {
    var length = event.length;
    var pageSize = event.pageSize;
    var pageIndex = event.pageIndex;
    var previousIndex = event.previousPageIndex;
    var previousSize = pageSize * pageIndex;
    var rows = '0';
    var whereCluse=this.filterValue;
    console.log("whereCluse",whereCluse)
    this.getNextData(previousSize,(pageIndex).toString(), pageSize.toString(),whereCluse.toString(), rows);
  } 

  @ViewChild(MatPaginator) paginator: MatPaginator;

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }
  constructor(private _itemSs:ItemServiceService) { }

  ngOnInit(): void {
   
   // this.getNextData('10','0','10','0')
   
   
    if(this.filterValue !=""){
      this.GetPaged('0','100','', '0');
    }else{
      this.GetPaged('0','10','', '0');
    }
  }

  getNextData(currentSize, startRecordNo, rowPerPage,whereCluse, rows){
    var params = new HttpParams();
    params = params.set('startRecordNo', startRecordNo);
    params = params.set('rowPerPage', rowPerPage);
    params = params.set('whereCluse', whereCluse);
    params = params.set('rows', rows);
    this._itemSs.expGetaPaged(params.toString()).subscribe(data=>{
      data.ListData.length = currentSize;
      data.ListData.push(...data.ListData);
      data.ListData.length = data.TotalRecord;
     this.dataSource = new MatTableDataSource<any[]>(data.ListData);
    // this.paginator.firstPage();
     this.dataSource._updateChangeSubscription();
     this.dataSource.paginator = this.paginator;
    })
    
  }

  
  GetPaged(startRecordNo, rowPerPage,whereCluse, rows){
    var params = new HttpParams();
    //var wc=whereCluse.toString();
    params = params.set('startRecordNo', startRecordNo);
    params = params.set('rowPerPage', rowPerPage);
    params = params.set('whereCluse',whereCluse);
    params = params.set('rows', rows);
    this._itemSs.expGetaPaged(params.toString()).subscribe(data=>{
      // var dataList:any[]=[];
      // console.log('List Data', data.ListData)
     //  dataList=data.ListData;
     //data.ListData.length = currentSize;
      data.ListData.push(...data.ListData);
      data.ListData.length = data.TotalRecord;
     this.dataSource = new MatTableDataSource<any[]>(data.ListData);
     //this.paginator.firstPage();
     this.dataSource.paginator = this.paginator;
      //  data.ListData.forEach(element => {
      //   var getPagedListObj:any={};
      //   getPagedListObj.InvoiceNo=element.InvoiceNo;
      //   getPagedListObj.CompanyName=element.CompanyName;
      //   getPagedListObj.InvoiceDate=element.InvoiceDate;
      //   getPagedListObj.SalesOrderNos=element.SalesOrderNos;
      //   getPagedListObj.DocStatus=element.DocStatus;
      //   getPagedListObj.InvoiceId=element.InvoiceId;
      //   dataList.push(getPagedListObj); 
      //   //this.getPagedList.push(dataList);
      //  });
     // this.getPagedList=dataList;
  
     
    })
  }

}




