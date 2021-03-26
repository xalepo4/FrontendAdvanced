import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Activity} from '../models/activity';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private activitiesUrl = 'api/activities';
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  /** GET activities from the server */
  getActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.activitiesUrl)
      .pipe(
        catchError(this.handleError<Activity[]>('getActivities', []))
      );
  }

  /** GET activity by id. Return `undefined` when id not found */
  getActivity(id: number): Observable<Activity> {
    const url = `${this.activitiesUrl}/${id}`;
    return this.http.get<Activity>(url).pipe(
      map(activities => activities[0]),
      catchError(this.handleError<Activity>(`getActivity id=${id}`))
    );
  }

  /** PUT: update the activity on the server */
  updateActivity(activity: Activity): Observable<any> {
    return this.http.put(this.activitiesUrl, activity, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateActivity'))
    );
  }

  /** POST: add a new activity to the server */
  addActivity(activity: Activity): Observable<Activity> {
    return this.http.post<Activity>(this.activitiesUrl, activity, this.httpOptions).pipe(
      catchError(this.handleError<Activity>('addActivity'))
    );
  }

  /** DELETE: delete the activity from the server */
  deleteActivity(activity: Activity | number): Observable<Activity> {
    const id = typeof activity === 'number' ? activity : activity.id;
    const url = `${this.activitiesUrl}/${id}`;

    return this.http.delete<Activity>(url, this.httpOptions).pipe(
      catchError(this.handleError<Activity>('deleteActivity'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
