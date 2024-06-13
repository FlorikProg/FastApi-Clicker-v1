// Функция для отправки запроса на сервер и обновления списка пользователей
function updateUserList() {
    fetch('https://localhost/all_users')
        .then(response => response.json())
        .then(data => {
            const userList = document.getElementById('user-list');
            userList.innerHTML = ''; // Очищаем предыдущее содержимое

            // Создаем элементы списка для каждого пользователя
            data.forEach(user => {
                const listItem = document.createElement('h2');
                listItem.textContent = `${user.username} - Clicks: ${user.click}`;
                userList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Ошибка при получении данных:', error);
        });
}

// Вызываем функцию при загрузке страницы
window.onload = updateUserList;
