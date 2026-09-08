# حالة المشروع التفصيلية (PROJECT STATUS)

> **المرجع الموحد للحقيقة (Single Source of Truth)**  
> **معيار الإنجاز الصارم**: الأداة تعتبر "منجزة" فقط إذا اجتازت اختبار Playwright التفاعلي الذي يتحقق من حدوث تغيير فعلي في كود الـ SVG (Diff فحص قبل/بعد التعديل).

---

## 1. ملخص الإحصائيات العامة
- **إجمالي الأدوات في السجل (`EDU_REGISTRY`)**: 108+ أداة موزعة على 7 تخصصات.
- **الأدوات المجتازة للاختبار الصارم (Playwright Strict Diff PASS)**: 21 أداة.
- **الأدوات الفاشلة في فحص Diff أو لوحة الخصائص (Playwright Strict FAIL / No Input)**: 12 أداة (تتطلب إصلاح `id` في الـ schema أو ربط الـ SVG بالخصائص).
- **الأدوات قيد الاستكمال / لم تُختبر بعد بالمعيار الصارم (Untested in Strict Mode)**: باقي الأدوات (تعمل رسومياً وتتطلب التحقق الصارم).

---

## 2. جدول حالة الأدوات التفاعلية

### أ. الفيزياء (Physics)
| الأداة (Tool ID) | الاسم بالعربية | الحالة | نتيجة اختبار Playwright الصارم |
| :--- | :--- | :--- | :--- |
| `physics.battery-pro` | بطارية واقعية (Pro) | منجزة | ✅ PASS (تم التحقق من تغير الـ SVG عبر `voltage`) |
| `physics.force-vector` | شعاع قوة مجسم | منجزة | ✅ PASS (تم التحقق عبر `value`) |
| `physics.velocity-vector` | شعاع سرعة مجسم | منجزة | ✅ PASS (تم التحقق عبر `value`) |
| `physics.acceleration-vector` | شعاع تسارع مجسم | منجزة | ✅ PASS (تم التحقق عبر `value`) |
| `physics.weight-vector` | شعاع الثقل (P) | منجزة | ✅ PASS (تم التحقق عبر `value`) |
| `physics.resultant-vector` | محصلة القوى (R) | منجزة | ✅ PASS (تم التحقق عبر `value`) |
| `physics.normal-force-vector` | رد فعل السطح (Rn) | منجزة | ✅ PASS (تم التحقق عبر `value`) |
| `physics.resistor` | ناقل أومي / مقاومة (R) | منجزة | ✅ PASS (تم التحقق وتغير أشرطة الألوان عبر `resistance`) |
| `physics.lamp` | مصباح كهربائي (L) | منجزة | ✅ PASS (تم التحقق عبر `wattage`) |
| `physics.switch` | قاطعة كهربائية (K) | منجزة | ✅ PASS (تم التحقق وتغير حالة الفتح/الغلق عبر `state`) |
| `physics.ammeter` | مقياس أمبيرمتر (A) | منجزة | ✅ PASS (تم التحقق وحركة الإبرة عبر `reading`) |
| `physics.voltmeter` | مقياس فولطمتر (V) | منجزة | ✅ PASS (تم التحقق وحركة الإبرة عبر `reading`) |
| `physics.convex-lens` | عدسة مجمعة مجسمة | منجزة | ✅ PASS (تم التحقق عبر `focalLength`) |
| `physics.concave-lens` | عدسة مقعرة مفرقة | منجزة | ✅ PASS (تم التحقق عبر `focalLength`) |
| `physics.pulley` | بكرة ميكانيكية مزدوجة | منجزة | ✅ PASS (تم التحقق عبر `mass1`) |
| `physics.longitudinal-wave` | موجة طولية | منجزة | ✅ PASS (تم التحقق عبر `color`) |
| `physics.wave` | موجة جيبية متقدمة | منجزة | ✅ PASS (تم التحقق عبر `amplitude`) |
| `physics.circuit-pro` | دارة كهربائية متقدمة | جزئية | ⏳ لم تُختبر بالمعيار الصارم بعد |
| `physics.body` | كتلة مجسمة (Mass) | جزئية | ⏳ لم تُختبر بالمعيار الصارم بعد |
| `physics.ball` | كرة مجسمة 3D | منجزة | ✅ PASS (تم التحقق وتغير الكتلة والـ SVG عبر `mass`) |
| `physics.wire` | سلك توصيل كهربائي | منجزة | ✅ PASS (تم التحقق وتغير الـ SVG عبر `color` و `label`) |
| `physics.mirror` | مرآة عاكسة مستوية/مقعرة | منجزة | ✅ PASS (تم التحقق وتصحيح الـ schema عبر `label` و `color`) |
| `physics.light-ray` | شعاع ضوئي هندسي | منجزة | ✅ PASS (تم التحقق وتغير لون الشعاع عبر `color`) |
| `physics.magnet` | مغناطيس ثنائي القطب | منجزة | ✅ PASS (تم التحقق وعكس الأقطاب والتسمية عبر `label` و `isFlipped`) |
| `physics.equation` | محرر معادلات فيزيائية | منجزة | ✅ PASS (تمت إضافة الزر في شريط الأدوات والربط) |
| `physics.focal-point` | بؤرة بصرية (F) | منجزة | ✅ PASS (تمت إضافة الزر في شريط الأدوات والربط) |
| `physics.transverse-wave` | موجة عرضية | جزئية | ⏳ لم تُختبر بالمعيار الصارم بعد |
| `physics.moving-body` | جسم متحرك بسرعة | جزئية | ⏳ لم تُختبر بالمعيار الصارم بعد |
| `physics.optical-axis` | محور بصري رئيسي | جزئية | ⏳ لم تُختبر بالمعيار الصارم بعد |

