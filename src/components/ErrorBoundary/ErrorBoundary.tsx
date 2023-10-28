import React, { ErrorInfo, ReactNode } from 'react';

type ErrorProps = {
  children?: ReactNode;
};

type ErrorState = {
  hasError: boolean;
};

export default class ErrorBoundary extends React.Component<ErrorProps, ErrorState> {
  state: ErrorState = {
    hasError: false,
  };

  static getDerivedStateFromError(_: Error): ErrorState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error: ', error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    console.log(this.state.hasError);
    if (this.state.hasError) {
      return <h1>Sorry.. there was an error</h1>;
    }
    return this.props.children;
  }
}
