import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';


@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css']
})
export class AddEditEmpComponent implements OnInit {

  constructor(private service:SharedService){}



  @Input() emp:any;
  id:string='';
  EmployeeName:string='';
  Department:string='';
  DateOfJoin:string='';
  PhotoFileName:string='';
  PhotoFilePath:string='';

  DepartmentList:any=[];





  ngOnInit(): void {
    this.loadDepartmentList()
    
  }
  loadDepartmentList(){
    this.service.getDepList().subscribe((data:any)=>{
      this.DepartmentList=data

      this.id=this.emp.id
      this.EmployeeName=this.emp.EmployeeName
      this.Department=this.emp.Department
      this.DateOfJoin=this.emp.DateOfJoin
      this.PhotoFileName=this.emp.PhotoFileName
      this.PhotoFilePath=this.service.PhotoUrl + this.PhotoFileName
    });
  }


  addEmp(){
    var val ={
      id:this.id,
      EmployeeName:this.EmployeeName,
      Department:this.Department,
      DateOfJoin:this.DateOfJoin,
      PhotoFileName:this.PhotoFileName

    }
    this.service.addEmployee(val).subscribe(res=>{alert(res.toString())})
  }

  updateEmp(){
    var val ={
      id:this.id,
      EmployeeName:this.EmployeeName,
      Department:this.Department,
      DateOfJoin:this.DateOfJoin,
      PhotoFileName:this.PhotoFileName
    }
    
    this.service.updateEmployee(val).subscribe(res=>{alert(res.toString())})
  }

  uploadPhoto(event:any){
    var file = event.target.files[0]
    const formData:FormData=new FormData()
    formData.append('uploadedFile',file,file.name)

    this.service.uploadPhoto(formData).subscribe((data:any)=>{this.PhotoFileName=data.toString()
    this.PhotoFilePath=this.service.PhotoUrl+this.PhotoFileName
    }
    )

  }



}



