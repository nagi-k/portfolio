import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { ContentData } from '../types/project';
import { loadContent } from '../utils/content';

interface ContentContextValue {
  data: ContentData | null;
  loading: boolean;
  error: Error | null;
}

const ContentContext = createContext<ContentContextValue>({
  data: null,
  loading: true,
  error: null,
});

export function ContentProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadContent()
      .then((loaded) => {
        setData(loaded);
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err : new Error(String(err)));
        setLoading(false);
      });
  }, []);

  return (
    <ContentContext.Provider value={{ data, loading, error }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  return useContext(ContentContext);
}
