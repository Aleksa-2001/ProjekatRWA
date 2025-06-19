import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from '../dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

	constructor(
		@InjectRepository(User) private userRepository: Repository<User>
	) { }

	public async getUsers() {
		return await this.userRepository.find()
	}

	public async getUserByID(userID: number) {
		if (await this.userRepository.existsBy({ userID: userID })) {
			const data = await this.userRepository.findOneBy({ userID: userID })
			const { password, ...user } = data
			return user
		}
		else throw new NotFoundException(`Korisnik sa ID-jem ${userID} nije pronadjen!`)
	}

	public async addUser(userDto: UserDto) {
		if (!(await this.userRepository.existsBy({ username: userDto.username }))) {
			const salt = await bcrypt.genSalt()
			const hashedPassword = await bcrypt.hash(userDto.password, salt)
			userDto.password = hashedPassword
			userDto.admin = false
			
			const user = this.userRepository.create(userDto)
			return await this.userRepository.save(user)
		}
		else throw new ConflictException("Uneto korisnicko ime vec postoji!")
	}

	public async updateUser(userID: number, userDto: UserDto) {
		if (await this.userRepository.existsBy({ userID: userID })) {
			const user = await this.userRepository.findOneBy({ userID: userID })
			if (!(await this.userRepository.existsBy({ username: userDto.username })) || user.username === userDto.username) {
				return await this.userRepository.update(userID, userDto).then(res => {
					if (res.affected === 1) return this.getUserByID(userID)
				})
			}
			else throw new ConflictException("Uneto korisnicko ime vec postoji!")
		}
		else throw new NotFoundException(`Korisnik sa ID-jem ${userID} nije pronadjen!`)
	}

	public async changePassword(userID: number, password: string, newPassword: string) {
		if (await this.userRepository.existsBy({ userID: userID })) {
			const user = await this.userRepository.findOneBy({ userID: userID })
			if (await bcrypt.compare(password, user.password)) {
				const salt = await bcrypt.genSalt()
				const hashedPassword = await bcrypt.hash(newPassword, salt)

				return await this.userRepository.update(userID, { password: hashedPassword }).then(res => {
					if (res.affected === 1) return this.getUserByID(userID)
				})
			}
			else throw new UnauthorizedException(`Pogresna lozinka!`)
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


	
	public async getUserByUsername(username: string) {
		if (await this.userRepository.existsBy({ username: username }))
			return await this.userRepository.findOneBy({ username: username })
		else throw new NotFoundException(`Korisnik sa korisnickim imenom ${username} nije pronadjen!`)
	}

	public async getUserID(username: string) {
		if (await this.userRepository.existsBy({ username: username }))
			return (await this.userRepository.findOneBy({ username: username })).userID
		else throw new NotFoundException(`Korisnik sa korisnickim imenom ${username} nije pronadjen!`)
	}
}