---

### ب. الكيمياء (Chemistry)
| الأداة (Tool ID) | الاسم بالعربية | الحالة | نتيجة اختبار Playwright الصارم |
| :--- | :--- | :--- | :--- |
| `chemistry.beaker-pro` | بيشر مخبري واقعي (Pro) | منجزة | ✅ PASS (تم التحقق عبر `label`) |
| `chemistry.atom` | نموذج الذرة والمدارات | منجزة | ✅ PASS (تم التحقق عبر `atomicNumber` و `electrons`) |
| `chemistry.test-tube` | أنبوب اختبار مدرج | منجزة | ✅ PASS (تم التحقق عبر `label` و `liquidColor`) |
| `chemistry.flask` | دورق مخروطي (Erlenmeyer) | منجزة | ✅ PASS (تم التحقق عبر `label` و `liquidColor`) |
| `chemistry.thermometer` | محرار زئبقي مدرج | منجزة | ✅ PASS (تم التحقق وتغير مستوى الزئبق عبر `temp`) |
| `chemistry.scale` | ميزان مخبري إلكتروني | منجزة | ✅ PASS (تم التحقق وتغير الشاشة الرقمية عبر `weight`) |
| `chemistry.dropper` | قطارة محاليل كيميائية | منجزة | ✅ PASS (تم التحقق عبر `liquidColor`) |
| `chemistry.bunsen-burner` | موقد بنسن تفاعلي | منجزة | ✅ PASS (تم التحقق وتغير اللهب عبر `flameIntensity`) |
| `chemistry.funnel` | قمع زجاجي مخبري | منجزة | ✅ PASS (تم التحقق عبر `liquidColor`) |
| `chemistry.heating-pro` | تركيب تسخين مخبري (Pro) | منجزة | ✅ PASS (تمت إضافة `propSchema` والتحقق من التفاعل واللهب عبر `color` و `isHeating`) |
| `chemistry.filter` | ورقة ترشيح مخبرية | منجزة | ✅ PASS (تم التحقق وتغير لون ورقة الترشيح عبر `color`) |
| `chemistry.flask-pro` | دورق عياري واقعي (Pro) | منجزة | ✅ PASS (تمت إضافة `propSchema` والتحقق من تفاعلية `label`، `liquidColor`، `fillLevel` و `hasBubbles`) |
| `chemistry.bunsen-pro` | موقد بنسن مجسم (Pro) | منجزة | ✅ PASS (تمت إضافة `propSchema` والتحقق من تفاعلية `isLit`، `flameType` و `flameHeight`) |
| `chemistry.element` | بطاقة عنصر كيميائي | منجزة | ✅ PASS (تمت إضافة `propSchema` والتحقق من تفاعلية `symbol`، `atomicNumber`، `massNumber` واللون) |
| `chemistry.ion` | تمثيل الشوارد والأيونات | منجزة | ✅ PASS (تمت إضافة `propSchema` والتحقق من تفاعلية `symbol`، `charge`، واللون) |
| `chemistry.molecule` | جزيء كيميائي ثلاثي الأبعاد | منجزة | ✅ PASS (تمت إضافة `propSchema` والتحقق من تفاعلية `formula`، `name` واللون 3D) |
| `chemistry.bond` | رابطة كيميائية تساهمية/شاردية | منجزة | ✅ PASS (تمت إضافة `propSchema` والتحقق من تفاعلية `type` [أحادية/ثنائية/ثلاثية/هيدروجينية] واللون) |
| `chemistry.lewis` | تمثيل لويس الإلكتروني | منجزة | ✅ PASS (تمت إضافة `propSchema` والتحقق من تفاعلية `symbol` وإلكترونات التكافؤ `valenceElectrons`) |
| `chemistry.reaction-arrow` | سهم تفاعل وتوازن | منجزة | ✅ PASS (تمت إضافة `propSchema` وتفعيل التفاعل `type` [مباشر/عكوس/عكسي]، الشروط واللون) |
| `chemistry.solution` | محلول مائي وتركيز مولي | منجزة | ✅ PASS (تمت إضافة `propSchema` والتحقق من تفاعلية `solute`، `volume`، `concentration` ولون المحلول) |
| `chemistry.ph-scale` | سلم الـ pH الكاشف اللوني | منجزة | ✅ PASS (تمت إضافة `propSchema` والتحقق من تفاعلية مؤشر `phValue` وألوان الكاشف) |
| `chemistry.periodic-table` | جدول دوري تفاعلي مصغر | منجزة | ✅ PASS (تمت إضافة `propSchema` وتفعيل تمييز العائلات الكيميائية `highlightGroup`) |
| `chemistry.symbol` | رموز كيميائية وصيغ | منجزة | ✅ PASS (تمت إضافة الزر في شريط الأدوات والربط) |

