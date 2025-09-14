// ЗАМЕНИ НА СВОИ ДАННЫЕ С AUTH0!
const AUTH0_DOMAIN = "YOUR_DOMAIN.auth0.com";
const AUTH0_CLIENT_ID = "YOUR_CLIENT_ID";

let auth0 = null;

async function configureClient() {
  auth0 = await createAuth0Client({
    domain: AUTH0_DOMAIN,
    client_id: AUTH0_CLIENT_ID,
    cacheLocation: "localstorage"
  });
}

window.onload = async () => {
  await configureClient();

  // Проверить, не возвращает ли Auth0 после login
  if (window.location.search.includes("code=") && window.location.search.includes("state=")) {
    await auth0.handleRedirectCallback();
    window.history.replaceState({}, document.title, "/");
  }

  updateUI();

  // Кнопки
  document.getElementById("login-btn")?.addEventListener("click", async () => {
    await auth0.loginWithRedirect({ redirect_uri: window.location.href });
  });

  document.getElementById("logout-btn")?.addEventListener("click", async () => {
    await auth0.logout({ returnTo: window.location.origin });
    updateUI();
  });

  document.getElementById("logout-btn-2")?.addEventListener("click", async () => {
    await auth0.logout({ returnTo: window.location.origin });
    updateUI();
  });
};

async function updateUI() {
  const isAuthenticated = await auth0.isAuthenticated();
  const loginBtn = document.getElementById("login-btn");
  const logoutBtn = document.getElementById("logout-btn");
  const logoutBtn2 = document.getElementById("logout-btn-2");
  const userInfo = document.getElementById("user-info");

  if (isAuthenticated) {
    const user = await auth0.getUser();
    if (loginBtn) loginBtn.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "";
    if (logoutBtn2) logoutBtn2.style.display = "";
    if (userInfo) {
      userInfo.style.display = "";
      userInfo.innerHTML = `
        <img src="${user.picture}" style="width:40px;border-radius:50%;vertical-align:middle;"> 
        <strong>${user.name || user.nickname}</strong> 
        <span style="color:#888;">(${user.email})</span>
      `;
    }
    // Автоматически заполня