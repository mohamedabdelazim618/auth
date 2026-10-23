import { Controller } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUserDto';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post('create')
	async create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto);
		}
	}
