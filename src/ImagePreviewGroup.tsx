import React, { useState, useCallback, Children, isValidElement, cloneElement, ReactElement } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw, X } from 'lucide-react';
import { ImagePreviewProps, ImagePreviewGroupProps } from './types';
import { ImagePreview } from './ImagePreview';

export const ImagePreviewGroup: React.FC<ImagePreviewGroupProps> = ({
  children,
  onChange,
  gap = '16px',
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);

  // Filter valid children (ImagePreview components)
  const validChildren = Children.toArray(children).filter(
    (child): child is ReactElement<ImagePreviewProps> =>
      isValidElement(child) &&
      (child.type === ImagePreview || (child.type as any)?.displayName === 'ImagePreview')
  );

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
    setScale(1); // Reset scale
    setRotation(0); // Reset rotation
  };

  const handlePrevious = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const prevIndex = currentIndex;
      setCurrentIndex((current) => {
        const newIndex = (current - 1 + validChildren.length) % validChildren.length;
        onChange?.(newIndex, prevIndex);
        return newIndex;
      });
      setScale(1); // Reset scale
      setRotation(0); // Reset rotation
    },
    [currentIndex, validChildren.length, onChange]
  );

  const handleNext = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const prevIndex = currentIndex;
      setCurrentIndex((current) => {
        const newIndex = (current + 1) % validChildren.length;
        onChange?.(newIndex, prevIndex);
        return newIndex;
      });
      setScale(1); // Reset scale
      setRotation(0); // Reset rotation
    },
    [currentIndex, validChildren.length, onChange]
  );

  const zoomIn = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setScale((s) => Math.min(s + 0.1, 3));
  }, []);

  const zoomOut = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setScale((s) => Math.max(s - 0.1, 0.5));
  }, []);

  const rotate = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setRotation((r) => (r + 90) % 360);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    setCurrentIndex(-1);
    setScale(1); // Reset scale
    setRotation(0); // Reset rotation
  };

  return (
    <>
      {/* Render children */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap }}>
        {validChildren.map((child, index) =>
          cloneElement(child, {
            key: index,
            preview: child.props.preview ?? true,
            onClick: () => handleImageClick(index),
          })
        )}
      </div>

      {/* Modal */}
      {isOpen && currentIndex !== -1 && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
          onClick={closeModal}
        >
          {/* Close button */}
          <button
            onClick={closeModal}
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              zIndex: 1001,
            }}
          >
            <X size={24} color="white" />
          </button>

          {/* Navigation buttons */}
          <button
            onClick={handlePrevious}
            style={{
              position: 'fixed',
              left: '20px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
            }}
          >
            <ChevronLeft size={40} color="white" />
          </button>

          <button
            onClick={handleNext}
            style={{
              position: 'fixed',
              right: '20px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
            }}
          >
            <ChevronRight size={40} color="white" />
          </button>

          {/* Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '90vw',
              maxHeight: '90vh',
            }}
          >
            <img
              src={validChildren[currentIndex].props.src}
              alt={validChildren[currentIndex].props.alt}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                transform: `scale(${scale}) rotate(${rotation}deg)`,
                transition: 'transform 0.3s ease',
              }}
            />

            {/* Zoom and Rotate Controls */}
            <div
              style={{
                position: 'fixed',
                bottom: '20px',
                display: 'flex',
                gap: '16px',
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                padding: '12px 20px',
                borderRadius: '24px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              }}
            >
              <button
                onClick={zoomOut}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                }}
                aria-label="Zoom out"
              >
                <ZoomOut size={20} color="white" />
              </button>
              <button
                onClick={zoomIn}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                }}
                aria-label="Zoom in"
              >
                <ZoomIn size={20} color="white" />
              </button>
              <button
                onClick={rotate}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                }}
                aria-label="Rotate"
              >
                <RotateCw size={20} color="white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
