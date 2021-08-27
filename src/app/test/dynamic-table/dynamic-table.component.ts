import { Input, Output,EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as $ from 'jquery';
import { Observable } from 'rxjs';
import { ItemServiceService } from 'src/app/services/item-service.service';
import { OrderListComponent } from '../order-list/order-list.component';

declare const myFun: any;
@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css'],
})
export class DynamicTableComponent implements OnInit {

  title = 'UseJquery';

  insertItemCount:any = undefined;
  distCount:any = 1;
  Qty:any = 0;
  QtySumForItem:any = 0;
  UnitpriceSumForItem:any = 0;
  UnitPrice:any = 0;
  AmountSumForItem:any = 0;
  column_numP1:any = 0;
  row_numP1:any = 0;
  disBtn:any = false;
  //TrimmedTableData:any = [];
  //TrimmedTableRow:any = {};
  //ItemRow:any;
  CustomiseTableDataList:any = [];
  TableHtmlData:any={};
  invoiceDetail:any = {};
  invoiceDetailList:any=[];
  invoiceDetailListInput:any=[];



  // invoiceDetailList:any = [
  //   {Amount: 16,
  //   DescriptionOne: "Size:(75X110)mm",
  //   DescriptionTwo: "Paper: Mat Fasson",
  //   HsCode: "4821.10.00",
  //   ItemId: 3,
  //   ItemName: "Barcode Label",
  //   Quantity: 4,
  //   SalesOrderId: 677,
  //   UnitPrice: 4},
  //   {Amount: 25,
  //       DescriptionOne: "Size:(300X300)mm",
  //       DescriptionTwo: "Paper: Mat Fasson",
  //       HsCode: "4821.10.00",
  //       ItemId: 4,
  //       ItemName: "Barcode Label",
  //       Quantity: 5,
  //       SalesOrderId: 677,
  //       UnitPrice: 5},
  //       {Amount: 50,
  //           DescriptionOne: "Size:(148X210)mm",
  //           DescriptionTwo: "Paper: Mat Fasson",
  //           HsCode: "4821.10.00",
  //           ItemId: 5,
  //           ItemName: "Barcode Label",
  //           Quantity: 10,
  //           SalesOrderId: 677,
  //           UnitPrice: 5},
  // ];

  ItemTableDataRow:any = []
//   ItemTableDataRow:any = [
//     ['11', '111', 1, 'Barcode Label', '4"X 3" Type: Mat Fasoin', 5, 10, 50],
//     ['12', '112', 2, 'Barcode Ribbon', '156 M"X 400 M"', 1, 20, 20],
//     ['13', '113', 3, 'Barcode Label', '148 M"X 210 M" Type: Mat Fasoin', 10, 6, 60],
//     ['14', '114', 4, 'Barcode Printer', '200p', 1, 600, 600]
//   ];
  NewItem: any = [0, 0, 0, 'Barcode Name', 'Size: ... Type: ...', 0, 0, 0];
  ItemTableHeaders:any = [
    "SalesOrderId_Hide", "ItemId", "SlNo", "Item Name", "Description Of Goods", "Qty/Rolls", "Unit Price", "Amount"
];
  ItemTableFooter:any = ["","", "", "", "", "0", "", "0"];

  constructor(private _itemSs:ItemServiceService) { }

  Test(){

    debugger;

    // debugger;
    // var DetailList=[];
    // this.invoiceDetailList= this._itemSs.getModifiedTableData();
    // console.log("Check",this.invoiceDetailList);
    debugger;
    this.invoiceDetailList= this.invoiceDetailListInput;
      this.itemLoadDynamicTable();
      this.GetItemValueForAmountCalculation();
  }

  public ngOnInit() {
    debugger;
    this._itemSs.currentMessage.subscribe(message =>{
       
        this.invoiceDetailListInput=message;
      if(this.invoiceDetailListInput!=null){ 
          this.itemLoadDynamicTable();
          this.GetItemValueForAmountCalculation();
       }
       
    })


    // var DetailList=[];
    // this._itemSs.modifiedTableDataChange.subscribe(
    //   (arg) => (DetailList = [...DetailList,arg])
    // );
    // if( this.invoiceDetailListInput.length !=0){
    //     this.itemLoadDynamicTable();
    //     this.GetItemValueForAmountCalculation();
    // }
    

    this.newFun();
    //myFun();

//    console.log("Dynamic Table Data", this.invoiceDetailListInput) 

  }



