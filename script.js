async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

document.getElementById('generateHash').addEventListener('click', async () => {
  const inputText = document.getElementById('inputText').value;
  const outputHash = document.getElementById('outputHash');
  
  if (inputText.trim() === '') {
    outputHash.value = 'Please enter some text!';
  } else {
    const hash = await sha256(inputText);
    outputHash.value = hash;
  }
});

const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.classList.toggle('active');
  themeIcon.src = document.body.classList.contains('dark') ? 'moon.svg' : 'sun.svg';
});

const languageSelect = document.getElementById('languageSelect');
languageSelect.addEventListener('change', (event) => {
  const selectedLanguage = event.target.value;
  translatePage(selectedLanguage);
});

const translatePage = (language) => {
  const elementsToTranslate = document.querySelectorAll('[data-translate]');
  elementsToTranslate.forEach((element) => {
    const key = element.getAttribute('data-translate');
    element.textContent = translations[language][key];
  });

  const placeholdersToTranslate = document.querySelectorAll('[data-placeholder]');
  placeholdersToTranslate.forEach((textarea) => {
    const key = textarea.getAttribute('data-placeholder');
    textarea.placeholder = translations[language][key];
  });
};
