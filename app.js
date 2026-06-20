const STORAGE_KEY = "ayla-sequences-progress-v1";

const state = {
  view: "home",
  branch: "science",
  moduleId: "definition",
  moduleTab: "lesson",
  openSolutions: {},
  progress: loadProgress(),
};

const branchLabels = {
  science: "علمي",
  literary: "أدبي",
  management: "تسيير واقتصاد",
  common: "مشترك",
};

const viewLabels = {
  home: "الرئيسية",
  learn: "التعلم",
  module: "تفاصيل الدرس",
  practice: "التمارين",
  bac: "بكالوريا",
  progress: "تقدمي",
  teacher: "واجهة الأستاذ",
};

const modules = [
  {
    id: "definition",
    branches: ["science", "literary", "management"],
    order: 1,
    title: "تعريف المتتالية العددية",
    summary: "قراءة حدود متتالية، تحديد الحد الأول، واستعمال العبارات الصريحة أو التراجعية.",
    lesson: [
      "المتتالية العددية دالة معرفة على جزء من مجموعة الأعداد الطبيعية، ونكتب حدودها غالبا على الشكل u₀ ، u₁ ، u₂ ... أو uₙ.",
      "يمكن تعريف المتتالية بعبارة صريحة مثل uₙ = 2n + 1، أو بعلاقة تراجعية مثل u₀ = 3 و uₙ₊₁ = uₙ + 2.",
      "عند استعمال علاقة تراجعية يجب معرفة الحد الأول حتى نستطيع حساب الحدود التالية."
    ],
    formulas: ["uₙ = f(n)", "uₙ₊₁ = f(uₙ)", "جدول القيم يساعد على ملاحظة السلوك العام للمتتالية."],
    activities: [
      { title: "نشاط 1", text: "لتكن uₙ = 3n - 2. احسب u₀ و u₁ و u₂ و u₅.", answer: "u₀=-2 ، u₁=1 ، u₂=4 ، u₅=13." },
      { title: "نشاط 2", text: "نعرف v₀ = 4 و vₙ₊₁ = vₙ + 3. احسب الحدود الأربعة الأولى.", answer: "v₀=4 ، v₁=7 ، v₂=10 ، v₃=13." }
    ],
    exercises: [
      { title: "تمرين 1", text: "لتكن uₙ = n² - 1. احسب u₀ و u₂ و u₄، ثم بين هل العدد 8 حد من حدودها.", solution: "u₀=-1، u₂=3، u₄=15. نحل n²-1=8 فنجد n²=9 ومنه n=3، إذن 8 حد من حدودها." },
      { title: "تمرين 2", text: "لتكن u₀=2 و uₙ₊₁=2uₙ-1. احسب u₁ و u₂ و u₃.", solution: "u₁=3، u₂=5، u₃=9." }
    ]
  },
  {
    id: "arithmetic",
    branches: ["science", "literary", "management"],
    order: 2,
    title: "المتتالية الحسابية",
    summary: "التعرف على أساس المتتالية الحسابية، حساب الحد العام ومجموع الحدود.",
    lesson: [
      "تكون المتتالية حسابية إذا كان الفرق بين كل حد والذي يسبقه ثابتا. يسمى هذا الفرق أساس المتتالية ويرمز له عادة بـ r.",
      "إذا كانت u متتالية حسابية أساسها r فإن uₙ₊₁ = uₙ + r.",
      "الزيادة أو النقصان المنتظم في جدول أو وضعية مالية غالبا ما يقود إلى متتالية حسابية."
    ],
    formulas: ["uₙ = u₀ + nr", "uₙ = uₚ + (n-p)r", "S = عدد الحدود × (الحد الأول + الحد الأخير) / 2"],
    activities: [
      { title: "نشاط", text: "متتالية حسابية حدها الأول 5 وأساسها 4. احسب u₁ و u₂ و u₁₀.", answer: "u₁=9، u₂=13، u₁₀=45." }
    ],
    exercises: [
      { title: "تمرين 1", text: "متتالية حسابية حيث u₃=11 و r=2. احسب u₀ ثم u₁₀.", solution: "u₃=u₀+3r إذن u₀=11-6=5. ثم u₁₀=5+20=25." },
      { title: "تمرين 2", text: "ادخر تلميذ 500 دج في الأسبوع الأول، ويضيف كل أسبوع 150 دج. كم يدخر في الأسبوع العاشر؟", solution: "المبالغ تشكل متتالية حسابية أساسها 150. u₁₀=500+9×150=1850 دج." }
    ]
  },
  {
    id: "geometric",
    branches: ["science", "literary", "management"],
    order: 3,
    title: "المتتالية الهندسية",
    summary: "استعمال النسبة الثابتة، الحد العام، ومجموع حدود متتالية هندسية.",
    lesson: [
      "تكون المتتالية هندسية إذا كان حاصل قسمة كل حد على الحد السابق ثابتا. يسمى هذا العدد أساس المتتالية ويرمز له بـ q.",
      "إذا كانت u متتالية هندسية أساسها q فإن uₙ₊₁ = q uₙ.",
      "النمو بنسبة مئوية ثابتة أو التناقص بنسبة ثابتة يقود غالبا إلى متتالية هندسية."
    ],
    formulas: ["uₙ = u₀ qⁿ", "uₙ = uₚ qⁿ⁻ᵖ", "1 + q + ... + qⁿ = (1 - qⁿ⁺¹)/(1-q) إذا كان q ≠ 1"],
    activities: [
      { title: "نشاط", text: "متتالية هندسية حدها الأول 3 وأساسها 2. احسب الحدود الأربعة الأولى.", answer: "3، 6، 12، 24." }
    ],
    exercises: [
      { title: "تمرين 1", text: "متتالية هندسية حيث u₀=5 و q=3. احسب u₄.", solution: "u₄=5×3⁴=405." },
      { title: "تمرين 2", text: "ثمن جهاز ينخفض كل سنة بنسبة 10%. إذا كان ثمنه 80000 دج، اكتب ثمنه بعد n سنوات.", solution: "كل سنة نضرب في 0.9، إذن uₙ=80000×0.9ⁿ." }
    ]
  },
  {
    id: "monotony",
    branches: ["science"],
    order: 4,
    title: "رتابة المتتاليات والمقارنة",
    summary: "دراسة تزايد أو تناقص متتالية باستعمال الفرق أو القسمة أو الدوال.",
    lesson: [
      "لدراسة الرتابة ندرس إشارة الفرق uₙ₊₁ - uₙ. إذا كان موجبا فالمتتالية متزايدة، وإذا كان سالبا فهي متناقصة.",
      "في المتتاليات ذات الحدود الموجبة يمكن أحيانا استعمال النسبة uₙ₊₁ / uₙ.",
      "المقارنة بين متتاليتين تساعد على حصر الحدود واستنتاج سلوكها."
    ],
    formulas: ["uₙ₊₁ - uₙ ≥ 0 ⇒ u متزايدة", "uₙ₊₁ - uₙ ≤ 0 ⇒ u متناقصة"],
    activities: [
      { title: "نشاط", text: "ادرس رتابة uₙ = 2n + 7.", answer: "uₙ₊₁-uₙ=2>0، إذن المتتالية متزايدة تماما." }
    ],
    exercises: [
      { title: "تمرين", text: "ادرس رتابة uₙ = n² - 4n.", solution: "uₙ₊₁-uₙ = 2n-3. تكون سالبة عند n=0 و1، وموجبة ابتداء من n=2." }
    ]
  },
  {
    id: "limits",
    branches: ["science"],
    order: 5,
    title: "نهايات المتتاليات",
    summary: "التعرف على نهاية متتالية واستعمال النهايات المرجعية في التمرين.",
    lesson: [
      "نقول إن uₙ يؤول إلى عدد l عندما تصبح حدوده قريبة جدا من l عند كبر n.",
      "النهايات المرجعية مثل 1/n و qⁿ عندما |q|<1 تستعمل كثيرا في حساب النهايات.",
      "إذا غلب حد من درجة أعلى في عبارة كثيرة حدود، فإنه يحدد السلوك عند اللانهاية."
    ],
    formulas: ["lim 1/n = 0", "إذا |q|<1 فإن lim qⁿ = 0", "lim (an+b)/(cn+d) = a/c إذا c ≠ 0"],
    activities: [
      { title: "نشاط", text: "احسب نهاية uₙ = (3n+1)/(n+2).", answer: "النهاية هي 3." }
    ],
    exercises: [
      { title: "تمرين", text: "احسب نهاية uₙ = (2n²+n)/(n²+5).", solution: "نقسم على n² فنحصل على (2+1/n)/(1+5/n²)، والنهاية 2." }
    ]
  },
  {
    id: "literary-applications",
    branches: ["literary"],
    order: 4,
    title: "نماذج عددية للأدبي",
    summary: "استعمال المتتاليات في وضعيات بسيطة: نمط، جدول، زيادة ثابتة أو نسبة ثابتة.",
    lesson: [
      "في الشعبة الأدبية نركز على قراءة النمط، ملء الجداول، وربط الوضعية بمتتالية حسابية أو هندسية دون تعقيد زائد.",
      "المهم هو فهم معنى الحد وترجمة السؤال إلى عملية حسابية واضحة."
    ],
    formulas: ["زيادة ثابتة ⇒ متتالية حسابية", "نسبة ثابتة ⇒ متتالية هندسية"],
    activities: [
      { title: "نشاط", text: "عدد صفحات مقروءة يزيد كل يوم بـ 12 صفحة. ما نوع المتتالية؟", answer: "متتالية حسابية أساسها 12." }
    ],
    exercises: [
      { title: "تمرين", text: "بدأ قارئ بـ 20 صفحة ثم يقرأ كل يوم 10 صفحات أكثر من اليوم السابق. احسب قراءة اليوم الخامس.", solution: "u₅=20+4×10=60 صفحة." }
    ]
  },
  {
    id: "management-applications",
    branches: ["management"],
    order: 4,
    title: "تطبيقات مالية بسيطة",
    summary: "فوائد بسيطة ومركبة، تطور رأس المال، وجدولة مبالغ منتظمة.",
    lesson: [
      "الفائدة البسيطة تقود غالبا إلى متتالية حسابية لأن الزيادة تكون ثابتة.",
      "الفائدة المركبة تقود إلى متتالية هندسية لأن رأس المال يضرب في نفس المعامل كل فترة.",
      "التمييز بين الزيادة المطلقة والزيادة النسبية هو مفتاح الحل."
    ],
    formulas: ["فائدة بسيطة: Cₙ = C₀ + nr", "فائدة مركبة: Cₙ = C₀(1+t)ⁿ"],
    activities: [
      { title: "نشاط", text: "رأس مال 100000 دج يزيد بنسبة 5% سنويا. اكتب Cₙ.", answer: "Cₙ=100000×1.05ⁿ." }
    ],
    exercises: [
      { title: "تمرين", text: "يدخر شخص 2000 دج شهريا. ما المبلغ بعد 18 شهرا؟", solution: "المبلغ 18×2000=36000 دج." }
    ]
  }
];