  //Col Add
  tableInsertCol(){
    var index = prompt("Please enter index No");
    if(index != null && index != ""){
        var name = prompt("Enter column name here");
        if (Number(index) > (this.ItemTableHeaders.length - 3) || Number(index) <= 4 || name == null || index == null || isNaN(Number(index)))
            alert("Can't insert here");
        else {
            this.disBtn = true;
            this.insertAtTable(Number(index), name);
        }
    }
    else{
        return;
    }

  }
  insertAtTable(index, insertItem) {
    this.insertItemCount = insertItem;
    this.ItemTableHeaders.splice(index, 0, insertItem);

        this.ItemTableDataRow.forEach(function (item, idx) {
          item.splice(Number(index), 0, "new data");
      });
    this.ItemTableFooter.splice(index, 0, "");
}
////////////////////////////
////////////ColRemove
tableRemoveCol(){
  var index = prompt("Please enter Column No");
  if(index != null && index != ""){
    var col = Number(index);

    var firstVisualElementNumber = 3;
    if (col <= 4)
        alert("Can't Remove this Column");
    else if ((col) >= (this.ItemTableHeaders.length - 3))
        alert("Can't Remove this Column");
    else {
        this.ItemTableHeaders.splice(col, 1);

        this.ItemTableDataRow.forEach(function (item, idx) {
            item.splice(col, 1);
        });

        this.ItemTableFooter.splice(col, 1);
    }
  }else{
      return;
  }

}
//////////
rearrangeSerial(){
  var serial = 1;
            this.ItemTableDataRow.forEach(function(aRow) {
                    for (var i = 0; i < aRow.length; i++) {
                        if (i === 2) {
                            aRow[2] = serial++;
                        }
                    }
                });
}
tableRemoveRow(){
  //var index = prompt("Please enter Row No");
  //var index = this.row_numP1;
  if(this.row_numP1 != null && this.row_numP1 != ""){
    this.row_numP1 = Number(this.row_numP1);
        if (this.row_numP1 != null) {
            if(this.ItemTableDataRow.length > 1){
                var row = this.ItemTableDataRow[Number(this.row_numP1 - 1)];

                //remove item table data row here
                this.ItemTableDataRow.splice(Number(this.row_numP1 - 1), 1);
                this.invoiceDetailList.splice(Number(this.row_numP1 - 1), 1);
                this.GetItemValueForAmountCalculation();
                this.row_numP1 = null;
            }else{
                alert("Shouldn't remove Last Item!!!")
            }
            } else {
            this.row_numP1 = null;
                alert("Please select a item !!!");
            }

  }
  else{
      this.row_numP1 = null;
    alert("Please select a item !!!");
      return;
  }

}
ImportItem(){
    this.ItemTableDataRow.push(this.NewItem);

    var aData = {};
    aData['SalesOrderId'] = this.NewItem[0];
    aData['ItemId'] = this.NewItem[1];

    aData['Sl'] = this.NewItem[2];
    aData['ItemName'] = this.NewItem[3];
    aData['Description'] = this.NewItem[4];
    aData['Quantity'] = this.NewItem[5];
    aData['UnitPrice'] = this.NewItem[6];
    aData['Amount'] = this.NewItem[7];

    this.invoiceDetailList.push(aData);



    this.NewItem = [0, 0, 0, 'Barcode Name', 'Size: ... Type: ...', 0, 0, 0];
    this.GetItemValueForAmountCalculation();
    this.rearrangeSerial();
    // console.log("invoiceDetailList",this.invoiceDetailList);
}

EditAble(){
  var tdMofiz = document.getElementById("mofiz").getElementsByTagName("td");
  for (var i = 0; i < tdMofiz.length; i++) {
    var isNan = Number(tdMofiz[i].innerText);
      if(tdMofiz[i].innerText != "" && isNaN(isNan)){
        tdMofiz[i].contentEditable = "true";

        // console.log(tdMofiz[i].innerText);
      }

  }
}

select($event) {
  var e = $event;
  e.preventDefault();
        e.stopPropagation();
        if (e.path.length == 12) {
            var tdMofiz = document.getElementById("mofiz").getElementsByTagName("td");
            var thMofiz = document.getElementById("mofiz").getElementsByTagName("th");
            for (var i = 0; i < tdMofiz.length; i++) {
                tdMofiz[i].style.backgroundColor = "white";
            }
            for (var i = 0; i < thMofiz.length; i++) {
              thMofiz[i].style.backgroundColor = "white";
          }
          var mofizId = e.target.className;
          if(mofizId != "mofizth t-cell-center"){
            e.target.style.backgroundColor = "yellow";
            this.column_numP1 = $(e.target).index() + 1;
            this.row_numP1 = $(e.target).parent().index() + 1;
            // console.log(this.column_numP1, this.row_numP1);
          }


        }
}

GetItemValueForAmountCalculation(){
    debugger;
    this.rearrangeSerial();
    var qty = 0;
    var unitPrice = 0;
    var amount = 0;
    this.QtySumForItem = 0;
    this.AmountSumForItem = 0;
    var invDetailList =this.invoiceDetailListInput;

        for (var l = 0; l < this.ItemTableDataRow.length; l++) {
                var row = this.ItemTableDataRow[l];
               qty = row[row.length - 3];
               unitPrice = row[row.length - 2];
               //var qtyTemp = Number(row[row.length - 3]);
               //var unitPriceTemp = Number(row[row.length - 2]);

               this.QtySumForItem += Number(qty);



               amount = unitPrice * qty;
               this.ItemTableDataRow[l][this.ItemTableDataRow[l].length - 3] = Number(qty);
               this.ItemTableDataRow[l][this.ItemTableDataRow[l].length - 2] = Number(unitPrice);
               this.ItemTableDataRow[l][this.ItemTableDataRow[l].length - 1] = Number(amount);
               this.AmountSumForItem += Number(amount);


          var integerPartQty = parseInt(this.QtySumForItem);
          var decimalPartQty = this.QtySumForItem - integerPartQty;

          if (decimalPartQty == 0) {
              this.ItemTableFooter[this.ItemTableFooter.length - 3] = this.QtySumForItem;
          }
          else {
              this.ItemTableFooter[this.ItemTableFooter.length - 3] = parseFloat(this.QtySumForItem);//.toFixed(2);
          }
          this.ItemTableFooter[this.ItemTableFooter.length - 1] = parseFloat(this.AmountSumForItem);//.toFixed(2);

          this.invoiceDetailList.forEach(function (invoiceDetail) {
            //if (invoiceDetail.ItemId == row[1] && invoiceDetail.Quantity == qtyTemp && invoiceDetail.UnitPrice == unitPriceTemp) {
            if (invoiceDetail.ItemId == row[1]) {
                var objectIndex = invDetailList.indexOf(invoiceDetail);
                if (objectIndex != -1 && objectIndex + 1 == row[2]) {
                    invoiceDetail.ItemName = row[3];
                    invoiceDetail.DescriptionOne = row[4];
                    invoiceDetail.Quantity = row[row.length - 3];
                    invoiceDetail.UnitPrice = row[row.length - 2];
                    invoiceDetail.Amount = row[row.length - 1];
                }

            }
        });
        }
        // console.log("invoiceDetailTable",this.invoiceDetailList);

}
GetChengedFieldValue(itemName, row, index){
    if (itemName == '') {
        alert("Please enter valid Number!!!");
        return;
    }
    if (itemName == '.') {
        alert("Can't input just dot !!!");
        return;
    }
    var qtyTemp = row[row.length - 3];
    var unitPriceTemp = row[row.length - 2];

    var item;
    item = parseFloat(itemName);

    if (isNaN(item)) {

        alert("Can't Enter Any Alphabet and Special Character Before Number !!!");
        return;
    }
    else {
        if (row.length - 1 != index) {
            this.QtySumForItem -= parseFloat(row[row.length - 3]);
            this.AmountSumForItem -= parseFloat(row[row.length - 1]);
            if (index >= (row.length - 3)) {
                row[index] = item;
            }
            else {
                row[index] = item;
            }
            var qtyConvert = parseFloat(row[row.length - 3]);
            var amountConvert = parseFloat(row[row.length - 2]);
            row[row.length - 1] = (qtyConvert * amountConvert).toFixed(2);
            this.AmountSumForItem += parseFloat(row[row.length - 1]);
            this.QtySumForItem += parseFloat(row[row.length - 3]);
        }
        else {
            this.AmountSumForItem -= row[row.length - 1];
            row[index] = item;
            this.AmountSumForItem += item;
        }

        var integerPartQty = parseInt(this.QtySumForItem);
        var decimalPartQty = this.QtySumForItem - integerPartQty;

        if (decimalPartQty == 0) {
            this.ItemTableFooter[this.ItemTableFooter.length - 3] = this.QtySumForItem;
        }
        else {
            this.ItemTableFooter[this.ItemTableFooter.length - 3] = parseFloat(this.QtySumForItem).toFixed(2);
        }
        this.ItemTableFooter[this.ItemTableFooter.length - 1] = parseFloat(this.AmountSumForItem).toFixed(2);

        this.invoiceDetailList.forEach(function (invoiceDetail) {
            if (invoiceDetail.ItemId == row[1] && invoiceDetail.Quantity == qtyTemp && invoiceDetail.UnitPrice == unitPriceTemp) {
                var objectIndex = this.invoiceDetailList.indexOf(invoiceDetail);
                if (objectIndex != -1 && objectIndex + 1 == row[2]) {
                    invoiceDetail.ItemName = row[3];
                    invoiceDetail.DescriptionOne = row[4];
                    invoiceDetail.Quantity = row[row.length - 3];
                    invoiceDetail.UnitPrice = row[row.length - 2];
                    invoiceDetail.Amount = row[row.length - 1];
                }

            }
        });
        row[index] = item;
    }
}
newFun(){
  this.CustomiseTableDataList = [];
  var CustomiseTableData = {};

            var x = 1, l = 0;
            for (var s = 0; s < this.ItemTableHeaders.length; s++) {
                for (l = 0; l < this.ItemTableDataRow.length; l++) {
                    for (var m = 0; m < this.ItemTableHeaders.length; m++) {
                        if (m === s) {
                            CustomiseTableData['Id'] = x++;
                            CustomiseTableData['ColName'] = this.ItemTableHeaders[s];
                            CustomiseTableData['ColValue'] = this.ItemTableDataRow[l][s];

                            this.CustomiseTableDataList.push(CustomiseTableData);
                            CustomiseTableData = {};

                        }

                    }
                }
            }
        //     var table1 = document.getElementById("mofiz") as HTMLTableElement;
        //     let table = <HTMLTableElement>document.getElementById("mofiz");
        //     //var jTable = String($("#mofiz")[0].outerHTML);
        //     //this.TableHtmlData.HtmlData = table.outerHTML;
        //     var dom = new DOMParser();
            //  console.log("Modifide Data Table:", this.CustomiseTableDataList);

        //     console.log(dom);
        // console.log(table.outerHTML)
}

itemLoadDynamicTable() {
    debugger;
    var TrimmedTableData = [];
    var sl = 0;
    this.invoiceDetailListInput.forEach(function (iData) {
        var TrimmedTableRow = {};
            TrimmedTableRow['SalesOrderId'] = iData.SalesOrderId;
            TrimmedTableRow['ItemId'] = iData.ItemId;

            TrimmedTableRow['Sl'] = ++sl;
            TrimmedTableRow['ItemName'] = iData.ItemName + '\n HS Code: ' + iData.HsCode;
            TrimmedTableRow['Description'] = iData.DescriptionOne;
            TrimmedTableRow['Quantity'] = iData.Quantity;
            TrimmedTableRow['UnitPrice'] = iData.UnitPrice;
            TrimmedTableRow['Amount'] = iData.Amount;

            TrimmedTableData.push(TrimmedTableRow);
        });

        this.ItemTableHeaders =
            [
                "SalesOrderId", "ItemId", "SlNo", "Item Name", "Description Of Goods", "Qty/Rolls", "Unit Price", "Amount"
            ];
        this.ItemTableDataRow = [];
        this.ItemTableFooter = [];
        var DataRow = [];
        var ItemRow = {};
        TrimmedTableData.forEach(function (item, idx) {
            ItemRow = Object.keys(item).map(e => item[e]);
            DataRow.push(ItemRow);

        });
        this.ItemTableDataRow = DataRow;

    for (var i = 0; i < this.ItemTableHeaders.length; i++) {
        if (i == this.ItemTableHeaders.length - 3 || i == this.ItemTableHeaders.length - 1) {
            this.ItemTableFooter.push(0);
        } else {
            this.ItemTableFooter.push("");
        }

    }
    // console.log("ItemTableDataRow",this.ItemTableDataRow)
}
ngAfterViewInit(){
   // this.itemLoadDynamicTable();
}

}



