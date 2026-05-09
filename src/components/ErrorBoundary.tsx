import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-white dark:bg-neutral-800 p-8 rounded-3xl shadow-xl max-w-md w-full border border-black/5 dark:border-white/5">
            <h2 className="text-2xl font-semibold mb-4 text-neutral-900 dark:text-white">Something went wrong</h2>
            <p className="text-neutral-500 dark:text-neutral-400 mb-8">
              We encountered an unexpected error. Please try again.
            </p>
            <button
              onClick={this.handleReset}
              aria-label="Reset error and try again"
              className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors w-full"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
