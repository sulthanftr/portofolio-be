import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Config } from 'src/models/config.model';

@Injectable()
export class FirebaseService {
  public app: FirebaseApp;
  public auth: Auth;

  constructor(private configService: ConfigService<Config>) {
    this.app = initializeApp({
      apiKey: configService.get('apiKey'),
      appId: configService.get('appId'),
      authDomain: configService.get('authDomain'),
      messagingSenderId: configService.get('messagingSenderId'),
      storageBucket: configService.get('storageBucket'),
      projectId: configService.get('projectId'),
    });

    this.auth = getAuth(this.app);
  }
}
