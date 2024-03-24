import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {

  constructor(private service:SharedService) { }
  

  DepartmentList:any=[];

  ModalTitle:string='';
  ActivateAddEditDepComp:boolean=false;
  dep:any;
  
  DepartmentFilterList:any=[];
  filterid:any=''
  filtername:any=""
  
  
  

  ngOnInit(): void {
    this.refreshDepList();
    
  }

  addClick(){
    this.dep={
      id:0,
      DepartmentName:''
    };
    this.ModalTitle='Add Department';
    this.ActivateAddEditDepComp=true;

  }
  editClick(item:any){
    this.dep=item
    console.log(item)
    this.ModalTitle='Add Department';
    this.ActivateAddEditDepComp=true;

  }
  deleteClick(item:any){
    if(confirm('Are you sure..?')){
      this.service.deleteDepartment(item.id).subscribe(data=>{alert(data.toString())
        this.refreshDepList()})
    }
    
  }

  refreshDepList(){
    this.service.getDepList().subscribe(data=>{this.DepartmentList=data;
    this.DepartmentFilterList=data})
  }
  closeClick(){
    this.ActivateAddEditDepComp=false;
    this.refreshDepList();

  }
  filterfn(){
    var filterid=this.filterid
    var filtername=this.filtername

    this.DepartmentList=this.DepartmentFilterList.filter(function(el:any){
       return el.id.toString().toLowerCase().includes(filterid.toString().trim().toLowerCase())&&
       el.DepartmentName.toString().toLowerCase().includes(filtername.toString().trim().toLowerCase())
    })
  }
  sortfn(val:any,asc:any){
    this.DepartmentList=this.DepartmentFilterList.sort(function(a:any,b:any){
      if(asc){
        return (a[val]>b[val]?1:a[val]<b[val]?-1:0);
      }
      else{
        return (a[val]>b[val]?-1:a[val]<b[val]?1:0);

      } 
    })
  }
  

}

