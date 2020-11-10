import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) {

    this.getBearer();
   }

  rootURL = 'http://ec2-18-216-0-112.us-east-2.compute.amazonaws.com:8080';
  //  rootURL = 'http://localhost:8080';
  token = '';
  body = '{"username": "admin", "password": "admin"}'


  getBearer(){

    console.log('HERE')
    const body = JSON.parse(this.body);

 
    let observable = this.http
  .post<any>(this.rootURL + '/login', body , {
   observe: 'response'
});

observable.subscribe(resp => {


  this.token=resp.body.token;

  
}



);


  }

  getUsers() {

   
    

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
    })

    

    return this.http.get(this.rootURL + '/clients', {headers: headers});
  }


  addUser(user: any) {

    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
    })

    return this.http.post(this.rootURL + '/clients', JSON.stringify(user), {headers: headers});
  }

}
