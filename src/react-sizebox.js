var PropTypes = require('prop-types');
var React = require('react');
var createReactClass = require('create-react-class');
var ReactDOM = require('react-dom');

require('./react-sizebox.scss');

var Sizebox = createReactClass({

  componentDidMount: function() {
    this._updateSize();
    var win = window;
    if (win.addEventListener) {
        win.addEventListener('resize', this._onResize, false);
      } else if (win.attachEvent) {
        win.attachEvent('onresize', this._onResize);
      } else {
        win.onresize = this._onResize;
      }
  },
  componentWillUnmount: function() {
    var win = window;
    if (win.removeEventListener) {
        win.removeEventListener('resize', this._onResize, false);
      } else if (win.detachEvent) {
        win.detachEvent('onresize', this._onResize);
      } else {
        win.onresize = undefined;
      }
  },
  getInitialState: function() {
    return {width: 0, height: 0};
  },
  render: function() {
  	var dimensionProps = {};
  	dimensionProps[this.props.widthProp] = this.state.width;
  	dimensionProps[this.props.heightProp] = this.state.height;

  	var children = ''
    if(this.state.width !== 0 && this.state.height !== 0) {
      children =  React.Children.map(this.props.children, function(child){
        return React.cloneElement(child, dimensionProps);
      });
    }
    var fillerImage = ''
    if(this.props.fillerImage) {
      fillerImage = (
        <img src={this.props.fillerImage} />
      )
    }
    return (
      <div
        className={this.props.className || 'react-sizebox'}
        style={this.props.style}>
        {children}
        {fillerImage}
      </div>
    );
  },
  _onResize: function() {
    clearTimeout(this._updateTimer);
    this._updateTimer = setTimeout(this._updateSize, this.props.resizeDebounceTime);
  },
  _updateSize: function() {
    var domNode = ReactDOM.findDOMNode(this);
    this.setState({
      width: domNode.clientWidth,
      height: domNode.clientHeight
    });
  }

});

Sizebox.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  widthProp: PropTypes.string,
  heightProp: PropTypes.string,
  resizeDebounceTime: PropTypes.number
}

Sizebox.defaultProps = {
  widthProp: 'width',
  heightProp: 'height',
  resizeDebounceTime: 100
}

module.exports = Sizebox;
