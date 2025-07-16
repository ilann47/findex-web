export type AuthProvider = 'azure' | 'google';

export interface BaseUser {
  id: string;
  email: string;
  name: string;
  picture?: string;
  groups?: string[];
  provider: AuthProvider;
}

export interface AzureUser extends BaseUser {
  provider: 'azure';
  tenantId: string;
  groups: string[];
  roles?: string[];
}

export interface GoogleUser extends BaseUser {
  provider: 'google';
  domain?: string;
  emailVerified: boolean;
}

export type User = AzureUser | GoogleUser;

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  provider: AuthProvider | null;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  loginWithAzure: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  switchProvider: (provider: AuthProvider) => void;
  getAccessToken: () => Promise<string | null>;
}

// Token interfaces
export interface BaseTokenInfo {
  accessToken: string;
  expiresAt: number;
  provider: AuthProvider;
}

export interface AzureTokenInfo extends BaseTokenInfo {
  provider: 'azure';
  idToken: string;
  scopes: string[];
}

export interface GoogleTokenInfo extends BaseTokenInfo {
  provider: 'google';
  idToken: string;
  refreshToken?: string;
}

export type TokenInfo = AzureTokenInfo | GoogleTokenInfo;
