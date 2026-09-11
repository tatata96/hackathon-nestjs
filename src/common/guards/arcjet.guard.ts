import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import type { Request } from 'express';
import { ArcjetService } from '../../lib/security/arcjet.service.js';

@Injectable()
export class ArcjetGuard implements CanActivate {
  constructor(private readonly arcjet: ArcjetService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const decision = await this.arcjet.protect(req);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        throw new HttpException('Too Many Requests', HttpStatus.TOO_MANY_REQUESTS);
      }
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return true;
  }
}
