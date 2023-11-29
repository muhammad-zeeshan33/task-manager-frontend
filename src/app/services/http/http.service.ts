import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GenericHttpService {  
  
  constructor(
    private http: HttpClient,    
  ) {}
  
    getHeaders() {
        const getToken = localStorage.getItem('token');        
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', `Bearer ${getToken}`);
        return headers;
    }

  url: string = 'http://localhost:3000';  
    get(url: string) {
        return this.http
        .get(`${this.url}${url}`, { headers: this.getHeaders() })      
    }

    post(url: string, data: any) {
        return this.http
        .post(`${this.url}${url}`, data, { headers: this.getHeaders() })      
    }

    put(url: string, data: any) {
        return this.http
        .put(`${this.url}${url}`, data, { headers: this.getHeaders() })      
    }

    delete(url: string) {
        return this.http
        .delete(`${this.url}${url}`, { headers: this.getHeaders() })      
    }

    
  
}
