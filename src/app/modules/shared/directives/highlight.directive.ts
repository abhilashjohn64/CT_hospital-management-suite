import { Directive, HostBinding, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective implements OnInit {
  constructor() {}
  ngOnInit(): void {
    this.backgroundColor = '#080808';
    this.textColor = 'white';
  }

  resetColor() {
    this.backgroundColor = this.backgroundColor === '#080808' ? 'white' : '#080808';
    this.textColor = this.textColor === 'white'? "#080808" :'white'
  }

  @HostBinding('style.backgroundColor') backgroundColor: string = '';
  @HostBinding('style.color') textColor: string = '';

  @HostListener('mouseleave')
  setMouseLeave() {
    this.resetColor();
  }

  @HostListener('mouseenter')
  setMouseEnter() {
    this.resetColor();
  }



}
