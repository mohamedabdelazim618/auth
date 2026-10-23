
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';
import { RefreshTokenDto } from './refresh-token.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	async login(@Body() loginDto: LoginDto) {
		return this.authService.login(loginDto.username, loginDto.password);
	}

	@Post('refresh-token')
	async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
		return this.authService.refreshAccessToken(refreshTokenDto.userId, refreshTokenDto.refreshToken);
	}
}
