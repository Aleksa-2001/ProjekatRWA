export class User {
    
    constructor(
        public userID: number, 
        public admin: boolean, 
        public firstName: string, 
        public lastName: string, 
        public address: string, 
        public city: string, 
        public email: string, 
        public username: string, 
        public password: string
    ) {
        userID = 0
        admin = false
        firstName = ''
        lastName = ''
        address = ''
        city = ''
        email = ''
        username = ''
        password = ''
    }
}