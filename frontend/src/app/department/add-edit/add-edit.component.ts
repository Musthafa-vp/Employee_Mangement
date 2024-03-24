import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit{

  constructor(private service:SharedService){}

  @Input() dep:any;
  id:string='';
  DepartmentName:string='';



  ngOnInit(): void {
    this.id=this.dep.id;
    this.DepartmentName=this.dep.DepartmentName
    
  }
  addDep(){
    var val ={
      id:this.dep.id,
      DepartmentName:this.DepartmentName
    }
    this.service.addDepartment(val).subscribe(res=>{console.log(val),alert(res.toString())})
  }

  updateDep(){
    var val ={
      id:this.dep.id,
      DepartmentName:this.DepartmentName
    }
    this.service.updateDepartment(val).subscribe(res=>{alert(res.toString())})
  }


}
