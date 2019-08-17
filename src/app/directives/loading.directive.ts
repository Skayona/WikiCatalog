import { Directive, Input, ElementRef, OnChanges, SimpleChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appLoading]'
})
export class LoadingDirective implements OnChanges {
  @Input() appLoading: boolean;

  constructor(
    public el: ElementRef,
    public renderer: Renderer2
  ) { }

  ngOnChanges(value: SimpleChanges) {
    if (value.appLoading) {
      const loading = value.appLoading.currentValue;
      this.renderer[loading ? 'addClass' : 'removeClass'](this.el.nativeElement, 'loading');
    }
  }
}
