import { Routes, Route } from 'react-router-dom';
import { ContentProvider } from './hooks/useContent';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Works } from './pages/Works';
import { WorkDetail } from './pages/WorkDetail';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Admin } from './pages/Admin';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <ContentProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="works" element={<Works />} />
          <Route path="works/:slug" element={<WorkDetail />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </ContentProvider>
  );
}

export default App;
