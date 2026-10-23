import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return this.productService.getProductById(Number(id));
  }
}
