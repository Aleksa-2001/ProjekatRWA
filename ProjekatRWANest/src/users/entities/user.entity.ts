import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    userID: number

    @Column()
    admin: boolean

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    email: string

    @Column()
    username: string

    @Column()
    password: string

    //constructor(userID: number, admin: boolean, firstName: string, lastName: string, email: string, username: string, password: string) {
    //    //userID = 0
    //    admin = false
    //    firstName = ''
    //    lastName = ''
    //    email = ''
    //    username = ''
    //    password = ''
    //}
}