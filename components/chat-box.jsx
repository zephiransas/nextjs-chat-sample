import React, { useEffect, useState } from 'react';
import styles from './chat-box.module.css'

export default function ChatBox() {
  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setMessages] = useState([]);
  const messageTextIsEmpty = messageText.trim().length === 0;

  const handleKeyPress = (event) => {
    if (event.charCode !== 13 || messageTextIsEmpty) {
      return;
    }
    sendChatMessage(messageText);
    event.preventDefault();
  }

  const sendChatMessage = async (message) => {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"message": message})
    }).then(data => data.json())
    setMessages([...receivedMessages, {"message": message, "author": "me"}, {"message": res.response, "author": "bot"}])
    setMessageText("");
  }

  const formSubmit = (e) => {
    e.preventDefault();
    sendChatMessage(messageText);
  }

  const messages = receivedMessages.map((data, i) => {
    return <span key={i} className={styles.message} data-author={data.author}>{data.message}</span>
  })

  return (
    <div className={styles.chatHolder}>
      <div className={styles.chatText}>
        {messages}
      </div>

      <form className={styles.form} onSubmit={formSubmit}>
        <textarea 
          value={messageText}
          placeholder='send message...'
          className={styles.textarea}
          onChange={e => setMessageText(e.target.value)}
          onKeyDown={handleKeyPress}
          >
        </textarea>
        <button type="submit" className={styles.button} disabled={messageTextIsEmpty}>Send</button>
      </form>
    </div>
  )
}