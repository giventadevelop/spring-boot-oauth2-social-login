import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-web-footer',
  templateUrl: './web-footer.component.html',
  styleUrls: ['./web-footer.component.css', '../../../assets/css/stylesheet.css', '../../../assets/css/form.css',
    '../../../assets/css/ui.css', '../../../assets/css/colorbox.css']
})
export class WebFooterComponent implements OnInit {

  currentYear: number = new Date().getFullYear();
  nextYear: number;

  constructor() { }

  ngOnInit(): void {
    this.nextYear=this.currentYear+1;
  }

}
