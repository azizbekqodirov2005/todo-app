# ToDo List — vazifalar ilovasi

HTML, CSS va vanilla JavaScript yordamida qilingan zamonaviy ToDo ilovasi. Vazifa qo'shish, bajarilgan deb belgilash, tahrirlash va o'chirish imkoniyatlariga ega; barcha ma'lumotlar `localStorage`da saqlanadi.

## Xususiyatlar

- Yangi vazifa qo'shish (input + tugma, bo'sh matn kiritilsa xatolik ko'rsatiladi).
- Checkbox orqali vazifani bajarilgan deb belgilash — matn ustidan chiziladi.
- Har bir vazifa ustiga sichqoncha olib borilganda **tahrirlash** va **o'chirish** tugmalari chiqadi.
- Vazifani tahrirlash — matn ustiga bosilganda inline input ochiladi.
- Vazifani o'chirish — chiqish animatsiyasi bilan.
- Qolgan faol vazifalar soni va "Bajarilganlarni tozalash" tugmasi.
- Barcha ma'lumotlar `localStorage`da saqlanadi — sahifa yangilansa ham yo'qolmaydi.
- Tugmalarda hover va bosish (active) animatsiyalari.
- To'liq responsiv dizayn.

## Fayl tuzilishi

```
todo-app/
├── index.html
├── styles/
│   └── style.css
├── scripts/
│   └── app.js
└── README.md
```

## Ishga tushirish

Build jarayoni kerak emas — `index.html` faylini brauzerda oching.

GitHub'ga yuklash uchun:

```bash
cd todo-app
git init
git add .
git commit -m "ToDo App loyihasi"
git branch -M main
git remote add origin <repozitoriy-havolasi>
git push -u origin main
```

## Ishlatilgan texnologiyalar

- HTML5
- CSS3 (Flexbox, CSS animatsiyalar, o'zgaruvchilar)
- Vanilla JavaScript (DOM, localStorage)
- Google Fonts — Poppins
