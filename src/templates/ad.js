const ad = (document, user) => {
  return `
  📢 ОБЪЯВЛЕНИE

  💠 Заголовок: ${document.header}

  🔘 Категория: ${document.category}

  🏙️ Город: ${document.location}

  💰 ЗАРПЛАТА: ${document.salary}

  ⬇️ Тип занятости:
     ${document.employmentType}

  🔝 Описания вакансии:
     ${document.description}

  ✅ Контакты: ${document.contact}

  👨 Работодатель: @${user.username}
  `
};

module.exports = ad;
