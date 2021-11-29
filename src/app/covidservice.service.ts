import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CovidserviceService {

  private baseUrl = 'http://localhost:1111';
  // private baseUrl = '.';  

  constructor(private http : HttpClient) { }

  getTotalCovidCases(): Observable<any> {  
    return this.http.get(`${this.baseUrl}`+'/covidApi/getTotalCovidCases');  
  } 

  getTotalCountryCovidCases(): Observable<any> {  
    return this.http.get(`${this.baseUrl}`+'/covidApi/getTotalCountryCovidCases');  
  } 

  getCountryList(countryName : any): Observable<any> {  
    return this.http.post(`${this.baseUrl}`+'/covidApi/getCountryList',{"countryName":countryName});  
  } 

  getContinents(): Observable<any> {  
    return this.http.get(`${this.baseUrl}`+'/covidApi/getContinents');  
  } 
  getDayOneTotal(countryName : any): Observable<any> {  
    return this.http.post(`${this.baseUrl}`+'/covidApi/getDayOneTotal',{"countryName":countryName});  
  } 

  getCountryVaccine(countryName : any): Observable<any> {  
    return this.http.post(`${this.baseUrl}`+'/covidApi/getCountryVaccine',{"countryName":countryName});  
  }

  getGlobalVaccine(): Observable<any> {  
    return this.http.post(`${this.baseUrl}`+'/covidApi/getGlobalVaccine',{});  
  }

  getDistrictList(): Observable<any> {  
    return this.http.post(`${this.baseUrl}`+'/covidApi/getDistrictList',{});  
  }
  
  getHospitalList(id : String): Observable<any> {  
    return this.http.post(`${this.baseUrl}`+'/covidApi/getHospitalList',{"id":id});  
  }

}
