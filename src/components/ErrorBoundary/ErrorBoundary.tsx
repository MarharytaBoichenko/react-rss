import React, { ErrorInfo, ReactNode } from 'react';
import styles from './../ErrorCard/ErrorCard.module.css';

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
    if (this.state.hasError) {
      return <h1 className={styles.error}>Sorry.. there was an error</h1>;
    }
    return this.props.children;
  }
}
