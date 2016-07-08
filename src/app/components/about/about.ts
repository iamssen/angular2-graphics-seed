import {Component} from '@angular/core';
import {Http} from '@angular/http';


@Component({
  selector: 'about',
  pipes: [],
  providers: [],
  directives: [],
  styles: [require('./about.css')],
  template: require('./about.html')
})
export class About {

  constructor(http: Http) {

  }

  ngOnInit() {

  }
}
