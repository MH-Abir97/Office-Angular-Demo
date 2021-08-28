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
 
  length = 500;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;

  handlePageEvent(event: PageEvent) {
    var length = event.length;
    var pageSize = event.pageSize;
    var pageIndex = event.pageIndex;
    var previousIndex = event.previousPageIndex;
    var previousSize = pageSize * pageIndex;
    var rows = '0';
    this.getNextData(previousSize,(pageIndex).toString(), pageSize.toString(), rows);
  } 

  @ViewChild(MatPaginator) paginator: MatPaginator;

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }
  constructor(private _itemSs:ItemServiceService) { }

  ngOnInit(): void {
   
    this.GetPaged('0','5', '0');
  }

  getNextData(currentSize, startRecordNo, rowPerPage, rows){
    var params = new HttpParams();
    params = params.set('startRecordNo', startRecordNo);
    params = params.set('rowPerPage', rowPerPage);
    params = params.set('rows', rows);
    this._itemSs.expGetaPaged(params.toString()).subscribe(data=>{
      //data.ListData.length = currentSize;
      data.ListData.push(...data.ListData);
      data.ListData.length = data.TotalRecord;
     this.dataSource = new MatTableDataSource<any[]>(data.ListData);
     this.dataSource.paginator = this.paginator;
    })
    
  }

  
  GetPaged(startRecordNo, rowPerPage, rows){
    var params = new HttpParams();
    params = params.set('startRecordNo', startRecordNo);
    params = params.set('rowPerPage', rowPerPage);
    params = params.set('rows', rows);
    this._itemSs.expGetaPaged(params.toString()).subscribe(data=>{
      // var dataList:any[]=[];
      // console.log('List Data', data.ListData)
     //  dataList=data.ListData;
      
     this.dataSource = new MatTableDataSource<any[]>(data.ListData);
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




