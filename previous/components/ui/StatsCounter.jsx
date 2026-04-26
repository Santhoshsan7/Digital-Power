"use client";
import { useEffect, useState, useRef } from 'react';

export default function StatsCounter({ value, duration = 2000 }) {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);

    // Extract number and suffix
    const number = parseInt(value.replace(/[^0-9]/g, ''));
    const suffix = value.replace(/[0-9]/g, '');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    let startTimestamp = null;
                    const step = (timestamp) => {
                        if (!startTimestamp) startTimestamp = timestamp;
                        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                        setCount(Math.floor(progress * number));
                        if (progress < 1) {
                            window.requestAnimationFrame(step);
                        }
                    };
                    window.requestAnimationFrame(step);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            if (countRef.current) observer.disconnect();
        };
    }, [number, duration]);

    return (
        <span ref={countRef}>
            {count}{suffix}
        </span>
    );
}
