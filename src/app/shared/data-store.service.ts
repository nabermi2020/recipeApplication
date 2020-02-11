import { AuthService } from './../auth/services/auth.service';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  private apiUrl: string = environment.apiUrl;
  

  constructor(private http: HttpClient,
              private authService: AuthService) {}

  public putRecipesOnServer(recipes: Array<Recipe>): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({'Content-type': 'application/json'});
    return this.http.put<Array<Recipe>>(`${this.apiUrl}/recipe.json?auth=${token}`, recipes, { headers });
  }

  public getRecipesFromServer(): Observable<Array<Recipe>> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({'Content-type': 'application/json'});
    return this.http.get<Array<Recipe>>(`${this.apiUrl}/recipe.json?auth=${token}`, { headers });
  }
}
