import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { Loading } from './Loading';
import { useContent } from '../hooks/useContent';

export function Layout() {
  const { data, loading } = useContent();

  if (loading || !data) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Navigation settings={data.settings} />
      <main className="flex-1 pt-16">
        <Outlet context={data} />
      </main>
      <Footer about={data.about} copyright={data.settings.footerCopyright} />
    </div>
  );
}
