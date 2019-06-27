
import React from 'react'

export default function Icon(props) {
    return (
        <svg 
            className={`icon icon-${props.icon}`} 
            viewBox='0 0 16 16' 
            xmlns="http://www.w3.org/2000/svg" 
            width={this.props.width} 
            height={this.props.height} 
            aria-labelledby={this.props.iconTitle}
            >
            <use xlinkHref={`${url}#icon-${props.icon}`} />
        </svg>
    )
}


// const IconOffice = React.createClass({
//  render() {
//    return (
//      <svg className="office" xmlns="http://www.w3.org/2000/svg" width={this.props.width} height={this.props.height} viewBox="0 0 188.5 188.5" aria-labelledby={this.props.iconTitle}>
//         <title id={this.props.iconTitle}>Office With a Lamp</title>
//       </svg>
//    )
//  }
// });
