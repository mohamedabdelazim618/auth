import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrismaService } from '../prisma.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService, JwtAuthGuard],
})
export class ProductModule {}
