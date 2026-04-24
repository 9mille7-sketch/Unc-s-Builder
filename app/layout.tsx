import '../globals.css';
import type { ReactNode } from 'react';
import { UserProvider } from '../components/UserContext';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
