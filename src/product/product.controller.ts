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
      product: product,
    });
  }

  @Get()
  async getProducts(@Res() res): Promise<Product[]> {
    const products = await this.productService.getProducts();
    return res.status(HttpStatus.OK).json({
      message: `N° of Products: ${products.length}`,
      products: products,
    });
  }

  @Get(`:productId`)
  async getProduct(
    @Res() res,
    @Param(`productId`) productId: string,
  ): Promise<Product> {
    const product = await this.productService.getProduct(productId);
    return res.status(HttpStatus.OK).json({
      message: `Product: ${product.name}`,
      product: product,
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
    return res.status(HttpStatus.OK).json({
      message: `Product ${updatedProduct.name} updated`,
      updatedProduct: updatedProduct,
    });
  }

  @Delete(`:productId`)
  async deleteProduct(
    @Res() res,
    @Param('productId') productId: string,
  ): Promise<Product> {
    const deletedProduct = await this.productService.deleteProduct(productId);
    return res.status(HttpStatus.OK).json({
      message: `Product ${deletedProduct.name} deleted`,
      deletedProduct: deletedProduct,
    });
  }
}
