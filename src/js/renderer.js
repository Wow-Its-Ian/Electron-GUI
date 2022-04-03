const { ipcRenderer } = require('electron');

// App Buttons
const minimizeBtn = document.querySelector('#minimizeBtn');
const maximizeBtn = document.querySelector('#maximizeBtn');
const closeBtn = document.querySelector('#closeBtn');

// Sidebar
const showHideMenus = document.querySelector('#showHideMenus');
const mySidebar = document.querySelector('#mySidebar');

function changeMaxResBtn(isMaximizedApp) {
  if (isMaximizedApp) {
    maximizeBtn.setAttribute('title', 'Restore');

    maximizeBtn.classList.replace('maximizeBtn', 'restoreBtn');
  } else {
    maximizeBtn.setAttribute('title', 'Maximize');

    maximizeBtn.classList.replace('restoreBtn', 'maximizeBtn');
  }
}

// IPC SEND
// Minimize App
minimizeBtn.addEventListener('click', () => {
  ipcRenderer.send('app:minimize');
});
// Maximize/Restore App
maximizeBtn.addEventListener('click', () => {
  ipcRenderer.send('app:maximize-restore');
});
// Close App
closeBtn.addEventListener('click', () => {
  ipcRenderer.send('app:close');
});

// IPC ON
// Change Icon on Maximize
ipcRenderer.on('isMaximized', () => {
  changeMaxResBtn(true);
});
// Change Icon on Restore
ipcRenderer.on('isRestored', () => {
  changeMaxResBtn(false);
});

let isLeftMenuActive = true;

// Toggle menu
showHideMenus.addEventListener('click', () => {
  if (isLeftMenuActive) {
    mySidebar.setAttribute('width', '0px');
    isLeftMenuActive = false;
  } else {
    mySidebar.setAttribute('width', '280px');
    isLeftMenuActive = true;
  }
});
