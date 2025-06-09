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

    @Column({ unique: true })
    username: string

    @Column()
    password: string
    
}