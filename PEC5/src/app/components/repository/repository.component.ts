import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RepositoriesService} from "../../services/repositories.service";
import {Repository} from "../../models/repository.interface";

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss']
})
export class RepositoryComponent implements OnInit {
  repository: Repository;

  constructor(private repositoriesService: RepositoriesService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    const user = this.activatedRoute.snapshot.paramMap.get('user');
    const name = this.activatedRoute.snapshot.paramMap.get('name');
    console.log('User -->', user);
    console.log('Name -->', name);

    this.repositoriesService.getRepositoryByUserAndName(user, name).subscribe((repository) => {

      if (!repository) {
        return this.router.navigateByUrl('/');
      }

      this.repository = repository;
      console.log('Repository -->', this.repository)
    });
  }
}
