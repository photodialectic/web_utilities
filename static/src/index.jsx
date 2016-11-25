import React from 'react';
import { render } from 'react-dom';

class Utils extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jPretty: {
        data : '',
        sort_keys: 'False',
      }
    }
    this.handleJSONData = this.handleJSONData.bind(this);
    this.handleJSONSubmit = this.handleJSONSubmit.bind(this);
  }

  handleJSONData(e) {
    this.setState({data: e.target.value});
  }

  handleJSONSubmit(e) {
    e.preventDefault();
    this.setState({
      jPretty: {
        data: e.target.elements.data.value,
        sort_keys: e.target.elements.sort_keys.value
      }
    })
    debugger;
  }

  render() {
    return (
      <div className="col clearfix xs-col-12 md-col-4 md-offset-4">
        <JSONPretty
          submitHandler={this.handleJSONSubmit}
          textChangeHandler={this.handleJSONData} />
      </div>
    )
  }
}

//stateless component
var JSONPretty = props => (
    <div>
      <h2>JSON</h2>
      <form className="xs-mb3" onSubmit={props.submitHandler}>
          <textarea
            onChange={props.textChangeHandler}
            className="xt-mb1 xs-col-12"
            name="data" />
          <input className="checkbox" type="checkbox" id="sort_keys" name="sort_keys" value="True"/>
          <label htmlFor="sort_keys">Sort Keys</label>
          <button className="button" type="submit">Go</button>
      </form>
    </div>
)

render(<Utils />, document.getElementById("app"));
