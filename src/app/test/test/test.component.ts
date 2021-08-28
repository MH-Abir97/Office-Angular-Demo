import { Component, OnInit, ViewChild } from '@angular/core';
import { Exporter } from './exporter.model';
import * as $ from 'jquery';
import { ItemServiceService } from 'src/app/services/item-service.service';
import { StudentService } from 'src/app/student.service';
import {map, startWith} from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {

  @ViewChild(MatPaginator)paginator:MatPaginator
  itemList:any=[];
  dataTransferObject:any
  getAllInvoice:any=[]
  dataSource: any = [];
  dataSource2: any = [];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
 // displayedColumns: string[] = ['SalesOrderNo', 'SalesOrderDate', 'Amount', 'CurrencyType','SalesOrderType'];
  isChecked: boolean = false;
  exportInvoice: any={} ;
  packingInfo: any={};
  ddlExporter: string;
  ddlInvoiceType: string;
  ddlExporterBank: number;
  ddlFactory: string;
  ddlEmail: string;
  dataList: any;
  //ExporterBankId:any;
  ddlCompany: number;
  companyList:any=[];
  factories:any=[];
  exporterBanks:any=[];
  ddlItemVal:string;

  exporters: Exporter[] = [
    { value: '1', viewValue: 'Retail Tech.' },
    { value: '2', viewValue: 'Others' },
    { value: '3', viewValue: 'Others-2' },
  ];
  invoiceTypes: Exporter[] = [
    { value: '1', viewValue: 'PI' },
    { value: '2', viewValue: 'SC/TT' },
    { value: '3', viewValue: 'SC/FD' },
  ];

  // pagedList=[
  //   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  //   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  //   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  //   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  //   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  //   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  //   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  //   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  //   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  //   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  // ]

  getPagedList:any=[];
  // factories: Exporter[] = [
  //   { value: '1', viewValue: 'Uttra' },
  //   { value: '2', viewValue: 'EpZ' },
  // ];
  // companies: Exporter[] = [
  //   { value: '1', viewValue: 'A.K.M' },
  //   { value: '2', viewValue: 'Alfa Test' },
  //   { value: '3', viewValue: 'Other' },
  // ];
  // exporterBanks: Exporter[] = [
  //   { value: '1', viewValue: 'Woori bank' },
  //   { value: '2', viewValue: 'Dhaka bank' },
  // ];
  emails: Exporter[] = [
    { value: '1', viewValue: 'rakin@gmail.com' },
    { value: '2', viewValue: 'rtb@gmail.com' },
  ];
    EmailTestList :any= [
    { Id: 1, Email: 'rakin@gmail.com' },
    { Id: 2, Email: 'rtb@gmail.com' },
  ];


  // SummerNote
  config = {
    placeholder: '',
    tabsize: 2,
    height: '200px',
    uploadImagePath: '/api/upload',
    toolbar: [
      ['misc', ['codeview', 'undo', 'redo']],
      ['style', ['bold', 'italic', 'underline', 'clear']],
      [
        'font',
        [
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'superscript',
          'subscript',
          'clear',
        ],
      ],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['table', 'picture', 'link', 'video', 'hr']],
    ],
    fontNames: [
      'Helvetica',
      'Arial',
      'Arial Black',
      'Comic Sans MS',
      'Courier New',
      'Roboto',
      'Times',
    ],
  };
  myControl = new FormControl();
  termsAndConditions: any =
    '<ol><li>Payment: Letter of Credit&nbsp;<b> 90 days&nbsp;</b>From the date of Delivery Challan to be opened in favor of Retail Technologies Ltd.</li><li>Payment Should be made in U.S Dollar through LC.</li><li>Partial Shipment Allowed.</li><li>&nbsp;Quantity &amp; Value may vary +/- 10% of total Quantity &amp; Value of the Proforma Invoice.</li><li>Delivery Challan Should be treated as transport/Truck Challan.</li><li>Maturity date should be calculated from the date of goods delivery Challan.</li><li>All Banking Charges inside openers Bank counter on account of opener and outside openers bank counter on account of beneficiary.</li><li>Payment after Export Realization clause not allowed in the LC.</li><li>LC must incorporate delivery validity 30 days from the date of LC.</li><li>Presentation period: 15 days from the date of delivery.</li><li>L/C should be freely negotiable.</li><li>PI Validity 65 days from the date of issue.</li><li>Discrepancy charge should be mentioned between 25-30 Dollars.<br></li></ol>';

  // table
  isFinalized: boolean = false;
  itemNameDisable: boolean = false;
  filteredOptions: Observable<any[]>;

  getPagedAllPiList=[];
  constructor(private _itemSs: ItemServiceService,private studentService:StudentService ) {}

  getAllItemList(){
    debugger;
    this._itemSs.getAllItem().subscribe(item=>this.itemList=item);
  }

  private _filter(ItemName: any): any[] {
    const filterValue = ItemName.toLowerCase();

    return this.itemList.filter((option) =>
      option.ItemName.toLowerCase().includes(filterValue)
    );
  }

  
  selectItemChange(event:number){

  }
  displayFn(user: any): any {
    return user && user.ItemName ? user.ItemName : '';
  }

  //filteredOptions

  ngOnInit(): void {
  
    debugger;

   

 
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)
      )
    );
    //this.GetPaged();
    this.getAllItemList();
    this.exportInvoice.RefEmployeeId=1;
    this.exportInvoice.SalesOrderIds=40958;
    this.GetAllCompany();
    this. getAllExpoter();
  
  }

  ngOnChanges(){
   
  }

 

   
  CompanyId:number;
  changeCompany(event: number) {
    this.CompanyId=event;
 
    this.exportInvoice.CompanyId=Number(event);
    debugger;
    this._itemSs.getAllPOList(event).pipe(map(item => {
      debugger;
      return item.map(i=>({
        SalesOrderId:i.SalesOrderId,
        SalesOrderNo:i.SalesOrderNo,
        SalesOrderDate:i.SalesOrderDate,
        Amount:i.Amount,
        CurrencyType:i.CurrencyType,
        SalesOrderType:i.SalesOrderType
      }),
      )

    })).subscribe(data=>{
      this.dataSource=data;
      debugger;
      this._itemSs.changeSalesOrder(data);

    });


    this.companyList.forEach(data => {
      if(data.CompanyId==this.exportInvoice.CompanyId){
        this.exportInvoice.CompanyNameBilling =data.CompanyNameBilling;
        this.exportInvoice.CompanyNameDelivery =data.CompanyNameDelivery;
        this.exportInvoice.AddressDelivery =data.AddressDelivery;
        this.exportInvoice.AddressBilling =data.AddressBilling;
      }
    });

     this._itemSs.SendDataSource();
  }


  getInfo() {
    var ItemList=[];
    // var sId=0;
    // debugger;
    // this._itemSs.getAllPOList().subscribe(data=>{
    //   debugger;
    //   data.forEach(element => {
    //     sId=element.SalesOrderId;
    //   });

    // });

    this._itemSs.getAllItemInfo(40958).subscribe(item=>{
      //ItemList=item.TotalCarton;
      this.packingInfo.TotalCarton =item.TotalCarton;
    });





    // this.packingInfo.TotalCarton = 30;
    // this.packingInfo.LabelNetWeight = 30;
    // this.packingInfo.LabelGrossWeight = 30;
    // this.packingInfo.RibonNetWeight = 30;
    // this.packingInfo.RibonGrossWeight = 30;
    // this.packingInfo.CartonMeasurement = 30;

  }
  reset() {
    this.ddlCompany =0;
    this.ddlEmail = '';
    this.ddlFactory = '';
    this.ddlExporterBank =0;
    this.ddlInvoiceType = '';
    this.exportInvoice = {};
    this.packingInfo = {};
    this.dataSource = [];
    this.ddlExporter = '';
  }

  onExporterTypeSetById(event:number){

  }

  exporterBankFilterList:any=[];
  selectFactory(factoryId: number) {
    this.exporterBanks=[];
    this.exporterBankFilterList=[];
    this._itemSs.getAllBank().subscribe(data=>{
      data.forEach(filterData => {
        if(filterData.BankAccountId==2){
          this.exporterBankFilterList.push(filterData);
        }else if(filterData.BankAccountId==1){
          this.exporterBankFilterList.push(filterData);
        }
      });

      this.exporterBankFilterList.forEach(aData => {
        if(factoryId==2){
          //this.exporterBanks.push(aData);
          this.ddlExporterBank =2;
          this.exporterBanks.push(aData);
          this.exportInvoice.ExporterBankId=this.ddlExporterBank;
          this.exportInvoice.ImporterBankId=this.ddlExporterBank;
          this.exportInvoice.InvoiceNo="RTLE/21-22/PI-111";
        }else{
          this.ddlExporterBank =1;
          this.exporterBanks.push(aData);
          this.exporterBanks.ExporterBankId=1;
          this.exportInvoice.ExporterBankId=this.ddlExporterBank;
          this.exportInvoice.ImporterBankId=this.ddlExporterBank;
          this.exportInvoice.InvoiceNo="RTL/21-22/PI-32";
        }
      });

    });




  }

  selectInvoiceType(invoiceId:number){
    debugger;
    var inVoice=Number(invoiceId);
    if(inVoice==1){
      this.exportInvoice.InvoiceType="PI";
    }
    else if(inVoice==1){
      this.exportInvoice.InvoiceType="SC/TT";
    }
    else{
      this.exportInvoice.InvoiceType="SC/FD";
    }
  }
  save() {
    debugger;
    this._itemSs.save(this.exportInvoice,this.packingInfo,this.dataList,this.termsAndConditions);

  }

  //Company
  GetAllCompany(){
    debugger;
    this._itemSs.getCompany().subscribe(data=>{
      this.companyList=data
     console.log( this.companyList);
    });
  }

  getAllExpoter(){
   this._itemSs.GetExporter().subscribe(data=>this.factories=data);
  }


}
