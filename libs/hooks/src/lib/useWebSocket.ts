import { useEffect, useRef, useCallback } from 'react';

const useWebSocket = (url: string, callback: Function) => {
  const socketRef = useRef<WebSocket>();
  const callbackRef = useRef<Function>();

  const sendMessage = useCallback(
    (message) => {
      socketRef.current.send(JSON.stringify(message));
    },
    [socketRef]
  );

  const handleMessage = (event) => {
    const data = JSON.parse(event.data);
    try {
      callbackRef.current({ ...data, message: JSON.parse(data.message) });
    } catch (e) {
      callbackRef.current(data);
    }
  };

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const webSocket = new WebSocket(url);
    webSocket.onmessage = handleMessage;
    socketRef.current = webSocket;
  }, [url]);

  return [socketRef, sendMessage];
};

export default useWebSocket;
