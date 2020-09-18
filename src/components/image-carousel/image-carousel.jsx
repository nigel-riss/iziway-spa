import React, {Component} from 'react';


class ImageCarousel extends Component {
  constructor(props) {
    super(props);

    const {images} = this.props;

    this.state = {
      activeImage: images[0] || null,
    };

    this._handleThumbClick = this._handleThumbClick.bind(this);
  }

  render() {
    let {
      images,
    } = this.props;

    const {
      activeImage,
    } = this.state;

    images = images.slice(0, 4);

    return (
      <div className="image-carousel">
        <div className="image-carousel__main">
          <img src={activeImage} alt=""/>
        </div>
        <div className="image-carousel__thumbnails">
          {images.map((image, i) => {
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
    )
  }

  _handleThumbClick(image) {
    this.setState({
      activeImage: image,
    });
  }
}


export default ImageCarousel;
