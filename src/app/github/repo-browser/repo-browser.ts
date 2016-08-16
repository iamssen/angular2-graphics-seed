import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Github} from '../shared/github';

@Component({
  selector: 'repo-browser',
  styles: [require('./repo-browser.css')],
  template: require('./repo-browser.html'),
})
export class RepoBrowser {
  
  constructor(private router: Router, private github: Github) {
  }
  
  searchForOrg(orgName: string) {
    this.github.getOrg(orgName)
      .subscribe(({name}) => {
        console.log(name);
        this.router.navigate(['/github', orgName]);
      });
  }
  
}
