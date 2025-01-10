import React, { useState, useCallback } from "react";
import { ZoomIn, ZoomOut, RotateCw, X } from "lucide-react";
import { ImagePreviewProps } from "./types";

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  src,
  alt,
  width,
  height,
  preview = true,
  onClick,
  style, // Allow custom inline styles
  className, // Allow custom class names
  imgStyle,
  imgClassName,
  modalStyle, // Allow custom styles for the modal
  modalClassName, // Allow custom class names for the modal
  icon, // New icon prop
  iconPosition = "topRight", // Default position
  onIconClick, // New callback prop
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  const openModal = () => {
    if (onClick) {
      onClick();
    } else {
      setIsOpen(true);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setScale(1);
    setRotation(0);
  };

  const zoomIn = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setScale((s) => Math.min(s + 0.1, 3));
  }, []);

  const zoomOut = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setScale((s) => Math.max(s - 0.1, 0.1));
  }, []);

  const rotate = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setRotation((r) => (r + 90) % 360);
  }, []);

  const iconStyles: Record<string, React.CSSProperties> = {
    topLeft: { top: "8px", left: "8px" },
    topRight: { top: "8px", right: "8px" },
    bottomLeft: { bottom: "8px", left: "8px" },
    bottomRight: { bottom: "8px", right: "8px" },
  };

  return (
    <div
      className={`relative inline-block ${className || ""}`}
      style={{
        width: width || "auto",
        height: height || "auto",
        cursor: preview ? "pointer" : "default",
        position: "relative",
        overflow: "hidden",
        ...style, // Apply custom styles
      }}
      onMouseEnter={() => preview && setShowPreview(true)}
      onMouseLeave={() => setShowPreview(false)}
    >
      {/* Image */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={imgClassName || ""}
        onClick={preview ? openModal : undefined}
        style={{
          cursor: preview ? "pointer" : "default",
          objectFit: "cover",
          display: "block",
          width: "100%",
          height: "100%",
          ...imgStyle,
        }}
      />
      {icon && (
        <div
        className="icon-container"
          style={{
            position: "absolute",
            zIndex: 10,
            cursor: onIconClick ? "pointer" : "default",
            ...iconStyles[iconPosition],
          }}
          onMouseEnter={() => preview && setShowPreview(true)}
          onClick={(e) => {
            e.stopPropagation();
            onIconClick?.();
          }}
        >
          {icon}
        </div>
      )}
      {/* Preview Overlay */}
      {showPreview && preview && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            transition: "opacity 0.3s ease-in-out",
          }}
          onClick={openModal}
        >
          <span
            style={{
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
              textShadow: "0px 2px 4px rgba(0, 0, 0, 0.75)",
            }}
          >
            Preview
          </span>
        </div>
      )}

      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            ...modalStyle,
          }}
          className={modalClassName}
          onClick={closeModal}
        >
          <button
            onClick={closeModal}
            style={{
              position: "fixed",
              top: "20px",
              right: "20px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              zIndex: 1001,
            }}
          >
            <X size={24} color="white" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "90vw",
              maxHeight: "90vh",
            }}
          >
            <img
              src={src}
              alt={alt}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                transform: `scale(${scale}) rotate(${rotation}deg)`,
                transition: "transform 0.3s ease",
              }}
            />

            <div
              style={{
                position: "fixed",
                bottom: "20px",
                display: "flex",
                gap: "16px",
                backgroundColor: "rgba(0, 0, 0, 0.75)",
                padding: "12px 20px",
                borderRadius: "24px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
              }}
            >
              <button
                onClick={zoomOut}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "8px",
                }}
                aria-label="Zoom out"
              >
                <ZoomOut size={20} color="white" />
              </button>
              <button
                onClick={zoomIn}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "8px",
                }}
                aria-label="Zoom in"
              >
                <ZoomIn size={20} color="white" />
              </button>
              <button
                onClick={rotate}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "8px",
                }}
                aria-label="Rotate"
              >
                <RotateCw size={20} color="white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