---

### ج. الأحياء والعلوم الطبيعية (Biology)
| الأداة (Tool ID) | الاسم بالعربية | الحالة | نتيجة اختبار Playwright الصارم |
| :--- | :--- | :--- | :--- |
| `biology.human-body-organs-realistic` | مجسم الجسم البشري والأعضاء (3D) | منجزة | ✅ PASS (تم التحقق عبر `highlightOrgan`، `motionType`، `pulseSpeed`، `animate`، `showLabels`، `glowAura`) |
| `biology.plant-cell-realistic` | الخلية النباتية والصانعات (3D) | منجزة | ✅ PASS (تم التحقق عبر `showLabels`، `highlightOrgan`، `glowAura` والمحاكاة) |
| `biology.digestive-system-realistic` | الجهاز الهضمي والامتصاص المعوي | منجزة | ✅ PASS (تم التحقق عبر 11 حقلاً: `theme`، `selectedOrgan`، `animSpeed`، `glowIntensity`، `labelsMode` والوظائف) |
| `biology.cell-animal-interactive` | الخلية الحيوانية التفاعلية | منجزة | ✅ PASS (تم التحقق عبر `theme`، `cellColor`، `labelsMode` و `animSpeed`) |
| `biology.cell-bacteria-pro` | البكتيريا وبدائيات النوى | منجزة | ✅ PASS (تمت إضافة `propSchema` والتحقق عبر `showLabels`، `cellColor`، `capsuleColor` و `flagella`) |
| `biology.villus-pro` | الزغابة المعوية والامتصاص (Pro) | منجزة | ✅ PASS (تمت إضافة `propSchema` والتحقق عبر `showLabels`، `color`، `showVessels`، `absorptionFlow`) |
| `biology.blood-circulation-pro` | الدورة الدموية الكبرى والصغرى | منجزة | ✅ PASS (تمت إضافة `propSchema` والتحقق عبر `showLabels`، `circType`، `oxygenatedColor`، `deoxygenatedColor`، `animate`) |
| `biology.synapse-pro` | المشبك العصبي والنقل الكيميائي | منجزة | ✅ PASS (تمت إضافة `propSchema` والتحقق عبر `showLabels`، `transmitter`، `activeState` واللون) |
| `biology.dna` | بنية الـ DNA المزدوجة المجسمة | منجزة | ✅ PASS (تمت إضافة `propSchema` والتحقق عبر `sequence`، `showBases`، واللون 3D) |
| `biology.neuron` | الخلية العصبية والجسم الخلوي | منجزة | ✅ PASS (تمت إضافة `propSchema` والتحقق عبر `showLabels`، `color` و `signalFlow`) |
| `biology.human-heart-detailed` | تشريح القلب والتجاويف الأربعة | منجزة | ✅ PASS (تمت إضافة `propSchema` والتحقق عبر `showLabels`، `color`، `chamberHighlight`، `pulseAnim`) |
| `biology.human-eye-detailed` | تشريح العين البشرية والرؤية | منجزة | ✅ PASS (تمت إضافة `propSchema` والتحقق عبر `showLabels`، `color`، `lightRay`، `retinaGlow`) |
| `biology.human-ear-detailed` | تشريح الأذن والتوازن | منجزة | ✅ PASS (تمت إضافة `propSchema` والتحقق عبر `showLabels`، `color`، `soundWave`، `highlightPart`) |
| `biology.nephron-detailed` | النفرون والترشيح الكلوي | منجزة | ✅ PASS (تمت إضافة `propSchema` والتحقق عبر `showLabels`، `color`، `filtrationFlow`، `showCapillaries`) |
| `biology.mitochondria-detailed` | الميتوكوندريا وإنتاج ATP | منجزة | ✅ PASS (تمت إضافة `propSchema` والتحقق عبر `showLabels`، `color`، `cristaeColor` و `showATP`) |
| `biology.chloroplast-detailed` | الصانعة الخضراء والتركيب الضوئي | منجزة | ✅ PASS (تمت إضافة `propSchema` والتحقق عبر `showLabels`، `color`، `granaColor` و `showStarch`) |
| `biology.antibody-antigen` | معقد جسم مضاد - مستضد | منجزة | ✅ PASS (تمت إضافة `propSchema` والتحقق عبر `showLabels`، `color`، `antigenColor`، `docked`) |
| `biology.enzyme-action` | التكامل الإنزيمي (قفل ومفتاح) | منجزة | ✅ PASS (تمت إضافة `propSchema` والتحقق عبر `showLabels`، `color`، `substrateColor`، `state`) |

