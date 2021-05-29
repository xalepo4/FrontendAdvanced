import {Component, OnInit} from '@angular/core';
import {Repository} from "../../models/repository.interface";
import {RepositoriesService} from "../../services/repositories.service";

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})
export class RepositoriesComponent implements OnInit {
  repositories: Repository[] = [];

  constructor(private repositoryService: RepositoriesService) {
  }

  ngOnInit(): void {
    this.repositoryService.getAllRepositories().subscribe((repositories) => this.repositories = repositories);
  }
}
