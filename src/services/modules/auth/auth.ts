import * as Keychain from 'react-native-keychain';

const TOKEN_KEY = 'auth-token';

const options: Keychain.Options = { storage: Keychain.STORAGE_TYPE.FB };

export default class AuthService {
  static async getToken() {
    try {
      const tokens = await Keychain.getGenericPassword(options);
      if (tokens !== false) {
        const { password: token } = tokens;
        return token;
      }
      return null;
    } catch {
      return null;
    }
  }

  static async setToken(token: string) {
    try {
      return await Keychain.setGenericPassword(TOKEN_KEY, token, options);
    } catch {
      return null;
    }
  }

  static async removeToken() {
    try {
      return await Keychain.resetGenericPassword(options);
    } catch {
      return null;
    }
  }
}