const bacExercises = [
  {
    id: "bac-model-1",
    branch: "science",
    year: "نموذج",
    title: "تمرين بكالوريا نموذجي - علمي",
    statement: "لتكن المتتالية u معرفة بـ u₀=1 و uₙ₊₁=2uₙ+3. نضع vₙ=uₙ+3. بين أن v هندسية ثم استنتج عبارة uₙ بدلالة n.",
    solution: "vₙ₊₁=uₙ₊₁+3=2uₙ+6=2(uₙ+3)=2vₙ، إذن v هندسية أساسها 2 و v₀=4. ومنه vₙ=4×2ⁿ، وبالتالي uₙ=4×2ⁿ-3."
  },
  {
    id: "bac-model-2",
    branch: "management",
    year: "نموذج",
    title: "تمرين تطبيقي - تسيير واقتصاد",
    statement: "رأس مال قدره 50000 دج يزداد بنسبة 4% كل سنة. اكتب عبارة رأس المال بعد n سنوات واحسب قيمته بعد 3 سنوات.",
    solution: "Cₙ=50000×1.04ⁿ. بعد 3 سنوات: C₃=50000×1.04³=56243.2 دج تقريبا."
  },
  {
    id: "bac-model-3",
    branch: "literary",
    year: "نموذج",
    title: "تمرين نموذجي - أدبي",
    statement: "نمط عددي يبدأ بـ 6 ثم نضيف 5 في كل مرة. اكتب الحدود الخمسة الأولى والحد العام.",
    solution: "الحدود: 6، 11، 16، 21، 26. المتتالية حسابية أساسها 5، والحد العام uₙ=6+5n إذا بدأنا من n=0."
  }
];

