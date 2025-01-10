# ImagePreview and ImagePreviewGroup Components

The `ImagePreview` and `ImagePreviewGroup` are fully customizable React components for rendering and previewing images. They allow users to view images with features like zooming, rotating, and navigation through grouped images. These components also support dynamic styling and class customization.

---

## Installation

To use these components, copy the `ImagePreview` and `ImagePreviewGroup` code into your project or install them from your published package if available.

---

## Components

### 1. ImagePreview

`ImagePreview` allows a single image to be displayed with optional features like zooming, rotating, and a full-screen preview.

#### Basic Example

```tsx
import React from 'react';
import { ImagePreview } from 'react-simple-images-viewer';

const App: React.FC = () => {
  return (
    <div>
      <h1>Image Preview Example</h1>
      <ImagePreview
        src="https://via.placeholder.com/300"
        alt="Sample Image"
        width={300}
        height={200}
      />
    </div>
  );
};

export default App;
```

---

### 2. ImagePreviewGroup

`ImagePreviewGroup` enables grouping multiple `ImagePreview` components to provide navigation between them.

#### Basic Example

```tsx
import React from 'react';
import { ImagePreviewGroup, ImagePreview } from 'react-simple-images-viewer';

const App: React.FC = () => {
  return (
    <div>
      <h1>Image Preview Group Example</h1>
      <ImagePreviewGroup>
        <ImagePreview
          src="https://via.placeholder.com/300"
          alt="Image 1"
          width={300}
          height={200}
        />
        <ImagePreview
          src="https://via.placeholder.com/400"
          alt="Image 2"
          width={300}
          height={200}
        />
        <ImagePreview
          src="https://via.placeholder.com/500"
          alt="Image 3"
          width={300}
          height={200}
        />
      </ImagePreviewGroup>
    </div>
  );
};

export default App;
```

---

## Advanced Customization

### Using Custom Styles, Classes, and Icons

You can pass your own styles, classes, or icons to the images for better control over their appearance.

#### Example

```tsx
<ImagePreview
  src="https://via.placeholder.com/300"
  alt="Custom Styled Image"
  width={300}
  height={200}
  style={{
    objectFit: 'cover',
    borderRadius: '8px',
  }}
  className="custom-image-class"
  icon={<MyCustomIcon />}
  iconPosition="topLeft"
  onIconClick={() => alert('Icon clicked!')}
/>
```

---

## Props

### ImagePreview Props

| Prop Name         | Type                | Default       | Description                                                                 |
|-------------------|---------------------|---------------|-----------------------------------------------------------------------------|
| `src`            | `string`           | `undefined`   | The source URL of the image.                                               |
| `alt`            | `string`           | `undefined`   | Alternative text for the image.                                            |
| `width`          | `number`           | `undefined`   | The width of the image (in pixels).                                        |
| `height`         | `number`           | `undefined`   | The height of the image (in pixels).                                       |
| `preview`        | `boolean`          | `true`        | Enables the preview functionality.                                         |
| `onClick`        | `function`         | `undefined`   | Custom callback when the image is clicked.                                 |
| `style`          | `CSSProperties`    | `{}`          | Inline styles for the container.                                           |
| `className`      | `string`           | `''`          | Custom class name for the container.                                       |
| `imgStyle`       | `CSSProperties`    | `{}`          | Inline styles for the image.                                               |
| `imgClassName`   | `string`           | `''`          | Custom class name for the image.                                           |
| `modalStyle`     | `CSSProperties`    | `{}`          | Inline styles for the modal.                                               |
| `modalClassName` | `string`           | `''`          | Custom class name for the modal.                                           |
| `icon`           | `ReactNode`        | `undefined`   | Icon to display on the image.                                              |
| `iconPosition`   | `'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight'` | `'topRight'` | Position of the icon.                                                      |
| `onIconClick`    | `function`         | `undefined`   | Callback when the icon is clicked.                                         |

### ImagePreviewGroup Props

| Prop Name  | Type       | Default     | Description                                                                 |
|------------|------------|-------------|-----------------------------------------------------------------------------|
| `children` | `ReactNode`| `undefined` | `ImagePreview` components to include in the group.                         |
| `onChange` | `function` | `undefined` | Callback when the current image changes in the group.                      |
| `gap`      | `string`   | `'16px'`    | Spacing between grouped images.                                            |

---

## Features

- **Zoom and Rotate**: Easily zoom in/out or rotate images with intuitive controls.
- **Group Navigation**: Navigate between grouped images using `ImagePreviewGroup`.
- **Dynamic Styling**: Fully customizable styles, classes, and inline properties for images and modals.
- **Icons and Actions**: Add interactive icons to images and respond to icon clicks with custom callbacks.
- **Lightweight Modal**: Images open in an interactive modal for full-screen viewing.
- **Accessibility**: Includes ARIA attributes for screen readers and is keyboard-friendly.

---

## Accessibility

These components are designed with accessibility in mind. They include ARIA attributes and ensure a seamless user experience for screen readers.

---

## Contributing

Contributions are welcome! If you find bugs or have feature requests, feel free to open an issue or submit a pull request to the [GitHub repository](https://github.com/TOPSinfo/react-simple-image-preview.git).

---

## License

This component library is open-source and freely available for use.

---

Enjoy using the `ImagePreview` and `ImagePreviewGroup` components! Let us know if you have any feedback or improvements to suggest.

