// Обработка переключения тем
document.addEventListener('DOMContentLoaded', () => {
  const themeButtons = document.querySelectorAll('.header__theme-menu-button');
  const html = document.documentElement;
  
  // Функция установки темы
  function setTheme(theme) {
    // Убираем все классы тем
    html.classList.remove('theme-dark', 'theme-light', 'theme-auto');
    
    // Устанавливаем выбранную тему
    if (theme === 'dark') {
      html.classList.add('theme-dark');
    } else if (theme === 'light') {
      html.classList.add('theme-light');
    } else {
      html.classList.add('theme-auto');
    }
    
    // Сохраняем выбор пользователя
    localStorage.setItem('theme', theme);
  }
  
  // Функция обновления активной кнопки
  function updateActiveButton(theme) {
    themeButtons.forEach(button => {
      button.classList.remove('header__theme-menu-button_active');
      button.disabled = false;
      
      if (
        (theme === 'dark' && button.classList.contains('header__theme-menu-button_type_dark')) ||
        (theme === 'light' && button.classList.contains('header__theme-menu-button_type_light')) ||
        (theme === 'auto' && button.classList.contains('header__theme-menu-button_type_auto'))
      ) {
        button.classList.add('header__theme-menu-button_active');
        button.disabled = true;
      }
    });
  }
  
  // Инициализация темы
  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
      updateActiveButton(savedTheme);
    } else {
      // Если нет сохранённой темы, используем системную
      setTheme('auto');
      updateActiveButton('auto');
    }
  }
  
  // Обработчики кликов на кнопки
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
      updateActiveButton(theme);
    });
  });
  
  // Слушаем изменения системной темы (только для auto режима)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (html.classList.contains('theme-auto')) {
      // При изменении системной темы в auto режиме перезагружаем страницу
      // для применения новых CSS правил через media query
      location.reload();
    }
  });
  
  // Инициализируем тему при загрузке
  initTheme();
});