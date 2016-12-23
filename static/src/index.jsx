import React from 'react';
import { render } from 'react-dom';

class Utils extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jPretty: {
        data : '',
        sort_keys: 'False',
        results: '',
      },
      urlCoder: {
        data: ''
      },
      htmlEscaper: {
        data: ''
      }
    }
    this.handleJSONData = this.handleJSONData.bind(this);
    this.handleJSONSubmit = this.handleJSONSubmit.bind(this);
    this.handleURLCoderData = this.handleURLCoderData.bind(this);
    this.handleURLCoderSubmit = this.handleURLCoderSubmit.bind(this);
    this.handleHTMLEscaperData = this.handleHTMLEscaperData.bind(this);
    this.handleHTMLEscaperSubmit = this.handleHTMLEscaperSubmit.bind(this);
  }

  handleJSONData(e) {
    this.setState({data: e.target.value});
  }

  handleJSONSubmit(e) {
    e.preventDefault();
    this.setState({
      jPretty: {
        data: e.target.elements.data.value,
        sort_keys: e.target.elements.sort_keys.value,
        results: 'loading...'
      }
    })

    var request = {
      method: 'POST',
      body: new FormData(e.target)
    }

    fetch('/api/json', request).then((response) =>  {
      response.text().then((text) => {
        this.setState({
          jPretty: {
            results: text,
          }
        });
      })
    })
  }

  handleURLCoderData(e) {
    this.setState({
      urlCoder: {
        data: e.target.value
      }
    });
  }

  handleURLCoderSubmit(e) {
    e.preventDefault();
    var request = {
      method: 'POST',
      body: new FormData(e.target)
    }

    fetch('/api/encode', request).then((response) =>  {
      response.text().then((text) => {
        this.setState({
          urlCoder: {
            data: text,
          }
        });
      })
    })
  }

  handleHTMLEscaperData(e) {
    this.setState({
      htmlEscaper: {
        data: e.target.value
      }
    });
  }

  handleHTMLEscaperSubmit(e) {
    e.preventDefault();
    var request = {
      method: 'POST',
      body: new FormData(e.target)
    }

    fetch('/api/entity', request).then((response) =>  {
      response.text().then((text) => {
        this.setState({
          htmlEscaper: {
            data: text,
          }
        });
      })
    })
  }

  render() {
    return (
      <div className="col clearfix xs-col-12 md-col-4 md-offset-4">
        <JSONPretty
          submitHandler={this.handleJSONSubmit}
          textChangeHandler={this.handleJSONData} />
        {this.state.jPretty.results.length > 0 &&
        <Results results={this.state.jPretty.results}/>
        }
        <URLCoder
          textChangeHandler={this.handleURLCoderData}
          submitHandler={this.handleURLCoderSubmit}
          data={this.state.urlCoder.data}/>
        <HTMLEscaper
          textChangeHandler={this.handleHTMLEscaperData}
          submitHandler={this.handleHTMLEscaperSubmit}
          data={this.state.htmlEscaper.data}/>
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

var URLCoder = props => (
  <div>
    <h2>URL Encode</h2>
      <form className="xs-mb3" onSubmit={props.submitHandler}>
        <textarea
          onChange={props.textChangeHandler}
          className="xt-mb1 xs-col-12"
          name="data"
          value={props.data} />
        <input className="checkbox" type="checkbox" id="decode" name="decode" value="True"/>
        <label htmlFor="decode">Decode</label>
        <button className="button" type="submit">Go</button>
    </form>
  </div>
)

var HTMLEscaper = props => (
  <div>
    <h2>HTML Escape</h2>
    <form className="xs-mb3" onSubmit={props.submitHandler}>
      <textarea
        onChange={props.textChangeHandler}
        className="xt-mb1 xs-col-12"
        name="data"
        value={props.data} />
      <input className="checkbox" type="checkbox" id="escaper" name="decode" value="True"/>
      <label htmlFor="escaper">Unescape</label>
      <button className="button" type="submit">Go</button>
    </form>
  </div>
)

var Results = props => (
  <div className="xs-p1 xs-border fill-gray-lighter">
    <pre>
      {props.results}
    </pre>
  </div>
)

render(<Utils />, document.getElementById("app"));
