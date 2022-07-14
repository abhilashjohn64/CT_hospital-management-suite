import { Directive, HostBinding, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective implements OnInit {
  constructor() {}
  ngOnInit(): void {
    this.resetColor();
  }
  
  resetColor() {
    this.backgroundColor = 'indigo';
    this.color = 'white';
  }

  @HostBinding('style.backgroundColor') backgroundColor: string = '';
  @HostBinding('style.color') color: string = '';

  @HostListener('mouseleave')
  setMouseLeave() {
    this.resetColor();
  }

  @HostListener('mouseenter')
  setMouseEnter() {
    this.backgroundColor = 'white';
    this.color = 'indigo';
  }

  
}
