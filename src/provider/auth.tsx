import { MsalProvider } from "@azure/msal-react";
import { FC, PropsWithChildren } from "react";
import { msalInstance } from "../authConfig";
import { MSALGuard } from "@/components/auth/MSALGuard";


export const AzureAuthProvider: FC<PropsWithChildren> = ({ children }) => (
  <MsalProvider instance={msalInstance}>
    <MSALGuard>
      {children}
    </MSALGuard>
  </MsalProvider>
);