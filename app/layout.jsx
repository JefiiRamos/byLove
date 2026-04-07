import "./globals.css";

export const metadata = {
  title: "Jeferson & Nicole",
  description: "Nossa história, feita com amor.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
