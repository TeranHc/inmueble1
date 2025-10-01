import '../globals.css';


export const metadata = {
  title: 'Inmobiliaria',
  description: 'Venta de tu casa ideal',
};

export default function NestedLayout({ children }) {
  return (
    <>
      {children}
    </>
  );
}