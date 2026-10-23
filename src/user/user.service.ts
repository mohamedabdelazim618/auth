import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../prisma.service'; // Import PrismaService
@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {} // Inject PrismaService

    async create(data: any) {
        if (!data || !data.password || !data.username || !data.fullName || !data.role) {
            throw new Error('بيانات المستخدم غير مكتملة');
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        return this.prisma.user.create({
            data: {
                username: data.username,
                password: hashedPassword,
                fullName: data.fullName,
                role: data.role,
                refreshToken: data.refreshToken,
            },
        });
    }
}
