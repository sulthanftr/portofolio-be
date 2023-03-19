import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { UserEntity } from './entities/user.entity';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    UserCredential,
} from 'firebase/auth';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {

  constructor(private firebaseService: FirebaseService, private prisma: PrismaService) {}

  public async login(email: string, password: string): Promise<Omit<UserEntity,'password'>> {
    try {
        const userCredential = await signInWithEmailAndPassword(
          this.firebaseService.auth,
          email,
          password,
        );

        if (userCredential) {
            const data = await this.prisma.user.findUnique({ where: { email } });
            delete data.password;
            return data;
        };

      } catch (error: unknown) {
        console.warn(`[ERROR]: ${error}`);
      }
  }

  public async register(body: Omit<UserEntity, 'id'>): Promise<Omit<UserEntity,'password'>> {
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(
        this.firebaseService.auth,
        body.email,
        body.password,
      );
    
      if (userCredential) {
          const createUserDto: CreateUserDto = body;
          const data = await this.prisma.user.create({ data: createUserDto });
          delete data.password;
          return data;
      };

    } catch (error: unknown) {
      console.warn(`[ERROR]: ${error}`);
    }
  }
}
