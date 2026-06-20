const STORAGE_KEY = "ayla-sequences-progress-v1";

const state = {
  view: "home",
  branch: "science",
  bacStream: "mathematics",
  moduleId: "definition",
  moduleTab: "lesson",
  openSolutions: {},
  progress: loadProgress(),
};

const scientificStreams = ["mathematics", "technical_math", "experimental"];

const scientificStreamLabels = {
  mathematics: "رياضيات",
  technical_math: "تقني رياضي",
  experimental: "علوم تجريبية",
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
    id: "bac-2008-exp-subject-1",
    branch: "science",
    stream: "experimental",
    year: "2025",
    title: "بكالوريا 2025 - علوم تجريبية - الموضوع الأول: المتتاليات العددية",
    figureHtml: `<figure class="bac-figure" aria-label="تمثيل بياني للدالة f والمستقيم y=x">
      <svg class="bac-graph" viewBox="0 0 420 300" role="img">
        <rect x="0" y="0" width="420" height="300" rx="10" class="graph-bg"></rect>
        <g class="grid-lines">
          <path d="M70 20V260 M140 20V260 M210 20V260 M280 20V260 M350 20V260 M35 60H385 M35 110H385 M35 160H385 M35 210H385 M35 260H385"></path>
        </g>
        <g class="axes">
          <path d="M35 210H390"></path>
          <path d="M105 270V20"></path>
        </g>
        <g class="axis-labels">
          <text x="98" y="229">0</text><text x="168" y="229">1</text><text x="238" y="229">2</text><text x="308" y="229">3</text><text x="378" y="229">4</text>
          <text x="82" y="164">1</text><text x="82" y="114">2</text><text x="82" y="64">3</text><text x="47" y="229">-1</text>
        </g>
        <path class="line-delta" d="M35 260L385 10"></path>
        <path class="curve-f" d="M35 35 C70 58 98 86 125 110 C155 136 190 151 230 160 C275 170 325 176 385 181"></path>
        <g class="graph-points">
          <circle cx="35" cy="35" r="4"></circle>
          <circle cx="385" cy="60" r="4"></circle>
          <circle cx="147" cy="180" r="4"></circle>
          <circle cx="186" cy="152" r="4"></circle>
        </g>
        <text x="260" y="86" class="graph-label">(Δ): y=x</text>
        <text x="220" y="148" class="graph-label">(Cf)</text>
        <text x="44" y="28" class="graph-label">u₀=-1</text>
      </svg>
    </figure>`,
    statementHtml: `<div class="bac-statement">
      <p>لتكن الدالة <span class="math">f</span> المعرفة على المجال <span class="math">[-1 ; +∞[</span> بالعلاقة:</p>
      <p class="math-equation">f(x) = 3/(x + 2)</p>
      <p>ونقبل <span class="math">(C<sub>f</sub>)</span> تمثيلها البياني والمستقيم <span class="math">(Δ)</span> معادلته <span class="math">y = x</span>.</p>
      <p>نُعرّف المتتالية <span class="math">(u<sub>n</sub>)</span> كما يلي:</p>
      <p><span class="math">u<sub>0</sub> = -1</span> و <span class="math">u<sub>n+1</sub> = f(u<sub>n</sub>)</span></p>

      <h4>1) الدراسة البيانية</h4>
      <ol>
        <li>مثّل بيانيا الحدود الأربعة الأولى <span class="math">u<sub>0</sub>، u<sub>1</sub>، u<sub>2</sub>، u<sub>3</sub></span> باستعمال المنحنى <span class="math">(C<sub>f</sub>)</span> والمستقيم <span class="math">(Δ)</span>.</li>
        <li>أعط تخمينًا حول اتجاه تغيّر المتتالية <span class="math">(u<sub>n</sub>)</span> ونهايتها.</li>
      </ol>

      <h4>2) دراسة المتتالية <span class="math">(v<sub>n</sub>)</span></h4>
      <p>نُعرّف المتتالية <span class="math">(v<sub>n</sub>)</span> على <span class="math">ℕ</span> بالعلاقة:</p>
      <p class="math-equation">v<sub>n</sub> = (1 - u<sub>n</sub>)/(3 + u<sub>n</sub>)</p>
      <ol>
        <li>بيّن أن <span class="math">(v<sub>n</sub>)</span> متتالية هندسية أساسها <span class="math">-1/3</span>، ثم اكتب <span class="math">v<sub>n</sub></span> بدلالة <span class="math">n</span>.</li>
        <li>استنتج كتابة <span class="math">u<sub>n</sub></span> بدلالة <span class="math">n</span>، ثم احسب <span class="math">lim u<sub>n</sub></span>.</li>
      </ol>

      <h4>3) حساب المجموعتين</h4>
      <p>احسب بدلالة <span class="math">n</span> كلّا من:</p>
      <p class="math-equation">S<sub>n</sub> = v<sub>0</sub> + v<sub>1</sub> + ... + v<sub>n</sub></p>
      <p class="math-equation">T<sub>n</sub> = ln|v<sub>0</sub>| + ln|v<sub>1</sub>| + ... + ln|v<sub>n</sub>|</p>
    </div>`,
    solution: `<p><strong>1)</strong> بالحساب: <span class="math">u<sub>0</sub> = -1</span>، <span class="math">u<sub>1</sub> = 3</span>، <span class="math">u<sub>2</sub> = 3/5</span>، <span class="math">u<sub>3</sub> = 15/13</span>. ومن التمثيل البياني تبدو الحدود متقاربة نحو 1.</p>
      <p><strong>2)</strong> لدينا <span class="math">v<sub>0</sub> = (1 + 1)/(3 - 1) = 1</span>. وباستعمال <span class="math">u<sub>n+1</sub> = 3/(u<sub>n</sub> + 2)</span> نجد <span class="math">v<sub>n+1</sub> = -1/3 × v<sub>n</sub></span>.</p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> متتالية هندسية أساسها <span class="math">-1/3</span> وحدها الأول 1، وبالتالي:</p>
      <p class="math-equation">v<sub>n</sub> = (-1/3)<sup>n</sup></p>
      <p>من <span class="math">v<sub>n</sub> = (1 - u<sub>n</sub>)/(3 + u<sub>n</sub>)</span> نستنتج:</p>
      <p class="math-equation">u<sub>n</sub> = (1 - 3v<sub>n</sub>)/(1 + v<sub>n</sub>) = [1 - 3(-1/3)<sup>n</sup>]/[1 + (-1/3)<sup>n</sup>]</p>
      <p>وبما أن <span class="math">(-1/3)<sup>n</sup></span> يؤول إلى 0، فإن <span class="math">lim u<sub>n</sub> = 1</span>.</p>
      <p><strong>3)</strong> مجموع حدود متتالية هندسية:</p>
      <p class="math-equation">S<sub>n</sub> = 3/4 × [1 - (-1/3)<sup>n+1</sup>]</p>
      <p>والمجموع اللوغارتمي:</p>
      <p class="math-equation">T<sub>n</sub> = -n(n + 1)/2 × ln 3</p>`
  },
  {
    id: "bac-2008-exp-subject-2",
    branch: "science",
    stream: "experimental",
    year: "2025",
    title: "بكالوريا 2025 - الموضوع الثاني - علوم تجريبية",
    statementHtml: `<div class="bac-statement">
      <p><strong>1.</strong> ادرس اتجاه تغير الدالة <span class="math">f</span> المعرفة على <span class="math">[0، +∞[</span> بـ <span class="math">f(x)=5x/(2x+1)</span>.</p>
      <p><strong>2.</strong> نعرف المتتالية <span class="math">(uₙ)</span> كما يلي: <span class="math">u₀=3</span> و <span class="math">uₙ₊₁=f(uₙ)</span>.</p>
      <ol>
        <li>احسب الحدين <span class="math">u₁</span> و <span class="math">u₂</span>، ثم خمن اتجاه تغير المتتالية.</li>
        <li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">2&lt;uₙ≤3</span>.</li>
        <li>ادرس اتجاه تغير المتتالية <span class="math">(uₙ)</span>.</li>
      </ol>
      <p><strong>3.</strong> نعرف المتتالية <span class="math">(vₙ)</span> على <span class="math">N</span> بـ <span class="math">vₙ=3ⁿ(1-2/uₙ)</span>.</p>
      <ol>
        <li>بين أن <span class="math">(vₙ)</span> هندسية أساسها <span class="math">3/5</span>، ثم اكتب <span class="math">vₙ</span> بدلالة <span class="math">n</span>.</li>
        <li>استنتج بدلالة <span class="math">n</span> حساب المجموع <span class="math">Sₙ=v₀+5v₁+5²v₂+...+5ⁿvₙ</span>.</li>
        <li>اكتب عبارة <span class="math">uₙ</span> بدلالة <span class="math">n</span>، ثم احسب <span class="math">lim uₙ</span>.</li>
      </ol>
      <p><strong>4.</strong> تحقق أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">6/uₙ = 3 - 1/5ⁿ</span>.</p>
      <p>استنتج بدلالة <span class="math">n</span> حساب المجموع <span class="math">Tₙ=6/u₀+6/u₁+...+6/uₙ</span>.</p>
    </div>`,
    solution: `<p><strong>1)</strong> لدينا <span class="math">f(x) = 5x/(2x + 1)</span>، وبالتالي:</p>
      <p class="math-equation">f'(x) = 5/(2x + 1)² > 0</p>
      <p>إذن <span class="math">f</span> متزايدة تماما على <span class="math">[0, +∞[</span>.</p>
      <p>بالتعويض: <span class="math">u<sub>1</sub> = 15/7</span> و <span class="math">u<sub>2</sub> = 75/37</span>.</p>
      <p><strong>برهان بالتراجع:</strong> إذا كان <span class="math">2 < u<sub>n</sub> ≤ 3</span>، فبما أن <span class="math">f</span> متزايدة:</p>
      <p class="math-equation">f(2) < u<sub>n+1</sub> ≤ f(3)</p>
      <p>أي:</p>
      <p class="math-equation">2 < u<sub>n+1</sub> ≤ 15/7 ≤ 3</p>
      <p><strong>2)</strong> ندرس الفرق:</p>
      <p class="math-equation">u<sub>n+1</sub> - u<sub>n</sub> = 2u<sub>n</sub>(2 - u<sub>n</sub>)/(2u<sub>n</sub> + 1)</p>
      <p>وبما أن <span class="math">u<sub>n</sub> > 2</span> فإن هذا الفرق سالب، إذن <span class="math">(u<sub>n</sub>)</span> متناقصة تماما. وهي محدودة من الأسفل بـ 2، فتكون متقاربة.</p>
      <p><strong>3)</strong> لدينا <span class="math">v<sub>0</sub> = 3<sup>0</sup>(1 - 2/u<sub>0</sub>) = 1/3</span>. وبالمعطيات نجد:</p>
      <p class="math-equation">v<sub>n+1</sub> = 3/5 × v<sub>n</sub></p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> متتالية هندسية أساسها <span class="math">3/5</span>، وبالتالي:</p>
      <p class="math-equation">v<sub>n</sub> = 1/3 × (3/5)<sup>n</sup></p>
      <p>من <span class="math">v<sub>n</sub> = 3<sup>n</sup>(1 - 2/u<sub>n</sub>)</span> نستنتج:</p>
      <p class="math-equation">1 - 2/u<sub>n</sub> = v<sub>n</sub>/3<sup>n</sup> = 1/(3 × 5<sup>n</sup>)</p>
      <p>وبالتالي:</p>
      <p class="math-equation">u<sub>n</sub> = 6 × 5<sup>n</sup>/(3 × 5<sup>n</sup> - 1)</p>
      <p>ومنه:</p>
      <p class="math-equation">lim u<sub>n</sub> = 2</p>
      <p><strong>4)</strong> نتحقق من أن:</p>
      <p class="math-equation">6/u<sub>n</sub> = 3 - 1/5<sup>n</sup></p>
      <p>وبالتالي:</p>
      <p class="math-equation">T<sub>n</sub> = 3(n + 1) - 5/4 × [1 - 1/5<sup>n+1</sup>]</p>`
  },
  {
    id: "bac-2024-exp-subject-1",
    branch: "science",
    stream: "experimental",
    year: "2024",
    title: "بكالوريا 2024 - علوم تجريبية - الموضوع الأول: المتتاليات العددية",
    statementHtml: `<div class="bac-statement">
      <p>المتتالية العددية <span class="math">(u<sub>n</sub>)</span> المعرفة بـ <span class="math">u<sub>0</sub> = 0</span> ومن أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math-equation">u<sub>n+1</sub> = (4 - u<sub>n</sub>)/(2 + u<sub>n</sub>)</p>

      <h4>1) حساب حدود وبرهان بالتراجع</h4>
      <p>احسب الحدود <span class="math">u<sub>1</sub>، u<sub>2</sub>، u<sub>3</sub></span>، ثم برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math-equation">0 ≤ u<sub>n</sub> ≤ 2</p>

      <h4>2) دراسة المتتالية <span class="math">(v<sub>n</sub>)</span></h4>
      <p>المتتالية العددية <span class="math">(v<sub>n</sub>)</span> المعرفة على <span class="math">ℕ</span> بـ:</p>
      <p class="math-equation">v<sub>n</sub> = (u<sub>n</sub> - 1)/(u<sub>n</sub> + 4)</p>
      <ol>
        <li><strong>أ)</strong> أثبت أن المتتالية <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">-2/3</span>، ثم اكتب عبارة <span class="math">v<sub>n</sub></span> بدلالة <span class="math">n</span>.</li>
        <li><strong>ب)</strong> بيّن أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n</sub> = 5/(1 - v<sub>n</sub>) - 4</span>، ثم احسب <span class="math">lim<sub>n→+∞</sub> u<sub>n</sub></span>.</li>
      </ol>

      <h4>3) حساب مجموعتين</h4>
      <p>من أجل كل عدد طبيعي <span class="math">n</span>، نضع:</p>
      <p class="math-equation">S<sub>n</sub> = v<sub>n</sub> + v<sub>n+1</sub> + ... + v<sub>n+2024</sub></p>
      <p class="math-equation">T<sub>n</sub> = 1/(4 + u<sub>n</sub>) + 1/(4 + u<sub>n+1</sub>) + ... + 1/(4 + u<sub>n+2024</sub>)</p>
      <p>احسب <span class="math">S<sub>n</sub></span> بدلالة <span class="math">n</span>، ثم استنتج <span class="math">T<sub>n</sub></span> بدلالة <span class="math">n</span>.</p>
    </div>`,
    solution: `<p><strong>1)</strong> بالتعويض المباشر:</p>
      <p class="math-equation">u<sub>1</sub> = 2، u<sub>2</sub> = 1/2، u<sub>3</sub> = 7/5</p>
      <p><strong>برهان بالتراجع:</strong> عند <span class="math">n = 0</span>، لدينا <span class="math">u<sub>0</sub> = 0</span>، إذن <span class="math">0 ≤ u<sub>0</sub> ≤ 2</span>.</p>
      <p>نفترض أن <span class="math">0 ≤ u<sub>n</sub> ≤ 2</span>، ونريد إثبات أن <span class="math">0 ≤ u<sub>n+1</sub> ≤ 2</span>.</p>
      <p>بما أن <span class="math">u<sub>n+1</sub> = (4 - u<sub>n</sub>)/(2 + u<sub>n</sub>)</span>، فإن <span class="math">u<sub>n+1</sub> ≥ 0</span> بما أن البسط والمقام موجبان.</p>
      <p>كما أن <span class="math">u<sub>n+1</sub> - 2 = (4 - u<sub>n</sub> - 4 - 2u<sub>n</sub>)/(2 + u<sub>n</sub>) = -3u<sub>n</sub>/(2 + u<sub>n</sub>) ≤ 0</span>.</p>
      <p>إذن <span class="math">u<sub>n+1</sub> ≤ 2</span>. وبالتالي العبارة صحيحة لكل <span class="math">n</span>.</p>
      <p><strong>2)</strong> <strong>أ)</strong> لدينا <span class="math">v<sub>0</sub> = (0 - 1)/(0 + 4) = -1/4</span>.</p>
      <p>وباستعمال العلاقة التراجعية لـ <span class="math">u<sub>n</sub></span> نجد:</p>
      <p class="math-equation">v<sub>n+1</sub> = -2/3 × v<sub>n</sub></p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> متتالية هندسية أساسها <span class="math">-2/3</span> وحدها الأول <span class="math">-1/4</span>، وبالتالي:</p>
      <p class="math-equation">v<sub>n</sub> = -1/4 × (-2/3)<sup>n</sup></p>
      <p><strong>ب)</strong> من <span class="math">v<sub>n</sub> = (u<sub>n</sub> - 1)/(u<sub>n</sub> + 4)</span>، نجد <span class="math">v<sub>n</sub>(u<sub>n</sub> + 4) = u<sub>n</sub> - 1</span>، ثم <span class="math">u<sub>n</sub>(1 - v<sub>n</sub>) = 1 + 4v<sub>n</sub></span>.</p>
      <p>وبما أن <span class="math">1 + 4v<sub>n</sub> = 5(1 - v<sub>n</sub>)</span> (باستعمال عبارة <span class="math">v<sub>n</sub></span>)، فإن:</p>
      <p class="math-equation">u<sub>n</sub> = 5/(1 - v<sub>n</sub>) - 4</p>
      <p>وبما أن <span class="math">(-2/3)<sup>n</sup></span> يؤول إلى 0، فإن <span class="math">v<sub>n</sub></span> يؤول إلى 0، ومنه:</p>
      <p class="math-equation">lim<sub>n→+∞</sub> u<sub>n</sub> = 1</p>
      <p><strong>3)</strong> <span class="math">S<sub>n</sub></span> مجموع 2025 حد متتالية هندسية أساسها <span class="math">-2/3</span>:</p>
      <p class="math-equation">S<sub>n</sub> = v<sub>n</sub> × [1 - (-2/3)<sup>2025</sup>]/[1 + 2/3] = -3/20 × (-2/3)<sup>n</sup> × [1 - (-2/3)<sup>2025</sup>]</p>
      <p>لاحظ أن <span class="math">1/(4 + u<sub>k</sub>) = (1 - v<sub>k</sub>)/5</span>، إذن:</p>
      <p class="math-equation">T<sub>n</sub> = 405 - S<sub>n</sub>/5</p>
      <p>وبالتعويض عن <span class="math">S<sub>n</sub></span>:</p>
      <p class="math-equation">T<sub>n</sub> = 405 + 3/100 × (-2/3)<sup>n</sup> × [1 - (-2/3)<sup>2025</sup>]</p>`
  },
  {
    id: "bac-2024-exp-subject-2",
    branch: "science",
    stream: "experimental",
    year: "2024",
    title: "بكالوريا 2024 - الموضوع الثاني - علوم تجريبية",
    statementHtml: `<div class="bac-statement">
      <p><strong>1.</strong> لتكن الدالة العددية <span class="math">f</span> المعرفة على المجال <span class="math">[2، +∞[</span> كما يلي:</p>
      <p class="math">f(x)=(x+1)/(2x)</p>
      <ol>
        <li>شكل جدول تغيرات الدالة <span class="math">f</span>.</li>
        <li>استنتج أنه من أجل كل <span class="math">x</span> من <span class="math">[2، +∞[</span> فإن: <span class="math">1/2 &lt; f(x) ≤ 3/4</span>.</li>
      </ol>
      <p><strong>2.</strong> نعرف المتتالية العددية <span class="math">(uₙ)</span> من أجل كل عدد طبيعي <span class="math">n≥2</span> بـ:</p>
      <p class="math">uₙ=n/2ⁿ</p>
      <ol>
        <li>بين أنه من أجل كل <span class="math">n≥2</span>: <span class="math">uₙ₊₁/uₙ ≤ 3/4</span>.</li>
        <li>أثبت أنه من أجل كل <span class="math">n≥2</span>: <span class="math">uₙ ≤ (1/2)(3/4)ⁿ⁻²</span>، ثم استنتج <span class="math">lim uₙ</span>.</li>
        <li>نضع من أجل كل <span class="math">n≥2</span>: <span class="math">Sₙ=u₂/2+u₃/3+...+uₙ/n</span>.</li>
        <li>بين أن <span class="math">Sₙ=1/2(1-(1/2)ⁿ⁻¹)</span>، ثم عين العدد الطبيعي <span class="math">n</span> حتى يكون <span class="math">Sₙ=511/1024</span>.</li>
      </ol>
    </div>`,
    solution: `<p><strong>1)</strong> لدينا <span class="math">f(x) = (x + 1)/(2x) = 1/2 + 1/(2x)</span>، وبالتالي:</p>
      <p class="math-equation">f'(x) = -1/(2x²) < 0</p>
      <p>إذن <span class="math">f</span> متناقصة تماما على <span class="math">[2, +∞[</span>. كما أن <span class="math">f(2) = 3/4</span> و <span class="math">lim<sub>x→+∞</sub> f(x) = 1/2</span>، وبالتالي:</p>
      <p class="math-equation">1/2 < f(x) ≤ 3/4</p>
      <p><strong>2)</strong> <strong>أ)</strong> بما أن <span class="math">u<sub>n</sub> = n/2<sup>n</sup></span>، فإن:</p>
      <p class="math-equation">u<sub>n+1</sub>/u<sub>n</sub> = (n + 1)/(2n) = f(n) ≤ 3/4</p>
      <p><strong>ب)</strong> بالتكرار نجد <span class="math">u<sub>n</sub> ≤ u<sub>2</sub>(3/4)<sup>n-2</sup></span>. وبما أن <span class="math">u<sub>2</sub> = 1/2</span>، فإن:</p>
      <p class="math-equation">u<sub>n</sub> ≤ 1/2 × (3/4)<sup>n-2</sup></p>
      <p>وبما أن <span class="math">(3/4)<sup>n-2</sup></span> يؤول إلى 0، فإن:</p>
      <p class="math-equation">lim u<sub>n</sub> = 0</p>
      <p><strong>ج)</strong> لدينا <span class="math">u<sub>k</sub>/k = 1/2<sup>k</sup></span>، إذن:</p>
      <p class="math-equation">S<sub>n</sub> = 1/2² + 1/2³ + ... + 1/2<sup>n</sup> = 1/2 × [1 - (1/2)<sup>n-1</sup>]</p>
      <p><strong>د)</strong> إذا كان <span class="math">S<sub>n</sub> = 511/1024</span>، فإن:</p>
      <p class="math-equation">1/2 × [1 - 1/2<sup>n-1</sup>] = 511/1024</p>
      <p>بعد الحل نجد <span class="math">1/2<sup>n</sup> = 1/1024 = 1/2<sup>10</sup></span>، وبالتالي:</p>
      <p class="math-equation">n = 10</p>`
  },  {
    id: "bac-2023-exp-subject-1",
    branch: "science",
    stream: "experimental",
    year: "2023",
    title: "بكالوريا 2023 - الموضوع الأول - علوم تجريبية",
    statementHtml: `<div class="bac-statement">
      <p>لتكن المتتالية <span class="math">(uₙ)</span> المعرفة بـ:</p>
      <p class="math">u₀=1/2 ، uₙ₊₁=-1+2/(2-uₙ)</p>
      <ol>
        <li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">0&lt;uₙ≤1/2</span>.</li>
        <li>بين أن المتتالية <span class="math">(uₙ)</span> متناقصة تماما.</li>
      </ol>
      <p><strong>2.</strong> نضع من أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math">vₙ=1/uₙ - 1</p>
      <ol>
        <li>أثبت أن المتتالية <span class="math">(vₙ)</span> هندسية أساسها <span class="math">2</span>، ثم اكتب عبارة <span class="math">vₙ</span> بدلالة <span class="math">n</span>.</li>
        <li>استنتج أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">uₙ=1/(2ⁿ+1)</span>، ثم احسب <span class="math">lim uₙ</span>.</li>
      </ol>
      <p><strong>3.</strong> نضع من أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math">Sₙ=v₀+v₁+...+vₙ ، Tₙ=1/u₀+1/u₁+...+1/uₙ</p>
      <p>احسب <span class="math">Sₙ</span> بدلالة <span class="math">n</span>، ثم بين أنه من أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math">Tₙ=2ⁿ⁺¹+n</p>
    </div>`,
    solution: `<p><strong>1)</strong> نكتب أولا:</p>
      <p class="math-equation">u<sub>n+1</sub> = -1 + 2/(2 - u<sub>n</sub>) = u<sub>n</sub>/(2 - u<sub>n</sub>)</p>
      <p><strong>برهان بالتراجع:</strong> عند <span class="math">n = 0</span>، لدينا <span class="math">u<sub>0</sub> = 1/2</span>، إذن <span class="math">0 < u<sub>0</sub> ≤ 1/2</span>.</p>
      <p>نفترض أن <span class="math">0 < u<sub>n</sub> ≤ 1/2</span>. فإن <span class="math">3/2 ≤ 2 - u<sub>n</sub> < 2</span>، ومنه:</p>
      <p class="math-equation">u<sub>n+1</sub> > 0 &nbsp; و &nbsp; u<sub>n+1</sub> ≤ (1/2)/(3/2) = 1/3 ≤ 1/2</p>
      <p>إذن الخاصية تثبت بالتراجع.</p>
      <p>كما أن:</p>
      <p class="math-equation">u<sub>n+1</sub> - u<sub>n</sub> = u<sub>n</sub>(u<sub>n</sub> - 1)/(2 - u<sub>n</sub>) < 0</p>
      <p>وبالتالي <span class="math">(u<sub>n</sub>)</span> متناقصة تماما.</p>
      <p><strong>2)</strong> لدينا <span class="math">v<sub>0</sub> = 1/u<sub>0</sub> - 1 = 1</span>. وبالحساب:</p>
      <p class="math-equation">v<sub>n+1</sub> = 1/u<sub>n+1</sub> - 1 = (2 - u<sub>n</sub>)/u<sub>n</sub> - 1 = 2/u<sub>n</sub> - 2 = 2v<sub>n</sub></p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> هندسية أساسها 2، وبالتالي:</p>
      <p class="math-equation">v<sub>n</sub> = 2<sup>n</sup></p>
      <p>ومنه:</p>
      <p class="math-equation">1/u<sub>n</sub> = v<sub>n</sub> + 1 = 2<sup>n</sup> + 1</p>
      <p>أي:</p>
      <p class="math-equation">u<sub>n</sub> = 1/(2<sup>n</sup> + 1)</p>
      <p>وبالتالي:</p>
      <p class="math-equation">lim u<sub>n</sub> = 0</p>
      <p><strong>3)</strong> لدينا:</p>
      <p class="math-equation">S<sub>n</sub> = 1 + 2 + ... + 2<sup>n</sup> = 2<sup>n+1</sup> - 1</p>
      <p>وبما أن <span class="math">1/u<sub>k</sub> = v<sub>k</sub> + 1</span>، فإن:</p>
      <p class="math-equation">T<sub>n</sub> = S<sub>n</sub> + (n + 1) = 2<sup>n+1</sup> + n</p>`
  },  {
    id: "bac-2023-exp-subject-2",
    branch: "science",
    stream: "experimental",
    year: "2023",
    title: "بكالوريا 2023 - الموضوع الثاني - علوم تجريبية",
    statementHtml: `<div class="bac-statement">
      <p>لتكن المتتالية العددية <span class="math">(uₙ)</span> المعرفة بـ:</p>
      <p class="math">u₀=0 ، uₙ₊₁=(4/5)uₙ+1</p>
      <ol>
        <li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">uₙ&lt;5</span>.</li>
        <li>بين أن المتتالية <span class="math">(uₙ)</span> متزايدة تماما.</li>
      </ol>
      <p><strong>2.</strong> نضع من أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math">vₙ=uₙ-5</p>
      <ol>
        <li>أثبت أن المتتالية <span class="math">(vₙ)</span> هندسية أساسها <span class="math">4/5</span>، ثم عين حدها الأول <span class="math">v₀</span>.</li>
        <li>اكتب عبارة <span class="math">vₙ</span> بدلالة <span class="math">n</span>، ثم استنتج أنه من أجل كل عدد طبيعي <span class="math">n</span>:</li>
      </ol>
      <p class="math">uₙ=-5(4/5)ⁿ+5</p>
      <ol start="3">
        <li>احسب <span class="math">lim uₙ</span>.</li>
      </ol>
      <p><strong>3.</strong> نضع من أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math">Sₙ=v₀+v₁+...+vₙ ، Tₙ=u₀+u₁+...+uₙ</p>
      <p>احسب <span class="math">Sₙ</span> بدلالة <span class="math">n</span>، ثم بين أنه من أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math">Tₙ=5n-20(1-(4/5)ⁿ)</p>
    </div>`,
    solution: `<p><strong>1)</strong> <strong>برهان بالتراجع:</strong> عند <span class="math">n = 0</span>، لدينا <span class="math">u<sub>0</sub> = 0 < 5</span>.</p>
      <p>نفترض أن <span class="math">u<sub>n</sub> < 5</span>. فإن:</p>
      <p class="math-equation">u<sub>n+1</sub> = (4/5)u<sub>n</sub> + 1 < 4 + 1 = 5</p>
      <p>إذن الخاصية تثبت بالتراجع.</p>
      <p>كما أن:</p>
      <p class="math-equation">u<sub>n+1</sub> - u<sub>n</sub> = 1 - u<sub>n</sub>/5 = (5 - u<sub>n</sub>)/5 > 0</p>
      <p>وبالتالي <span class="math">(u<sub>n</sub>)</span> متزايدة تماما.</p>
      <p><strong>2)</strong> لدينا <span class="math">v<sub>n</sub> = u<sub>n</sub> - 5</span>، وبالتالي:</p>
      <p class="math-equation">v<sub>n+1</sub> = u<sub>n+1</sub> - 5 = (4/5)u<sub>n</sub> + 1 - 5 = (4/5)(u<sub>n</sub> - 5) = (4/5)v<sub>n</sub></p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">4/5</span> وحدها الأول <span class="math">v<sub>0</sub> = -5</span>. وبالتالي:</p>
      <p class="math-equation">v<sub>n</sub> = -5(4/5)<sup>n</sup></p>
      <p>ومنه:</p>
      <p class="math-equation">u<sub>n</sub> = 5 - 5(4/5)<sup>n</sup></p>
      <p>وبالتالي:</p>
      <p class="math-equation">lim u<sub>n</sub> = 5</p>
      <p><strong>3)</strong> لدينا:</p>
      <p class="math-equation">S<sub>n</sub> = -5 × [1 - (4/5)<sup>n+1</sup>]/(1/5) = -25 × [1 - (4/5)<sup>n+1</sup>]</p>
      <p>وبما أن <span class="math">u<sub>k</sub> = 5 - 5(4/5)<sup>k</sup></span>، فإن:</p>
      <p class="math-equation">u<sub>0</sub> + u<sub>1</sub> + ... + u<sub>n</sub> = 5(n + 1) - 25 × [1 - (4/5)<sup>n+1</sup>]</p>
      <div class="warning-box"><strong>ملاحظة:</strong> الصيغة <span class="math">T<sub>n</sub> = 5n - 20(1 - (4/5)<sup>n</sup>)</span> تتوافق مع مجموع الحدود من <span class="math">u<sub>0</sub></span> إلى <span class="math">u<sub>n-1</sub></span>.</div>`
  },  {
    id: "bac-2022-exp-subject-2",
    branch: "science",
    stream: "experimental",
    year: "2022",
    title: "بكالوريا 2022 - الموضوع الثاني - علوم تجريبية",
    statementHtml: `<div class="bac-statement">
      <p>المتتالية الهندسية <span class="math">(uₙ)</span> المعرفة على <span class="math">N</span> حدودها موجبة تماما، حيث:</p>
      <p class="math">u₀ × u₂ = e² ، ln(u₁)+ln(u₇)=-4</p>
      <ol>
        <li>عين <span class="math">u₁</span> والأساس <span class="math">q</span> للمتتالية <span class="math">(uₙ)</span>.</li>
        <li>تحقق أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">uₙ=e²⁻ⁿ</span>.</li>
      </ol>
      <p><strong>2.</strong> احسب، بدلالة <span class="math">n</span>، المجموع:</p>
      <p class="math">Sₙ=u₀+u₁+...+uₙ</p>
      <p><strong>3.</strong> نعتبر المتتالية العددية <span class="math">(vₙ)</span> المعرفة بـ <span class="math">v₀=e³</span> و، من أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math">vₙ₊₁=vₙ+uₙ</p>
      <ol>
        <li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>:</li>
      </ol>
      <p class="math">vₙ=(e³⁻ⁿ-e⁴)/(1-e)</p>
      <ol start="2">
        <li>بين أن <span class="math">(vₙ)</span> متقاربة.</li>
      </ol>
      <p><strong>4.</strong></p>
      <ol>
        <li>بين أنه من أجل كل عدد طبيعي <span class="math">n</span>:</li>
      </ol>
      <p class="math">(1/e)vₙ = (1/(1-e))(uₙ-e³)</p>
      <ol start="2">
        <li>نعتبر المجموع <span class="math">S'ₙ=(1/e)v₀+(1/e)v₁+...+(1/e)vₙ</span>. تحقق أنه من أجل كل عدد طبيعي <span class="math">n</span>:</li>
      </ol>
      <p class="math">S'ₙ=(1/(1-e))[Sₙ-(n+1)e³]</p>
    </div>`,
    solution: `<p><strong>1)</strong> بما أن <span class="math">(u<sub>n</sub>)</span> هندسية وحدودها موجبة، فإن:</p>
      <p class="math-equation">u<sub>0</sub> × u<sub>2</sub> = u<sub>1</sub>² = e²</p>
      <p>ومنه:</p>
      <p class="math-equation">u<sub>1</sub> = e</p>
      <p>كما أن <span class="math">u<sub>7</sub> = u<sub>1</sub>q<sup>6</sup> = e q<sup>6</sup></span>، وبالتالي:</p>
      <p class="math-equation">ln(u<sub>1</sub>) + ln(u<sub>7</sub>) = 1 + ln(e q<sup>6</sup>) = 2 + 6ln(q) = -4</p>
      <p>فنجد <span class="math">ln(q) = -1</span>، أي <span class="math">q = e<sup>-1</sup></span>.</p>
      <p>وبما أن <span class="math">u<sub>1</sub> = u<sub>0</sub>q = e</span>، فإن <span class="math">u<sub>0</sub> = e²</span>. إذن:</p>
      <p class="math-equation">u<sub>n</sub> = e² × (e<sup>-1</sup>)<sup>n</sup> = e<sup>2-n</sup></p>
      <p><strong>2)</strong> المجموع:</p>
      <p class="math-equation">S<sub>n</sub> = e² × [1 - e<sup>-(n+1)</sup>]/[1 - e<sup>-1</sup>]</p>
      <p><strong>3)</strong> بما أن <span class="math">v<sub>n+1</sub> = v<sub>n</sub> + u<sub>n</sub></span> و <span class="math">v<sub>0</sub> = e³</span>، فإن:</p>
      <p class="math-equation">v<sub>n</sub> = e³ + u<sub>0</sub> + u<sub>1</sub> + ... + u<sub>n-1</sub> = (e<sup>3-n</sup> - e⁴)/(1 - e)</p>
      <p>ومنه:</p>
      <p class="math-equation">lim v<sub>n</sub> = e⁴/(e - 1)</p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> متقاربة.</p>
      <p><strong>4)</strong> نتحقق من أن:</p>
      <p class="math-equation">(1/e)v<sub>n</sub> = (e<sup>2-n</sup> - e³)/(1 - e) = (u<sub>n</sub> - e³)/(1 - e)</p>
      <p>وبجمع هذه العلاقة من <span class="math">k = 0</span> إلى <span class="math">n</span> نحصل على:</p>
      <p class="math-equation">S'<sub>n</sub> = (1/(1 - e)) × [S<sub>n</sub> - (n + 1)e³]</p>`
  },  {
    id: "bac-2021-exp-subject-1",
    branch: "science",
    stream: "experimental",
    year: "2021",
    title: "بكالوريا 2021 - الموضوع الأول - علوم تجريبية",
    statementHtml: `<div class="bac-statement">
      <p>المتتالية العددية <span class="math">(uₙ)</span> معرفة على <span class="math">N</span> بـ:</p>
      <p class="math">uₙ=-4n+3</p>
      <ol>
        <li>بين أن المتتالية <span class="math">(uₙ)</span> حسابية، ثم عين أساسها <span class="math">r</span> وحدها الأول <span class="math">u₀</span>.</li>
      </ol>
      <p><strong>2.</strong> من أجل كل عدد طبيعي <span class="math">n</span> نضع:</p>
      <p class="math">Sₙ=u₀+u₁+...+uₙ</p>
      <ol>
        <li>بين أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">Sₙ=-2n²+n+3</span>.</li>
        <li>عين قيمة العدد الطبيعي <span class="math">n</span> حيث: <span class="math">Sₙ=-30132</span>.</li>
      </ol>
      <p><strong>3.</strong> المتتالية العددية <span class="math">(vₙ)</span> حدودها موجبة تماما، ومن أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math">uₙ=ln(vₙ)</p>
      <ol>
        <li>اكتب عبارة الحد العام <span class="math">vₙ</span> بدلالة <span class="math">n</span>.</li>
        <li>بين أن المتتالية <span class="math">(vₙ)</span> هندسية أساسها <span class="math">e⁻⁴</span>.</li>
      </ol>
      <p><strong>4.</strong> من أجل كل عدد طبيعي <span class="math">n</span> نضع:</p>
      <p class="math">S'ₙ=ln[v₀(1-1/2)]+ln[v₁(1-1/3)]+...+ln[vₙ(1-1/(n+2))]</p>
      <p>احسب <span class="math">S'ₙ</span> بدلالة <span class="math">n</span>.</p>
    </div>`,
    solution: `<p><strong>1)</strong> لدينا:</p>
      <p class="math-equation">u<sub>n+1</sub> - u<sub>n</sub> = -4</p>
      <p>إذن <span class="math">(u<sub>n</sub>)</span> متتالية حسابية أساسها <span class="math">r = -4</span> وحدها الأول <span class="math">u<sub>0</sub> = 3</span>.</p>
      <p><strong>2)</strong> <strong>أ)</strong> المجموع:</p>
      <p class="math-equation">S<sub>n</sub> = (n + 1)(u<sub>0</sub> + u<sub>n</sub>)/2 = (n + 1)(6 - 4n)/2 = (n + 1)(3 - 2n) = -2n² + n + 3</p>
      <p><strong>ب)</strong> لحل <span class="math">S<sub>n</sub> = -30132</span>:</p>
      <p class="math-equation">-2n² + n + 3 = -30132</p>
      <p>أي:</p>
      <p class="math-equation">2n² - n - 30135 = 0</p>
      <p>المعادلة تقبل الحل <span class="math">n = 123</span>.</p>
      <p><strong>3)</strong> بما أن <span class="math">u<sub>n</sub> = ln(v<sub>n</sub>)</span>، فإن:</p>
      <p class="math-equation">v<sub>n</sub> = e<sup>u<sub>n</sub></sup> = e<sup>-4n+3</sup> = e³ × (e<sup>-4</sup>)<sup>n</sup></p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">e<sup>-4</sup></span>.</p>
      <p><strong>4)</strong> لدينا:</p>
      <p class="math-equation">ln[v<sub>k</sub>(1 - 1/(k + 2))] = ln(v<sub>k</sub>) + ln((k + 1)/(k + 2)) = u<sub>k</sub> + ln((k + 1)/(k + 2))</p>
      <p>وبجمع الحدود من <span class="math">k = 0</span> إلى <span class="math">n</span>:</p>
      <p class="math-equation">S'<sub>n</sub> = S<sub>n</sub> + ln(1/(n + 2)) = -2n² + n + 3 - ln(n + 2)</p>`
  },  {
    id: "bac-2012-exp-subject-2",
    branch: "science",
    stream: "experimental",
    year: "2021",
    title: "بكالوريا 2021 - الموضوع الثاني - علوم تجريبية",
    statementHtml: `<div class="bac-statement">
      <p>المتتالية العددية <span class="math">(uₙ)</span> معرفة بحدها الأول <span class="math">u₀</span> حيث:</p>
      <p class="math">u₀=0 ، uₙ₊₁=(3/8)(uₙ+5)</p>
      <ol>
        <li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">uₙ&lt;3</span>.</li>
        <li>بين أن <span class="math">(uₙ)</span> متزايدة تماما، ثم استنتج أنها متقاربة.</li>
      </ol>
      <p><strong>3.</strong> المتتالية العددية <span class="math">(vₙ)</span> معرفة على <span class="math">N</span> بـ:</p>
      <p class="math">vₙ=3(3-uₙ)</p>
      <ol>
        <li>احسب <span class="math">v₀</span>، ثم بين أن <span class="math">(vₙ)</span> هندسية أساسها <span class="math">3/8</span>.</li>
        <li>اكتب بدلالة <span class="math">n</span> عبارة الحد العام <span class="math">vₙ</span>، ثم استنتج أنه من أجل كل عدد طبيعي <span class="math">n</span>:</li>
      </ol>
      <p class="math">uₙ=3-3(3/8)ⁿ</p>
      <ol start="3">
        <li>احسب <span class="math">lim uₙ</span>.</li>
      </ol>
      <p><strong>4.</strong> نضع من أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math">Pₙ=(3-u₀)(3-u₁)×...×(3-uₙ)</p>
      <p>احسب <span class="math">Pₙ</span> بدلالة <span class="math">n</span>.</p>
    </div>`,
    solution: `<p><strong>1)</strong> <strong>برهان بالتراجع:</strong> عند <span class="math">n = 0</span>، لدينا <span class="math">u<sub>0</sub> = 0 < 3</span>.</p>
      <p>نفترض أن <span class="math">u<sub>n</sub> < 3</span>. فإن:</p>
      <p class="math-equation">u<sub>n+1</sub> = (3/8)(u<sub>n</sub> + 5) < (3/8) × 8 = 3</p>
      <p>إذن الخاصية تثبت بالتراجع.</p>
      <p>كما أن:</p>
      <p class="math-equation">u<sub>n+1</sub> - u<sub>n</sub> = (3/8)(u<sub>n</sub> + 5) - u<sub>n</sub> = (15 - 5u<sub>n</sub>)/8 = 5(3 - u<sub>n</sub>)/8 > 0</p>
      <p>إذن <span class="math">(u<sub>n</sub>)</span> متزايدة تماما. وهي محدودة من الأعلى بـ 3، فتكون متقاربة.</p>
      <p><strong>2)</strong> لدينا <span class="math">v<sub>0</sub> = 3(3 - 0) = 9</span>. وبالحساب:</p>
      <p class="math-equation">v<sub>n+1</sub> = 3(3 - u<sub>n+1</sub>) = (3/8) × 3(3 - u<sub>n</sub>) = (3/8)v<sub>n</sub></p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">3/8</span>، وبالتالي:</p>
      <p class="math-equation">v<sub>n</sub> = 9(3/8)<sup>n</sup></p>
      <p>وبما أن <span class="math">v<sub>n</sub> = 3(3 - u<sub>n</sub>)</span>، فإن:</p>
      <p class="math-equation">u<sub>n</sub> = 3 - 3(3/8)<sup>n</sup></p>
      <p>ومنه:</p>
      <p class="math-equation">lim u<sub>n</sub> = 3</p>
      <p><strong>3)</strong> لدينا <span class="math">3 - u<sub>k</sub> = v<sub>k</sub>/3 = 3(3/8)<sup>k</sup></span>، إذن:</p>
      <p class="math-equation">P<sub>n</sub> = ∏<sub>k=0</sub><sup>n</sup> 3(3/8)<sup>k</sup> = 3<sup>n+1</sup> × (3/8)<sup>n(n+1)/2</sup></p>`
  },  {
    id: "bac-2020-exp-subject-1",
    branch: "science",
    stream: "experimental",
    year: "2020",
    title: "بكالوريا 2020 - الموضوع الأول - علوم تجريبية",
    statementHtml: `<div class="bac-statement">
      <p>المتتالية العددية <span class="math">(uₙ)</span> معرفة بـ <span class="math">u₀=α</span>، حيث <span class="math">α</span> عدد حقيقي، ومن أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math">uₙ₊₁=(3/4)uₙ-1</p>
      <p><strong>1.</strong> نفرض أن <span class="math">α=-4</span>.</p>
      <ol>
        <li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">uₙ=-4</span>.</li>
      </ol>
      <p><strong>2.</strong> نفرض أن <span class="math">α≠-4</span>.</p>
      <p>نعتبر المتتالية العددية <span class="math">(vₙ)</span> المعرفة على مجموعة الأعداد الطبيعية <span class="math">N</span> بـ:</p>
      <p class="math">vₙ=uₙ+4</p>
      <ol>
        <li>أثبت أن المتتالية <span class="math">(vₙ)</span> هندسية أساسها <span class="math">3/4</span>.</li>
        <li>اكتب عبارة الحد العام <span class="math">uₙ</span> بدلالة <span class="math">n</span> و <span class="math">α</span>، ثم بين أن المتتالية <span class="math">(uₙ)</span> متقاربة.</li>
        <li>نضع من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">Sₙ=u₀+u₁+u₂+...+uₙ</span>.</li>
      </ol>
      <p>احسب <span class="math">Sₙ</span> بدلالة <span class="math">n</span> و <span class="math">α</span>، ثم احسب <span class="math">lim Sₙ</span>.</p>
    </div>`,
    solution: `<p><strong>1)</strong> إذا كان <span class="math">α = -4</span>، فإن <span class="math">u<sub>0</sub> = -4</span>.</p>
      <p>نفترض أن <span class="math">u<sub>n</sub> = -4</span>. فإن:</p>
      <p class="math-equation">u<sub>n+1</sub> = (3/4)(-4) - 1 = -4</p>
      <p>إذن الخاصية تثبت بالتراجع.</p>
      <p><strong>2)</strong> نضع <span class="math">v<sub>n</sub> = u<sub>n</sub> + 4</span>. فإن:</p>
      <p class="math-equation">v<sub>n+1</sub> = u<sub>n+1</sub> + 4 = (3/4)u<sub>n</sub> + 3 = (3/4)(u<sub>n</sub> + 4) = (3/4)v<sub>n</sub></p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">3/4</span> وحدها الأول <span class="math">v<sub>0</sub> = α + 4</span>. وبالتالي:</p>
      <p class="math-equation">v<sub>n</sub> = (α + 4)(3/4)<sup>n</sup></p>
      <p>ومنه:</p>
      <p class="math-equation">u<sub>n</sub> = (α + 4)(3/4)<sup>n</sup> - 4</p>
      <p>وبما أن <span class="math">(3/4)<sup>n</sup></span> يؤول إلى 0، فإن:</p>
      <p class="math-equation">lim u<sub>n</sub> = -4</p>
      <p>إذن <span class="math">(u<sub>n</sub>)</span> متقاربة.</p>
      <p><strong>3)</strong> لدينا:</p>
      <p class="math-equation">S<sub>n</sub> = Σ<sub>k=0</sub><sup>n</sup> [(α + 4)(3/4)<sup>k</sup> - 4]</p>
      <p>أي:</p>
      <p class="math-equation">S<sub>n</sub> = 4(α + 4)[1 - (3/4)<sup>n+1</sup>] - 4(n + 1)</p>
      <p>وبما أن <span class="math">-4(n + 1)</span> يؤول إلى <span class="math">-∞</span>، فإن:</p>
      <p class="math-equation">lim S<sub>n</sub> = -∞</p>`
  },  {
    id: "bac-2020-exp-subject-2",
    branch: "science",
    stream: "experimental",
    year: "2020",
    title: "بكالوريا 2020 - الموضوع الثاني - علوم تجريبية",
    statementHtml: `<div class="bac-statement">
      <p>المتتالية العددية <span class="math">(uₙ)</span> معرفة كما يلي:</p>
      <p class="math">u₀=0 ، uₙ₊₁=3uₙ-2n+3</p>
      <ol>
        <li>احسب كلا من <span class="math">u₁</span> و <span class="math">u₂</span>، ثم خمن اتجاه تغير المتتالية <span class="math">(uₙ)</span>.</li>
      </ol>
      <p><strong>2.</strong> لتكن المتتالية العددية <span class="math">(vₙ)</span> المعرفة على <span class="math">N</span> بـ:</p>
      <p class="math">vₙ=uₙ-n+1</p>
      <ol>
        <li>بين أن <span class="math">(vₙ)</span> متتالية هندسية أساسها <span class="math">3</span>، ثم احسب حدها الأول.</li>
        <li>اكتب <span class="math">vₙ</span> بدلالة <span class="math">n</span>، ثم استنتج عبارة الحد العام <span class="math">uₙ</span> بدلالة <span class="math">n</span>.</li>
        <li>ادرس اتجاه تغير المتتالية <span class="math">(uₙ)</span>.</li>
      </ol>
      <p><strong>3.</strong> من أجل كل عدد طبيعي <span class="math">n</span> نضع:</p>
      <p class="math">Sₙ=u₀+u₁+...+uₙ</p>
      <ol>
        <li>بين أنه من أجل كل عدد طبيعي <span class="math">n</span>:</li>
      </ol>
      <p class="math">Sₙ=1/2(3ⁿ⁺¹+n²-n-3)</p>
      <ol start="2">
        <li>احسب <span class="math">lim Sₙ</span>.</li>
      </ol>
    </div>`,
    solution: "نحسب u₁=3 و u₂=10، فنخمن أن (uₙ) متزايدة. نضع vₙ=uₙ-n+1، فنجد vₙ₊₁=uₙ₊₁-(n+1)+1=3uₙ-2n+3-n=3uₙ-3n+3=3(uₙ-n+1)=3vₙ. إذن (vₙ) هندسية أساسها 3 وحدها الأول v₀=1. لذلك vₙ=3ⁿ، ومنه uₙ=3ⁿ+n-1. إذن uₙ₊₁-uₙ=3ⁿ⁺¹+n-3ⁿ-n+1=2·3ⁿ+1>0، فالمتتالية متزايدة تماما. كما أن Sₙ=Σ(3ᵏ+k-1)=((3ⁿ⁺¹-1)/2)+n(n+1)/2-(n+1)=1/2(3ⁿ⁺¹+n²-n-3). ومنه lim Sₙ=+∞."
  },  {
    id: "bac-2019-exp-subject-1",
    branch: "science",
    stream: "experimental",
    year: "2019",
    title: "بكالوريا 2019 - الموضوع الأول - علوم تجريبية",
    statementHtml: `<div class="bac-statement">
      <p>المتتالية العددية <span class="math">(uₙ)</span> المعرفة بـ:</p>
      <p class="math">u₀=13 ، uₙ₊₁=(1/5)uₙ+4/5</p>
      <ol>
        <li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">uₙ&gt;1</span>.</li>
        <li>ادرس اتجاه تغير المتتالية <span class="math">(uₙ)</span>، واستنتج أنها متقاربة.</li>
      </ol>
      <p><strong>2.</strong> المتتالية العددية <span class="math">(vₙ)</span> المعرفة على <span class="math">N</span> بـ:</p>
      <p class="math">vₙ=ln(uₙ-1)</p>
      <p>أثبت أن المتتالية <span class="math">(vₙ)</span> حسابية، ثم عين أساسها وحدها الأول.</p>
      <p><strong>3.</strong> اكتب <span class="math">vₙ</span> بدلالة <span class="math">n</span>، ثم بين أنه من أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math">uₙ=1+12/5ⁿ</p>
      <p>واحسب عندئذ <span class="math">lim uₙ</span>.</p>
      <p><strong>4.</strong> بين أنه من أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math">(u₀-1)(u₁-1)×...×(uₙ-1)=12ⁿ⁺¹ / 5^(n(n+1)/2)</p>
    </div>`,
    solution: "إذا uₙ>1 فإن uₙ₊₁-1=(1/5)uₙ+4/5-1=(uₙ-1)/5>0، ومع u₀=13>1 تثبت الخاصية بالتراجع. كما أن uₙ₊₁-uₙ=(4/5)(1-uₙ)<0، إذن (uₙ) متناقصة ومحدودة من الأسفل بـ1، فهي متقاربة. لدينا vₙ₊₁=ln(uₙ₊₁-1)=ln((uₙ-1)/5)=ln(uₙ-1)-ln5=vₙ-ln5، إذن (vₙ) حسابية أساسها -ln5 وحدها الأول v₀=ln12. ومنه vₙ=ln12-nln5=ln(12/5ⁿ)، وبالتالي uₙ-1=12/5ⁿ أي uₙ=1+12/5ⁿ، ومنه lim uₙ=1. وأخيرا جداء الحدود هو ∏ₖ₌₀ⁿ(12/5ᵏ)=12ⁿ⁺¹/5^{0+1+...+n}=12ⁿ⁺¹/5^{n(n+1)/2}."
  },  {
    id: "bac-2019-exp-subject-2",
    branch: "science",
    stream: "experimental",
    year: "2019",
    title: "بكالوريا 2019 - الموضوع الثاني - علوم تجريبية",
    statementHtml: `<div class="bac-statement">
      <p>لتكن الدالة <span class="math">f</span> المعرفة على المجال <span class="math">[4، 7[</span> بـ:</p>
      <p class="math">f(x)=√(x+2)+4</p>
      <ol>
        <li>بين أن الدالة <span class="math">f</span> متزايدة تماما على المجال <span class="math">[4، 7[</span>.</li>
        <li>استنتج أنه من أجل كل عدد حقيقي <span class="math">x</span> من المجال <span class="math">[4، 7[</span> فإن <span class="math">f(x)∈[4، 7[</span>.</li>
      </ol>
      <p><strong>2.</strong> برهن أنه من أجل كل عدد حقيقي <span class="math">x</span> من المجال <span class="math">[4، 7[</span>:</p>
      <p class="math">f(x)-x=(-x²+9x-14)/(x-4+√(x+2))</p>
      <p>ثم استنتج أنه من أجل كل عدد حقيقي <span class="math">x</span> من المجال <span class="math">[4، 7[</span> فإن <span class="math">f(x)-x&gt;0</span>.</p>
      <p><strong>3.</strong> المتتالية العددية <span class="math">(uₙ)</span> المعرفة بـ:</p>
      <p class="math">u₀=4 ، uₙ₊₁=f(uₙ)</p>
      <ol>
        <li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">4≤uₙ&lt;7</span>.</li>
        <li>استنتج اتجاه تغير المتتالية <span class="math">(uₙ)</span>، ثم بين أنها متقاربة.</li>
      </ol>
      <p><strong>4.</strong></p>
      <ol>
        <li>بين أنه من أجل كل عدد طبيعي <span class="math">n</span>:</li>
      </ol>
      <p class="math">7-uₙ₊₁ &lt; (1/4)(7-uₙ)</p>
      <ol start="2">
        <li>استنتج أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">0&lt;7-uₙ&lt;3(1/4)ⁿ</span>، ثم احسب نهاية المتتالية <span class="math">(uₙ)</span>.</li>
      </ol>
    </div>`,
    solution: "الدالة f متزايدة لأن x↦x+2 متزايدة والجذر متزايد، أو f'(x)=1/(2√(x+2))>0. وبما أن f(4)=√6+4>4 و lim عند 7 يسارًا هو 7، فإن f(x)∈[4،7[. كما أن f(x)-x=√(x+2)+4-x، وبالضرب في المرافق نحصل على الصيغة المعطاة، وبما أن -x²+9x-14=-(x-7)(x-2)>0 على [4،7[ والمقام موجب، فإن f(x)-x>0. بالتراجع: u₀=4، وإذا 4≤uₙ<7 فإن uₙ₊₁=f(uₙ)∈[4،7[. ثم uₙ₊₁-uₙ=f(uₙ)-uₙ>0، إذن (uₙ) متزايدة ومحدودة من الأعلى بـ7، فهي متقاربة. ولأن 7-uₙ₊₁=7-4-√(uₙ+2)=3-√(uₙ+2)=(7-uₙ)/(3+√(uₙ+2))< (7-uₙ)/4، نحصل بالتراجع على 0<7-uₙ<3(1/4)ⁿ، ومنه lim(7-uₙ)=0 وبالتالي lim uₙ=7."
  },  {
    id: "bac-2018-exp-subject-1",
    branch: "science",
    stream: "experimental",
    year: "2018",
    title: "بكالوريا 2018 - الموضوع الأول - علوم تجريبية",
    statementHtml: `<div class="bac-statement">
      <p>المتتالية العددية <span class="math">(uₙ)</span> معرفة بحدها الأول <span class="math">u₀</span> حيث <span class="math">u₀=1</span>، ومن أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math">uₙ₊₁=1-9/(uₙ+5)</p>
      <ol>
        <li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">uₙ&gt;-2</span>.</li>
        <li>بين أن <span class="math">(uₙ)</span> متناقصة تماما على <span class="math">N</span>، واستنتج أنها متقاربة.</li>
      </ol>
      <p><strong>2.</strong> نضع من أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math">vₙ=1/(uₙ+2)</p>
      <p>أثبت أن المتتالية <span class="math">(vₙ)</span> حسابية أساسها <span class="math">1/3</span>، ثم عين حدها الأول.</p>
      <p><strong>3.</strong> عبر بدلالة <span class="math">n</span> عن <span class="math">vₙ</span> و <span class="math">uₙ</span>، واحسب <span class="math">lim uₙ</span>.</p>
      <p><strong>4.</strong> بين أنه من أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math">u₀v₀+u₁v₁+...+uₙvₙ = (1/3)(1-n²)</p>
    </div>`,
    solution: "إذا uₙ>-2 فإن uₙ+5>3، ومنه 0<9/(uₙ+5)<3، وبالتالي uₙ₊₁=1-9/(uₙ+5)>-2، ومع u₀=1 تثبت الخاصية بالتراجع. كما أن uₙ₊₁-uₙ=1-uₙ-9/(uₙ+5)=-(uₙ+2)²/(uₙ+5)<0، إذن (uₙ) متناقصة تماما ومحدودة من الأسفل بـ-2، فهي متقاربة. لدينا uₙ₊₁+2=3-9/(uₙ+5)=3(uₙ+2)/(uₙ+5)، ومنه vₙ₊₁=(uₙ+5)/(3(uₙ+2))=1/3+vₙ، إذن (vₙ) حسابية أساسها 1/3 وحدها الأول v₀=1/3. لذلك vₙ=(n+1)/3، ومنه uₙ=1/vₙ-2=3/(n+1)-2، وبالتالي lim uₙ=-2. وأخيرا uₖvₖ=(uₖ)/(uₖ+2)=1-2vₖ=1-2(k+1)/3=(1-2k)/3، وبالجمع من 0 إلى n نحصل على (1/3)(1-n²)."
  },  {
    id: "bac-2018-exp-subject-2",
    branch: "science",
    stream: "experimental",
    year: "2018",
    title: "بكالوريا 2018 - الموضوع الثاني - علوم تجريبية",
    statementHtml: `<div class="bac-statement">
      <p>متتالية عددية <span class="math">(uₙ)</span> معرفة كما يلي:</p>
      <p class="math">u₀=0 ، uₙ₊₁=uₙ+ln((2n+3)/(2n+1))</p>
      <ol>
        <li>احسب كلا من <span class="math">u₁</span> و <span class="math">u₂</span> و <span class="math">u₃</span>.</li>
        <li>بين أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">(2n+3)/(2n+1)&gt;1</span>، ثم استنتج اتجاه تغير المتتالية <span class="math">(uₙ)</span>.</li>
      </ol>
      <p><strong>3.</strong> متتالية عددية <span class="math">(vₙ)</span> معرفة من أجل كل عدد طبيعي <span class="math">n</span> بـ:</p>
      <p class="math">vₙ=2n+1</p>
      <ol>
        <li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">eᵘⁿ=vₙ</span>.</li>
        <li>استنتج عبارة الحد العام للمتتالية <span class="math">(uₙ)</span> بدلالة <span class="math">n</span>، ثم احسب <span class="math">lim uₙ</span>.</li>
      </ol>
      <p><strong>4.</strong> احسب المجموعين <span class="math">Sₙ</span> و <span class="math">T</span> حيث:</p>
      <p class="math">Sₙ=ln(v₁/v₀)+ln(v₂/v₁)+...+ln(vₙ/vₙ₋₁)</p>
      <p class="math">T=e¹⁴³⁹+e¹⁴⁴⁰+...+e²⁰¹⁸</p>
    </div>`,
    solution: "نحسب u₁=ln3، و u₂=ln3+ln(5/3)=ln5، و u₃=ln5+ln(7/5)=ln7. بما أن 2n+3>2n+1 فإن النسبة أكبر من 1، ومنه ln((2n+3)/(2n+1))>0، إذن (uₙ) متزايدة تماما. نبرهن بالتراجع أن eᵘⁿ=2n+1: عند n=0 لدينا e⁰=1=v₀، وإذا eᵘⁿ=2n+1 فإن eᵘⁿ⁺¹=eᵘⁿ·(2n+3)/(2n+1)=2n+3=vₙ₊₁. إذن uₙ=ln(2n+1)، ومنه lim uₙ=+∞. أما Sₙ فهو مجموع متتالي متداخل: Sₙ=ln(vₙ/v₀)=ln(2n+1). وبما أن eᵏ متتالية هندسية، فإن T=e¹⁴³⁹(1+e+...+e⁵⁷⁹)=e¹⁴³⁹(e⁵⁸⁰-1)/(e-1)."
  },  {
    id: "bac-2017-exp-subject-1",
    branch: "science",
    stream: "experimental",
    year: "2017",
    title: "بكالوريا 2017 - الدورة الاستثنائية - الموضوع الأول - علوم تجريبية",
    statementHtml: `<div class="bac-statement">
      <p>نعتبر المتتاليتين <span class="math">(uₙ)</span> و <span class="math">(vₙ)</span> المعرفتين على مجموعة الأعداد الطبيعية <span class="math">N</span> كما يلي:</p>
      <p class="math">u₀=1 ، uₙ₊₁=(3/4)uₙ+1</p>
      <p class="math">v₀=6 ، vₙ₊₁=(3/4)vₙ+1</p>
      <ol>
        <li>احسب الحدين <span class="math">u₁</span> و <span class="math">v₁</span>.</li>
        <li>اكتب <span class="math">uₙ₊₂-uₙ₊₁</span> بدلالة <span class="math">uₙ₊₁-uₙ</span>.</li>
        <li>باستعمال البرهان بالتراجع، برهن أن المتتالية <span class="math">(uₙ)</span> متزايدة تماما، والمتتالية <span class="math">(vₙ)</span> متناقصة تماما.</li>
      </ol>
      <p><strong>3.</strong> نعتبر المتتالية <span class="math">(wₙ)</span> المعرفة على <span class="math">N</span> كما يلي:</p>
      <p class="math">wₙ=uₙ-vₙ</p>
      <p>برهن أن المتتالية <span class="math">(wₙ)</span> هندسية، ثم عين أساسها <span class="math">q</span> وحدها الأول <span class="math">w₀</span>، وعبر عن <span class="math">wₙ</span> بدلالة <span class="math">n</span>.</p>
      <p><strong>4.</strong> بين أن المتتاليتين <span class="math">(uₙ)</span> و <span class="math">(vₙ)</span> متجاورتان.</p>
    </div>`,
    solution: "نحسب u₁=(3/4)·1+1=7/4، و v₁=(3/4)·6+1=11/2. كما أن uₙ₊₂-uₙ₊₁=[(3/4)uₙ₊₁+1]-[(3/4)uₙ+1]=(3/4)(uₙ₊₁-uₙ). بما أن u₁-u₀=3/4>0، فإن كل الفروق التالية موجبة، إذن (uₙ) متزايدة تماما. وبما أن v₁-v₀=-1/2<0، فإن كل الفروق التالية سالبة، إذن (vₙ) متناقصة تماما. نضع wₙ=uₙ-vₙ، فنجد wₙ₊₁=(3/4)(uₙ-vₙ)=(3/4)wₙ، إذن (wₙ) هندسية أساسها q=3/4 وحدها الأول w₀=1-6=-5، ومنه wₙ=-5(3/4)ⁿ. بما أن wₙ<0 فإن uₙ<vₙ، وبما أن wₙ يؤول إلى 0 فإن vₙ-uₙ يؤول إلى 0، ومع تزايد (uₙ) وتناقص (vₙ) نستنتج أن المتتاليتين متجاورتان."
  },  {
    id: "bac-2017-exp-subject-2",
    branch: "science",
    stream: "experimental",
    year: "2017",
    title: "بكالوريا 2017 - الدورة الاستثنائية - الموضوع الثاني - علوم تجريبية",
    figureHtml: `<figure class="bac-figure" aria-label="تمثيل بياني للمنحنى Cf والمستقيم Delta">
      <svg class="bac-graph" viewBox="0 0 420 300" role="img">
        <rect x="0" y="0" width="420" height="300" rx="10" class="graph-bg"></rect>
        <g class="grid-lines"><path d="M80 30V250 M140 30V250 M200 30V250 M260 30V250 M320 30V250 M380 30V250 M40 70H390 M40 120H390 M40 170H390 M40 220H390"></path></g>
        <g class="axes"><path d="M40 250H395"></path><path d="M80 265V25"></path></g>
        <g class="axis-labels"><text x="74" y="269">0</text><text x="134" y="269">1</text><text x="194" y="269">2</text><text x="254" y="269">3</text><text x="314" y="269">4</text><text x="374" y="269">5</text><text x="57" y="224">1</text><text x="57" y="174">2</text><text x="57" y="124">3</text></g>
        <path class="line-delta" d="M80 250L320 50"></path>
        <path class="curve-f" d="M80 220 C110 190 135 166 160 150 C205 122 270 106 380 96"></path>
        <text x="255" y="78" class="graph-label">(Δ)</text>
        <text x="315" y="103" class="graph-label">(Cf)</text>
      </svg>
    </figure>`,
    statementHtml: `<div class="bac-statement">
      <p>في معلم متعامد ومتجانس، والمستقيم <span class="math">(Δ)</span> معادلته <span class="math">y=x</span>. لتكن الدالة <span class="math">f</span> ممثلة بالمنحنى <span class="math">(Cf)</span>.</p>
      <p>ليكن <span class="math">α</span> عددا حقيقيا موجبا. المتتالية العددية <span class="math">(uₙ)</span> معرفة على <span class="math">N</span> بحدها الأول <span class="math">u₀=α</span>، ومن أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math">uₙ₊₁=f(uₙ)</p>
      <p><strong>I.</strong> عين قيمة <span class="math">α</span> حتى تكون <span class="math">(uₙ)</span> متتالية ثابتة.</p>
      <p><strong>II.</strong> نضع في كل ما يلي <span class="math">α=5</span>.</p>
      <ol>
        <li>انقل الشكل المقابل، ثم مثل على حامل محور الفواصل الحدود <span class="math">u₀، u₁، u₂، u₃</span> دون حسابها، مبرزا خطوط التمثيل.</li>
        <li>ضع تخمينا حول اتجاه تغير المتتالية <span class="math">(uₙ)</span> وتقاربها.</li>
      </ol>
      <p><strong>2.</strong> نعتبر المتتالية <span class="math">(vₙ)</span> المعرفة على <span class="math">N</span> بـ:</p>
      <p class="math">vₙ=(uₙ-1)/(uₙ+1)</p>
      <ol>
        <li>برهن أن <span class="math">(vₙ)</span> هندسية أساسها <span class="math">1/2</span>، ثم عين حدها الأول.</li>
        <li>عبر عن <span class="math">vₙ</span> و <span class="math">uₙ</span> بدلالة <span class="math">n</span>، ثم احسب <span class="math">lim uₙ</span>.</li>
      </ol>
      <p><strong>3.</strong> احسب بدلالة <span class="math">n</span> المجموع:</p>
      <p class="math">Sₙ=vₙ+vₙ₊₁+...+vₙ₊₂₀₁₆</p>
      <p>ثم استنتج بدلالة <span class="math">n</span> المجموع:</p>
      <p class="math">S'ₙ=1/(uₙ+1)+1/(uₙ₊₁+1)+...+1/(uₙ₊₂₀₁₆+1)</p>
    </div>`,
    solution: "القيمة التي تجعل المتتالية ثابتة هي حل f(α)=α، ومن الرسم نقطة تقاطع (Cf) مع y=x هي α=1. عند α=5 توحي القراءة البيانية أن (uₙ) متناقصة وتتقارب نحو 1. بما أن vₙ=(uₙ-1)/(uₙ+1)، والتمرين يقود إلى vₙ₊₁=(1/2)vₙ، فإن (vₙ) هندسية أساسها 1/2. لدينا v₀=(5-1)/(5+1)=2/3، ومنه vₙ=(2/3)(1/2)ⁿ. ومن العلاقة vₙ=(uₙ-1)/(uₙ+1) نستنتج uₙ=(1+vₙ)/(1-vₙ)، وبالتالي lim uₙ=1. كما أن Sₙ=vₙ(1-(1/2)²⁰¹⁷)/(1-1/2)=2vₙ(1-(1/2)²⁰¹⁷). وبما أن 1/(uₖ+1)=(1-vₖ)/2، فإن S'ₙ=2017/2 - Sₙ/2."
  },  {
    id: "bac-2017-exp-regular-subject-1",
    branch: "science",
    stream: "experimental",
    year: "2017",
    title: "بكالوريا 2017 - الموضوع الأول - علوم تجريبية",
    statementHtml: `<div class="bac-statement">
      <p>متتاليتان <span class="math">(uₙ)</span> و <span class="math">(vₙ)</span> معرفتان على مجموعة الأعداد الطبيعية <span class="math">N</span> كما يلي:</p>
      <p class="math">u₀=1/4 ، uₙ₊₁=3-10/(uₙ+4)</p>
      <p class="math">vₙ=(uₙ+2)/(1-uₙ)</p>
      <ol>
        <li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">0&lt;uₙ&lt;1</span>.</li>
        <li>بين أن المتتالية <span class="math">(uₙ)</span> متزايدة تماما، ثم استنتج أنها متقاربة.</li>
      </ol>
      <p><strong>2.</strong></p>
      <ol>
        <li>بين أن المتتالية <span class="math">(vₙ)</span> هندسية أساسها <span class="math">5/2</span>، ثم عبر عن حدها العام <span class="math">vₙ</span> بدلالة <span class="math">n</span>.</li>
        <li>أثبت أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">uₙ=1-3/(vₙ+1)</span>، ثم استنتج <span class="math">lim uₙ</span>.</li>
      </ol>
    </div>`,
    solution: "نكتب uₙ₊₁=(3uₙ+2)/(uₙ+4). إذا 0<uₙ<1 فإن uₙ₊₁>0، كما أن uₙ₊₁<1 لأن 3uₙ+2<uₙ+4 يكافئ uₙ<1، فتثبت الخاصية بالتراجع. ولدراسة التغير: uₙ₊₁-uₙ=(3uₙ+2)/(uₙ+4)-uₙ=-(uₙ-1)(uₙ+2)/(uₙ+4)>0 لأن 0<uₙ<1، إذن (uₙ) متزايدة ومحدودة من الأعلى بـ1، فهي متقاربة. نحسب vₙ₊₁=(uₙ₊₁+2)/(1-uₙ₊₁)، وبالتعويض بـ uₙ₊₁=(3uₙ+2)/(uₙ+4) نجد vₙ₊₁=(5/2)vₙ. كما أن v₀=(1/4+2)/(1-1/4)=3، إذن vₙ=3(5/2)ⁿ. ومن vₙ=(uₙ+2)/(1-uₙ) نستنتج uₙ=(vₙ-2)/(vₙ+1)=1-3/(vₙ+1). وبما أن vₙ يؤول إلى +∞ فإن lim uₙ=1."
  },  {
    id: "bac-2016-exp-subject-1",
    branch: "science",
    stream: "experimental",
    year: "2016",
    title: "بكالوريا 2016 - الدورة الاستثنائية - الموضوع الأول - علوم تجريبية",
    statementHtml: `<div class="bac-statement">
      <p>نعتبر الدالة العددية <span class="math">f</span> المعرفة على المجال <span class="math">I=[0،4]</span> كما يلي:</p>
      <p class="math">f(x)=13x/(9x+13)</p>
      <ol>
        <li>بين أن الدالة <span class="math">f</span> متزايدة تماما على المجال <span class="math">I</span>.</li>
        <li>بين أنه من أجل كل عدد حقيقي <span class="math">x</span> من المجال <span class="math">I</span>، فإن <span class="math">f(x)</span> ينتمي إلى <span class="math">I</span>.</li>
      </ol>
      <p><strong>2.</strong> لتكن المتتالية العددية <span class="math">(uₙ)</span> المعرفة على <span class="math">N</span> بحدها الأول <span class="math">u₀=4</span> و <span class="math">uₙ₊₁=f(uₙ)</span>، من أجل كل عدد طبيعي <span class="math">n</span>.</p>
      <ol>
        <li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">0≤uₙ≤4</span>.</li>
        <li>ادرس اتجاه تغير المتتالية <span class="math">(uₙ)</span>، ثم استنتج أنها متقاربة.</li>
      </ol>
      <p><strong>3.</strong> بين أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">uₙ≠0</span>.</p>
      <p><strong>4.</strong> لتكن المتتالية العددية <span class="math">(vₙ)</span> المعرفة على <span class="math">N</span> كما يلي:</p>
      <p class="math">vₙ=2+13/uₙ</p>
      <ol>
        <li>برهن أن المتتالية <span class="math">(vₙ)</span> حسابية، ثم عين أساسها وحدها الأول <span class="math">v₀</span>.</li>
        <li>اكتب <span class="math">vₙ</span> بدلالة <span class="math">n</span>.</li>
        <li>استنتج أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">uₙ=52/(36n+13)</span>، ثم احسب <span class="math">lim uₙ</span>.</li>
      </ol>
    </div>`,
    solution: "لدينا f'(x)=169/(9x+13)²>0، إذن f متزايدة تماما على I. كما أن f(0)=0 و f(4)=52/49، وبما أن f متزايدة فإن f(I)=[0،52/49]⊂[0،4]. بالتراجع: u₀∈I، وإذا uₙ∈I فإن uₙ₊₁=f(uₙ)∈I، ومنه 0≤uₙ≤4. كما أن f(x)-x=13x/(9x+13)-x=-9x(x+4/9)/(9x+13)≤0، وبالتالي (uₙ) متناقصة ومحدودة من الأسفل بـ0، فهي متقاربة. وبما أن u₀>0 و f(x)>0 لكل x>0، فإن uₙ≠0. نحسب vₙ₊₁=2+13/uₙ₊₁=2+13(9uₙ+13)/(13uₙ)=11+13/uₙ=vₙ+9، إذن (vₙ) حسابية أساسها 9 وحدها الأول v₀=2+13/4=21/4. ومنه vₙ=21/4+9n=(36n+21)/4. بما أن vₙ=2+13/uₙ، فإن 13/uₙ=vₙ-2=(36n+13)/4، وبالتالي uₙ=52/(36n+13)، ومنه lim uₙ=0."
  },  {
    id: "bac-2016-exp-subject-2",
    branch: "science",
    stream: "experimental",
    year: "2016",
    title: "بكالوريا 2016 - الدورة الاستثنائية - الموضوع الثاني - علوم تجريبية",
    statementHtml: `<div class="bac-statement">
      <p>المتتالية العددية <span class="math">(uₙ)</span> معرفة على <span class="math">N</span> بحدها الأول <span class="math">u₀=0</span>، ومن أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math">uₙ₊₁=(2uₙ+2)/(uₙ+3)</p>
      <p>ولتكن المتتالية <span class="math">(vₙ)</span> المعرفة من أجل كل عدد طبيعي <span class="math">n</span> بـ:</p>
      <p class="math">vₙ=(uₙ-1)/(uₙ+2)</p>
      <ol>
        <li>بين أن المتتالية <span class="math">(vₙ)</span> هندسية، ثم عين أساسها <span class="math">q</span> وحدها الأول <span class="math">v₀</span>.</li>
        <li>عبر بدلالة <span class="math">n</span> عن عبارة الحد العام <span class="math">vₙ</span>.</li>
        <li>استنتج عبارة الحد العام <span class="math">uₙ</span> بدلالة <span class="math">n</span>.</li>
        <li>احسب <span class="math">lim uₙ</span>.</li>
      </ol>
      <p><strong>3.</strong></p>
      <ol>
        <li>احسب بدلالة <span class="math">n</span> المجموع: <span class="math">Sₙ=v₀+v₁+...+vₙ</span>.</li>
        <li>تحقق أنه من أجل كل عدد طبيعي <span class="math">n</span>:</li>
      </ol>
      <p class="math">1/(uₙ+2)=1/3(1-vₙ)</p>
      <ol start="3">
        <li>استنتج بدلالة <span class="math">n</span> المجموع:</li>
      </ol>
      <p class="math">S'ₙ=1/(u₀+2)+1/(u₁+2)+...+1/(uₙ+2)</p>
    </div>`,
    solution: "نحسب vₙ₊₁=(uₙ₊₁-1)/(uₙ₊₁+2). بالتعويض uₙ₊₁=(2uₙ+2)/(uₙ+3) نجد vₙ₊₁=((uₙ-1)/(uₙ+3))/(4(uₙ+2)/(uₙ+3))=(1/4)(uₙ-1)/(uₙ+2)=(1/4)vₙ. إذن (vₙ) هندسية أساسها q=1/4، وحدها الأول v₀=(0-1)/(0+2)=-1/2. لذلك vₙ=-(1/2)(1/4)ⁿ. ومن vₙ=(uₙ-1)/(uₙ+2) نحصل على uₙ=(1+2vₙ)/(1-vₙ)، ومنه lim uₙ=1. كما أن Sₙ=v₀(1-qⁿ⁺¹)/(1-q)=(-1/2)(1-(1/4)ⁿ⁺¹)/(3/4)=-2/3(1-(1/4)ⁿ⁺¹). وبما أن 1/(uₙ+2)=1/3(1-vₙ)، فإن S'ₙ=1/3[(n+1)-Sₙ]=1/3[n+1+2/3(1-(1/4)ⁿ⁺¹)]."
  },
  {
    id: "bac-model-math",
    branch: "science",
    stream: "mathematics",
    year: "نموذج",
    title: "تمرين بكالوريا نموذجي - رياضيات",
    statement: "لتكن المتتالية u معرفة بـ u₀=1 و uₙ₊₁=2uₙ+3. نضع vₙ=uₙ+3. بين أن v هندسية ثم استنتج عبارة uₙ بدلالة n.",
    solution: "vₙ₊₁=uₙ₊₁+3=2uₙ+6=2(uₙ+3)=2vₙ، إذن v هندسية أساسها 2 و v₀=4. ومنه vₙ=4×2ⁿ، وبالتالي uₙ=4×2ⁿ-3."
  },
  {
    id: "bac-model-technical-math",
    branch: "science",
    stream: "technical_math",
    year: "نموذج",
    title: "تمرين بكالوريا نموذجي - تقني رياضي",
    statement: "لتكن المتتالية u معرفة بـ u₀=1 و uₙ₊₁=2uₙ+3. نضع vₙ=uₙ+3. بين أن v هندسية ثم استنتج عبارة uₙ بدلالة n.",
    solution: "vₙ₊₁=uₙ₊₁+3=2uₙ+6=2(uₙ+3)=2vₙ، إذن v هندسية أساسها 2 و v₀=4. ومنه vₙ=4×2ⁿ، وبالتالي uₙ=4×2ⁿ-3."
  },
  {
    id: "bac-model-experimental",
    branch: "science",
    stream: "experimental",
    year: "نموذج",
    title: "تمرين بكالوريا نموذجي - علوم تجريبية",
    statementHtml: `<div class="bac-statement">
      <p>لتكن المتتالية <span class="math">(u<sub>n</sub>)</span> المعرفة بـ <span class="math">u<sub>0</sub> = 1</span> و <span class="math">u<sub>n+1</sub> = 2u<sub>n</sub> + 3</span>.</p>
      <p>نضع <span class="math">v<sub>n</sub> = u<sub>n</sub> + 3</span>.</p>
      <p>بيّن أن <span class="math">(v<sub>n</sub>)</span> هندسية، ثم استنتج عبارة <span class="math">u<sub>n</sub></span> بدلالة <span class="math">n</span>.</p>
    </div>`,
    solution: `<p>نضع <span class="math">v<sub>n</sub> = u<sub>n</sub> + 3</span>. فإن:</p>
      <p class="math-equation">v<sub>n+1</sub> = u<sub>n+1</sub> + 3 = 2u<sub>n</sub> + 6 = 2(u<sub>n</sub> + 3) = 2v<sub>n</sub></p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> متتالية هندسية أساسها <span class="math">2</span> وحدها الأول <span class="math">v<sub>0</sub> = u<sub>0</sub> + 3 = 4</span>. وبالتالي:</p>
      <p class="math-equation">v<sub>n</sub> = 4 × 2<sup>n</sup></p>
      <p>ومنه:</p>
      <p class="math-equation">u<sub>n</sub> = v<sub>n</sub> - 3 = 4 × 2<sup>n</sup> - 3</p>`
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
const validBranches = ["science", "literary", "management"];
function normalizeBranch() { if (!validBranches.includes(state.branch)) state.branch = "science"; }
function activeModules() { normalizeBranch(); return modules.filter((m) => m.branches.includes(state.branch)).sort((a,b) => a.order - b.order); }
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
  const statement = ex.statementHtml || `<p>${ex.text || ex.statement}</p>`;
  const figure = ex.figureHtml || "";
  return `<section class="exercise-card"><h3>${ex.title}</h3>${figure}${statement}<button type="button" class="ghost-action" data-toggle-solution="${id}">${state.openSolutions[id] ? "إخفاء الحل" : "إظهار الحل"}</button><div class="solution ${state.openSolutions[id] ? "show" : ""}">${ex.solution}</div></section>`;
}

