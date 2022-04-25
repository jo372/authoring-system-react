import * as React from 'react';

interface ImageUploaderProps {
  onImageChange: (src: string) => void;
  resetContents?: boolean;
  alt?: string;
}

export default function ImageUploader(props: ImageUploaderProps) {
  const imageInputRef: React.RefObject<HTMLInputElement> = React.createRef();
  const [imageSource, setImageSource] = React.useState<string | null>(null);
  const {
    resetContents,
    onImageChange,
    alt,
  } = props;

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0];
      const imgSrc = URL.createObjectURL(img);

      onImageChange(imgSrc);
      setImageSource(imgSrc);
    }
  };

  const clearImageInput = () => {
    if (imageInputRef && imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

  const clearImageSource = () => {
    setImageSource(null);
  };

  const clearContents = () => {
    clearImageSource();
    clearImageInput();
  };

  React.useEffect(() => {
    if (resetContents) {
      clearContents();
    }
  }, [resetContents]);

  return (
    <>
      <img src={imageSource ?? ''} alt={alt} />
      <input ref={imageInputRef} type="file" onChange={onChangeHandler} accept="image/*" />
    </>
  );
}

ImageUploader.defaultProps = {
  resetContents: false,
  alt: '',
};
