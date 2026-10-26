import React, { Component, ErrorInfo, ReactNode } from "react";
import { RefreshCw, AlertTriangle } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  isChunkError: boolean;
  errorMessage: string;
}

export class ChunkLoadErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      isChunkError: false,
      errorMessage: "",
    };
  }

  static getDerivedStateFromError(error: Error): State {
    const message = error?.message || "";
    const isChunkError =
      error?.name === "ChunkLoadError" ||
      message.includes("Failed to fetch dynamically imported module") ||
      message.includes("Loading chunk") ||
      message.includes("Importing a module script failed");

    return {
      hasError: true,
      isChunkError,
      errorMessage: message,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ChunkLoadErrorBoundary caught error:", error, errorInfo);

    const message = error?.message || "";
    const isChunk =
      error?.name === "ChunkLoadError" ||
      message.includes("Failed to fetch dynamically imported module") ||
      message.includes("Loading chunk") ||
      message.includes("Importing a module script failed");

    if (isChunk) {
      const reloadKey = "chunk_reload_attempted";
      const hasReloaded = sessionStorage.getItem(reloadKey);
      if (!hasReloaded) {
        sessionStorage.setItem(reloadKey, "true");
        window.location.reload();
      }
    }
  }

  handleReload = () => {
    sessionStorage.removeItem("chunk_reload_attempted");
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center p-6 bg-stone-50 font-sans">
          <div className="max-w-md w-full bg-white rounded-2xl border border-stone-200 shadow-sm p-8 text-center">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-200">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h2 className="font-serif text-xl sm:text-2xl text-[#002F5C] font-normal mb-2">
              {this.state.isChunkError
                ? "A new update is available"
                : "Unable to load page content"}
            </h2>

            <p className="text-xs sm:text-sm text-stone-600 mb-6 leading-relaxed">
              {this.state.isChunkError
                ? "We have updated JustCharter with recent enhancements. Please reload the page to get the latest version."
                : "A temporary loading issue occurred while retrieving this section."}
            </p>

            <button
              type="button"
              onClick={this.handleReload}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#002F5C] hover:bg-[#002244] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reload page</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ChunkLoadErrorBoundary;
