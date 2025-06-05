import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
//import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './entities/user.dto';

export type User = any;

@Injectable()
export class UsersService {
	//constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

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
	]

	public getUserByID(userID: number) {
		return this.users.find(user => user.userID === userID)
	}

	/*
	public async getUsers() {
		return await this.userRepository.find()
	}

	public async getUserByID(userID: number) {
		if (await this.userRepository.existsBy({ userID: userID }))
			return await this.userRepository.findOneBy({ userID: userID })
		else throw new NotFoundException(`Korisnik sa ID-jem ${userID} nije pronadjen!`)
	}

	public async addUser(userDto: UserDto) {
		const user = this.userRepository.create(userDto)
		return await this.userRepository.save(user)
	}

	public async updateUser(userID: number, userDto: UserDto) {
		if (await this.userRepository.existsBy({ userID: userID })) {
			return await this.userRepository.update(userID, userDto).then(res => {
				if (res.affected === 1) return this.getUserByID(userID)
			})
		}
		else throw new NotFoundException(`Korisnik sa ID-jem ${userID} nije pronadjen!`)
	}

	public async deleteUser(userID: number) {
		if (await this.userRepository.existsBy({ userID: userID })) {
			return await this.userRepository.delete(userID).then(res => {
				if (res.affected === 1) return userID
			})
		}
		else throw new NotFoundException(`Korisnik sa ID-jem ${userID} nije pronadjen!`)
	}
	*/


	
	//public async getUserByUsername(username: string) {
	//	if (await this.userRepository.existsBy({ username: username }))
	//		return await this.userRepository.findOneBy({ username: username })
	//	else throw new NotFoundException(`Korisnik sa korisnickim imenom ${username} nije pronadjen!`)
	//}

	//public async getUserID(username: string) {
	//	if (await this.userRepository.existsBy({ username: username }))
	//		return (await this.userRepository.findOneBy({ username: username })).userID
	//	else throw new NotFoundException(`Korisnik sa korisnickim imenom ${username} nije pronadjen!`)
	//}

	public getUserByUsername(username: string) {
		return this.users.find(user => user.username === username)
	}

	public getUserID(username: string) {
		return this.users.find(user => user.username === username).userID
	}
}