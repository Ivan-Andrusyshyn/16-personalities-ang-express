export function formatDate(date: string | Date): string {
  const d = new Date(date);

  return d.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
export function formatTestName(test: string): string {
  const map: Record<string, string> = {
    'you-coffee': '☕ Яка ти кава',
    'be-yourself': '🪞 Бути собою',
    attractiveness: '✨ Привабливість',
    'traumatic-experience': '🧠 Травматичний досвід',
    'role-in-relationships': '💞 Роль в стосунках',
    'toxical-relationships': '⚠️ Токсичні стосунки',
  };

  return map[test] || test;
}
