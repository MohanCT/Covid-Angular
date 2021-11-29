import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
declare var $:any ;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(){   }
  
  ngOnInit(){
  }

  onActivate() {
    window.scroll(0,0);
}


}
