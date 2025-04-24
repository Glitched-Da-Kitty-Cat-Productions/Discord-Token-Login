function showNotification(message, type = "info") {
    const container = document.getElementById("notification-container");
    const notification = document.createElement("div");
    
    const errorIcon = type === "error" ? `<img src="static/icons/error.svg" alt="Error Icon" class="notification-icon">` : '';
    
    const infoIcon = type === "info" ? `<img src="static/icons/info.svg" alt="Information Icon" class="notification-icon">` : '';

    const successIcon = type === "success" ? `<img src="static/icons/success.svg" alt="Success Icon" class="notification-icon">` : '';

    notification.className = `notification ${type}`;
    
    if (type === "error") {
        notification.innerHTML = `${errorIcon} ${message}`;
    }
    if (type === "info") {
        notification.innerHTML = `${infoIcon} ${message}`;
    }
    if (type === "success") {
        notification.innerHTML = `${successIcon} ${message}`;
    }
    container.appendChild(notification);
    setTimeout(() => {
        notification.style.opacity = "0";
        setTimeout(() => container.removeChild(notification), 500);
    }, 5000);
}

