import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CommonService } from '../api/common.service';

export interface Account{
  csrf_token: string;
  logout_token: string;
  current_user: CurrentUser;
  temp_login: boolean;
  last_login: string
}

export interface CurrentUser{
  name: string;
  uid: string;
  email: string;
  fullname: string;
  //payment_methods: Array<PaymentMethod>;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private _account:Account;

  get account(): Account{
    return this._account;
  }
  set account(account: Account){
    this._account = account;
  }

  constructor(
    public http: HttpClient,
    public co: CommonService,
  ) { }

  getLoginStatus(){
    return this.http.get<Account>(this.co.API+'user/me/null?_format=json',{ withCredentials: true }).pipe(
      map(
        res => { 
          return res;
        },
        (err: HttpErrorResponse) => { 
          //console.log("provema",err);
        }
      )
    );
  }

  login(username:string,password:string){
    let headers = new HttpHeaders({
      'Content-Type':  'application/json',
    });
    let datos =  {
      "name":username,
      "pass":password
    };
    return this.http.post<Account>(
      this.co.API+'user/clogin?_format=json',
      JSON.stringify(datos),
      { headers: headers, withCredentials: true }).pipe(
        map(
          res => { 
            return res;
          },
          (err: HttpErrorResponse) => { 
            console.log(err);
          }
        )
      );
  }

  logout(){
    return this.http.get<Account>(
      this.co.API+'user/clogout?_format=json',
      { withCredentials: true }).pipe(
        map(
          res => { 
            return res;
          },
          (err: HttpErrorResponse) => { 
            //console.log(err);
          }
        )
      );
  }

  getPaises(){
    return this.http.get<Array<any>>(this.co.API+'paises-app/?_format=json',{ withCredentials: true }).pipe(
      map(
        res => { 
          return res;
        },
        (err: HttpErrorResponse) => { 
          console.log(err);
        }
      )
    );
  }

  getPaisById(idPais){
    return this.http.get<Array<any>>(this.co.API+'paises-app/'+idPais+'?_format=json',{ withCredentials: true }).pipe(
      map(
        res => { 
          return res;
        },
        (err: HttpErrorResponse) => { 
          console.log(err);
        }
      )
    );
  }

}