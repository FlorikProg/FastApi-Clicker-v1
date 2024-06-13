let clicks = 0;
let totalClicks = 0; // Переменная для хранения общего количества кликов
let lastSendTime = Date.now(); // Инициализируем с текущим временем, чтобы отправить первый запрос сразу

// Функция для сохранения состояния кликов в localStorage
function saveClicks() {
  localStorage.setItem('clicks', clicks);
  localStorage.setItem('totalClicks', totalClicks);
  localStorage.setItem('lastSendTime', lastSendTime);
}

// Функция для восстановления состояния кликов из localStorage
function restoreClicks() {
  clicks = parseInt(localStorage.getItem('clicks')) || 0;
  totalClicks = parseInt(localStorage.getItem('totalClicks')) || 0;
  lastSendTime = parseInt(localStorage.getItem('lastSendTime')) || Date.now();
}

// Обработчик события перед закрытием страницы
window.addEventListener('beforeunload', () => {
  saveClicks();
});

// Обработчик события загрузки страницы
window.addEventListener('load', () => {
  restoreClicks();
  document.getElementById('click').textContent = totalClicks;
  setInterval(doAction, 5000); // Запускаем периодическое обновление каждые 5 секунд
});

function doAction() {
  // Если прошло более 5 секунд с последнего запроса, отправляем запрос
  if (Date.now() - lastSendTime >= 5000) {
    lastSendTime = Date.now(); // Обновляем время последнего запроса

    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    }

    // Получаем JWT токен из куки
    const jwt_token = getCookie('jwtToken');

    // Отправляем запрос на бэкенд
    fetch('https://localhost/addclick?jwt=' + jwt_token + '&clicks=' + clicks, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jwt: jwt_token,
        clicks: clicks
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // Обновляем общее количество кликов из ответа сервера
      totalClicks = data.clicks; // Если данные недоступны, устанавливаем 0
      // Обновляем текущее количество кликов
      clicks = 0;
      // Обновляем текст на странице
      document.getElementById('click').textContent = totalClicks;
      // Сохраняем состояние кликов
      saveClicks();
    })
    .catch(error => console.error('Error:', error));
  }
}

// Добавляем обработчик события клика на кнопку
document.querySelector('.button').addEventListener('click', () => {
  clicks += 1; // Увеличиваем счетчик кликов
  // Обновляем текст на странице
  document.getElementById('click').textContent = totalClicks + clicks;
});



document.getElementById('clickButton').addEventListener('click', function(event) {
  var floatingText = document.getElementById('floatingText');
  floatingText.style.display = 'block';
  floatingText.style.left = event.clientX + 'px';
  floatingText.style.top = event.clientY + 'px';
  floatingText.style.opacity = 1;

  setTimeout(function() {
    floatingText.style.opacity = 0;
    setTimeout(function() {
      floatingText.style.display = 'none';
    }, 500); // Задержка должна быть такой же, как и в transition
  }, 500); // Задержка перед исчезновением текста
});
