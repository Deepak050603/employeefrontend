import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ApiserviceService } from './services/apiservice.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'frontend';
  employees :any[] = []
  emp:any[]=[]
  user:any[]=[]
  empid:any = ""
  add:string=""
  status:string="All"
  

  empdetailsGroup = new FormGroup({
    name: new FormControl("",Validators.required),
    age: new FormControl("",Validators.required),
    status: new FormControl("",Validators.required),
    email: new FormControl("",Validators.required),
  
  })
  ngOnInit(): void {
    this.getallemployee()
  }
  constructor(private api:ApiserviceService){}

  addemployee(){
    if(this.empdetailsGroup.invalid){
      alert('please fill the form completely')
    }else{
      this.api.addAllemployeeApi(this.empdetailsGroup.value).subscribe({
        next:(result:any)=>{
          console.log(result);
          alert('employee added succesfully')
          this.getallemployee()
          this.empdetailsGroup.reset()
          
          
        },
        error:(err:any)=>{
          console.log(err);
          
        }
      })
    }
  }

  getallemployee(){
    this.api.getallemployeeApi().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.employees= res
        this.emp=res
        
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  removeemployee(id:string){
    this.api.removeemployeeApi(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        alert('deleted successfully')
        this.getallemployee()
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  editemployee(id:string){
    this.empid=id
    this.user=this.employees.filter((item:any)=>item.id==id)
    this.empdetailsGroup.setValue({
      name:this.user[0].name,
      age:this.user[0].age,
      status:this.user[0].status,
      email:this.user[0].email
    })
     this.add="false"

    

  }

  handleupdate(){
    console.log();
    
    this.api.editemployeeApi(this.empid,this.empdetailsGroup.value).subscribe({
      next:(res:any)=>{
        console.log(res);
        alert('updated succesfully')
        this.employees=res
        this.getallemployee()
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  handlebutton(){
    this.add="true"
  }
  handleclose(){
    this.empdetailsGroup.reset()
  }

  filter(){
    if(this.status=='All'){
      this.employees=this.emp
    }
    else{
      this.employees=this.emp.filter((item:any)=>item.status==this.status)
    }
  }
 
}
