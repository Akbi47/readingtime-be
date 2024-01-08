import { Controller, Get, Body } from '@nestjs/common';
import { Category } from './interface/category.interface';
import { CategoryService } from './categorys.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getCategoryById(@Body() body: { type: string }): Promise<Category[]> {
    const { type } = body;
    return this.categoryService.getCategoryByType(type);
  }
}
