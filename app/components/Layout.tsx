import Header from './Header'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <main className="container mx-auto p-4 pb-20 md:pb-4">
        {children}
      </main>
    </div>
  )
}