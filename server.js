// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const multer = require('multer');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Konfigurasi multer untuk penyimpanan file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/upload', upload.single('audio'), (req, res) => {
    if (req.file) {
        const audioUrl = `/uploads/${req.file.filename}`;
        io.emit('chat audio', { username: req.body.username, audioUrl });
        res.status(200).json({ audioUrl });
    } else {
        res.status(400).json({ error: 'No file uploaded' });
    }
});

io.on('connection', (socket) => {
    let username = '';

    console.log('a user connected');

    socket.on('user joined', (name) => {
        username = name;
        io.emit('user joined', username);
        console.log(`${username} joined the chat`);
    });

    socket.on('chat message', ({ username, message }) => {
        io.emit('chat message', { username, message });
        console.log(`message from ${username}: ${message}`);
    });

    socket.on('disconnect', () => {
        if (username) {
            io.emit('user left', username);
            console.log(`${username} left the chat`);
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
