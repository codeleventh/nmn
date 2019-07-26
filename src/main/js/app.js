'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {notes: []};
  }

  componentDidMount() {
    client({method: 'GET', path: '/api/note'}).done(response => {
      this.setState({notes: response.entity});
    });
  }

  render() {
    return (
        <Notes notes={this.state.notes}/>
    );
  }
}

class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {notes: props.notes};

    this.newNote = this.newNote.bind(this);
  }

  newNote() {
    var title = prompt("New title:", "note title");
    var body = prompt("New body:", "note body");
    client({method: 'GET', path: '/api/note'}).done(response => {
      this.setState({notes: response.entity});
    });
    this.setState(prev => ({
      notes: [...prev.notes, {title: title, body: body}]
    }));
  }

  render() {
    var notes = this.state.notes.map(note =>
        <Note note={note}/>
    );
    return (
        <div>
          <div>{notes}</div>
          <button onClick={this.newNote}>new</button>
        </div>
    )
  }
}

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.note.title,
      body: props.note.body,
      isHidden: false
    };
    this.editNote = this.editNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }

  editNote() {
    // TODO: title == body == null -> are you mad?
    // переиспользовать метод
    this.setState(state => ({
      title: prompt("Title:", state.title),
      body: prompt("Body:", state.body)
    }));
  }
  editNote() {
    this.setState({
      title: prompt("New title:", this.state.title),
      body: prompt("New body:", this.state.title)
    });
  }

  deleteNote() {
    this.setState({isHidden: true});
  }

  render() {
    if (this.state.isHidden) {
      return <div></div>;
    } else {
      return (
          <div>
            <div class="ntitle">{this.state.title}</div>
            <div class="nbody">{this.state.body}</div>
            <button onClick={this.editNote}>✏️</button>
            <button onClick={this.deleteNote}>🗑</button>
          </div>
      )
    }
  }
}

ReactDOM.render(
    <App/>,
    document.getElementById('react')
);

