document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bookingForm');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // В реальном приложении здесь был бы запрос к серверу
        alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
        form.reset();
    });

    // Установка минимальной даты (сегодня)
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;

    // Валидация количества участников
    const participantsInput = document.getElementById('participants');
    participantsInput.addEventListener('input', function() {
        if (this.value < 1) {
            this.value = 1;
        }
    });
});