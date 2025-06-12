// Authentication utility for sign in and sign up
export async function authenticate({ mode, email, password, name }: { mode: 'signin' | 'signup', email: string, password: string, name?: string }) {
  // Mock: Replace with real API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!email || !password || (mode === 'signup' && !name)) {
        reject(new Error('Missing required fields'));
      } else if (!email.includes('@')) {
        reject(new Error('Invalid email address'));
      } else if (password.length < 6) {
        reject(new Error('Password must be at least 6 characters'));
      } else {
        // Simulate success
        resolve({
          user: {
            email,
            name: name || 'User',
            id: 'mock-user-id',
          },
          token: 'mock-jwt-token',
        });
      }
    }, 700);
  });
} 