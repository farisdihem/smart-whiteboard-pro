# السبورة الذكية (Interactive Whiteboard)

برنامج السبورة الذكية التفاعلية للأستاذ ديهم عبد اللطيف.

## Description
مشروع السبورة الذكية هو تطبيق متقدم يعمل كلوحة بيضاء تفاعلية مصممة خصيصًا للأغراض التعليمية. يتيح التطبيق الرسم، إضافة الأشكال، النصوص، الصور، والوسائط المتعددة، مع ميزات متقدمة مثل تسجيل الفيديو، التراجع/الإعادة، وحفظ وتحميل الصفحات. كما يحتوي على مكتبة متكاملة للعلوم الطبيعية، الجغرافيا، والرياضيات (مع خرائط جغرافية حقيقية 58 ولاية، نماذج لخلايا بيولوجية، مقاطع جيولوجية، وغيرها).

## Features
* لوحة رسم تفاعلية (Pencil, Eraser, Highlight, Laser).
* مكتبات تعليمية متخصصة (رياضيات، جغرافيا، علوم طبيعية).
* خريطة الجزائر التفاعلية (58 ولاية) مع إحداثيات ومساحات حقيقية.
* إمكانيات تسجيل الشاشة والصوت.
* حفظ ومشاركة الملفات.
* نظام تعدد الصفحات.
* التراجع والإعادة (Undo/Redo).
* واجهة عربية متكاملة.
* تطبيق سطح مكتب باستخدام Tauri.
* تطبيق أندرويد باستخدام Capacitor (نفس واجهة ومزايا سطح المكتب).

## Technology Stack
* **Frontend:** HTML, CSS (Tailwind CSS), JavaScript (Vite)
* **Backend / Database:** Firebase (Firestore)
* **Packaging:** Tauri (Desktop) + Capacitor (Android)
* **Libraries:** html2canvas, jsPDF, KaTeX, Lucide Icons

## Requirements
* Node.js (v18+)
* npm أو yarn أو bun
* Rust و Cargo (لبيئة Tauri)
* Android Studio (يحتوي JDK 17+ و Android SDK) لبناء نسخة أندرويد
* متصفح حديث

## Installation
1. قم باستنساخ المشروع:
   ```bash
   git clone <repository>
   cd <project>
   ```
2. تثبيت الحزم المطلوبة:
   ```bash
   npm install
   ```

## Configuration
للاتصال بقاعدة بيانات Firebase، يجب توفير ملف `firebase-applet-config.json` في الجذر (غير مرفوع لأسباب أمنية).

## Development
لتشغيل المشروع في وضع التطوير (المتصفح):
```bash
npm run dev
```
لتشغيل المشروع كبرنامج سطح مكتب باستخدام Tauri:
```bash
npm run tauri dev
```

## Build
لإنشاء نسخة الويب:
```bash
npm run build
```
لإنشاء نسخة سطح المكتب (Windows/macOS/Linux):
```bash
npm run tauri build
```
لإنشاء نسخة أندرويد (APK تجريبي غير موقّع):
```bash
npm run android:build
```
الملف الناتج: `android/app/build/outputs/apk/debug/app-debug.apk`.
> ملاحظة: نظراً لاحتواء مسار المشروع على حروف عربية، لا يعمل `gradlew.bat` مباشرة على ويندوز (خلل معروف في طريقة تعامل cmd.exe مع المسارات غير اللاتينية). لذلك يستخدم أمر `android:build` سكربت Node مساعد (`scripts/android-build.js`) يتجاوز هذه المشكلة. لبناء نسخة موقّعة جاهزة للنشر على المتجر، افتح مجلد `android/` في Android Studio مباشرة.

## Test
الأوامر المستخدمة للاختبار التلقائي:
```bash
node test_video_forensic.js
node full_forensic_suite.js
```

## Project Structure
* `app.js` - المحرك الأساسي للتطبيق والرسم.
* `data/` - مجلد يحتوي على البيانات التعليمية (جغرافيا، علوم، جيولوجيا).
* `src-tauri/` - ملفات وتكوينات Tauri لنسخة سطح المكتب.
* `index.html` - الواجهة الرئيسية.
* `style.css` - تنسيقات Tailwind و CSS المخصصة.

## Environment Variables
| Variable | Required | Description |
| -------- | -------- | ----------- |
| firebase-applet-config.json | Yes | إعدادات الاتصال بمشروع Firebase |

## Known Issues
* بعض الخصائص قد تحتاج صلاحيات إضافية عند تشغيل Tauri على أنظمة تشغيل معينة.

## Roadmap
* تحسين أدوات القياس الهندسية.
* دعم استيراد وتصدير ملفات بتنسيقات مختلفة.
* تطوير ميزات التعاون في الوقت الفعلي (Multiplayer).

## Backup
هذا المستودع يمثل النسخة الاحتياطية الرسمية للمشروع والمخزن المركزي.

## License
جميع الحقوق محفوظة للأستاذ ديهم عبد اللطيف.
