import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcryptjs';
import { createHash, randomBytes } from 'crypto';
import { StringDecoder } from 'string_decoder';

@Injectable()
export class CryptoService {
  hashMD5(undigested: string | number) {
    undigested = Buffer.from(String(undigested), 'utf-8').toString();
    return createHash('md5').update(undigested).digest('hex');
  }

  generateRandomKey(size: number = 8) {
    return randomBytes(size).toString('hex');
  }

  hashPassword(password: string, digest: boolean = true) {
    if (digest) password = this.hashMD5(password);
    const swappedHash = password.slice(16, 32) + password.slice(0, 16);
    return swappedHash;
  }

  getLoginHash(password: string, randomKey: string) {
    let key = this.hashPassword(password, false);
    key += randomKey;
    return this.hashPassword(key);
  }

  async hashBcrypt(password: string, salt: number = 12) {
    const hashSalt = await genSalt(salt);
    password = await hash(Buffer.from(password, 'utf-8').toString(), hashSalt);
    const decoder = new StringDecoder('utf8');
    password = decoder.write(Buffer.from(password, 'utf-8'));
    return password;
  }

  async compareBcrypt(password: string, hash: string) {
    return await compare(
      Buffer.from(password, 'utf-8').toString(),
      Buffer.from(hash, 'utf-8').toString(),
    );
  }
}