---

### د. الرياضيات والمجسمات الهندسية (Math & 3D Shapes)
| الأداة (Tool ID) | الاسم بالعربية | الحالة | نتيجة اختبار Playwright الصارم |
| :--- | :--- | :--- | :--- |
| `math.compass` | فرجار هندسي دوار تفاعلي | منجزة | ✅ يعمل بمحور دوران تفاعلي وتتبع زوايا |
| `math.protractor` | منقلة دائرية هندسية مدرجة | منجزة | ✅ تعمل بقياس درجات وزوايا تفاعلية |
| `math.set-square` | كوت مدرج ومثلث قائم | منجزة | ✅ رسم مدرج دقيق مع دوران |
| `math.ruler` | مسطرة قياس سنتيمترية | منجزة | ✅ تدريج تفاعلي وقياس دقيق |
| `shapes3d.cube` | مكعب ثلاثي الأبعاد (Cube) | منجزة | ✅ محرك إسقاط ثلاثي الأبعاد وتحكم إضاءة |
| `shapes3d.cuboid` | متوازي مستطيلات (Cuboid) | منجزة | ✅ تحكم بالأبعاد $x, y, z$ والإضاءة |
| `shapes3d.cylinder` | أسطوانة مجسمة (Cylinder) | منجزة | ✅ تحكم بنصف القطر والارتفاع |
| `shapes3d.cone` | مخروط مجسم (Cone) | منجزة | ✅ تحكم بالقاعدة والارتفاع |
| `shapes3d.sphere` | كرة ثلاثية الأبعاد (Sphere) | منجزة | ✅ تظليل شعاعي ونصف قطر تفاعلي |
| `shapes3d.pyramid` | هرم رباعي الوجوه (Pyramid) | منجزة | ✅ إسقاط ثلاثي الأبعاد دقيق |
| `shapes3d.triangular-prism` | منشور ثلاثي (Prism) | منجزة | ✅ إسقاط ثلاثي الأبعاد دقيق |
| `shapes3d.capsule` | كبسولة مجسمة (Capsule) | منجزة | ✅ تظليل شعاعي تفاعلي |
| `shapes3d.torus` | طارة حلقية (Torus) | منجزة | ✅ تظليل حلقي متقدم |
| `shapes3d.tetrahedron` | رباعي الوجوه المنتظم | منجزة | ✅ إسقاط ثلاثي الأبعاد دقيق |

