import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const isProduction = process.env.NODE_ENV === 'production';
    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
    
    if (isProduction) {
      super({
        secretOrKeyProvider: passportJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
        }),
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        audience: 'household-tracker-api',
        issuer: `https://${process.env.AUTH0_DOMAIN}/`,
        algorithms: ['RS256'],
      });
    } else {
      // Development mode: use same secret as JwtModule
      super({
        secretOrKey: jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: true,
      });
    }
  }

  validate(payload: any, req?: any) {
    console.log('JWT Validation - Full Payload:', JSON.stringify(payload));
    console.log('JWT Validation - userId:', payload.sub);
    console.log('JWT Validation - email:', payload.email);
    const userId = payload.sub;
    if (!userId) {
      console.error('No userId (sub) found in JWT payload!');
    }
    return {
      userId: userId,
      email: payload.email,
      name: payload.name,
    };
  }
}
