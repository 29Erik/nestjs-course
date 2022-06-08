import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
@Module({
  imports: [
    TasksModule,
    MongooseModule.forRoot(`mongodb://localhost/nest-tutorial`, {
      useNewUrlParser: true,
    }),
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
