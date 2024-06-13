document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение формы (перезагрузка страницы)

    // Получаем данные из формы
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Создаем объект с данными
    const data = {
        username: username,
        password: password,
        click: 0
    };

    // Отправляем данные на API с помощью fetch
    fetch('https://localhost/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Успешно:', data);
        function setCookie(name, value, days) {
            let expires = "";
            if (days) {
              let date = new Date();
              date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
              expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + (value || "") + expires + "; path=/" + ";path=/;SameSite=None;Secure";
          }
          
          // Пример использования
        let jwtToken = data
        setCookie("jwtToken", jwtToken, 1);
        window.location.replace("path to redirect"); 
    })
    .catch((error) => {
        console.error('Ошибка:', error);
    });
});


