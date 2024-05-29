const socket = io();

const loginBox = document.getElementById('loginbox');
const chatBox = document.getElementById('chatbox');
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const usernameInput = document.getElementById('username');
const loginBtn = document.getElementById('loginbtn');
const uploadForm = document.getElementById('uploadForm');
const imageInput = document.getElementById('imageInput');

let username = '';

loginBtn.addEventListener('click', () => {
    username = usernameInput.value.trim();
    if (username) {
        loginBox.style.display = 'none';
        chatBox.style.display = 'block';
        socket.emit('user joined', username);
    }
});

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value && username) {
        socket.emit('chat message', { username, message: input.value });
        input.value = '';
    }
});

uploadForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if (imageInput.files.length > 0 && username) {
        const formData = new FormData();
        formData.append('image', imageInput.files[0]);
        formData.append('username', username);

        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.imageUrl) {
                imageInput.value = '';
            } else {
                console.error('Failed to upload image');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});

socket.on('chat message', function({ username, message }) {
    const item = document.createElement('div');
    item.textContent = `${username}: ${message}`;
    item.classList.add('p-2', 'bg-gray-200', 'mb-2', 'rounded');
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
});

socket.on('chat image', function({ username, imageUrl }) {
    const item = document.createElement('div');
    item.innerHTML = `${username}: <img src="${imageUrl}" class="chat-image" />`;
    item.classList.add('p-2', 'bg-gray-200', 'mb-2', 'rounded');
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
});

socket.on('user joined', function(username) {
    const item = document.createElement('div');
    item.textContent = `${username} joined the chat`;
    item.classList.add('p-2', 'bg-green-200', 'mb-2', 'rounded');
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
});

socket.on('user left', function(username) {
    const item = document.createElement('div');
    item.textContent = `${username} left the chat`;
    item.classList.add('p-2', 'bg-red-200', 'mb-2', 'rounded');
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
});

function toggleImageSize(image) {
    if (image.classList.contains('full-size')) {
        image.classList.remove('full-size');
    } else {
        image.classList.add('full-size');
    }
}

// Event listener for clicking on images
document.addEventListener('click', function(event) {
    const clickedElement = event.target;
    if (clickedElement.tagName === 'IMG' && clickedElement.classList.contains('chat-image')) {
        toggleImageSize(clickedElement);
    }
});

