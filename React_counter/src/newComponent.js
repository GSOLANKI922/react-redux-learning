// import React, { Component } from 'react'

// class clickHandler extends Component {
//     constructor(props) {
//       super(props);

//       this.onClickDiv = this.onClickDiv.bind(this);
//     }

//     onClickDiv() {
//         console.log("clicked");
//     }

//     render() {
//       return <button onClick={this.onClickDiv}>clicj</button>;
//     }
//   }

//   export default clickHandler

import React, { Component } from "react";

export default class ButtonHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
    };
  }

//   clickHan() {
//     console.log("click");
//     // this.setState({
//     //   count: this.state.count + 1
//     // });
//   }
  render() {
    return (
      <div>
        <h1>{this.state.count}</h1>
        <button onClick={() => this.setState({count: this.state.count + 1})}>click</button>
      </div>
    );
  }
}

