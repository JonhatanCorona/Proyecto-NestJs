import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction ) {
    console.log(`Estás ejecutando un método ${req.method} en la ruta ${req.url}`);
    next();    
    }
}

export function LoggerMiddlewareGlobal(req: Request, res: Response, next: NextFunction) {
  console.log(`Estás ejecutando un método ${req.method} en la ruta ${req.url}`);
  next();
}
