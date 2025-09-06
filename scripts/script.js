document.addEventListener('DOMContentLoaded', () => {
  const themeButtons = document.querySelectorAll('.header__theme-menu-button');
  const html = document.documentElement;
  
  function setTheme(theme) {
    html.classList.remove('theme-dark', 'theme-light', 'theme-auto');
    html.classList.add(`theme-${theme}`);
    localStorage.setItem('theme', theme);
    updateActiveButton(theme);
  }
  
  function updateActiveButton(theme) {
    themeButtons.forEach(button => {
      button.classList.remove('header__theme-menu-button_active');
      button.disabled = false;
      button.setAttribute('aria-pressed', 'false');
      
      if (
        (theme === 'dark' && button.classList.contains('header__theme-menu-button_type_dark')) ||
        (theme === 'light' && button.classList.contains('header__theme-menu-button_type_light')) ||
        (theme === 'auto' && button.classList.contains('header__theme-menu-button_type_auto'))
      ) {
        button.classList.add('header__theme-menu-button_active');
        button.disabled = true;
        button.setAttribute('aria-pressed', 'true');
      }
    });
  }
  
  function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'auto';
    setTheme(savedTheme);
  }
  
  themeButtons.forEach(button => {
    button.addEventListener('click', () => {
      let theme;
      
      if (button.classList.contains('header__theme-menu-button_type_dark')) {
        theme = 'dark';
      } else if (button.classList.contains('header__theme-menu-button_type_light')) {
        theme = 'light';
      } else {
        theme = 'auto';
      }
      
      setTheme(theme);
    });
  });
  
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (html.classList.contains('theme-auto')) {
      location.reload();
    }
  });
  
  initTheme();
});