import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  Req,
  Body,
  HttpStatus,
  Param,
  NotFoundException,
} from '@nestjs/common';
//? DTO
import { CreateProductDTO } from './dto/product.dto';
//? Service
import { ProductService } from './product.service';
//? Interface
import { Product } from './interfaces/product.interface';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  async createProduct(
    @Res() res,
    @Body() createProductDTO: CreateProductDTO,
  ): Promise<Product> {
    const product = await this.productService.createProduct(createProductDTO);
    return res.status(HttpStatus.OK).json({
      message: `Product ${createProductDTO.name} created`,
      product,
    });
  }

  @Get()
  async getProducts(@Res() res): Promise<Product[]> {
    const products = await this.productService.getProducts();
    return res.status(HttpStatus.OK).json({
      message: `N° of Products: ${products.length}`,
      products,
    });
  }

  @Get(`:productId`)
  async getProduct(
    @Res() res,
    @Param(`productId`) productId: string,
  ): Promise<Product> {
    const product = await this.productService.getProduct(productId);
    if (!product)
      throw new NotFoundException(`Product ${productId} doesn't exist`);
    return res.status(HttpStatus.OK).json({
      message: `Product: ${product.name}`,
      product,
    });
  }

  @Put(`:productId`)
  async updateProduct(
    @Res() res,
    @Param('productId') productId: string,
    @Body() updateProduct: CreateProductDTO,
  ): Promise<Product> {
    const updatedProduct = await this.productService.updateProduct(
      productId,
      updateProduct,
    );
    if (!updatedProduct)
      throw new NotFoundException(`Product ${productId} doesn't exist`);
    return res.status(HttpStatus.OK).json({
      message: `Product ${updatedProduct.name} updated`,
      updatedProduct,
    });
  }

  @Delete(`:productId`)
  async deleteProduct(
    @Res() res,
    @Param('productId') productId: string,
  ): Promise<Product> {
    const deletedProduct = await this.productService.deleteProduct(productId);
    if (!deletedProduct)
      throw new NotFoundException(`Product ${productId} doesn't exist`);
    return res.status(HttpStatus.OK).json({
      message: `Product ${deletedProduct.name} deleted`,
      deletedProduct,
    });
  }
}
