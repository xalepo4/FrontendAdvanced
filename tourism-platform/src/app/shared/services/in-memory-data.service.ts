import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {User} from '../models/user';
import {Activity} from '../models/activity';


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

    const activities = [
      {
        id: 1,
        name: 'Museo Picaso',
        category: 'Cultura y patrimonio',
        description: 'Visita guiada',
        subcategory: 'Museo',
        language: 'ES',
        price: 12,
        date: '23/09/2020',
        peopleRegistered: 14
      },
      {
        id: 2,
        name: 'Museo Dalí',
        category: 'Cultura y patrimonio',
        description: 'Visita guiada',
        subcategory: 'Museo',
        language: 'ES',
        price: 12,
        date: '25/09/2020',
        peopleRegistered: 1
      }
    ];

    return {users, activities};
  }

  genId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
  }

  getId(activities: Activity[]): number {
    return activities.length > 0 ? Math.max(...activities.map(user => user.id)) + 1 : 1;
  }
}
