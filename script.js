document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('bookingForm');

    // Установка минимальной даты (сегодня)
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;

    // Валидация количества участников
    const participantsInput = document.getElementById('participants');
    participantsInput.addEventListener('input', function () {
        if (this.value < 1) {
            this.value = 1;
        }
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // === Telegram данные ===
        const token = '7737058315:AAH23LiJbRutwAbslEgkPSO1bosyk6VlJTg';
        const chatId = '542079843';

        const text = `
🚨 *Новая заявка* 🚨

👤 Имя: ${data.name}
📞 Телефон: ${data.phone}
📧 Email: ${data.email || 'Не указан'}
📅 Дата: ${data.date}
🕒 Время: ${data.time}
🐴 Услуга: ${data.service}
👥 Участников: ${data.participants}
📝 Сообщение: ${data.message || 'Нет доп. информации'}
        `;

        // Отправка в Telegram
        fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: text,
                parse_mode: 'Markdown',
            }),
        })
        .then(response => {
            if (response.ok) {
                alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
                form.reset();
            } else {
                alert('Ошибка при отправке формы. Попробуйте позже.');
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Ошибка при отправке: ' + error.message);
        });
    });
});
