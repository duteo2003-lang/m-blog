import Footer from "@/app/common/components/footer";
import Header from "@/app/common/components/header";
import "@/app/globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    < >
      <Header />
      <main className="mt-16">
        {children}
      </main>
      <Footer />
    </>
  );
}
