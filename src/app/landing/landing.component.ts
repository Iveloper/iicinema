import { Component, OnInit } from '@angular/core';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.less']
})
export class LandingComponent implements OnInit {

  constructor(private render: Renderer2) { }

  ngOnInit(): void {
  }

  animatedHover(e: any, command: string): void {
    if(command == 'show') {
      this.render.addClass(e.target, 'active');
    } else {
      this.render.removeClass(e.target, 'active');
    }
  }
}
