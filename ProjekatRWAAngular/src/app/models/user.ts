export class User {
    
    constructor(public userID: number, public firstName: string, public lastName: string, public email: string, public username: string, public password: string) {
        userID = 0
        firstName = ''
        lastName = ''
        email = ''
        username = ''
        password = ''
    }
}