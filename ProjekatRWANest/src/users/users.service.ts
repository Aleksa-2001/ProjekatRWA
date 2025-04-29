import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User = [
    {
      userID: 1,
      admin: true,
      firstName: 'Aleksa',
      lastName: 'Nedeljković',
      email: 'aleksa.nedeljkovic@elfak.rs',
      username: 'Aleksa2001',
      //password: '$2b$10$vZYfI0XLt6mENtjftpiuW.1A0Q3dkpMBYL2LB6ztEdYRGRyzlWQFG',
      password: 'test12345',
    },
    {
      userID: 2,
      admin: false,
      firstName: 'Ime',
      lastName: 'Prezime',
      email: 'ime.prezime@gmail.com',
      username: 'Korisnik',
      password: 'lozinka123',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}