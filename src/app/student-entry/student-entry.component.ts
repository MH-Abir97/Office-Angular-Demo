import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from '../student.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  GasId:number;
}

@Component({
  selector: 'app-student-entry',
  templateUrl: './student-entry.component.html',
  styleUrls: ['./student-entry.component.css']
})


export class StudentEntryComponent implements OnInit {
  ELEMENT_DATA:any = [
    {position: 1,GasId:1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, GasId:1,name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3,GasId:2, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4,GasId:2, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, GasId:3,name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6,GasId:4, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7,GasId:4, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, GasId:5,name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9,GasId:5, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10,GasId:3, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];
  GasList=[
    {GasId:1,Name:"Group A"},
    {GasId:2,Name:"Group B"},
    {GasId:3,Name:"Group C"},
    {GasId:4,Name:"Group D"},
    {GasId:5,Name:"Group E"},
    
  ]

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','GasId'];
 
  studentReg:FormGroup;
  gasForm:FormGroup;
  constructor(private _fb:FormBuilder,private studentS:StudentService ) {
   this.studentReg=_fb.group({
    BranchId:1,
    DepartmentName:'',
    Address:'',
    ContactNo:'',
    Email:'',
   
    ManagerName:'',
    Fax:'',
    IsUnit:1,
    SerialNo:100,
    IsActive:1,
    CreatorId:1,
   });

   this.gasForm=_fb.group({
    ddlGasId:0,
   });
  
   }
  
   

   
  ngOnInit(): void {
  }

  Savebtn(){
    this.studentReg.value;
    //this.studentS.Save(this.studentReg.value);
    //console.log(this.studentReg.value);
  
     this.studentS.SaveMethod(this.studentReg.value).subscribe(data=>{

    })
  }

  itemList=['Abir',"Akib","Ajmiri","Ajkiri","Sadik"];
  AddItem(){
  debugger;
    var filterarray=[];
    var element;
    for (let i = 0; i < this.itemList.length; i++) {
      console.log(this.itemList.length);
      if(this.itemList[i].length==6){
        filterarray.push(this.itemList[i]);
        if(filterarray.length==2){
           element=this.itemList[i];
        }
      }
     
    }
    console.log(element);

// debugger;
// const array = ["rakibul", "roni", "nabil", "mushfiq", "mustafiz", "sakib"];
// function perfectFriend(arr) {
//     console.log(arr.length);
//     var itemarray = [];
//     var element;
//     for (let index = 0; index < arr.length; index++) {
//         if (arr[index].length == 5) {
//             itemarray.push(arr[index]);
//             if (itemarray.length == 1) {
//                 element = arr[index];
//             }
//         }
      
//     }
//     return element;
// }
// console.log(perfectFriend(array));

  }
  dataSource:any=[];
  changeselectListval(event:number){
  
   // this.dataSource =this.ELEMENT_DATA;
   debugger;
    this.ELEMENT_DATA.forEach(aData => {
      if(aData.position==event){
        this.dataSource=new MatTableDataSource(aData);
      }
    });

  }




}
