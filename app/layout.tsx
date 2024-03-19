import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import {
  Button,
  Divider,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { HiMiniBolt } from "react-icons/hi2";
const inter = Inter({ subsets: ["latin"] });
const opensans = Open_Sans({ weight: "300", subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Productivity App",
  description: "my by student, created for students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div>
          <div className={opensans.className}>
            <Navbar>
              <NavbarBrand>
                <div className="inline-flex">
                  <HiMiniBolt className="inline-flex mr-2" size={25} />
                  <div id="titleText" className="titleText text-xl">
                    Focasso
                  </div>
                </div>
              </NavbarBrand>
              <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                  <Link color="foreground" href="#">
                    Features
                  </Link>
                </NavbarItem>
                <NavbarItem>
                  <Link color="foreground" href="#">
                    Integrations
                  </Link>
                </NavbarItem>
                <NavbarItem>
                  <Link color="foreground" href="/about">
                    About
                  </Link>
                </NavbarItem>
              </NavbarContent>
              <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                  <Link href="#">Login</Link>
                </NavbarItem>
                <NavbarItem>
                  <Button as={Link} color="primary" href="#" variant="flat">
                    Sign Up
                  </Button>
                </NavbarItem>
              </NavbarContent>
            </Navbar>
            <Divider className="my-0" />
          </div>
        </div>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
