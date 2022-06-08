import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interfaces/product.interface';
import { CreateProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async getProducts(): Promise<Product[]> {
    return await this.productModel.find();
  }

  async getProduct(id: string): Promise<Product> {
    return await this.productModel.findById(id);
  }

  async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
    return await this.productModel.create(createProductDTO);
  }

  async updateProduct(id: string, updateProductDTO: CreateProductDTO) {
    return await this.productModel.findByIdAndUpdate(id, updateProductDTO, {
      new: true,
    });
  }

  async deleteProduct(id: string): Promise<Product> {
    return await this.productModel.findByIdAndDelete(id);
  }
}
