import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CovidserviceService } from 'src/app/covidservice.service';
import { ScriptService } from 'src/app/scriptservice.service';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(private covidserviceService: CovidserviceService, private router: Router, private meta: Meta,
    private scriptService: ScriptService, private title: Title) {
  }

  covidTotal: any = {};
  covidCountryList: any = [];
  covidContinent: any = [];
  covidVaccine: any = [];

  ngOnInit(): void {
    this.title.setTitle("COVID Tracker 19 | Live Coronavirus Updates");
    this.scriptService.createCanonicalURL("https://www.covidtracker19.com");
    this.scriptService.createMetaTag("title", "COVID Tracker 19 | Live Coronavirus Updates");
    this.scriptService.createMetaTag("description", "Find live COVID status updates in world with up to date cases, vaccination counts and maps with COVID Tracker 19.");
    this.scriptService.createMetaTag("keywords", "covid tracker, corona tracker, covid-19, covid near me, covid 19 map, covid update, covid death rate, covid deaths, covid 19 update, coronavirus case, covid case, covid count,covid vaccination count");
    this.covidTotal = { totalCases: "", totalRecovered: "", totalDeaths: "", totalActiveCases: "", totalNewCases: "", totalNewDeaths: "" };
    this.getTotalCovidCases();
  }

  ngAfterViewInit(){
    this.scriptService.load("dtmincss","dtmin").then().finally(()=>{
      this.scriptService.load("Jvectorjscss","dtmincss","jqdtmincss","dtreordercss","dteresponsivecss","dtmin","dtreorder","dteresponsive").then().finally(()=>{
        this.getTotalCountryCovidCases();
        this.getContinents();
        this.getGlobalVaccine();
      });
    });
  }

  

  ngOnDestroy() {
    this.meta.removeTag("name='title'");
    this.meta.removeTag("name='description'");
    this.meta.removeTag("name='keywords'");
  }


  getTotalCovidCases() {
    this.covidserviceService.getTotalCovidCases().subscribe(data => {
      this.covidTotal = data.covidTotal;
    }, error => console.log(error));
  }

  getContinents() {
    this.covidserviceService.getContinents().subscribe(data => {
      this.covidContinent = data.covidContinents;
      setTimeout(function () {
        $(function () {
          $('#continentList').DataTable({
            responsive: true,
            "order": [],
            "paging": false,
            "destroy": true
          });
        });
      }, 500);
    }, error => console.log(error));
  }

  getTotalCountryCovidCases() {
    this.covidserviceService.getTotalCountryCovidCases().subscribe(data => {
      this.covidCountryList = data.covidCountry;

      this.scriptService.loadScript("Jvectorjs").then().finally(() => {
        this.scriptService.loadScript("World").then().finally(() =>
          this.getWorldMapData());
      });

      setTimeout(function () {
        $(function () {
          $('#countryList').DataTable({
            responsive: true,
            "order": [],
            "destroy": true
          });
        });
      }, 500);
    }, error => console.log(error));
  }

  getWorldMapData() {


    // var scrollEnabling = $('#world-map');
    //     $(scrollEnabling).click(function(e) {
    //         e.preventDefault();
    //         $('#world-map').toggleClass("enabled");
    //         if ($('#world-map').is(".enabled")) {
    //             map.setOptions({
    //                 'scrollwheel': true
    //             });
    //         } else {
    //             map.setOptions({
    //                 'scrollwheel': false
    //             });
    //         }
    //     })


    var mapCountryCode: any = {};
    var mapCountryList: any = {};
    var num = 50;
    this.covidCountryList.forEach((element: any) => {
      mapCountryCode[element.countryCode] = num + 1;
      mapCountryList[element.countryCode] = element;
      num++;
    });

    $('#world-map').vectorMap({
      map: 'world_mill',
      backgroundColor: "#FFFFFF",
      series: {
        regions: [{
          values: mapCountryCode,
          scale: ['#C8EEFF', '#0071A4'],
          normalizeFunction: 'polynomial'
        }]
      },
      scrollwheel: false,
      //  zoomOnScroll: false,
      //  dragging: false,
      //  tap: false,
      onRegionTipShow: function (e: any, el: any, code: any) {
        if (mapCountryList[code] != undefined) {
          el.html(el.html() + '<br> (Total Cases - ' + mapCountryList[code]['totalCases'].toLocaleString() + ')' + '<br> (Total Recovered - ' + mapCountryList[code]['totalRecovered'].toLocaleString() + ')'
            + '<br> (Total Deaths - ' + mapCountryList[code]['totalDeaths'].toLocaleString() + ')' + '<br> (Active Cases - ' + mapCountryList[code]['totalActiveCases'].toLocaleString() + ')');
        } else {
          el.html(el.html());
        }
      }
    });
  }

  routeCountry(countryName: String) {
    this.router.navigate(['/country/' + countryName]);
  }

  getGlobalVaccine() {
    this.covidserviceService.getGlobalVaccine().subscribe(data => {
      this.covidVaccine = data.covidVaccine;
      setTimeout(function () {
        $(function () {
          $('#globalVaccine').DataTable({
            responsive: true,
            "order": [],
            "destroy": true
          });
        });
      }, 500);
    }, error => console.log(error));
  }


  convertDateFormat(value: string): string {
    if (value) {
      var date = new Date(value);
      return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    } else {
      return "";
    }
  }

}
