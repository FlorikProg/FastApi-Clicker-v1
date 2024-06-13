document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение формы (перезагрузка страницы)

    // Получаем данные из формы
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Создаем объект с данными
    const data = {
        username: username,
        password: password,
        click: 0,
    };

    // Отправляем данные на API 
    fetch('https://fastapi-florikprogflick.amvera.io/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Успешно:', data);
        window.location.replace("http://127.0.0.1:5500/frontend/templates/login.html");
    })
    .catch((error) => {
        console.error('Ошибка:', error);
    });
});