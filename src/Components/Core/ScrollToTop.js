import { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { children } = this.props;
    return children;
  }
}
ScrollToTop.propTypes = {
  children: PropTypes.element.isRequired,
  /* eslint react/forbid-prop-types: 0 */
  location: PropTypes.object.isRequired,
};

export default withRouter(ScrollToTop);
