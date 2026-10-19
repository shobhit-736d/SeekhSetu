import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 m-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-aurora-text-primary space-y-3">
          <div className="flex items-center gap-2.5 text-rose-500">
            <AlertCircle className="w-5 h-5" />
            <h3 className="font-extrabold text-sm">
              {this.props.fallbackTitle || 'Something went wrong rendering this component'}
            </h3>
          </div>
          <p className="text-xs text-aurora-text-secondary">
            {this.state.error?.message || 'An unexpected runtime error occurred.'}
          </p>
          <button
            onClick={this.handleReset}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#FA4616] hover:bg-[#E03D0F] text-white text-xs font-bold transition-all shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
