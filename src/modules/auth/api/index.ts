import type { LoginData, User } from '@/modules/auth/types';

export function login(data: LoginData): Promise<User> {
  // Mock API call - replace with actual API integration
  return new Promise<User>((resolve, reject) => {
    setTimeout(() => {
      if (
        data.email === 'admin@example.com' &&
        data.password === 'adminadmin'
      ) {
        resolve({
          token: 'mock-jwt-token',
          id: 'skKjd78a-#',
          username: 'admin',
          email: 'admin@example.com',
        });
      } else {
        reject(new Error('Invalid username or password'));
      }
    }, 1000);
  });
}

export function logout(): Promise<void> {
  // Mock API call - replace with actual API integration
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
}

export function verifySession(token: string): Promise<User> {
  // Mock API call - replace with actual API integration
  return new Promise<User>((resolve, reject) => {
    setTimeout(() => {
      if (token === 'mock-jwt-token') {
        resolve({
          token: 'mock-jwt-token',
          id: 'skKjd78a-#',
          username: 'admin',
          email: 'admin@example.com',
        });
      } else {
        reject(new Error('Invalid token'));
      }
    }, 1000);
  });
}
