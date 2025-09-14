// Пример frontend OAuth (Google/GitHub) через popup — только для демо!
// Для продакшн используйте Auth0, Firebase или серверную обработку!

function demoOAuth(provider) {
  alert("OAuth demo: Обычный OAuth требует настройки через сторонний сервис (Auth0, Firebase, Supabase).\n\nЗдесь реализована фронтовая имитация для демо.\nВ продакшн замените этот код на реальный OAuth.");
  // Имитируем успешный логин
  let user = {};
  if (provider === 'google') {
    user = { name: "Google User", email: "googleuser@example.com", avatar: "https://www.gravatar.com/avatar?d=identicon" };
  } else {
    user = { name: "GitHub User", email: "githubuser@example.com", avatar: "https://github.com/Andy-Z0z.png" };
  }
  localStorage.setItem('oauthUser', JSON.stringify(user));
  showOAuthUser();
}

function showOAuthUser() {
  const userInfo = document.getElementById('user-info');
  const user = JSON.parse(localStorage.getItem('oauthUser') || "null");
  if (user && userInfo) {
    userInfo.innerHTML = `<img src="${user.avatar}" alt="avatar" style="width:40px;border-radius:50%;vertical-align:middle;"> 
      <strong>${user.name}</strong> <span style="color:#888;">(${user.email})</span> 
      <button class="btn" style="margin-left:1em;" onclick="logoutOAuth()">Выйти</button>`;
    userInfo.style.display = '';
  }
}

function logoutOAuth() {
  localStorage.removeItem('oauthUser');
  const userInfo = document.getElementById('user-info');
  if (userInfo) userInfo.style.display = 'none';
}

// Для главной страницы
document.getElementById('google-login')?.addEventListener('click', () => demoOAuth('google'));
document.getElementById('github-login')?.addEventListener('click', () => demoOAuth('github'));
showOAuthUser();

// Для страницы beta.html
document.getElementById('google-login-beta')?.addEventListener('click', () => demoOAuth('google'));
document.getElementById('github-login-beta')?.addEventListener('click', () => demoOAuth('github'));