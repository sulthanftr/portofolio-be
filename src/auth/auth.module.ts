import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist';
import { FirebaseAuthStrategy } from 'src/auth/strategies/firebase.auth.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'firebase-jwt' }),
  ],
  providers: [FirebaseAuthStrategy],
  exports: [PassportModule]
})
export class AuthModule {}
