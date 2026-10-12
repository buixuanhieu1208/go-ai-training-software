// src/components/ErrorBoundary.tsx
import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an unhandled error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            background: "#161412",
            color: "#e8e6e3",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            fontFamily: "system-ui, -apple-system, sans-serif",
            textAlign: "center",
          }}
        >
          <div
            style={{
              background: "#221f1c",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "16px",
              padding: "32px",
              maxWidth: "520px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>⚠️</div>
            <h2 style={{ fontSize: "20px", marginBottom: "8px", color: "#f0a535" }}>
              {this.props.fallbackTitle ?? "Đã xảy ra sự cố hiển thị"}
            </h2>
            <p style={{ fontSize: "14px", color: "#a8a29e", marginBottom: "20px", lineHeight: 1.6 }}>
              Hệ thống đã ghi nhận lỗi giao diện. Vui lòng quay về trang chính để tiếp tục sử dụng.
            </p>
            {this.state.error && (
              <pre
                style={{
                  background: "#141210",
                  color: "#ef4444",
                  padding: "12px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  textAlign: "left",
                  overflowX: "auto",
                  marginBottom: "20px",
                  maxHeight: "120px",
                }}
              >
                {this.state.error.message}
              </pre>
            )}
            <button
              onClick={this.handleReload}
              style={{
                background: "#3ecf8e",
                color: "#0a1a12",
                border: "none",
                borderRadius: "8px",
                padding: "10px 24px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              ← Về trang chủ
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
