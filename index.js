const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// 1. ПАРСЕР JSON (Обязательно ПЕРЕД маршрутами)
app.use(express.json());

// 2. СТАТИКА (Ваши HTML/JS файлы)
app.use(express.static(path.join(__dirname, 'public')));

// 3. МАРШРУТ ДЛЯ ПОЛУЧЕНИЯ ЗАМЕТОК
app.get('/api/notes', (req, res) => {
    const data = fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8');
    res.json(JSON.parse(data || '[]'));
});

// 4. МАРШРУТ ДЛЯ ДОБАВЛЕНИЯ ЗАМЕТОК (Проверьте этот блок!)
app.post('/api/notes', (req, res) => {
    const filePath = path.join(__dirname, 'data.json');
    // Добавляем ID к пришедшим данным
    const newNote = { id: Date.now(), ...req.body }; 

    fs.readFile(filePath, 'utf8', (err, data) => {
        const notes = JSON.parse(data || '[]');
        notes.push(newNote);
        fs.writeFile(filePath, JSON.stringify(notes, null, 2), () => {
            res.status(201).json(newNote);
        });
    });
});

// Маршрут для удаления заметки
app.delete('/api/notes/:id', (req, res) => {
    const filePath = path.join(__dirname, 'data.json');
    const noteId = parseInt(req.params.id); // Получаем ID из ссылки

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Ошибка чтения');

        let notes = JSON.parse(data || '[]');
        // Фильтруем: оставляем только те заметки, ID которых НЕ совпадает
        const filteredNotes = notes.filter(note => note.id !== noteId);

        fs.writeFile(filePath, JSON.stringify(filteredNotes, null, 2), (err) => {
            if (err) return res.status(500).send('Ошибка записи');
            res.status(200).send('Удалено успешно');
        });
    });
});


app.listen(port, () => {
    console.log(`Сервер запущен: http://localhost:${port}`);
});