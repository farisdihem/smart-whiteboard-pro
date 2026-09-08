# Development Guide

## إعداد بيئة التطوير
1. قم بتثبيت Node.js (v18+).
2. قم بتثبيت Rust (لبيئة Tauri).
3. قم بتثبيت الحزم: `npm install`.

## تشغيل المشروع
* لتطوير واجهة الويب فقط:
  `npm run dev`
* لتطوير سطح المكتب واختبار النوافذ:
  `npm run tauri dev`

## Build & Release
لإنشاء النسخة النهائية:
* الويب: `npm run build`
* سطح المكتب: `npm run tauri build`

## Debug
* استخدم أدوات المطور في المتصفح لمراقبة أخطاء الويب.
* عند استخدام Tauri، يمكنك النقر بزر الماوس الأيمن واختيار "Inspect Element".
* لتتبع أخطاء الرسم، انظر إلى مخرجات `console.log` الخاصة بـ Canvas Rendering Context.

## Troubleshooting
* إذا فشل تجميع Tauri، تأكد من تثبيت متطلبات النظام الأساسي لـ Rust/Tauri (مثل `build-essential`، `webkit2gtk` في Linux أو `Visual Studio C++ Build Tools` في Windows).
