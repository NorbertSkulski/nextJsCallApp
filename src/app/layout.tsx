"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignedIn, UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { plPL } from "@clerk/localizations";

import '@stream-io/video-react-sdk/dist/css/styles.css';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userButtonAppearance = {
    elements: {
      userButtonAvatarBox: "w-10 h-10", // Custom width and height
      userButtonPopoverCard: "bg-blue-100", // Custom background for the popover card
      userButtonPopoverActionButton: "text-red-600", // Custom text color for action buttons
    },
  };

  const [shouldRenderHeader, setShouldRenderHeader] = useState<Boolean>(false);

  const pathName = usePathname();

  useEffect(() => {
    setShouldRenderHeader(!["/sign-in", "/sign-up"].includes(pathName));
  }, [pathName]);





  const apiKey = process.env.GETSTREAM_ACCESS_KEY

  // const client = new StreamVideoClient({ apiKey, user, token });


  return (
    <ClerkProvider localization={plPL}>
      <html lang="pl">        
        <body className={inter.className}>
          {shouldRenderHeader ? (
            <header className="min-h-[10dvh] flex  justify-end pe-8">
              <div className=" flex items-center ">
                <SignedIn>
                  <UserButton appearance={userButtonAppearance} />
                </SignedIn>
              </div>
            </header>
          ) : null}
          <main className="h-[90dvh] overflow-hidden">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
