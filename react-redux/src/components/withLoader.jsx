import React from "react";

// HOC to wrap components with loader behavior
const withLoader = (WrappedComponent) => {
  const LoaderWrapper = ({ loading, error, ...props }) => {
    if (loading) {
      return (
        <div
          style={{
            textAlign: "center",
            padding: "2rem",
            minHeight: "calc(100vh - 198px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="spinner"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div style={{ textAlign: "center", padding: "2rem", color: "red" }}>
          <p>Something went wrong. Please try again.</p>
        </div>
      );
    }

    // ✅ Always use WrappedComponent here
    return <WrappedComponent {...props} />;
  };

  LoaderWrapper.displayName = `withLoader(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return LoaderWrapper;
};

export default withLoader;