function loadProgress() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
}
function saveProgress() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress)); }
function activeModules() { return modules.filter((m) => m.branches.includes(state.branch)).sort((a,b) => a.order - b.order); }
function currentModule() { return modules.find((m) => m.id === state.moduleId) || activeModules()[0]; }
function isDone(id) { return Boolean(state.progress[id]); }
function markComplete(id) { state.progress[id] = true; saveProgress(); renderAll(); }

function setView(view) {
  state.view = view;
  document.querySelectorAll(".view").forEach((el) => el.classList.toggle("active", el.id === `${view}View`));
  document.querySelectorAll(".nav-btn").forEach((btn) => btn.classList.toggle("active", btn.dataset.view === view));
  document.getElementById("currentViewLabel").textContent = viewLabels[view] || "";
  renderAll();
}

function setBranch(branch) {
  state.branch = branch;
  const first = activeModules()[0];
  if (first) state.moduleId = first.id;
  document.querySelectorAll("[data-branch]").forEach((btn) => btn.classList.toggle("active", btn.dataset.branch === branch));
  renderAll();
}

function renderModules() {
  const grid = document.getElementById("moduleGrid");
  if (!grid) return;
  grid.innerHTML = activeModules().map((m) => `
    <article class="lesson-card">
      <div class="card-tags"><span class="tag">الدرس ${m.order}</span><span class="tag ${isDone(m.id) ? "done" : ""}">${isDone(m.id) ? "منجز" : "في الانتظار"}</span></div>
      <h2>${m.title}</h2><p>${m.summary}</p>
      <div class="quick-tabs"><button type="button" data-open-module="${m.id}" data-tab="lesson">الدرس</button><button type="button" data-open-module="${m.id}" data-tab="activities">أنشطة</button><button type="button" data-open-module="${m.id}" data-tab="exercises">تمرين محلول</button></div>
      <button class="primary-action" type="button" data-open-module="${m.id}" data-tab="lesson">فتح الدرس</button>
    </article>`).join("");
}

