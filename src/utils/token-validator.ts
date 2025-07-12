import { decodeJWT } from './jwt-decoder';

export function validateTokenForSpringBoot(token: string): {
  isValid: boolean;
  issues: string[];
  claims: Record<string, any>;
} {
  const issues: string[] = [];
  const decoded = decodeJWT(token);
  
  if (!decoded?.payload) {
    return {
      isValid: false,
      issues: ['Token inválido ou não pôde ser decodificado'],
      claims: {}
    };
  }

  const payload = decoded.payload;
  const claims = {
    audience: payload.aud,
    issuer: payload.iss,
    subject: payload.sub,
    scopes: payload.scp,
    appId: payload.appid,
    roles: payload.roles,
    groups: payload.groups,
    expiry: payload.exp,
    issuedAt: payload.iat,
    notBefore: payload.nbf
  };

  const microsoftGraphAudience = '00000003-0000-0000-c000-000000000000';
  const ourApiAudience = '49c77220-ccf2-41b3-beee-0a87b41ba876';
  const validAudiences = [microsoftGraphAudience, ourApiAudience];
  
  const currentAudience = Array.isArray(payload.aud) ? payload.aud[0] : payload.aud;
  if (!payload.aud || !validAudiences.includes(currentAudience)) {
    issues.push(`Audience incorreto. Esperado: ${validAudiences.join(' ou ')}, Atual: ${payload.aud}`);
  }

  const expectedIssuers = [
    `https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_TENANT_ID}/v2.0`,
    `https://sts.windows.net/${import.meta.env.VITE_AZURE_TENANT_ID}/`
  ];
  
  if (!payload.iss || !expectedIssuers.some(issuer => payload.iss?.startsWith(issuer))) {
    issues.push(`Issuer incorreto. Esperado: ${expectedIssuers.join(' ou ')}, Atual: ${payload.iss}`);
  }

  const now = Math.floor(Date.now() / 1000);
  if (payload.exp && payload.exp < now) {
    issues.push('Token expirado');
  }

  if (payload.nbf && payload.nbf > now) {
    issues.push('Token ainda não é válido (nbf)');
  }

  if (!payload.scp) {
    issues.push('Token sem scopes');
  } else {
    const currentAudience = Array.isArray(payload.aud) ? payload.aud[0] : payload.aud;
    if (currentAudience === ourApiAudience) {
    } else {
      if (!payload.scp.includes('User.Read') && !payload.scp.includes('.default')) {
        issues.push(`Scopes insuficientes para Microsoft Graph. Atual: ${payload.scp}`);
      }
    }
  }

  if (!payload.sub) {
    issues.push('Token sem subject (usuário)');
  }

  return {
    isValid: issues.length === 0,
    issues,
    claims
  };
}

export function logTokenValidation(token: string) {
  const validation = validateTokenForSpringBoot(token);
  

  
  Object.entries(validation.claims).forEach(([key, value]) => {
    if (value !== undefined) {
      console.log(`${key}:`, value);
    }
  });
  console.groupEnd();
  
  console.groupEnd();
  
  return validation;
}
