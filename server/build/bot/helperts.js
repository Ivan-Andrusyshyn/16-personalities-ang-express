"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = formatDate;
exports.formatTestName = formatTestName;
function formatDate(date) {
    const d = new Date(date);
    return d.toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}
function formatTestName(test) {
    const map = {
        'you-coffee': '☕ Яка ти кава',
        'be-yourself': '🪞 Бути собою',
        attractiveness: '✨ Привабливість',
        'traumatic-experience': '🧠 Травматичний досвід',
        'role-in-relationships': '💞 Роль в стосунках',
        'toxical-relationships': '⚠️ Токсичні стосунки',
    };
    return map[test] || test;
}
