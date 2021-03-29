import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {User} from '../../profile/models/user';
import {Activity} from '../../activities/models/activity';


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
        type: 'company',
        email: 'xaviledesma@uoc.edu',
        password: '123456789',
        education: [
          {
            id: 1,
            type: 'titulo universitario',
            level: 'grado',
            name: 'sistemas tic',
            university: 'UPC',
            finishDate: '01/01/2018'
          }
        ]
      },
      {
        id: 2,
        name: 'paula',
        surname: 'garcia',
        type: 'tourist',
        email: 'paula@uoc.edu',
        password: '123456789',
        education: []
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
        peopleRegistered: 14,
        companyId: 1
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
        peopleRegistered: 1,
        companyId: 2
      }
    ];

    return {users, activities};
  }

  genId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
  }

  getId(activities: Activity[]): number {
    return activities.length > 0 ? Math.max(...activities.map(activity => activity.id)) + 1 : 1;
  }
}
