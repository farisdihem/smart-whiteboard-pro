# Architecture

## Main Modules
* **Whiteboard Engine:** (app.js) يدير دورة حياة الرسم، تحديثات الشاشة، التعامل مع مدخلات الماوس واللمس (Pointer Events)، وتخزين المسارات (Paths) ككائنات.
* **EDU Registry:** نظام لتسجيل الأدوات التعليمية (أدوات جغرافية، علوم، هندسة).
* **Media & Recording:** يتيح تسجيل لوحة العمل باستخدام `MediaRecorder` و `WebRTC`.
* **State Management:** إدارة التراجع والإعادة (Undo/Redo History) المتعددة الصفحات.
* **Storage / Database:** تكامل مع Firebase Firestore لحفظ واسترجاع السبورة السحابية والمشاركة.

## Data Flow
* يتفاعل المستخدم مع `index.html` (UI).
* يستقبل `app.js` أحداث اللمس/الماوس ويحولها إلى أوامر هندسية ورسومية.
* تُحفظ البيانات في كائنات محلياً وإذا طُلب الحفظ تُرسل إلى Firestore.
* عند التشغيل المحلي كتطبيق، يتصل `src-tauri` بواجهة الويب ويوفر صلاحيات سطح المكتب (System Access).

## Important Services
* Firebase Authentication & Firestore.
* Tauri API Integration.

## Deployment
* **Web:** يمكن نشره كصفحة ويب (HTML/JS/CSS) على Vercel أو Firebase Hosting.
* **Desktop:** يُبنَى بواسطة Tauri للحصول على ملف `.exe` (Windows) أو `.dmg` (macOS) أو `.AppImage` (Linux).
