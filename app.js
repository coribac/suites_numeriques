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
    year: "2008",
    title: "بكالوريا 2008 - علوم تجريبية - الموضوع الثاني",
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
    solution: "f'(x)=5/(2x+1)²>0 إذن f متزايدة على [0,+∞[. u₁=15/7 و u₂=75/37. بالتراجع: إذا 2<uₙ≤3 فإن f(2)=2 و f(3)=15/7≤3، وبما أن f متزايدة نحصل على 2<uₙ₊₁≤15/7≤3. كما أن uₙ₊₁-uₙ=5uₙ/(2uₙ+1)-uₙ=2uₙ(2-uₙ)/(2uₙ+1)<0، إذن (uₙ) متناقصة ومحدودة من الأسفل بـ2. لدينا v₀=1/3، وبالحساب vₙ₊₁=(3/5)vₙ، ومنه vₙ=(1/3)(3/5)ⁿ. بما أن 1-2/uₙ=vₙ/3ⁿ=1/(3·5ⁿ)، فإن 2/uₙ=1-1/(3·5ⁿ)، وبالتالي uₙ=6·5ⁿ/(3·5ⁿ-1)، ومنه lim uₙ=2. كما أن 6/uₙ=3-1/5ⁿ، وبالتالي Tₙ=Σ(3-1/5ᵏ)=3(n+1)-5/4(1-1/5ⁿ⁺¹)."
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
    solution: "لدينا f(x)=(x+1)/(2x)=1/2+1/(2x)، ومنه f'(x)=-1/(2x²)<0 على [2,+∞[، إذن f متناقصة. كما أن f(2)=3/4 و lim f(x)=1/2، لذلك 1/2<f(x)≤3/4. وبما أن uₙ=n/2ⁿ فإن uₙ₊₁/uₙ=((n+1)/2ⁿ⁺¹)/(n/2ⁿ)=(n+1)/(2n)=f(n)، ومنه uₙ₊₁/uₙ≤3/4 لكل n≥2. بالتكرار: uₙ≤u₂(3/4)ⁿ⁻²، و u₂=1/2، إذن uₙ≤(1/2)(3/4)ⁿ⁻²، ومنه lim uₙ=0. كما أن uₖ/k=1/2ᵏ، لذلك Sₙ=1/2²+1/2³+...+1/2ⁿ=1/2(1-(1/2)ⁿ⁻¹). إذا Sₙ=511/1024 فإن 1/2(1-1/2ⁿ⁻¹)=511/1024، فنجد 1/2ⁿ=1/1024=1/2¹⁰، وبالتالي n=10."
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
    solution: "نكتب uₙ₊₁=-1+2/(2-uₙ)=uₙ/(2-uₙ). إذا 0<uₙ≤1/2 فإن 3/2≤2-uₙ<2، ومنه uₙ₊₁>0 و uₙ₊₁≤(1/2)/(3/2)=1/3≤1/2، فتثبت الخاصية بالتراجع. كما أن uₙ₊₁-uₙ=uₙ/(2-uₙ)-uₙ=uₙ(uₙ-1)/(2-uₙ)<0، إذن (uₙ) متناقصة تماما. لدينا vₙ₊₁=1/uₙ₊₁-1=(2-uₙ)/uₙ-1=2/uₙ-2=2(1/uₙ-1)=2vₙ، و v₀=1، إذن vₙ=2ⁿ. ومنه 1/uₙ=vₙ+1=2ⁿ+1، أي uₙ=1/(2ⁿ+1)، وبالتالي lim uₙ=0. كما أن Sₙ=1+2+...+2ⁿ=2ⁿ⁺¹-1. وبما أن 1/uₖ=vₖ+1، فإن Tₙ=Sₙ+(n+1)=2ⁿ⁺¹+n."
  },  {
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
