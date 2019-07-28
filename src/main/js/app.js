'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {notes: []};
    this.newNote = this.newNote.bind(this);
  }

  componentDidMount() {
    client({method: 'GET', path: '/api/note'}).done(response => {
      this.setState({notes: response.entity});
    });
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
        title: title,
        body: body
      })
    }).then(function (response) {
      return response.json();
    }).then(json => {
      this.setState(prev => ({
        notes: [...prev.notes, {
          id: json.id,
          title: title,
          body: body
        }]
      }))
    }).catch(error => alert('Error: ' + error));
  }

  render() {
    const notes = this.state.notes.map(note =>
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
      id: props.note.id,
      title: props.note.title,
      body: props.note.body,
      isHidden: false
    };
    this.editNote = this.editNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }

  editNote() {
    var newTitle = prompt("New title:", this.state.title);
    var newBody = prompt("New body:", this.state.body);

    fetch('/api/note/' + this.state.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: newTitle,
        body: newBody
      })
    }).then(response => {
      if (response.ok) {
        this.setState({
          body: newBody,
          title: newTitle
        })
      }
    }).catch(error => alert('Error: ' + error))
  }

  deleteNote() {
    fetch('/api/note/' + this.state.id, {
      method: 'DELETE'
    }).then(response => {
      if (response.ok) {
        this.setState({
          isHidden: true,
        })
      }
    }).catch(error => alert('Error: ' + error))
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