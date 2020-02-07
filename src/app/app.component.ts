import { Component, OnInit } from '@angular/core';
import { TABLE_DATA } from './table';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  data = TABLE_DATA;
  tableHeaders=[];
  currentPage = 1;
  rowArray = [];
  displayRowArray = [];
  paginationButtonArray = [];
  searchFilter ='';
  paginationIncrement = 2;
  ngOnInit(): void {
    this.rowArray = this.convertToArray(this.data);
    this.tableHeaders =this.getObjectKeys(this.rowArray[0]);
    this.paginationButtonArray = Array.from( {length:Math.ceil(this.rowArray.length / this.paginationIncrement)},(v,k)=>k+1);
    this.showPageItems(1);
  }
  convertToArray(objectData){
    let convertedArray =[];
    for (let key in objectData) {
      convertedArray.push(objectData[key]);
    }
    return convertedArray;
  }

  getObjectKeys(objectData){
    return Object.keys(objectData);
  }

  trackByFn(){

  }
  showPageItems(page){
    this.currentPage =page;
      let rowCount = this.paginationIncrement *page;
      if(this.rowArray.length >= rowCount){
        this.displayRowArray = this.rowArray.slice((page-1)*this.paginationIncrement,page*this.paginationIncrement);
      }
      else{
        this.displayRowArray = this.rowArray.slice((page-1)*this.paginationIncrement,this.rowArray.length);
      }
  }
  increase(key){
    this.rowArray.sort((a, b) => {    
      let x = a[key].toLowerCase();
      let y = b[key].toLowerCase();
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    });
    this.currentPage = 1 ;
    this.showPageItems(1);
  }
  decrease(key){
    this.rowArray.sort((a, b) => {
      let x = a[key].toLowerCase();
      let y = b[key].toLowerCase();
      if (x > y) {return -1;}
      if (x < y) {return 1;}
      return 0;
    });
    this.currentPage = 1;
    this.showPageItems(1);
  }
}
