import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import { Colors } from '../../utils/const.js';


class ImageCarousel extends PureComponent {
  constructor (props) {
    super(props);

    const { images } = this.props;

    this.state = {
      activeImage: images[0] || null,
    };

    this._handleThumbClick = this._handleThumbClick.bind(this);
  }

  render () {
    const {
      className,
      images,
    } = this.props;

    const {
      activeImage,
    } = this.state;

    return (
      <div className={className}>
        <div className="image-carousel__main">
          <img src={activeImage} alt=""/>
        </div>
        <div className="image-carousel__thumbnails">
          {images.slice(0, 4).map((image, i) => {
            return (
              <div
                className="image-carousel__thumb"
                key={`${i}-${image}`}
                onMouseDown={() => {
                  this._handleThumbClick(image);
                }}
              >
                <img src={image} alt=""/>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  _handleThumbClick (image) {
    this.setState({
      activeImage: image,
    });
  }
}


const StyledImageCarousel = styled(ImageCarousel)`
  .image-carousel__main {
    // box model
    margin-bottom: 10px;
  }

  .image-carousel__main img {
    width: 100%;
  }

  .image-carousel__thumbnails {
    display: flex;
    justify-content: space-between;
  }

  .image-carousel__thumb {
    flex-basis: calc(25% - 8px);
    border: 1px solid ${rgba(Colors.mist, 0.25)};

    &:hover {
      border: 1px solid ${rgba(Colors.dark, 0.5)};
      cursor: pointer;
    }

    &:active {
      border: 1px solid ${Colors.turquoise};
    }
  }

  .image-carousel__thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;


export default StyledImageCarousel;
