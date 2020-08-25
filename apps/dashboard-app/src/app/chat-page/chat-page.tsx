import React from 'react';
import SimpleChat from '../simple-chat/simple-chat';
import './chat-page.scss';
import { Card } from '@demo-monorepo/ui';

export const ChatPage = () => {
  return (
    <div className="chat-page section container">
      <Card>
        <SimpleChat />
      </Card>
    </div>
  );
};

export default ChatPage;
