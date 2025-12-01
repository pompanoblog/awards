document.addEventListener('DOMContentLoaded', () => {
    const notificationBtn = document.querySelector('.notification-btn');

    if (notificationBtn) {
        notificationBtn.addEventListener('click', async () => {
            if (!('Notification' in window)) {
                alert('Este navegador não suporta notificações.');
                return;
            }

            if (Notification.permission === 'granted') {
                scheduleNotification();
            } else if (Notification.permission !== 'denied') {
                const permission = await Notification.requestPermission();
                if (permission === 'granted') {
                    scheduleNotification();
                }
            }
        });
    }

    function scheduleNotification() {
        const targetDate = new Date('2025-12-05T12:00:00-03:00'); // 5 de dezembro de 2025, 12:00 BRT
        const now = new Date();
        const timeUntilNotification = targetDate.getTime() - now.getTime();

        if (timeUntilNotification > 0) {
            // Se o navegador estiver aberto na hora, mostra a notificação
            setTimeout(() => {
                showNotification();
            }, timeUntilNotification);

            alert('Notificação agendada para 5 de dezembro às 12h00! Mantenha esta aba aberta ou certifique-se de que seu navegador permite notificações em segundo plano.');
        } else {
            alert('A data do evento já passou!');
        }
    }

    function showNotification() {
        new Notification('Pompano Awards 2025', {
            body: 'Chegou a hora, vote nos indicados ao Pompano Awards 2025!',
            icon: 'assets/logoawards.svg' // Caminho para o ícone
        });
    }
});
