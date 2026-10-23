import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly jwtService: JwtService,
	) {}

		async refreshAccessToken(userId: number, refreshToken: string) {
			const user = await this.prisma.user.findUnique({ where: { id: userId } });
			if (!user || !user.refreshToken) {
				throw new UnauthorizedException('المستخدم غير موجود أو لا يوجد رمز تحديث');
			}
			const isMatch = await bcrypt.compare(refreshToken, user.refreshToken);
			if (!isMatch) {
				throw new UnauthorizedException('رمز التحديث غير صحيح');
			}
			const payload = { sub: user.id, username: user.username, role: user.role };
			const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
			return { accessToken };
		}

	async login(username: string, password: string) {
		const user = await this.prisma.user.findUnique({ where: { username } });
		if (!user || !(await bcrypt.compare(password, user.password))) {
			throw new UnauthorizedException();
		}
		const payload = { sub: user.id, username: user.username, role: user.role };
		const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
		const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
		const hashedRt = await bcrypt.hash(refreshToken, 10);
		await this.prisma.user.update({
			where: { id: user.id },
			data: { refreshToken: hashedRt },
		});
		return { accessToken, refreshToken };
	}
}
