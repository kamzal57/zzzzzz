import React from 'react';

type ErrorBoundaryState = { hasError: boolean; error?: Error };

export default class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, ErrorBoundaryState> {
  // Explicitly declare props for TS inference in this codebase
  declare props: Readonly<React.PropsWithChildren<{}>>;
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('UI ErrorBoundary caught:', error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-slate-900 text-slate-200">
          <div className="max-w-lg w-full bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h1 className="text-xl font-bold text-white mb-2">Une erreur est survenue</h1>
            <p className="text-slate-400 mb-4">Essayez de recharger la page. Si le problème persiste, vérifiez la console du navigateur.</p>
            <pre className="bg-slate-900 text-red-300 p-3 rounded overflow-auto text-sm">
              {this.state.error?.message}
            </pre>
          </div>
        </div>
      );
    }
    return this.props.children as React.ReactNode;
  }
}
