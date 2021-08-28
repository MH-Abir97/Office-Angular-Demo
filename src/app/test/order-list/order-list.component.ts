import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ItemServiceService } from 'src/app/services/item-service.service';
import { TestComponent } from '../test/test.component';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { DynamicTableComponent } from '../dynamic-table/dynamic-table.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  @ViewChild(TestComponent) testComponentMethodAccess:TestComponent;
  selectList:Subscription;
  @Input() dynamicdableMethod:number;
  @Input()
  public content: any;
  @Input() dataSource: any=[];
  checkDataList:any=[];
  public rows = new MatTableDataSource<any>();
  public columns = [];
  public selection = new SelectionModel<any>(true, []);
  addClass: boolean = false;

  //Resuable Table Input
  @Input() isSelect: boolean = true;
  @Input() isButton: boolean = false;
  @Input() isSerial: boolean = false;
  @Input() ispaginator: boolean = false;
  @Input() addFilter: boolean = false;
 

 
  colLength: number = 0;

  ngOnChanges(){

    
    this.content = this.dataSource;
    if( this.dataSource.length !=0){
      this.updateTable();
      this.selection.clear();
    }

   

   
   // console.log(this.getpagedDataList);
   
 }



  public constructor(private _itemSs:ItemServiceService) {
 
   this.selectList=this._itemSs.getDataSourceEvent().subscribe(data=>{
     // this.add();
    })
  }

  // @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public filterBy(event: any): void {
    const filterBy: string = event.target.value;
    this.rows.filter = filterBy;
  }


  public isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.rows.data.length;
    return numSelected === numRows;

  }

  public masterToggle() {

    this.isAllSelected()
      ? this.selection.clear()
      : this.rows.data.forEach((row) => this.selection.select(row));
      //this.SelectedItem();

  }

  public checkboxLabel(row?: any): string {

    return !row
      ? `${this.isAllSelected() ? 'select' : 'deselect'} all`
      : `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
          row.position + 1
        }`;
  }

  private updateRows(): void {
    debugger;
    this.rows = new MatTableDataSource<any>(this.content);
    //this.rows.sort = this.sort;
    //this.rows.paginator = this.paginator;
  }

  private updateColumns(): void {
 ;
    if (this.isSelect == true) {
      this.columns = ['select'];
    }

    if (this.isButton == true) {
      this.columns = ['buttons'];
      this.colLength = -1;
    }

    if (this.isSerial == true) {
      this.columns = ['Sn'];
    }
    if (this.addFilter == true) {
      this.columns = ['Action'];
    }

    for (const column of Object.keys(this.content[0])) {
      this.columns.push(column);
    }
    this.colLength = this.colLength + this.columns.length;
  }

  
  private updateTable(): void {
    debugger;
    if(this.dataSource.length !=0){
      if (this.content) {
        this.updateRows();
        this.updateColumns();
      }
    }
   
  }


  public showFamilies(): void {}

  ngOnInit(): void {
    debugger;
 

    //this.getpagedDataList=this.dataSorce3;
     //console.log("GetPaged", this.getpagedDataList);
    
    
   // this.content = [...this.dataSource];
    // console.log(this.selection.selected)
    // this._itemS.getAllPOList().subscribe(data=>this.dataSource=data);
   

  //  this._itemSs.changeSalesOrder(arg=>{
  //    console.log("argument List",arg);
  //    //this.add();
  //    this.content =arg;
     
  // })
    // this.content = this.dataSource;
    //  this.dataSource;
    //  this.see();

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  
  add() {
   debugger;
    // this._itemSs.CurrentsalesOrderItem.subscribe(data=>{
    //   debugger;
    //   this.content = data;
    // });

 
    // console.log(this.selection.selected)
    // this._itemS.getAllPOList().subscribe(data=>this.dataSource=data);
    // if(this.content.length !=0){
    //   this._itemSs.CurrentsalesOrderItem.subscribe(data=>{
    //     debugger;
    //     this.content = data;
    this.content =this.dataSource;   
        this.updateRows();
        this.selection.clear();
    //   })
     
    // }
   
    // this.content = this.dataSource;
    // this.updateTable();
    // this.selection.clear();
  }

  see() {
    // console.log("Company Id",this.dynamicdableMethod);

    // this._itemS.getAllPOList().subscribe(data=>this.dataSource=data);

  }

  invoiceDetailList:any[]=[];
  

  SelectedItem(row :any,check:MatCheckboxChange){
   
    debugger;
  
    var checkedObj:any={}
     if(check){
      checkedObj=this.selection.selected;
      this.invoiceDetailList=[];
        checkedObj.forEach(element => {
          this._itemSs.getAllItemInfo(element.SalesOrderId).subscribe(data=>{
            data.forEach(aData => {
              aData.PreAmountOfLcCoppyItem=aData.UnitPrice;
              this.invoiceDetailList.push(aData);
              if(aData.SubCategoryId===1){
                aData.DescriptionOne = aData.DescriptionOne +
                //"\n" +
                //adata.DescriptionTwo +
                "\n" +
                "(" +
                aData.UnitPerPackage +
                " " +
                "Pcs" +
                "/" +
                "Rolls" +
                ")";
              }else{
                aData.DescriptionOne = aData.DescriptionOne + "\n" + aData.DescriptionTwo;
              }
      
            });
         
            this._itemSs.changeMessage(this.invoiceDetailList);
          }); 
        });
     }else{
      checkedObj=this.selection.selected;
      this.invoiceDetailList=[];
      if(checkedObj.length !=0){
        checkedObj.forEach(element => {
          this._itemSs.getAllItemInfo(element.SalesOrderId).subscribe(data=>{
            data.forEach(aData => {
              aData.PreAmountOfLcCoppyItem=aData.UnitPrice;
              this.invoiceDetailList.push(aData);
              if(aData.SubCategoryId===1){
                aData.DescriptionOne = aData.DescriptionOne +
                //"\n" +
                //adata.DescriptionTwo +
                "\n" +
                "(" +
                aData.UnitPerPackage +
                " " +
                "Pcs" +
                "/" +
                "Rolls" +
                ")";
              }else{
                aData.DescriptionOne = aData.DescriptionOne + "\n" + aData.DescriptionTwo;
              }
      
            });
         
            this._itemSs.changeMessage(this.invoiceDetailList);
          }); 
    
        });
      }else{
       // this.invoiceDetailList=[];
        this._itemSs.changeMessage(this.invoiceDetailList);
      }
     }
  }

}

