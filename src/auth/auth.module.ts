import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
@Module({
imports: [
JwtModule.register({
secret: 'secret123', // move to env in production
signOptions: { expiresIn: '15m' },
}),
],
providers: [AuthService, PrismaService],
controllers: [AuthController]
})
export class AuthModule {}
