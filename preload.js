const types = ['chrome', 'node', 'electron'];

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  types.forEach((type) => {
    replaceText(`${type}-version`, process.versions[type]);
  });
});
