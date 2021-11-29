import { AfterViewInit, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { CovidserviceService } from 'src/app/covidservice.service';
import { ScriptService } from 'src/app/scriptservice.service';
declare var $ : any;

@Component({
  selector: 'app-tamilnadu',
  templateUrl: './tamilnadu.component.html',
  styleUrls: ['./tamilnadu.component.css']
})
export class TamilnaduComponent implements OnInit,AfterViewInit,OnDestroy {

  constructor(private covidserviceService : CovidserviceService, private scriptService:ScriptService,
    private title: Title,private meta: Meta) { }

  districtList : any = [];
  hospitalList : any = [];
  hospitalItrList : any = [];
  originalHosList : any = [];
  normalBed : boolean = false;
  oxygenBed : boolean = false;
  icuBed : boolean = false;
  selDist : any;
  ngOnInit(): void {
    this.title.setTitle("Available Beds in Tamilnadu - Covid Tracker 19");
    this.scriptService.createCanonicalURL("https://www.covidtracker19.com/tamilnadu");
    this.scriptService.createMetaTag("title", "Available Beds in Tamilnadu - Covid Tracker 19");
    this.scriptService.createMetaTag("description", "Find nearby beds with oxygen support and ICU facilities around Tamilandu for both Goverment hospitals and Private hospitals.");
    this.scriptService.createMetaTag("keywords", "covid bed, tamilnadu bed, covid oxygen,covid icu, tamilnadu hospital,government bed,private hospital bed");
  }

  ngAfterViewInit(){
    
    this.scriptService.load("dtmincss","dtmin").then().finally(()=>{
      this.scriptService.load("jqdtmincss","dtreordercss","dteresponsivecss","dtreorder","dteresponsive").then().finally(()=>{
    this.getDistrictList();
  });
});
  }

  ngOnDestroy() {
    this.meta.removeTag("name='title'");
    this.meta.removeTag("name='description'");
    this.meta.removeTag("name='keywords'");
  }

  getDistrictList(){
    this.covidserviceService.getDistrictList().subscribe(data => {
      this.districtList = data.tamilNaduDisList;
      this.selDist = "5ea0abd2d43ec2250a483a40";
      this.getHospitalList("5ea0abd2d43ec2250a483a40");
    }, error => console.log(error));
  }

  getHospitalList(event:any){
    this.normalBed = false;
    this.oxygenBed = false;
    this.icuBed = false;
    let id;
    if(event.target && event.target.value){
      id = event.target.value;
    } else {
      id = event;
    }
    if(id){
      this.covidserviceService.getHospitalList(id).subscribe(data => {
        if(data && data.hospitalList){
          this.originalHosList = data.hospitalList.tamilNaduHospital;
        this.hospitalList = data.hospitalList.tamilNaduHospital;

        var hospList:any = [];
        this.hospitalList.forEach((element : any) => {
          var temp = [];
          temp[0] = element.hospitalType+" - "+element.hospitalFacilityType+" - "+element.hospitalName;
          temp[1] = element.hospitalAddress;
          temp[2] = element.hospitalMobileNo;
          temp[3] = element.hospitalNormalBeds;
          temp[4] = element.hospitalOxygenBeds;
          temp[5] = element.hospitalIcuBeds;
          temp[6] = element.hospitalTotalBeds;
          temp[7] = element.hospitalLocation;
          hospList.push(temp);
        });
        $('#tnHosList').DataTable({
          data : hospList,
          columns : [{title : "Hospital Name"},{title : "Address:",
            'render': function (data : any, type: any, full : any, meta : any) {
                return '<a target="_blank" href="'+ full[7] +'">'+ data +'</a>';
                },className: "none"},{title : "Mobile No:", className: "none"},
          {title : "Normal Bed:",className: "none"},{title : "Oxygen Bed:",className: "none"},{title : "ICU Bed:",className: "none"},{title : "Total Bed:",className: "none"}],
          "destroy": true,
          responsive: {
            details: {
                display: $.fn.dataTable.Responsive.display.childRowImmediate,
                type: 'inline'
            }
        }
        }); 
      }

      }, error => console.log(error));
    }
  }

changeHospital(){
  if(this.originalHosList && this.originalHosList.length > 0){
    this.hospitalItrList = [];

    if(this.normalBed || this.oxygenBed || this.icuBed){
      if(this.normalBed && this.oxygenBed && this.icuBed){
        this.originalHosList.forEach((element : any) => {
          if(element.hospitalNormalBeds.split("/")[0] != "0" && 
          element.hospitalOxygenBeds.split("/")[0] != "0" &&
          element.hospitalIcuBeds.split("/")[0] != "0"){
            this.hospitalItrList.push(element);
          }
        });  
      } else if(this.normalBed && this.oxygenBed){
        this.originalHosList.forEach((element : any) => {
          if(element.hospitalNormalBeds.split("/")[0] != "0" && 
          element.hospitalOxygenBeds.split("/")[0] != "0"){
            this.hospitalItrList.push(element);
          }
        }); 
      } else if(this.normalBed && this.icuBed){
        this.originalHosList.forEach((element : any) => {
          if(element.hospitalNormalBeds.split("/")[0] != "0" && 
          element.hospitalIcuBeds.split("/")[0] != "0"){
            this.hospitalItrList.push(element);
          }
        });  
      } else if(this.oxygenBed && this.icuBed){
        this.originalHosList.forEach((element : any) => {
          if(element.hospitalOxygenBeds.split("/")[0] != "0" &&
          element.hospitalIcuBeds.split("/")[0] != "0"){
            this.hospitalItrList.push(element);
          }
        });  
      } else if(this.normalBed){
        this.originalHosList.forEach((element : any) => {
          if(element.hospitalNormalBeds.split("/")[0] != "0"){
            this.hospitalItrList.push(element);
          }
        });  
      } else if(this.oxygenBed){
        this.originalHosList.forEach((element : any) => {
          if(element.hospitalOxygenBeds.split("/")[0] != "0"){
            this.hospitalItrList.push(element);
          }
        });  
      } else {
        this.originalHosList.forEach((element : any) => {
          if(element.hospitalIcuBeds.split("/")[0] != "0"){
            this.hospitalItrList.push(element);
          }
        });  
      }
    } else {
      this.hospitalItrList = this.originalHosList;
    }
    this.hospitalList = this.hospitalItrList;

    var hospList:any = [];
    this.hospitalList.forEach((element : any) => {
      var temp = [];
      temp[0] = element.hospitalType+" - "+element.hospitalFacilityType+" - "+element.hospitalName;
      temp[1] = element.hospitalAddress;
      temp[2] = element.hospitalMobileNo;
      temp[3] = element.hospitalNormalBeds;
      temp[4] = element.hospitalOxygenBeds;
      temp[5] = element.hospitalIcuBeds;
      temp[6] = element.hospitalTotalBeds;
      temp[7] = element.hospitalLocation;
      hospList.push(temp);
    });
    $('#tnHosList').DataTable({
      data : hospList,
      columns : [{title : "Hospital Name"},{title : "Address",
        'render': function (data : any, type: any, full : any, meta : any) {
            return '<a target="_blank" href="'+ full[7] +'">'+ data +'</a>';
            },className: "none"},{title : "MobileNo", className: "none"},
      {title : "Normal Bed",className: "none"},{title : "Oxygen Bed",className: "none"},{title : "ICU Bed",className: "none"},{title : "Total Bed",className: "none"}],
      "destroy": true,
      responsive: {
        details: {
            display: $.fn.dataTable.Responsive.display.childRowImmediate,
            type: 'inline'
        }
    }
    }); 


  }

}

}
