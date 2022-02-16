import React, { memo } from 'react';
import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";



interface OfferCarouselProps {
    images?: string[];
}

const OfferCarousel: React.FC<OfferCarouselProps> = ({images}) => {
    const imageItems = images?.map((image, key) => (
        <img key={image} src={image} alt={`zdjęcie${key}`}/>
    ));

    return (
        <Carousel className="offer-carousel" showArrows showStatus={false} dynamicHeight={true} showThumbs={false}>
            {imageItems}
        </Carousel>
    );
};

export default memo(OfferCarousel);