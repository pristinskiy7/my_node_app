
    // 1. Загрузка всех заметок (READ)
    async function loadNotes() {
        const response = await fetch('/api/notes');
        const notes = await response.json();
        const list = document.getElementById('notesList');
        list.innerHTML = ''; // Очищаем список перед отрисовкой

        notes.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.className = 'note';
            noteElement.innerHTML = `
                <h3>${note.title}</h3>
                <p>${note.content}</p>
                <button class="del-btn" onclick="deleteNote(${note.id})">Удалить</button>
            `;
            list.appendChild(noteElement);
        });
    }

    // 2. Добавление новой заметки (CREATE)
    async function addNote() {
        const titleInput = document.getElementById('title');
        const contentInput = document.getElementById('content');

        if (!titleInput.value || !contentInput.value) {
            alert("Заполни все поля!");
            return;
        }

        const newNote = {
            title: titleInput.value,
            content: contentInput.value
        };

        await fetch('/api/notes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newNote)
        });

        // Очищаем поля и перезагружаем список
        titleInput.value = '';
        contentInput.value = '';
        loadNotes();
    }

    // 3. Удаление заметки (DELETE)
    async function deleteNote(id) {
        if (confirm("Точно удалить?")) {
            await fetch(`/api/notes/${id}`, { method: 'DELETE' });
            loadNotes();
        }
    }

    // Загружаем заметки при открытии страницы
    loadNotes();