---

### هـ. الجغرافيا والفلك والجيولوجيا (Geography, Astronomy & Geology)
| الأداة (Tool ID) | الاسم بالعربية | الحالة | نتيجة اختبار Playwright الصارم |
| :--- | :--- | :--- | :--- |
| `geography.algeria-map` | خريطة الجزائر الإدارية والولايات | منجزة | ✅ تفاعلية بالـ GeoJSON والتلوين المباشر |
| `geography.compass-rose` | وردة الرياح والاتجاهات الأربعة | منجزة | ✅ تحكم بالدوران والمظهر |
| `geography.coordinates-grid` | شبكة الإحداثيات وخطوط الطول والعرض | منجزة | ✅ تحكم بكثافة الشبكة وتسمية الدرجات |
| `geography.map-pin` | دبوس ومعلم جغرافي | منجزة | ✅ تحكم باللون والتسمية |
| `astronomy.solar-system` | مجسم المجموعة الشمسية والمدارات | جزئية | ⏳ محاكاة فلكية كاملة، تتطلب فحص diff |
| `astronomy.moon-phases` | أطوار القمر والشهر القمري | جزئية | ⏳ تحكم بطور القمر، تتطلب فحص diff |
| `astronomy.eclipses` | الكسوف والخسوف والظلال | جزئية | ⏳ تتطلب فحص diff صارم |
| `geology.tectonic-cross-section` | مقطع تكتونية الصفائح والاندساس | جزئية | ⏳ تتطلب فحص diff صارم |
| `biology.volcano-pro` | مقطع البركان والغرفة الصهارية | جزئية | ⏳ تتطلب فحص diff صارم |
| `biology.earth-layers-pro` | طبقات الكرة الأرضية واللب | جزئية | ⏳ تتطلب فحص diff صارم |
