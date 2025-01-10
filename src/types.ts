import { ReactNode, CSSProperties } from "react";

export interface ImagePreviewProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  preview?: boolean;
  onClick?: (event?: React.MouseEvent<HTMLImageElement>) => void; 
  key?: number | string;
  style?: CSSProperties; // For inline styles
  className?: string; // For custom class names
  imgStyle?: CSSProperties; // Custom styles for the image
  imgClassName?: string; // Custom class names for the image
  modalStyle?: CSSProperties; // For modal-specific inline styles
  modalClassName?: string; // For modal-specific class names
  icon?: ReactNode; // Icon to display on the image
  iconPosition?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight"; // Position for the icon
  onIconClick?: (event?: React.MouseEvent<HTMLImageElement>) => void; // Callback for the icon click event
}

export interface ImagePreviewGroupProps {
  children: ReactNode;
  onChange?: (current: number, prev: number) => void;
  gap?: number | string;
}
