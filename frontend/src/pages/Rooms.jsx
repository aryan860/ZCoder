import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from '../context/AuthContext';

const Rooms = () => {
  const { user } = useAuth();
  const [room, setRoom] = useState('');
  const [joinedRoom, setJoinedRoom] = useState('');
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (user) {
      const newSocket = io('http://localhost:5000', {
        auth: {
          token: localStorage.getItem('zcoder-user-token')
        }
      });
      setSocket(newSocket);

      newSocket.on('receive_message', data => {
        setChat(prev => [...prev, data]);
      });

      return () => newSocket.disconnect();
    }
  }, [user]);

  if (!socket) {
    return <p style={{ padding: '2rem' }}>Please log in to join a room.</p>;
  }

  const joinRoom = () => {
    if (room.trim()) {
      socket.emit('join_room', room);
      setJoinedRoom(room);
      setChat([]);
    }
  };

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('send_message', { room, message });
      setMessage('');
    }
  };

  return (
    <div style={styles.container}>
      <h2>💬 Interactive Rooms</h2>

      {!joinedRoom ? (
        <div style={styles.joinBox}>
          <input
            type="text"
            placeholder="Enter room ID"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            style={styles.input}
          />
          <button onClick={joinRoom} style={styles.button}>Join Room</button>
        </div>
      ) : (
        <div>
          <p>Joined room: <strong>{joinedRoom}</strong></p>
          <div style={styles.chatBox}>
            {chat.map((msg, i) => (
              <div key={i} style={styles.message}>
                <strong>{msg.user.slice(0, 5)}</strong>: {msg.message}
              </div>
            ))}
          </div>
          <div style={styles.messageInput}>
            <input
              type="text"
              placeholder="Type message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={styles.input}
            />
            <button onClick={sendMessage} style={styles.button}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem'
  },
  joinBox: {
    display: 'flex',
    gap: '10px'
  },
  chatBox: {
    marginTop: '1rem',
    padding: '1rem',
    background: '#f2f2f2',
    height: '300px',
    overflowY: 'auto',
    borderRadius: '5px'
  },
  message: {
    marginBottom: '0.5rem'
  },
  messageInput: {
    marginTop: '1rem',
    display: 'flex',
    gap: '10px'
  },
  input: {
    padding: '10px',
    flex: 1
  },
  button: {
    padding: '10px 15px',
    background: '#282c34',
    color: '#fff',
    border: 'none',
    cursor: 'pointer'
  }
};

export default Rooms;
