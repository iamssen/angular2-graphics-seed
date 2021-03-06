import {Component, OnInit} from '@angular/core';
import {Github} from '../shared/github';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'repo-list',
  styles: [require('./repo-list.css')],
  template: require('./repo-list.html'),
})
export class RepoList implements OnInit {
  org: string;
  repos: Observable<any>;
  
  constructor(public github: Github, private route: ActivatedRoute) {
  }
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.org = params['org'];
      if (this.org) {
        this.repos = this.github.getReposForOrg(this.org);
      }
    });
  }
}
