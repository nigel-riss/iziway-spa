import React, { PureComponent } from 'react';


class FilterSet extends PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      isOpen: true,
    };
  }

  componentDidMount () {
    if (window.innerWidth < 1000) {
      this.setState({
        isOpen: false,
      });
    }
  }

  render () {
    const {
      title,
      children,
      extraBodyClass,
    } = this.props;

    const {
      isOpen,
    } = this.state;

    return (
      <fieldset className="filter">
        <h3
          className={`filter__title ${isOpen && `filter__title--open`}`}
          onClick={() => {
            this.setState((state) => ({
              isOpen: !state.isOpen,
            }));
          }}
        >
          {title}
        </h3>
        <div
          className={`filter__body ${isOpen && `filter__body--open`} ${extraBodyClass}`}
        >
          {children}
        </div>
      </fieldset>
    );
  }
}


export default FilterSet;
