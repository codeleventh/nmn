'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {notes: []};
    this.newNote = this.newNote.bind(this);
    this.searchNote = this.searchNote.bind(this);
  }

  componentDidMount() {
    client({method: 'GET', path: '/api/note'}).done(response => {
      this.setState({notes: response.entity});
    });
  }

  newNote(e) {
    var title = prompt("New title:", "note title");
    var body = prompt("New body:", "note body");
    if (title == body == undefined) {
      alert('Note cannot be empty! Try again.')
    }
    return;

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

  searchNote(e) {
    e.preventDefault();
    const searchString = document.getElementById('input').value;

    fetch('/api/search?query=' + encodeURIComponent(searchString))
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        return {notes: []};
      }
    })
    .then(notes =>
        this.setState({notes: notes})
    )
    .catch(error => alert('Error: ' + error));
  }

  render() {
    const notes = this.state.notes.map(note =>
        <Note note={note}/>
    );
    return (
        <div>
          <div id="toolbar">
            <button onClick={this.newNote}>➕</button>
            <input type="text" size="30" id="input"></input>
            <button onClick={this.searchNote}>🔍</button>
          </div>
          <div id="notes">
            {notes}
          </div>
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
    var newTitle = prompt('New title:', this.state.title);
    var newBody = prompt('New body:', this.state.body);

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
          <div class="note">
            <div class="ntitle">{this.state.title}</div>
            <div class="nbody">{this.state.body}</div>
            <button onClick={this.editNote}>✏️</button>
            <button onClick={this.deleteNote}>🗑️</button>
          </div>
      )
    }
  }
}

ReactDOM.render(
    <App/>,
    document.getElementById('react')
);
