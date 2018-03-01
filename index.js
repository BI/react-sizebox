var React = require('react');
var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');
var ReactSizebox = require('./src/react-sizebox')

var DimensionDisplay = createReactClass({
  render: function() {
    return (
    	<div className="dimension-display">
    		<div className="dimension-display-height">Child Height: {this.props.height}</div>
    		<div className="dimension-display-width">Child Width: {this.props.width}</div>
    	</div>
    );
  }
});

/* jshint undef:false */
ReactDOM.render(
	<ReactSizebox className="react-sizebox" widthProp="width" heightProp="height">
  		<DimensionDisplay />
  	</ReactSizebox>
	, document.getElementById('main'));
