import "./globals.css";
import { inter, montserrat } from "./fonts";

export const metadata = {
  title: "Hunt Empyra",
  description: "By fevertrip",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div id="titleContainer">
          <div id="title" className={montserrat.className}>
            <div className="hunt">Hunt</div>
            <div className="companyName">Empyra</div>
          </div>
        </div>
        {children}
        <a id="attribution" href="https://fvrtrp.com" target="_blank" rel="noreferrer">BY FVRTRP</a>
        </body>
    </html>
  );
}
