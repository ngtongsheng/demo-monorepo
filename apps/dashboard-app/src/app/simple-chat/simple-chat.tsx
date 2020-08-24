import React, { useCallback, useState, useRef } from 'react';
import axios from 'axios';
import { useWebSocket } from '@demo-monorepo/hooks';
import {
  Input,
  Columns,
  Column,
  Button,
  FaIcon,
  ChatBubble,
} from '@demo-monorepo/ui';
import './simple-chat.scss';

const wss = 'wss://pg7hwmufk8.execute-api.ap-southeast-1.amazonaws.com/dev';
const url = `https://r2zjarqvg5.execute-api.ap-southeast-1.amazonaws.com/staging/pushNotification`;

type Side = 'left' | 'right';

interface Message {
  side: Side;
  text: string;
  time: number;
}

interface SendMessage {
  type: string;
  id: number;
  text: string;
}

export const SimpleChat = () => {
  const messagesRef = useRef<HTMLDivElement>();
  const inputRef = useRef<HTMLInputElement>();
  const id = useRef<number>(Date.now());
  const [currentText, setCurrentText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = useCallback(
    async (event) => {
      event.preventDefault();

      const message: SendMessage = {
        type: 'chat',
        id: id.current,
        text: currentText,
      };

      await axios.get(`${url}?&message=${JSON.stringify(message)}`);

      setCurrentText('');
      inputRef.current.focus();
    },
    [currentText]
  );

  const handleMessage = useCallback(
    ({ message }) => {
      const isMe = message.id === id.current;
      const side = isMe ? 'right' : 'left';

      setMessages([
        ...messages,
        {
          side,
          text: message.text,
          time: Date.now(),
        },
      ]);

      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    },
    [messages]
  );

  const handleChange = useCallback((event) => {
    setCurrentText(event.target.value);
  }, []);

  useWebSocket(wss, handleMessage);

  return (
    <div className="simple-chat">
      <div className="title is-4">Simple web socket chat</div>
      <div className="content">
        <p>Open this page in another tab to try this feature.</p>
      </div>
      <div className="simple-chat-container">
        <div className="simple-chat-messages" ref={messagesRef}>
          {messages?.map(({ side, text, time }) => (
            <ChatBubble key={time} side={side} text={text} />
          ))}
        </div>
        <form className="simple-chat-input" onSubmit={handleSend}>
          <Columns isVcentered>
            <Column>
              <Input
                ref={inputRef}
                value={currentText}
                placeholder="Say something"
                onChange={handleChange}
              />
            </Column>
            <Column isNarrow>
              <Button
                type="submit"
                color="dark"
                disabled={!currentText}
                onClick={handleSend}
                isOutlined
              >
                <FaIcon name="paper-plane" />
              </Button>
            </Column>
          </Columns>
        </form>
      </div>
    </div>
  );
};

export default SimpleChat;
