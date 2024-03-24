import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit{

  constructor(private service:SharedService) { }
  
  

  EmployeeList:any=[];

  ModalTitle:string='';
  ActivateAddEditEmpComp:boolean=false;
  emp:any;
  department:any=[]

  filterid:any=''
  filterName:any=''
  filterDepartment=''
  EmployeeFilterList:any=[]
  

  
  
  

  ngOnInit(): void {
    this.refreshEmpList();
    
  }

  addClick(){
    this.emp={
      id:0,
      EmployeeName:"",
      Department:"",
      DateOfJoining:"",
      PhotoFileName:"anonymous.png"
    }
    this.ModalTitle='Add Employee';
    this.ActivateAddEditEmpComp=true;

  }
  editClick(item:any){
    this.emp=item
    this.ModalTitle='Edit Employee';
    this.ActivateAddEditEmpComp=true;

  }
  deleteClick(item:any){
    if(confirm('Are you sure..?')){
      this.service.deleteEmployee(item.id).subscribe(data=>{alert(data.toString())
        this.refreshEmpList()})
    }
    
  }

  refreshEmpList(){
    this.service.getEmpList().subscribe(data=>{this.EmployeeList=data;
    this.EmployeeFilterList=data})
  }
  closeClick(){
    this.ActivateAddEditEmpComp=false;
    this.refreshEmpList();

  }
  filterFn(){
    var filterid =this.filterid
    var filterName=this.filterName
    var filterDepartment=this.filterDepartment

    this.EmployeeList=this.EmployeeFilterList.filter(function(el:any){
      return el.id.toString().toLowerCase().includes(filterid.toString().trim().toLowerCase())&&
      el.EmployeeName.toString().toLowerCase().includes(filterName.toString().trim().toLowerCase())&&
      el.Department.toString().toLowerCase().includes(filterDepartment.toString().trim().toLowerCase())
    })
  }
  sortfn(val:any,asc:any){
    this.EmployeeList=this.EmployeeFilterList.sort(function(a:any,b:any){
      if (asc){
        return (a[val]>b[val]?1:a[val]<b[val]?-1:0)
      }
      else{
        return (a[val]>b[val]?-1:a[val]<b[val]?1:0)
      }
    })

  }
  
  

}