function renderModuleDetail() {
  const box = document.getElementById("moduleDetail");
  if (!box) return;
  const m = currentModule();
  if (!m) return;
  const tab = state.moduleTab;
  const tabs = ["lesson", "activities", "exercises"].map((name) => `<button class="${tab === name ? "active" : ""}" type="button" data-module-tab="${name}">${name === "lesson" ? "الدرس" : name === "activities" ? "أنشطة" : "تمرين محلول"}</button>`).join("");
  let body = "";
  if (tab === "lesson") {
    body = `<div class="lesson-body">${m.lesson.map((p) => `<p>${p}</p>`).join("")}<div class="formula-grid">${m.formulas.map((f) => `<div class="formula-card">${f}</div>`).join("")}</div></div>`;
  } else if (tab === "activities") {
    body = m.activities.map((a, i) => `<section class="exercise-card"><span class="pill">${a.title}</span><p>${a.text}</p><button type="button" class="ghost-action" data-toggle-solution="${m.id}-act-${i}">إظهار الجواب</button><div class="solution ${state.openSolutions[`${m.id}-act-${i}`] ? "show" : ""}">${a.answer}</div></section>`).join("");
  } else {
    body = m.exercises.map((ex, i) => renderExerciseCard(ex, `${m.id}-ex-${i}`)).join("");
  }
  box.innerHTML = `<span class="pill">${branchLabels[state.branch]}</span><h2>${m.title}</h2><p>${m.summary}</p><div class="module-tabs">${tabs}</div>${body}<button class="primary-action" type="button" data-complete="${m.id}">${isDone(m.id) ? "تم إنجاز الدرس" : "تحديد كمنجز"}</button>`;
}

function renderExerciseCard(ex, id) {
  return `<section class="exercise-card"><h3>${ex.title}</h3><p>${ex.text || ex.statement}</p><button type="button" class="ghost-action" data-toggle-solution="${id}">${state.openSolutions[id] ? "إخفاء الحل" : "إظهار الحل"}</button><div class="solution ${state.openSolutions[id] ? "show" : ""}">${ex.solution}</div></section>`;
}

