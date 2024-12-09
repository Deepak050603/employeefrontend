import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  serverUrl:string = "https://employeebackend-nrpj.onrender.com"

  constructor(private http:HttpClient) { }

  addAllemployeeApi(reqBody:any){
    return this.http.post(`${this.serverUrl}/employees`,reqBody)
  }

  getallemployeeApi(){
    return this.http.get(`${this.serverUrl}/employees`)
  }
  removeemployeeApi(id:string){
    return this.http.delete(`${this.serverUrl}/employees/${id}`)
  }

  editemployeeApi(id:string,reqBody:any){
    return this.http.put(`${this.serverUrl}/employees/${id}`,reqBody)
  }

}
