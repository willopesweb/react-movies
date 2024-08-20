import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./Notifications.scss";

interface NotificationProps {
  message: string;
  type: "success" | "warning" | "error";
  float?: boolean;
  duration?: number; // em milissegundos, padrão 5000ms
  onClose?: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, float = false, duration = 5000, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showTimeout = setTimeout(() => {
      setVisible(true);
    }, 300);

    const hideTimeout = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
    };
  }, [duration]);

  useEffect(() => {
    if (!visible && onClose) {
      const removeTimeout = setTimeout(onClose, 300);
      return () => clearTimeout(removeTimeout);
    }
  }, [visible, onClose]);

  return ReactDOM.createPortal(
    <div
      className={`c-notification ${float ? "c-notification--float" : ""} ${type} ${visible ? "is-visible" : ""}`}
      onClick={() => setVisible(false)}
    >
      <p>{message}</p>
    </div>,
    document.body
  );
};

export default Notification;
