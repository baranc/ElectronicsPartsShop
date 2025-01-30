import { inject, Injectable } from '@angular/core';
import { forkJoin, tap } from 'rxjs';
import { AccountService } from '../services/accountService';

@Injectable({
  providedIn: 'root'
})
export class InitService {
  private accountService = inject(AccountService);

  init() {

    return forkJoin({
      user: this.accountService.getUserInfo()
    })
  }


}
