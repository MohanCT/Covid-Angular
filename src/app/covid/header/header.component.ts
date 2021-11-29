import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { $ } from 'protractor';
declare var $ : any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    // $("#togNavBut").click(function(){
    //   $("#botNav").addClass("header-toggled");
    // });
    // $("#togNavBut").toggle(
    //   function(){$("p").css({"color": "green"});
    // });

    $('#togNavBut').click(function() {
      if($('#botNav').hasClass('header-toggled')) {
          $('#botNav').removeClass('header-toggled');
      } else {
          $('#botNav').addClass('header-toggled');
      }
      $('#content').toggle();
    });

  }

  // togNavClick(){
  //   $('#botNav').addClass('header-toggled');
  // }

  // navSymp(){
  //   this.router.navigate(["/symptoms"]);
  // }

}
