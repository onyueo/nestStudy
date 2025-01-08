import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log('get', new Date())
    return "swagger link : 3000/api";
  }
}
