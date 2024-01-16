import { CryptoService } from './crypto.service';

describe('CryptoService', () => {
  let cryptoService: CryptoService;

  beforeEach(() => {
    cryptoService = new CryptoService();
  });

  it('should hash a password using bcrypt', async () => {
    const password = 'password';
    const hashedPassword = await cryptoService.hashBcrypt(password);
    expect(hashedPassword).not.toBe(password);
  });

  it('should compare a password with its bcrypt hash', async () => {
    const password = 'password';
    const hashedPassword = await cryptoService.hashBcrypt(password);
    const isMatch = await cryptoService.compareBcrypt(password, hashedPassword);
    expect(isMatch).toBe(true);
  });
});
