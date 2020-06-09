import { User } from './user.model';

export class UserSignIn{
    
    constructor(
       public token: string,
       public user:User
       
    ){
       
        
    }
}