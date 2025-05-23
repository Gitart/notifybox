const NotiBox = {
  show: function(title, message, type = 'info', timeout = 3000) {
    let container = document.getElementById('notifications-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'notifications-container';
      container.style.position = 'fixed';
      container.style.top = '20px';
      container.style.right = '20px';
      container.style.zIndex = '9999';
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '10px';
      document.body.appendChild(container);
    }

    const config = {
      success: { color: '#4caf50', icon: '✅', sound: 'success.mp3' },
      error:   { color: '#f44336', icon: '❌', sound: 'error.mp3' },
      info:    { color: '#2196f3', icon: 'ℹ️',  sound: 'info.mp3' },
      warning: { color: '#ff9800', icon: '⚠️',  sound: 'warning.mp3' }
    };

    const { color, icon, sound } = config[type] || config['info'];

    const notification = document.createElement('div');
    notification.className = 'notification-card';
    notification.style.display = 'flex';
    notification.style.alignItems = 'center';
    notification.style.border = `2px solid ${color}`;
    notification.style.borderLeftWidth = '6px';
    notification.style.borderRadius = '4px';
    notification.style.padding = '10px';
    notification.style.background = '#fff';
    notification.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
    notification.style.maxWidth = '340px';
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.3s ease';

    const iconDiv = document.createElement('div');
    iconDiv.className = 'notification-icon';
    iconDiv.style.fontSize = '32px';
    iconDiv.style.marginRight = '10px';
    iconDiv.innerText = icon;

    const textDiv = document.createElement('div');
    textDiv.className = 'notification-text';
    textDiv.style.flex = '1';

    const titleElem = document.createElement('h5');
    titleElem.innerText = title;
    titleElem.style.margin = '0';
    titleElem.style.color = color;
    titleElem.style.fontSize = '16px';

    const messageElem = document.createElement('p');
    messageElem.innerText = message;
    messageElem.style.margin = '0';
    messageElem.style.color = '#333';
    messageElem.style.fontSize = '14px';

    textDiv.appendChild(titleElem);
    textDiv.appendChild(messageElem);

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.border = 'none';
    closeBtn.style.background = 'transparent';
    closeBtn.style.fontSize = '18px';
    closeBtn.style.marginLeft = '10px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.onclick = () => removeNotification(notification);

    notification.appendChild(iconDiv);
    notification.appendChild(textDiv);
    notification.appendChild(closeBtn);

    container.appendChild(notification);

    // Плавное появление
    requestAnimationFrame(() => {
      notification.style.opacity = '1';
    });

    // Таймер удаления
    const timer = setTimeout(() => {
      removeNotification(notification);
    }, timeout);

    function removeNotification(elem) {
      elem.style.opacity = '0';
      setTimeout(() => elem.remove(), 300);
      clearTimeout(timer);
    }

    // Звук
    const audio = new Audio(sound);
    audio.play();
  }
};
