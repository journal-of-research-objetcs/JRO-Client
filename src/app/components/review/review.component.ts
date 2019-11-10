import { Component, Input, OnInit } from '@angular/core';
import { RepoDescriptor } from '../../types';
import { ReposService, UtilityService, StorageService, UserService } from '../../services';
import { MessageService, SelectItem } from 'primeng/api';

@Component({
    selector: 'app-review',
    templateUrl: 'review.component.html',
    styleUrls: ['review.component.scss']
})

export class ReviewComponent implements OnInit {

    public repos: Array<RepoDescriptor> = [];
    public processing: {} = {};
    public papersFamilies: SelectItem[] = [
        { label: 'Notebook', value: 'notebook' },
        { label: 'PDF', value: 'pdf' },
    ];
    public statues: SelectItem[] = [
        { label: 'Published', value: 'published' },
        { label: 'Under Review', value: 'submitted' }
    ];

    public status: string = 'submitted';
    public IAM: { editor: boolean } = { editor: false };

    constructor(protected reposService: ReposService,
        protected utility: UtilityService, protected userService: UserService,
        protected messageService: MessageService,
        protected storageService: StorageService) {
    }

    ngOnInit() {
        this.getRepos();
        this.userService.profile().then(response => {
            if (response && response['role'] && response['role'].lenght) {
                this.IAM.editor = response['role'] = [].find(value => value == 'editor');
            }
        })
    }

    getRepos() {
        this.repos = [];
        this.reposService.getListRepo(this.status).subscribe((repos: Array<RepoDescriptor>) => {
            repos['data'].forEach(repo => {
                repo['issueMsg'] = 'Open a new issue';
                this.repos.push(RepoDescriptor.import(repo))
            });
        });
    }

    goToReview(repo: RepoDescriptor) {
        this.processing[repo.id] = true;
        this.regenerateNb(repo).then(response => {
            this.processing[repo.id] = false;
            let orcid = this.storageService.read('user')['orcid'];
            this.utility.goToJupyter(repo.name, orcid);
        });
        // this.utility.goToMyBinder(repo.name);
    }

    publish(repo: RepoDescriptor) {
        this.processing[repo.id] = true;
        console.log(repo);
        this.reposService.publish(repo['url'], repo.name).subscribe(response => {
            console.log(response);
            this.processing[repo.id] = false;
            setTimeout(() => {
                this.sendNotification('success', 'Repository published successfully');
                this.getRepos();
            }, 1000);
        }, error => {
            this.sendNotification('error', 'Error publishing repository');
            this.processing[repo.id] = false;
        });
    }

    regenerateNb(repo: RepoDescriptor) {
        // console.log(repo);
        return this.reposService.regenerateNb(repo['url'], repo.name).then(response => {
            this.sendNotification('success', 'Repository regenerated successfully');
        }).catch(error => {
            this.sendNotification('error', 'Error regenerating repository');
        });
    }

    sendNotification(severity: string, detail: string) {
        this.messageService.add({
            key: 'notification',
            severity: severity,
            detail: detail,
        });
    }
}
