import { User } from './../_interfaces/User';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl='https://localhost:5001/api/';
  private CurrenUserSource = new ReplaySubject<User>(1);
  public CurrentUser$ = this.CurrenUserSource.asObservable();

  constructor(private http:HttpClient) { }

  login(model: any){
    return this.http.post(this.baseUrl+'account/login',model).pipe(
      map((response:User)=>{
        const user = response;
        if(user != null)
        {
          localStorage.setItem('user',JSON.stringify(user));
          this.setCurrentUser(user);
        }  
      })
    );
  }

  setCurrentUser(user: User){
    this.CurrenUserSource.next(user);
  }

  logout()
  {
    localStorage.removeItem('user');
    this.CurrenUserSource.next(null);
  }

  register(model: any){
    return this.http.post(this.baseUrl+'account/register',model).pipe(
      map((user: User)=>{
        localStorage.setItem('user',JSON.stringify(user));
        this.setCurrentUser(user);
        return user;
      })
    )
  }


}
