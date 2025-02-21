import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
    const request: any = context.switchToHttp().getRequest();
    const token: string | undefined = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException('Token no proporcionado');
    
    const payload: any = this.authenticate(token);

    payload ? request.user = payload : null;

    return payload === null ? false : true;
  }

  private authenticate(token: string) {
    try {
      const payload: any = this.jwtService.verify(token);

      return payload;
    } catch (error: any) {
      throw new UnauthorizedException(`Token inválido: ${error.message}`); 
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

