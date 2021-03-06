import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {User} from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      {
        id: 1,
        name: 'xavi',
        surname: 'ledesma',
        type: 'tourist',
        email: 'xaviledesma@uoc.edu',
        password: '123456789'
      },
      {
        id: 2,
        name: 'paula',
        surname: 'garcia',
        type: 'company',
        email: 'paula@uoc.edu',
        password: '123456789'
      }
    ];
    return {users};
  }

  genId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
  }
}
