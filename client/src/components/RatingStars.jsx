import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

const RatingStars = ({ currentRating, onRatingChange }) => {
    const [hoveredRating, setHoveredRating] = useState(0);

    const handleStarClick = (rating) => {
        onRatingChange(rating);
    };

    const handleStarHover = (rating) => {
        setHoveredRating(rating);
    };

    const handleStarLeave = () => {
        setHoveredRating(0);
    };

    return (
        <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((index) => (
                <FontAwesomeIcon
                    key={index}
                    icon={index <= (hoveredRating || currentRating) ? faStar : faStarRegular}
                    className="cursor-pointer"
                    size="lg"
                    onClick={() => handleStarClick(index)} 
                    onMouseEnter={() => handleStarHover(index)} 
                    onMouseLeave={handleStarLeave} 
                />
            ))}
        </div>
    );
};

export default RatingStars;
