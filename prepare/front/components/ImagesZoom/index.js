import React, {useState} from "react";
import PropTypes from "prop-types";
import Slick from 'react-slick';
import { Overlay, Global, CloseBtn, ImageWrapper, Indicator, Header, SlickWrapper} from './styles'

const ImagesZoom = ({ images, onClose }) => {

    const[currentSlide, setCurrentSlide] = useState(0);

    return (
        <div>
            <Overlay>
                <Global/>
                <Header>
                    <h1>상세 이미지</h1>
                    <CloseBtn onClick={onClose}>X</CloseBtn>
                </Header>
                <SlickWrapper>
                    <div>
                        <Slick
                            initialSlide={0}
                            beforeChange={(slide)=>setCurrentSlide(slide)}
                            infinite
                            arrows={false}
                            slidesToScroll={1}
                        >
                            {images.map((v)=>(
                                <ImageWrapper key={v.src}>
                                    <img src={v.src} alt={v.src}/>
                                </ImageWrapper>
                            ))}
                        </Slick>
                        <Indicator>
                            <div>
                                {currentSlide + 1}
                                {' '}
                                /
                                {images.length}
                            </div>
                        </Indicator>
                    </div>
                </SlickWrapper>
            </Overlay>

        </div>
    );
}

ImagesZoom.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClose: PropTypes.func.isRequired,
}

export default ImagesZoom;