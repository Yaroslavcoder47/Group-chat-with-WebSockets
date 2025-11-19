const roomData = document.getElementById("room-data");
const roomId = roomData.getAttribute("data-room-id");
const username = roomData.getAttribute("data-username");
const userId = roomData.getAttribute("data-user-id");

const ws = new WebSocket(`ws://localhost:8005/ws/chat/${roomId}/${userId}?username=${username}`);

ws.onopen = () => {
    console.log("Соединение установлено");
};

ws.onclose = () => {
    console.log("Соединение закрыто");
};

ws.onerror = (error) => {
    console.error("Ошибка WebSocket:", error);
};

ws.onmessage = (event) => {
    try {
        const messages = document.getElementById("messages");
        const messageData = JSON.parse(event.data);
        const message = document.createElement("div");

        if (messageData.is_self) {
            message.className = "p-2 my-1 bg-blue-500 text-white rounded-md self-end max-w-xs ml-auto";
        } else {
            message.className = "p-2 my-1 bg-gray-200 text-black rounded-md self-start max-w-xs";
        }

        message.textContent = messageData.text;
        messages.appendChild(message);
        messages.scrollTop = messages.scrollHeight;
    } catch (error) {
        console.error("Ошибка при обработке сообщения:", error, event.data);
    }
};


function sendMessage() {
    const input = document.getElementById("messageInput");
    if (input.value.trim() && ws.readyState === WebSocket.OPEN) {
        ws.send(input.value);
        input.value = '';
    } else if (ws.readyState !== WebSocket.OPEN) {
        console.error("WebSocket не подключен. Состояние:", ws.readyState);
        alert("Соединение не установлено. Пожалуйста, обновите страницу.");
    }
}


document.getElementById("messageInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});