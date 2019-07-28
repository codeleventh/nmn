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
    var json = fetch('/api/note', {method: 'GET'})
    .then(function (response) {
      return response.json();
    });
    this.setState({notes: json});
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
    this.state = {notes: []};
    this.newNote = this.newNote.bind(this);
  }

  newNote(e) {
    var title = prompt("New title:", "note title");
    var body = prompt("New body:", "note body");

    fetch('/api/note', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: 0,
        title: title,
        body: body
      })
    }).then(function (response) {
      return response.json();
    }).then(json => {
      this.setState(prev => ({
        notes: [...prev.notes, {
          id: json.id,
          title: title, body: body
        }]
      }))
    }).catch(error => alert('Ошибка: ' + error));
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

// TODO: первое обновление стейта
// TODO: передача параметров в методы
// TODO: (title == body == null) -> are you mad?