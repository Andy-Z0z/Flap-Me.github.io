const BETA_RELEASES = [
  {
    name: "ProjectName Canary v1.2.0-canary",
    file: "files/ProjectName-v1.2.0-canary.zip",
    channel: "canary"
  },
  {
    name: "ProjectName Alpha v1.2.0-alpha",
    file: "files/ProjectName-v1.2.0-alpha.zip",
    channel: "alpha"
  },
  {
    name: "ProjectName RTA v1.2.0-rta",
    file: "files/ProjectName-v1.2.0-rta.zip",
    channel: "rta"
  },
  {
    name: "ProjectName RT v1.2.0-rt",
    file: "files/ProjectName-v1.2.0-rt.zip",
    channel: "rt"
  }
];

const CHANNEL_ORDER = ["canary", "alpha", "rta", "rt"];
const CHANNEL_NAMES = {
  canary: "Canary (Самый ранний)",
  alpha: "Alpha (Ранний)",
  rta: "RTA (Середина теста)",
  rt: "RT (Почти релиз)"
};

const betaForm = document.getElementById('beta-form');
const registrationSection = document.getElementById('registration-section');
const betaFilesSection = document.getElementById('beta-files-section');
const userChannelSpan = document.getElementById('user-channel');
const betaReleaseList = document.getElementById('beta-release-list');
const logoutBtn = document.getElementById('logout-btn');

function checkRegistration() {
  const data = localStorage.getItem('betaUser');
  if (data) {
    const user = JSON.parse(data);
    registrationSection.style.display = 'none';
    betaFilesSection.style.display = '';
    userChannelSpan.textContent = CHANNEL_NAMES[user.channel];
    renderBetaReleases(user.channel);
  } else {
    registrationSection.style.display = '';
    betaFilesSection.style.display = 'none';
    betaReleaseList.innerHTML = "";
  }
}

function renderBetaReleases(channel) {
  const allowedIdx = CHANNEL_ORDER.indexOf(channel);
  betaReleaseList.innerHTML = "";
  BETA_RELEASES.forEach(rel => {
    if (CHANNEL_ORDER.indexOf(rel.channel) >= allowedIdx) return;
    const li = document.createElement('li');
    li.innerHTML = `<span class="release-name">${rel.name}</span>
      <a href="${rel.file}" download class="btn">Скачать</a>`;
    betaReleaseList.appendChild(li);
  });
  const mainRel = BETA_RELEASES.find(rel => rel.channel === channel);
  if (mainRel) {
    const li = document.createElement('li');
    li.innerHTML = `<span class="release-name">${mainRel.name}</span>
      <a href="${mainRel.file}" download class="btn">Скачать</a>`;
    betaReleaseList.appendChild(li);
  }
}

checkRegistration();

betaForm && betaForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = betaForm.elements['name'].value.trim();
  const email = betaForm.elements['email'].value.trim();
  const channel = betaForm.elements['channel'].value;
  const tosChecked = betaForm.elements['tos'].checked;
  if (name && email && channel && tosChecked) {
    localStorage.setItem('betaUser', JSON.stringify({ name, email, channel }));
    checkRegistration();
  }
});

logoutBtn && logoutBtn.addEventListener('click', function() {
  localStorage.removeItem('betaUser');
  checkRegistration();
});