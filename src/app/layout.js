import './globals.css';
import Header from './components/header';
import Footer from './components/footer';

export const metadata = {
  title: 'Inmueble',
  description: 'Venta de equipos para tu gimnasio ideal',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>

      </head>
      <body className="flex flex-col min-h-screen">
          <Header className="py-10 lg:py-20">
            
          </Header>
          <main className=" lg:pt-2 bg-main ">{children}</main>
          <Footer>
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

          </Footer>
      </body>
    </html>
  );
}