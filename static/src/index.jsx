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
      },
      markdowner: {
        data: ''
      },
      base64Coder: {
        data: ''
      },
      hasher: {
        data: ''
      },
      bookmarker: {
        data: '',
        text: ''
      }
    }
    this.handleJSONData = this.handleJSONData.bind(this);
    this.handleJSONSubmit = this.handleJSONSubmit.bind(this);
    this.handleURLCoderData = this.handleURLCoderData.bind(this);
    this.handleURLCoderSubmit = this.handleURLCoderSubmit.bind(this);
    this.handleHTMLEscaperData = this.handleHTMLEscaperData.bind(this);
    this.handleHTMLEscaperSubmit = this.handleHTMLEscaperSubmit.bind(this);
    this.handleMarkdownerData = this.handleMarkdownerData.bind(this);
    this.handleMarkdownerSubmit = this.handleMarkdownerSubmit.bind(this);
    this.handleBase64CoderData = this.handleBase64CoderData.bind(this);
    this.handleBase64CoderSubmit = this.handleBase64CoderSubmit.bind(this);
    this.handleHasherData = this.handleHasherData.bind(this);
    this.handleHasherSubmit = this.handleHasherSubmit.bind(this);
    this.handleBookmarkerData = this.handleBookmarkerData.bind(this);
    this.handleBookmarkerSubmit = this.handleBookmarkerSubmit.bind(this);
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

  handleMarkdownerData(e) {
    this.setState({
      markdowner: {
        data: e.target.value
      }
    });
  }

  handleMarkdownerSubmit(e) {
    e.preventDefault();
    var request = {
      method: 'POST',
      body: new FormData(e.target)
    }

    fetch('/api/markdown', request).then((response) =>  {
      response.text().then((text) => {
        this.setState({
          markdowner: {
            data: text,
          }
        });
      })
    })
  }

  handleBase64CoderData(e) {
    this.setState({
      base64Coder: {
        data: e.target.value
      }
    });
  }

  handleBase64CoderSubmit(e) {
    e.preventDefault();
    var request = {
      method: 'POST',
      body: new FormData(e.target)
    }

    fetch('/api/b64', request).then((response) =>  {
      response.text().then((text) => {
        this.setState({
          base64Coder: {
            data: text,
          }
        });
      })
    })
  }

  handleHasherData(e) {
    this.setState({
      hasher: {
        data: e.target.value
      }
    });
  }

  handleHasherSubmit(e) {
    e.preventDefault();
    var request = {
      method: 'POST',
      body: new FormData(e.target)
    }

    fetch('/api/hash', request).then((response) =>  {
      response.text().then((text) => {
        this.setState({
          hasher: {
            data: text,
          }
        });
      })
    })
  }

  handleBookmarkerData(e) {
    this.setState({
      bookmarker: {
        data: e.target.value,
        text: this.state.bookmarker.text,
      }
    });
  }

  handleBookmarkerSubmit(e) {
    e.preventDefault();
    var formData = new FormData(e.target);
    formData.set('text_only', 'True');

    var request = {
      method: 'POST',
      body: formData
    }

    fetch('/api/bookmark', request).then((response) =>  {
      response.text().then((text) => {
        this.setState({
          bookmarker: {
            data: this.state.bookmarker.data,
            text: text,
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
        <Markdowner
          textChangeHandler={this.handleMarkdownerData}
          submitHandler={this.handleMarkdownerSubmit}
          data={this.state.markdowner.data}/>
        <Base64er
          textChangeHandler={this.handleBase64CoderData}
          submitHandler={this.handleBase64CoderSubmit}
          data={this.state.base64Coder.data}/>
        <Hasher
          textChangeHandler={this.handleHasherData}
          submitHandler={this.handleHasherSubmit}
          data={this.state.hasher.data}/>
        <Bookmarker
          textChangeHandler={this.handleBookmarkerData}
          submitHandler={this.handleBookmarkerSubmit}
          data={this.state.bookmarker.data}
          text={this.state.bookmarker.text} />
        {this.state.bookmarker.text.length > 0 &&
          <Bookmarklet text={this.state.bookmarker.text} />
        }
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
            className="xs-mb1 xs-col-12"
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
          className="xs-mb1 xs-col-12"
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
        className="xs-mb1 xs-col-12"
        name="data"
        value={props.data} />
      <input className="checkbox" type="checkbox" id="escaper" name="decode" value="True"/>
      <label htmlFor="escaper">Unescape</label>
      <button className="button" type="submit">Go</button>
    </form>
  </div>
)

var Markdowner = props => (
  <div>
    <h2>Markdown</h2>
    <form className="xs-mb3" onSubmit={props.submitHandler}>
        <textarea
          onChange={props.textChangeHandler}
          className="xs-mb1 xs-col-12"
          name="data"
          value={props.data} />
        <button className="button" type="submit">Go</button>
    </form>
  </div>
)

var Base64er = props => (
  <div>
    <h2>Base64 Encode</h2>
      <form className="xs-mb3" onSubmit={props.submitHandler}>
        <textarea
          onChange={props.textChangeHandler}
          className="xs-mb1 xs-col-12"
          name="data"
          value={props.data} />
        <input className="checkbox" type="checkbox" id="b64" name="decode" value="True"/>
        <label htmlFor="b64">Decode</label>
        <button className="button" type="submit">Go</button>
    </form>
  </div>
)

var Hasher = props => (
  <div>
    <h2>Hasher</h2>
      <form className="xs-mb3" onSubmit={props.submitHandler}>
        <textarea
          onChange={props.textChangeHandler}
          className="xs-mb1 xs-col-12"
          name="data"
          value={props.data} />
        <input className="radio" defaultChecked type="radio" id="md5" name="sha1" value="False"/>
        <label htmlFor="md5">MD5</label>
        <input className="radio" type="radio" id="sha1" name="sha1" value="True"/>
        <label htmlFor="sha1">SHA1</label>
        <button className="button" type="submit">Go</button>
    </form>
  </div>
)

var Bookmarker = props => (
  <div>
    <h2>Bookmarklet</h2>
      <form className="xs-mb3" onSubmit={props.submitHandler}>
        <textarea
          onChange={props.textChangeHandler}
          className="xs-mb1 xs-col-12"
          name="data"
          value={props.data} />
        <button className="button" type="submit">Go</button>
    </form>
  </div>
)

var Bookmarklet = props => (
  <div>
    <a href={props.text}>Drag me</a>
    <pre>
      {props.text}
    </pre>
  </div>
)


var Results = props => (
  <div className="xs-p1 xs-border fill-gray-lighter xs-mb1">
    <pre>
      {props.results}
    </pre>
  </div>
)

render(<Utils />, document.getElementById("app"));
