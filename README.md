# 🧠 DailyScrum

[![.NET](https://img.shields.io/badge/Backend-.NET%209-blueviolet?logo=dotnet)](https://dotnet.microsoft.com/)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js-black?logo=next.js)](https://nextjs.org/)
[![Tailwind](https://img.shields.io/badge/Styling-Tailwind%20CSS-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/UI-DaisyUI-facc15?logo=tailwindcss)](https://daisyui.com/)
[![Database](https://img.shields.io/badge/Database-Supabase-3ecf8e?logo=supabase)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**DailyScrum** is a simple, no-login fullstack app for running daily standups in distributed teams.

Team members join a temporary **lobby via code** and submit:
- ✅ What they did yesterday
- ✅ What they’re doing today
- ✅ Any blockers

---

## ✨ Features

- 🔑 No login required
- 🎯 Kahoot-style lobby codes
- 👥 See everyone's entries in one place
- 🔒 Auto-deletion of all data after 2 hours
- 🛡️ Rate limiting & CAPTCHA protection against spam
- ⚡ Minimalist UI built with Tailwind + DaisyUI

---

## 🧱 Tech Stack

| Layer       | Tech              |
|-------------|-------------------|
| Frontend    | [Next.js](https://nextjs.org/) + [Tailwind](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/) |
| Backend     | [ASP.NET Core Web API](https://learn.microsoft.com/en-us/aspnet/core/) + C# |
| Database    | [Supabase PostgreSQL](https://supabase.com/) |
| ORM         | Entity Framework Core |