function renderPractice() {
  const list = document.getElementById("practiceList");
  if (!list) return;
  const items = activeModules().flatMap((m) => m.exercises.map((ex, i) => ({...ex, title: `${m.title} - ${ex.title}`, id: `practice-${m.id}-${i}`})));
  list.innerHTML = items.map((ex) => `<section class="exercise-card"><h3>${ex.title}</h3><p>${ex.text}</p></section>`).join("");
}

function renderBac() {
  const select = document.getElementById("bacYearFilter");
  const list = document.getElementById("bacList");
  if (!select || !list) return;
  const branchItems = bacExercises.filter((e) => e.branch === state.branch);
  const years = ["الكل", ...new Set(branchItems.map((e) => e.year))];
  if (!select.value) select.innerHTML = years.map((y) => `<option value="${y}">${y}</option>`).join("");
  const chosen = select.value || "الكل";
  const visible = chosen === "الكل" ? branchItems : branchItems.filter((e) => e.year === chosen);
  list.innerHTML = visible.length ? visible.map((ex) => renderExerciseCard(ex, `bac-${ex.id}`)).join("") : `<section class="card"><p>لا توجد نماذج لهذه الشعبة بعد.</p></section>`;
}

function renderProgress() {
  const mods = activeModules();
  const done = mods.filter((m) => isDone(m.id)).length;
  const percent = mods.length ? Math.round(done / mods.length * 100) : 0;
  document.getElementById("progressSummary").textContent = `أنجزت ${done} من ${mods.length} دروس في مسار ${branchLabels[state.branch]}.`;
  document.getElementById("progressList").innerHTML = mods.map((m) => `<div class="progress-item"><span>${m.title}</span><strong>${isDone(m.id) ? "منجز" : "غير منجز"}</strong></div>`).join("");
  document.getElementById("homePercent").textContent = `${percent}%`;
}

function updateHome() {
  const mods = activeModules();
  const next = mods.find((m) => !isDone(m.id)) || mods[0];
  document.getElementById("homeTitle").textContent = `مسار المتتاليات لشعبة ${branchLabels[state.branch]}`;
  document.getElementById("homeDescription").textContent = "تطبيق مستقل بنفس روح التطبيق الحالي، لكن مخصص للمتتاليات العددية.";
  document.getElementById("statLessons").textContent = mods.length;
  document.getElementById("statActivities").textContent = mods.reduce((s,m) => s + m.activities.length, 0);
  document.getElementById("statExercises").textContent = mods.reduce((s,m) => s + m.exercises.length, 0);
  if (next) {
    document.getElementById("nextLessonTitle").textContent = next.title;
    document.getElementById("nextLessonSummary").textContent = next.summary;
  }
}

function renderAll() {
  updateHome();
  renderModules();
  renderModuleDetail();
  renderPractice();
  renderBac();
  renderProgress();
}

document.addEventListener("click", (event) => {
  const nav = event.target.closest("[data-view]");
  if (nav) setView(nav.dataset.view);
  const viewTarget = event.target.closest("[data-view-target]");
  if (viewTarget) setView(viewTarget.dataset.viewTarget);
  const branch = event.target.closest("[data-branch]");
  if (branch) setBranch(branch.dataset.branch);
  const open = event.target.closest("[data-open-module]");
  if (open) { state.moduleId = open.dataset.openModule; state.moduleTab = open.dataset.tab || "lesson"; setView("module"); }
  const tab = event.target.closest("[data-module-tab]");
  if (tab) { state.moduleTab = tab.dataset.moduleTab; renderModuleDetail(); }
  const toggle = event.target.closest("[data-toggle-solution]");
  if (toggle) { const id = toggle.dataset.toggleSolution; state.openSolutions[id] = !state.openSolutions[id]; renderAll(); }
  const complete = event.target.closest("[data-complete]");
  if (complete) markComplete(complete.dataset.complete);
});

document.getElementById("continueBtn")?.addEventListener("click", () => {
  const next = activeModules().find((m) => !isDone(m.id)) || activeModules()[0];
  if (next) { state.moduleId = next.id; state.moduleTab = "lesson"; setView("module"); }
});

document.getElementById("resetProgressBtn")?.addEventListener("click", () => {
  state.progress = {};
  saveProgress();
  renderAll();
});

document.getElementById("bacYearFilter")?.addEventListener("change", renderBac);

renderAll();
