import React, {useState} from 'react';

import styles from '../styles/StarRating.module.css';

interface StarRatingProps {
    totalStars: number;
    onRate?: (rating: number) => void;
    ratingProduct: number;
    isClickable: boolean;
}

function StarRating({totalStars, onRate, ratingProduct, isClickable}: StarRatingProps) {
    const [hoveredStars, setHoveredStars] = useState<number>(0);
    const [selectedStars, setSelectedStars] = useState<number>(0);

    const handleMouseEnter = (index: number) => {
        setHoveredStars(index);
    };

    const handleMouseLeave = () => {
        setHoveredStars(0);
    };

    const handleClick = (index: number) => {
        setSelectedStars(index);
        if (onRate) {
            onRate(index);
        }
    };

    const getStarFill = (starIndex: number) => {
        const effectiveRating = hoveredStars || selectedStars || ratingProduct;

        if (starIndex <= effectiveRating) {
            return '#E5B30D';
        } else if (starIndex - 0.5 === effectiveRating) {
            return 'url(#half-fill)';
        }
        return 'gray';
        // return 'transparent';
    };

    return (
        <div className={styles.star_rating_container}>
            {Array.from({length: totalStars}, (_, index) => {
                const starIndex = index + 1;
                return (
                    <svg
                        key={starIndex}
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill={getStarFill(starIndex)}
                        // stroke={'#E5B30D'}
                        onMouseEnter={isClickable ? (() => handleMouseEnter(starIndex)) : undefined}
                        onMouseLeave={isClickable ? handleMouseLeave : undefined}
                        onClick={isClickable ? () => handleClick(starIndex) : undefined}
                        style={isClickable ? {cursor: 'pointer'} : {}}
                    >
                        <defs>
                            <linearGradient id="half-fill" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="50%" stopColor="#E5B30D"/>
                                <stop offset="50%" stopColor="gray"/>
                            </linearGradient>
                        </defs>
                        <path
                            d="M10 1.5L12.09 7.35L18.5 7.94L13.75 12.04L15.18 18.5L10 15.27L4.82 18.5L6.25 12.04L1.5 7.94L7.91 7.35L10 1.5Z"
                        />
                    </svg>
                );
            })}
        </div>
    );
}

export default StarRating;