import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token no proporcionado o inválido');
    }

    const token = authHeader.replace('Bearer ', '');

    try {
    const secret = process.env.JWT_SECRET
    const payload = await this.jwtService.verifyAsync(token, {secret});
    request['user'] = payload; 
    return true;
    } catch (error) {
    throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}
