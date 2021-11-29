import { ThisReceiver } from '@angular/compiler';
import { AfterViewInit } from '@angular/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CovidserviceService } from 'src/app/covidservice.service';
import { ScriptService } from 'src/app/scriptservice.service';
declare var $ : any;

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(private covidserviceService : CovidserviceService, 
    private router: Router,private route : ActivatedRoute, private meta:Meta, private scriptService:ScriptService, 
    private title:Title) {   }

  covidTotal : any = {};
  covidCountryTotal : any = {};
  covidStateList : any = [];
  countryName = "";  
  covidDayOneList : any = [];
  covidVaccineList : any = [];
  // "Chile"
  countryNameList : any = ["India","US","Australia","Brazil","Canada","China","Colombia","Denmark","Germany","Italy","Netherlands"];
  stateList : any = {"India":{"Bihar":"IN-BR","Puducherry":"IN-PY","Daman and Diu":"IN-DD","Dadra and Nagar Haveli and Daman and Diu":"IN-DN","Delhi":"IN-DL"
  ,"Nagaland":"IN-NL","West Bengal":"IN-WB","Haryana":"IN-HR","Himachal Pradesh":"IN-HP","Assam":"IN-AS","Uttarakhand":"IN-UT","Jharkhand":"IN-JH","Jammu and Kashmir":"IN-JK"
  ,"Uttar Pradesh":"IN-UP","Sikkim":"IN-SK","Mizoram":"IN-MZ","Chhattisgarh":"IN-CT","Chandigarh":"IN-CH","Goa":"IN-GA","Gujarat":"IN-GJ","Rajasthan":"IN-RJ"
  ,"Madhya Pradesh":"IN-MP","Odisha":"IN-OR","Tamil Nadu":"IN-TN","Andaman and Nicobar Islands":"IN-AN","Andhra Pradesh":"IN-AP","Tripura":"IN-TR"
  ,"Arunachal Pradesh":"IN-AR","Karnataka":"IN-KA","Punjab":"IN-PB","Meghalaya":"IN-ML","Manipur":"IN-MN","Maharashtra":"IN-MH","Kerala":"IN-KL","mapCode":"in_merc"},
  "US":{"Virginia":"US-VA","Pennsylvania":"US-PA","Tennessee":"US-TN","West Virginia":"US-WV","Nevada":"US-NV","Texas":"US-TX","New Hampshire":"US-NH"
  ,"New York":"US-NY","Hawaii":"US-HI","Vermont":"US-VT","New Mexico":"US-NM","North Carolina":"US-NC","North Dakota":"US-ND","Nebraska":"US-NE"
  ,"Louisiana":"US-LA","South Dakota":"US-SD","District Of Columbia":"US-DC","Delaware":"US-DE","Florida":"US-FL","Connecticut":"US-CT","Washington":"US-WA"
  ,"Kansas":"US-KS","Wisconsin":"US-WI","Oregon":"US-OR","Kentucky":"US-KY","Maine":"US-ME","Ohio":"US-OH","Oklahoma":"US-OK"
  ,"Idaho":"US-ID","Wyoming":"US-WY","Utah":"US-UT","Indiana":"US-IN","Illinois":"US-IL","Alaska":"US-AK","New Jersey":"US-NJ"
  ,"Colorado":"US-CO","Maryland":"US-MD","Massachusetts":"US-MA","Alabama":"US-AL","Missouri":"US-MO","Minnesota":"US-MN","California":"US-CA"
  ,"Iowa":"US-IA","Michigan":"US-MI","Georgia":"US-GA","Arizona":"US-AZ","Montana":"US-MT","Mississippi":"US-MS","South Carolina":"US-SC"
  ,"Rhode Island":"US-RI","Arkansas":"US-AR","mapCode":"us_lcc"},
  "Australia":{"Australian Capital Territory":"AU-ACT","Western Australia":"AU-WA","Tasmania":"AU-TAS","Victoria":"AU-VIC"
  ,"Northern Territory":"AU-NT","Queensland":"AU-QLD","South Australia":"AU-SA","New South Wales":"AU-NSW","mapCode":"au_merc"},
  "Canada":{"Northwest Territories":"CA-NT","Nunavut":"CA-NU","Nova Scotia":"CA-NS","British Columbia":"CA-BC","Saskatchewan":"CA-SK","Quebec":"CA-QC","Prince Edward Island":"CA-PE","Manitoba":"CA-MB"
  ,"Yukon":"CA-YT","New Brunswick":"CA-NB","Newfoundland and Labrador":"CA-NL","Ontario":"CA-ON","Alberta":"CA-AB","mapCode":"ca_mill"},
  "China":{"Jiangsu":"CN-32","Guizhou":"CN-52","Yunnan":"CN-53","Chongqing":"CN-50","Sichuan":"CN-51","Shanghai":"CN-31","Tibet":"CN-54"
  ,"Zhejiang":"CN-33","Inner Mongolia":"CN-15","Shanxi":"CN-14","Fujian":"CN-","Tianjin":"CN-12","Hebei":"CN-13","Beijing":"CN-11","Anhui":"CN-34"
  ,"Jiangxi":"CN-36","Shandong":"CN-37","Henan":"CN-41","Hunan":"CN-43","Hubei":"CN-42","Guangxi":"CN-45","Guangdong":"CN-44","Hainan":"CN-46"
  ,"Xinjiang":"CN-65","Ningxia":"CN-64","Qinghai":"CN-63","Gansu":"CN-62","Shaanxi":"CN-61","Heilongjiang":"CN-23","Jilin":"CN-22","Liaoning":"CN-21","mapCode":"cn_mill"},
  "Colombia":{"Valle del Cauca":"CO-VAC","Bolívar":"CO-BOY","Cesar":"CO-COR","Huila":"CO-HUI","Vaupés":"CO-VAU","Norte de Santander":"CO-NSA","Risaralda":"CO-RIS","Vichada":"CO-VID"
  ,"Bogotá":"CO-BOL","Chocó":"CO-CUN","Guaviare":"CO-GUV","Casanare":"CO-CAU","Caquetá":"CO-CAS","Caldas":"CO-CAQ","Cauca":"CO-CES","Santander":"CO-SAN","Atlántico":"CO-ATL"
  ,"Amazonas":"CO-AMA","Meta":"CO-MET","Magdalena":"CO-MAG","Arauca":"CO-ARA","Guainía":"CO-GUA","San Andrés y Provincia":"CO-SAP","Boyacá":"CO-CAL","Quindío":"CO-QUI","La Guajira":"CO-LAG"
  ,"Tolima":"CO-TOL","Sucre":"CO-SUC","Putumayo":"CO-PUT","Nariño":"CO-NAR","Córdoba":"CO-CHO","Cundinamarca":"CO-DC","Antioquia":"CO-ANT","mapCode":"co_mill"},
  "Germany":{"Berlin":"DE-BE","Saxony-Anhalt":"DE-ST","Rhineland-Palatinate":"DE-RP","Brandenburg":"DE-BB","Lower Saxony":"DE-NI","Mecklenburg-Western Pomerania":"DE-MV","Thuringia":"DE-TH","Baden-Wuerttemberg":"DE-BW","Hamburg":"DE-HH"
  ,"Schleswig-Holstein":"DE-SH","North Rhine-Westphalia":"DE-NW","Saxony":"DE-SN","Bremen":"DE-HB","Saarland":"DE-SL","Bavaria":"DE-BY","Hesse":"DE-HE","mapCode":"de_mill"},
  "Italy":{"Valle d'Aosta":"IT-23","Piemonte":"IT-21","Lombardia":"IT-25","Toscana":"IT-52","Friuli Venezia Giulia":"IT-36","Liguria":"IT-42","Emilia-Romagna":"IT-45","Marche":"IT-57","P.A. Trento":"IT-32"
  ,"Umbria":"IT-55","Molise":"IT-67","Veneto":"IT-34","Abruzzo":"IT-65","Lazio":"IT-62","Puglia":"IT-75","Basilicata":"IT-77","Calabria":"IT-78","Sicilia":"IT-82"
  ,"Campania":"IT-72","Sardegna":"IT-88","mapCode":"it_regions_mill"}
  };
  emptyStateList : any = {"India":{"IN-BR":0,"IN-PY":0,"IN-DD":0,"IN-DN":0,"IN-DL":0
  ,"IN-NL":0,"IN-WB":0,"IN-HR":0,"IN-HP":0,"IN-AS":0,"IN-UT":0,"IN-JH":0,"IN-JK":0
  ,"IN-UP":0,"IN-SK":0,"IN-MZ":0,"IN-CT":0,"IN-CH":0,"IN-GA":0,"IN-GJ":0,"IN-RJ":0
  ,"IN-MP":0,"IN-OR":0,"IN-TN":0,"IN-AN":0,"IN-AP":0,"IN-TR":0
  ,"IN-AR":0,"IN-KA":0,"IN-PB":0,"IN-ML":0,"IN-MN":0,"IN-MH":0,"IN-KL":0},
  "US":{"US-VA":0,"US-PA":0,"US-TN":0,"US-WV":0,"US-NV":0,"US-TX":0,"US-NH":0
  ,"US-NY":0,"US-HI":0,"US-VT":0,"US-NM":0,"US-NC":0,"US-ND":0,"US-NE":0
  ,"US-LA":0,"US-SD":0,"US-DC":0,"US-DE":0,"US-FL":0,"US-CT":0,"US-WA":0
  ,"US-KS":0,"US-WI":0,"US-OR":0,"US-KY":0,"US-ME":0,"US-OH":0,"US-OK":0
  ,"US-ID":0,"US-WY":0,"US-UT":0,"US-IN":0,"US-IL":0,"US-AK":0,"US-NJ":0
  ,"US-CO":0,"US-MD":0,"US-MA":0,"US-AL":0,"US-MO":0,"US-MN":0,"US-CA":0
  ,"US-IA":0,"US-MI":0,"US-GA":0,"US-AZ":0,"US-MT":0,"US-MS":0,"US-SC":0
  ,"US-RI":0},
  "Australia":{"AU-ACT":0,"AU-WA":0,"AU-TAS":0,"AU-VIC":0
  ,"AU-NT":0,"AU-QLD":0,"AU-SA":0,"AU-NSW":0},
  "Canada":{"CA-NT":0,"CA-NU":0,"CA-NS":0,"CA-BC":0,"CA-SK":0,"CA-QC":0,"CA-PE":0,"CA-MB":0
  ,"CA-YT":0,"CA-NB":0,"CA-NL":0,"CA-ON":0,"CA-AB":0},
  "China":{"CN-32":0,"CN-52":0,"CN-53":0,"CN-50":0,"CN-51":0,"CN-31":0,"CN-54":0
  ,"CN-33":0,"CN-15":0,"CN-14":0,"CN-":0,"CN-12":0,"CN-13":0,"CN-11":0,"CN-34":0
  ,"CN-36":0,"CN-37":0,"CN-41":0,"CN-43":0,"CN-42":0,"CN-45":0,"CN-44":0,"CN-46":0
  ,"CN-65":0,"CN-64":0,"CN-63":0,"CN-62":0,"CN-61":0,"CN-23":0,"CN-22":0,"CN-21":0},
  "Colombia":{"CO-VAC":0,"CO-BOY":0,"CO-COR":0,"CO-HUI":0,"CO-VAU":0,"CO-NSA":0,"CO-RIS":0,"CO-VID":0
  ,"CO-BOL":0,"CO-CUN":0,"CO-GUV":0,"CO-CAU":0,"CO-CAS":0,"CO-CAQ":0,"CO-CES":0,"CO-SAN":0,"CO-ATL":0
  ,"CO-AMA":0,"CO-MET":0,"CO-MAG":0,"CO-ARA":0,"CO-GUA":0,"CO-SAP":0,"CO-CAL":0,"CO-QUI":0,"CO-LAG":0
  ,"CO-TOL":0,"CO-SUC":0,"CO-PUT":0,"CO-NAR":0,"CO-CHO":0,"CO-DC":0,"CO-ANT":0},
  "Germany":{"DE-BE":0,"DE-ST":0,"DE-RP":0,"DE-BB":0,"DE-NI":0,"DE-MV":0,"DE-TH":0,"DE-BW":0,"DE-HH":0
  ,"DE-SH":0,"DE-NW":0,"DE-SN":0,"DE-HB":0,"DE-SL":0,"DE-BY":0,"DE-HE":0,},
  "Italy":{"IT-23":0,"IT-21":0,"IT-25":0,"IT-52":0,"IT-36":0,"IT-42":0,"IT-45":0,"IT-57":0,"IT-32":0
  ,"IT-55":0,"IT-67":0,"IT-34":0,"IT-65":0,"IT-62":0,"IT-75":0,"IT-77":0,"IT-78":0,"IT-82":0
  ,"IT-72":0,"IT-88":0}
  };
  countryDayOneList : any = ["India","Brazil","Chile","Colombia","Germany","Italy"];
  private scripts: any = {};
  noCountryMap =["Brazil","Chile","Denmark","Netherlands"];
  metaDescription = "";

  ngOnInit(): void {
    this.countryName = this.route.snapshot.params.id;
    this.covidTotal = {totalCases:0, totalRecovered:0, totalDeaths:0, totalActiveCases:0,totalNewCases:0,totalNewDeaths:0};
    this.covidCountryTotal = {countryName :"", totalCases:0, totalRecovered:0, totalDeaths:0, totalActiveCases:0};
    
    if(this.countryName){
      this.countryName = this.getCapsLetter(this.countryName);
      if(this.countryNameList.includes(this.countryName)){
        this.title.setTitle("COVID Tracker 19 | Live updates in "+this.countryName);
        this.scriptService.createCanonicalURL("https://www.covidtracker19.com/country/"+this.countryName);
        if(this.noCountryMap.includes(this.countryName)){
          this.metaDescription = "Find live COVID status updates in "+this.countryName+" with up to date cases and vaccination counts with COVID Tracker 19."
        } else {
          this.metaDescription = "Find live COVID status updates in "+this.countryName+" with up to date cases, vaccination counts and maps with COVID Tracker 19."
        }
        this.scriptService.createMetaTag("title","COVID Tracker 19 | Live updates in "+this.countryName);
        this.scriptService.createMetaTag("description",this.metaDescription);
        this.scriptService.createMetaTag("keywords","covid "+this.countryName+" case, "+this.countryName+" covid map, today "+this.countryName+" covid, covid count "+this.countryName+", covid death in "+this.countryName+", "+this.countryName+" corona tracker, corona in "+this.countryName+", "+this.countryName+" covid update, "+this.countryName+" vaccination count, coronavirus in "+this.countryName+", "+this.countryName+" covid tracker");

        // this.getTotalCovidCases();

      } else {
        this.router.navigate([""]);
      }
    } else {
      this.router.navigate([""]);
    }
  }

  ngAfterViewInit(){
    if(this.countryNameList.includes(this.countryName)){
      this.scriptService.load("dtmincss","dtmin").then().finally(()=>{
      this.scriptService.load("Jvectorjscss","jqdtmincss","dtreordercss","dteresponsivecss","dtreorder","dteresponsive").then().finally(()=>{
        this.getCountryList();
        if(this.countryDayOneList.includes(this.countryName)){
          this.getDayOneTotal();
        }
        this.getCountryVaccine();
      });
    });
    } 
  }

  
  ngOnDestroy(){
    this.meta.removeTag("name='title'");
    this.meta.removeTag("name='description'");
    this.meta.removeTag("name='keywords'");
  }

  getTotalCovidCases(){
    this.covidserviceService.getTotalCovidCases().subscribe( data => {
      this.covidTotal = data.covidTotal;
    },error => console.log(error));
  }
  getCountryList(){
    var country = this.countryName;
    this.covidserviceService.getCountryList(country).subscribe( data => {
      if(data && data.response){
        this.covidStateList = data.response.covidCountryList.covidStateList;
         delete data.response.covidCountryList["covidStateList"];
        this.covidCountryTotal = data.response.covidCountryList;
          if(!this.noCountryMap.includes(this.countryName)){
          this.scriptService.loadScript("Jvectorjs").then().finally(() => {
            this.scriptService.loadScript(this.countryName).then().finally(() =>
            this.getMapData());
          });

        }
        setTimeout(function () {
          $(function () {
            $('#stateList').DataTable({
              responsive: true,
              "order": [],
              "destroy": true
            });
          });
        }, 500);
      }
      
    },error => console.log(error));
  }


  getCapsLetter(value : string) : string{
    if(value == "us" || value == "Us"){
      return value.toUpperCase();
    } else {
      return value.charAt(0).toUpperCase()+ value.slice(1);
    }
  }

  getMapData(){
    var mapStateCode : any = {};
    var mapStateList : any = {};
    var num = 50;
   this.covidStateList.forEach((element : any)=> {
    mapStateCode[this.stateList[this.countryName][element.stateName]] = num + 1;
    mapStateList[this.stateList[this.countryName][element.stateName]] = element;
    num ++;
   });

         $('#countryMap').vectorMap({
           map: this.stateList[this.countryName]["mapCode"],
           backgroundColor:  "#FFFFFF",
           series: {
             regions: [{
               values: mapStateCode,
               scale: ['#C8EEFF', '#0071A4'],
               normalizeFunction: 'polynomial'
             }]
           },
          //  zoomOnScroll: false,
           onRegionTipShow: function(e : any, el : any, code : any){
             if(mapStateList[code] != undefined){
               el.html(el.html()+'<br> (Total Cases - '+mapStateList[code]['totalCases'].toLocaleString()+')'+'<br> (Total Recovered - '+mapStateList[code]['totalRecovered'].toLocaleString()+')'
             +'<br> (Total Deaths - '+mapStateList[code]['totalDeaths'].toLocaleString()+')'+'<br> (Active Cases - '+mapStateList[code]['totalActiveCases'].toLocaleString()+')');
             } else {
               el.html(el.html());
             }
           }
         });
  }

  getDayOneTotal(){
    this.covidserviceService.getDayOneTotal(this.countryName).subscribe( data => {
      if(data && data.response){
        this.covidDayOneList = data.response.covidDayOne;
        setTimeout(function () {
          $(function () {
            $('#dayOneList').DataTable({
              responsive: true,
              "order": [],
              "destroy": true
            });
          });
        }, 500);
      }
        
    },error => console.log(error));
  }

  getCountryVaccine(){
    this.covidserviceService.getCountryVaccine(this.countryName).subscribe( data => {
      if(data && data.response){
        this.covidVaccineList = data.response.covidVaccine;
        setTimeout(function () {
          $(function () {
            $('#vaccineList').DataTable({
              responsive: true,
              "order": [],
              "destroy": true
            });
          });
        }, 500);
      }
        
    },error => console.log(error));
  }


  convertDateFormat(value : string) : string{
    if(value){
      var date = new Date(value);
      return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    } else {
      return "";
    }
  }


}
