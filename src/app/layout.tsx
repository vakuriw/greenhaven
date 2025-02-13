import Header from './my-components/Header';
import './styles/globals.css';

export const metadata = {
  title: 'GreenHaven',
  description: 'Сайт по озеленению и ландшафтному дизайну',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
