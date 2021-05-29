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

  getAllRepositories(): Observable<Repository[]> {
    return this.http.get<Repository[]>('https://api.github.com/users/xalepo4/repos');
  }

  getRepositoryByName(name: string | null): Observable<Repository> {
    return this.http.get<Repository>('https://api.github.com/repos/xalepo4/' + name);
  }
}
