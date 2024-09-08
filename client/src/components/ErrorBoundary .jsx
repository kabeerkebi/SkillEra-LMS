





import React from "react";
import { Button } from "react-bootstrap";
import { FaExclamationTriangle } from "react-icons/fa";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error("Caught by ErrorBoundary:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ background: "rgb(244, 244, 244) ", paddingTop: "60px" }}>
          <div style={styles.container}>
            <FaExclamationTriangle style={styles.icon} />
            <h1 style={styles.heading}>Oops! Something went wrong.</h1>
            <p style={styles.description}>
              We apologize for the inconvenience. Please try refreshing the page
              or contact support if the problem persists.
            </p>
            <Button
              onClick={this.handleReload}
              variant="primary"
              style={styles.button}
            >
              Reload Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
    color: "#333",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    margin: "   auto",
  },
  icon: {
    fontSize: "48px",
    color: "#f5c518",
    marginBottom: "20px",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  description: {
    fontSize: "18px",
    color: "#666",
    marginBottom: "20px",
  },
  button: {
    fontSize: "16px",
    padding: "10px 20px",
  },
};

export default ErrorBoundary;
