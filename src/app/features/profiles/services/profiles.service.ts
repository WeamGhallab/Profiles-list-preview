import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { HttpService } from 'src/app/core/services/http.service';
import { Profile } from '../models/profiles.model';

@Injectable({ providedIn: 'root' })
export class ProfilesService {

  constructor(private _httpService: HttpService) {}

  getProfilesList(): Observable<any> {
    return this._httpService.get('Data.json');
  }

  getProfleById(name) {
    return this._httpService.get(`Data/${name}.json`);
  }
}
