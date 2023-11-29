import { Injectable } from '@angular/core';
import { GenericHttpService } from '../services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: GenericHttpService) { }

  getProfile(id: number) {
    return this.httpClient.get('/users/'+id);
  }

  updateProfile(userId: any, profile: any) {
    return this.httpClient.post(`/users/${userId}`, profile);
  }

  updatePassword(payload: any) {
    return this.httpClient.post(`/auth/update-password`, payload);
  }
}
