# BRAYN

Репозиторій для статичних HTML-ігор і прототипів, які публікуються через **GitHub Pages**.

## Поточна структура

```text
/
├── index.html          # миттєвий редирект у ./BRAYN/
├── .nojekyll
├── BRAYN/
│   ├── index.html      # основна гра
│   └── assets/
└── docs/
    └── wheel-of-fortune-brayn/
```

## Посилання

| Шлях | Призначення | Посилання |
|------|-------------|-----------|
| `/` | редирект на основну гру | [Відкрити](https://olehhebel.github.io/BRAYN/) |
| `/BRAYN/` | BRAYN Digger | [Запустити](https://olehhebel.github.io/BRAYN/BRAYN/) |
| `/wheel-of-fortune-brayn/` | архівний wheel prototype з `docs/` | [Запустити](https://olehhebel.github.io/BRAYN/wheel-of-fortune-brayn/) |

## Нотатки

- Основний runtime тепер знаходиться в `BRAYN/index.html`.
- Кореневий `index.html` одразу перенаправляє користувача в `./BRAYN/`.
- `.nojekyll` додано для безпечного статичного хостингу на GitHub Pages.

## Figma MCP

`Figma MCP` підключається **не в цьому репозиторії**, а в твоєму **MCP-клієнті / AI-агенті**. Сам репозиторій `BRAYN` залишається статичним HTML-проєктом без окремого server-side налаштування для MCP.

### Рекомендований endpoint

```text
https://mcp.figma.com/mcp
```

### Claude Code

Рекомендований спосіб:

```bash
claude plugin install figma@claude-plugins-official
```

Або вручну:

```bash
claude mcp add --transport http figma https://mcp.figma.com/mcp
```

Перевірка:

```bash
claude mcp list
```

### Cursor

У чаті Cursor:

```text
/add-plugin figma
```

Або вручну через `Cursor Settings → MCP`:

```json
{
  "mcpServers": {
    "figma": {
      "url": "https://mcp.figma.com/mcp"
    }
  }
}
```

### VS Code

1. Відкрий `Command Palette`
2. Запусти `MCP:Add Server`
3. Обери `HTTP`
4. Вкажи URL `https://mcp.figma.com/mcp`
5. Задай server id: `figma`

Приклад конфігурації:

```json
{
  "servers": {
    "figma": {
      "type": "http",
      "url": "https://mcp.figma.com/mcp"
    }
  }
}
```

### Як використовувати з цим репозиторієм

1. Відкрий потрібний frame/layer у Figma і скопіюй посилання
2. Дай це посилання агенту разом із задачею, наприклад:
   - `зверстай це в plain HTML/CSS`
   - `онови /home/runner/work/BRAYN/BRAYN/BRAYN/index.html під цей макет`
   - `онови /home/runner/work/BRAYN/BRAYN/docs/... під цей frame`
3. Для цього репозиторію краще явно просити:
   - `plain HTML/CSS/JS`
   - `без React`
   - `під GitHub Pages / static prototype`

### Важливо

- Не коміть токени або приватні ключі в репозиторій
- Якщо клієнт просить авторизацію — проходь її локально у своєму середовищі
- Якщо Figma MCP не з'явився в tools, перезапусти клієнт після додавання сервера

---

🧠 **[BRAYN Digger → Запустити](https://olehhebel.github.io/BRAYN/BRAYN/)**
