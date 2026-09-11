import { Injectable, Logger } from '@nestjs/common';
import arcjet, {
  type ArcjetDecision,
  detectBot,
  shield,
  slidingWindow,
} from '@arcjet/node';
import type { Request } from 'express';

@Injectable()
export class ArcjetService {
  private readonly logger = new Logger(ArcjetService.name);

  private readonly client = arcjet({
    key: process.env.ARCJET_KEY!,
    rules: [
      shield({ mode: this.mode }),
      detectBot({
        mode: this.mode,
        allow: ['CATEGORY:SEARCH_ENGINE'],
      }),
      slidingWindow({
        mode: this.mode,
        interval: '1m',
        max: 100,
      }),
    ],
  });

  private get mode(): 'LIVE' | 'DRY_RUN' {
    return process.env.ARCJET_MODE === 'LIVE' ? 'LIVE' : 'DRY_RUN';
  }

  async protect(req: Request): Promise<ArcjetDecision> {
    const decision = await this.client.protect(req);

    if (decision.isDenied()) {
      this.logger.warn(
        `Request denied: ${decision.reason.type} (${req.method} ${req.url})`,
      );
    }

    return decision;
  }
}
