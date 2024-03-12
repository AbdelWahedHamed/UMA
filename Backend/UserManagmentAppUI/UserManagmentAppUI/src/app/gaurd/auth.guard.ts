import { CanActivateFn } from '@angular/router';
import { UserService } from '../Service/Blog/userService/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  

  /*if(userService.logged)
    return true*/

  return false

};
