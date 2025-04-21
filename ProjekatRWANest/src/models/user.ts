export class User {
    
    constructor(public id: number, public firstName: string, public lastName: string, public email: string, public username: string, public password: string) {
        id = 0
        firstName = ''
        lastName = ''
        email = ''
        username = ''
        password = ''
    }
}