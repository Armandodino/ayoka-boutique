import type {ImgHTMLAttributes} from 'react';
import imageMap from '@/lib/images.json';
type ImageInfo={src:string;srcSet:string;width:number;height:number};
const images=imageMap.images as Record<string,ImageInfo>;
const aliases=imageMap.aliases as Record<string,string>;
export const getImageInfo=(src:string)=>images[aliases[src]||src];
export default function OptimizedImage({src,sizes='(max-width:540px) 50vw, (max-width:900px) 33vw, 25vw',...props}:ImgHTMLAttributes<HTMLImageElement>){const image=typeof src==='string'?getImageInfo(src):undefined;return <img {...props} src={image?.src||src} srcSet={image?.srcSet} sizes={image?sizes:undefined} width={image?.width} height={image?.height} decoding="async"/>;}
