import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-6xl font-medium text-charcoal mb-4">404</h1>
        <p className="text-stone-500 mb-8">页面不存在或已被移除</p>
        <Link
          to="/"
          className="inline-flex px-6 py-3 bg-charcoal text-white text-sm font-medium hover:bg-accent transition-colors"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}
