interface JWTHeader {
  typ: string;
  alg: string;
  kid?: string;
}

interface JWTPayload {
  iss?: string;  
  aud?: string; 
  sub?: string;  
  exp?: number;  
  iat?: number;  
  nbf?: number; 
  scp?: string; 
  roles?: string[];
  groups?: string[]; 
  upn?: string;  
  unique_name?: string;
  [key: string]: any;
}

interface DecodedJWT {
  header: JWTHeader;
  payload: JWTPayload;
  signature: string;
  raw: {
    header: string;
    payload: string;
    signature: string;
  };
}

export function decodeJWT(token: string): DecodedJWT | null {
  try {
    const parts = token.split('.');
    
    if (parts.length !== 3) {
      return null;
    }

    const [headerB64, payloadB64, signature] = parts;

    const headerJson = atob(headerB64.replace(/-/g, '+').replace(/_/g, '/'));
    const header: JWTHeader = JSON.parse(headerJson);

    const payloadJson = atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/'));
    const payload: JWTPayload = JSON.parse(payloadJson);

    return {
      header,
      payload,
      signature,
      raw: {
        header: headerB64,
        payload: payloadB64,
        signature
      }
    };
  } catch (error) {
    return null;
  }
}

export function isTokenExpired(payload: JWTPayload): boolean {
  if (!payload.exp) return false;
  
  const now = Math.floor(Date.now() / 1000);
  return payload.exp < now;
}

export function formatUnixTimestamp(timestamp?: number): string {
  if (!timestamp) return 'N/A';
  
  return new Date(timestamp * 1000).toLocaleString('pt-BR');
}

export function analyzeToken(token: string): void {
  
  const decoded = decodeJWT(token);
  
  if (!decoded) {
    return;
  }

}

export function extractUserGroups(token: string): string[] {
  const decoded = decodeJWT(token);
  return decoded?.payload?.groups || [];
}

export function extractTokenScopes(token: string): string[] {
  const decoded = decodeJWT(token);
  const scopes = decoded?.payload?.scp || '';
  return scopes.split(' ').filter(Boolean);
}
