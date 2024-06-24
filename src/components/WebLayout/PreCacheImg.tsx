import { preloadImages } from "@/common";

interface ImgCacheProps {
  images: string[];
}

export const PreCacheImg = ({ images }: ImgCacheProps) => {
  const precache = (images: string[]) => {
    let image;
    for (let i = 0, len = images.length; i < len; i += 1) {
      const imgSrc = images[i];
      const preImg = preloadImages.get(imgSrc);
      if (!preImg) {
        image = new Image(); // eslint-disable-line no-undef
        image.src = images[i];
        image.style.display = 'none';
        document.body.appendChild(image); // chrome
        preloadImages.set(imgSrc, image);
      }
    }
    return false;
  };

  return precache(images);
};
