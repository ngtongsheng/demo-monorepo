import React, { FunctionComponent } from 'react';

import './chat-bubble.scss';

type Side = 'left' | 'right';

export interface ChatBubbleProps {
  side?: Side;
  text: string;
}

export const ChatBubble: FunctionComponent<ChatBubbleProps> = ({
  side = 'left',
  text,
}) => {
  return (
    <div className={`chat-bubble-row is-${side}`}>
      <div className="chat-bubble">{text}</div>
    </div>
  );
};

export default ChatBubble;
