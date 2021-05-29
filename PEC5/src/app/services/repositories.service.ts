import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Repository} from "../models/repository.interface";

@Injectable({
  providedIn: 'root'
})
export class RepositoriesService {

  constructor(private http: HttpClient) {
  }

  getAllRepositoriesByUser(user: string | null): Observable<Repository[]> {
    return this.http.get<Repository[]>('https://api.github.com/users/' + user + '/repos');
  }

  getRepositoryByUserAndName(user: string | null, name: string | null): Observable<Repository> {
    return this.http.get<Repository>('https://api.github.com/repos/' + user + '/' + name);
  }
}