function renderPractice() {
  const list = document.getElementById("practiceList");
  if (!list) return;
  const items = activeModules().flatMap((m) => m.exercises.map((ex, i) => ({...ex, title: `${m.title} - ${ex.title}`, id: `practice-${m.id}-${i}`})));
  list.innerHTML = items.map((ex) => `<section class="exercise-card"><h3>${ex.title}</h3><p>${ex.text}</p></section>`).join("");
}

function renderBac() {
  const branchSelect = document.getElementById("bacBranchFilter");
  const select = document.getElementById("bacYearFilter");
  const list = document.getElementById("bacList");
  if (!select || !list) return;
  if (branchSelect) {
    if (state.branch === "science") {
      branchSelect.disabled = false;
      branchSelect.innerHTML = scientificStreams.map((stream) => `<option value="${stream}">${scientificStreamLabels[stream]}</option>`).join("");
      branchSelect.value = state.bacStream;
    } else {
      branchSelect.disabled = true;
      branchSelect.innerHTML = `<option value="${state.branch}">${branchLabels[state.branch]}</option>`;
      branchSelect.value = state.branch;
    }
  }
  const branchItems = bacExercises.filter((e) => {
    if (state.branch === "science") return e.branch === "science" && e.stream === state.bacStream;
    return e.branch === state.branch;
  });
  const years = ["الكل", ...new Set(branchItems.map((e) => e.year))];
  const chosenBeforeRender = select.value || "الكل";
  select.innerHTML = years.map((y) => `<option value="${y}">${y}</option>`).join("");
  select.value = years.includes(chosenBeforeRender) ? chosenBeforeRender : "الكل";
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

document.getElementById("bacBranchFilter")?.addEventListener("change", (event) => { state.bacStream = event.target.value; renderBac(); });
document.getElementById("bacYearFilter")?.addEventListener("change", renderBac);

renderAll();
