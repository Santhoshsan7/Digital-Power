"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function ProductImage({ src, alt, fill, className, width, height, priority }) {
    const [imgSrc, setImgSrc] = useState(src);
    const [errorCount, setErrorCount] = useState(0);

    // Reset state when src prop changes
    useEffect(() => {
        setImgSrc(src);
        setErrorCount(0);
    }, [src]);

    const handleError = () => {
        if (errorCount > 1) return; // Stop after trying fallback

        // Helper to get base path without query params
        const getBasePath = (url) => url.split('?')[0];
        const currentPath = getBasePath(imgSrc);

        // If current is .png, try .jpg
        if (currentPath.endsWith('.png')) {
            setImgSrc(imgSrc.replace('.png', '.jpg'));
            setErrorCount(prev => prev + 1);
        }
        // If current is .jpg, try .png
        else if (currentPath.endsWith('.jpg')) {
            setImgSrc(imgSrc.replace('.jpg', '.png'));
            setErrorCount(prev => prev + 1);
        }
        else {
            // If neither extension matched or some other error, just increment to stop loop
            setErrorCount(prev => prev + 1);
        }
    };

    // If we've failed more than once (original + fallback), show placeholder or handle differently
    // For now, we let Next.js Image handle the final broken state or just show nothing if it really fails.
    // Ideally, pass a fallback placeholder prop.

    // If fill is true, we cannot pass width/height
    const imageProps = fill
        ? { fill: true, className }
        : { width, height, className };

    return (
        <Image
            {...imageProps}
            src={imgSrc || '/images/placeholder.png'}
            alt={alt}
            onError={handleError}
            priority={priority}
        />
    );
}
