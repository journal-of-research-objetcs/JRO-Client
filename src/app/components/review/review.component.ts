import {Component, Input, OnInit} from '@angular/core';
import {RepoDescriptor} from '../../types';
import {ReposService} from '../../services';

@Component({
    selector: 'app-review',
    templateUrl: 'review.component.html',
    styleUrls: ['review.component.scss']
})

export class ReviewComponent implements OnInit {

    public repos: Array<RepoDescriptor> = [];

    constructor(protected reposService: ReposService) {
    }

    ngOnInit() {
        this.repos = [];
        this.reposService.getSubmitedRepo().subscribe(repos => {
            repos.forEach(repo => {
                repo['name'] = '';
                repo['html_url'] = repo['fork_url'];
                this.repos.push(RepoDescriptor.import(repo))
            });
        })
    }

    onButtonClicked() {

    }
}
