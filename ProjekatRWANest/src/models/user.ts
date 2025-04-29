export class User {
    
    constructor(public userID: number, public admin: boolean, public firstName: string, public lastName: string, public email: string, public username: string, public password: string) {
        userID = 0
        admin = false
        firstName = ''
        lastName = ''
        email = ''
        username = ''
        password = ''
    }
}