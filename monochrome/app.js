class NewsletterForm extends React.Component {
  state = {
    email: '',
    inputMessage: '',
    busy: false,
    submitted: false,
    submittedValue: '',
  };

  validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  onSubmit = (event) => {
    event.preventDefault();

    const email = this.state.email;

    if (!this.validateEmail(email)) {
      this.setState({
        inputMessage: 'Please use a valid email',
      });

      return;
    }

    this.setState({
      busy: true,
    });

    setTimeout(() => {
      this.setState({
        busy: false,
        email: '',
        submittedValue: this.state.email,
        submitted: true,
      });
    }, 3000);
  };

  onInputChange = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  render() {
    return (
      <div>
        {this.state.submitted === true ? (
          <div className="submitted-message">
            Hello {this.state.submittedValue}, thank you for submiting.
          </div>
        ) : (
          <form action="" method="post" onSubmit={this.onSubmit}>
            <label htmlFor="email-newsletter">sign up for our newsletter</label>
            <input
              type="text"
              name="email"
              id="email-newsletter"
              value={this.state.email}
              onChange={this.onInputChange}
            ></input>

            {this.state.inputMessage.length > 0 ? (
              <div className="message">{this.state.inputMessage}</div>
            ) : null}

            <button
              type="submit"
              disabled={this.state.busy}
              className={`${this.state.busy === true ? 'busy' : ''}`}
            >
              {this.state.busy ? (
                <i className="fas fa-spinner icon"></i>
              ) : (
                'SUBMIT'
              )}
            </button>
          </form>
        )}
      </div>
    );
  }
}

const newsletterContainer = document.querySelector(
  '.footer-sign-up-newsletter',
);
ReactDOM.render(<NewsletterForm></NewsletterForm>, newsletterContainer);

class AddToCartButton extends React.Component {
  state = {
    added: false,
    busy: false,
  };

  onClick = () => {
    if (this.state.busy === true) {
      return;
    }

    this.setState({
      busy: true,
    });

    setTimeout(() => {
      dispatchEvent(
        new CustomEvent('cart:add', {
          detail: this.props.productId,
        }),
      );

      this.setState({
        busy: false,
        added: !this.state.added,
      });
    }, 100);
  };

  render() {
    return (
      <button
        className="product-control"
        type="button"
        title={this.state.added === true ? 'Remove from Cart' : 'Add to Cart'}
        onClick={this.onClick}
      >
        <span>
          {this.state.added === true ? (
            <i class="fas fa-plus-square"></i>
          ) : (
            <i class="far fa-plus-square"></i>
          )}
        </span>
      </button>
    );
  }
}

class AddToWishlistButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      added: false,
      busy: false,
    };
  }

  onClick = () => {
    this.setState({
      busy: true,
    });

    setTimeout(() => {
      this.setState({
        busy: false,
        added: !this.state.added,
      });
    }, 100);
  };

  render() {
    var added = this.state.added;

    return (
      <button
        className="product-control"
        type="button"
        onClick={this.onClick}
        title={added === true ? 'Remove from Wishlist' : 'Add to Wishlist'}
      >
        <span>
          <i className={added === true ? 'fas fa-heart' : 'far fa-heart'}></i>
        </span>
      </button>
    );
  }
}

class ProductControls extends React.Component {
  render() {
    const productId = this.props.productId;

    return [
      <AddToWishlistButton
        key="123"
        productId={productId}
      ></AddToWishlistButton>,
      <AddToCartButton key="321" productId={productId}></AddToCartButton>,
    ];
  }
}

const productTileControls = document.querySelectorAll('.product-tile-controls');
productTileControls.forEach((productTileControl, index) => {
  ReactDOM.render(
    <ProductControls key={index} productId={index}></ProductControls>,
    productTileControl,
  );
});
