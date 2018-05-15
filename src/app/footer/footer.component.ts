import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  currentYear:number = 2018;

  constructor() {
    this.currentYear = (new Date()).getFullYear();
  }

  ngOnInit() {
  }

}
