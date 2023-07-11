import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


export const authGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService);
  const router = inject(Router);

  const access_token = authService.getToken();
  
  
  if( !access_token ){
    router.navigate(['login']);
    return false;
  }
  
  return true;
};




// if( authService.isLogged() ) {
//    console.log( 'logged' )
// } else {
//    console.log( 'notlogged' )
// }