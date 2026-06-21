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
    id: "bac-2018-math-subject-1",
    branch: "science",
    stream: "mathematics",
    year: "2018",
    title: "بكالوريا 2018 - الموضوع الأول - رياضيات",
    figureHtml: `<figure class="bac-figure" aria-label="تمثيل بياني للدالة f والمستقيم y=x">
      <svg class="bac-graph" viewBox="0 0 420 300" role="img">
        <rect x="0" y="0" width="420" height="300" rx="10" class="graph-bg"></rect>
        <g class="grid-lines">
          <path d="M40 25V275 M82 25V275 M124 25V275 M166 25V275 M208 25V275 M250 25V275 M292 25V275 M334 25V275 M376 25V275 M25 45H395 M25 87H395 M25 129H395 M25 171H395 M25 213H395 M25 255H395"></path>
        </g>
        <g class="axes">
          <path d="M25 87H395"></path>
          <path d="M334 275V25"></path>
        </g>
        <g class="axis-labels">
          <text x="328" y="105">0</text><text x="370" y="105">1</text><text x="286" y="105">-1</text><text x="244" y="105">-2</text><text x="202" y="105">-3</text>
          <text x="317" y="50">1</text><text x="313" y="174">-2</text><text x="313" y="216">-3</text><text x="313" y="258">-4</text>
        </g>
        <path class="line-delta" d="M40 255L376 25"></path>
        <path class="curve-f" d="M40 244 C82 216 124 190 166 165 C208 140 250 122 287 139 C314 152 327 195 334 275"></path>
        <g class="graph-points">
          <circle cx="208" cy="213" r="4"></circle>
          <circle cx="229" cy="192" r="4"></circle>
          <circle cx="247" cy="174" r="4"></circle>
        </g>
        <text x="62" y="224" class="graph-label">(Δ)</text>
        <text x="252" y="155" class="graph-label">(C<tspan baseline-shift="sub">f</tspan>)</text>
      </svg>
    </figure>`,
    statementHtml: `<div class="bac-statement">
      <p>الدالة العددية <span class="math">f</span> المعرفة على المجال <span class="math">]-∞ ; 0]</span> بـ:</p>
      <p class="math-equation">f(x) = (x<sup>2</sup> + 1)/(x - 1)</p>
      <p>والمتتالية العددية <span class="math">(u<sub>n</sub>)</span> معرفة بحدها الأول <span class="math">u<sub>0</sub> = -3</span>، ومن أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math-equation">u<sub>n+1</sub> = f(u<sub>n</sub>)</p>
      <p>ليكن <span class="math">(C<sub>f</sub>)</span> التمثيل البياني للدالة <span class="math">f</span>، و <span class="math">(Δ)</span> المستقيم ذو المعادلة <span class="math">y = x</span>.</p>
      <ol>
        <li>أنشئ، اعتمادا على الشكل، الحدود <span class="math">u<sub>0</sub>، u<sub>1</sub>، u<sub>2</sub>، u<sub>3</sub></span> على حامل محور الفواصل دون حسابها، ثم ضع تخمينا حول اتجاه تغير المتتالية <span class="math">(u<sub>n</sub>)</span> وتقاربها.</li>
        <li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">-4 &lt; u<sub>n</sub> &lt; -1</span>.</li>
        <li>
          <ol>
            <li>أثبت أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n+1</sub> + 1 ≥ 3/4 (u<sub>n</sub> + 1)</span>.</li>
            <li>استنتج أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n</sub> + 1 ≥ -2(3/4)<sup>n</sup></span>، ثم احسب <span class="math">lim u<sub>n</sub></span>.</li>
          </ol>
        </li>
        <li>نضع <span class="math">S<sub>n</sub> = u<sub>0</sub> + u<sub>1</sub> + ... + u<sub>n</sub></span>. بين أنه من أجل كل عدد طبيعي <span class="math">n</span>:</li>
      </ol>
      <p class="math-equation">8[(3/4)<sup>n+1</sup> - 1] ≤ (u<sub>0</sub> + 1) + (u<sub>1</sub> + 1) + ... + (u<sub>n</sub> + 1) &lt; 0</p>
      <p>واستنتج <span class="math">lim S<sub>n</sub></span>.</p>
    </div>`,
    quickSolution: `<p><strong>1)</strong> من الشكل نخمن أن <span class="math">(u<sub>n</sub>)</span> متزايدة وتتقارب نحو <span class="math">-1</span>.</p><p><strong>2)</strong> <span class="math">-4 &lt; u<sub>n</sub> &lt; -1</span> لكل <span class="math">n</span>.</p><p><strong>3)</strong> <span class="math">u<sub>n+1</sub> + 1 ≥ 3/4(u<sub>n</sub> + 1)</span>، ومنه <span class="math">u<sub>n</sub> + 1 ≥ -2(3/4)<sup>n</sup></span> و <span class="math">lim u<sub>n</sub> = -1</span>.</p><p><strong>4)</strong> <span class="math">8[(3/4)<sup>n+1</sup> - 1] ≤ Σ(u<sub>k</sub> + 1) &lt; 0</span>، و <span class="math">lim S<sub>n</sub> = -∞</span>.</p>`,
    solution: `<p><strong>1)</strong> من التمثيل البياني، انطلاقا من <span class="math">u<sub>0</sub> = -3</span>، تبدو الحدود متزايدة ومتقاربة نحو <span class="math">-1</span>.</p>
      <p><strong>2)</strong> نبرهن بالتراجع أن <span class="math">-4 &lt; u<sub>n</sub> &lt; -1</span>.</p>
      <p>عند <span class="math">n = 0</span>: <span class="math">-4 &lt; -3 &lt; -1</span>.</p>
      <p>نفترض أن <span class="math">-4 &lt; u<sub>n</sub> &lt; -1</span>. نلاحظ أن:</p>
      <p class="math-equation">f(x) + 4 = (x<sup>2</sup> + 4x - 3)/(x - 1)</p>
      <p class="math-equation">f(x) + 1 = x(x + 1)/(x - 1)</p>
      <p>على المجال <span class="math">]-4 ; -1[</span> نحصل على <span class="math">f(x) &gt; -4</span> و <span class="math">f(x) &lt; -1</span>. إذن <span class="math">-4 &lt; u<sub>n+1</sub> &lt; -1</span>. وبالتراجع:</p>
      <p class="math-equation">-4 &lt; u<sub>n</sub> &lt; -1</p>
      <p><strong>3 أ)</strong> لدينا:</p>
      <p class="math-equation">u<sub>n+1</sub> + 1 = f(u<sub>n</sub>) + 1 = u<sub>n</sub>(u<sub>n</sub> + 1)/(u<sub>n</sub> - 1)</p>
      <p>كما أن <span class="math">f(x) - x = (x + 1)/(x - 1)</span>، وهي موجبة على <span class="math">]-4 ; -1[</span>، إذن <span class="math">u<sub>n+1</sub> - u<sub>n</sub> &gt; 0</span>، ومنه <span class="math">u<sub>n</sub> ≥ u<sub>0</sub> = -3</span>. لذلك:</p>
      <p class="math-equation">u<sub>n</sub>/(u<sub>n</sub> - 1) ≤ 3/4</p>
      <p>وبما أن <span class="math">u<sub>n</sub> + 1 &lt; 0</span>، فإن ضرب المتراجحة في <span class="math">u<sub>n</sub> + 1</span> يغير الاتجاه، فنحصل على:</p>
      <p class="math-equation">u<sub>n+1</sub> + 1 ≥ 3/4(u<sub>n</sub> + 1)</p>
      <p><strong>3 ب)</strong> بوضع <span class="math">a<sub>n</sub> = u<sub>n</sub> + 1</span>، نحصل بالتراجع من المتراجحة السابقة و <span class="math">a<sub>0</sub> = -2</span> على:</p>
      <p class="math-equation">u<sub>n</sub> + 1 ≥ -2(3/4)<sup>n</sup></p>
      <p>ومع <span class="math">u<sub>n</sub> + 1 &lt; 0</span> نحصل على:</p>
      <p class="math-equation">-2(3/4)<sup>n</sup> ≤ u<sub>n</sub> + 1 &lt; 0</p>
      <p>وبما أن <span class="math">(3/4)<sup>n</sup> → 0</span>، فإن:</p>
      <p class="math-equation">lim u<sub>n</sub> = -1</p>
      <p><strong>4)</strong> بجمع المتراجحات <span class="math">-2(3/4)<sup>k</sup> ≤ u<sub>k</sub> + 1 &lt; 0</span> من <span class="math">k = 0</span> إلى <span class="math">n</span>، نجد:</p>
      <p class="math-equation">-2[1 + 3/4 + ... + (3/4)<sup>n</sup>] ≤ Σ<sub>k=0</sub><sup>n</sup>(u<sub>k</sub> + 1) &lt; 0</p>
      <p>أي:</p>
      <p class="math-equation">8[(3/4)<sup>n+1</sup> - 1] ≤ Σ<sub>k=0</sub><sup>n</sup>(u<sub>k</sub> + 1) &lt; 0</p>
      <p>وبما أن <span class="math">S<sub>n</sub> = Σ(u<sub>k</sub> + 1) - (n + 1)</span>، فإن:</p>
      <p class="math-equation">lim S<sub>n</sub> = -∞</p>`,
    detailedSolution: `<div class="detailed-solution">
      <p>هذا التمرين يجمع بين التمثيل البياني، الحصر بالتراجع، متراجحة على <span class="math">u<sub>n</sub> + 1</span>، ثم استعمال مجموع هندسي لاستنتاج نهاية <span class="math">S<sub>n</sub></span>.</p>
      <p class="pedagogy-step"><strong>1) التمثيل البياني:</strong> نستعمل المنحنى <span class="math">C<sub>f</sub></span> والمستقيم <span class="math">y=x</span> للتخمين فقط. نبدأ من <span class="math">u<sub>0</sub> = -3</span> على محور الفواصل، نصعد إلى المنحنى، ثم ننتقل أفقيا إلى المستقيم، ونكرر. يظهر أن الحدود تتحرك نحو <span class="math">-1</span> من الأسفل.</p>
      <p class="pedagogy-step"><strong>2) الحصر بالتراجع:</strong> نحتاج الحصر <span class="math">-4 &lt; u<sub>n</sub> &lt; -1</span> لأن كل الإشارات اللاحقة تعتمد عليه.</p>
      <p>التحقق عند <span class="math">n=0</span>: <span class="math">-4 &lt; -3 &lt; -1</span>.</p>
      <p>فرضية التراجع: نفترض <span class="math">-4 &lt; u<sub>n</sub> &lt; -1</span>.</p>
      <p>الانتقال: ندرس صورة المجال بالدالة <span class="math">f</span>. لدينا:</p>
      <p class="math-equation">f(x) + 1 = x(x + 1)/(x - 1)</p>
      <p>على <span class="math">]-4,-1[</span> يكون <span class="math">x &lt; 0</span> و <span class="math">x+1 &lt; 0</span> و <span class="math">x-1 &lt; 0</span>، إذن <span class="math">f(x)+1 &lt; 0</span>، أي <span class="math">f(x) &lt; -1</span>.</p>
      <p>كما نتحقق أن <span class="math">f(x) + 4 &gt; 0</span> على نفس المجال، ومنه <span class="math">f(x) &gt; -4</span>. إذن <span class="math">-4 &lt; u<sub>n+1</sub> &lt; -1</span>.</p>
      <p class="math-equation">النتيجة: -4 &lt; u<sub>n</sub> &lt; -1</p>
      <p class="pedagogy-step"><strong>3) المتراجحة مع u<sub>n</sub> + 1:</strong> الفكرة هنا أن <span class="math">u<sub>n</sub> + 1</span> عدد سالب، لذلك عند ضرب متراجحة فيه يتغير اتجاه الإشارة.</p>
      <p>نحسب:</p>
      <p class="math-equation">u<sub>n+1</sub> + 1 = u<sub>n</sub>(u<sub>n</sub> + 1)/(u<sub>n</sub> - 1)</p>
      <p>نثبت الرتابة جبريا: <span class="math">f(x) - x = (x + 1)/(x - 1)</span> وهي موجبة على <span class="math">]-4,-1[</span>، إذن <span class="math">u<sub>n+1</sub> &gt; u<sub>n</sub></span>. وبالتالي <span class="math">u<sub>n</sub> ≥ u<sub>0</sub> = -3</span>. ومنه:</p>
      <p class="math-equation">u<sub>n</sub>/(u<sub>n</sub> - 1) ≤ 3/4</p>
      <p>وبما أن <span class="math">u<sub>n</sub> + 1 &lt; 0</span>، نحصل على:</p>
      <p class="math-equation">u<sub>n+1</sub> + 1 ≥ 3/4(u<sub>n</sub> + 1)</p>
      <p>بالتراجع على هذه المتراجحة، ومع <span class="math">u<sub>0</sub> + 1 = -2</span>:</p>
      <p class="math-equation">u<sub>n</sub> + 1 ≥ -2(3/4)<sup>n</sup></p>
      <p>ومن الحصر نعلم أيضا أن <span class="math">u<sub>n</sub> + 1 &lt; 0</span>، لذلك:</p>
      <p class="math-equation">-2(3/4)<sup>n</sup> ≤ u<sub>n</sub> + 1 &lt; 0</p>
      <p>وبما أن الحدين الطرفيين يؤولان إلى <span class="math">0</span>، نستنتج:</p>
      <p class="math-equation">lim u<sub>n</sub> = -1</p>
      <p class="pedagogy-step"><strong>4) المجموع:</strong> نجمع الحصر السابق من <span class="math">0</span> إلى <span class="math">n</span>. الطرف الأيسر هو مجموع هندسي أساسه <span class="math">3/4</span>:</p>
      <p class="math-equation">Σ<sub>k=0</sub><sup>n</sup>-2(3/4)<sup>k</sup> = -2[1-(3/4)<sup>n+1</sup>]/(1/4) = 8[(3/4)<sup>n+1</sup>-1]</p>
      <p>إذن:</p>
      <p class="math-equation">8[(3/4)<sup>n+1</sup> - 1] ≤ Σ<sub>k=0</sub><sup>n</sup>(u<sub>k</sub> + 1) &lt; 0</p>
      <p>وأخيرا:</p>
      <p class="math-equation">S<sub>n</sub> = Σ<sub>k=0</sub><sup>n</sup>(u<sub>k</sub> + 1) - (n + 1)</p>
      <p>الجزء الأول محصور، أما <span class="math">-(n+1)</span> فيؤول إلى <span class="math">-∞</span>، إذن:</p>
      <p class="math-equation">lim S<sub>n</sub> = -∞</p>
      <p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نرسم للتخمين، ثم نثبت الحصر بالتراجع، ثم نحصر <span class="math">u<sub>n</sub>+1</span> بين متتالية هندسية سالبة و <span class="math">0</span>، فنستنتج النهاية، ثم نجمع الحصر للحصول على نهاية <span class="math">S<sub>n</sub></span>.</p>
    </div>`,
    conceptHints: [
      {
        title: "التمثيل البياني",
        hint: "ابدأ من <span class='math'>u<sub>0</sub></span> على محور الفواصل، اصعد إلى المنحنى، ثم انتقل أفقيا إلى المستقيم <span class='math'>y=x</span>. الرسم يعطي التخمين فقط، أما الرتابة والنهاية فتثبت جبريا."
      },
      {
        title: "الحصر بالتراجع",
        hint: "تحقق من <span class='math'>n=0</span>، ثم افترض أن <span class='math'>u<sub>n</sub></span> بين -4 و-1، وأثبت أن <span class='math'>f(u<sub>n</sub>)</span> يبقى بين -4 و-1 بدراسة <span class='math'>f(x)+1</span> و<span class='math'>f(x)+4</span>."
      },
      {
        title: "إشارة <span class='math'>u<sub>n</sub> + 1</span>",
        hint: "انتبه: من الحصر لدينا <span class='math'>u<sub>n</sub>+1&lt;0</span>. لذلك عند ضرب متراجحة في <span class='math'>u<sub>n</sub>+1</span> يتغير اتجاه الإشارة."
      },
      {
        title: "حساب النهاية بالحصر",
        hint: "إذا حصلت على <span class='math'>-2(3/4)<sup>n</sup> ≤ u<sub>n</sub>+1 &lt; 0</span>، فالطرفان يؤولان إلى 0، ومنه <span class='math'>u<sub>n</sub>+1</span> يؤول إلى 0."
      },
      {
        title: "حساب المجموع",
        hint: "اجمع المتراجحات من k=0 إلى n، واستعمل مجموع المتتالية الهندسية 1+q+...<span class='math'>+q^n</span>."
      }
    ]
  },  {
    id: "bac-2019-math-subject-2",
    branch: "science",
    stream: "mathematics",
    year: "2019",
    title: "بكالوريا 2019 - الموضوع الثاني - رياضيات",
    statementHtml: `<div class="bac-statement">
      <p>متتالية عددية حدودها موجبة معرفة بحدها الأول <span class="math">u<sub>1</sub> = 0</span>، ومن أجل كل عدد طبيعي غير معدوم <span class="math">n</span>:</p>
      <p class="math-equation">u<sub>n+1</sub> = u<sub>n</sub> + 2√u<sub>n</sub> + 1</p>
      <ol>
        <li>
          <ol>
            <li>تحقق أنه من أجل كل عدد طبيعي غير معدوم <span class="math">n</span>: <span class="math">√u<sub>n+1</sub> - √u<sub>n</sub> = 1</span>.</li>
            <li>استنتج كتابة الحد العام <span class="math">u<sub>n</sub></span> بدلالة <span class="math">n</span>.</li>
          </ol>
        </li>
        <li>تحقق أنه من أجل كل عدد طبيعي غير معدوم <span class="math">n</span>: <span class="math">u<sub>n</sub> = n(n - 2) + 1</span>.</li>
        <li>عين قيم العدد الطبيعي <span class="math">n</span> التي من أجلها: <span class="math">n - 2</span> يقسم <span class="math">n - 5</span>.</li>
        <li>
          <ol>
            <li>من أجل كل عدد طبيعي <span class="math">n ≥ 2</span>، بين أن: <span class="math">PGCD(n - 2 ; u<sub>n</sub>) = 1</span>.</li>
            <li>عين قيم العدد الطبيعي <span class="math">n</span> التي من أجلها: <span class="math">(n - 5)u<sub>n</sub></span> يقسم <span class="math">(n - 2)(n<sup>2</sup> + 1)</span>.</li>
          </ol>
        </li>
      </ol>
    </div>`,
    quickSolution: `<p><strong>1)</strong> <span class="math">√u<sub>n+1</sub> - √u<sub>n</sub> = 1</span>، ومنه <span class="math">√u<sub>n</sub> = n - 1</span> و <span class="math">u<sub>n</sub> = (n - 1)<sup>2</sup></span>.</p><p><strong>2)</strong> <span class="math">u<sub>n</sub> = (n - 1)<sup>2</sup> = n(n - 2) + 1</span>.</p><p><strong>3)</strong> القيم هي: <span class="math">n = 1, 3, 5</span>.</p><p><strong>4)</strong> أ) <span class="math">PGCD(n - 2 ; u<sub>n</sub>) = 1</span>. ب) القيمة الوحيدة هي <span class="math">n = 2</span>.</p>`,
    solution: `<p><strong>1)</strong> لدينا:</p>
      <p class="math-equation">u<sub>n+1</sub> = u<sub>n</sub> + 2√u<sub>n</sub> + 1 = (√u<sub>n</sub> + 1)<sup>2</sup></p>
      <p>وبما أن الحدود موجبة، فإن:</p>
      <p class="math-equation">√u<sub>n+1</sub> = √u<sub>n</sub> + 1</p>
      <p>إذن:</p>
      <p class="math-equation">√u<sub>n+1</sub> - √u<sub>n</sub> = 1</p>
      <p>المتتالية <span class="math">(√u<sub>n</sub>)</span> حسابية أساسها <span class="math">1</span> وحدها الأول <span class="math">√u<sub>1</sub> = 0</span>، لذلك:</p>
      <p class="math-equation">√u<sub>n</sub> = n - 1</p>
      <p>ومنه:</p>
      <p class="math-equation">u<sub>n</sub> = (n - 1)<sup>2</sup></p>
      <p><strong>2)</strong> نكتب:</p>
      <p class="math-equation">(n - 1)<sup>2</sup> = n<sup>2</sup> - 2n + 1 = n(n - 2) + 1</p>
      <p>إذن <span class="math">u<sub>n</sub> = n(n - 2) + 1</span>.</p>
      <p><strong>3)</strong> نريد <span class="math">n - 2</span> يقسم <span class="math">n - 5</span>. وبما أن:</p>
      <p class="math-equation">n - 5 = (n - 2) - 3</p>
      <p>فهذا يكافئ أن <span class="math">n - 2</span> يقسم <span class="math">3</span>. إذن:</p>
      <p class="math-equation">n - 2 ∈ {-1, 1, 3}</p>
      <p>ومنه القيم الطبيعية غير المعدومة هي:</p>
      <p class="math-equation">n = 1, 3, 5</p>
      <p><strong>4 أ)</strong> من <span class="math">u<sub>n</sub> = n(n - 2) + 1</span> نحصل على:</p>
      <p class="math-equation">u<sub>n</sub> ≡ 1 [mod (n - 2)]</p>
      <p>إذن:</p>
      <p class="math-equation">PGCD(n - 2 ; u<sub>n</sub>) = PGCD(n - 2 ; 1) = 1</p>
      <p><strong>4 ب)</strong> نبحث عن <span class="math">n</span> بحيث يكون المقسوم عليه غير منعدم، أي <span class="math">n ≠ 1</span> و <span class="math">n ≠ 5</span>. بالتجريب المباشر للقيم الصغيرة نجد أن <span class="math">n = 2</span> تحقق الشرط لأن:</p>
      <p class="math-equation">(n - 5)u<sub>n</sub> = -3 ، (n - 2)(n<sup>2</sup> + 1) = 0</p>
      <p>و <span class="math">-3</span> يقسم <span class="math">0</span>.</p>
      <p>لإقصاء باقي القيم: إذا <span class="math">n ≥ 8</span> فإن:</p>
      <p class="math-equation">(n - 5)(n - 1)<sup>2</sup> &gt; 5n<sup>2</sup> - 10n + 3</p>
      <p>لكن:</p>
      <p class="math-equation">(n - 2)(n<sup>2</sup> + 1) - (n - 5)(n - 1)<sup>2</sup> = 5n<sup>2</sup> - 10n + 3</p>
      <p>فلو كانت القسمة صحيحة لكان باقي القسمة أصغر من المقسوم عليه، ولا يمكن أن يكون صفرا لأن المعادلة <span class="math">5n<sup>2</sup> - 10n + 3 = 0</span> لا تقبل حلا طبيعيا. ونفحص القيم <span class="math">2,3,4,6,7</span> فنجد أن الوحيدة التي تحقق الشرط هي:</p>
      <p class="math-equation">n = 2</p>`,
    detailedSolution: `<div class="detailed-solution">
      <p>في هذا التمرين، المفتاح هو ملاحظة أن العلاقة التراجعية تخفي مربعا كاملا. بعد ذلك نحول السؤال إلى متتالية حسابية بسيطة في <span class="math">√u<sub>n</sub></span>، ثم نستعمل الكتابة الصريحة في أسئلة القسمة و <span class="math">PGCD</span>.</p>
      <p class="pedagogy-step"><strong>1) لماذا نستعمل الجذر؟</strong> لأن العلاقة تحتوي <span class="math">u<sub>n</sub></span> و <span class="math">√u<sub>n</sub></span>. نحاول كتابة الطرف الأيمن على شكل مربع كامل:</p>
      <p class="math-equation">u<sub>n</sub> + 2√u<sub>n</sub> + 1 = (√u<sub>n</sub> + 1)<sup>2</sup></p>
      <p>وبما أن حدود المتتالية موجبة، فإن الجذر المربع معرف وموجب، لذلك:</p>
      <p class="math-equation">√u<sub>n+1</sub> = √u<sub>n</sub> + 1</p>
      <p class="math-equation">√u<sub>n+1</sub> - √u<sub>n</sub> = 1</p>
      <p>إذن <span class="math">(√u<sub>n</sub>)</span> متتالية حسابية أساسها <span class="math">1</span> وحدها الأول <span class="math">√u<sub>1</sub> = 0</span>. ومنه:</p>
      <p class="math-equation">√u<sub>n</sub> = n - 1</p>
      <p class="math-equation">u<sub>n</sub> = (n - 1)<sup>2</sup></p>
      <p class="pedagogy-step"><strong>2) لماذا نعيد كتابة الحد العام؟</strong> لأن الأسئلة اللاحقة فيها <span class="math">n - 2</span>، فنكتب الحد العام حول هذا العامل:</p>
      <p class="math-equation">u<sub>n</sub> = (n - 1)<sup>2</sup> = n<sup>2</sup> - 2n + 1 = n(n - 2) + 1</p>
      <p class="pedagogy-step"><strong>3) فكرة القسمة:</strong> إذا أردنا أن يقسم <span class="math">n - 2</span> العدد <span class="math">n - 5</span>، نكتب العدد الثاني بدلالة الأول:</p>
      <p class="math-equation">n - 5 = (n - 2) - 3</p>
      <p>إذن يلزم أن يقسم <span class="math">n - 2</span> العدد <span class="math">3</span>. ومنه:</p>
      <p class="math-equation">n - 2 ∈ {-1, 1, 3}</p>
      <p class="math-equation">n = 1, 3, 5</p>
      <p class="pedagogy-step"><strong>4 أ) فكرة PGCD:</strong> نستعمل الكتابة <span class="math">u<sub>n</sub> = n(n - 2) + 1</span>. عند القسمة على <span class="math">n - 2</span>، الحد <span class="math">n(n - 2)</span> يختفي ويبقى الباقي <span class="math">1</span>:</p>
      <p class="math-equation">u<sub>n</sub> ≡ 1 [mod (n - 2)]</p>
      <p>لذلك:</p>
      <p class="math-equation">PGCD(n - 2 ; u<sub>n</sub>) = PGCD(n - 2 ; 1) = 1</p>
      <p class="pedagogy-step"><strong>4 ب) كيف نبحث عن القيم؟</strong> أولا نستبعد الحالات التي تجعل المقسوم عليه صفرا: <span class="math">n = 1</span> و <span class="math">n = 5</span>. ثم نفحص القيم الصغيرة، وبعدها نستعمل مقارنة لإقصاء القيم الكبيرة.</p>
      <p>عند <span class="math">n = 2</span>:</p>
      <p class="math-equation">(n - 5)u<sub>n</sub> = -3 ، (n - 2)(n<sup>2</sup> + 1) = 0</p>
      <p>إذن الشرط محقق لأن <span class="math">-3</span> يقسم <span class="math">0</span>.</p>
      <p>أما من أجل <span class="math">n ≥ 8</span> فنقارن:</p>
      <p class="math-equation">(n - 2)(n<sup>2</sup> + 1) - (n - 5)(n - 1)<sup>2</sup> = 5n<sup>2</sup> - 10n + 3</p>
      <p>وهذا الفرق أصغر من <span class="math">(n - 5)(n - 1)<sup>2</sup></span> عندما <span class="math">n ≥ 8</span>، ولا يساوي صفرا لأي عدد طبيعي. لذلك لا توجد حلول كبيرة. ونفحص القيم الباقية <span class="math">3,4,6,7</span> فلا تحقق القسمة.</p>
      <p class="math-equation">النتيجة النهائية: n = 2</p>
      <p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نكتب العلاقة كمربع كامل، نستنتج أن <span class="math">√u<sub>n</sub></span> حسابية، نحصل على <span class="math">u<sub>n</sub> = (n - 1)<sup>2</sup></span>، ثم نستعمل هذه الكتابة في أسئلة القسمة و <span class="math">PGCD</span>. بهذه الخطة يستطيع التلميذ كتابة الحل في الورقة بالترتيب.</p>
    </div>`,
    conceptHints: [
      {
        title: "المربع الكامل",
        hint: "لاحظ أن <span class='math'>u<sub>n</sub> + 2√u<sub>n</sub> + 1</span> يساوي <span class='math'>(√u<sub>n</sub> + 1)<sup>2</sup></span>. هذه الفكرة تحول العلاقة التراجعية إلى علاقة بسيطة بين الجذور."
      },
      {
        title: "متتالية الجذور",
        hint: "بعد الحصول على <span class='math'>√u<sub>n+1</sub>-√u<sub>n</sub>=1</span>، اعتبر <span class='math'>√u<sub>n</sub></span> متتالية حسابية أساسها 1، ثم استعمل حدها الأول <span class='math'>√u<sub>1</sub></span>."
      },
      {
        title: "القسمة",
        hint: "لإثبات أن عددا يقسم آخر، حاول كتابة العدد الثاني بدلالة الأول زائد باقي صغير، مثل <span class='math'>n-5=(n-2)-3</span>."
      },
      {
        title: "PGCD",
        hint: "استعمل الكتابة <span class='math'>u<sub>n</sub>=n(n-2)+1</span>، فباقي قسمة <span class='math'>u<sub>n</sub></span> على <span class='math'>n-2</span> هو 1، وهذا يعطي مباشرة القاسم المشترك."
      },
      {
        title: "البحث عن قيم n",
        hint: "استبعد أولا الحالات التي تجعل المقسوم عليه صفرا، ثم افحص القيم الصغيرة، واستعمل مقارنة أو باقي قسمة لإقصاء القيم الكبيرة."
      }
    ]
  },  {
    id: "bac-2021-math-subject-1",
    branch: "science",
    stream: "mathematics",
    year: "2021",
    title: "بكالوريا 2021 - الموضوع الأول - رياضيات",
    statementHtml: `<div class="bac-statement">
      <p>المتتالية العددية <span class="math">(u<sub>n</sub>)</span> معرفة بـ:</p>
      <p class="math-equation">u<sub>0</sub> = -3/2 ، ومن أجل كل عدد طبيعي n: u<sub>n+1</sub> = (11u<sub>n</sub> + 4)/(-4u<sub>n</sub> + 1)</p>
      <ol>
        <li>
          <ol>
            <li>تحقق أنه من أجل كل عدد طبيعي <span class="math">n</span>:</li>
          </ol>
          <p class="math-equation">u<sub>n+1</sub> = -11/4 + 27/[4(-4u<sub>n</sub> + 1)]</p>
          <ol start="2">
            <li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">-2 &lt; u<sub>n</sub> &lt; -1</span>.</li>
            <li>بين أن المتتالية <span class="math">(u<sub>n</sub>)</span> متناقصة تماما، ثم استنتج أنها متقاربة.</li>
          </ol>
        </li>
        <li>
          <p>المتتالية العددية <span class="math">(v<sub>n</sub>)</span> معرفة من أجل كل عدد طبيعي <span class="math">n</span> بـ:</p>
          <p class="math-equation">v<sub>n</sub> = (2u<sub>n</sub> + 1)/(u<sub>n</sub> + 2)</p>
          <ol>
            <li>بين أن <span class="math">(v<sub>n</sub>)</span> متتالية هندسية أساسها <span class="math">3</span>، ثم احسب حدها الأول.</li>
            <li>اكتب <span class="math">v<sub>n</sub></span> بدلالة <span class="math">n</span>، ثم استنتج أنه من أجل كل عدد طبيعي <span class="math">n</span>:</li>
          </ol>
          <p class="math-equation">u<sub>n</sub> = 3/(2 + 4×3<sup>n</sup>) - 2</p>
          <ol start="3"><li>احسب <span class="math">lim u<sub>n</sub></span>.</li></ol>
        </li>
        <li>
          <ol>
            <li>تحقق أنه من أجل كل عدد طبيعي <span class="math">n</span>:</li>
          </ol>
          <p class="math-equation">3/(u<sub>n</sub> + 2) - 2 = -v<sub>n</sub></p>
          <ol start="2">
            <li>نضع من أجل كل عدد طبيعي <span class="math">n</span>:</li>
          </ol>
          <p class="math-equation">S<sub>n</sub> = ln(3/(u<sub>0</sub> + 2) - 2) + ln(3/(u<sub>1</sub> + 2) - 2) + ... + ln(3/(u<sub>n</sub> + 2) - 2)</p>
          <p>احسب <span class="math">S<sub>n</sub></span> بدلالة <span class="math">n</span>.</p>
        </li>
      </ol>
    </div>`,
    quickSolution: `<p><strong>1)</strong> a) <span class="math">u<sub>n+1</sub> = -11/4 + 27/[4(-4u<sub>n</sub> + 1)]</span> &nbsp; b) <span class="math">-2 &lt; u<sub>n</sub> &lt; -1</span> لكل <span class="math">n</span> &nbsp; c) <span class="math">(u<sub>n</sub>)</span> متناقصة تماما ومقاربة.</p><p><strong>2)</strong> a) <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">3</span>، <span class="math">v<sub>0</sub> = -4</span> &nbsp; b) <span class="math">v<sub>n</sub> = -4×3<sup>n</sup></span>؛ <span class="math">u<sub>n</sub> = 3/(2 + 4×3<sup>n</sup>) - 2</span> &nbsp; c) <span class="math">lim u<sub>n</sub> = -2</span>.</p><p><strong>3)</strong> <span class="math">S<sub>n</sub> = (n + 1)ln4 + [n(n + 1)/2]ln3</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p>في هذا التمرين، نستعمل البرهان بالتراجع، دراسة الرتابة بإشارة الفرق، متتالية مساعدة، المتتالية الهندسية، حساب النهاية، حساب مجموع حدود، خواص اللوغاريتمات. الهدف هو إثبات خاصية لكل عدد طبيعي <span class="math">n</span> ودراسة اتجاه تغير المتتالية وإيجاد عبارة الحد العام وحساب النهاية وحساب مجموع حدود.</p>
<p class="pedagogy-step">نستعمل التحويلات الجبرية (توحيد المقام، التعويض، التبسيط) للوصول إلى العبارة المطلوبة.</p>
<p><strong>1)</strong> نكتب:</p>
      <p class="math-equation">(11u<sub>n</sub> + 4)/(-4u<sub>n</sub> + 1) = -11/4 + 27/[4(-4u<sub>n</sub> + 1)]</p>
      <p>وذلك بتوحيد المقام.</p>

<p class="pedagogy-step">نستعمل الحصر بالتراجع على ثلاث مراحل: التحقق عند <span class="math">n = 0</span>، ثم فرضية التراجع، ثم الانتقال من <span class="math">n</span> إلى <span class="math">n + 1</span>؛ ثم ندرس الرتابة بإشارة الفرق <span class="math">u<sub>n+1</sub> - u<sub>n</sub></span> وليس بالتخمين البياني فقط؛ نحسب النهاية باستعمال الحصر بين متتاليتين لهما نفس النهاية.</p>
<p><strong>برهان الحصر:</strong> عند <span class="math">n = 0</span>: لدينا <span class="math">-2 &lt; -3/2 &lt; -1</span>. إذا كان <span class="math">-2 &lt; u<sub>n</sub> &lt; -1</span>، فإن <span class="math">5 &lt; -4u<sub>n</sub> + 1 &lt; 9</span>، ومنه:</p>
      <p class="math-equation">3/4 &lt; 27/[4(-4u<sub>n</sub> + 1)] &lt; 27/20</p>
      <p>وبالتالي:</p>
      <p class="math-equation">-2 &lt; u<sub>n+1</sub> &lt; -7/5 &lt; -1</p>
      <p>إذن <span class="math">-2 &lt; u<sub>n</sub> &lt; -1</span> لكل <span class="math">n</span>.</p>
      <p>ولدراسة الرتابة:</p>
      <p class="math-equation">u<sub>n+1</sub> - u<sub>n</sub> = (4u<sub>n</sub><sup>2</sup> + 10u<sub>n</sub> + 4)/(-4u<sub>n</sub> + 1) = 2(2u<sub>n</sub> + 1)(u<sub>n</sub> + 2)/(-4u<sub>n</sub> + 1)</p>
      <p>وبما أن <span class="math">-2 &lt; u<sub>n</sub> &lt; -1</span>، فإن البسط سالب والمقام موجب، إذن <span class="math">u<sub>n+1</sub> - u<sub>n</sub> &lt; 0</span>. المتتالية متناقصة تماما ومحدودة من الأسفل بـ <span class="math">-2</span>، فهي متقاربة.</p>

<p class="pedagogy-step">نعرف متتالية مساعدة حتى نحول العلاقة التراجعية إلى علاقة هندسية بسيطة؛ بعد إيجاد العبارة الصريحة، نستعمل نهاية المتتالية الهندسية <span class="math">q<sup>n</sup></span> لحساب النهاية.</p>
<p><strong>2)</strong> لدينا:</p>
      <p class="math-equation">v<sub>0</sub> = (2(-3/2) + 1)/(-3/2 + 2) = -4</p>
      <p>وبتعويض <span class="math">u<sub>n+1</sub></span> نجد:</p>
      <p class="math-equation">v<sub>n+1</sub> = 3v<sub>n</sub></p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">3</span> وحدها الأول <span class="math">-4</span>، ومنه:</p>
      <p class="math-equation">v<sub>n</sub> = -4×3<sup>n</sup></p>
      <p>ومن <span class="math">v<sub>n</sub> = (2u<sub>n</sub> + 1)/(u<sub>n</sub> + 2)</span> نستنتج:</p>
      <p class="math-equation">u<sub>n</sub> = (1 - 2v<sub>n</sub>)/(v<sub>n</sub> - 2) = 3/(2 + 4×3<sup>n</sup>) - 2</p>
      <p>وبالتالي:</p>
      <p class="math-equation">lim u<sub>n</sub> = -2</p>

<p class="pedagogy-step">نستعمل خواص اللوغاريتمات لحساب المجموع.</p>
<p><strong>3)</strong> من العلاقة السابقة:</p>
      <p class="math-equation">3/(u<sub>n</sub> + 2) - 2 = -v<sub>n</sub></p>
      <p>وبما أن <span class="math">v<sub>n</sub> = -4×3<sup>n</sup></span>، فإن:</p>
      <p class="math-equation">3/(u<sub>n</sub> + 2) - 2 = 4×3<sup>n</sup></p>
      <p>إذن:</p>
      <p class="math-equation">S<sub>n</sub> = Σ<sub>k=0</sub><sup>n</sup> ln(4×3<sup>k</sup>)</p>
      <p>أي:</p>
      <p class="math-equation">S<sub>n</sub> = (n + 1)ln4 + [n(n + 1)/2]ln3</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نتبع الترتيب التالي: البرهان بالتراجع، دراسة الرتابة، استعمال متتالية مساعدة، حساب النهاية، حساب المجموع، ونكتب النتيجة النهائية في كل جزء.</p>
</div>`,
    conceptHints: [
      {
        "title": "الحصر بالتراجع",
        "hint": "تحقق من n=0، ثم افترض أن u_n داخل المجال، واستعمل علاقة u_{n+1}=f(u_n) أو صورة المجال بالدالة لإثبات بقاء u_{n+1} داخل نفس المجال."
      },
      {
        "title": "رتابة المتتالية",
        "hint": "لدراسة الاتجاه، احسب u_{n+1}-u_n أو درس إشارة f(x)-x على المجال المعطى، واستعمل الحصر لتحديد الإشارة دون الاكتفاء بالتخمين البياني."
      },
      {
        "title": "المتتالية المساعدة",
        "hint": "عرف v_n حتى نحول العلاقة التراجعية إلى علاقة هندسية بسيطة، ثم أثبت ذلك بحساب النسبة v_{n+1}/v_n."
      },
      {
        "title": "حساب النهاية",
        "hint": "استعمل العبارة الصريحة أو الحصر أو حقيقة أن q^n يؤول إلى 0 عندما |q|<1 لاستنتاج النهاية."
      },
      {
        "title": "حساب المجموع",
        "hint": "حدد نوع الحدود (هندسية، متداخلة، لوغاريتمية) ثم استعمل الصيغة المناسبة للمجموع."
      },
      {
        "title": "اللوغاريتمات",
        "hint": "استعمل خاصية ln(ab)=ln a+ln b وln(a^k)=k ln a لتبسيط المجاميع والجداوي."
      }
    ],
    solution: `<p><strong>1)</strong> نكتب:</p>
      <p class="math-equation">(11u<sub>n</sub> + 4)/(-4u<sub>n</sub> + 1) = -11/4 + 27/[4(-4u<sub>n</sub> + 1)]</p>
      <p>وذلك بتوحيد المقام.</p>
      <p><strong>برهان الحصر:</strong> عند <span class="math">n = 0</span>: لدينا <span class="math">-2 &lt; -3/2 &lt; -1</span>. إذا كان <span class="math">-2 &lt; u<sub>n</sub> &lt; -1</span>، فإن <span class="math">5 &lt; -4u<sub>n</sub> + 1 &lt; 9</span>، ومنه:</p>
      <p class="math-equation">3/4 &lt; 27/[4(-4u<sub>n</sub> + 1)] &lt; 27/20</p>
      <p>وبالتالي:</p>
      <p class="math-equation">-2 &lt; u<sub>n+1</sub> &lt; -7/5 &lt; -1</p>
      <p>إذن <span class="math">-2 &lt; u<sub>n</sub> &lt; -1</span> لكل <span class="math">n</span>.</p>
      <p>ولدراسة الرتابة:</p>
      <p class="math-equation">u<sub>n+1</sub> - u<sub>n</sub> = (4u<sub>n</sub><sup>2</sup> + 10u<sub>n</sub> + 4)/(-4u<sub>n</sub> + 1) = 2(2u<sub>n</sub> + 1)(u<sub>n</sub> + 2)/(-4u<sub>n</sub> + 1)</p>
      <p>وبما أن <span class="math">-2 &lt; u<sub>n</sub> &lt; -1</span>، فإن البسط سالب والمقام موجب، إذن <span class="math">u<sub>n+1</sub> - u<sub>n</sub> &lt; 0</span>. المتتالية متناقصة تماما ومحدودة من الأسفل بـ <span class="math">-2</span>، فهي متقاربة.</p>
      <p><strong>2)</strong> لدينا:</p>
      <p class="math-equation">v<sub>0</sub> = (2(-3/2) + 1)/(-3/2 + 2) = -4</p>
      <p>وبتعويض <span class="math">u<sub>n+1</sub></span> نجد:</p>
      <p class="math-equation">v<sub>n+1</sub> = 3v<sub>n</sub></p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">3</span> وحدها الأول <span class="math">-4</span>، ومنه:</p>
      <p class="math-equation">v<sub>n</sub> = -4×3<sup>n</sup></p>
      <p>ومن <span class="math">v<sub>n</sub> = (2u<sub>n</sub> + 1)/(u<sub>n</sub> + 2)</span> نستنتج:</p>
      <p class="math-equation">u<sub>n</sub> = (1 - 2v<sub>n</sub>)/(v<sub>n</sub> - 2) = 3/(2 + 4×3<sup>n</sup>) - 2</p>
      <p>وبالتالي:</p>
      <p class="math-equation">lim u<sub>n</sub> = -2</p>
      <p><strong>3)</strong> من العلاقة السابقة:</p>
      <p class="math-equation">3/(u<sub>n</sub> + 2) - 2 = -v<sub>n</sub></p>
      <p>وبما أن <span class="math">v<sub>n</sub> = -4×3<sup>n</sup></span>، فإن:</p>
      <p class="math-equation">3/(u<sub>n</sub> + 2) - 2 = 4×3<sup>n</sup></p>
      <p>إذن:</p>
      <p class="math-equation">S<sub>n</sub> = Σ<sub>k=0</sub><sup>n</sup> ln(4×3<sup>k</sup>)</p>
      <p>أي:</p>
      <p class="math-equation">S<sub>n</sub> = (n + 1)ln4 + [n(n + 1)/2]ln3</p>`
  },  {
    id: "bac-2020-math-subject-1",
    branch: "science",
    stream: "mathematics",
    year: "2020",
    title: "بكالوريا 2020 - الموضوع الأول - رياضيات",
    figureHtml: `<figure class="bac-figure" aria-label="تمثيل بياني للدالة f والمستقيم y=x">
      <svg class="bac-graph" viewBox="0 0 420 300" role="img">
        <rect x="0" y="0" width="420" height="300" rx="10" class="graph-bg"></rect>
        <g class="grid-lines">
          <path d="M58 20V270 M105 20V270 M152 20V270 M199 20V270 M246 20V270 M293 20V270 M340 20V270 M387 20V270 M35 44H390 M35 80H390 M35 116H390 M35 152H390 M35 188H390 M35 224H390 M35 260H390"></path>
        </g>
        <g class="axes">
          <path d="M35 260H395"></path>
          <path d="M58 275V15"></path>
        </g>
        <g class="axis-labels">
          <text x="52" y="278">0</text><text x="99" y="278">1</text><text x="146" y="278">2</text><text x="193" y="278">3</text><text x="240" y="278">4</text><text x="287" y="278">5</text><text x="334" y="278">6</text><text x="381" y="278">7</text>
          <text x="42" y="228">1</text><text x="42" y="192">2</text><text x="42" y="156">3</text><text x="42" y="120">4</text><text x="42" y="84">5</text><text x="42" y="48">6</text>
        </g>
        <path class="line-delta" d="M35 283L355 40"></path>
        <path class="curve-f" d="M58 80 C67 140 80 185 105 199 C132 213 165 194 205 164 C250 130 302 85 370 20"></path>
        <g class="graph-points">
          <circle cx="152" cy="188" r="4"></circle>
          <circle cx="246" cy="116" r="4"></circle>
        </g>
        <text x="330" y="48" class="graph-label">(Δ)</text>
        <text x="70" y="100" class="graph-label">(C)</text>
      </svg>
    </figure>`,
    statementHtml: `<div class="bac-statement">
      <p>الدالة العددية <span class="math">f</span> المعرفة على <span class="math">[0 ; +∞[</span> كما يلي:</p>
      <p class="math-equation">f(x) = (2x<sup>2</sup> + 5)/(2x + 1)</p>
      <p>و <span class="math">(C)</span> تمثيلها البياني في معلم متعامد ومتجانس، كما هو مبين في الشكل المرفق.</p>
      <p>المتتالية العددية <span class="math">(u<sub>n</sub>)</span> المعرفة على <span class="math">N</span> كما يلي:</p>
      <p class="math-equation">u<sub>0</sub> = 2 ، u<sub>n+1</sub> = f(u<sub>n</sub>)</p>
      <ol>
        <li>
          <ol>
            <li>ادرس وضعية <span class="math">(C)</span> بالنسبة إلى المستقيم <span class="math">(Δ)</span> ذي المعادلة <span class="math">y = x</span>.</li>
            <li>انقل الشكل ومثل على حامل محور الفواصل الحدود <span class="math">u<sub>0</sub>، u<sub>1</sub>، u<sub>2</sub></span>، ثم خمن اتجاه تغير <span class="math">(u<sub>n</sub>)</span>.</li>
          </ol>
        </li>
        <li>
          <ol>
            <li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">2 ≤ u<sub>n</sub> &lt; 5</span>.</li>
            <li>ادرس اتجاه تغير المتتالية <span class="math">(u<sub>n</sub>)</span>، ثم استنتج أنها متقاربة.</li>
          </ol>
        </li>
        <li>أثبت أنه من أجل كل عدد طبيعي <span class="math">n</span>:</li>
      </ol>
      <p class="math-equation">5 - u<sub>n+1</sub> = [2u<sub>n</sub>/(2u<sub>n</sub> + 1)](5 - u<sub>n</sub>)</p>
      <ol start="4">
        <li>
          <ol>
            <li>بين أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">2u<sub>n</sub>/(2u<sub>n</sub> + 1) ≤ 10/11</span>.</li>
            <li>استنتج أن <span class="math">0 &lt; 5 - u<sub>n</sub> ≤ 3(10/11)<sup>n</sup></span>، ثم احسب <span class="math">lim u<sub>n</sub></span>.</li>
          </ol>
        </li>
      </ol>
    </div>`,
    quickSolution: `<p><strong>1)</strong> a) <span class="math">(C)</span> فوق <span class="math">y = x</span> على <span class="math">[0, 5[</span>، يقطعه عند <span class="math">x = 5</span>، تحته بعد <span class="math">5</span> &nbsp; b) <span class="math">u<sub>0</sub> = 2</span>، الحدود تتزايد وتتقارب نحو <span class="math">5</span>.</p><p><strong>2)</strong> a) <span class="math">2 ≤ u<sub>n</sub> &lt; 5</span> لكل <span class="math">n</span> &nbsp; b) <span class="math">(u<sub>n</sub>)</span> متزايدة تماما ومقاربة.</p><p><strong>3)</strong> <span class="math">5 - u<sub>n+1</sub> = [2u<sub>n</sub>/(2u<sub>n</sub> + 1)](5 - u<sub>n</sub>)</span>.</p><p><strong>4)</strong> a) <span class="math">2u<sub>n</sub>/(2u<sub>n</sub> + 1) ≤ 10/11</span> &nbsp; b) <span class="math">0 &lt; 5 - u<sub>n</sub> ≤ 3(10/11)<sup>n</sup></span>؛ <span class="math">lim u<sub>n</sub> = 5</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p>في هذا التمرين، نستعمل التمثيل البياني للتخمين، البرهان بالتراجع، دراسة الرتابة بإشارة الفرق، النقاط الثابتة، حساب النهاية. الهدف هو إثبات خاصية لكل عدد طبيعي <span class="math">n</span> ودراسة اتجاه تغير المتتالية وحساب النهاية وتحديد النقاط الثابتة.</p>
<p class="pedagogy-step">نستعمل التمثيل البياني أولا للتخمين، ثم نبرهن الجزء جبريا ولا نكتفي بالرسم؛ نحدد نقاط التقاطع مع المستقيم <span class="math">y = x</span> لأنها المرشحة للنهاية؛ نستعمل دراسة إشارة الفرق <span class="math">u<sub>n+1</sub> - u<sub>n</sub></span> أو إشارة <span class="math">f(x) - x</span> لأن المطلوب اتجاه التغير؛ نحسب النهاية باستعمال الحصر بين متتاليتين لهما نفس النهاية.</p>
<p><strong>1)</strong> ندرس إشارة <span class="math">f(x) - x</span>:</p>
      <p class="math-equation">f(x) - x = (2x<sup>2</sup> + 5)/(2x + 1) - x = (5 - x)/(2x + 1)</p>
      <p>على <span class="math">[0 ; +∞[</span> يكون المقام موجبا، إذن <span class="math">(C)</span> فوق المستقيم <span class="math">y = x</span> إذا <span class="math">0 ≤ x &lt; 5</span>، يقطعه عند <span class="math">x = 5</span>، ويكون تحته إذا <span class="math">x &gt; 5</span>.</p>
      <p>من التمثيل البياني، ابتداء من <span class="math">u<sub>0</sub> = 2</span>، تبدو الحدود متزايدة ومتقاربة نحو <span class="math">5</span>.</p>

<p class="pedagogy-step">نستعمل الحصر بالتراجع على ثلاث مراحل: التحقق عند <span class="math">n = 0</span>، ثم فرضية التراجع، ثم الانتقال من <span class="math">n</span> إلى <span class="math">n + 1</span>؛ ثم ندرس الرتابة بإشارة الفرق <span class="math">u<sub>n+1</sub> - u<sub>n</sub></span> وليس بالتخمين البياني فقط؛ نحسب النهاية باستعمال الحصر بين متتاليتين لهما نفس النهاية.</p>
<p><strong>2)</strong> عند <span class="math">n = 0</span>: <span class="math">2 ≤ u<sub>0</sub> = 2 &lt; 5</span>. إذا كان <span class="math">2 ≤ u<sub>n</sub> &lt; 5</span>، فإن:</p>
      <p class="math-equation">u<sub>n+1</sub> - 2 = (2u<sub>n</sub><sup>2</sup> + 5 - 4u<sub>n</sub> - 2)/(2u<sub>n</sub> + 1) = (2u<sub>n</sub><sup>2</sup> - 4u<sub>n</sub> + 3)/(2u<sub>n</sub> + 1)</p>
      <p>والبسط موجب لأن <span class="math">2x<sup>2</sup> - 4x + 3 = 2(x - 1)<sup>2</sup> + 1</span>، ومنه <span class="math">u<sub>n+1</sub> ≥ 2</span>.</p>
      <p>كما أن:</p>
      <p class="math-equation">5 - u<sub>n+1</sub> = [2u<sub>n</sub>/(2u<sub>n</sub> + 1)](5 - u<sub>n</sub>) &gt; 0</p>
      <p>إذن <span class="math">u<sub>n+1</sub> &lt; 5</span>، فتثبت الخاصية بالتراجع.</p>
      <p>ولدراسة الرتابة:</p>
      <p class="math-equation">u<sub>n+1</sub> - u<sub>n</sub> = (5 - u<sub>n</sub>)/(2u<sub>n</sub> + 1) &gt; 0</p>
      <p>إذن <span class="math">(u<sub>n</sub>)</span> متزايدة ومحدودة من الأعلى بـ <span class="math">5</span>، فهي متقاربة.</p>

<p class="pedagogy-step">نستعمل التمثيل البياني أولا للتخمين، ثم نبرهن الجزء جبريا ولا نكتفي بالرسم.</p>
<p><strong>3)</strong> نحسب مباشرة:</p>
      <p class="math-equation">5 - u<sub>n+1</sub> = 5 - (2u<sub>n</sub><sup>2</sup> + 5)/(2u<sub>n</sub> + 1) = [10u<sub>n</sub> + 5 - 2u<sub>n</sub><sup>2</sup> - 5]/(2u<sub>n</sub> + 1)</p>
      <p>أي:</p>
      <p class="math-equation">5 - u<sub>n+1</sub> = [2u<sub>n</sub>/(2u<sub>n</sub> + 1)](5 - u<sub>n</sub>)</p>

<p class="pedagogy-step">نستعمل الحصر بالتراجع على ثلاث مراحل: التحقق عند <span class="math">n = 0</span>، ثم فرضية التراجع، ثم الانتقال من <span class="math">n</span> إلى <span class="math">n + 1</span>؛ ثم ندرس الرتابة بإشارة الفرق <span class="math">u<sub>n+1</sub> - u<sub>n</sub></span> وليس بالتخمين البياني فقط؛ نحسب النهاية باستعمال الحصر بين متتاليتين لهما نفس النهاية.</p>
<p><strong>4)</strong> الدالة <span class="math">x ↦ 2x/(2x + 1)</span> متزايدة على <span class="math">[0 ; +∞[</span>. وبما أن <span class="math">u<sub>n</sub> &lt; 5</span>، فإن:</p>
      <p class="math-equation">2u<sub>n</sub>/(2u<sub>n</sub> + 1) &lt; 10/11</p>
      <p>وبالتالي نستعمل <span class="math">≤ 10/11</span>.</p>
      <p>من العلاقة السابقة:</p>
      <p class="math-equation">0 &lt; 5 - u<sub>n+1</sub> ≤ (10/11)(5 - u<sub>n</sub>)</p>
      <p>وبالتراجع، ومع <span class="math">5 - u<sub>0</sub> = 3</span>، نحصل على:</p>
      <p class="math-equation">0 &lt; 5 - u<sub>n</sub> ≤ 3(10/11)<sup>n</sup></p>
      <p>وبما أن <span class="math">(10/11)<sup>n</sup> → 0</span>، فإن <span class="math">5 - u<sub>n</sub> → 0</span>، ومنه:</p>
      <p class="math-equation">lim u<sub>n</sub> = 5</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نتبع الترتيب التالي: التخمين البياني، تحديد النقاط الثابتة، البرهان بالتراجع، دراسة الرتابة، حساب النهاية، ونكتب النتيجة النهائية في كل جزء.</p>
</div>`,
    solution: `<p><strong>1)</strong> ندرس إشارة <span class="math">f(x) - x</span>:</p>
      <p class="math-equation">f(x) - x = (2x<sup>2</sup> + 5)/(2x + 1) - x = (5 - x)/(2x + 1)</p>
      <p>على <span class="math">[0 ; +∞[</span> يكون المقام موجبا، إذن <span class="math">(C)</span> فوق المستقيم <span class="math">y = x</span> إذا <span class="math">0 ≤ x &lt; 5</span>، يقطعه عند <span class="math">x = 5</span>، ويكون تحته إذا <span class="math">x &gt; 5</span>.</p>
      <p>من التمثيل البياني، ابتداء من <span class="math">u<sub>0</sub> = 2</span>، تبدو الحدود متزايدة ومتقاربة نحو <span class="math">5</span>.</p>
      <p><strong>2)</strong> عند <span class="math">n = 0</span>: <span class="math">2 ≤ u<sub>0</sub> = 2 &lt; 5</span>. إذا كان <span class="math">2 ≤ u<sub>n</sub> &lt; 5</span>، فإن:</p>
      <p class="math-equation">u<sub>n+1</sub> - 2 = (2u<sub>n</sub><sup>2</sup> + 5 - 4u<sub>n</sub> - 2)/(2u<sub>n</sub> + 1) = (2u<sub>n</sub><sup>2</sup> - 4u<sub>n</sub> + 3)/(2u<sub>n</sub> + 1)</p>
      <p>والبسط موجب لأن <span class="math">2x<sup>2</sup> - 4x + 3 = 2(x - 1)<sup>2</sup> + 1</span>، ومنه <span class="math">u<sub>n+1</sub> ≥ 2</span>.</p>
      <p>كما أن:</p>
      <p class="math-equation">5 - u<sub>n+1</sub> = [2u<sub>n</sub>/(2u<sub>n</sub> + 1)](5 - u<sub>n</sub>) &gt; 0</p>
      <p>إذن <span class="math">u<sub>n+1</sub> &lt; 5</span>، فتثبت الخاصية بالتراجع.</p>
      <p>ولدراسة الرتابة:</p>
      <p class="math-equation">u<sub>n+1</sub> - u<sub>n</sub> = (5 - u<sub>n</sub>)/(2u<sub>n</sub> + 1) &gt; 0</p>
      <p>إذن <span class="math">(u<sub>n</sub>)</span> متزايدة ومحدودة من الأعلى بـ <span class="math">5</span>، فهي متقاربة.</p>
      <p><strong>3)</strong> نحسب مباشرة:</p>
      <p class="math-equation">5 - u<sub>n+1</sub> = 5 - (2u<sub>n</sub><sup>2</sup> + 5)/(2u<sub>n</sub> + 1) = [10u<sub>n</sub> + 5 - 2u<sub>n</sub><sup>2</sup> - 5]/(2u<sub>n</sub> + 1)</p>
      <p>أي:</p>
      <p class="math-equation">5 - u<sub>n+1</sub> = [2u<sub>n</sub>/(2u<sub>n</sub> + 1)](5 - u<sub>n</sub>)</p>
      <p><strong>4)</strong> الدالة <span class="math">x ↦ 2x/(2x + 1)</span> متزايدة على <span class="math">[0 ; +∞[</span>. وبما أن <span class="math">u<sub>n</sub> &lt; 5</span>، فإن:</p>
      <p class="math-equation">2u<sub>n</sub>/(2u<sub>n</sub> + 1) &lt; 10/11</p>
      <p>وبالتالي نستعمل <span class="math">≤ 10/11</span>.</p>
      <p>من العلاقة السابقة:</p>
      <p class="math-equation">0 &lt; 5 - u<sub>n+1</sub> ≤ (10/11)(5 - u<sub>n</sub>)</p>
      <p>وبالتراجع، ومع <span class="math">5 - u<sub>0</sub> = 3</span>، نحصل على:</p>
      <p class="math-equation">0 &lt; 5 - u<sub>n</sub> ≤ 3(10/11)<sup>n</sup></p>
      <p>وبما أن <span class="math">(10/11)<sup>n</sup> → 0</span>، فإن <span class="math">5 - u<sub>n</sub> → 0</span>، ومنه:</p>
      <p class="math-equation">lim u<sub>n</sub> = 5</p>`
  },  {
    id: "bac-2023-technical-math-subject-1",
    branch: "science",
    stream: "technical_math",
    year: "2023",
    title: "بكالوريا 2023 - تقني رياضي - الموضوع الأول",
    statementHtml: `<div class="bac-statement">
      <p><strong>التمرين: المتتاليات العددية</strong></p>
      <p>نعتبر المتتالية العددية <span class="math">(u<sub>n</sub>)</span> المعرفة بـ <span class="math">u<sub>0</sub> = 1</span>، ومن أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math-equation">u<sub>n+1</sub> = (2/3)u<sub>n</sub> + 1</p>
      <ol>
        <li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n</sub> &lt; 3</span>.</li>
        <li>بين أن المتتالية <span class="math">(u<sub>n</sub>)</span> متزايدة تماما.</li>
        <li>
          <p>نعتبر المتتالية العددية <span class="math">(v<sub>n</sub>)</span> المعرفة على <span class="math">ℕ</span> بـ:</p>
          <p class="math-equation">v<sub>n</sub> = u<sub>n</sub> - 3</p>
          <ol>
            <li>بين أن المتتالية <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">2/3</span>، ويطلب تعيين حدها الأول <span class="math">v<sub>0</sub></span>.</li>
            <li>عين عبارة الحد العام <span class="math">v<sub>n</sub></span> بدلالة <span class="math">n</span>، ثم استنتج أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n</sub> = -2(2/3)<sup>n</sup> + 3</span>.</li>
            <li>احسب <span class="math">lim u<sub>n</sub></span>.</li>
          </ol>
        </li>
        <li>
          <p>نضع من أجل كل عدد طبيعي <span class="math">n</span>:</p>
          <p class="math-equation">S<sub>n</sub> = v<sub>0</sub> + v<sub>1</sub> + ... + v<sub>n</sub> ، و T<sub>n</sub> = u<sub>0</sub> + u<sub>1</sub> + ... + u<sub>n</sub></p>
          <p>احسب <span class="math">S<sub>n</sub></span> بدلالة <span class="math">n</span>، ثم بين أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">T<sub>n</sub> = 3n - 3 + 4(2/3)<sup>n</sup></span>.</p>
        </li>
      </ol>
    </div>`,
    quickSolution: `<p><strong>1)</strong> <span class="math">u<sub>n</sub> &lt; 3</span> لكل <span class="math">n</span>.</p><p><strong>2)</strong> <span class="math">(u<sub>n</sub>)</span> متزايدة تماما.</p><p><strong>3)</strong> <span class="math">v<sub>0</sub> = -2</span>؛ <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">2/3</span>؛ <span class="math">v<sub>n</sub> = -2(2/3)<sup>n</sup></span>؛ <span class="math">u<sub>n</sub> = 3 - 2(2/3)<sup>n</sup></span>؛ <span class="math">lim u<sub>n</sub> = 3</span>.</p><p><strong>4)</strong> <span class="math">S<sub>n</sub> = -6(1 - (2/3)<sup>n+1</sup>)</span>؛ <span class="math">T<sub>n</sub> = 3n - 3 + 4(2/3)<sup>n</sup></span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p><strong>1) ما المطلوب؟</strong> نثبت أن كل حدود المتتالية أصغر من <span class="math">3</span>.</p><p><strong>الفكرة المستعملة:</strong> نستعمل البرهان بالتراجع لأن العلاقة التراجعية تعطينا <span class="math">u<sub>n+1</sub></span> بدلالة <span class="math">u<sub>n</sub></span>.</p><p><strong>التطبيق:</strong> عند <span class="math">n=0</span> لدينا <span class="math">u<sub>0</sub>=1&lt;3</span>. نفرض أن <span class="math">u<sub>n</sub>&lt;3</span>. عندئذ:</p><p class="math-equation">u<sub>n+1</sub> = (2/3)u<sub>n</sub> + 1 &lt; (2/3)×3 + 1 = 3</p><p><strong>النتيجة:</strong> بالتحقق والانتقال، <span class="math">u<sub>n</sub>&lt;3</span> لكل <span class="math">n∈ℕ</span>.</p>
<p><strong>2) ما المطلوب؟</strong> ندرس اتجاه تغير <span class="math">(u<sub>n</sub>)</span>.</p><p><strong>الفكرة المستعملة:</strong> نحسب الفرق <span class="math">u<sub>n+1</sub>-u<sub>n</sub></span> ونستعمل الحصر السابق.</p><p><strong>التطبيق:</strong></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub> = (2/3)u<sub>n</sub> + 1 - u<sub>n</sub> = 1 - (1/3)u<sub>n</sub> = (3-u<sub>n</sub>)/3</p><p>وبما أن <span class="math">u<sub>n</sub>&lt;3</span> فإن <span class="math">3-u<sub>n</sub>&gt;0</span>.</p><p><strong>النتيجة:</strong> <span class="math">u<sub>n+1</sub>-u<sub>n</sub>&gt;0</span>، إذن <span class="math">(u<sub>n</sub>)</span> متزايدة تماما.</p>
<p><strong>3-أ) ما المطلوب؟</strong> نثبت أن <span class="math">(v<sub>n</sub>)</span> هندسية ونحدد حدها الأول.</p><p><strong>الفكرة المستعملة:</strong> المتتالية <span class="math">v<sub>n</sub>=u<sub>n</sub>-3</span> تقيس بعد <span class="math">u<sub>n</sub></span> عن العدد الثابت <span class="math">3</span>، ولذلك تحول العلاقة الخطية إلى هندسية.</p><p><strong>التطبيق:</strong></p><p class="math-equation">v<sub>n+1</sub> = u<sub>n+1</sub>-3 = (2/3)u<sub>n</sub> + 1 - 3</p><p class="math-equation">v<sub>n+1</sub> = (2/3)u<sub>n</sub> - 2 = (2/3)(u<sub>n</sub>-3) = (2/3)v<sub>n</sub></p><p>كما أن:</p><p class="math-equation">v<sub>0</sub> = u<sub>0</sub>-3 = -2</p><p><strong>النتيجة:</strong> <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">2/3</span> وحدها الأول <span class="math">v<sub>0</sub> = -2</span>.</p>
<p><strong>3-ب) ما المطلوب؟</strong> نكتب <span class="math">v<sub>n</sub></span> ثم نستخرج <span class="math">u<sub>n</sub></span>.</p><p><strong>الفكرة المستعملة:</strong> نستعمل صيغة الحد العام لمتتالية هندسية: <span class="math">v<sub>n</sub>=v<sub>0</sub>q<sup>n</sup></span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">v<sub>n</sub> = -2(2/3)<sup>n</sup></p><p>وبما أن <span class="math">v<sub>n</sub>=u<sub>n</sub>-3</span> فإن:</p><p class="math-equation">u<sub>n</sub> = v<sub>n</sub> + 3 = 3 - 2(2/3)<sup>n</sup></p><p><strong>النتيجة:</strong> <span class="math">u<sub>n</sub> = -2(2/3)<sup>n</sup> + 3</span>.</p>
<p><strong>3-ج) ما المطلوب؟</strong> نحسب نهاية <span class="math">u<sub>n</sub></span>.</p><p><strong>الفكرة المستعملة:</strong> نستعمل أن <span class="math">|2/3|&lt;1</span>، وبالتالي <span class="math">(2/3)^n→0</span>.</p><p><strong>التطبيق والنتيجة:</strong></p><p class="math-equation">lim u<sub>n</sub> = 3 - 2×0 = 3</p>
<p><strong>4) ما المطلوب؟</strong> نحسب مجموع <span class="math">v_k</span> ثم نستنتج مجموع <span class="math">u_k</span>.</p><p><strong>الفكرة المستعملة:</strong> <span class="math">S<sub>n</sub></span> مجموع هندسي من <span class="math">0</span> إلى <span class="math">n</span>، وعدد حدوده <span class="math">n+1</span>. ثم نستعمل <span class="math">u_k=v_k+3</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">S<sub>n</sub> = -2[1-(2/3)<sup>n+1</sup>]/(1-2/3) = -6[1-(2/3)<sup>n+1</sup>]</p><p>وبما أن <span class="math">u_k=v_k+3</span>، فإن:</p><p class="math-equation">T<sub>n</sub> = S<sub>n</sub> + 3(n+1)</p><p class="math-equation">T<sub>n</sub> = -6[1-(2/3)<sup>n+1</sup>] + 3(n+1)</p><p>وبتبسيط الحد الهندسي:</p><p class="math-equation">6(2/3)<sup>n+1</sup> = 4(2/3)<sup>n</sup></p><p><strong>النتيجة:</strong></p><p class="math-equation">T<sub>n</sub> = 3n - 3 + 4(2/3)<sup>n</sup></p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> أثبتنا أولا أن الحدود أصغر من <span class="math">3</span> بالتراجع، ثم استعملنا هذا الحصر في الرتابة. بعدها حولنا العلاقة الخطية إلى متتالية هندسية بواسطة <span class="math">v_n=u_n-3</span>، فاستخرجنا الحد العام والنهاية، ثم حسبنا المجموعين باستعمال مجموع هندسي.</p>
</div>`,
    conceptHints: [
      { title: "الحصر بالتراجع", hint: "تحقق من <span class='math'>u<sub>0</sub>&lt;3</span>، ثم افترض <span class='math'>u<sub>n</sub>&lt;3</span>. عوض في <span class='math'>u<sub>n+1</sub>=2/3 u<sub>n</sub>+1</span> وقارن الناتج بالعدد 3." },
      { title: "رتابة المتتالية", hint: "احسب <span class='math'>u<sub>n+1</sub>-u<sub>n</sub></span>. ستظهر العبارة <span class='math'>(3-u<sub>n</sub>)/3</span>، واستعمل الحصر السابق لتحديد الإشارة." },
      { title: "المتتالية المساعدة", hint: "احسب <span class='math'>v<sub>n+1</sub>=u<sub>n+1</sub>-3</span>، ثم عوض <span class='math'>u<sub>n+1</sub></span>. حاول إخراج العامل <span class='math'>u<sub>n</sub>-3</span> حتى تصل إلى <span class='math'>v<sub>n+1</sub>=qv<sub>n</sub></span>." },
      { title: "النهاية باستعمال متتالية هندسية", hint: "بعد كتابة <span class='math'>v<sub>n</sub></span>، لاحظ أن <span class='math'>|2/3|&lt;1</span>، لذلك <span class='math'>(2/3)<sup>n</sup></span> يؤول إلى 0. ارجع بعدها إلى <span class='math'>u<sub>n</sub>=v<sub>n</sub>+3</span>." },
      { title: "حساب المجموع", hint: "<span class='math'>S<sub>n</sub></span> مجموع هندسي لحدود <span class='math'>v<sub>n</sub></span> من 0 إلى n. أما <span class='math'>T<sub>n</sub></span> فاستعمل العلاقة <span class='math'>u<sub>k</sub>=v<sub>k</sub>+3</span> ثم اجمع الثابت 3 عدد <span class='math'>n+1</span> مرة." }
    ],
    solution: `<p><strong>1)</strong> عند <span class="math">n=0</span>: <span class="math">u<sub>0</sub>=1&lt;3</span>. إذا كان <span class="math">u<sub>n</sub>&lt;3</span>، فإن:</p><p class="math-equation">u<sub>n+1</sub>=(2/3)u<sub>n</sub>+1&lt;2+1=3</p><p>إذن <span class="math">u<sub>n</sub>&lt;3</span> لكل <span class="math">n</span>.</p><p><strong>2)</strong></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=1-(1/3)u<sub>n</sub>=(3-u<sub>n</sub>)/3&gt;0</p><p>إذن <span class="math">(u<sub>n</sub>)</span> متزايدة تماما.</p><p><strong>3)</strong> لدينا:</p><p class="math-equation">v<sub>n+1</sub>=u<sub>n+1</sub>-3=(2/3)(u<sub>n</sub>-3)=(2/3)v<sub>n</sub></p><p>و<span class="math">v<sub>0</sub>=u<sub>0</sub>-3=-2</span>. إذن <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">2/3</span> و:</p><p class="math-equation">v<sub>n</sub> = -2(2/3)<sup>n</sup></p><p>ومنه:</p><p class="math-equation">u<sub>n</sub>=v<sub>n</sub>+3=3-2(2/3)<sup>n</sup></p><p>وبالتالي <span class="math">lim u<sub>n</sub>=3</span>.</p><p><strong>4)</strong></p><p class="math-equation">S<sub>n</sub> = -2[1-(2/3)<sup>n+1</sup>]/(1-2/3) = -6[1-(2/3)<sup>n+1</sup>]</p><p>وبما أن <span class="math">u_k=v_k+3</span>، فإن:</p><p class="math-equation">T<sub>n</sub> = S<sub>n</sub>+3(n+1)=3n-3+4(2/3)<sup>n</sup></p>`
  },  {
    id: "bac-2023-technical-math-subject-2",
    branch: "science",
    stream: "technical_math",
    year: "2023",
    title: "بكالوريا 2023 - تقني رياضي - الموضوع الثاني",
    statementHtml: `<div class="bac-statement">
      <p><strong>التمرين: المتتاليات العددية</strong></p>
      <p>نعتبر المتتالية العددية <span class="math">(u<sub>n</sub>)</span> المعرفة بـ <span class="math">u<sub>0</sub> = 1</span>، ومن أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math-equation">u<sub>n+1</sub> = 1 - 1/(3u<sub>n</sub> + 1)</p>
      <ol>
        <li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n</sub> &gt; 2/3</span>.</li>
        <li>بين أن المتتالية <span class="math">(u<sub>n</sub>)</span> متناقصة تماما.</li>
        <li>
          <p>نعتبر المتتالية العددية <span class="math">(v<sub>n</sub>)</span> المعرفة على <span class="math">ℕ</span> بـ:</p>
          <p class="math-equation">v<sub>n</sub> = 3 - 2/u<sub>n</sub></p>
          <ol>
            <li>بين أن المتتالية <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">1/3</span>، ويطلب تعيين حدها الأول <span class="math">v<sub>0</sub></span>.</li>
            <li>عين عبارة الحد العام <span class="math">v<sub>n</sub></span> بدلالة <span class="math">n</span>، ثم استنتج أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n</sub> = 2/(3 - (1/3)<sup>n</sup>)</span>.</li>
            <li>احسب <span class="math">lim u<sub>n</sub></span>.</li>
          </ol>
        </li>
        <li>
          <p>نضع من أجل كل عدد طبيعي <span class="math">n</span>:</p>
          <p class="math-equation">S<sub>n</sub> = v<sub>0</sub> + v<sub>1</sub> + ... + v<sub>n</sub> ، و T<sub>n</sub> = 2/u<sub>0</sub> + 2/u<sub>1</sub> + ... + 2/u<sub>n</sub></p>
          <p>احسب <span class="math">S<sub>n</sub></span> بدلالة <span class="math">n</span>، ثم بين أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">T<sub>n</sub> = 3n + 1/2[3 + (1/3)<sup>n</sup>]</span>.</p>
        </li>
      </ol>
    </div>`,
    quickSolution: `<p><strong>1)</strong> <span class="math">u<sub>n</sub> &gt; 2/3</span> لكل <span class="math">n</span>.</p><p><strong>2)</strong> <span class="math">(u<sub>n</sub>)</span> متناقصة تماما.</p><p><strong>3)</strong> <span class="math">v<sub>0</sub> = 1</span>؛ <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">1/3</span>؛ <span class="math">v<sub>n</sub> = (1/3)<sup>n</sup></span>؛ <span class="math">u<sub>n</sub> = 2/(3 - (1/3)<sup>n</sup>)</span>؛ <span class="math">lim u<sub>n</sub> = 2/3</span>.</p><p><strong>4)</strong> <span class="math">S<sub>n</sub> = 3/2[1 - (1/3)<sup>n+1</sup>]</span>؛ <span class="math">T<sub>n</sub> = 3n + 1/2[3 + (1/3)<sup>n</sup>]</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p><strong>1) ما المطلوب؟</strong> نثبت أن كل حدود المتتالية أكبر من <span class="math">2/3</span>.</p><p><strong>الفكرة المستعملة:</strong> نستعمل البرهان بالتراجع، وبعد الفرض نكتب <span class="math">u<sub>n+1</sub></span> على شكل كسر مناسب.</p><p><strong>التطبيق:</strong> عند <span class="math">n=0</span>: <span class="math">u<sub>0</sub>=1&gt;2/3</span>. نفرض أن <span class="math">u<sub>n</sub>&gt;2/3</span>. لدينا:</p><p class="math-equation">u<sub>n+1</sub> = 1 - 1/(3u<sub>n</sub>+1) = 3u<sub>n</sub>/(3u<sub>n</sub>+1)</p><p>وبما أن <span class="math">3u<sub>n</sub>+1&gt;0</span>، فإن:</p><p class="math-equation">u<sub>n+1</sub> &gt; 2/3 ⇔ 9u<sub>n</sub> &gt; 6u<sub>n</sub> + 2 ⇔ 3u<sub>n</sub> &gt; 2</p><p>وهذا صحيح حسب فرضية التراجع.</p><p><strong>النتيجة:</strong> <span class="math">u<sub>n</sub>&gt;2/3</span> لكل <span class="math">n∈ℕ</span>.</p>
<p><strong>2) ما المطلوب؟</strong> ندرس اتجاه تغير المتتالية.</p><p><strong>الفكرة المستعملة:</strong> نحسب الفرق <span class="math">u<sub>n+1</sub>-u<sub>n</sub></span> ونستعمل الحصر السابق لتحديد إشارته.</p><p><strong>التطبيق:</strong></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub> = 3u<sub>n</sub>/(3u<sub>n</sub>+1) - u<sub>n</sub></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub> = u<sub>n</sub>(2-3u<sub>n</sub>)/(3u<sub>n</sub>+1)</p><p>وبما أن <span class="math">u<sub>n</sub>&gt;2/3</span> فإن <span class="math">2-3u<sub>n</sub>&lt;0</span>، كما أن المقام موجب.</p><p><strong>النتيجة:</strong> <span class="math">u<sub>n+1</sub>-u<sub>n</sub>&lt;0</span>، إذن <span class="math">(u<sub>n</sub>)</span> متناقصة تماما.</p>
<p><strong>3-أ) ما المطلوب؟</strong> نثبت أن <span class="math">(v<sub>n</sub>)</span> هندسية ونحدد <span class="math">v<sub>0</sub></span>.</p><p><strong>الفكرة المستعملة:</strong> نكتب <span class="math">2/u<sub>n+1</sub></span> باستعمال العلاقة <span class="math">u<sub>n+1</sub>=3u<sub>n</sub>/(3u<sub>n</sub>+1)</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">2/u<sub>n+1</sub> = 2(3u<sub>n</sub>+1)/(3u<sub>n</sub>) = 2 + 2/(3u<sub>n</sub>)</p><p>إذن:</p><p class="math-equation">v<sub>n+1</sub> = 3 - 2/u<sub>n+1</sub> = 1 - 2/(3u<sub>n</sub>) = (1/3)(3 - 2/u<sub>n</sub>) = (1/3)v<sub>n</sub></p><p>كما أن:</p><p class="math-equation">v<sub>0</sub> = 3 - 2/u<sub>0</sub> = 1</p><p><strong>النتيجة:</strong> <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">1/3</span> وحدها الأول <span class="math">v<sub>0</sub>=1</span>.</p>
<p><strong>3-ب) ما المطلوب؟</strong> نكتب <span class="math">v<sub>n</sub></span> ثم نستخرج <span class="math">u<sub>n</sub></span>.</p><p><strong>الفكرة المستعملة:</strong> نستعمل صيغة الحد العام لمتتالية هندسية، ثم نحل العلاقة <span class="math">v<sub>n</sub>=3-2/u<sub>n</sub></span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">v<sub>n</sub> = (1/3)<sup>n</sup></p><p>ومن <span class="math">v<sub>n</sub>=3-2/u<sub>n</sub></span> نحصل على:</p><p class="math-equation">2/u<sub>n</sub> = 3 - v<sub>n</sub></p><p class="math-equation">u<sub>n</sub> = 2/(3-v<sub>n</sub>) = 2/(3-(1/3)<sup>n</sup>)</p><p><strong>النتيجة:</strong> <span class="math">u<sub>n</sub> = 2/(3-(1/3)<sup>n</sup>)</span>.</p>
<p><strong>3-ج) ما المطلوب؟</strong> نحسب نهاية المتتالية.</p><p><strong>الفكرة المستعملة:</strong> بما أن <span class="math">|1/3|&lt;1</span> فإن <span class="math">(1/3)^n→0</span>.</p><p><strong>التطبيق والنتيجة:</strong></p><p class="math-equation">lim u<sub>n</sub> = 2/(3-0) = 2/3</p>
<p><strong>4) ما المطلوب؟</strong> نحسب <span class="math">S<sub>n</sub></span> ثم نستنتج <span class="math">T<sub>n</sub></span>.</p><p><strong>الفكرة المستعملة:</strong> <span class="math">S<sub>n</sub></span> مجموع هندسي. أما <span class="math">T<sub>n</sub></span> فنستعمل العلاقة <span class="math">v_k=3-2/u_k</span> أي <span class="math">2/u_k=3-v_k</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">S<sub>n</sub> = [1-(1/3)<sup>n+1</sup>]/(1-1/3) = 3/2[1-(1/3)<sup>n+1</sup>]</p><p>ثم:</p><p class="math-equation">T<sub>n</sub> = Σ<sub>k=0</sub><sup>n</sup>(3-v_k) = 3(n+1)-S<sub>n</sub></p><p class="math-equation">T<sub>n</sub> = 3(n+1) - 3/2[1-(1/3)<sup>n+1</sup>]</p><p>وبتبسيط الحد الأخير نحصل على:</p><p class="math-equation">T<sub>n</sub> = 3n + 1/2[3 + (1/3)<sup>n</sup>]</p><p><strong>النتيجة:</strong> الصيغتان المطلوبتان هما <span class="math">S<sub>n</sub>=3/2[1-(1/3)<sup>n+1</sup>]</span> و<span class="math">T<sub>n</sub>=3n+1/2[3+(1/3)<sup>n</sup>]</span>.</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> أثبتنا أولا الحصر بالتراجع، ثم استعملناه في إشارة الفرق لإثبات التناقص. بعد ذلك حوّلنا العلاقة باستعمال <span class="math">v_n=3-2/u_n</span> إلى متتالية هندسية، فاستخرجنا الحد العام والنهاية، ثم حسبنا المجموعين باستعمال علاقة <span class="math">2/u_k=3-v_k</span>.</p>
</div>`,
    conceptHints: [
      { title: "الحصر بالتراجع", hint: "حوّل العلاقة أولا إلى <span class='math'>u<sub>n+1</sub>=3u<sub>n</sub>/(3u<sub>n</sub>+1)</span>، ثم قارن هذا الكسر مع <span class='math'>2/3</span> باستعمال أن المقام موجب." },
      { title: "رتابة المتتالية", hint: "احسب <span class='math'>u<sub>n+1</sub>-u<sub>n</sub></span> في مقام واحد. ستظهر العبارة <span class='math'>u<sub>n</sub>(2-3u<sub>n</sub>)/(3u<sub>n</sub>+1)</span>، ثم استعمل الحصر السابق." },
      { title: "المتتالية المساعدة", hint: "احسب <span class='math'>2/u<sub>n+1</sub></span> بدل حساب <span class='math'>v<sub>n+1</sub></span> مباشرة؛ هذا يجعل التعويض أسهل ويظهر العامل <span class='math'>1/3</span>." },
      { title: "النهاية باستعمال متتالية هندسية", hint: "بعد إيجاد <span class='math'>v<sub>n</sub>=(1/3)<sup>n</sup></span>، عوض في العلاقة <span class='math'>2/u<sub>n</sub>=3-v<sub>n</sub></span>، ثم استعمل أن <span class='math'>(1/3)<sup>n</sup></span> يؤول إلى 0." },
      { title: "حساب المجموع", hint: "<span class='math'>S<sub>n</sub></span> مجموع هندسي. ولحساب <span class='math'>T<sub>n</sub></span> استخرج من تعريف <span class='math'>v<sub>k</sub></span> العلاقة <span class='math'>2/u<sub>k</sub>=3-v<sub>k</sub></span>، ثم اجمع الطرفين من 0 إلى n." }
    ],
    solution: `<p><strong>1)</strong> نكتب <span class="math">u<sub>n+1</sub>=3u<sub>n</sub>/(3u<sub>n</sub>+1)</span>. عند <span class="math">n=0</span>: <span class="math">u<sub>0</sub>=1&gt;2/3</span>. إذا كان <span class="math">u<sub>n</sub>&gt;2/3</span>، فإن:</p><p class="math-equation">u<sub>n+1</sub>&gt;2/3 ⇔ 9u<sub>n</sub>&gt;6u<sub>n</sub>+2 ⇔ u<sub>n</sub>&gt;2/3</p><p>إذن <span class="math">u<sub>n</sub>&gt;2/3</span> لكل <span class="math">n</span>.</p><p><strong>2)</strong></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=u<sub>n</sub>(2-3u<sub>n</sub>)/(3u<sub>n</sub>+1)&lt;0</p><p>إذن <span class="math">(u<sub>n</sub>)</span> متناقصة تماما.</p><p><strong>3)</strong> لدينا:</p><p class="math-equation">2/u<sub>n+1</sub>=2(3u<sub>n</sub>+1)/(3u<sub>n</sub>)=2+2/(3u<sub>n</sub>)</p><p>ومنه <span class="math">v<sub>n+1</sub>=(1/3)v<sub>n</sub></span>، كما أن <span class="math">v<sub>0</sub>=1</span>. إذن:</p><p class="math-equation">v<sub>n</sub>=(1/3)<sup>n</sup></p><p>ومن <span class="math">v<sub>n</sub>=3-2/u<sub>n</sub></span> نحصل على:</p><p class="math-equation">u<sub>n</sub>=2/(3-(1/3)<sup>n</sup>)</p><p>وبالتالي <span class="math">lim u<sub>n</sub>=2/3</span>.</p><p><strong>4)</strong></p><p class="math-equation">S<sub>n</sub>=3/2[1-(1/3)<sup>n+1</sup>]</p><p>ومن <span class="math">2/u<sub>k</sub>=3-v<sub>k</sub></span> نجد:</p><p class="math-equation">T<sub>n</sub>=3(n+1)-S<sub>n</sub>=3n+1/2[3+(1/3)<sup>n</sup>]</p>`
  },  {
    id: "bac-2023-math-subject-1",
    branch: "science",
    stream: "mathematics",
    year: "2023",
    title: "بكالوريا 2023 - الموضوع الأول - رياضيات",
    figureHtml: `<figure class="bac-figure" aria-label="تمثيل بياني للدالة f والمستقيم y=x">
      <svg class="bac-graph" viewBox="0 0 420 300" role="img">
        <rect x="0" y="0" width="420" height="300" rx="10" class="graph-bg"></rect>
        <g class="grid-lines">
          <path d="M70 25V270 M130 25V270 M190 25V270 M250 25V270 M310 25V270 M370 25V270 M40 40H385 M40 90H385 M40 140H385 M40 190H385 M40 240H385"></path>
        </g>
        <g class="axes">
          <path d="M40 240H390"></path>
          <path d="M70 275V25"></path>
        </g>
        <g class="axis-labels">
          <text x="63" y="258">0</text><text x="124" y="258">1</text><text x="184" y="258">2</text><text x="244" y="258">3</text><text x="304" y="258">4</text><text x="364" y="258">5</text>
          <text x="52" y="194">1</text><text x="52" y="144">2</text><text x="52" y="94">3</text><text x="52" y="44">4</text><text x="48" y="293">-1</text>
        </g>
        <path class="line-delta" d="M40 270L370 40"></path>
        <path class="curve-f" d="M70 40 C95 91 125 121 190 140 C250 158 315 167 370 173"></path>
        <g class="graph-points">
          <circle cx="70" cy="40" r="4"></circle>
          <circle cx="190" cy="140" r="4"></circle>
          <circle cx="310" cy="90" r="4"></circle>
        </g>
        <text x="286" y="82" class="graph-label">(D)</text>
        <text x="108" y="92" class="graph-label">(C<tspan baseline-shift="sub">f</tspan>)</text>
      </svg>
    </figure>`,
    statementHtml: `<div class="bac-statement">
      <p><strong>التمرين الثاني: المتتاليات العددية</strong></p>
      <p>الدالة <span class="math">f</span> المعرفة على <span class="math">[0 ; +∞[</span> بـ:</p>
      <p class="math-equation">f(x) = (x + 4)/(x + 1)</p>
      <p>تمثيلها البياني هو <span class="math">(C<sub>f</sub>)</span>، و <span class="math">(D)</span> هو المستقيم ذو المعادلة <span class="math">y = x</span>.</p>
      <p>المتتالية العددية <span class="math">(u<sub>n</sub>)</span> معرفة بـ:</p>
      <p class="math-equation">u<sub>0</sub> = 0 ، ومن أجل كل عدد طبيعي n: u<sub>n+1</sub> = f(u<sub>n</sub>)</p>
      <ol>
        <li>أعد رسم الشكل، ثم مثل على حامل محور الفواصل الحدود <span class="math">u<sub>0</sub>، u<sub>1</sub>، u<sub>2</sub>، u<sub>3</sub></span> دون حسابها، مبرزا خطوط التمثيل.</li>
        <li>ضع تخمينا حول اتجاه تغير المتتالية <span class="math">(u<sub>n</sub>)</span> وتقاربها.</li>
      </ol>
      <p>المتتالية العددية <span class="math">(v<sub>n</sub>)</span> المعرفة على <span class="math">N</span> بـ:</p>
      <p class="math-equation">v<sub>n</sub> = (u<sub>n</sub> - 2)/(u<sub>n</sub> + 2)</p>
      <ol start="2">
        <li>
          <ol>
            <li>بين أن <span class="math">(v<sub>n</sub>)</span> متتالية هندسية أساسها <span class="math">-1/3</span>، ثم عين حدها الأول <span class="math">v<sub>0</sub></span>.</li>
            <li>عين عبارة الحد العام <span class="math">v<sub>n</sub></span> بدلالة <span class="math">n</span>، ثم استنتج أنه من أجل كل عدد طبيعي <span class="math">n</span>:</li>
          </ol>
          <p class="math-equation">u<sub>n</sub> = -2 + 4/(1 + (-1/3)<sup>n</sup>)</p>
          <ol start="3"><li>احسب <span class="math">lim u<sub>n</sub></span>.</li></ol>
        </li>
        <li>
          <p>من أجل كل عدد طبيعي <span class="math">n</span> نضع:</p>
          <p class="math-equation">S<sub>n</sub> = v<sub>0</sub> + v<sub>1</sub> + ... + v<sub>n</sub></p>
          <p class="math-equation">T<sub>n</sub> = 1/(u<sub>0</sub> + 2) + 1/(u<sub>1</sub> + 2) + ... + 1/(u<sub>n</sub> + 2)</p>
          <ol>
            <li>احسب <span class="math">S<sub>n</sub></span> بدلالة <span class="math">n</span>.</li>
            <li>بين أنه من أجل كل عدد طبيعي <span class="math">n</span>:</li>
          </ol>
          <p class="math-equation">T<sub>n</sub> = 1/16 [4n + 7 + (-1/3)<sup>n</sup>]</p>
        </li>
      </ol>
    </div>`,
    quickSolution: `<p><strong>1)</strong> تمثيل بياني: <span class="math">u<sub>0</sub> = 0</span>، الحدود تتناوب حول <span class="math">2</span> وتتقارب نحوه.</p><p><strong>2)</strong> a) <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">-1/3</span>، <span class="math">v<sub>0</sub> = -1</span> &nbsp; b) <span class="math">v<sub>n</sub> = -(-1/3)<sup>n</sup></span>؛ <span class="math">u<sub>n</sub> = -2 + 4/(1 + (-1/3)<sup>n</sup>)</span> &nbsp; c) <span class="math">lim u<sub>n</sub> = 2</span>.</p><p><strong>3)</strong> a) <span class="math">S<sub>n</sub> = -3/4 [1 - (-1/3)<sup>n+1</sup>]</span> &nbsp; b) <span class="math">T<sub>n</sub> = 1/16 [4n + 7 + (-1/3)<sup>n</sup>]</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p>في هذا التمرين، نستعمل التمثيل البياني للتخمين، دراسة الرتابة بإشارة الفرق، متتالية مساعدة، المتتالية الهندسية، النقاط الثابتة، حساب النهاية، حساب مجموع حدود. الهدف هو دراسة اتجاه تغير المتتالية وإيجاد عبارة الحد العام وحساب النهاية وحساب مجموع حدود وتحديد النقاط الثابتة.</p>
<p class="pedagogy-step">نستعمل التمثيل البياني أولا للتخمين، ثم نبرهن الجزء جبريا ولا نكتفي بالرسم؛ نحدد نقاط التقاطع مع المستقيم <span class="math">y = x</span> لأنها المرشحة للنهاية؛ نستعمل النقاط الثابتة لتحديد النهاية الممكنة.</p>
<p><strong>1)</strong> بالقراءة البيانية انطلاقا من <span class="math">u<sub>0</sub> = 0</span> واستعمال المنحنى <span class="math">(C<sub>f</sub>)</span> ثم المستقيم <span class="math">y = x</span>، تبدو الحدود متناوبة حول العدد <span class="math">2</span> ومتقاربة نحوه.</p>

<p class="pedagogy-step">نعرف متتالية مساعدة حتى نحول العلاقة التراجعية إلى علاقة هندسية بسيطة؛ بعد إيجاد العبارة الصريحة، نستعمل نهاية المتتالية الهندسية <span class="math">q<sup>n</sup></span> لحساب النهاية.</p>
<p><strong>2)</strong> لدينا:</p>
      <p class="math-equation">v<sub>0</sub> = (u<sub>0</sub> - 2)/(u<sub>0</sub> + 2) = -1</p>
      <p>كما أن:</p>
      <p class="math-equation">v<sub>n+1</sub> = (u<sub>n+1</sub> - 2)/(u<sub>n+1</sub> + 2)</p>
      <p>وبتعويض <span class="math">u<sub>n+1</sub> = (u<sub>n</sub> + 4)/(u<sub>n</sub> + 1)</span> نحصل على:</p>
      <p class="math-equation">v<sub>n+1</sub> = -1/3 × (u<sub>n</sub> - 2)/(u<sub>n</sub> + 2) = -1/3 v<sub>n</sub></p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">-1/3</span> وحدها الأول <span class="math">v<sub>0</sub> = -1</span>، وبالتالي:</p>
      <p class="math-equation">v<sub>n</sub> = -(-1/3)<sup>n</sup></p>
      <p>ومن <span class="math">v<sub>n</sub> = (u<sub>n</sub> - 2)/(u<sub>n</sub> + 2)</span> نستنتج:</p>
      <p class="math-equation">u<sub>n</sub> = 2(1 + v<sub>n</sub>)/(1 - v<sub>n</sub>) = -2 + 4/(1 + (-1/3)<sup>n</sup>)</p>
      <p>وبما أن <span class="math">(-1/3)<sup>n</sup> → 0</span>، فإن:</p>
      <p class="math-equation">lim u<sub>n</sub> = 2</p>

<p class="pedagogy-step">نعرف متتالية مساعدة حتى نحول العلاقة التراجعية إلى علاقة هندسية بسيطة؛ نستعمل صيغة مجموع حدود متتالية هندسية أو خاصية التلاصق.</p>
<p><strong>3)</strong> بما أن <span class="math">(v<sub>n</sub>)</span> هندسية، فإن:</p>
      <p class="math-equation">S<sub>n</sub> = -[1 - (-1/3)<sup>n+1</sup>]/[1 + 1/3] = -3/4 [1 - (-1/3)<sup>n+1</sup>]</p>
      <p>ومن العلاقة <span class="math">v<sub>k</sub> = (u<sub>k</sub> - 2)/(u<sub>k</sub> + 2)</span> نحصل على:</p>
      <p class="math-equation">1/(u<sub>k</sub> + 2) = (1 - v<sub>k</sub>)/4</p>
      <p>إذن:</p>
      <p class="math-equation">T<sub>n</sub> = (n + 1)/4 - S<sub>n</sub>/4</p>
      <p>وبتعويض عبارة <span class="math">S<sub>n</sub></span> نجد:</p>
      <p class="math-equation">T<sub>n</sub> = 1/16 [4n + 7 + (-1/3)<sup>n</sup>]</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نتبع الترتيب التالي: التخمين البياني، تحديد النقاط الثابتة، دراسة الرتابة، استعمال متتالية مساعدة، حساب النهاية، حساب المجموع، ونكتب النتيجة النهائية في كل جزء.</p>
</div>`,
    conceptHints: [
      {
        "title": "رتابة المتتالية",
        "hint": "لدراسة الاتجاه، احسب u_{n+1}-u_n أو درس إشارة f(x)-x على المجال المعطى، واستعمل الحصر لتحديد الإشارة دون الاكتفاء بالتخمين البياني."
      },
      {
        "title": "المتتالية المساعدة",
        "hint": "عرف v_n حتى نحول العلاقة التراجعية إلى علاقة هندسية بسيطة، ثم أثبت ذلك بحساب النسبة v_{n+1}/v_n."
      },
      {
        "title": "حساب النهاية",
        "hint": "استعمل العبارة الصريحة أو الحصر أو حقيقة أن q^n يؤول إلى 0 عندما |q|<1 لاستنتاج النهاية."
      },
      {
        "title": "حساب المجموع",
        "hint": "حدد نوع الحدود (هندسية، متداخلة، لوغاريتمية) ثم استعمل الصيغة المناسبة للمجموع."
      },
      {
        "title": "النقاط الثابتة",
        "hint": "حل المعادلة f(x)=x؛ هذه النقاط هي المرشحة الوحيدة للنهاية إذا كانت المتتالية متقاربة."
      }
    ],
    solution: `<p><strong>1)</strong> بالقراءة البيانية انطلاقا من <span class="math">u<sub>0</sub> = 0</span> واستعمال المنحنى <span class="math">(C<sub>f</sub>)</span> ثم المستقيم <span class="math">y = x</span>، تبدو الحدود متناوبة حول العدد <span class="math">2</span> ومتقاربة نحوه.</p>
      <p><strong>2)</strong> لدينا:</p>
      <p class="math-equation">v<sub>0</sub> = (u<sub>0</sub> - 2)/(u<sub>0</sub> + 2) = -1</p>
      <p>كما أن:</p>
      <p class="math-equation">v<sub>n+1</sub> = (u<sub>n+1</sub> - 2)/(u<sub>n+1</sub> + 2)</p>
      <p>وبتعويض <span class="math">u<sub>n+1</sub> = (u<sub>n</sub> + 4)/(u<sub>n</sub> + 1)</span> نحصل على:</p>
      <p class="math-equation">v<sub>n+1</sub> = -1/3 × (u<sub>n</sub> - 2)/(u<sub>n</sub> + 2) = -1/3 v<sub>n</sub></p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">-1/3</span> وحدها الأول <span class="math">v<sub>0</sub> = -1</span>، وبالتالي:</p>
      <p class="math-equation">v<sub>n</sub> = -(-1/3)<sup>n</sup></p>
      <p>ومن <span class="math">v<sub>n</sub> = (u<sub>n</sub> - 2)/(u<sub>n</sub> + 2)</span> نستنتج:</p>
      <p class="math-equation">u<sub>n</sub> = 2(1 + v<sub>n</sub>)/(1 - v<sub>n</sub>) = -2 + 4/(1 + (-1/3)<sup>n</sup>)</p>
      <p>وبما أن <span class="math">(-1/3)<sup>n</sup> → 0</span>، فإن:</p>
      <p class="math-equation">lim u<sub>n</sub> = 2</p>
      <p><strong>3)</strong> بما أن <span class="math">(v<sub>n</sub>)</span> هندسية، فإن:</p>
      <p class="math-equation">S<sub>n</sub> = -[1 - (-1/3)<sup>n+1</sup>]/[1 + 1/3] = -3/4 [1 - (-1/3)<sup>n+1</sup>]</p>
      <p>ومن العلاقة <span class="math">v<sub>k</sub> = (u<sub>k</sub> - 2)/(u<sub>k</sub> + 2)</span> نحصل على:</p>
      <p class="math-equation">1/(u<sub>k</sub> + 2) = (1 - v<sub>k</sub>)/4</p>
      <p>إذن:</p>
      <p class="math-equation">T<sub>n</sub> = (n + 1)/4 - S<sub>n</sub>/4</p>
      <p>وبتعويض عبارة <span class="math">S<sub>n</sub></span> نجد:</p>
      <p class="math-equation">T<sub>n</sub> = 1/16 [4n + 7 + (-1/3)<sup>n</sup>]</p>`
  },  {
    id: "bac-2025-technical-math-subject-1",
    branch: "science",
    stream: "technical_math",
    year: "2025",
    title: "بكالوريا 2025 - تقني رياضي - الموضوع الأول",
    statementHtml: `<div class="bac-statement">
      <p><strong>التمرين: المتتاليات العددية</strong></p>
      <p>نعتبر المتتالية العددية <span class="math">(u<sub>n</sub>)</span> المعرفة بـ:</p>
      <p class="math-equation">u<sub>0</sub> = e<sup>2</sup> ، ومن أجل كل عدد طبيعي n: u<sub>n+1</sub> = 2√u<sub>n</sub></p>
      <ol>
        <li><ol><li>احسب الحدين <span class="math">u<sub>1</sub></span> و <span class="math">u<sub>2</sub></span> ثم خمن اتجاه تغير المتتالية.</li><li>برهن بالتراجع أنه من أجل كل <span class="math">n</span>: <span class="math">4 &lt; u<sub>n</sub> ≤ e<sup>2</sup></span>.</li><li>ادرس اتجاه تغير <span class="math">(u<sub>n</sub>)</span>.</li></ol></li>
        <li><p>نعتبر المتتالية <span class="math">(v<sub>n</sub>)</span> المعرفة على <span class="math">ℕ</span> بـ:</p><p class="math-equation">v<sub>n</sub> = ln u<sub>n</sub> - 2ln2</p><ol><li>بين أن <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">1/2</span>، ثم اكتب <span class="math">v<sub>n</sub></span> بدلالة <span class="math">n</span>.</li><li>استنتج كتابة <span class="math">u<sub>n</sub></span> بدلالة <span class="math">n</span>، ثم احسب <span class="math">lim u<sub>n</sub></span>.</li></ol></li>
        <li><ol><li>احسب بدلالة <span class="math">n</span> المجموع <span class="math">S<sub>n</sub> = v<sub>0</sub> + v<sub>1</sub> + ... + v<sub>n</sub></span>.</li><li>استنتج بدلالة <span class="math">n</span> الجداء <span class="math">P<sub>n</sub> = u<sub>0</sub> × u<sub>1</sub> × ... × u<sub>n</sub></span>.</li></ol></li>
      </ol>
    </div>`,
    quickSolution: `<p><strong>1)</strong> <span class="math">u<sub>1</sub> = 2e</span>، <span class="math">u<sub>2</sub> = 2√(2e)</span>؛ التخمين: متناقصة؛ <span class="math">4 &lt; u<sub>n</sub> ≤ e<sup>2</sup></span>؛ <span class="math">(u<sub>n</sub>)</span> متناقصة تماما.</p><p><strong>2)</strong> <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">1/2</span>؛ <span class="math">v<sub>n</sub> = (2 - 2ln2)/2<sup>n</sup></span>؛ <span class="math">u<sub>n</sub> = 4e<sup>(2 - 2ln2)/2<sup>n</sup></sup></span>؛ <span class="math">lim u<sub>n</sub> = 4</span>.</p><p><strong>3)</strong> <span class="math">S<sub>n</sub> = (4 - 4ln2)(1 - 1/2<sup>n+1</sup>)</span>؛ <span class="math">P<sub>n</sub> = 4<sup>n+1</sup>e<sup>(4 - 4ln2)(1 - 1/2<sup>n+1</sup>)</sup></span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p><strong>1-أ) ما المطلوب؟</strong> نحسب أول حدين بعد <span class="math">u<sub>0</sub></span> ثم نستعملهما لتخمين اتجاه التغير.</p><p><strong>الفكرة المستعملة:</strong> نطبق علاقة التراجع مباشرة، والتخمين لا يعوض البرهان.</p><p><strong>التطبيق:</strong></p><p class="math-equation">u<sub>1</sub> = 2√u<sub>0</sub> = 2√(e<sup>2</sup>) = 2e</p><p class="math-equation">u<sub>2</sub> = 2√u<sub>1</sub> = 2√(2e)</p><p>نلاحظ أن <span class="math">e<sup>2</sup> &gt; 2e &gt; 2√(2e)</span>، لذلك نخمن أن المتتالية متناقصة.</p><p><strong>النتيجة:</strong> <span class="math">u<sub>1</sub> = 2e</span> و <span class="math">u<sub>2</sub> = 2√(2e)</span>.</p>
<p><strong>1-ب) ما المطلوب؟</strong> نثبت الحصر <span class="math">4 &lt; u<sub>n</sub> ≤ e<sup>2</sup></span> لكل <span class="math">n</span>.</p><p><strong>الفكرة المستعملة:</strong> نستعمل البرهان بالتراجع لأن الحد التالي معرف بدلالة الحد السابق.</p><p><strong>التطبيق:</strong> عند <span class="math">n=0</span> لدينا <span class="math">u<sub>0</sub>=e<sup>2</sup></span>، وبما أن <span class="math">e&gt;2</span> فإن <span class="math">4&lt;u<sub>0</sub>≤e<sup>2</sup></span>. نفرض <span class="math">4&lt;u<sub>n</sub>≤e<sup>2</sup></span>. من تزايد الجذر: <span class="math">√u<sub>n</sub>&gt;2</span> و <span class="math">√u<sub>n</sub>≤e</span>، ومنه <span class="math">4&lt;u<sub>n+1</sub>=2√u<sub>n</sub>≤2e≤e<sup>2</sup></span>.</p><p><strong>النتيجة:</strong> الحصر صحيح لكل <span class="math">n∈ℕ</span>.</p>
<p><strong>1-ج) ما المطلوب؟</strong> ندرس اتجاه تغير المتتالية.</p><p><strong>الفكرة المستعملة:</strong> نستعمل الفرق ونربط إشارته بالحصر السابق.</p><p><strong>التطبيق:</strong></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub> = 2√u<sub>n</sub>-u<sub>n</sub> = √u<sub>n</sub>(2-√u<sub>n</sub>)</p><p>وبما أن <span class="math">u<sub>n</sub>&gt;4</span> فإن <span class="math">√u<sub>n</sub>&gt;2</span>، وبالتالي الفرق سالب.</p><p><strong>النتيجة:</strong> <span class="math">(u<sub>n</sub>)</span> متناقصة تماما.</p>
<p><strong>2-أ) ما المطلوب؟</strong> نثبت أن <span class="math">(v<sub>n</sub>)</span> هندسية.</p><p><strong>الفكرة المستعملة:</strong> اللوغاريتم مناسب لأن العلاقة فيها جذر: <span class="math">ln(√a)=(1/2)ln a</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">ln u<sub>n+1</sub> = ln(2√u<sub>n</sub>) = ln2 + (1/2)ln u<sub>n</sub></p><p class="math-equation">v<sub>n+1</sub> = ln u<sub>n+1</sub>-2ln2 = (1/2)(ln u<sub>n</sub>-2ln2) = (1/2)v<sub>n</sub></p><p>كما أن <span class="math">v<sub>0</sub>=ln(e<sup>2</sup>)-2ln2=2-2ln2</span>.</p><p><strong>النتيجة:</strong> <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">1/2</span> و <span class="math">v<sub>n</sub>=(2-2ln2)/2<sup>n</sup></span>.</p>
<p><strong>2-ب) ما المطلوب؟</strong> نكتب <span class="math">u<sub>n</sub></span> ونحسب النهاية.</p><p><strong>الفكرة المستعملة:</strong> نرجع من اللوغاريتم إلى <span class="math">u<sub>n</sub></span> بالرفع بالأساس <span class="math">e</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">ln u<sub>n</sub> = 2ln2 + (2-2ln2)/2<sup>n</sup></p><p class="math-equation">u<sub>n</sub> = 4e<sup>(2-2ln2)/2<sup>n</sup></sup></p><p>وبما أن <span class="math">(1/2)<sup>n</sup>→0</span> فإن <span class="math">lim u<sub>n</sub>=4</span>.</p>
<p><strong>3-أ) ما المطلوب؟</strong> نحسب مجموعا هندسيا فيه <span class="math">n+1</span> حد.</p><p><strong>الفكرة المستعملة:</strong> نستعمل صيغة مجموع متتالية هندسية أساسها <span class="math">1/2</span>.</p><p><strong>التطبيق والنتيجة:</strong></p><p class="math-equation">S<sub>n</sub> = (2-2ln2)[1-(1/2)<sup>n+1</sup>]/(1-1/2) = (4-4ln2)(1-1/2<sup>n+1</sup>)</p>
<p><strong>3-ب) ما المطلوب؟</strong> نحسب الجداء <span class="math">P<sub>n</sub></span>.</p><p><strong>الفكرة المستعملة:</strong> نحول الجداء إلى مجموع باستعمال اللوغاريتم.</p><p><strong>التطبيق:</strong> من <span class="math">v<sub>k</sub>=ln u<sub>k</sub>-2ln2</span> نجد <span class="math">ln u<sub>k</sub>=v<sub>k</sub>+2ln2</span>. إذن:</p><p class="math-equation">ln P<sub>n</sub> = S<sub>n</sub> + 2(n+1)ln2</p><p class="math-equation">P<sub>n</sub> = 4<sup>n+1</sup>e<sup>S<sub>n</sub></sup> = 4<sup>n+1</sup>e<sup>(4-4ln2)(1-1/2<sup>n+1</sup>)</sup></p><p><strong>النتيجة:</strong> الجداء كتبناه بدلالة <span class="math">n</span> بعد تحويله إلى مجموع لوغاريتمي.</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> بدأنا بحساب الحدود الأولى، ثم أثبتنا الحصر بالتراجع، ثم الرتابة بالفرق. بعد ذلك حولنا العلاقة الجذرية إلى متتالية هندسية باستعمال اللوغاريتم، فحسبنا النهاية والمجموع، ثم حولنا الجداء إلى مجموع باللوغاريتم.</p></div>`,
    conceptHints: [
      { title: "الحصر بالتراجع", hint: "تحقق من <span class='math'>n=0</span>، ثم افترض أن <span class='math'>u<sub>n</sub></span> داخل الحصر. استعمل تزايد دالة الجذر لتحويل الحصر على <span class='math'>u<sub>n</sub></span> إلى حصر على <span class='math'>u<sub>n+1</sub>=2√u<sub>n</sub></span>." },
      { title: "رتابة المتتالية", hint: "احسب <span class='math'>u<sub>n+1</sub>-u<sub>n</sub></span>، ثم أخرج <span class='math'>√u<sub>n</sub></span> عاملا مشتركا واستعمل الحصر السابق لتحديد إشارة <span class='math'>2-√u<sub>n</sub></span>." },
      { title: "المتتالية المساعدة", hint: "احسب <span class='math'>v<sub>n+1</sub></span>، عوض <span class='math'>u<sub>n+1</sub>=2√u<sub>n</sub></span>، ثم استعمل خواص اللوغاريتم للوصول إلى <span class='math'>v<sub>n+1</sub>=qv<sub>n</sub></span>." },
      { title: "النهاية باستعمال متتالية هندسية", hint: "بعد الوصول إلى <span class='math'>v<sub>n</sub></span>، لاحظ أن <span class='math'>(1/2)<sup>n</sup></span> يؤول إلى 0، ثم احسب نهاية <span class='math'>ln(u<sub>n</sub>)</span> قبل الرجوع إلى <span class='math'>u<sub>n</sub></span>." },
      { title: "حساب المجموع", hint: "<span class='math'>S<sub>n</sub></span> مجموع هندسي من 0 إلى n، أي فيه <span class='math'>n+1</span> حد. استعمل صيغة مجموع المتتالية الهندسية مع الأساس <span class='math'>1/2</span>." },
      { title: "تحويل الجداء إلى مجموع", hint: "خذ <span class='math'>ln(P_n)</span> حتى يتحول الجداء إلى مجموع. بعد ذلك استعمل <span class='math'>ln(u<sub>k</sub>)=v<sub>k</sub>+2ln2</span> ثم ارفع بالأساس e." }
    ],
    solution: `<p><strong>1)</strong> <span class="math">u<sub>1</sub>=2e</span> و <span class="math">u<sub>2</sub>=2√(2e)</span>، ومنه نخمن أن المتتالية متناقصة.</p><p>بالتراجع: عند <span class="math">n=0</span> الخاصية <span class="math">4&lt;u<sub>0</sub>≤e<sup>2</sup></span> صحيحة. إذا كان <span class="math">4&lt;u<sub>n</sub>≤e<sup>2</sup></span> فإن <span class="math">√u<sub>n</sub>&gt;2</span> و<span class="math">√u<sub>n</sub>≤e</span>، وبالتالي <span class="math">4&lt;u<sub>n+1</sub>≤2e≤e<sup>2</sup></span>.</p><p>كما أن <span class="math">u<sub>n+1</sub>-u<sub>n</sub>=√u<sub>n</sub>(2-√u<sub>n</sub>)&lt;0</span>، إذن <span class="math">(u<sub>n</sub>)</span> متناقصة تماما.</p><p><strong>2)</strong> <span class="math">ln u<sub>n+1</sub>=ln2+(1/2)ln u<sub>n</sub></span>، ومنه <span class="math">v<sub>n+1</sub>=(1/2)v<sub>n</sub></span>. وبما أن <span class="math">v<sub>0</sub>=2-2ln2</span> فإن <span class="math">v<sub>n</sub>=(2-2ln2)/2<sup>n</sup></span>.</p><p>إذن <span class="math">u<sub>n</sub>=4e<sup>(2-2ln2)/2<sup>n</sup></sup></span>، وبالتالي <span class="math">lim u<sub>n</sub>=4</span>.</p><p><strong>3)</strong></p><p class="math-equation">S<sub>n</sub>=(4-4ln2)(1-1/2<sup>n+1</sup>)</p><p>ومن <span class="math">ln u<sub>k</sub>=v<sub>k</sub>+2ln2</span> نحصل على:</p><p class="math-equation">P<sub>n</sub>=4<sup>n+1</sup>e<sup>(4-4ln2)(1-1/2<sup>n+1</sup>)</sup></p>`
  },  {
    id: "bac-2025-technical-math-subject-2",
    branch: "science",
    stream: "technical_math",
    year: "2025",
    title: "بكالوريا 2025 - تقني رياضي - الموضوع الثاني",
    statementHtml: `<div class="bac-statement">
      <p><strong>التمرين: المتتاليات العددية</strong></p>
      <p>نعتبر المتتالية العددية <span class="math">(u<sub>n</sub>)</span> المعرفة بـ <span class="math">u<sub>0</sub> = 0</span>، ومن أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math-equation">u<sub>n+1</sub> = (3 + 5u<sub>n</sub>)/(3 + u<sub>n</sub>)</p>
      <ol>
        <li>
          <ol>
            <li>تحقق أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n+1</sub> = 5 - 12/(3 + u<sub>n</sub>)</span>.</li>
            <li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">0 ≤ u<sub>n</sub> &lt; 3</span>.</li>
            <li>ادرس اتجاه تغير المتتالية <span class="math">(u<sub>n</sub>)</span>.</li>
          </ol>
        </li>
        <li>
          <p>نعتبر المتتالية العددية <span class="math">(v<sub>n</sub>)</span> المعرفة على <span class="math">ℕ</span> بـ:</p>
          <p class="math-equation">v<sub>n</sub> = (-3 + u<sub>n</sub>)/(1 + u<sub>n</sub>)</p>
          <ol>
            <li>بين أن المتتالية <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">1/3</span>، ثم اكتب <span class="math">v<sub>n</sub></span> بدلالة <span class="math">n</span>.</li>
            <li>استنتج عبارة <span class="math">u<sub>n</sub></span> بدلالة <span class="math">n</span>، ثم احسب <span class="math">lim u<sub>n</sub></span>.</li>
          </ol>
        </li>
        <li>
          <ol>
            <li>بين أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">4/(1 + u<sub>n</sub>) = 1 - v<sub>n</sub></span>.</li>
            <li>استنتج حساب المجموع <span class="math">S<sub>n</sub></span> بدلالة <span class="math">n</span> حيث:</li>
          </ol>
          <p class="math-equation">S<sub>n</sub> = 4/(1 + u<sub>0</sub>) + 4/(1 + u<sub>1</sub>) + ... + 4/(1 + u<sub>n</sub>)</p>
        </li>
      </ol>
    </div>`,
    quickSolution: `<p><strong>1)</strong> <span class="math">u<sub>n+1</sub> = 5 - 12/(3 + u<sub>n</sub>)</span>؛ <span class="math">0 ≤ u<sub>n</sub> &lt; 3</span> لكل <span class="math">n</span>؛ <span class="math">(u<sub>n</sub>)</span> متزايدة تماما.</p><p><strong>2)</strong> <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">1/3</span>، <span class="math">v<sub>0</sub> = -3</span>؛ <span class="math">v<sub>n</sub> = -3(1/3)<sup>n</sup></span>؛ <span class="math">u<sub>n</sub> = (3 + v<sub>n</sub>)/(1 - v<sub>n</sub>) = 3(3<sup>n</sup> - 1)/(3<sup>n</sup> + 3)</span>؛ <span class="math">lim u<sub>n</sub> = 3</span>.</p><p><strong>3)</strong> <span class="math">4/(1 + u<sub>n</sub>) = 1 - v<sub>n</sub></span>؛ <span class="math">S<sub>n</sub> = n + 1 + (9/2)(1 - 1/3<sup>n+1</sup>)</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p><strong>1-أ) ما المطلوب؟</strong> نعيد كتابة العلاقة التراجعية على شكل أبسط فيه ثابت زائد كسر.</p><p><strong>الفكرة المستعملة:</strong> نقسم البسط بطريقة تجعل <span class="math">3+u<sub>n</sub></span> يظهر في البسط.</p><p><strong>التطبيق:</strong></p><p class="math-equation">3 + 5u<sub>n</sub> = 5(3 + u<sub>n</sub>) - 12</p><p>لذلك:</p><p class="math-equation">u<sub>n+1</sub> = [5(3 + u<sub>n</sub>) - 12]/(3 + u<sub>n</sub>) = 5 - 12/(3 + u<sub>n</sub>)</p><p><strong>النتيجة:</strong> الصيغة المطلوبة صحيحة لكل <span class="math">n</span>.</p>
<p><strong>1-ب) ما المطلوب؟</strong> نثبت أن حدود المتتالية تبقى في المجال <span class="math">[0,3[</span>.</p><p><strong>الفكرة المستعملة:</strong> نستعمل البرهان بالتراجع لأن الخاصية مطلوبة لكل عدد طبيعي.</p><p><strong>التطبيق:</strong> عند <span class="math">n=0</span> لدينا <span class="math">u<sub>0</sub>=0</span>، إذن <span class="math">0≤u<sub>0</sub>&lt;3</span>. نفرض أن <span class="math">0≤u<sub>n</sub>&lt;3</span>. بما أن <span class="math">3+u<sub>n</sub>&gt;0</span> فإن <span class="math">u<sub>n+1</sub>=(3+5u<sub>n</sub>)/(3+u<sub>n</sub>)≥0</span>. ومن جهة أخرى:</p><p class="math-equation">u<sub>n+1</sub> &lt; 3 ⇔ 3 + 5u<sub>n</sub> &lt; 3(3 + u<sub>n</sub>) ⇔ 2u<sub>n</sub> &lt; 6</p><p>وهذه صحيحة لأن <span class="math">u<sub>n</sub>&lt;3</span>.</p><p><strong>النتيجة:</strong> بالتحقق والانتقال: <span class="math">0≤u<sub>n</sub>&lt;3</span> لكل <span class="math">n∈ℕ</span>.</p>
<p><strong>1-ج) ما المطلوب؟</strong> ندرس اتجاه تغير المتتالية.</p><p><strong>الفكرة المستعملة:</strong> نحسب الفرق <span class="math">u<sub>n+1</sub>-u<sub>n</sub></span> ونستعمل الحصر السابق لتحديد إشارته.</p><p><strong>التطبيق:</strong></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub> = (3+5u<sub>n</sub>)/(3+u<sub>n</sub>) - u<sub>n</sub></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub> = (3 + 2u<sub>n</sub> - u<sub>n</sub><sup>2</sup>)/(3+u<sub>n</sub>) = ((3-u<sub>n</sub>)(1+u<sub>n</sub>))/(3+u<sub>n</sub>)</p><p>وبما أن <span class="math">0≤u<sub>n</sub>&lt;3</span> فإن العوامل <span class="math">3-u<sub>n</sub></span> و<span class="math">1+u<sub>n</sub></span> و<span class="math">3+u<sub>n</sub></span> موجبة.</p><p><strong>النتيجة:</strong> <span class="math">u<sub>n+1</sub>-u<sub>n</sub>&gt;0</span>، إذن <span class="math">(u<sub>n</sub>)</span> متزايدة تماما.</p>
<p><strong>2-أ) ما المطلوب؟</strong> نثبت أن المتتالية المساعدة <span class="math">(v<sub>n</sub>)</span> هندسية.</p><p><strong>الفكرة المستعملة:</strong> نحسب <span class="math">v<sub>n+1</sub></span> ثم نعوض <span class="math">u<sub>n+1</sub></span> بالعلاقة التراجعية، والهدف الوصول إلى <span class="math">v<sub>n+1</sub>=qv<sub>n</sub></span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">u<sub>n+1</sub>-3 = (3+5u<sub>n</sub>)/(3+u<sub>n</sub>) - 3 = 2(u<sub>n</sub>-3)/(3+u<sub>n</sub>)</p><p class="math-equation">u<sub>n+1</sub>+1 = (3+5u<sub>n</sub>)/(3+u<sub>n</sub>) + 1 = 6(1+u<sub>n</sub>)/(3+u<sub>n</sub>)</p><p>إذن:</p><p class="math-equation">v<sub>n+1</sub> = (u<sub>n+1</sub>-3)/(u<sub>n+1</sub>+1) = (1/3)(u<sub>n</sub>-3)/(u<sub>n</sub>+1) = (1/3)v<sub>n</sub></p><p>كما أن <span class="math">v<sub>0</sub>=(0-3)/(0+1)=-3</span>.</p><p><strong>النتيجة:</strong> <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">1/3</span> و:</p><p class="math-equation">v<sub>n</sub> = -3(1/3)<sup>n</sup></p>
<p><strong>2-ب) ما المطلوب؟</strong> نكتب <span class="math">u<sub>n</sub></span> بدلالة <span class="math">n</span> ثم نحسب النهاية.</p><p><strong>الفكرة المستعملة:</strong> نحل العلاقة <span class="math">v<sub>n</sub>=(u<sub>n</sub>-3)/(u<sub>n</sub>+1)</span> بالنسبة إلى <span class="math">u<sub>n</sub></span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">v<sub>n</sub>(u<sub>n</sub>+1)=u<sub>n</sub>-3</p><p class="math-equation">u<sub>n</sub>(1-v<sub>n</sub>)=3+v<sub>n</sub></p><p class="math-equation">u<sub>n</sub>=(3+v<sub>n</sub>)/(1-v<sub>n</sub>)</p><p>وبتعويض <span class="math">v<sub>n</sub> = -3(1/3)<sup>n</sup></span> نحصل على:</p><p class="math-equation">u<sub>n</sub> = 3(3<sup>n</sup>-1)/(3<sup>n</sup>+3)</p><p>وعندما <span class="math">n→+∞</span> فإن <span class="math">v<sub>n</sub>→0</span>.</p><p><strong>النتيجة:</strong> <span class="math">lim u<sub>n</sub> = 3</span>.</p>
<p><strong>3-أ) ما المطلوب؟</strong> نربط الحد <span class="math">4/(1+u<sub>n</sub>)</span> بالمتتالية <span class="math">v<sub>n</sub></span>.</p><p><strong>الفكرة المستعملة:</strong> ننطلق من تعريف <span class="math">v<sub>n</sub></span> ونحسب <span class="math">1-v<sub>n</sub></span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">1-v<sub>n</sub> = 1 - (u<sub>n</sub>-3)/(u<sub>n</sub>+1) = (u<sub>n</sub>+1-u<sub>n</sub>+3)/(u<sub>n</sub>+1)</p><p><strong>النتيجة:</strong></p><p class="math-equation">1-v<sub>n</sub> = 4/(1+u<sub>n</sub>)</p>
<p><strong>3-ب) ما المطلوب؟</strong> نحسب <span class="math">S<sub>n</sub></span>.</p><p><strong>الفكرة المستعملة:</strong> نستبدل كل حد من المجموع بـ <span class="math">1-v<sub>k</sub></span>، ثم نستعمل مجموع المتتالية الهندسية <span class="math">(v<sub>n</sub>)</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">S<sub>n</sub> = Σ<sub>k=0</sub><sup>n</sup>(1-v<sub>k</sub>) = n+1 - Σ<sub>k=0</sub><sup>n</sup>v<sub>k</sub></p><p>وبما أن <span class="math">v<sub>k</sub> = -3(1/3)<sup>k</sup></span>، فإن:</p><p class="math-equation">Σ<sub>k=0</sub><sup>n</sup>v<sub>k</sub> = -3[1-(1/3)<sup>n+1</sup>]/(1-1/3) = -9/2(1-1/3<sup>n+1</sup>)</p><p><strong>النتيجة:</strong></p><p class="math-equation">S<sub>n</sub> = n+1 + (9/2)(1 - 1/3<sup>n+1</sup>)</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> بدأنا بتحويل العلاقة التراجعية، ثم أثبتنا الحصر بالتراجع واستعملناه لدراسة الرتابة. بعد ذلك حولنا المتتالية بفضل <span class="math">v<sub>n</sub></span> إلى هندسية، فاستخرجنا <span class="math">u<sub>n</sub></span> والنهاية، ثم حسبنا المجموع باستبدال كل حد بـ <span class="math">1-v<sub>k</sub></span>.</p>
</div>`,
    conceptHints: [
      { title: "تحويل العلاقة", hint: "اكتب البسط <span class='math'>3+5u<sub>n</sub></span> على شكل <span class='math'>5(3+u<sub>n</sub>)-12</span>، ثم اقسم على <span class='math'>3+u<sub>n</sub></span> للحصول على الصيغة المطلوبة." },
      { title: "الحصر بالتراجع", hint: "ابدأ من <span class='math'>u<sub>0</sub></span>، ثم افترض أن <span class='math'>u<sub>n</sub></span> بين 0 و3. لإثبات أن <span class='math'>u<sub>n+1</sub>&lt;3</span>، اضرب في <span class='math'>3+u<sub>n</sub></span> لأنه موجب واستعمل <span class='math'>u<sub>n</sub>&lt;3</span>." },
      { title: "رتابة المتتالية", hint: "احسب <span class='math'>u<sub>n+1</sub>-u<sub>n</sub></span> واجمع الحدود في كسر واحد، ثم حاول تحليل البسط باستعمال العاملين <span class='math'>3-u<sub>n</sub></span> و<span class='math'>1+u<sub>n</sub></span>." },
      { title: "المتتالية المساعدة", hint: "احسب كلا من <span class='math'>u<sub>n+1</sub>-3</span> و<span class='math'>u<sub>n+1</sub>+1</span> بدلالة <span class='math'>u<sub>n</sub></span>، ثم خذ النسبة بينهما للوصول إلى <span class='math'>v<sub>n+1</sub>=qv<sub>n</sub></span>." },
      { title: "النهاية باستعمال متتالية هندسية", hint: "بعد كتابة <span class='math'>v<sub>n</sub></span>، استعمل أن <span class='math'>(1/3)<sup>n</sup></span> يؤول إلى 0، ثم حل علاقة <span class='math'>v<sub>n</sub></span> مع <span class='math'>u<sub>n</sub></span> أو عوض مباشرة في الصيغة الصريحة." },
      { title: "حساب المجموع", hint: "استعمل العلاقة <span class='math'>4/(1+u<sub>n</sub>)=1-v<sub>n</sub></span> لتحويل <span class='math'>S<sub>n</sub></span> إلى مجموع ثوابت ناقص مجموع هندسي." }
    ],
    solution: `<p><strong>1)</strong> لدينا <span class="math">3+5u<sub>n</sub> = 5(3+u<sub>n</sub>) - 12</span>، ومنه:</p><p class="math-equation">u<sub>n+1</sub> = 5 - 12/(3+u<sub>n</sub>)</p><p>نبرهن بالتراجع أن <span class="math">0≤u<sub>n</sub>&lt;3</span>. عند <span class="math">n=0</span>: <span class="math">u<sub>0</sub>=0</span>. إذا كان <span class="math">0≤u<sub>n</sub>&lt;3</span> فإن <span class="math">u<sub>n+1</sub>=(3+5u<sub>n</sub>)/(3+u<sub>n</sub>)≥0</span>، كما أن <span class="math">u<sub>n+1</sub>&lt;3</span> يكافئ <span class="math">2u<sub>n</sub>&lt;6</span>، وهي صحيحة.</p><p>ولدراسة الرتابة:</p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub> = ((3-u<sub>n</sub>)(1+u<sub>n</sub>))/(3+u<sub>n</sub>) &gt; 0</p><p>إذن <span class="math">(u<sub>n</sub>)</span> متزايدة تماما.</p><p><strong>2)</strong> نحسب:</p><p class="math-equation">u<sub>n+1</sub>-3 = 2(u<sub>n</sub>-3)/(3+u<sub>n</sub>)</p><p class="math-equation">u<sub>n+1</sub>+1 = 6(1+u<sub>n</sub>)/(3+u<sub>n</sub>)</p><p>إذن <span class="math">v<sub>n+1</sub>=(1/3)v<sub>n</sub></span>، و<span class="math">v<sub>0</sub>=-3</span>، ومنه:</p><p class="math-equation">v<sub>n</sub> = -3(1/3)<sup>n</sup></p><p>ومن <span class="math">v<sub>n</sub>=(u<sub>n</sub>-3)/(u<sub>n</sub>+1)</span> نجد:</p><p class="math-equation">u<sub>n</sub> = (3+v<sub>n</sub>)/(1-v<sub>n</sub>) = 3(3<sup>n</sup>-1)/(3<sup>n</sup>+3)</p><p>وبالتالي <span class="math">lim u<sub>n</sub>=3</span>.</p><p><strong>3)</strong> من تعريف <span class="math">v<sub>n</sub></span>:</p><p class="math-equation">1-v<sub>n</sub> = 4/(1+u<sub>n</sub>)</p><p>إذن:</p><p class="math-equation">S<sub>n</sub> = Σ<sub>k=0</sub><sup>n</sup>(1-v<sub>k</sub>) = n+1 - Σ<sub>k=0</sub><sup>n</sup>v<sub>k</sub></p><p>وبما أن <span class="math">v<sub>k</sub> = -3(1/3)<sup>k</sup></span> فإن:</p><p class="math-equation">S<sub>n</sub> = n+1 + (9/2)(1 - 1/3<sup>n+1</sup>)</p>`
  },  {
    id: "bac-2025-math-subject-2",
    branch: "science",
    stream: "mathematics",
    year: "2025",
    title: "بكالوريا 2025 - الموضوع الثاني - رياضيات",
    statementHtml: `<div class="bac-statement">
      <p><strong>التمرين الرابع: المتتاليات العددية</strong></p>
      <p>لتكن الدالة <span class="math">f</span> المعرفة على المجال <span class="math">[-1 ; -1/2]</span> كما يلي:</p>
      <p class="math-equation">f(x) = (-x<sup>2</sup> + x)/(x<sup>2</sup> + 1)</p>
      <ol><li><p>بين أن <span class="math">f</span> متزايدة تماما على المجال <span class="math">[-1 ; -1/2]</span>.</p><p>بين أن <span class="math">f([-1 ; -1/2]) ⊂ [-1 ; -1/2]</span>.</p></li></ol>
      <p>نعتبر المتتالية العددية <span class="math">(u<sub>n</sub>)</span> المعرفة كما يلي:</p>
      <p class="math-equation">u<sub>0</sub> = -1/2 ، ومن أجل كل عدد طبيعي n: u<sub>n+1</sub> = f(u<sub>n</sub>)</p>
      <ol start="2"><li><ol><li>برهن أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">-1 &lt; u<sub>n</sub> ≤ -1/2</span>.</li><li>احسب <span class="math">u<sub>1</sub></span> ثم خمن اتجاه تغير المتتالية <span class="math">(u<sub>n</sub>)</span>.</li><li>بين أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n+1</sub> + 1 ≤ 4/5 (u<sub>n</sub> + 1)</span>.</li></ol></li><li><ol><li>استنتج أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">0 &lt; u<sub>n</sub> + 1 ≤ 1/2 (4/5)<sup>n</sup></span>، ثم احسب <span class="math">lim u<sub>n</sub></span>.</li><li>ادرس اتجاه تغير المتتالية <span class="math">(u<sub>n</sub>)</span>.</li></ol></li><li><p>من أجل كل عدد طبيعي <span class="math">n</span> نضع:</p><p class="math-equation">S<sub>n</sub> = u<sub>0</sub> + u<sub>1</sub> + ... + u<sub>n</sub></p><ol><li>بين أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">S<sub>n</sub> ≤ 3/2 - n - 5/2 (4/5)<sup>n+1</sup></span>.</li><li>استنتج <span class="math">lim S<sub>n</sub></span>.</li></ol></li></ol>
    </div>`,
    quickSolution: `<p><strong>1)</strong> <span class="math">f</span> متزايدة تماما على <span class="math">[-1, -1/2]</span>؛ <span class="math">f([-1, -1/2]) = [-1, -3/5] ⊂ [-1, -1/2]</span>.</p><p><strong>2)</strong> a) <span class="math">-1 &lt; u<sub>n</sub> ≤ -1/2</span> لكل <span class="math">n</span> &nbsp; b) <span class="math">u<sub>1</sub> = -3/5</span>؛ التخمين: متناقصة &nbsp; c) <span class="math">u<sub>n+1</sub> + 1 ≤ 4/5 (u<sub>n</sub> + 1)</span>.</p><p><strong>3)</strong> a) <span class="math">0 &lt; u<sub>n</sub> + 1 ≤ 1/2 (4/5)<sup>n</sup></span>؛ <span class="math">lim u<sub>n</sub> = -1</span> &nbsp; b) <span class="math">(u<sub>n</sub>)</span> متناقصة تماما.</p><p><strong>4)</strong> a) <span class="math">S<sub>n</sub> ≤ 3/2 - n - 5/2 (4/5)<sup>n+1</sup></span> &nbsp; b) <span class="math">lim S<sub>n</sub> = -∞</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p>في هذا التمرين، نستعمل دراسة تغير الدالة بالمشتقة، البرهان بالتراجع، دراسة الرتابة بإشارة الفرق، حساب النهاية، حساب مجموع حدود. الهدف هو إثبات خاصية لكل عدد طبيعي <span class="math">n</span> ودراسة اتجاه تغير المتتالية وحساب النهاية وحساب مجموع حدود.</p>
<p class="pedagogy-step">نستعمل المشتقة لدراسة تغير الدالة وصورة المجال؛ نستعمل دراسة إشارة الفرق <span class="math">u<sub>n+1</sub> - u<sub>n</sub></span> أو إشارة <span class="math">f(x) - x</span> لأن المطلوب اتجاه التغير.</p>
<p><strong>1)</strong> الدالة <span class="math">f</span> مشتقة على <span class="math">[-1 ; -1/2]</span> و:</p><p class="math-equation">f'(x) = [2 - (x + 1)<sup>2</sup>]/(x<sup>2</sup> + 1)<sup>2</sup></p><p>وبما أن <span class="math">0 ≤ (x + 1)<sup>2</sup> ≤ 1/4</span> على هذا المجال، فإن <span class="math">f'(x) &gt; 0</span>، وبالتالي <span class="math">f</span> متزايدة تماما.</p><p>نحسب <span class="math">f(-1) = -1</span> و <span class="math">f(-1/2) = -3/5</span>. ومن تزايد <span class="math">f</span> نحصل على <span class="math">f([-1 ; -1/2]) = [-1 ; -3/5] ⊂ [-1 ; -1/2]</span>.</p>
<p class="pedagogy-step">نستعمل الحصر بالتراجع على ثلاث مراحل: التحقق عند <span class="math">n = 0</span>، ثم فرضية التراجع، ثم الانتقال من <span class="math">n</span> إلى <span class="math">n + 1</span>؛ ثم ندرس الرتابة بإشارة الفرق <span class="math">u<sub>n+1</sub> - u<sub>n</sub></span> وليس بالتخمين البياني فقط.</p>
<p><strong>2)</strong> عند <span class="math">n = 0</span>: <span class="math">-1 &lt; u<sub>0</sub> = -1/2 ≤ -1/2</span>. وإذا كان <span class="math">-1 &lt; u<sub>n</sub> ≤ -1/2</span>، فبما أن <span class="math">f([-1 ; -1/2]) ⊂ [-1 ; -1/2]</span> فإن <span class="math">-1 &lt; u<sub>n+1</sub> ≤ -1/2</span>. إذن الخاصية صحيحة لكل <span class="math">n</span>.</p><p>بالتعويض نجد:</p><p class="math-equation">u<sub>1</sub> = f(-1/2) = -3/5</p><p>إذن <span class="math">u<sub>1</sub> &lt; u<sub>0</sub></span>، فنخمن أن المتتالية متناقصة.</p><p>لدينا:</p><p class="math-equation">u<sub>n+1</sub> + 1 = f(u<sub>n</sub>) + 1 = (u<sub>n</sub> + 1)/(u<sub>n</sub><sup>2</sup> + 1)</p><p>ومن <span class="math">u<sub>n</sub> ≤ -1/2</span> نستنتج <span class="math">u<sub>n</sub><sup>2</sup> + 1 ≥ 5/4</span>، ومنه:</p><p class="math-equation">u<sub>n+1</sub> + 1 ≤ 4/5 (u<sub>n</sub> + 1)</p>
<p class="pedagogy-step">نستعمل الحصر بالتراجع على ثلاث مراحل: التحقق عند <span class="math">n = 0</span>، ثم فرضية التراجع، ثم الانتقال من <span class="math">n</span> إلى <span class="math">n + 1</span>؛ ثم ندرس الرتابة بإشارة الفرق <span class="math">u<sub>n+1</sub> - u<sub>n</sub></span> وليس بالتخمين البياني فقط؛ نحسب النهاية باستعمال الحصر بين متتاليتين لهما نفس النهاية.</p>
<p><strong>3)</strong> بالتراجع انطلاقا من المتراجحة السابقة و <span class="math">u<sub>0</sub> + 1 = 1/2</span> نحصل على:</p><p class="math-equation">0 &lt; u<sub>n</sub> + 1 ≤ 1/2 (4/5)<sup>n</sup></p><p>وبما أن <span class="math">(4/5)<sup>n</sup> → 0</span>، فإن <span class="math">u<sub>n</sub> + 1 → 0</span>، وبالتالي:</p><p class="math-equation">lim u<sub>n</sub> = -1</p><p>كما أن:</p><p class="math-equation">u<sub>n+1</sub> - u<sub>n</sub> = -u<sub>n</sub><sup>2</sup>(u<sub>n</sub> + 1)/(u<sub>n</sub><sup>2</sup> + 1)</p><p>وبما أن <span class="math">-1 &lt; u<sub>n</sub> ≤ -1/2</span>، فإن <span class="math">u<sub>n</sub> + 1 &gt; 0</span> و <span class="math">u<sub>n</sub><sup>2</sup> &gt; 0</span>، ومنه <span class="math">u<sub>n+1</sub> - u<sub>n</sub> &lt; 0</span>. إذن <span class="math">(u<sub>n</sub>)</span> متناقصة تماما.</p>
<p class="pedagogy-step">نحسب النهاية باستعمال الحصر بين متتاليتين لهما نفس النهاية؛ نستعمل صيغة مجموع حدود متتالية هندسية أو خاصية التلاصق.</p>
<p><strong>4)</strong> من <span class="math">u<sub>k</sub> = -1 + (u<sub>k</sub> + 1)</span> و <span class="math">u<sub>k</sub> + 1 ≤ 1/2 (4/5)<sup>k</sup></span> نحصل على:</p><p class="math-equation">S<sub>n</sub> ≤ -(n + 1) + 1/2 [1 + 4/5 + ... + (4/5)<sup>n</sup>]</p><p>أي:</p><p class="math-equation">S<sub>n</sub> ≤ -(n + 1) + 5/2 [1 - (4/5)<sup>n+1</sup>] = 3/2 - n - 5/2 (4/5)<sup>n+1</sup></p><p>وبما أن الطرف الأيمن يؤول إلى <span class="math">-∞</span>، ومع كون <span class="math">S<sub>n</sub> &gt; -(n + 1)</span>، نستنتج:</p><p class="math-equation">lim S<sub>n</sub> = -∞</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نتبع الترتيب التالي: دراسة الدالة، البرهان بالتراجع، دراسة الرتابة، حساب النهاية، حساب المجموع، ونكتب النتيجة النهائية في كل جزء.</p>
</div>`,
    conceptHints: [
      {
        "title": "الحصر بالتراجع",
        "hint": "تحقق من n=0، ثم افترض أن u_n داخل المجال، واستعمل علاقة u_{n+1}=f(u_n) أو صورة المجال بالدالة لإثبات بقاء u_{n+1} داخل نفس المجال."
      },
      {
        "title": "رتابة المتتالية",
        "hint": "لدراسة الاتجاه، احسب u_{n+1}-u_n أو درس إشارة f(x)-x على المجال المعطى، واستعمل الحصر لتحديد الإشارة دون الاكتفاء بالتخمين البياني."
      },
      {
        "title": "حساب النهاية",
        "hint": "استعمل العبارة الصريحة أو الحصر أو حقيقة أن q^n يؤول إلى 0 عندما |q|<1 لاستنتاج النهاية."
      },
      {
        "title": "حساب المجموع",
        "hint": "حدد نوع الحدود (هندسية، متداخلة، لوغاريتمية) ثم استعمل الصيغة المناسبة للمجموع."
      }
    ],
    solution: `<p><strong>1)</strong> الدالة <span class="math">f</span> مشتقة على <span class="math">[-1 ; -1/2]</span> و:</p><p class="math-equation">f'(x) = [2 - (x + 1)<sup>2</sup>]/(x<sup>2</sup> + 1)<sup>2</sup></p><p>وبما أن <span class="math">0 ≤ (x + 1)<sup>2</sup> ≤ 1/4</span> على هذا المجال، فإن <span class="math">f'(x) &gt; 0</span>، وبالتالي <span class="math">f</span> متزايدة تماما.</p><p>نحسب <span class="math">f(-1) = -1</span> و <span class="math">f(-1/2) = -3/5</span>. ومن تزايد <span class="math">f</span> نحصل على <span class="math">f([-1 ; -1/2]) = [-1 ; -3/5] ⊂ [-1 ; -1/2]</span>.</p><p><strong>2)</strong> عند <span class="math">n = 0</span>: <span class="math">-1 &lt; u<sub>0</sub> = -1/2 ≤ -1/2</span>. وإذا كان <span class="math">-1 &lt; u<sub>n</sub> ≤ -1/2</span>، فبما أن <span class="math">f([-1 ; -1/2]) ⊂ [-1 ; -1/2]</span> فإن <span class="math">-1 &lt; u<sub>n+1</sub> ≤ -1/2</span>. إذن الخاصية صحيحة لكل <span class="math">n</span>.</p><p>بالتعويض نجد:</p><p class="math-equation">u<sub>1</sub> = f(-1/2) = -3/5</p><p>إذن <span class="math">u<sub>1</sub> &lt; u<sub>0</sub></span>، فنخمن أن المتتالية متناقصة.</p><p>لدينا:</p><p class="math-equation">u<sub>n+1</sub> + 1 = f(u<sub>n</sub>) + 1 = (u<sub>n</sub> + 1)/(u<sub>n</sub><sup>2</sup> + 1)</p><p>ومن <span class="math">u<sub>n</sub> ≤ -1/2</span> نستنتج <span class="math">u<sub>n</sub><sup>2</sup> + 1 ≥ 5/4</span>، ومنه:</p><p class="math-equation">u<sub>n+1</sub> + 1 ≤ 4/5 (u<sub>n</sub> + 1)</p><p><strong>3)</strong> بالتراجع انطلاقا من المتراجحة السابقة و <span class="math">u<sub>0</sub> + 1 = 1/2</span> نحصل على:</p><p class="math-equation">0 &lt; u<sub>n</sub> + 1 ≤ 1/2 (4/5)<sup>n</sup></p><p>وبما أن <span class="math">(4/5)<sup>n</sup> → 0</span>، فإن <span class="math">u<sub>n</sub> + 1 → 0</span>، وبالتالي:</p><p class="math-equation">lim u<sub>n</sub> = -1</p><p>كما أن:</p><p class="math-equation">u<sub>n+1</sub> - u<sub>n</sub> = -u<sub>n</sub><sup>2</sup>(u<sub>n</sub> + 1)/(u<sub>n</sub><sup>2</sup> + 1)</p><p>وبما أن <span class="math">-1 &lt; u<sub>n</sub> ≤ -1/2</span>، فإن <span class="math">u<sub>n</sub> + 1 &gt; 0</span> و <span class="math">u<sub>n</sub><sup>2</sup> &gt; 0</span>، ومنه <span class="math">u<sub>n+1</sub> - u<sub>n</sub> &lt; 0</span>. إذن <span class="math">(u<sub>n</sub>)</span> متناقصة تماما.</p><p><strong>4)</strong> من <span class="math">u<sub>k</sub> = -1 + (u<sub>k</sub> + 1)</span> و <span class="math">u<sub>k</sub> + 1 ≤ 1/2 (4/5)<sup>k</sup></span> نحصل على:</p><p class="math-equation">S<sub>n</sub> ≤ -(n + 1) + 1/2 [1 + 4/5 + ... + (4/5)<sup>n</sup>]</p><p>أي:</p><p class="math-equation">S<sub>n</sub> ≤ -(n + 1) + 5/2 [1 - (4/5)<sup>n+1</sup>] = 3/2 - n - 5/2 (4/5)<sup>n+1</sup></p><p>وبما أن الطرف الأيمن يؤول إلى <span class="math">-∞</span>، ومع كون <span class="math">S<sub>n</sub> &gt; -(n + 1)</span>، نستنتج:</p><p class="math-equation">lim S<sub>n</sub> = -∞</p>`
  },  {
    id: "bac-2025-exp-subject-1",
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
    quickSolution: `<p><strong>1)</strong> <span class="math">u<sub>0</sub> = -1</span>، <span class="math">u<sub>1</sub> = 3</span>، <span class="math">u<sub>2</sub> = 3/5</span>، <span class="math">u<sub>3</sub> = 15/13</span>؛ التخمين: الحدود تتقارب نحو <span class="math">1</span>.</p><p><strong>2)</strong> a) <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">-1/3</span>، <span class="math">v<sub>0</sub> = 1</span>؛ <span class="math">v<sub>n</sub> = (-1/3)<sup>n</sup></span> &nbsp; b) <span class="math">u<sub>n</sub> = [1 - 3(-1/3)<sup>n</sup>]/[1 + (-1/3)<sup>n</sup>]</span>؛ <span class="math">lim u<sub>n</sub> = 1</span>.</p><p><strong>3)</strong> <span class="math">S<sub>n</sub> = 3/4 [1 - (-1/3)<sup>n+1</sup>]</span>؛ <span class="math">T<sub>n</sub> = -n(n + 1)/2 ln 3</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p>في هذا التمرين، نستعمل التمثيل البياني للتخمين، متتالية مساعدة، المتتالية الهندسية، النقاط الثابتة، حساب النهاية، حساب مجموع حدود، خواص اللوغاريتمات. الهدف هو إيجاد عبارة الحد العام وحساب النهاية وحساب مجموع حدود وتحديد النقاط الثابتة.</p>
<p class="pedagogy-step">نستعمل التمثيل البياني أولا للتخمين، ثم نبرهن الجزء جبريا ولا نكتفي بالرسم؛ نحسب النهاية باستعمال النهايات المرجعية.</p>
<p><strong>1)</strong> بالحساب: <span class="math">u<sub>0</sub> = -1</span>، <span class="math">u<sub>1</sub> = 3</span>، <span class="math">u<sub>2</sub> = 3/5</span>، <span class="math">u<sub>3</sub> = 15/13</span>. ومن التمثيل البياني تبدو الحدود متقاربة نحو 1.</p>

<p class="pedagogy-step">نعرف متتالية مساعدة حتى نحول العلاقة التراجعية إلى علاقة هندسية بسيطة؛ بعد إيجاد العبارة الصريحة، نستعمل نهاية المتتالية الهندسية <span class="math">q<sup>n</sup></span> لحساب النهاية.</p>
<p><strong>2)</strong> لدينا <span class="math">v<sub>0</sub> = (1 + 1)/(3 - 1) = 1</span>. وباستعمال <span class="math">u<sub>n+1</sub> = 3/(u<sub>n</sub> + 2)</span> نجد <span class="math">v<sub>n+1</sub> = -1/3 × v<sub>n</sub></span>.</p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> متتالية هندسية أساسها <span class="math">-1/3</span> وحدها الأول 1، وبالتالي:</p>
      <p class="math-equation">v<sub>n</sub> = (-1/3)<sup>n</sup></p>
      <p>من <span class="math">v<sub>n</sub> = (1 - u<sub>n</sub>)/(3 + u<sub>n</sub>)</span> نستنتج:</p>
      <p class="math-equation">u<sub>n</sub> = (1 - 3v<sub>n</sub>)/(1 + v<sub>n</sub>) = [1 - 3(-1/3)<sup>n</sup>]/[1 + (-1/3)<sup>n</sup>]</p>
      <p>وبما أن <span class="math">(-1/3)<sup>n</sup></span> يؤول إلى 0، فإن <span class="math">lim u<sub>n</sub> = 1</span>.</p>

<p class="pedagogy-step">نستعمل تعريف المتتالية الهندسية لأن النسبة بين حدين متتاليين ثابتة؛ نستعمل خواص اللوغاريتمات لحساب المجموع.</p>
<p><strong>3)</strong> مجموع حدود متتالية هندسية:</p>
      <p class="math-equation">S<sub>n</sub> = 3/4 × [1 - (-1/3)<sup>n+1</sup>]</p>
      <p>والمجموع اللوغارتمي:</p>
      <p class="math-equation">T<sub>n</sub> = -n(n + 1)/2 × ln 3</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نتبع الترتيب التالي: التخمين البياني، تحديد النقاط الثابتة، استعمال متتالية مساعدة، حساب النهاية، حساب المجموع، ونكتب النتيجة النهائية في كل جزء.</p>
</div>`,
    conceptHints: [
      {
        "title": "المتتالية المساعدة",
        "hint": "عرف v_n حتى نحول العلاقة التراجعية إلى علاقة هندسية بسيطة، ثم أثبت ذلك بحساب النسبة v_{n+1}/v_n."
      },
      {
        "title": "حساب النهاية",
        "hint": "استعمل العبارة الصريحة أو الحصر أو حقيقة أن q^n يؤول إلى 0 عندما |q|<1 لاستنتاج النهاية."
      },
      {
        "title": "حساب المجموع",
        "hint": "حدد نوع الحدود (هندسية، متداخلة، لوغاريتمية) ثم استعمل الصيغة المناسبة للمجموع."
      },
      {
        "title": "النقاط الثابتة",
        "hint": "حل المعادلة f(x)=x؛ هذه النقاط هي المرشحة الوحيدة للنهاية إذا كانت المتتالية متقاربة."
      },
      {
        "title": "اللوغاريتمات",
        "hint": "استعمل خاصية ln(ab)=ln a+ln b وln(a^k)=k ln a لتبسيط المجاميع والجداوي."
      }
    ],
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
  },  {
    id: "bac-2025-exp-subject-2",
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
    quickSolution: `<p><strong>1)</strong> <span class="math">f</span> متزايدة تماما على <span class="math">[0, +∞[</span>.</p><p><strong>2)</strong> a) <span class="math">u<sub>1</sub> = 15/7</span>، <span class="math">u<sub>2</sub> = 75/37</span>؛ التخمين: متناقصة &nbsp; b) <span class="math">2 &lt; u<sub>n</sub> ≤ 3</span> لكل <span class="math">n</span> &nbsp; c) <span class="math">(u<sub>n</sub>)</span> متناقصة تماما.</p><p><strong>3)</strong> a) <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">3/5</span>، <span class="math">v<sub>0</sub> = 1/3</span>؛ <span class="math">v<sub>n</sub> = 1/3 (3/5)<sup>n</sup></span> &nbsp; b) <span class="math">S<sub>n</sub> = 5/4 [1 - (3/5)<sup>n+1</sup>]</span> &nbsp; c) <span class="math">u<sub>n</sub> = 6×5<sup>n</sup>/(3×5<sup>n</sup> - 1)</span>؛ <span class="math">lim u<sub>n</sub> = 2</span>.</p><p><strong>4)</strong> <span class="math">T<sub>n</sub> = 3(n + 1) - 5/4 [1 - 1/5<sup>n+1</sup>]</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p>في هذا التمرين، نستعمل دراسة تغير الدالة بالمشتقة، البرهان بالتراجع، دراسة الرتابة بإشارة الفرق، متتالية مساعدة، المتتالية الهندسية، حساب النهاية، حساب مجموع حدود. الهدف هو إثبات خاصية لكل عدد طبيعي <span class="math">n</span> ودراسة اتجاه تغير المتتالية وإيجاد عبارة الحد العام وحساب النهاية وحساب مجموع حدود.</p>
<p class="pedagogy-step">نستعمل المشتقة لدراسة تغير الدالة وصورة المجال؛ نستعمل دراسة إشارة الفرق <span class="math">u<sub>n+1</sub> - u<sub>n</sub></span> أو إشارة <span class="math">f(x) - x</span> لأن المطلوب اتجاه التغير.</p>
<p><strong>1)</strong> لدينا <span class="math">f(x) = 5x/(2x + 1)</span>، وبالتالي:</p>
      <p class="math-equation">f'(x) = 5/(2x + 1)² > 0</p>
      <p>إذن <span class="math">f</span> متزايدة تماما على <span class="math">[0, +∞[</span>.</p>
      <p>بالتعويض: <span class="math">u<sub>1</sub> = 15/7</span> و <span class="math">u<sub>2</sub> = 75/37</span>.</p>

<p class="pedagogy-step">نستعمل الحصر بالتراجع على ثلاث مراحل: التحقق عند <span class="math">n = 0</span>، ثم فرضية التراجع، ثم الانتقال من <span class="math">n</span> إلى <span class="math">n + 1</span>؛ ثم ندرس الرتابة بإشارة الفرق <span class="math">u<sub>n+1</sub> - u<sub>n</sub></span> وليس بالتخمين البياني فقط.</p>
<p><strong>برهان بالتراجع:</strong> إذا كان <span class="math">2 < u<sub>n</sub> ≤ 3</span>، فبما أن <span class="math">f</span> متزايدة:</p>
      <p class="math-equation">f(2) < u<sub>n+1</sub> ≤ f(3)</p>
      <p>أي:</p>
      <p class="math-equation">2 < u<sub>n+1</sub> ≤ 15/7 ≤ 3</p>

<p class="pedagogy-step">نستعمل دراسة إشارة الفرق <span class="math">u<sub>n+1</sub> - u<sub>n</sub></span> أو إشارة <span class="math">f(x) - x</span> لأن المطلوب اتجاه التغير؛ نحسب النهاية باستعمال النهايات المرجعية.</p>
<p><strong>2)</strong> ندرس الفرق:</p>
      <p class="math-equation">u<sub>n+1</sub> - u<sub>n</sub> = 2u<sub>n</sub>(2 - u<sub>n</sub>)/(2u<sub>n</sub> + 1)</p>
      <p>وبما أن <span class="math">u<sub>n</sub> > 2</span> فإن هذا الفرق سالب، إذن <span class="math">(u<sub>n</sub>)</span> متناقصة تماما. وهي محدودة من الأسفل بـ 2، فتكون متقاربة.</p>

<p class="pedagogy-step">نعرف متتالية مساعدة حتى نحول العلاقة التراجعية إلى علاقة هندسية بسيطة؛ بعد إيجاد العبارة الصريحة، نستعمل نهاية المتتالية الهندسية <span class="math">q<sup>n</sup></span> لحساب النهاية.</p>
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

<p class="pedagogy-step">نستعمل صيغة مجموع حدود متتالية هندسية أو خاصية التلاصق.</p>
<p><strong>4)</strong> نتحقق من أن:</p>
      <p class="math-equation">6/u<sub>n</sub> = 3 - 1/5<sup>n</sup></p>
      <p>وبالتالي:</p>
      <p class="math-equation">T<sub>n</sub> = 3(n + 1) - 5/4 × [1 - 1/5<sup>n+1</sup>]</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نتبع الترتيب التالي: دراسة الدالة، البرهان بالتراجع، دراسة الرتابة، استعمال متتالية مساعدة، حساب النهاية، حساب المجموع، ونكتب النتيجة النهائية في كل جزء.</p>
</div>`,
    conceptHints: [
      {
        "title": "الحصر بالتراجع",
        "hint": "تحقق من n=0، ثم افترض أن u_n داخل المجال، واستعمل علاقة u_{n+1}=f(u_n) أو صورة المجال بالدالة لإثبات بقاء u_{n+1} داخل نفس المجال."
      },
      {
        "title": "رتابة المتتالية",
        "hint": "لدراسة الاتجاه، احسب u_{n+1}-u_n أو درس إشارة f(x)-x على المجال المعطى، واستعمل الحصر لتحديد الإشارة دون الاكتفاء بالتخمين البياني."
      },
      {
        "title": "المتتالية المساعدة",
        "hint": "عرف v_n حتى نحول العلاقة التراجعية إلى علاقة هندسية بسيطة، ثم أثبت ذلك بحساب النسبة v_{n+1}/v_n."
      },
      {
        "title": "حساب النهاية",
        "hint": "استعمل العبارة الصريحة أو الحصر أو حقيقة أن q^n يؤول إلى 0 عندما |q|<1 لاستنتاج النهاية."
      },
      {
        "title": "حساب المجموع",
        "hint": "حدد نوع الحدود (هندسية، متداخلة، لوغاريتمية) ثم استعمل الصيغة المناسبة للمجموع."
      }
    ],
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
  },  {
    id: "bac-2024-technical-math-subject-1",
    branch: "science",
    stream: "technical_math",
    year: "2024",
    title: "بكالوريا 2024 - تقني رياضي - الموضوع الأول",
    statementHtml: `<div class="bac-statement">
      <p><strong>التمرين: المتتاليات العددية</strong></p>
      <p>نعتبر المتتالية العددية <span class="math">(u<sub>n</sub>)</span> المعرفة بـ <span class="math">u<sub>0</sub> = 0</span>، ومن أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math-equation">u<sub>n+1</sub> = (6 + 6u<sub>n</sub>)/(5 + u<sub>n</sub>)</p>
      <ol>
        <li>احسب <span class="math">u<sub>1</sub></span> و <span class="math">u<sub>2</sub></span>، ثم تحقق أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n+1</sub> = 6 - 24/(5 + u<sub>n</sub>)</span>.</li>
        <li><ol><li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">0 ≤ u<sub>n</sub> &lt; 3</span>.</li><li>ادرس اتجاه تغير المتتالية <span class="math">(u<sub>n</sub>)</span>.</li></ol></li>
        <li><p>نعتبر المتتالية العددية <span class="math">(v<sub>n</sub>)</span> المعرفة على <span class="math">ℕ</span> بـ:</p><p class="math-equation">v<sub>n</sub> = (u<sub>n</sub> + 2)/(u<sub>n</sub> - 3)</p><ol><li>أثبت أن المتتالية <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">8/3</span>، ثم اكتب <span class="math">v<sub>n</sub></span> بدلالة <span class="math">n</span>.</li><li>بين أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n</sub> = 3 + 5/(v<sub>n</sub> - 1)</span>، ثم احسب <span class="math">lim u<sub>n</sub></span>.</li></ol></li>
        <li>احسب بدلالة <span class="math">n</span> المجموع <span class="math">S<sub>n</sub></span> حيث: <span class="math">S<sub>n</sub> = v<sub>0</sub> + 3v<sub>1</sub> + 3<sup>2</sup>v<sub>2</sub> + ... + 3<sup>n</sup>v<sub>n</sub></span>.</li>
      </ol>
    </div>`,
    quickSolution: `<p><strong>1)</strong> <span class="math">u<sub>1</sub> = 6/5</span>، <span class="math">u<sub>2</sub> = 66/31</span>؛ <span class="math">u<sub>n+1</sub> = 6 - 24/(5 + u<sub>n</sub>)</span>.</p><p><strong>2)</strong> <span class="math">0 ≤ u<sub>n</sub> &lt; 3</span> لكل <span class="math">n</span>؛ <span class="math">(u<sub>n</sub>)</span> متزايدة تماما.</p><p><strong>3)</strong> <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">8/3</span>، <span class="math">v<sub>0</sub> = -2/3</span>؛ <span class="math">v<sub>n</sub> = -2/3(8/3)<sup>n</sup></span>؛ <span class="math">u<sub>n</sub> = 3 + 5/(v<sub>n</sub> - 1)</span>؛ <span class="math">lim u<sub>n</sub> = 3</span>.</p><p><strong>4)</strong> <span class="math">S<sub>n</sub> = -2/21(8<sup>n+1</sup> - 1)</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p><strong>1) ما المطلوب؟</strong> نحسب الحدين الأولين ثم نعيد كتابة العلاقة التراجعية على شكل ثابت ناقص كسر.</p><p><strong>الفكرة المستعملة:</strong> نستعمل التعويض المباشر، ثم نكتب البسط <span class="math">6+6u<sub>n</sub></span> بدلالة <span class="math">5+u<sub>n</sub></span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">u<sub>1</sub> = (6+6u<sub>0</sub>)/(5+u<sub>0</sub>) = 6/5</p><p class="math-equation">u<sub>2</sub> = (6+6×6/5)/(5+6/5) = 66/31</p><p>كما أن:</p><p class="math-equation">6 + 6u<sub>n</sub> = 6(5+u<sub>n</sub>) - 24</p><p>ومنه:</p><p class="math-equation">u<sub>n+1</sub> = 6 - 24/(5+u<sub>n</sub>)</p><p><strong>النتيجة:</strong> <span class="math">u<sub>1</sub>=6/5</span> و <span class="math">u<sub>2</sub>=66/31</span> والصيغة المطلوبة صحيحة.</p>
<p><strong>2-أ) ما المطلوب؟</strong> نثبت أن كل الحدود تبقى في المجال <span class="math">[0,3[</span>.</p><p><strong>الفكرة المستعملة:</strong> نستعمل البرهان بالتراجع لأن الحصر مطلوب لكل عدد طبيعي.</p><p><strong>التطبيق:</strong> عند <span class="math">n=0</span>: <span class="math">u<sub>0</sub>=0</span>، إذن <span class="math">0≤u<sub>0</sub>&lt;3</span>. نفرض أن <span class="math">0≤u<sub>n</sub>&lt;3</span>. عندئذ <span class="math">5+u<sub>n</sub>&gt;0</span> و<span class="math">6+6u<sub>n</sub>≥0</span>، ومنه <span class="math">u<sub>n+1</sub>≥0</span>. ولإثبات <span class="math">u<sub>n+1</sub>&lt;3</span> نكتب:</p><p class="math-equation">(6+6u<sub>n</sub>)/(5+u<sub>n</sub>) &lt; 3 ⇔ 6+6u<sub>n</sub> &lt; 15+3u<sub>n</sub> ⇔ u<sub>n</sub> &lt; 3</p><p>وهذا صحيح حسب فرضية التراجع.</p><p><strong>النتيجة:</strong> <span class="math">0≤u<sub>n</sub>&lt;3</span> لكل <span class="math">n∈ℕ</span>.</p>
<p><strong>2-ب) ما المطلوب؟</strong> ندرس اتجاه تغير <span class="math">(u<sub>n</sub>)</span>.</p><p><strong>الفكرة المستعملة:</strong> نحسب الفرق <span class="math">u<sub>n+1</sub>-u<sub>n</sub></span> ونستعمل الحصر السابق لتحديد إشارته.</p><p><strong>التطبيق:</strong></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub> = (6+6u<sub>n</sub>)/(5+u<sub>n</sub>) - u<sub>n</sub></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub> = (6+u<sub>n</sub>-u<sub>n</sub><sup>2</sup>)/(5+u<sub>n</sub>) = ((3-u<sub>n</sub>)(u<sub>n</sub>+2))/(5+u<sub>n</sub>)</p><p>وبما أن <span class="math">0≤u<sub>n</sub>&lt;3</span> فإن البسط والمقام موجبان.</p><p><strong>النتيجة:</strong> <span class="math">u<sub>n+1</sub>-u<sub>n</sub>&gt;0</span>، إذن المتتالية متزايدة تماما.</p>
<p><strong>3-أ) ما المطلوب؟</strong> نثبت أن المتتالية المساعدة <span class="math">(v<sub>n</sub>)</span> هندسية.</p><p><strong>الفكرة المستعملة:</strong> نحسب <span class="math">u<sub>n+1</sub>+2</span> و<span class="math">u<sub>n+1</sub>-3</span> بدلالة <span class="math">u<sub>n</sub></span>، ثم نأخذ النسبة.</p><p><strong>التطبيق:</strong></p><p class="math-equation">u<sub>n+1</sub>+2 = (6+6u<sub>n</sub>)/(5+u<sub>n</sub>) + 2 = 8(u<sub>n</sub>+2)/(5+u<sub>n</sub>)</p><p class="math-equation">u<sub>n+1</sub>-3 = (6+6u<sub>n</sub>)/(5+u<sub>n</sub>) - 3 = 3(u<sub>n</sub>-3)/(5+u<sub>n</sub>)</p><p>إذن:</p><p class="math-equation">v<sub>n+1</sub> = (u<sub>n+1</sub>+2)/(u<sub>n+1</sub>-3) = (8/3)(u<sub>n</sub>+2)/(u<sub>n</sub>-3) = (8/3)v<sub>n</sub></p><p>كما أن:</p><p class="math-equation">v<sub>0</sub> = (0+2)/(0-3) = -2/3</p><p><strong>النتيجة:</strong> <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">8/3</span> و:</p><p class="math-equation">v<sub>n</sub> = -2/3(8/3)<sup>n</sup></p>
<p><strong>3-ب) ما المطلوب؟</strong> نكتب <span class="math">u<sub>n</sub></span> باستعمال <span class="math">v<sub>n</sub></span> ثم نحسب النهاية.</p><p><strong>الفكرة المستعملة:</strong> نحل العلاقة <span class="math">v<sub>n</sub>=(u<sub>n</sub>+2)/(u<sub>n</sub>-3)</span> بالنسبة إلى <span class="math">u<sub>n</sub></span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">v<sub>n</sub>(u<sub>n</sub>-3)=u<sub>n</sub>+2</p><p class="math-equation">u<sub>n</sub>(v<sub>n</sub>-1)=3v<sub>n</sub>+2</p><p class="math-equation">u<sub>n</sub>=(3v<sub>n</sub>+2)/(v<sub>n</sub>-1)=3+5/(v<sub>n</sub>-1)</p><p>وبما أن <span class="math">v<sub>n</sub> = -2/3(8/3)<sup>n</sup></span> فإن <span class="math">v<sub>n</sub>→-∞</span>، وبالتالي <span class="math">5/(v<sub>n</sub>-1)→0</span>.</p><p><strong>النتيجة:</strong> <span class="math">lim u<sub>n</sub> = 3</span>.</p>
<p><strong>4) ما المطلوب؟</strong> نحسب مجموعا من الشكل <span class="math">v<sub>0</sub>+3v<sub>1</sub>+...+3<sup>n</sup>v<sub>n</sub></span>.</p><p><strong>الفكرة المستعملة:</strong> بعد كتابة <span class="math">v<sub>k</sub></span> بدلالة <span class="math">k</span> نلاحظ أن <span class="math">3<sup>k</sup>v<sub>k</sub></span> يصبح حدا هندسيا أساسه <span class="math">8</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">3<sup>k</sup>v<sub>k</sub> = 3<sup>k</sup>[-2/3(8/3)<sup>k</sup>] = -2/3 × 8<sup>k</sup></p><p>إذن:</p><p class="math-equation">S<sub>n</sub> = -2/3(1+8+8<sup>2</sup>+...+8<sup>n</sup>)</p><p class="math-equation">S<sub>n</sub> = -2/3 × (8<sup>n+1</sup>-1)/(8-1)</p><p><strong>النتيجة:</strong></p><p class="math-equation">S<sub>n</sub> = -2/21(8<sup>n+1</sup>-1)</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> حسبنا الحدود الأولى وحولنا العلاقة، ثم أثبتنا الحصر بالتراجع واستعملناه في الرتابة. بعد ذلك حولنا العلاقة الكسرية بمتتالية مساعدة هندسية، واستخرجنا النهاية، ثم حسبنا المجموع بتحويله إلى مجموع هندسي أساسه <span class="math">8</span>.</p>
</div>`,
    conceptHints: [
      { title: "تحويل العلاقة", hint: "اكتب <span class='math'>6+6u<sub>n</sub></span> على شكل <span class='math'>6(5+u<sub>n</sub>)-24</span>، ثم اقسم على <span class='math'>5+u<sub>n</sub></span> للحصول على الصيغة المطلوبة." },
      { title: "الحصر بالتراجع", hint: "تحقق من <span class='math'>n=0</span>، ثم افترض <span class='math'>0≤u<sub>n</sub>&lt;3</span>. لإثبات <span class='math'>u<sub>n+1</sub>&lt;3</span> اضرب في <span class='math'>5+u<sub>n</sub></span> لأنه موجب، ثم استعمل <span class='math'>u<sub>n</sub>&lt;3</span>." },
      { title: "رتابة المتتالية", hint: "احسب <span class='math'>u<sub>n+1</sub>-u<sub>n</sub></span>، واجمع في مقام واحد، ثم حلل البسط إلى <span class='math'>(3-u<sub>n</sub>)(u<sub>n</sub>+2)</span> لتحديد الإشارة." },
      { title: "المتتالية المساعدة", hint: "احسب <span class='math'>u<sub>n+1</sub>+2</span> و<span class='math'>u<sub>n+1</sub>-3</span> كل واحد على حدة، ثم خذ النسبة حتى تظهر العلاقة <span class='math'>v<sub>n+1</sub>=qv<sub>n</sub></span>." },
      { title: "النهاية باستعمال متتالية هندسية", hint: "بعد كتابة <span class='math'>v<sub>n</sub></span>، انتبه أن أساسها أكبر من 1 وأن <span class='math'>v<sub>0</sub></span> سالب، لذلك تتجه <span class='math'>v<sub>n</sub></span> إلى -∞، ثم استعمل <span class='math'>u<sub>n</sub>=3+5/(v<sub>n</sub>-1)</span>." },
      { title: "حساب المجموع", hint: "عوض <span class='math'>v<sub>k</sub></span> بصيغته الصريحة داخل <span class='math'>3<sup>k</sup> v<sub>k</sub></span>. ستختصر قوى 3 وتبقى حدود هندسية أساسها 8." }
    ],
    solution: `<p><strong>1)</strong> نحسب:</p><p class="math-equation">u<sub>1</sub>=6/5، u<sub>2</sub>=66/31</p><p>كما أن <span class="math">6+6u<sub>n</sub>=6(5+u<sub>n</sub>)-24</span>، ومنه:</p><p class="math-equation">u<sub>n+1</sub>=6-24/(5+u<sub>n</sub>)</p><p><strong>2)</strong> عند <span class="math">n=0</span>: <span class="math">0≤u<sub>0</sub>&lt;3</span>. إذا كان <span class="math">0≤u<sub>n</sub>&lt;3</span> فإن <span class="math">u<sub>n+1</sub>≥0</span>، كما أن:</p><p class="math-equation">u<sub>n+1</sub>&lt;3 ⇔ 6+6u<sub>n</sub>&lt;15+3u<sub>n</sub> ⇔ u<sub>n</sub>&lt;3</p><p>إذن <span class="math">0≤u<sub>n</sub>&lt;3</span> لكل <span class="math">n</span>. ولدراسة الرتابة:</p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=((3-u<sub>n</sub>)(u<sub>n</sub>+2))/(5+u<sub>n</sub>)&gt;0</p><p>إذن <span class="math">(u<sub>n</sub>)</span> متزايدة تماما.</p><p><strong>3)</strong> لدينا:</p><p class="math-equation">u<sub>n+1</sub>+2=8(u<sub>n</sub>+2)/(5+u<sub>n</sub>)</p><p class="math-equation">u<sub>n+1</sub>-3=3(u<sub>n</sub>-3)/(5+u<sub>n</sub>)</p><p>إذن <span class="math">v<sub>n+1</sub>=(8/3)v<sub>n</sub></span>، و<span class="math">v<sub>0</sub> = -2/3</span>، ومنه:</p><p class="math-equation">v<sub>n</sub> = -2/3(8/3)<sup>n</sup></p><p>ومن <span class="math">v<sub>n</sub>=(u<sub>n</sub>+2)/(u<sub>n</sub>-3)</span> نحصل على:</p><p class="math-equation">u<sub>n</sub>=3+5/(v<sub>n</sub>-1)</p><p>وبما أن <span class="math">v<sub>n</sub>→-∞</span> فإن <span class="math">lim u<sub>n</sub>=3</span>.</p><p><strong>4)</strong> بما أن <span class="math">3<sup>k</sup>v<sub>k</sub>=-2/3×8<sup>k</sup></span> فإن:</p><p class="math-equation">S<sub>n</sub> = -2/3(1+8+...+8<sup>n</sup>) = -2/21(8<sup>n+1</sup>-1)</p>`
  },  {
    id: "bac-2024-technical-math-subject-2",
    branch: "science",
    stream: "technical_math",
    year: "2024",
    title: "بكالوريا 2024 - تقني رياضي - الموضوع الثاني",
    statementHtml: `<div class="bac-statement">
      <p><strong>التمرين: المتتاليات العددية</strong></p>
      <h4>I) دراسة الدالة</h4>
      <p>لتكن الدالة <span class="math">f</span> المعرفة على المجال <span class="math">[2 ; 3]</span> بـ:</p>
      <p class="math-equation">f(x) = (3x + 2)/(x + 2)</p>
      <p>ادرس اتجاه تغير الدالة <span class="math">f</span>، ثم بين أنه من أجل كل <span class="math">x</span> من <span class="math">[2 ; 3]</span>: <span class="math">2 ≤ f(x) ≤ 11/5</span>.</p>
      <h4>II) دراسة المتتالية</h4>
      <p>نعتبر المتتالية العددية <span class="math">(u<sub>n</sub>)</span> المعرفة بـ <span class="math">u<sub>0</sub> = 3</span>، ومن أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math-equation">u<sub>n+1</sub> = f(u<sub>n</sub>)</p>
      <ol>
        <li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">2 &lt; u<sub>n</sub> ≤ 3</span>.</li>
        <li>تحقق أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n+1</sub> - u<sub>n</sub> = ((1 + u<sub>n</sub>)(2 - u<sub>n</sub>))/(2 + u<sub>n</sub>)</span>، ثم استنتج اتجاه تغير <span class="math">(u<sub>n</sub>)</span>.</li>
        <li><ol><li>بين أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n+1</sub> - 2 ≤ (1/4)(u<sub>n</sub> - 2)</span>.</li><li>برهن أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">0 &lt; u<sub>n</sub> - 2 ≤ (1/4)<sup>n</sup></span>، ثم احسب <span class="math">lim u<sub>n</sub></span>.</li></ol></li>
        <li>استنتج أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>0</sub> + u<sub>1</sub> + ... + u<sub>n</sub> ≤ 2(n+1) + (4/3)(1 - (1/4)<sup>n+1</sup>)</span>.</li>
      </ol>
    </div>`,
    quickSolution: `<p><strong>I)</strong> <span class="math">f'(x)=4/(x+2)<sup>2</sup>&gt;0</span>، إذن <span class="math">f</span> متزايدة على <span class="math">[2,3]</span>؛ <span class="math">f([2,3])=[2,11/5]</span>.</p><p><strong>II-1)</strong> <span class="math">2&lt;u<sub>n</sub>≤3</span> لكل <span class="math">n</span>.</p><p><strong>2)</strong> <span class="math">u<sub>n+1</sub>-u<sub>n</sub>=((1+u<sub>n</sub>)(2-u<sub>n</sub>))/(2+u<sub>n</sub>)</span>؛ <span class="math">(u<sub>n</sub>)</span> متناقصة تماما.</p><p><strong>3)</strong> <span class="math">u<sub>n+1</sub>-2=(u<sub>n</sub>-2)/(u<sub>n</sub>+2)≤(1/4)(u<sub>n</sub>-2)</span>؛ <span class="math">0&lt;u<sub>n</sub>-2≤(1/4)<sup>n</sup></span>؛ <span class="math">lim u<sub>n</sub>=2</span>.</p><p><strong>4)</strong> <span class="math">u<sub>0</sub>+...+u<sub>n</sub>≤2(n+1)+(4/3)(1-(1/4)<sup>n+1</sup>)</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p><strong>I) ما المطلوب؟</strong> ندرس تغير الدالة <span class="math">f</span> على <span class="math">[2,3]</span> ثم نحدد صورة هذا المجال.</p><p><strong>الفكرة المستعملة:</strong> نستعمل المشتقة لتحديد اتجاه التغير، ثم نحسب صورتي طرفي المجال لأن الدالة رتيبة.</p><p><strong>التطبيق:</strong></p><p class="math-equation">f'(x)=\frac{3(x+2)-(3x+2)}{(x+2)^2}=\frac{4}{(x+2)^2}</p><p>وبما أن <span class="math">(x+2)^2&gt;0</span> على <span class="math">[2,3]</span> فإن <span class="math">f'(x)&gt;0</span>، ومنه <span class="math">f</span> متزايدة تماما على <span class="math">[2,3]</span>.</p><p>نحسب:</p><p class="math-equation">f(2)=2 ، f(3)=11/5</p><p><strong>النتيجة:</strong> بما أن <span class="math">f</span> متزايدة، فإن <span class="math">2≤f(x)≤11/5</span> لكل <span class="math">x∈[2,3]</span>.</p>
<p><strong>II-1) ما المطلوب؟</strong> نثبت أن حدود المتتالية تبقى في المجال <span class="math">]2,3]</span>.</p><p><strong>الفكرة المستعملة:</strong> نستعمل البرهان بالتراجع، ونستفيد من نتيجة دراسة الدالة وصورة المجال.</p><p><strong>التطبيق:</strong> عند <span class="math">n=0</span> لدينا <span class="math">u<sub>0</sub>=3</span>، إذن <span class="math">2&lt;u<sub>0</sub>≤3</span>. نفترض أن <span class="math">2&lt;u<sub>n</sub>≤3</span>. بما أن <span class="math">u<sub>n</sub>∈]2,3]</span> و<span class="math">f</span> متزايدة، نحصل على:</p><p class="math-equation">f(2)&lt;f(u<sub>n</sub>)≤f(3)</p><p>أي:</p><p class="math-equation">2&lt;u<sub>n+1</sub>≤11/5≤3</p><p><strong>النتيجة:</strong> بالتحقق والانتقال، <span class="math">2&lt;u<sub>n</sub>≤3</span> لكل <span class="math">n</span>.</p>
<p><strong>II-2) ما المطلوب؟</strong> نتحقق من صيغة الفرق ثم نستنتج الرتابة.</p><p><strong>الفكرة المستعملة:</strong> نحسب <span class="math">u<sub>n+1</sub>-u<sub>n</sub></span> في مقام واحد ونستعمل الحصر السابق لتحديد الإشارة.</p><p><strong>التطبيق:</strong></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=\frac{3u<sub>n</sub>+2}{u<sub>n</sub>+2}-u<sub>n</sub></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=\frac{-u<sub>n</sub>^2+u<sub>n</sub>+2}{u<sub>n</sub>+2}=\frac{(1+u<sub>n</sub>)(2-u<sub>n</sub>)}{2+u<sub>n</sub>}</p><p>وبما أن <span class="math">u<sub>n</sub>&gt;2</span> فإن <span class="math">2-u<sub>n</sub>&lt;0</span>، بينما <span class="math">1+u<sub>n</sub>&gt;0</span> و<span class="math">2+u<sub>n</sub>&gt;0</span>.</p><p><strong>النتيجة:</strong> <span class="math">u<sub>n+1</sub>-u<sub>n</sub>&lt;0</span>، إذن <span class="math">(u<sub>n</sub>)</span> متناقصة تماما.</p>
<p><strong>II-3-أ) ما المطلوب؟</strong> نثبت حصر الفرق بين <span class="math">u<sub>n+1</sub></span> والعدد <span class="math">2</span>.</p><p><strong>الفكرة المستعملة:</strong> نحسب <span class="math">u<sub>n+1</sub>-2</span> مباشرة، ثم نستعمل <span class="math">u<sub>n</sub>&gt;2</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">u<sub>n+1</sub>-2=\frac{3u<sub>n</sub>+2}{u<sub>n</sub>+2}-2=\frac{u<sub>n</sub>-2}{u<sub>n</sub>+2}</p><p>ومن <span class="math">u<sub>n</sub>&gt;2</span> نحصل على <span class="math">u<sub>n</sub>+2&gt;4</span>، وبما أن <span class="math">u<sub>n</sub>-2&gt;0</span> فإن:</p><p class="math-equation">u<sub>n+1</sub>-2≤(1/4)(u<sub>n</sub>-2)</p><p><strong>النتيجة:</strong> المتراجحة المطلوبة صحيحة لكل <span class="math">n</span>.</p>
<p><strong>II-3-ب) ما المطلوب؟</strong> نثبت حصرًا هندسيًا لـ <span class="math">u<sub>n</sub>-2</span> ثم نحسب النهاية.</p><p><strong>الفكرة المستعملة:</strong> نستعمل المتراجحة السابقة بالتراجع، ثم نستعمل أن <span class="math">(1/4)^n</span> يؤول إلى <span class="math">0</span>.</p><p><strong>التطبيق:</strong> عند <span class="math">n=0</span>: <span class="math">u<sub>0</sub>-2=1=(1/4)^0</span>. إذا كان <span class="math">0&lt;u<sub>n</sub>-2≤(1/4)^n</span>، فإن:</p><p class="math-equation">0&lt;u<sub>n+1</sub>-2≤(1/4)(u<sub>n</sub>-2)≤(1/4)<sup>n+1</sup></p><p><strong>النتيجة:</strong> <span class="math">0&lt;u<sub>n</sub>-2≤(1/4)^n</span>. وبما أن <span class="math">(1/4)^n→0</span>، فإن <span class="math">u<sub>n</sub>-2→0</span>، ومنه <span class="math">lim u<sub>n</sub>=2</span>.</p>
<p><strong>II-4) ما المطلوب؟</strong> نحصر مجموع الحدود من <span class="math">u<sub>0</sub></span> إلى <span class="math">u<sub>n</sub></span>.</p><p><strong>الفكرة المستعملة:</strong> من الحصر السابق نكتب <span class="math">u<sub>k</sub>≤2+(1/4)^k</span>، ثم نجمع من <span class="math">k=0</span> إلى <span class="math">n</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">u<sub>0</sub>+...+u<sub>n</sub>≤2(n+1)+[1+1/4+...+(1/4)^n]</p><p>والمجموع بين المعقوفتين هندسي فيه <span class="math">n+1</span> حد وأساسه <span class="math">1/4</span>، لذلك:</p><p class="math-equation">1+1/4+...+(1/4)^n=\frac{1-(1/4)^{n+1}}{1-1/4}=\frac{4}{3}(1-(1/4)^{n+1})</p><p><strong>النتيجة:</strong></p><p class="math-equation">u<sub>0</sub>+u<sub>1</sub>+...+u<sub>n</sub>≤2(n+1)+\frac{4}{3}(1-(1/4)^{n+1})</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> بدأنا بدراسة الدالة وصورة المجال، ثم استعملنا ذلك في الحصر بالتراجع. بعده درسنا الرتابة بإشارة الفرق، ثم أثبتنا حصرًا هندسيًا للفرق <span class="math">u<sub>n</sub>-2</span> فاستنتجنا النهاية، وأخيرًا جمعنا الحصر حدًا حدًا للحصول على متراجحة المجموع.</p>
</div>`,
    conceptHints: [
      { title: "دراسة دالة", hint: "احسب f'(x) على [2,3]. إذا وجدت الدالة متزايدة، فصورة المجال تحددها قيمتا الطرفين f(2) وf(3)." },
      { title: "الحصر بالتراجع", hint: "ابدأ من <span class='math'>u<sub>0</sub>=3</span>، ثم افترض أن <span class='math'>u<sub>n</sub></span> داخل ]2,3]. استعمل تزايد f وصورتي 2 و3 لإثبات أن <span class='math'>u<sub>n+1</sub></span> يبقى داخل نفس الحصر." },
      { title: "رتابة المتتالية", hint: "احسب <span class='math'>u<sub>n+1</sub>-u<sub>n</sub></span> في كسر واحد، ثم حلل البسط. الحصر السابق يعطي إشارة <span class='math'>2-u<sub>n</sub></span> مباشرة." },
      { title: "النهاية باستعمال حصر هندسي", hint: "احسب <span class='math'>u<sub>n+1</sub>-2</span> أولا. عندما يظهر المقام <span class='math'>u<sub>n</sub>+2</span>، استعمل <span class='math'>u<sub>n</sub></span>>2 لمقارنته بـ4، ثم طبق التراجع على <span class='math'>u<sub>n</sub>-2</span>." },
      { title: "حساب المجموع", hint: "حوّل الحصر <span class='math'>0&lt;u<sub>k</sub>-2≤(1/4)<sup>k</sup></span> إلى <span class='math'>u<sub>k</sub>≤2+(1/4)<sup>k</sup></span>، ثم اجمع من k=0 إلى n واستعمل مجموع هندسي بعدد حدود <span class='math'>n+1</span>." }
    ],
    solution: `<p><strong>I)</strong> لدينا:</p><p class="math-equation">f'(x)=4/(x+2)<sup>2</sup>&gt;0</p><p>إذن <span class="math">f</span> متزايدة على <span class="math">[2,3]</span>. كما أن <span class="math">f(2)=2</span> و<span class="math">f(3)=11/5</span>، ومنه <span class="math">2≤f(x)≤11/5</span>.</p><p><strong>II-1)</strong> عند <span class="math">n=0</span>: <span class="math">2&lt;u<sub>0</sub>=3≤3</span>. إذا كان <span class="math">2&lt;u<sub>n</sub>≤3</span>، فبما أن <span class="math">f</span> متزايدة نحصل على <span class="math">2=f(2)&lt;u<sub>n+1</sub>≤f(3)=11/5≤3</span>. إذن <span class="math">2&lt;u<sub>n</sub>≤3</span> لكل <span class="math">n</span>.</p><p><strong>2)</strong></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=(3u<sub>n</sub>+2)/(u<sub>n</sub>+2)-u<sub>n</sub>=((1+u<sub>n</sub>)(2-u<sub>n</sub>))/(2+u<sub>n</sub>)</p><p>وبما أن <span class="math">u<sub>n</sub>&gt;2</span> فإن الفرق سالب، وبالتالي <span class="math">(u<sub>n</sub>)</span> متناقصة تماما.</p><p><strong>3)</strong></p><p class="math-equation">u<sub>n+1</sub>-2=(u<sub>n</sub>-2)/(u<sub>n</sub>+2)≤(1/4)(u<sub>n</sub>-2)</p><p>بالتراجع نحصل على <span class="math">0&lt;u<sub>n</sub>-2≤(1/4)^n</span>. وبما أن <span class="math">(1/4)^n→0</span> فإن <span class="math">lim u<sub>n</sub>=2</span>.</p><p><strong>4)</strong> من <span class="math">u<sub>k</sub>≤2+(1/4)^k</span> نستنتج:</p><p class="math-equation">u<sub>0</sub>+...+u<sub>n</sub>≤2(n+1)+1+1/4+...+(1/4)^n</p><p>ومنه:</p><p class="math-equation">u<sub>0</sub>+...+u<sub>n</sub>≤2(n+1)+(4/3)(1-(1/4)<sup>n+1</sup>)</p>`
  },  {
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
    quickSolution: `<p><strong>1)</strong> <span class="math">u<sub>1</sub> = 2</span>، <span class="math">u<sub>2</sub> = 1/2</span>، <span class="math">u<sub>3</sub> = 7/5</span>؛ <span class="math">0 ≤ u<sub>n</sub> ≤ 2</span> لكل <span class="math">n</span>.</p><p><strong>2)</strong> a) <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">-2/3</span>، <span class="math">v<sub>0</sub> = -1/4</span>؛ <span class="math">v<sub>n</sub> = -1/4 (-2/3)<sup>n</sup></span> &nbsp; b) <span class="math">u<sub>n</sub> = 5/(1 - v<sub>n</sub>) - 4</span>؛ <span class="math">lim u<sub>n</sub> = 1</span>.</p><p><strong>3)</strong> <span class="math">S<sub>n</sub> = -3/20 (-2/3)<sup>n</sup> [1 - (-2/3)<sup>2025</sup>]</span>؛ <span class="math">T<sub>n</sub> = 405 + 3/100 (-2/3)<sup>n</sup> [1 - (-2/3)<sup>2025</sup>]</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p>في هذا التمرين، نستعمل البرهان بالتراجع، متتالية مساعدة، المتتالية الهندسية، حساب النهاية، حساب مجموع حدود. الهدف هو إثبات خاصية لكل عدد طبيعي <span class="math">n</span> وإيجاد عبارة الحد العام وحساب النهاية وحساب مجموع حدود.</p>
<p class="pedagogy-step">نستعمل التحويلات الجبرية (توحيد المقام، التعويض، التبسيط) للوصول إلى العبارة المطلوبة.</p>
<p><strong>1)</strong> بالتعويض المباشر:</p>
      <p class="math-equation">u<sub>1</sub> = 2، u<sub>2</sub> = 1/2، u<sub>3</sub> = 7/5</p>

<p class="pedagogy-step">نستعمل البرهان بالتراجع على ثلاث مراحل: التحقق عند <span class="math">n = 0</span>، ثم فرضية التراجع، ثم الانتقال من <span class="math">n</span> إلى <span class="math">n + 1</span>.</p>
<p><strong>برهان بالتراجع:</strong> عند <span class="math">n = 0</span>، لدينا <span class="math">u<sub>0</sub> = 0</span>، إذن <span class="math">0 ≤ u<sub>0</sub> ≤ 2</span>.</p>
      <p>نفترض أن <span class="math">0 ≤ u<sub>n</sub> ≤ 2</span>، ونريد إثبات أن <span class="math">0 ≤ u<sub>n+1</sub> ≤ 2</span>.</p>
      <p>بما أن <span class="math">u<sub>n+1</sub> = (4 - u<sub>n</sub>)/(2 + u<sub>n</sub>)</span>، فإن <span class="math">u<sub>n+1</sub> ≥ 0</span> بما أن البسط والمقام موجبان.</p>
      <p>كما أن <span class="math">u<sub>n+1</sub> - 2 = (4 - u<sub>n</sub> - 4 - 2u<sub>n</sub>)/(2 + u<sub>n</sub>) = -3u<sub>n</sub>/(2 + u<sub>n</sub>) ≤ 0</span>.</p>
      <p>إذن <span class="math">u<sub>n+1</sub> ≤ 2</span>. وبالتالي العبارة صحيحة لكل <span class="math">n</span>.</p>

<p class="pedagogy-step">نعرف متتالية مساعدة حتى نحول العلاقة التراجعية إلى علاقة هندسية بسيطة.</p>
<p><strong>2)</strong> <strong>أ)</strong> لدينا <span class="math">v<sub>0</sub> = (0 - 1)/(0 + 4) = -1/4</span>.</p>
      <p>وباستعمال العلاقة التراجعية لـ <span class="math">u<sub>n</sub></span> نجد:</p>
      <p class="math-equation">v<sub>n+1</sub> = -2/3 × v<sub>n</sub></p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> متتالية هندسية أساسها <span class="math">-2/3</span> وحدها الأول <span class="math">-1/4</span>، وبالتالي:</p>
      <p class="math-equation">v<sub>n</sub> = -1/4 × (-2/3)<sup>n</sup></p>

<p class="pedagogy-step">نحسب النهاية باستعمال الحصر بين متتاليتين لهما نفس النهاية.</p>
<p><strong>ب)</strong> من <span class="math">v<sub>n</sub> = (u<sub>n</sub> - 1)/(u<sub>n</sub> + 4)</span>، نجد <span class="math">v<sub>n</sub>(u<sub>n</sub> + 4) = u<sub>n</sub> - 1</span>، ثم <span class="math">u<sub>n</sub>(1 - v<sub>n</sub>) = 1 + 4v<sub>n</sub></span>.</p>
      <p>وبما أن <span class="math">1 + 4v<sub>n</sub> = 5(1 - v<sub>n</sub>)</span> (باستعمال عبارة <span class="math">v<sub>n</sub></span>)، فإن:</p>
      <p class="math-equation">u<sub>n</sub> = 5/(1 - v<sub>n</sub>) - 4</p>
      <p>وبما أن <span class="math">(-2/3)<sup>n</sup></span> يؤول إلى 0، فإن <span class="math">v<sub>n</sub></span> يؤول إلى 0، ومنه:</p>
      <p class="math-equation">lim<sub>n→+∞</sub> u<sub>n</sub> = 1</p>

<p class="pedagogy-step">نعرف متتالية مساعدة حتى نحول العلاقة التراجعية إلى علاقة هندسية بسيطة؛ نستعمل صيغة مجموع حدود متتالية هندسية أو خاصية التلاصق.</p>
<p><strong>3)</strong> <span class="math">S<sub>n</sub></span> مجموع 2025 حد متتالية هندسية أساسها <span class="math">-2/3</span>:</p>
      <p class="math-equation">S<sub>n</sub> = v<sub>n</sub> × [1 - (-2/3)<sup>2025</sup>]/[1 + 2/3] = -3/20 × (-2/3)<sup>n</sup> × [1 - (-2/3)<sup>2025</sup>]</p>
      <p>لاحظ أن <span class="math">1/(4 + u<sub>k</sub>) = (1 - v<sub>k</sub>)/5</span>، إذن:</p>
      <p class="math-equation">T<sub>n</sub> = 405 - S<sub>n</sub>/5</p>
      <p>وبالتعويض عن <span class="math">S<sub>n</sub></span>:</p>
      <p class="math-equation">T<sub>n</sub> = 405 + 3/100 × (-2/3)<sup>n</sup> × [1 - (-2/3)<sup>2025</sup>]</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نتبع الترتيب التالي: البرهان بالتراجع، استعمال متتالية مساعدة، حساب النهاية، حساب المجموع، ونكتب النتيجة النهائية في كل جزء.</p>
</div>`,
    conceptHints: [
      {
        "title": "الحصر بالتراجع",
        "hint": "تحقق من n=0، ثم افترض أن u_n داخل المجال، واستعمل علاقة u_{n+1}=f(u_n) أو صورة المجال بالدالة لإثبات بقاء u_{n+1} داخل نفس المجال."
      },
      {
        "title": "المتتالية المساعدة",
        "hint": "عرف v_n حتى نحول العلاقة التراجعية إلى علاقة هندسية بسيطة، ثم أثبت ذلك بحساب النسبة v_{n+1}/v_n."
      },
      {
        "title": "حساب النهاية",
        "hint": "استعمل العبارة الصريحة أو الحصر أو حقيقة أن q^n يؤول إلى 0 عندما |q|<1 لاستنتاج النهاية."
      },
      {
        "title": "حساب المجموع",
        "hint": "حدد نوع الحدود (هندسية، متداخلة، لوغاريتمية) ثم استعمل الصيغة المناسبة للمجموع."
      }
    ],
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
  },  {
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
    quickSolution: `<p><strong>1)</strong> <span class="math">f</span> متناقصة تماما على <span class="math">[2, +∞[</span>؛ <span class="math">1/2 &lt; f(x) ≤ 3/4</span>.</p><p><strong>2)</strong> a) <span class="math">u<sub>n+1</sub>/u<sub>n</sub> = (n+1)/(2n) ≤ 3/4</span> &nbsp; b) <span class="math">u<sub>n</sub> ≤ 1/2 (3/4)<sup>n-2</sup></span>؛ <span class="math">lim u<sub>n</sub> = 0</span> &nbsp; ج) <span class="math">S<sub>n</sub> = 1/2 [1 - (1/2)<sup>n-1</sup>]</span> &nbsp; د) <span class="math">n = 10</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p>في هذا التمرين، نستعمل دراسة تغير الدالة بالمشتقة، التمثيل البياني للتخمين، دراسة الرتابة بإشارة الفرق، حساب النهاية، حساب مجموع حدود. الهدف هو دراسة اتجاه تغير المتتالية وحساب النهاية وحساب مجموع حدود.</p>
<p class="pedagogy-step">نستعمل المشتقة لدراسة تغير الدالة وصورة المجال؛ نستعمل دراسة إشارة الفرق <span class="math">u<sub>n+1</sub> - u<sub>n</sub></span> أو إشارة <span class="math">f(x) - x</span> لأن المطلوب اتجاه التغير؛ نحسب النهاية باستعمال النهايات المرجعية.</p>
<p><strong>1)</strong> لدينا <span class="math">f(x) = (x + 1)/(2x) = 1/2 + 1/(2x)</span>، وبالتالي:</p>
      <p class="math-equation">f'(x) = -1/(2x²) < 0</p>
      <p>إذن <span class="math">f</span> متناقصة تماما على <span class="math">[2, +∞[</span>. كما أن <span class="math">f(2) = 3/4</span> و <span class="math">lim<sub>x→+∞</sub> f(x) = 1/2</span>، وبالتالي:</p>
      <p class="math-equation">1/2 < f(x) ≤ 3/4</p>

<p class="pedagogy-step">نستعمل التمثيل البياني أولا للتخمين، ثم نبرهن الجزء جبريا ولا نكتفي بالرسم.</p>
<p><strong>2)</strong> <strong>أ)</strong> بما أن <span class="math">u<sub>n</sub> = n/2<sup>n</sup></span>، فإن:</p>
      <p class="math-equation">u<sub>n+1</sub>/u<sub>n</sub> = (n + 1)/(2n) = f(n) ≤ 3/4</p>

<p class="pedagogy-step">نحسب النهاية باستعمال الحصر بين متتاليتين لهما نفس النهاية.</p>
<p><strong>ب)</strong> بالتكرار نجد <span class="math">u<sub>n</sub> ≤ u<sub>2</sub>(3/4)<sup>n-2</sup></span>. وبما أن <span class="math">u<sub>2</sub> = 1/2</span>، فإن:</p>
      <p class="math-equation">u<sub>n</sub> ≤ 1/2 × (3/4)<sup>n-2</sup></p>
      <p>وبما أن <span class="math">(3/4)<sup>n-2</sup></span> يؤول إلى 0، فإن:</p>
      <p class="math-equation">lim u<sub>n</sub> = 0</p>

<p class="pedagogy-step">نستعمل صيغة مجموع حدود متتالية هندسية أو خاصية التلاصق.</p>
<p><strong>ج)</strong> لدينا <span class="math">u<sub>k</sub>/k = 1/2<sup>k</sup></span>، إذن:</p>
      <p class="math-equation">S<sub>n</sub> = 1/2² + 1/2³ + ... + 1/2<sup>n</sup> = 1/2 × [1 - (1/2)<sup>n-1</sup>]</p>

<p class="pedagogy-step">نستعمل صيغة مجموع حدود متتالية هندسية أو خاصية التلاصق.</p>
<p><strong>د)</strong> إذا كان <span class="math">S<sub>n</sub> = 511/1024</span>، فإن:</p>
      <p class="math-equation">1/2 × [1 - 1/2<sup>n-1</sup>] = 511/1024</p>
      <p>بعد الحل نجد <span class="math">1/2<sup>n</sup> = 1/1024 = 1/2<sup>10</sup></span>، وبالتالي:</p>
      <p class="math-equation">n = 10</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نتبع الترتيب التالي: التخمين البياني، دراسة الدالة، دراسة الرتابة، حساب النهاية، حساب المجموع، ونكتب النتيجة النهائية في كل جزء.</p>
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
    quickSolution: `<p><strong>1)</strong> a) <span class="math">0 &lt; u<sub>n</sub> ≤ 1/2</span> لكل <span class="math">n</span> &nbsp; b) <span class="math">(u<sub>n</sub>)</span> متناقصة تماما.</p><p><strong>2)</strong> a) <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">2</span>، <span class="math">v<sub>0</sub> = 1</span>؛ <span class="math">v<sub>n</sub> = 2<sup>n</sup></span> &nbsp; b) <span class="math">u<sub>n</sub> = 1/(2<sup>n</sup> + 1)</span>؛ <span class="math">lim u<sub>n</sub> = 0</span>.</p><p><strong>3)</strong> <span class="math">S<sub>n</sub> = 2<sup>n+1</sup> - 1</span>؛ <span class="math">T<sub>n</sub> = 2<sup>n+1</sup> + n</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p>في هذا التمرين، نستعمل البرهان بالتراجع، دراسة الرتابة بإشارة الفرق، متتالية مساعدة، المتتالية الهندسية، حساب النهاية، حساب مجموع حدود. الهدف هو إثبات خاصية لكل عدد طبيعي <span class="math">n</span> ودراسة اتجاه تغير المتتالية وإيجاد عبارة الحد العام وحساب النهاية وحساب مجموع حدود.</p>
<p class="pedagogy-step">نستعمل التحويلات الجبرية (توحيد المقام، التعويض، التبسيط) للوصول إلى العبارة المطلوبة.</p>
<p><strong>1)</strong> نكتب أولا:</p>
      <p class="math-equation">u<sub>n+1</sub> = -1 + 2/(2 - u<sub>n</sub>) = u<sub>n</sub>/(2 - u<sub>n</sub>)</p>

<p class="pedagogy-step">نستعمل الحصر بالتراجع على ثلاث مراحل: التحقق عند <span class="math">n = 0</span>، ثم فرضية التراجع، ثم الانتقال من <span class="math">n</span> إلى <span class="math">n + 1</span>؛ ثم ندرس الرتابة بإشارة الفرق <span class="math">u<sub>n+1</sub> - u<sub>n</sub></span> وليس بالتخمين البياني فقط.</p>
<p><strong>برهان بالتراجع:</strong> عند <span class="math">n = 0</span>، لدينا <span class="math">u<sub>0</sub> = 1/2</span>، إذن <span class="math">0 < u<sub>0</sub> ≤ 1/2</span>.</p>
      <p>نفترض أن <span class="math">0 < u<sub>n</sub> ≤ 1/2</span>. فإن <span class="math">3/2 ≤ 2 - u<sub>n</sub> < 2</span>، ومنه:</p>
      <p class="math-equation">u<sub>n+1</sub> > 0 &nbsp; و &nbsp; u<sub>n+1</sub> ≤ (1/2)/(3/2) = 1/3 ≤ 1/2</p>
      <p>إذن الخاصية تثبت بالتراجع.</p>
      <p>كما أن:</p>
      <p class="math-equation">u<sub>n+1</sub> - u<sub>n</sub> = u<sub>n</sub>(u<sub>n</sub> - 1)/(2 - u<sub>n</sub>) < 0</p>
      <p>وبالتالي <span class="math">(u<sub>n</sub>)</span> متناقصة تماما.</p>

<p class="pedagogy-step">نعرف متتالية مساعدة حتى نحول العلاقة التراجعية إلى علاقة هندسية بسيطة؛ بعد إيجاد العبارة الصريحة، نستعمل نهاية المتتالية الهندسية <span class="math">q<sup>n</sup></span> لحساب النهاية.</p>
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

<p class="pedagogy-step">نستعمل صيغة مجموع حدود متتالية هندسية أو خاصية التلاصق.</p>
<p><strong>3)</strong> لدينا:</p>
      <p class="math-equation">S<sub>n</sub> = 1 + 2 + ... + 2<sup>n</sup> = 2<sup>n+1</sup> - 1</p>
      <p>وبما أن <span class="math">1/u<sub>k</sub> = v<sub>k</sub> + 1</span>، فإن:</p>
      <p class="math-equation">T<sub>n</sub> = S<sub>n</sub> + (n + 1) = 2<sup>n+1</sup> + n</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نتبع الترتيب التالي: البرهان بالتراجع، دراسة الرتابة، استعمال متتالية مساعدة، حساب النهاية، حساب المجموع، ونكتب النتيجة النهائية في كل جزء.</p>
</div>`,
    conceptHints: [
      {
        "title": "الحصر بالتراجع",
        "hint": "تحقق من n=0، ثم افترض أن u_n داخل المجال، واستعمل علاقة u_{n+1}=f(u_n) أو صورة المجال بالدالة لإثبات بقاء u_{n+1} داخل نفس المجال."
      },
      {
        "title": "رتابة المتتالية",
        "hint": "لدراسة الاتجاه، احسب u_{n+1}-u_n أو درس إشارة f(x)-x على المجال المعطى، واستعمل الحصر لتحديد الإشارة دون الاكتفاء بالتخمين البياني."
      },
      {
        "title": "المتتالية المساعدة",
        "hint": "عرف v_n حتى نحول العلاقة التراجعية إلى علاقة هندسية بسيطة، ثم أثبت ذلك بحساب النسبة v_{n+1}/v_n."
      },
      {
        "title": "حساب النهاية",
        "hint": "استعمل العبارة الصريحة أو الحصر أو حقيقة أن q^n يؤول إلى 0 عندما |q|<1 لاستنتاج النهاية."
      },
      {
        "title": "حساب المجموع",
        "hint": "حدد نوع الحدود (هندسية، متداخلة، لوغاريتمية) ثم استعمل الصيغة المناسبة للمجموع."
      }
    ],
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
    quickSolution: `<p><strong>1)</strong> a) <span class="math">u<sub>n</sub> &lt; 5</span> لكل <span class="math">n</span> &nbsp; b) <span class="math">(u<sub>n</sub>)</span> متزايدة تماما.</p><p><strong>2)</strong> a) <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">4/5</span>، <span class="math">v<sub>0</sub> = -5</span>؛ <span class="math">v<sub>n</sub> = -5(4/5)<sup>n</sup></span> &nbsp; b) <span class="math">u<sub>n</sub> = 5 - 5(4/5)<sup>n</sup></span> &nbsp; c) <span class="math">lim u<sub>n</sub> = 5</span>.</p><p><strong>3)</strong> <span class="math">S<sub>n</sub> = -25 [1 - (4/5)<sup>n+1</sup>]</span>؛ <span class="math">T<sub>n</sub> = 5(n+1) - 25 [1 - (4/5)<sup>n+1</sup>]</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p>في هذا التمرين، نستعمل دراسة تغير الدالة بالمشتقة، البرهان بالتراجع، دراسة الرتابة بإشارة الفرق، متتالية مساعدة، المتتالية الهندسية، حساب النهاية، حساب مجموع حدود. الهدف هو إثبات خاصية لكل عدد طبيعي <span class="math">n</span> ودراسة اتجاه تغير المتتالية وإيجاد عبارة الحد العام وحساب النهاية وحساب مجموع حدود.</p>
<p class="pedagogy-step">نستعمل الحصر بالتراجع على ثلاث مراحل: التحقق عند <span class="math">n = 0</span>، ثم فرضية التراجع، ثم الانتقال من <span class="math">n</span> إلى <span class="math">n + 1</span>؛ ثم ندرس الرتابة بإشارة الفرق <span class="math">u<sub>n+1</sub> - u<sub>n</sub></span> وليس بالتخمين البياني فقط.</p>
<p><strong>1)</strong> <strong>برهان بالتراجع:</strong> عند <span class="math">n = 0</span>، لدينا <span class="math">u<sub>0</sub> = 0 < 5</span>.</p>
      <p>نفترض أن <span class="math">u<sub>n</sub> < 5</span>. فإن:</p>
      <p class="math-equation">u<sub>n+1</sub> = (4/5)u<sub>n</sub> + 1 < 4 + 1 = 5</p>
      <p>إذن الخاصية تثبت بالتراجع.</p>
      <p>كما أن:</p>
      <p class="math-equation">u<sub>n+1</sub> - u<sub>n</sub> = 1 - u<sub>n</sub>/5 = (5 - u<sub>n</sub>)/5 > 0</p>
      <p>وبالتالي <span class="math">(u<sub>n</sub>)</span> متزايدة تماما.</p>

<p class="pedagogy-step">نعرف متتالية مساعدة حتى نحول العلاقة التراجعية إلى علاقة هندسية بسيطة؛ بعد إيجاد العبارة الصريحة، نستعمل نهاية المتتالية الهندسية <span class="math">q<sup>n</sup></span> لحساب النهاية.</p>
<p><strong>2)</strong> لدينا <span class="math">v<sub>n</sub> = u<sub>n</sub> - 5</span>، وبالتالي:</p>
      <p class="math-equation">v<sub>n+1</sub> = u<sub>n+1</sub> - 5 = (4/5)u<sub>n</sub> + 1 - 5 = (4/5)(u<sub>n</sub> - 5) = (4/5)v<sub>n</sub></p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">4/5</span> وحدها الأول <span class="math">v<sub>0</sub> = -5</span>. وبالتالي:</p>
      <p class="math-equation">v<sub>n</sub> = -5(4/5)<sup>n</sup></p>
      <p>ومنه:</p>
      <p class="math-equation">u<sub>n</sub> = 5 - 5(4/5)<sup>n</sup></p>
      <p>وبالتالي:</p>
      <p class="math-equation">lim u<sub>n</sub> = 5</p>

<p class="pedagogy-step">نستعمل صيغة مجموع حدود متتالية هندسية أو خاصية التلاصق.</p>
<p><strong>3)</strong> لدينا:</p>
      <p class="math-equation">S<sub>n</sub> = -5 × [1 - (4/5)<sup>n+1</sup>]/(1/5) = -25 × [1 - (4/5)<sup>n+1</sup>]</p>
      <p>وبما أن <span class="math">u<sub>k</sub> = 5 - 5(4/5)<sup>k</sup></span>، فإن:</p>
      <p class="math-equation">u<sub>0</sub> + u<sub>1</sub> + ... + u<sub>n</sub> = 5(n + 1) - 25 × [1 - (4/5)<sup>n+1</sup>]</p>
      <div class="warning-box"><strong>ملاحظة:</strong> الصيغة <span class="math">T<sub>n</sub> = 5n - 20(1 - (4/5)<sup>n</sup>)</span> تتوافق مع مجموع الحدود من <span class="math">u<sub>0</sub></span> إلى <span class="math">u<sub>n-1</sub></span>.</div>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نتبع الترتيب التالي: دراسة الدالة، البرهان بالتراجع، دراسة الرتابة، استعمال متتالية مساعدة، حساب النهاية، حساب المجموع، ونكتب النتيجة النهائية في كل جزء.</p>
</div>`,
    conceptHints: [
      {
        "title": "الحصر بالتراجع",
        "hint": "تحقق من n=0، ثم افترض أن u_n داخل المجال، واستعمل علاقة u_{n+1}=f(u_n) أو صورة المجال بالدالة لإثبات بقاء u_{n+1} داخل نفس المجال."
      },
      {
        "title": "رتابة المتتالية",
        "hint": "لدراسة الاتجاه، احسب u_{n+1}-u_n أو درس إشارة f(x)-x على المجال المعطى، واستعمل الحصر لتحديد الإشارة دون الاكتفاء بالتخمين البياني."
      },
      {
        "title": "المتتالية المساعدة",
        "hint": "عرف v_n حتى نحول العلاقة التراجعية إلى علاقة هندسية بسيطة، ثم أثبت ذلك بحساب النسبة v_{n+1}/v_n."
      },
      {
        "title": "حساب النهاية",
        "hint": "استعمل العبارة الصريحة أو الحصر أو حقيقة أن q^n يؤول إلى 0 عندما |q|<1 لاستنتاج النهاية."
      },
      {
        "title": "حساب المجموع",
        "hint": "حدد نوع الحدود (هندسية، متداخلة، لوغاريتمية) ثم استعمل الصيغة المناسبة للمجموع."
      }
    ],
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
    id: "bac-2008-technical-math-subject-1",
    branch: "science",
    stream: "technical_math",
    year: "2008",
    title: "بكالوريا 2008 - تقني رياضي - الموضوع الأول",
    figureHtml: `<figure class="bac-figure" aria-label="تمثيل بياني تقريبي للدالة f والمستقيم y=x على المجال [0,2]">
      <svg class="bac-graph" viewBox="0 0 420 330" role="img">
        <rect x="0" y="0" width="420" height="330" rx="10" class="graph-bg"></rect>
        <g stroke="rgba(220,245,255,.14)" stroke-width="1">
          <line x1="60" y1="260" x2="360" y2="260"></line>
          <line x1="60" y1="207" x2="360" y2="207"></line>
          <line x1="60" y1="155" x2="360" y2="155"></line>
          <line x1="60" y1="102" x2="360" y2="102"></line>
          <line x1="60" y1="50" x2="360" y2="50"></line>
          <line x1="60" y1="260" x2="60" y2="50"></line>
          <line x1="135" y1="260" x2="135" y2="50"></line>
          <line x1="210" y1="260" x2="210" y2="50"></line>
          <line x1="285" y1="260" x2="285" y2="50"></line>
          <line x1="360" y1="260" x2="360" y2="50"></line>
        </g>
        <line x1="60" y1="260" x2="374" y2="260" stroke="#e8f8fb" stroke-width="2"></line>
        <line x1="60" y1="260" x2="60" y2="38" stroke="#e8f8fb" stroke-width="2"></line>
        <line x1="60" y1="260" x2="360" y2="50" stroke="#f2f7f8" stroke-width="3" fill="none"></line>
        <path d="M60 102 C132 88, 230 80, 360 76" stroke="#22d3c5" stroke-width="4" fill="none" stroke-linecap="round"></path>
        <polyline points="60,260 60,102 285,102 285,80 317,80 317,78 320,78" stroke="#f6c85f" stroke-width="3" fill="none" stroke-linejoin="round" stroke-linecap="round"></polyline>
        <g fill="#f7fbff" stroke="#071112" stroke-width="2">
          <circle cx="60" cy="260" r="4"></circle>
          <circle cx="285" cy="102" r="4"></circle>
          <circle cx="317" cy="80" r="4"></circle>
          <circle cx="320" cy="78" r="4"></circle>
        </g>
        <g stroke="#9fb7bf" stroke-width="2">
          <line x1="285" y1="260" x2="285" y2="268"></line>
          <line x1="317" y1="260" x2="317" y2="268"></line>
          <line x1="320" y1="260" x2="320" y2="282"></line>
        </g>
        <text x="66" y="278" class="graph-label">0</text>
        <text x="275" y="288" class="graph-label">u1</text>
        <text x="304" y="310" class="graph-label">u2</text>
        <text x="328" y="288" class="graph-label">√3</text>
        <text x="325" y="58" class="graph-label">y=x</text>
        <text x="214" y="72" class="graph-label">C_f</text>
        <text x="70" y="96" class="graph-label">f(0)=3/2</text>
      </svg>
      <figcaption>رسم تقريبي للدالة <span class="math">f(x)=(2x+3)/(x+2)</span> والمستقيم <span class="math">y=x</span> مع إنشاء الحدود الأولى من <span class="math">u_0=0</span>.</figcaption>
    </figure>`,
    statementHtml: `<div class="bac-statement">
      <p>تعتبر الدالة العددية <span class="math">f</span> المعرفة على المجال <span class="math">[0;2]</span> بالعبارة:</p>
      <p class="math-equation">f(x) = (2x+3)/(x+2)</p>
      <ol>
        <li>
          <ol type="أ">
            <li>ادرس تغيرات الدالة <span class="math">f</span> على المجال <span class="math">[0;2]</span>.</li>
            <li>أنشئ <span class="math">(C)</span> المنحنى الممثل للدالة <span class="math">f</span> في معلم متعامد ومتجانس <span class="math">(O;i;j)</span>، الوحدة على المحورين <span class="math">4cm</span>.</li>
            <li>برهن أنه إذا كان <span class="math">x∈[0;2]</span> فإن <span class="math">f(x)∈[0;2]</span>.</li>
          </ol>
        </li>
        <li>المتتالية العددية <span class="math">(u<sub>n</sub>)</span> معرفة على <span class="math">ℕ</span> كما يلي:</li>
      </ol>
      <p class="math-equation">u<sub>0</sub>=0, &nbsp; u<sub>n+1</sub>=f(u<sub>n</sub>)</p>
      <ol start="2">
        <li>
          <ol type="أ">
            <li>برر وجود المتتالية <span class="math">(u<sub>n</sub>)</span>، ثم احسب الحدين <span class="math">u<sub>1</sub></span> و<span class="math">u<sub>2</sub></span>.</li>
            <li>مثل على محور الفواصل الحدود <span class="math">u<sub>0</sub></span>، <span class="math">u<sub>1</sub></span>، <span class="math">u<sub>2</sub></span> و<span class="math">u<sub>3</sub></span>، بالاستعانة بالمنحنى <span class="math">(C)</span> والمستقيم <span class="math">(D)</span> ذي المعادلة <span class="math">y=x</span>.</li>
            <li>خمن اتجاه تغير وتقارب <span class="math">(u<sub>n</sub>)</span> انطلاقا من التمثيل البياني السابق.</li>
          </ol>
        </li>
        <li>
          <ol type="أ">
            <li>برهن بالتراجع على <span class="math">n</span> أن: <span class="math">0≤u<sub>n</sub>≤√3</span>.</li>
            <li>برهن أنه مهما يكن العدد الطبيعي <span class="math">n</span> فإن: <span class="math">u<sub>n+1</sub>&gt;u<sub>n</sub></span>. ماذا تستنتج بالنسبة إلى تقارب <span class="math">(u<sub>n</sub>)</span>؟</li>
            <li>تحقق أن:</li>
          </ol>
        </li>
      </ol>
      <p class="math-equation">u<sub>n+1</sub>-√3 = ((2-√3)/(u<sub>n</sub>+2))(u<sub>n</sub>-√3)</p>
      <p>عين عددا حقيقيا <span class="math">k</span> من المجال <span class="math">]0;1[</span> بحيث:</p>
      <p class="math-equation">|u<sub>n+1</sub>-√3| ≤ k|u<sub>n</sub>-√3|</p>
      <p>بين أنه من أجل كل <span class="math">n∈ℕ</span>: <span class="math">|u<sub>n</sub>-√3| ≤ k<sup>n</sup>|u<sub>0</sub>-√3|</span>، ثم استنتج <span class="math">lim u<sub>n</sub></span>.</p>
    </div>`,
    quickSolution: `<p><strong>1)</strong> <span class="math">f'(x)=1/(x+2)<sup>2</sup>&gt;0</span>، إذن <span class="math">f</span> متزايدة على <span class="math">[0;2]</span> و<span class="math">f([0;2])=[3/2;7/4]⊂[0;2]</span>.</p><p><strong>2)</strong> المتتالية معرفة؛ <span class="math">u<sub>1</sub>=3/2</span>، <span class="math">u<sub>2</sub>=12/7</span>، و<span class="math">u<sub>3</sub>=45/26</span>. التخمين: متزايدة ومتقاربة نحو <span class="math">√3</span>.</p><p><strong>3)</strong> <span class="math">0≤u<sub>n</sub>≤√3</span> و<span class="math">u<sub>n+1</sub>&gt;u<sub>n</sub></span>، فهي متقاربة. يمكن أخذ <span class="math">k=(2-√3)/2</span>، ومنه <span class="math">|u<sub>n</sub>-√3|≤k<sup>n</sup>√3</span> و<span class="math">lim u<sub>n</sub>=√3</span>.</p>`,
    solution: `<p><strong>1-أ)</strong> نحسب:</p><p class="math-equation">f'(x)=((2)(x+2)-(2x+3))/(x+2)<sup>2</sup>=1/(x+2)<sup>2</sup>&gt;0</p><p>إذن <span class="math">f</span> متزايدة على <span class="math">[0;2]</span>. كما أن <span class="math">f(0)=3/2</span> و<span class="math">f(2)=7/4</span>.</p><p><strong>1-ب)</strong> ينشأ المنحنى باستعمال نقط مثل <span class="math">(0,3/2)</span> و<span class="math">(2,7/4)</span>، وهو متزايد على المجال.</p><p><strong>1-ج)</strong> بما أن <span class="math">f</span> متزايدة على <span class="math">[0;2]</span> فإن:</p><p class="math-equation">f([0;2])=[f(0);f(2)]=[3/2;7/4]⊂[0;2]</p><p><strong>2-أ)</strong> بما أن <span class="math">u<sub>0</sub>=0∈[0;2]</span> و<span class="math">f([0;2])⊂[0;2]</span>، فإن المتتالية معرفة لكل <span class="math">n</span>. ثم:</p><p class="math-equation">u<sub>1</sub>=f(0)=3/2</p><p class="math-equation">u<sub>2</sub>=f(3/2)=12/7</p><p><strong>2-ب)</strong> باستعمال المنحنى <span class="math">(C)</span> والمستقيم <span class="math">y=x</span> نحصل تقريبيا على <span class="math">u<sub>0</sub>=0</span>، <span class="math">u<sub>1</sub>=3/2</span>، <span class="math">u<sub>2</sub>=12/7</span> و<span class="math">u<sub>3</sub>=45/26</span>.</p><p><strong>2-ج)</strong> من التمثيل البياني نخمن أن <span class="math">(u<sub>n</sub>)</span> متزايدة ومتقاربة نحو نقطة تقاطع <span class="math">C</span> مع المستقيم <span class="math">y=x</span>، أي نحو <span class="math">√3</span>.</p><p><strong>3-أ)</strong> نبرهن بالتراجع. عند <span class="math">n=0</span>: <span class="math">0≤u<sub>0</sub>≤√3</span>. نفرض <span class="math">0≤u<sub>n</sub>≤√3</span>. بما أن <span class="math">f</span> متزايدة:</p><p class="math-equation">f(0)≤f(u<sub>n</sub>)≤f(√3)</p><p>ولدينا <span class="math">f(√3)=√3</span>، إذن <span class="math">0≤u<sub>n+1</sub>≤√3</span>.</p><p><strong>3-ب)</strong></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub> = f(u<sub>n</sub>)-u<sub>n</sub> = (3-u<sub>n</sub><sup>2</sup>)/(u<sub>n</sub>+2)</p><p>وبما أن <span class="math">0≤u<sub>n</sub>&lt;√3</span> فإن البسط والمقام موجبان، ومنه <span class="math">u<sub>n+1</sub>&gt;u<sub>n</sub></span>. إذن المتتالية متزايدة ومحدودة من الأعلى بـ <span class="math">√3</span>، فهي متقاربة.</p><p><strong>3-ج)</strong> نحسب:</p><p class="math-equation">u<sub>n+1</sub>-√3 = (2u<sub>n</sub>+3)/(u<sub>n</sub>+2)-√3</p><p class="math-equation">u<sub>n+1</sub>-√3 = ((2-√3)/(u<sub>n</sub>+2))(u<sub>n</sub>-√3)</p><p>وبما أن <span class="math">u<sub>n</sub>≥0</span> فإن:</p><p class="math-equation">0&lt;(2-√3)/(u<sub>n</sub>+2)≤(2-√3)/2</p><p>نأخذ <span class="math">k=(2-√3)/2</span>. عندئذ:</p><p class="math-equation">|u<sub>n+1</sub>-√3|≤k|u<sub>n</sub>-√3|</p><p>وبالتراجع:</p><p class="math-equation">|u<sub>n</sub>-√3|≤k<sup>n</sup>|u<sub>0</sub>-√3|</p><p>وبما أن <span class="math">0&lt;k&lt;1</span> فإن <span class="math">k<sup>n</sup>→0</span>، وبالتالي <span class="math">lim u<sub>n</sub>=√3</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p><strong>1) ما المطلوب؟</strong> ندرس الدالة <span class="math">f</span> على <span class="math">[0;2]</span>، ثم نستعمل الرتابة لمعرفة صورة المجال.</p><p><strong>الفكرة المستعملة:</strong> اتجاه تغير دالة كسرية يحدد غالبا بالمشتقة، وصورة مجال مغلق بدالة متزايدة تعطى بقيم الطرفين.</p><p><strong>التطبيق:</strong></p><p class="math-equation">f'(x)=((2)(x+2)-(2x+3))/(x+2)<sup>2</sup>=1/(x+2)<sup>2</sup></p><p>على <span class="math">[0;2]</span> لدينا <span class="math">x+2&gt;0</span>، إذن <span class="math">f'(x)&gt;0</span>، ومنه <span class="math">f</span> متزايدة. نحسب الطرفين:</p><p class="math-equation">f(0)=3/2, &nbsp; f(2)=7/4</p><p>لذلك:</p><p class="math-equation">f([0;2])=[3/2;7/4]</p><p>وهذا المجال محتوى في <span class="math">[0;2]</span>.</p><p><strong>النتيجة:</strong> <span class="math">f</span> متزايدة و<span class="math">f([0;2])⊂[0;2]</span>.</p>
<p><strong>2) ما المطلوب؟</strong> نبرر أن المتتالية معرفة، نحسب حدودها الأولى، ثم نستعمل الرسم للتخمين.</p><p><strong>الفكرة المستعملة:</strong> بما أن <span class="math">f</span> ترسل <span class="math">[0;2]</span> داخل نفسه و<span class="math">u_0</span> ينتمي إلى هذا المجال، فإن كل الحدود تبقى داخل المجال.</p><p><strong>التطبيق:</strong> لدينا <span class="math">u_0=0∈[0;2]</span>. إذا كان <span class="math">u_n∈[0;2]</span> فإن <span class="math">u_{n+1}=f(u_n)∈[0;2]</span>. إذن المتتالية معرفة لكل <span class="math">n</span>. ثم:</p><p class="math-equation">u<sub>1</sub>=f(0)=3/2</p><p class="math-equation">u<sub>2</sub>=f(3/2)=(2×3/2+3)/(3/2+2)=6/(7/2)=12/7</p><p>وللرسم يمكن حساب:</p><p class="math-equation">u<sub>3</sub>=f(12/7)=45/26</p><p>باستعمال المنحنى <span class="math">C</span> والمستقيم <span class="math">y=x</span> نبدأ من <span class="math">u_0</span> على محور الفواصل، نصعد إلى <span class="math">C</span> ثم ننتقل أفقيا إلى <span class="math">y=x</span> ونكرر العملية.</p><p><strong>النتيجة:</strong> التخمين البياني هو أن <span class="math">(u_n)</span> متزايدة وتتقارب نحو <span class="math">√3</span>.</p>
<p><strong>3-أ) ما المطلوب؟</strong> نثبت الحصر <span class="math">0≤u_n≤√3</span> لكل <span class="math">n</span>.</p><p><strong>الفكرة المستعملة:</strong> نستعمل البرهان بالتراجع وربط الانتقال بصورة المجال <span class="math">[0;√3]</span> بالدالة <span class="math">f</span>.</p><p><strong>التطبيق:</strong> عند <span class="math">n=0</span> لدينا <span class="math">u_0=0</span>، وبالتالي <span class="math">0≤u_0≤√3</span>. نفرض أن <span class="math">0≤u_n≤√3</span>. بما أن <span class="math">f</span> متزايدة:</p><p class="math-equation">f(0)≤f(u_n)≤f(√3)</p><p>ونحسب:</p><p class="math-equation">f(√3)=(2√3+3)/(√3+2)=√3</p><p>لأن <span class="math">√3(√3+2)=3+2√3</span>. إذن <span class="math">u_{n+1}=f(u_n)≤√3</span>، كما أن <span class="math">u_{n+1}≥0</span>.</p><p><strong>النتيجة:</strong> <span class="math">0≤u_n≤√3</span> لكل <span class="math">n∈ℕ</span>.</p>
<p><strong>3-ب) ما المطلوب؟</strong> نثبت الرتابة ثم نستنتج التقارب.</p><p><strong>الفكرة المستعملة:</strong> نحسب الفرق <span class="math">u_{n+1}-u_n</span> ونحدد إشارته باستعمال الحصر السابق.</p><p><strong>التطبيق:</strong></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=(2u<sub>n</sub>+3)/(u<sub>n</sub>+2)-u<sub>n</sub></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=(3-u<sub>n</sub><sup>2</sup>)/(u<sub>n</sub>+2)</p><p>بما أن <span class="math">0≤u_n&lt;√3</span> فإن <span class="math">3-u_n^2&gt;0</span> و<span class="math">u_n+2&gt;0</span>، وبالتالي <span class="math">u_{n+1}&gt;u_n</span>. والمتتالية محدودة من الأعلى بـ <span class="math">√3</span>.</p><p><strong>النتيجة:</strong> <span class="math">(u_n)</span> متزايدة ومحدودة من الأعلى، إذن هي متقاربة.</p>
<p><strong>3-ج) ما المطلوب؟</strong> نقارن بعد <span class="math">u_n</span> عن <span class="math">√3</span> بمتتالية هندسية تناقصية.</p><p><strong>الفكرة المستعملة:</strong> نحسب <span class="math">u_{n+1}-√3</span> ونحصر العامل المضروب في <span class="math">u_n-√3</span> بعدد ثابت <span class="math">k</span> بين <span class="math">0</span> و<span class="math">1</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">u<sub>n+1</sub>-√3=(2u<sub>n</sub>+3)/(u<sub>n</sub>+2)-√3</p><p class="math-equation">u<sub>n+1</sub>-√3=(2u<sub>n</sub>+3-√3(u<sub>n</sub>+2))/(u<sub>n</sub>+2)</p><p class="math-equation">u<sub>n+1</sub>-√3=((2-√3)u<sub>n</sub>+3-2√3)/(u<sub>n</sub>+2)</p><p>وبما أن <span class="math">3-2√3=-(2-√3)√3</span>، نحصل على:</p><p class="math-equation">u<sub>n+1</sub>-√3=((2-√3)/(u<sub>n</sub>+2))(u<sub>n</sub>-√3)</p><p>ومن <span class="math">u_n≥0</span> نستنتج:</p><p class="math-equation">0&lt;(2-√3)/(u<sub>n</sub>+2)≤(2-√3)/2&lt;1</p><p>إذن نأخذ:</p><p class="math-equation">k=(2-√3)/2</p><p>فنجد:</p><p class="math-equation">|u<sub>n+1</sub>-√3|≤k|u<sub>n</sub>-√3|</p><p>وبتكرار المتراجحة أو بالتراجع:</p><p class="math-equation">|u<sub>n</sub>-√3|≤k<sup>n</sup>|u<sub>0</sub>-√3|</p><p>وبما أن <span class="math">0&lt;k&lt;1</span>، فإن <span class="math">k^n→0</span>.</p><p><strong>النتيجة:</strong> <span class="math">|u_n-√3|→0</span>، وبالتالي <span class="math">lim u_n=√3</span>.</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> بدأنا بدراسة الدالة وصورة المجال لضمان وجود المتتالية، ثم استعملنا الرسم للتخمين. بعد ذلك أثبتنا الحصر والرتابة جبريا، وأخيرا استعملنا متراجحة من الشكل الهندسي لإثبات أن النهاية هي <span class="math">√3</span>.</p>
</div>`,
    conceptHints: [
      { title: "دراسة دالة", hint: "ابدأ بالمشتقة لتحديد اتجاه التغير، ثم احسب f(0) وf(2) لأن الدالة متزايدة على المجال المطلوب." },
      { title: "التمثيل البياني للمتتالية", hint: "ابدأ من <span class='math'>u<sub>0</sub></span> على محور الفواصل، اصعد إلى المنحنى C، ثم انتقل أفقيا إلى المستقيم <span class='math'>y=x</span>، وكرر العملية للحصول على الحدود التالية." },
      { title: "الحصر بالتراجع", hint: "تحقق من <span class='math'>n=0</span>، ثم افترض أن <span class='math'>u<sub>n</sub></span> بين 0 و<span class='math'>√3</span>. استعمل تزايد f وقيمة <span class='math'>f(√3)</span> لإثبات بقاء <span class='math'>u<sub>n+1</sub></span> في نفس الحصر." },
      { title: "رتابة المتتالية", hint: "احسب <span class='math'>u<sub>n+1</sub>-u<sub>n</sub></span> واكتبها على مقام موجب. الحصر السابق يسمح لك بتحديد إشارة البسط <span class='math'>3-u<sub>n</sub><sup>2</sup></span>." },
      { title: "النهاية باستعمال حصر هندسي", hint: "بعد كتابة <span class='math'>u<sub>n+1</sub>-√3</span> كعامل في <span class='math'>u<sub>n</sub>-√3</span>، ابحث عن أكبر قيمة ممكنة للعامل عندما يكون <span class='math'>u<sub>n</sub>≥0</span>، ثم استعمل <span class='math'>k^n</span> عندما 0<k<1." }
    ]
  },  {
    id: "bac-2008-technical-math-subject-2",
    branch: "science",
    stream: "technical_math",
    year: "2008",
    title: "بكالوريا 2008 - تقني رياضي - الموضوع الثاني",
    figureHtml: `<figure class="bac-figure" aria-label="تمثيل بياني تقريبي للدالة f والمستقيمين y=x و y=x-2">
      <svg class="bac-graph" viewBox="0 0 420 300" role="img">
        <rect x="0" y="0" width="420" height="300" rx="10" class="graph-bg"></rect>
        <line x1="58" y1="246" x2="370" y2="246" class="axis"></line>
        <line x1="58" y1="246" x2="58" y2="34" class="axis"></line>
        <line x1="86" y1="246" x2="340" y2="54" class="graph-line muted"></line>
        <line x1="142" y1="246" x2="368" y2="76" class="graph-line dashed"></line>
        <path d="M60 34 C76 88, 104 152, 142 178 C180 204, 222 194, 270 158 C310 128, 344 100, 368 82" class="graph-curve"></path>
        <polyline points="142,246 142,178 232,178 232,164 258,164 258,153 276,153" class="graph-stair"></polyline>
        <circle cx="142" cy="246" r="4" class="graph-point"></circle>
        <circle cx="232" cy="178" r="4" class="graph-point"></circle>
        <circle cx="258" cy="164" r="4" class="graph-point"></circle>
        <text x="346" y="55" class="graph-label">y=x</text>
        <text x="322" y="92" class="graph-label">Δ: y=x-2</text>
        <text x="286" y="142" class="graph-label">C_f</text>
        <text x="136" y="264" class="graph-label">u0=1</text>
        <text x="224" y="264" class="graph-label">u1</text>
        <text x="252" y="264" class="graph-label">u2</text>
        <text x="272" y="264" class="graph-label">5/2</text>
      </svg>
      <figcaption>رسم تقريبي للمنحنى <span class="math">C_f</span> مع المستقيمين <span class="math">y=x</span> و<span class="math">Δ:y=x-2</span>، وبداية إنشاء حدود المتتالية من <span class="math">u_0=1</span>.</figcaption>
    </figure>`,
    statementHtml: `<div class="bac-statement">
      <ol>
        <li>الدالة العددية <span class="math">f</span> المعرفة على <span class="math">]-2;+∞[</span> كما يلي:</li>
      </ol>
      <p class="math-equation">f(x) = (x<sup>2</sup>+5)/(x+2)</p>
      <p>وليكن <span class="math">C_f</span> منحناها في معلم متعامد ومتجانس <span class="math">(O;i;j)</span>، وحدة الطول <span class="math">2cm</span>.</p>
      <ol type="أ">
        <li>احسب نهايات الدالة <span class="math">f</span> عند أطراف مجموعة التعريف.</li>
        <li>ادرس اتجاه تغير <span class="math">f</span> ثم شكل جدول تغيراتها.</li>
        <li>بين أن المستقيم <span class="math">Δ</span> ذا المعادلة <span class="math">y=x-2</span> مقارب للمنحنى <span class="math">C_f</span> بجوار <span class="math">+∞</span>، ثم ارسم <span class="math">C_f</span> و<span class="math">Δ</span>.</li>
        <li>بين أن صورة المجال <span class="math">[1;5/2]</span> بالدالة <span class="math">f</span> محتواة في المجال <span class="math">[1;5/2]</span>.</li>
      </ol>
      <ol start="2">
        <li>تعتبر المتتالية العددية <span class="math">(u<sub>n</sub>)</span> المعرفة بحدها الأول <span class="math">u<sub>0</sub>=1</span>، ومن أجل كل عدد طبيعي <span class="math">n</span> لدينا:</li>
      </ol>
      <p class="math-equation">u<sub>n+1</sub>=f(u<sub>n</sub>)</p>
      <ol type="أ">
        <li>باستعمال <span class="math">C_f</span> والمستقيم ذي المعادلة <span class="math">y=x</span>، مثل <span class="math">u<sub>0</sub></span> و<span class="math">u<sub>1</sub></span> و<span class="math">u<sub>2</sub></span> و<span class="math">u<sub>3</sub></span> على حامل محور الفواصل.</li>
        <li>خمن اتجاه تغير وتقارب المتتالية <span class="math">(u<sub>n</sub>)</span>.</li>
        <li>بين أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">1≤u<sub>n</sub>≤5/2</span>، وأن المتتالية <span class="math">(u<sub>n</sub>)</span> متزايدة.</li>
        <li>استنتج أن <span class="math">(u<sub>n</sub>)</span> متقاربة، واحسب <span class="math">lim u<sub>n</sub></span>.</li>
      </ol>
    </div>`,
    quickSolution: `<p><strong>1-أ)</strong> <span class="math">lim<sub>x→-2+</sub> f(x)=+∞</span> و<span class="math">lim<sub>x→+∞</sub> f(x)=+∞</span>.</p><p><strong>1-ب)</strong> <span class="math">f'(x)=((x+5)(x-1))/(x+2)<sup>2</sup></span>، فتتناقص على <span class="math">]-2;1]</span> وتتزايد على <span class="math">[1;+∞[</span>، و<span class="math">f(1)=2</span>.</p><p><strong>1-ج)</strong> <span class="math">f(x)=x-2+9/(x+2)</span>، إذن <span class="math">Δ:y=x-2</span> مقارب عند <span class="math">+∞</span>.</p><p><strong>1-د)</strong> <span class="math">f([1;5/2])=[2;5/2]⊂[1;5/2]</span>.</p><p><strong>2)</strong> التخمين: متزايدة ومتقاربة. لكل <span class="math">n</span>: <span class="math">1≤u<sub>n</sub>≤5/2</span> و<span class="math">u<sub>n+1</sub>-u<sub>n</sub>=(5-2u<sub>n</sub>)/(u<sub>n</sub>+2)≥0</span>. النهاية <span class="math">5/2</span>.</p>`,
    solution: `<p><strong>1-أ)</strong> عند <span class="math">x→-2+</span> يكون <span class="math">x+2→0+</span> و<span class="math">x^2+5→9</span>، إذن <span class="math">f(x)→+∞</span>. وعند <span class="math">x→+∞</span> لدينا <span class="math">f(x)∼x</span>، إذن <span class="math">f(x)→+∞</span>.</p><p><strong>1-ب)</strong></p><p class="math-equation">f'(x)=((2x)(x+2)-(x<sup>2</sup>+5))/(x+2)<sup>2</sup>=((x+5)(x-1))/(x+2)<sup>2</sup></p><p>على <span class="math">]-2;+∞[</span> يكون <span class="math">x+5&gt;0</span> والمقام موجب، فتكون إشارة <span class="math">f'</span> هي إشارة <span class="math">x-1</span>. إذن <span class="math">f</span> متناقصة على <span class="math">]-2;1]</span> ومتزايدة على <span class="math">[1;+∞[</span>، و<span class="math">f(1)=2</span>.</p><p><strong>1-ج)</strong> بالقسمة الإقليدية:</p><p class="math-equation">f(x)=x-2+9/(x+2)</p><p>ومنه <span class="math">f(x)-(x-2)=9/(x+2)→0</span> عندما <span class="math">x→+∞</span>، إذن <span class="math">Δ:y=x-2</span> مقارب مائل للمنحنى.</p><p><strong>1-د)</strong> على <span class="math">[1;5/2]</span> الدالة متزايدة، لذلك:</p><p class="math-equation">f([1;5/2])=[f(1);f(5/2)]=[2;5/2]⊂[1;5/2]</p><p><strong>2-أ)</strong> بالإنشاء البياني ننطلق من <span class="math">u_0=1</span> على محور الفواصل، نصعد إلى <span class="math">C_f</span> ثم ننتقل أفقيا إلى المستقيم <span class="math">y=x</span>. الحدود الأولى هي <span class="math">u_1=2</span>، <span class="math">u_2=9/4</span>، <span class="math">u_3=161/68</span>.</p><p><strong>2-ب)</strong> من الرسم نخمن أن <span class="math">(u_n)</span> متزايدة ومتقاربة نحو <span class="math">5/2</span>.</p><p><strong>2-ج)</strong> نبرهن بالتراجع. عند <span class="math">n=0</span>: <span class="math">1≤u_0≤5/2</span>. إذا كان <span class="math">u_n∈[1;5/2]</span>، فبما أن <span class="math">f([1;5/2])⊂[1;5/2]</span> نحصل على <span class="math">u_{n+1}∈[1;5/2]</span>. إذن <span class="math">1≤u_n≤5/2</span> لكل <span class="math">n</span>.</p><p>كما أن:</p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=(u<sub>n</sub><sup>2</sup>+5)/(u<sub>n</sub>+2)-u<sub>n</sub>=(5-2u<sub>n</sub>)/(u<sub>n</sub>+2)</p><p>وبما أن <span class="math">u_n≤5/2</span>، فإن <span class="math">5-2u_n≥0</span> والمقام موجب، إذن <span class="math">u_{n+1}≥u_n</span>.</p><p><strong>2-د)</strong> المتتالية متزايدة ومحدودة من الأعلى بـ <span class="math">5/2</span>، فهي متقاربة. إذا كانت نهايتها <span class="math">l</span>، فإن:</p><p class="math-equation">l=(l<sup>2</sup>+5)/(l+2)</p><p>ومنه <span class="math">l<sup>2</sup>+2l=l<sup>2</sup>+5</span>، أي <span class="math">l=5/2</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p><strong>1) ما المطلوب؟</strong> ندرس الدالة <span class="math">f</span>: النهايات، الرتابة، المقارب المائل، ثم صورة المجال <span class="math">[1;5/2]</span>.</p><p><strong>الفكرة المستعملة:</strong> عند حدود المجال نستعمل سلوك البسط والمقام. أما الرتابة فتأتي من المشتقة، والمقارب من القسمة الإقليدية.</p><p><strong>التطبيق:</strong> عندما <span class="math">x→-2+</span> يكون المقام <span class="math">x+2→0+</span> والبسط <span class="math">x^2+5→9</span>، إذن:</p><p class="math-equation">lim<sub>x→-2+</sub> f(x)=+∞</p><p>وعندما <span class="math">x→+∞</span> فإن <span class="math">f(x)</span> يكافئ <span class="math">x</span>، ومنه:</p><p class="math-equation">lim<sub>x→+∞</sub> f(x)=+∞</p><p>نحسب المشتقة:</p><p class="math-equation">f'(x)=((2x)(x+2)-(x<sup>2</sup>+5))/(x+2)<sup>2</sup></p><p class="math-equation">f'(x)=(x<sup>2</sup>+4x-5)/(x+2)<sup>2</sup>=((x+5)(x-1))/(x+2)<sup>2</sup></p><p>على المجال <span class="math">]-2;+∞[</span> لدينا <span class="math">x+5&gt;0</span> والمقام موجب، لذلك إشارة <span class="math">f'</span> هي إشارة <span class="math">x-1</span>. إذن <span class="math">f</span> متناقصة على <span class="math">]-2;1]</span> ومتزايدة على <span class="math">[1;+∞[</span>، وقيمتها الصغرى:</p><p class="math-equation">f(1)=2</p><p>وللمقارب المائل نكتب:</p><p class="math-equation">x<sup>2</sup>+5=(x+2)(x-2)+9</p><p>إذن:</p><p class="math-equation">f(x)=x-2+9/(x+2)</p><p>وبالتالي <span class="math">f(x)-(x-2)→0</span> عندما <span class="math">x→+∞</span>، فيكون <span class="math">Δ:y=x-2</span> مقاربا مائلا.</p><p>على <span class="math">[1;5/2]</span> الدالة متزايدة، إذن:</p><p class="math-equation">f([1;5/2])=[f(1);f(5/2)]</p><p class="math-equation">f(1)=2, &nbsp; f(5/2)=5/2</p><p><strong>النتيجة:</strong> <span class="math">f([1;5/2])=[2;5/2]⊂[1;5/2]</span>.</p>
<p><strong>2-أ و2-ب) ما المطلوب؟</strong> نمثل الحدود الأولى بيانيا ثم نخمن الرتابة والنهاية.</p><p><strong>الفكرة المستعملة:</strong> عند متتالية من الشكل <span class="math">u_{n+1}=f(u_n)</span> نستعمل المنحنى <span class="math">C_f</span> والمستقيم <span class="math">y=x</span>: صعود إلى المنحنى ثم انتقال أفقي إلى المستقيم.</p><p><strong>التطبيق:</strong> نحسب لتأكيد مواضع الحدود:</p><p class="math-equation">u<sub>1</sub>=f(1)=2</p><p class="math-equation">u<sub>2</sub>=f(2)=9/4</p><p class="math-equation">u<sub>3</sub>=f(9/4)=161/68</p><p>من الرسم تظهر الحدود متزايدة وتتجه نحو نقطة ثابتة للدالة داخل المجال.</p><p><strong>النتيجة:</strong> نخمن أن <span class="math">(u_n)</span> متزايدة ومتقاربة نحو <span class="math">5/2</span>.</p>
<p><strong>2-ج) ما المطلوب؟</strong> نثبت الحصر <span class="math">1≤u_n≤5/2</span> والرتابة.</p><p><strong>الفكرة المستعملة:</strong> الحصر يثبت بالتراجع باستعمال صورة المجال، والرتابة تثبت بحساب الفرق <span class="math">u_{n+1}-u_n</span>.</p><p><strong>التطبيق:</strong> عند <span class="math">n=0</span> لدينا <span class="math">u_0=1</span>، إذن <span class="math">1≤u_0≤5/2</span>. نفرض أن <span class="math">u_n∈[1;5/2]</span>. بما أن <span class="math">f([1;5/2])⊂[1;5/2]</span>، فإن:</p><p class="math-equation">u<sub>n+1</sub>=f(u<sub>n</sub>)∈[1;5/2]</p><p>إذن بالتراجع:</p><p class="math-equation">1≤u<sub>n</sub>≤5/2</p><p>نحسب الفرق:</p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=(u<sub>n</sub><sup>2</sup>+5)/(u<sub>n</sub>+2)-u<sub>n</sub></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=(5-2u<sub>n</sub>)/(u<sub>n</sub>+2)</p><p>وبما أن <span class="math">u_n≤5/2</span> فإن <span class="math">5-2u_n≥0</span>، كما أن <span class="math">u_n+2&gt;0</span>.</p><p><strong>النتيجة:</strong> <span class="math">u_{n+1}≥u_n</span>، أي إن <span class="math">(u_n)</span> متزايدة.</p>
<p><strong>2-د) ما المطلوب؟</strong> نستنتج التقارب ونحسب النهاية.</p><p><strong>الفكرة المستعملة:</strong> المتتالية المتزايدة والمحدودة من الأعلى متقاربة. لحساب النهاية نعوض في العلاقة التراجعية لأن <span class="math">f</span> مستمرة على المجال.</p><p><strong>التطبيق:</strong> من السؤال السابق <span class="math">(u_n)</span> متزايدة ومحدودة من الأعلى بـ <span class="math">5/2</span>، إذن لها نهاية نسميها <span class="math">l</span>. بالمرور إلى النهاية في <span class="math">u_{n+1}=f(u_n)</span>:</p><p class="math-equation">l=(l<sup>2</sup>+5)/(l+2)</p><p>وبما أن <span class="math">l+2&gt;0</span>:</p><p class="math-equation">l(l+2)=l<sup>2</sup>+5</p><p class="math-equation">l<sup>2</sup>+2l=l<sup>2</sup>+5</p><p class="math-equation">2l=5</p><p><strong>النتيجة:</strong></p><p class="math-equation">lim u<sub>n</sub>=5/2</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> درسنا الدالة أولا للحصول على الرتابة والمقارب وصورة المجال، ثم استعملنا الرسم للتخمين. بعد ذلك أثبتنا الحصر بالتراجع، والرتابة بحساب الفرق، وأخيرا حسبنا النهاية من معادلة النقطة الثابتة.</p>
</div>`,
    conceptHints: [
      { title: "دراسة دالة كسرية", hint: "احسب المشتقة باستعمال قاعدة مشتق خارج، ثم عامل البسط لتحديد إشارة f'. على المجال ]-2,+∞[ يكون x+5 موجبا." },
      { title: "المقارب المائل", hint: "اقسم <span class='math'>x<sup>2</sup>+5</span> على x+2. إذا كتبت <span class='math'>f(x)=x-2+</span>باقي/(x+2)، فافحص نهاية الفرق بين <span class='math'>f(x)</span> وx-2." },
      { title: "صورة مجال", hint: "على [1;<span class='math'>5/2</span>] الدالة متزايدة، لذلك تكفي قيمتا الطرفين f(1) و<span class='math'>f(5/2)</span> لتحديد الصورة." },
      { title: "التمثيل البياني للمتتالية", hint: "ابدأ من <span class='math'>u<sub>0</sub></span> على محور الفواصل، اصعد إلى C_f، ثم انتقل أفقيا إلى <span class='math'>y=x</span>، وبعدها انزل أو تابع الإسقاط على محور الفواصل لقراءة الحدود التالية." },
      { title: "الحصر والرتابة", hint: "للحصر استعمل f([1;<span class='math'>5/2</span>])⊂[1;<span class='math'>5/2</span>]. وللرتابة احسب <span class='math'>u<sub>n+1</sub>-u<sub>n</sub></span> ثم استعمل أن <span class='math'>u<sub>n</sub>≤5/2</span>." }
    ]
  },  {
    id: "bac-2009-technical-math-subject-1",
    branch: "science",
    stream: "technical_math",
    year: "2009",
    title: "بكالوريا 2009 - تقني رياضي - الموضوع الأول",
    statementHtml: `<div class="bac-statement">
      <p><strong>التمرين: الأعداد الطبيعية والمتتاليات الهندسية</strong></p>
      <ol>
        <li>
          <ol type="أ">
            <li>عين الأعداد الطبيعية التي مربع كل منها يقسم <span class="math">2009</span>.</li>
            <li>ليكن <span class="math">a</span> و<span class="math">u<sub>0</sub></span> عددين طبيعيين غير معدومين، و<span class="math">(u<sub>n</sub>)</span> متتالية هندسية أساسها <span class="math">a</span> وحدها الأول <span class="math">u<sub>0</sub></span>، بحيث: <span class="math">u<sub>1</sub><sup>2</sup> + u<sub>2</sub> + 35a<sup>2</sup> = 2009</span>. احسب <span class="math">a</span> و<span class="math">u<sub>0</sub></span>.</li>
          </ol>
        </li>
        <li>ثم نضع <span class="math">a=7</span> و<span class="math">u<sub>0</sub>=2</span>، احسب <span class="math">u<sub>n</sub></span> بدلالة <span class="math">n</span>.</li>
        <li>نضع <span class="math">δ<sub>n</sub>=u<sub>0</sub>+u<sub>1</sub>+...+u<sub>n</sub></span>.
          <ol type="أ">
            <li>عبر عن <span class="math">δ<sub>n</sub></span> بدلالة <span class="math">n</span>.</li>
            <li>عين العدد الطبيعي <span class="math">n</span> حتى يكون <span class="math">δ<sub>n</sub>=800</span>.</li>
          </ol>
        </li>
      </ol>
    </div>`,
    quickSolution: `<p><strong>1-أ)</strong> الأعداد هي <span class="math">1</span> و<span class="math">7</span>.</p><p><strong>1-ب)</strong> <span class="math">a=7</span> و<span class="math">u<sub>0</sub>=2</span>.</p><p><strong>2)</strong> <span class="math">u<sub>n</sub>=2×7<sup>n</sup></span>.</p><p><strong>3-أ)</strong> <span class="math">δ<sub>n</sub>=(7<sup>n+1</sup>-1)/3</span>.</p><p><strong>3-ب)</strong> <span class="math">n=3</span>.</p>`,
    solution: `<p><strong>1-أ)</strong> نحلل:</p><p class="math-equation">2009 = 49×41 = 7<sup>2</sup>×41</p><p>إذا كان <span class="math">m<sup>2</sup></span> يقسم <span class="math">2009</span> فإن <span class="math">m</span> لا يمكن أن يحتوي إلا على العامل <span class="math">7</span> بأس لا يتجاوز <span class="math">1</span>. إذن الأعداد المطلوبة هي <span class="math">1</span> و<span class="math">7</span>.</p><p><strong>1-ب)</strong> بما أن المتتالية هندسية أساسها <span class="math">a</span> وحدها الأول <span class="math">u<sub>0</sub></span>، فإن:</p><p class="math-equation">u<sub>1</sub>=au<sub>0</sub>, &nbsp; u<sub>2</sub>=a<sup>2</sup>u<sub>0</sub></p><p>وبالتعويض:</p><p class="math-equation">a<sup>2</sup>u<sub>0</sub><sup>2</sup> + a<sup>2</sup>u<sub>0</sub> + 35a<sup>2</sup> = 2009</p><p class="math-equation">a<sup>2</sup>(u<sub>0</sub><sup>2</sup>+u<sub>0</sub>+35)=2009</p><p>إذن <span class="math">a<sup>2</sup></span> يقسم <span class="math">2009</span>، ومن السؤال السابق <span class="math">a=1</span> أو <span class="math">a=7</span>. إذا كان <span class="math">a=1</span> نحصل على <span class="math">u<sub>0</sub><sup>2</sup>+u<sub>0</sub>+35=2009</span> ولا تعطي عددا طبيعيا. وإذا كان <span class="math">a=7</span>:</p><p class="math-equation">u<sub>0</sub><sup>2</sup>+u<sub>0</sub>+35=41</p><p class="math-equation">u<sub>0</sub><sup>2</sup>+u<sub>0</sub>-6=0</p><p>ومنه <span class="math">u<sub>0</sub>=2</span> لأنه غير معدوم وطبيعي. إذن <span class="math">a=7</span> و<span class="math">u<sub>0</sub>=2</span>.</p><p><strong>2)</strong> الحد العام لمتتالية هندسية هو:</p><p class="math-equation">u<sub>n</sub>=u<sub>0</sub>a<sup>n</sup></p><p>ومنه:</p><p class="math-equation">u<sub>n</sub>=2×7<sup>n</sup></p><p><strong>3-أ)</strong> لدينا مجموع حدود هندسية من <span class="math">u<sub>0</sub></span> إلى <span class="math">u<sub>n</sub></span>، وعددها <span class="math">n+1</span>:</p><p class="math-equation">δ<sub>n</sub>=2(1+7+7<sup>2</sup>+...+7<sup>n</sup>)</p><p class="math-equation">δ<sub>n</sub>=2(7<sup>n+1</sup>-1)/(7-1)=(7<sup>n+1</sup>-1)/3</p><p><strong>3-ب)</strong> نحل:</p><p class="math-equation">(7<sup>n+1</sup>-1)/3=800</p><p class="math-equation">7<sup>n+1</sup>=2401=7<sup>4</sup></p><p>إذن <span class="math">n+1=4</span> ومنه <span class="math">n=3</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p><strong>1-أ) ما المطلوب؟</strong> نبحث عن كل عدد طبيعي <span class="math">m</span> بحيث يكون <span class="math">m^2</span> قاسما للعدد <span class="math">2009</span>.</p><p><strong>الفكرة المستعملة:</strong> نستعمل تحليل العدد إلى عوامل أولية، لأن شرط قسمة مربع عدد مرتبط بأسس العوامل الأولية.</p><p><strong>التطبيق:</strong></p><p class="math-equation">2009 = 49×41 = 7<sup>2</sup>×41</p><p>حتى يكون <span class="math">m^2</span> قاسما لـ <span class="math">2009</span>، لا بد أن تكون أسس العوامل في <span class="math">m^2</span> أصغر أو تساوي الأسس الموجودة في <span class="math">2009</span>. العامل الوحيد الذي يمكن أن يظهر في مربع غير <span class="math">1</span> هو <span class="math">7^2</span>.</p><p><strong>النتيجة:</strong> الأعداد المطلوبة هي <span class="math">1</span> و<span class="math">7</span>.</p>
<p><strong>1-ب) ما المطلوب؟</strong> نحسب الأساس <span class="math">a</span> والحد الأول <span class="math">u_0</span> باستعمال الشرط المعطى.</p><p><strong>الفكرة المستعملة:</strong> بما أن المتتالية هندسية، نكتب <span class="math">u_1</span> و<span class="math">u_2</span> بدلالة <span class="math">a</span> و<span class="math">u_0</span>. بعد التعويض سيظهر أن <span class="math">a^2</span> يقسم <span class="math">2009</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">u<sub>1</sub>=au<sub>0</sub>, &nbsp; u<sub>2</sub>=a<sup>2</sup>u<sub>0</sub></p><p>نعوض في العلاقة:</p><p class="math-equation">u<sub>1</sub><sup>2</sup>+u<sub>2</sub>+35a<sup>2</sup>=2009</p><p class="math-equation">a<sup>2</sup>u<sub>0</sub><sup>2</sup>+a<sup>2</sup>u<sub>0</sub>+35a<sup>2</sup>=2009</p><p class="math-equation">a<sup>2</sup>(u<sub>0</sub><sup>2</sup>+u<sub>0</sub>+35)=2009</p><p>إذن <span class="math">a^2</span> يقسم <span class="math">2009</span>، وبما أن <span class="math">a</span> طبيعي غير معدوم، فمن السؤال السابق: <span class="math">a=1</span> أو <span class="math">a=7</span>.</p><p>إذا كان <span class="math">a=1</span> فإن:</p><p class="math-equation">u<sub>0</sub><sup>2</sup>+u<sub>0</sub>+35=2009</p><p class="math-equation">u<sub>0</sub><sup>2</sup>+u<sub>0</sub>-1974=0</p><p>وهذه لا تعطي حلا طبيعيا لأن <span class="math">1+4×1974=7897</span> ليس مربعا كاملا.</p><p>إذا كان <span class="math">a=7</span> فإن:</p><p class="math-equation">49(u<sub>0</sub><sup>2</sup>+u<sub>0</sub>+35)=2009</p><p class="math-equation">u<sub>0</sub><sup>2</sup>+u<sub>0</sub>+35=41</p><p class="math-equation">u<sub>0</sub><sup>2</sup>+u<sub>0</sub>-6=0</p><p class="math-equation">(u<sub>0</sub>-2)(u<sub>0</sub>+3)=0</p><p>وبما أن <span class="math">u_0</span> طبيعي غير معدوم، نأخذ <span class="math">u_0=2</span>.</p><p><strong>النتيجة:</strong> <span class="math">a=7</span> و<span class="math">u<sub>0</sub>=2</span>.</p>
<p><strong>2) ما المطلوب؟</strong> نكتب الحد العام <span class="math">u_n</span>.</p><p><strong>الفكرة المستعملة:</strong> في المتتالية الهندسية ذات الحد الأول <span class="math">u_0</span> والأساس <span class="math">a</span> يكون <span class="math">u_n=u_0a^n</span>.</p><p><strong>التطبيق والنتيجة:</strong></p><p class="math-equation">u<sub>n</sub>=2×7<sup>n</sup></p>
<p><strong>3-أ) ما المطلوب؟</strong> نحسب مجموع الحدود من <span class="math">u_0</span> إلى <span class="math">u_n</span>.</p><p><strong>الفكرة المستعملة:</strong> هذا مجموع هندسي عدد حدوده <span class="math">n+1</span>، حده الأول <span class="math">2</span> وأساسه <span class="math">7</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">δ<sub>n</sub>=2+2×7+2×7<sup>2</sup>+...+2×7<sup>n</sup></p><p class="math-equation">δ<sub>n</sub>=2(1+7+7<sup>2</sup>+...+7<sup>n</sup>)</p><p class="math-equation">δ<sub>n</sub>=2(7<sup>n+1</sup>-1)/(7-1)</p><p><strong>النتيجة:</strong></p><p class="math-equation">δ<sub>n</sub>=(7<sup>n+1</sup>-1)/3</p>
<p><strong>3-ب) ما المطلوب؟</strong> نعين <span class="math">n</span> حتى يصبح المجموع مساويا لـ <span class="math">800</span>.</p><p><strong>الفكرة المستعملة:</strong> نستعمل صيغة <span class="math">δ_n</span> ونحولها إلى مساواة بين قوتين للعدد <span class="math">7</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">(7<sup>n+1</sup>-1)/3=800</p><p class="math-equation">7<sup>n+1</sup>-1=2400</p><p class="math-equation">7<sup>n+1</sup>=2401=7<sup>4</sup></p><p><strong>النتيجة:</strong> <span class="math">n+1=4</span>، وبالتالي <span class="math">n=3</span>.</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> بدأنا بتحليل <span class="math">2009</span> لمعرفة القواسم التي مربعاتها تقسمه، ثم استعملنا ذلك لحصر قيمة <span class="math">a</span>. بعد إيجاد <span class="math">a</span> و<span class="math">u_0</span> كتبنا الحد العام للمتتالية الهندسية، ثم طبقنا صيغة مجموع هندسي لإيجاد <span class="math">δ_n</span> وتحديد <span class="math">n</span>.</p>
</div>`,
    conceptHints: [
      { title: "تحليل عدد إلى عوامل أولية", hint: "ابدأ بتحليل 2009. بعد معرفة الأسس في التحليل، حدد ما هي الأعداد التي يمكن أن تظهر مربعاتها داخل هذا التحليل." },
      { title: "استعمال شرط المتتالية الهندسية", hint: "اكتب <span class='math'>u<sub>1</sub></span> و<span class='math'>u<sub>2</sub></span> بدلالة <span class='math'>u<sub>0</sub></span> وa، ثم عوض في العلاقة المعطاة. حاول استخراج عامل مشترك هو <span class='math'>a<sup>2</sup></span>." },
      { title: "اختيار قيمة a", hint: "بعد ظهور أن <span class='math'>a<sup>2</sup></span> يقسم 2009، استعمل نتيجة السؤال الأول لحصر الإمكانات، ثم اختبر كل قيمة في المعادلة المتبقية على <span class='math'>u<sub>0</sub></span>." },
      { title: "مجموع هندسي", hint: "بعد إيجاد <span class='math'>u<sub>n</sub></span>، اكتب δ_n كمجموع حدود هندسية من الرتبة 0 إلى n. انتبه إلى أن عدد الحدود هو <span class='math'>n+1</span>." }
    ]
  },  {
    id: "bac-2011-technical-math-subject-1",
    branch: "science",
    stream: "technical_math",
    year: "2011",
    title: "بكالوريا 2011 - تقني رياضي - الموضوع الأول",
    statementHtml: `<div class="bac-statement">
      <p><strong>التمرين: المتتاليات العددية والجداء</strong></p>
      <p>المتتالية العددية <span class="math">(u<sub>n</sub>)</span> المعرفة على <span class="math">ℕ*</span> كما يلي:</p>
      <p class="math-equation">u<sub>n</sub> = ((n+1)<sup>2</sup>)/(n(n+2))</p>
      <ol>
        <li>أثبت أنه من أجل كل عدد طبيعي غير معدوم <span class="math">n</span> فإن <span class="math">u<sub>n</sub> = 1 + 1/(n(n+2))</span>، ثم استنتج أن <span class="math">u<sub>n</sub> &gt; 1</span>.</li>
        <li>ادرس اتجاه تغير <span class="math">(u<sub>n</sub>)</span>، ثم بين أنها متقاربة، ثم احسب نهاية <span class="math">(u<sub>n</sub>)</span>.</li>
        <li>ليكن الجداء <span class="math">P<sub>n</sub></span> المعرف كما يلي: <span class="math">P<sub>n</sub>=u<sub>1</sub>×u<sub>2</sub>×...×u<sub>n</sub></span>. أثبت بالتراجع أنه من أجل كل عدد طبيعي غير معدوم <span class="math">n</span> فإن <span class="math">P<sub>n</sub>=(2n+2)/(n+2)</span>.</li>
        <li>المتتالية العددية <span class="math">(v<sub>n</sub>)</span> المعرفة على <span class="math">ℕ*</span> كما يلي: <span class="math">v<sub>n</sub>=ln u<sub>n</sub></span>. عبر عن <span class="math">S<sub>n</sub></span> بدلالة <span class="math">n</span> حيث <span class="math">S<sub>n</sub>=v<sub>1</sub>+v<sub>2</sub>+...+v<sub>n</sub></span>، ثم احسب نهاية <span class="math">S<sub>n</sub></span> لما <span class="math">n</span> يؤول إلى <span class="math">+∞</span>.</li>
      </ol>
    </div>`,
    quickSolution: `<p><strong>1)</strong> <span class="math">u<sub>n</sub>=1+1/(n(n+2))</span>، ومنه <span class="math">u<sub>n</sub>&gt;1</span>.</p><p><strong>2)</strong> <span class="math">(u<sub>n</sub>)</span> متناقصة ومتقاربة، و<span class="math">lim u<sub>n</sub>=1</span>.</p><p><strong>3)</strong> <span class="math">P<sub>n</sub>=(2n+2)/(n+2)=2(n+1)/(n+2)</span>.</p><p><strong>4)</strong> <span class="math">S<sub>n</sub>=ln((2n+2)/(n+2))</span>، و<span class="math">lim S<sub>n</sub>=ln 2</span>.</p>`,
    solution: `<p><strong>1)</strong> لدينا:</p><p class="math-equation">(n+1)<sup>2</sup> = n<sup>2</sup>+2n+1 = n(n+2)+1</p><p>إذن:</p><p class="math-equation">u<sub>n</sub> = (n(n+2)+1)/(n(n+2)) = 1 + 1/(n(n+2))</p><p>وبما أن <span class="math">n(n+2)&gt;0</span> فإن <span class="math">u<sub>n</sub>&gt;1</span>.</p><p><strong>2)</strong> بما أن الدالة <span class="math">n ↦ n(n+2)</span> متزايدة على <span class="math">ℕ*</span>، فإن <span class="math">1/(n(n+2))</span> متناقصة، ومنه <span class="math">(u<sub>n</sub>)</span> متناقصة. كما أن <span class="math">u<sub>n</sub>&gt;1</span> فهي محدودة من الأسفل، إذن هي متقاربة. وبما أن <span class="math">1/(n(n+2))→0</span> فإن <span class="math">lim u<sub>n</sub>=1</span>.</p><p><strong>3)</strong> عند <span class="math">n=1</span>: <span class="math">P<sub>1</sub>=u<sub>1</sub>=4/3=(2×1+2)/(1+2)</span>. نفرض أن <span class="math">P<sub>n</sub>=(2n+2)/(n+2)</span>. عندئذ:</p><p class="math-equation">P<sub>n+1</sub>=P<sub>n</sub>u<sub>n+1</sub> = [2(n+1)/(n+2)]×[(n+2)<sup>2</sup>/((n+1)(n+3))]</p><p class="math-equation">P<sub>n+1</sub> = 2(n+2)/(n+3) = (2(n+1)+2)/((n+1)+2)</p><p>إذن <span class="math">P<sub>n</sub>=(2n+2)/(n+2)</span> لكل <span class="math">n∈ℕ*</span>.</p><p><strong>4)</strong> بما أن <span class="math">v<sub>k</sub>=ln u<sub>k</sub></span>، فإن:</p><p class="math-equation">S<sub>n</sub> = ln u<sub>1</sub> + ln u<sub>2</sub> + ... + ln u<sub>n</sub> = ln(P<sub>n</sub>)</p><p>ومنه:</p><p class="math-equation">S<sub>n</sub> = ln((2n+2)/(n+2))</p><p>وبما أن <span class="math">(2n+2)/(n+2)→2</span>، فإن <span class="math">lim S<sub>n</sub>=ln 2</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p><strong>1) ما المطلوب؟</strong> نعيد كتابة <span class="math">u_n</span> على شكل <span class="math">1</span> زائد مقدار موجب، ثم نستنتج الحصر.</p><p><strong>الفكرة المستعملة:</strong> نوسع البسط <span class="math">(n+1)^2</span> ونقارنه بالمقام <span class="math">n(n+2)</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">(n+1)<sup>2</sup>=n<sup>2</sup>+2n+1=n(n+2)+1</p><p>إذن:</p><p class="math-equation">u<sub>n</sub>=((n+1)<sup>2</sup>)/(n(n+2))=(n(n+2)+1)/(n(n+2))</p><p class="math-equation">u<sub>n</sub>=1+1/(n(n+2))</p><p>وبما أن <span class="math">n</span> غير معدوم، فإن <span class="math">n(n+2)&gt;0</span>، وبالتالي <span class="math">1/(n(n+2))&gt;0</span>.</p><p><strong>النتيجة:</strong> <span class="math">u<sub>n</sub>&gt;1</span>.</p>
<p><strong>2) ما المطلوب؟</strong> نحدد اتجاه تغير <span class="math">(u_n)</span>، ثم نستعمل ذلك لإثبات التقارب وحساب النهاية.</p><p><strong>الفكرة المستعملة:</strong> بعد الكتابة السابقة يكفي دراسة الحد <span class="math">1/(n(n+2))</span>: المقام يزداد عندما يزداد <span class="math">n</span>، لذلك الكسر يتناقص.</p><p><strong>التطبيق:</strong> إذا انتقلنا من <span class="math">n</span> إلى <span class="math">n+1</span> فإن:</p><p class="math-equation">(n+1)((n+1)+2) = (n+1)(n+3) &gt; n(n+2)</p><p>لذلك:</p><p class="math-equation">1/((n+1)(n+3)) &lt; 1/(n(n+2))</p><p>ومنه <span class="math">u<sub>n+1</sub>&lt;u<sub>n</sub></span>، أي إن <span class="math">(u_n)</span> متناقصة. ومن السؤال الأول لدينا <span class="math">u_n&gt;1</span>، فهي محدودة من الأسفل، إذن متقاربة. كما أن:</p><p class="math-equation">lim 1/(n(n+2))=0</p><p><strong>النتيجة:</strong></p><p class="math-equation">lim u<sub>n</sub>=1</p>
<p><strong>3) ما المطلوب؟</strong> نثبت صيغة الجداء <span class="math">P_n</span> بالتراجع.</p><p><strong>الفكرة المستعملة:</strong> بما أن <span class="math">P<sub>n+1</sub>=P<sub>n</sub>u<sub>n+1</sub></span>، نستعمل فرضية التراجع ثم نعوض <span class="math">u<sub>n+1</sub></span>.</p><p><strong>التطبيق:</strong> عند <span class="math">n=1</span>:</p><p class="math-equation">P<sub>1</sub>=u<sub>1</sub>=4/3=(2×1+2)/(1+2)</p><p>إذن الخاصية صحيحة في البداية. نفرض أنها صحيحة من أجل رتبة <span class="math">n</span>، أي:</p><p class="math-equation">P<sub>n</sub>=(2n+2)/(n+2)=2(n+1)/(n+2)</p><p>نحسب عند الرتبة <span class="math">n+1</span>:</p><p class="math-equation">P<sub>n+1</sub>=P<sub>n</sub>u<sub>n+1</sub></p><p class="math-equation">P<sub>n+1</sub>=[2(n+1)/(n+2)]×[(n+2)<sup>2</sup>/((n+1)(n+3))]</p><p>نختزل <span class="math">n+1</span> وعاملا واحدا من <span class="math">n+2</span> فنحصل على:</p><p class="math-equation">P<sub>n+1</sub>=2(n+2)/(n+3)</p><p>وهذا يساوي:</p><p class="math-equation">(2(n+1)+2)/((n+1)+2)</p><p><strong>النتيجة:</strong> حسب مبدأ التراجع، <span class="math">P<sub>n</sub>=(2n+2)/(n+2)</span> لكل <span class="math">n∈ℕ*</span>.</p>
<p><strong>4) ما المطلوب؟</strong> نكتب مجموع اللوغاريتمات <span class="math">S_n</span> بدلالة <span class="math">n</span> ثم نحسب نهايته.</p><p><strong>الفكرة المستعملة:</strong> اللوغاريتم يحول جداء الحدود إلى مجموع: <span class="math">ln(a_1...a_n)=ln a_1+...+ln a_n</span>. لذلك يظهر الجداء <span class="math">P_n</span> مباشرة.</p><p><strong>التطبيق:</strong></p><p class="math-equation">S<sub>n</sub>=v<sub>1</sub>+v<sub>2</sub>+...+v<sub>n</sub></p><p class="math-equation">S<sub>n</sub>=ln u<sub>1</sub>+ln u<sub>2</sub>+...+ln u<sub>n</sub>=ln(u<sub>1</sub>u<sub>2</sub>...u<sub>n</sub>)</p><p>إذن:</p><p class="math-equation">S<sub>n</sub>=ln(P<sub>n</sub>)=ln((2n+2)/(n+2))</p><p>ولحساب النهاية نقسم البسط والمقام على <span class="math">n</span>:</p><p class="math-equation">(2n+2)/(n+2)=(2+2/n)/(1+2/n) → 2</p><p><strong>النتيجة:</strong></p><p class="math-equation">lim S<sub>n</sub>=ln 2</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> بدأنا بتحويل عبارة <span class="math">u_n</span> إلى <span class="math">1</span> زائد كسر موجب، ثم استعملنا هذا الشكل لدراسة الرتابة والنهاية. بعد ذلك أثبتنا صيغة الجداء بالتراجع، وأخيرا حولنا مجموع اللوغاريتمات إلى لوغاريتم الجداء للحصول على <span class="math">S_n</span>.</p>
</div>`,
    conceptHints: [
      { title: "إعادة كتابة الحد العام", hint: "وسع <span class='math'>(n+1)<sup>2</sup></span> ثم حاول استخراج <span class='math'>n(n+2)</span> من البسط حتى يظهر الفرق الصغير بين البسط والمقام." },
      { title: "رتابة المتتالية", hint: "استعمل الصيغة 1 زائد كسر. عندما يكبر n يكبر المقام <span class='math'>n(n+2)</span>، فماذا يحدث للكسر؟" },
      { title: "البرهان بالتراجع", hint: "ابدأ من P_1، ثم استعمل العلاقة P<span class='math'>_{n+1}=</span>P<span class='math'>_n×u<sub>n+1</sub></span>. بعد التعويض ركز على الاختزالات بين <span class='math'>n+1</span> و<span class='math'>n+2</span>." },
      { title: "اللوغاريتمات والجداء", hint: "لأن <span class='math'>v<sub>n</sub>=ln(u<sub>n</sub>)</span>، فإن مجموع <span class='math'>v<sub>k</sub></span> يتحول إلى ln لجداء حدود <span class='math'>u<sub>k</sub></span>. اربط ذلك مباشرة بالجداء P_n المحسوب سابقا." }
    ]
  },  {
    id: "bac-2013-technical-math-subject-1",
    branch: "science",
    stream: "technical_math",
    year: "2013",
    title: "بكالوريا 2013 - تقني رياضي - الموضوع الأول",
    statementHtml: `<div class="bac-statement">
      <p><strong>التمرين: المتتاليات العددية</strong></p>
      <p>المتتالية العددية <span class="math">(u<sub>n</sub>)</span> معرفة كما يلي:</p>
      <p class="math-equation">u<sub>0</sub>=e<sup>2</sup></p>
      <p>ومن أجل كل عدد طبيعي غير معدوم <span class="math">n</span>:</p>
      <p class="math-equation">u<sub>n</sub>=√(u<sub>n-1</sub>/e)</p>
      <p>والمتتالية العددية <span class="math">(v<sub>n</sub>)</span> المعرفة على <span class="math">ℕ</span> كما يلي:</p>
      <p class="math-equation">v<sub>n</sub> = (1/2)ln u<sub>n</sub> + 1/2</p>
      <ol>
        <li>بين أن <span class="math">(v<sub>n</sub>)</span> متتالية هندسية أساسها <span class="math">1/2</span>، ثم احسب حدها الأول.</li>
        <li>اكتب <span class="math">v<sub>n</sub></span> بدلالة <span class="math">n</span>، ثم استنتج <span class="math">u<sub>n</sub></span> بدلالة <span class="math">n</span>.</li>
        <li>احسب بدلالة <span class="math">n</span> المجموع <span class="math">S<sub>n</sub></span> حيث <span class="math">S<sub>n</sub>=v<sub>0</sub>+v<sub>1</sub>+...+v<sub>n</sub></span>، ثم احسب <span class="math">lim S<sub>n</sub></span>.</li>
        <li>احسب بدلالة <span class="math">n</span> الجداء <span class="math">P<sub>n</sub></span> حيث <span class="math">P<sub>n</sub>=u<sub>0</sub>×u<sub>1</sub>×...×u<sub>n</sub></span>، ثم احسب <span class="math">lim P<sub>n</sub></span>.</li>
      </ol>
    </div>`,
    quickSolution: `<p><strong>1)</strong> <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">1/2</span>، و<span class="math">v<sub>0</sub>=3/2</span>.</p><p><strong>2)</strong> <span class="math">v<sub>n</sub> = (3/2)(1/2)<sup>n</sup></span>؛ <span class="math">u<sub>n</sub> = e<sup>3/2<sup>n</sup> - 1</sup></span>.</p><p><strong>3)</strong> <span class="math">S<sub>n</sub> = 3(1 - 1/2<sup>n+1</sup>)</span>؛ <span class="math">lim S<sub>n</sub> = 3</span>.</p><p><strong>4)</strong> <span class="math">P<sub>n</sub> = e<sup>6(1 - 1/2<sup>n+1</sup>) - (n+1)</sup></span>؛ <span class="math">lim P<sub>n</sub> = 0</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p><strong>1) ما المطلوب؟</strong> نثبت أن المتتالية المساعدة <span class="math">(v_n)</span> هندسية ونحسب حدها الأول.</p><p><strong>الفكرة المستعملة:</strong> العلاقة فيها جذر وقسمة على <span class="math">e</span>، لذلك نستعمل اللوغاريتم لتحويل الجذر إلى عامل <span class="math">1/2</span>.</p><p><strong>التطبيق:</strong> من <span class="math">u_n=√(u_{n-1}/e)</span> نحصل على:</p><p class="math-equation">ln u<sub>n</sub> = (1/2)(ln u<sub>n-1</sub> - 1)</p><p>إذن:</p><p class="math-equation">v<sub>n</sub> = (1/2)ln u<sub>n</sub> + 1/2 = (1/4)ln u<sub>n-1</sub> - 1/4 + 1/2</p><p class="math-equation">v<sub>n</sub> = (1/4)ln u<sub>n-1</sub> + 1/4 = (1/2)[(1/2)ln u<sub>n-1</sub> + 1/2] = (1/2)v<sub>n-1</sub></p><p>كما أن:</p><p class="math-equation">v<sub>0</sub> = (1/2)ln(e<sup>2</sup>) + 1/2 = 1 + 1/2 = 3/2</p><p><strong>النتيجة:</strong> <span class="math">(v_n)</span> هندسية أساسها <span class="math">1/2</span> وحدها الأول <span class="math">3/2</span>.</p>
<p><strong>2) ما المطلوب؟</strong> نكتب <span class="math">v_n</span> ثم نستنتج <span class="math">u_n</span>.</p><p><strong>الفكرة المستعملة:</strong> نستعمل الحد العام لمتتالية هندسية، ثم نرجع من تعريف <span class="math">v_n</span> إلى <span class="math">u_n</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">v<sub>n</sub> = (3/2)(1/2)<sup>n</sup></p><p>ومن <span class="math">v_n=(1/2)ln u_n+1/2</span> نجد:</p><p class="math-equation">ln u<sub>n</sub> = 2v<sub>n</sub> - 1 = 3(1/2)<sup>n</sup> - 1</p><p><strong>النتيجة:</strong></p><p class="math-equation">u<sub>n</sub> = e<sup>3/2<sup>n</sup> - 1</sup></p>
<p><strong>3) ما المطلوب؟</strong> نحسب مجموع حدود <span class="math">v_k</span> من <span class="math">0</span> إلى <span class="math">n</span>.</p><p><strong>الفكرة المستعملة:</strong> <span class="math">(v_n)</span> هندسية، إذن نستعمل صيغة مجموع هندسي وعدد الحدود هو <span class="math">n+1</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">S<sub>n</sub> = (3/2)\frac{1-(1/2)<sup>n+1</sup>}{1-1/2}</p><p><strong>النتيجة:</strong></p><p class="math-equation">S<sub>n</sub> = 3(1 - 1/2<sup>n+1</sup>)</p><p>وبما أن <span class="math">(1/2)^{n+1}→0</span>، فإن:</p><p class="math-equation">lim S<sub>n</sub> = 3</p>
<p><strong>4) ما المطلوب؟</strong> نحسب الجداء <span class="math">P_n</span>.</p><p><strong>الفكرة المستعملة:</strong> نحول الجداء إلى مجموع بأخذ اللوغاريتم، ثم نستعمل العلاقة <span class="math">ln u_k=2v_k-1</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">ln P<sub>n</sub> = ln u<sub>0</sub> + ln u<sub>1</sub> + ... + ln u<sub>n</sub></p><p class="math-equation">ln P<sub>n</sub> = Σ<sub>k=0</sub><sup>n</sup>(2v<sub>k</sub>-1)=2S<sub>n</sub>-(n+1)</p><p>إذن:</p><p class="math-equation">ln P<sub>n</sub> = 6(1 - 1/2<sup>n+1</sup>) - (n+1)</p><p><strong>النتيجة:</strong></p><p class="math-equation">P<sub>n</sub> = e<sup>6(1 - 1/2<sup>n+1</sup>) - (n+1)</sup></p><p>وعندما <span class="math">n→+∞</span> فإن الأس يؤول إلى <span class="math">-∞</span>، وبالتالي:</p><p class="math-equation">lim P<sub>n</sub> = 0</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> استعملنا اللوغاريتم لتحويل العلاقة الجذرية إلى علاقة خطية، ثم أصبحت <span class="math">v_n</span> هندسية. بعد ذلك رجعنا إلى <span class="math">u_n</span>، وحسبنا مجموع <span class="math">v_n</span>، ثم حولنا الجداء إلى مجموع بواسطة اللوغاريتم.</p>
</div>`,
    conceptHints: [
      { title: "المتتالية المساعدة", hint: "خذ ln للطرفين في العلاقة <span class='math'>u<sub>n</sub>=√(u<sub>n-1</sub>/</span>e). استعمل ln√A<span class='math'>=(1/2)ln</span> A وln e=1." },
      { title: "عبارة الحد العام", hint: "بعد إثبات أن <span class='math'>v<sub>n</sub></span> هندسية، اكتب <span class='math'>v<sub>n</sub>=v<sub>0</sub>(1/2)<sup>n</sup></span>، ثم استعمل <span class='math'>ln u<sub>n</sub>=2v<sub>n</sub>-1</span>." },
      { title: "حساب المجموع", hint: "<span class='math'>S<sub>n</sub></span> مجموع هندسي من <span class='math'>v<sub>0</sub></span> إلى <span class='math'>v<sub>n</sub></span>، لذلك عدد الحدود <span class='math'>n+1</span> والأساس <span class='math'>1/2</span>." },
      { title: "تحويل الجداء إلى مجموع", hint: "لحساب P_n خذ <span class='math'>ln(P_n)</span>. سيظهر مجموع <span class='math'>ln(u<sub>k</sub>)</span>، واستبدل <span class='math'>ln(u<sub>k</sub>)</span> بالعبارة <span class='math'>2v<sub>k</sub>-1</span>." }
    ],
    solution: `<p><strong>1)</strong> من العلاقة <span class="math">u_n=√(u_{n-1}/e)</span> نجد:</p><p class="math-equation">ln u_n=(1/2)(ln u_{n-1}-1)</p><p>وبالتالي:</p><p class="math-equation">v_n=(1/2)v_{n-1}</p><p>كما أن <span class="math">v_0=(1/2)ln(e^2)+1/2=3/2</span>. إذن <span class="math">(v_n)</span> هندسية أساسها <span class="math">1/2</span>.</p><p><strong>2)</strong></p><p class="math-equation">v_n=(3/2)(1/2)^n</p><p>ومن <span class="math">ln u_n=2v_n-1</span>:</p><p class="math-equation">u_n=e^{3/2^n-1}</p><p><strong>3)</strong></p><p class="math-equation">S_n=3(1-1/2^{n+1})</p><p>ومنه <span class="math">lim S_n=3</span>.</p><p><strong>4)</strong> بما أن <span class="math">ln u_k=2v_k-1</span>، فإن:</p><p class="math-equation">ln P_n=2S_n-(n+1)=6(1-1/2^{n+1})-(n+1)</p><p>إذن:</p><p class="math-equation">P_n=e^{6(1-1/2^{n+1})-(n+1)}</p><p>وبالتالي <span class="math">lim P_n=0</span>.</p>`
  },
  {
    id: "bac-2014-technical-math-subject-1",
    branch: "science",
    stream: "technical_math",
    year: "2014",
    title: "بكالوريا 2014 - تقني رياضي - الموضوع الأول",
    statementHtml: `<div class="bac-statement">
      <p><strong>التمرين: الدالة والمتتاليات العددية</strong></p>
      <h4>I) دراسة الدالة</h4>
      <p>لتكن <span class="math">f</span> الدالة المعرفة على المجال <span class="math">]1,+∞[</span> بـ:</p>
      <p class="math-equation">f(x)=x-ln(x-1)</p>
      <ol>
        <li>حدد حسب قيم <span class="math">x</span> إشارة <span class="math">f(x)-x</span>.</li>
        <li><ol><li>عين اتجاه تغير الدالة <span class="math">f</span>.</li><li>بين أنه إذا كان <span class="math">x∈[2,e+1]</span> فإن <span class="math">f(x)∈[2,e+1]</span>.</li></ol></li>
      </ol>
      <h4>II) دراسة المتتالية</h4>
      <p>نعتبر المتتالية <span class="math">(u<sub>n</sub>)</span> المعرفة على <span class="math">ℕ</span> كما يلي:</p>
      <p class="math-equation">u<sub>0</sub>=e+1 ، ومن أجل كل n∈ℕ: u<sub>n+1</sub>=u<sub>n</sub>-ln(u<sub>n</sub>-1)</p>
      <ol>
        <li>برهن بالتراجع أنه من أجل كل <span class="math">n∈ℕ</span>: <span class="math">u<sub>n</sub>∈[2,e+1]</span>.</li>
        <li>ادرس اتجاه تغير المتتالية <span class="math">(u<sub>n</sub>)</span>.</li>
        <li>برر تقارب المتتالية <span class="math">(u<sub>n</sub>)</span>، ثم احسب نهايتها.</li>
      </ol>
    </div>`,
    quickSolution: `<p><strong>I-1)</strong> <span class="math">f(x)-x=-ln(x-1)</span>: موجبة على <span class="math">]1,2[</span>، منعدمة عند <span class="math">2</span>، سالبة على <span class="math">]2,+∞[</span>.</p><p><strong>I-2)</strong> <span class="math">f'(x)=(x-2)/(x-1)</span>؛ <span class="math">f</span> متناقصة على <span class="math">]1,2]</span> ومتزايدة على <span class="math">[2,+∞[</span>؛ <span class="math">f([2,e+1])=[2,e+1]</span>.</p><p><strong>II)</strong> <span class="math">u<sub>n</sub>∈[2,e+1]</span>؛ <span class="math">(u<sub>n</sub>)</span> متناقصة؛ متقاربة ونهايتها <span class="math">2</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p><strong>I-1) ما المطلوب؟</strong> نحدد إشارة الفرق <span class="math">f(x)-x</span>.</p><p><strong>الفكرة المستعملة:</strong> نعوض تعريف <span class="math">f</span>، فتصبح الإشارة مرتبطة بإشارة اللوغاريتم.</p><p><strong>التطبيق:</strong></p><p class="math-equation">f(x)-x=-ln(x-1)</p><p>إذا كان <span class="math">1&lt;x&lt;2</span> فإن <span class="math">0&lt;x-1&lt;1</span> ومنه <span class="math">ln(x-1)&lt;0</span>، إذن <span class="math">f(x)-x&gt;0</span>. عند <span class="math">x=2</span> نجد <span class="math">ln1=0</span>. وإذا كان <span class="math">x&gt;2</span> فإن <span class="math">x-1&gt;1</span> ومنه <span class="math">ln(x-1)&gt;0</span>، إذن <span class="math">f(x)-x&lt;0</span>.</p><p><strong>النتيجة:</strong> الإشارة موجبة على <span class="math">]1,2[</span>، منعدمة عند <span class="math">2</span>، وسالبة على <span class="math">]2,+∞[</span>.</p>
<p><strong>I-2-أ) ما المطلوب؟</strong> ندرس اتجاه تغير <span class="math">f</span>.</p><p><strong>الفكرة المستعملة:</strong> نستعمل المشتقة.</p><p><strong>التطبيق:</strong></p><p class="math-equation">f'(x)=1-1/(x-1)=(x-2)/(x-1)</p><p>على المجال <span class="math">]1,+∞[</span> يكون <span class="math">x-1&gt;0</span>، فتتحدد إشارة <span class="math">f'(x)</span> بإشارة <span class="math">x-2</span>.</p><p><strong>النتيجة:</strong> <span class="math">f</span> متناقصة على <span class="math">]1,2]</span> ومتزايدة على <span class="math">[2,+∞[</span>.</p>
<p><strong>I-2-ب) ما المطلوب؟</strong> نثبت أن صورة المجال <span class="math">[2,e+1]</span> بالدالة تبقى داخله.</p><p><strong>الفكرة المستعملة:</strong> نستعمل تزايد <span class="math">f</span> على <span class="math">[2,e+1]</span> ونحسب صورتي الطرفين.</p><p><strong>التطبيق:</strong></p><p class="math-equation">f(2)=2-ln1=2</p><p class="math-equation">f(e+1)=e+1-ln e=e</p><p>وبما أن <span class="math">f</span> متزايدة على <span class="math">[2,e+1]</span>، فإن <span class="math">f([2,e+1])=[2,e]</span>، وهذا محتوى في <span class="math">[2,e+1]</span>.</p><p><strong>النتيجة:</strong> إذا كان <span class="math">x∈[2,e+1]</span> فإن <span class="math">f(x)∈[2,e+1]</span>.</p>
<p><strong>II-1) ما المطلوب؟</strong> نثبت أن كل حدود المتتالية تنتمي إلى <span class="math">[2,e+1]</span>.</p><p><strong>الفكرة المستعملة:</strong> نستعمل البرهان بالتراجع، اعتمادا على نتيجة صورة المجال.</p><p><strong>التطبيق:</strong> عند <span class="math">n=0</span>: <span class="math">u_0=e+1∈[2,e+1]</span>. نفرض أن <span class="math">u_n∈[2,e+1]</span>. بما أن <span class="math">u_{n+1}=f(u_n)</span> وبما أن <span class="math">f([2,e+1])⊂[2,e+1]</span>، فإن <span class="math">u_{n+1}∈[2,e+1]</span>.</p><p><strong>النتيجة:</strong> <span class="math">u_n∈[2,e+1]</span> لكل <span class="math">n∈ℕ</span>.</p>
<p><strong>II-2) ما المطلوب؟</strong> ندرس اتجاه تغير المتتالية.</p><p><strong>الفكرة المستعملة:</strong> نستعمل إشارة <span class="math">f(x)-x</span> على المجال الذي يحصر <span class="math">u_n</span>.</p><p><strong>التطبيق:</strong> بما أن <span class="math">u_n∈[2,e+1]</span>، فإن <span class="math">u_n≥2</span>. من دراسة الإشارة نجد <span class="math">f(u_n)-u_n≤0</span>. أي:</p><p class="math-equation">u_{n+1}-u_n≤0</p><p><strong>النتيجة:</strong> <span class="math">(u_n)</span> متناقصة.</p>
<p><strong>II-3) ما المطلوب؟</strong> نبرر التقارب ثم نحسب النهاية.</p><p><strong>الفكرة المستعملة:</strong> المتتالية المتناقصة والمحدودة من الأسفل متقاربة. لحساب النهاية نستعمل العلاقة التراجعية واستمرارية <span class="math">f</span>.</p><p><strong>التطبيق:</strong> من الحصر <span class="math">u_n≥2</span> والمتتالية متناقصة، إذن هي متقاربة. لنفرض أن نهايتها <span class="math">ℓ</span>. بما أن <span class="math">u_n∈[2,e+1]</span>، فإن <span class="math">ℓ∈[2,e+1]</span>. وبالمرور إلى النهاية في:</p><p class="math-equation">u_{n+1}=u_n-ln(u_n-1)</p><p>نجد:</p><p class="math-equation">ℓ=ℓ-ln(ℓ-1)</p><p>أي <span class="math">ln(ℓ-1)=0</span>، ومنه <span class="math">ℓ-1=1</span>.</p><p><strong>النتيجة:</strong> <span class="math">lim u_n=2</span>.</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> درسنا أولا الدالة: إشارة <span class="math">f(x)-x</span> ورتابة <span class="math">f</span> وصورة المجال. بعد ذلك استعملنا صورة المجال في الحصر بالتراجع، ثم إشارة <span class="math">f(x)-x</span> في الرتابة، وأخيرا حسبنا النهاية من معادلة النقطة الثابتة.</p>
</div>`,
    conceptHints: [
      { title: "إشارة <span class='math'>f(x)-x</span>", hint: "اكتب الفرق أولا. ستجد <span class='math'>-ln(x-1)</span>، ثم قارن x-1 بالعدد 1 لتحديد إشارة اللوغاريتم." },
      { title: "دراسة دالة", hint: "احسب f'(x)=1-1/(x-1)، ثم استعمل أن x-1 موجب على مجال التعريف لتحديد الإشارة." },
      { title: "صورة المجال", hint: "على [2,e+1] تكون f متزايدة، لذلك تكفي صور الطرفين f(2) وf(e+1) لتحديد الصورة." },
      { title: "الحصر بالتراجع", hint: "استعمل أن <span class='math'>u<sub>n+1</sub>=f(u<sub>n</sub>)</span>. إذا كان <span class='math'>u<sub>n</sub></span> داخل [2,e+1]، فصورة المجال تضمن بقاء <span class='math'>u<sub>n+1</sub></span> داخله." },
      { title: "النهاية", hint: "بعد إثبات التناقص والحصر، سم النهاية ℓ ثم مرر إلى النهاية في العلاقة التراجعية لتحصل على <span class='math'>ln(ℓ-1)=0</span>." }
    ],
    solution: `<p><strong>I)</strong> لدينا <span class="math">f(x)-x=-ln(x-1)</span>. إذن الإشارة موجبة على <span class="math">]1,2[</span>، منعدمة عند <span class="math">2</span>، وسالبة على <span class="math">]2,+∞[</span>.</p><p>كما أن:</p><p class="math-equation">f'(x)=1-1/(x-1)=(x-2)/(x-1)</p><p>إذن <span class="math">f</span> متناقصة على <span class="math">]1,2]</span> ومتزايدة على <span class="math">[2,+∞[</span>. وعلى <span class="math">[2,e+1]</span>: <span class="math">f(2)=2</span> و<span class="math">f(e+1)=e</span>، ومنه <span class="math">f([2,e+1])⊂[2,e+1]</span>.</p><p><strong>II)</strong> بالتراجع: <span class="math">u_0=e+1∈[2,e+1]</span>، وإذا كان <span class="math">u_n∈[2,e+1]</span> فإن <span class="math">u_{n+1}=f(u_n)∈[2,e+1]</span>.</p><p>وبما أن <span class="math">u_n≥2</span> فإن <span class="math">u_{n+1}-u_n=f(u_n)-u_n≤0</span>، إذن <span class="math">(u_n)</span> متناقصة. وهي محدودة من الأسفل بـ <span class="math">2</span>، فهي متقاربة.</p><p>إذا كانت نهايتها <span class="math">ℓ</span>، فإن:</p><p class="math-equation">ℓ=ℓ-ln(ℓ-1)</p><p>ومنه <span class="math">ln(ℓ-1)=0</span>، وبالتالي <span class="math">ℓ=2</span>.</p>`
  },  {
    id: "bac-2014-technical-math-subject-2",
    branch: "science",
    stream: "technical_math",
    year: "2014",
    title: "بكالوريا 2014 - تقني رياضي - الموضوع الثاني",
    statementHtml: `<div class="bac-statement">
      <p><strong>التمرين: الحساب بتطابق والمتتاليات العددية</strong></p>
      <p>ليكن <span class="math">n</span> و<span class="math">p</span> عددين طبيعيين.</p>
      <ol>
        <li>ادرس، حسب قيم <span class="math">n</span>، بواقي القسمة الإقليدية على <span class="math">16</span> للعدد <span class="math">5<sup>n</sup></span>.</li>
        <li><p>نضع: <span class="math">C<sub>n</sub>=16n+9</span> و <span class="math">D<sub>p</sub>=5<sup>p</sup></span>.</p><ol><li>بين أنه إذا كان <span class="math">p=4k+2</span> حيث <span class="math">k</span> عدد طبيعي، فإنه يوجد عدد طبيعي <span class="math">n</span> يحقق <span class="math">C<sub>n</sub>=D<sub>p</sub></span>.</li><li>عين <span class="math">n</span> من أجل <span class="math">p=6</span>.</li></ol></li>
        <li><p>لتكن الدالة <span class="math">f</span> المعرفة على المجال <span class="math">[0,+∞[</span> بـ:</p><p class="math-equation">f(x)=5<sup>(4x+2)</sup>-9</p><p>ادرس تغيرات الدالة <span class="math">f</span>، ثم استنتج إشارة <span class="math">f(x)</span>.</p></li>
        <li><p>نعتبر المتتالية <span class="math">(u<sub>n</sub>)</span> المعرفة على <span class="math">ℕ</span> كما يلي:</p><p class="math-equation">u<sub>0</sub>=1 ، u<sub>n+1</sub>=5<sup>4</sup>(u<sub>n</sub>+9/16)-9/16</p><ol><li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n</sub>=(5<sup>4n+2</sup>-9)/16</span>.</li><li>برهن أنه من أجل كل عدد طبيعي <span class="math">n</span>، فإن <span class="math">u<sub>n</sub></span> عدد طبيعي.</li></ol></li>
        <li>استنتج اتجاه تغير المتتالية <span class="math">(u<sub>n</sub>)</span>.</li>
      </ol>
    </div>`,
    quickSolution: `<p><strong>1)</strong> بواقي <span class="math">5<sup>n</sup></span> على <span class="math">16</span>: إذا كان <span class="math">n</span> زوجيا فالباقي <span class="math">1</span>، وإذا كان فرديا فالباقي <span class="math">5</span>.</p><p><strong>2)</strong> إذا <span class="math">p=4k+2</span> فإن <span class="math">5<sup>p</sup>≡9 [16]</span>، ومنه <span class="math">n=(5<sup>p</sup>-9)/16</span> طبيعي؛ عند <span class="math">p=6</span>: <span class="math">n=976</span>.</p><p><strong>3)</strong> <span class="math">f</span> متزايدة تماما على <span class="math">[0,+∞[</span> و<span class="math">f(x)>0</span>.</p><p><strong>4)</strong> <span class="math">u<sub>n</sub>=(5<sup>4n+2</sup>-9)/16</span> و<span class="math">u<sub>n</sub>∈ℕ</span>.</p><p><strong>5)</strong> <span class="math">(u<sub>n</sub>)</span> متزايدة تماما.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p><strong>1) ما المطلوب؟</strong> ندرس بواقي <span class="math">5^n</span> على <span class="math">16</span>.</p><p><strong>الفكرة المستعملة:</strong> نحسب القوى الأولى ونلاحظ الدورية.</p><p><strong>التطبيق:</strong></p><p class="math-equation">5^0≡1 [16] ، 5^1≡5 [16] ، 5^2=25≡9 [16] ، 5^3≡13 [16] ، 5^4≡1 [16]</p><p>إذن البواقي تتكرر بدورة طولها <span class="math">4</span>: <span class="math">1,5,9,13</span> حسب <span class="math">n≡0,1,2,3 [4]</span>. وبشكل خاص إذا كان <span class="math">n</span> زوجيا فالباقي إما <span class="math">1</span> أو <span class="math">9</span>.</p><p><strong>النتيجة المفصلة:</strong> إذا <span class="math">n≡0[4]</span> فالباقي <span class="math">1</span>، وإذا <span class="math">n≡1[4]</span> فالباقي <span class="math">5</span>، وإذا <span class="math">n≡2[4]</span> فالباقي <span class="math">9</span>، وإذا <span class="math">n≡3[4]</span> فالباقي <span class="math">13</span>.</p>
<p><strong>2-أ) ما المطلوب؟</strong> نثبت وجود <span class="math">n</span> طبيعي بحيث <span class="math">16n+9=5^p</span> عندما <span class="math">p=4k+2</span>.</p><p><strong>الفكرة المستعملة:</strong> إذا كان <span class="math">p≡2[4]</span>، فإن باقي <span class="math">5^p</span> على <span class="math">16</span> هو <span class="math">9</span>.</p><p><strong>التطبيق:</strong> من السؤال الأول، إذا <span class="math">p=4k+2</span> فإن:</p><p class="math-equation">5^p≡9 [16]</p><p>إذن يوجد عدد طبيعي <span class="math">n</span> بحيث:</p><p class="math-equation">5^p=16n+9</p><p>أي <span class="math">n=(5^p-9)/16</span>.</p><p><strong>النتيجة:</strong> يوجد عدد طبيعي <span class="math">n</span> يحقق <span class="math">C_n=D_p</span>.</p>
<p><strong>2-ب) ما المطلوب؟</strong> نحسب <span class="math">n</span> عندما <span class="math">p=6</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">n=(5^6-9)/16=(15625-9)/16=15616/16=976</p><p><strong>النتيجة:</strong> <span class="math">n=976</span>.</p>
<p><strong>3) ما المطلوب؟</strong> ندرس تغيرات <span class="math">f(x)=5^{4x+2}-9</span> ونستنتج إشارتها.</p><p><strong>الفكرة المستعملة:</strong> الدالة الأسية ذات الأساس <span class="math">5>1</span> متزايدة، والتركيب مع <span class="math">4x+2</span> المتزايد يبقيها متزايدة.</p><p><strong>التطبيق:</strong> بما أن <span class="math">x↦4x+2</span> متزايدة و<span class="math">t↦5^t</span> متزايدة، فإن <span class="math">f</span> متزايدة تماما على <span class="math">[0,+∞[</span>. كما أن:</p><p class="math-equation">f(0)=5^2-9=16>0</p><p><strong>النتيجة:</strong> <span class="math">f(x)>0</span> لكل <span class="math">x≥0</span>.</p>
<p><strong>4-أ) ما المطلوب؟</strong> نثبت صيغة <span class="math">u_n</span> بالتراجع.</p><p><strong>الفكرة المستعملة:</strong> نتحقق عند <span class="math">n=0</span>، ثم نعوض الصيغة في العلاقة التراجعية.</p><p><strong>التطبيق:</strong> عند <span class="math">n=0</span>:</p><p class="math-equation">(5^2-9)/16=(25-9)/16=1=u_0</p><p>نفرض أن <span class="math">u_n=(5^{4n+2}-9)/16</span>. عندئذ:</p><p class="math-equation">u_n+9/16=5^{4n+2}/16</p><p>إذن:</p><p class="math-equation">u_{n+1}=5^4×5^{4n+2}/16-9/16=(5^{4n+6}-9)/16</p><p>وهذا يساوي <span class="math">(5^{4(n+1)+2}-9)/16</span>.</p><p><strong>النتيجة:</strong> الصيغة صحيحة لكل <span class="math">n∈ℕ</span>.</p>
<p><strong>4-ب) ما المطلوب؟</strong> نثبت أن <span class="math">u_n</span> طبيعي.</p><p><strong>الفكرة المستعملة:</strong> نستعمل السؤال العددي: بما أن <span class="math">4n+2</span> من الشكل <span class="math">4k+2</span>، فإن <span class="math">5^{4n+2}-9</span> يقبل القسمة على <span class="math">16</span>.</p><p><strong>التطبيق:</strong> من السؤال 2-أ مع <span class="math">p=4n+2</span>، يوجد عدد طبيعي يساوي <span class="math">(5^{4n+2}-9)/16</span>. وبما أن هذا هو <span class="math">u_n</span>، فإن <span class="math">u_n∈ℕ</span>.</p><p><strong>النتيجة:</strong> <span class="math">u_n</span> عدد طبيعي لكل <span class="math">n</span>.</p>
<p><strong>5) ما المطلوب؟</strong> نستنتج اتجاه تغير المتتالية.</p><p><strong>الفكرة المستعملة:</strong> نستعمل الصيغة الصريحة أو دالة <span class="math">f</span> في السؤال 3.</p><p><strong>التطبيق:</strong> بما أن:</p><p class="math-equation">u_n=f(n)/16</p><p>و<span class="math">f</span> متزايدة تماما على <span class="math">[0,+∞[</span>، فإن <span class="math">(u_n)</span> متزايدة تماما.</p><p><strong>النتيجة:</strong> <span class="math">(u_n)</span> متزايدة تماما.</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> درسنا أولا دورية قوى <span class="math">5</span> بتطابق <span class="math">16</span>، ثم استعملناها لإثبات طبيعية أعداد من الشكل <span class="math">(5^p-9)/16</span>. بعد ذلك برهنا صيغة <span class="math">u_n</span> بالتراجع، واستنتجنا طبيعتها ورتابتها من الصيغة الصريحة.</p>
</div>`,
    conceptHints: [
      { title: "القوى modulo 16", hint: "احسب <span class='math'>5<sup>0</sup></span> و<span class='math'>5<sup>1</sup></span> و<span class='math'>5<sup>2</sup></span> و<span class='math'>5<sup>3</sup></span> و<span class='math'>5<sup>4</sup></span> بتطابق 16. عندما يعود الباقي إلى 1 تبدأ الدورة." },
      { title: "وجود n", hint: "إذا كان p=4k+2 فاستعمل الدورة لتجد أن <span class='math'>5<sup>p</sup></span> يترك الباقي 9 عند القسمة على 16، أي <span class='math'>5<sup>p</sup>-9</span> مضاعف لـ16." },
      { title: "البرهان بالتراجع", hint: "في خطوة الانتقال، عوض <span class='math'>u<sub>n</sub></span> بالصيغته ثم احسب <span class='math'>u<sub>n</sub>+9/16</span> أولا، فهذا يجعل الضرب في <span class='math'>5<sup>4</sup></span> مباشرا." },
      { title: "طبيعية <span class='math'>u<sub>n</sub></span>", hint: "لا تحتاج لإعادة برهان القسمة؛ طبق نتيجة السؤال العددي على الأس p<span class='math'>=4n+2</span>." },
      { title: "رتابة المتتالية", hint: "استعمل أن <span class='math'>u<sub>n</sub>=f(n)/16</span>، وأن الدالة f متزايدة على [0,+∞[." }
    ],
    solution: `<p><strong>1)</strong> بواقي <span class="math">5^n</span> على <span class="math">16</span> دورية: <span class="math">1,5,9,13</span> حسب <span class="math">n≡0,1,2,3 [4]</span>.</p><p><strong>2)</strong> إذا <span class="math">p=4k+2</span> فإن <span class="math">5^p≡9 [16]</span>، ومنه يوجد <span class="math">n=(5^p-9)/16</span> طبيعي يحقق <span class="math">16n+9=5^p</span>. عند <span class="math">p=6</span>: <span class="math">n=976</span>.</p><p><strong>3)</strong> <span class="math">f(x)=5^{4x+2}-9</span> متزايدة تماما على <span class="math">[0,+∞[</span>، و<span class="math">f(0)=16>0</span>، إذن <span class="math">f(x)>0</span>.</p><p><strong>4)</strong> بالتراجع نحصل على:</p><p class="math-equation">u_n=(5^{4n+2}-9)/16</p><p>وبما أن <span class="math">4n+2</span> من الشكل <span class="math">4k+2</span> فإن <span class="math">u_n∈ℕ</span>.</p><p><strong>5)</strong> بما أن <span class="math">u_n=f(n)/16</span> و<span class="math">f</span> متزايدة تماما، فإن <span class="math">(u_n)</span> متزايدة تماما.</p>`
  },  {
    id: "bac-2015-technical-math-subject-2",
    branch: "science",
    stream: "technical_math",
    year: "2015",
    title: "بكالوريا 2015 - تقني رياضي - الموضوع الثاني",
    figureHtml: `<figure class="bac-figure" aria-label="تمثيل بياني تقريبي للدالة h والمستقيم y=x">
      <svg class="bac-graph" viewBox="0 0 420 300" role="img">
        <rect x="0" y="0" width="420" height="300" rx="10" class="graph-bg"></rect>
        <g class="grid-lines"><path d="M40 20V260 M80 20V260 M120 20V260 M160 20V260 M200 20V260 M240 20V260 M280 20V260 M320 20V260 M360 20V260 M20 40H390 M20 70H390 M20 100H390 M20 130H390 M20 160H390 M20 190H390 M20 220H390 M20 250H390"></path></g>
        <g class="axes"><path d="M20 250H395"></path><path d="M120 270V20"></path></g>
        <g class="axis-labels"><text x="114" y="267">0</text><text x="154" y="267">1</text><text x="194" y="267">2</text><text x="234" y="267">3</text><text x="274" y="267">4</text><text x="314" y="267">5</text><text x="354" y="267">6</text><text x="101" y="223">1</text><text x="101" y="193">2</text><text x="101" y="163">3</text><text x="101" y="133">4</text><text x="101" y="103">5</text><text x="101" y="73">6</text><text x="101" y="43">7</text></g>
        <path class="line-delta" d="M120 250L380 -10"></path>
        <path class="curve-f" d="M13 250 C55 207 93 173 130 148 C175 118 230 88 300 56 C330 42 356 31 385 20"></path>
        <path class="iteration-lines" d="M120 250V130 H250 V70 H310 V46 H334" fill="none"></path>
        <text x="310" y="42" class="graph-label">(C)</text><text x="300" y="88" class="graph-label">(Δ): y=x</text><text x="126" y="266" class="graph-label">u₀</text>
      </svg>
    </figure>`,
    statementHtml: `<div class="bac-statement">
      <p><strong>التمرين: المتتاليات العددية</strong></p>
      <p>نعتبر المتتالية <span class="math">(u<sub>n</sub>)</span> المعرفة بحدها الأول <span class="math">u<sub>0</sub>=0</span>، ومن أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math-equation">u<sub>n+1</sub>=√(6u<sub>n</sub>+16)</p>
      <p>ولتكن الدالة <span class="math">h</span> المعرفة على المجال <span class="math">[-8/3,+∞[</span> بـ:</p>
      <p class="math-equation">h(x)=√(6x+16)</p>
      <ol>
        <li><ol><li>أعد رسم الشكل المقابل على ورقة الإجابة، ثم مثل على حامل محور الفواصل الحدود <span class="math">u<sub>0</sub>, u<sub>1</sub>, u<sub>2</sub>, u<sub>3</sub></span> دون حسابها، موضحا خطوط الإنشاء.</li><li>ضع تخمينا حول اتجاه تغير المتتالية <span class="math">(u<sub>n</sub>)</span> وتقاربها.</li></ol></li>
        <li><ol><li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">0≤u<sub>n</sub>&lt;8</span>.</li><li>بين أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n+1</sub>-u<sub>n</sub>=((8-u<sub>n</sub>)(u<sub>n</sub>+2))/(√(6u<sub>n</sub>+16)+u<sub>n</sub>)</span>.</li><li>استنتج اتجاه تغير المتتالية <span class="math">(u<sub>n</sub>)</span>.</li></ol></li>
        <li><ol><li>بين أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">0&lt;8-u<sub>n+1</sub>≤(1/2)(8-u<sub>n</sub>)</span>.</li><li>بين أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">0&lt;8-u<sub>n</sub>≤8(1/2)<sup>n</sup></span>، ثم استنتج <span class="math">lim u<sub>n</sub></span>.</li></ol></li>
      </ol>
    </div>`,
    quickSolution: `<p><strong>1)</strong> من الرسم نخمن أن <span class="math">(u<sub>n</sub>)</span> متزايدة وتتقارب نحو <span class="math">8</span>.</p><p><strong>2)</strong> <span class="math">0≤u<sub>n</sub>&lt;8</span>؛ <span class="math">u<sub>n+1</sub>-u<sub>n</sub>=((8-u<sub>n</sub>)(u<sub>n</sub>+2))/(√(6u<sub>n</sub>+16)+u<sub>n</sub>)</span>؛ <span class="math">(u<sub>n</sub>)</span> متزايدة تماما.</p><p><strong>3)</strong> <span class="math">0&lt;8-u<sub>n+1</sub>≤(1/2)(8-u<sub>n</sub>)</span>؛ <span class="math">0&lt;8-u<sub>n</sub>≤8(1/2)<sup>n</sup></span>؛ <span class="math">lim u<sub>n</sub>=8</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p><strong>1) ما المطلوب؟</strong> نستعمل الرسم لتمثيل الحدود الأولى ثم نعطي تخمينا.</p><p><strong>الفكرة المستعملة:</strong> نبدأ من <span class="math">u_0=0</span> على محور الفواصل، نصعد إلى منحنى <span class="math">h</span>، ثم ننتقل أفقيا إلى المستقيم <span class="math">y=x</span>، ونكرر العملية. الرسم يعطي تخمينا فقط.</p><p><strong>النتيجة:</strong> من خطوط الإنشاء نخمن أن <span class="math">(u_n)</span> متزايدة وتتقارب نحو نقطة تقاطع المنحنى مع المستقيم، أي نحو <span class="math">8</span>.</p>
<p><strong>2-أ) ما المطلوب؟</strong> نثبت أن كل الحدود تبقى في المجال <span class="math">[0,8[</span>.</p><p><strong>الفكرة المستعملة:</strong> نستعمل البرهان بالتراجع لأن الحد التالي معرف بدلالة الحد السابق.</p><p><strong>التطبيق:</strong> عند <span class="math">n=0</span> لدينا <span class="math">u_0=0</span>، إذن <span class="math">0≤u_0&lt;8</span>. نفرض أن <span class="math">0≤u_n&lt;8</span>. عندئذ <span class="math">6u_n+16≥16</span>، ومنه <span class="math">u_{n+1}=√(6u_n+16)≥0</span>. وللحد العلوي:</p><p class="math-equation">u<sub>n+1</sub>&lt;8 ⇔ 6u<sub>n</sub>+16&lt;64 ⇔ u<sub>n</sub>&lt;8</p><p><strong>النتيجة:</strong> <span class="math">0≤u_n&lt;8</span> لكل <span class="math">n</span>.</p>
<p><strong>2-ب) ما المطلوب؟</strong> نثبت صيغة الفرق.</p><p><strong>الفكرة المستعملة:</strong> نضرب في المرافق لإزالة الجذر.</p><p><strong>التطبيق:</strong></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=√(6u<sub>n</sub>+16)-u<sub>n</sub></p><p class="math-equation">=\frac{6u<sub>n</sub>+16-u<sub>n</sub><sup>2</sup>}{√(6u<sub>n</sub>+16)+u<sub>n</sub>}</p><p>ونحلل البسط:</p><p class="math-equation">6u<sub>n</sub>+16-u<sub>n</sub><sup>2</sup>=(8-u<sub>n</sub>)(u<sub>n</sub>+2)</p><p><strong>النتيجة:</strong></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=((8-u<sub>n</sub>)(u<sub>n</sub>+2))/(√(6u<sub>n</sub>+16)+u<sub>n</sub>)</p>
<p><strong>2-ج) ما المطلوب؟</strong> نستنتج اتجاه التغير.</p><p><strong>الفكرة المستعملة:</strong> نستعمل الحصر السابق لتحديد إشارة الفرق.</p><p><strong>التطبيق:</strong> من <span class="math">0≤u_n&lt;8</span> نجد <span class="math">8-u_n&gt;0</span> و<span class="math">u_n+2&gt;0</span> والمقام موجب، لذلك <span class="math">u_{n+1}-u_n&gt;0</span>.</p><p><strong>النتيجة:</strong> <span class="math">(u_n)</span> متزايدة تماما.</p>
<p><strong>3-أ) ما المطلوب؟</strong> نحصر الفرق بين <span class="math">u_{n+1}</span> و<span class="math">8</span>.</p><p><strong>الفكرة المستعملة:</strong> نحسب <span class="math">8-u_{n+1}</span> ونستعمل المرافق، ثم نقارن بمعامل ثابت.</p><p><strong>التطبيق:</strong></p><p class="math-equation">8-u<sub>n+1</sub>=8-√(6u<sub>n</sub>+16)=\frac{64-(6u<sub>n</sub>+16)}{8+√(6u<sub>n</sub>+16)}</p><p class="math-equation">8-u<sub>n+1</sub>=\frac{6(8-u<sub>n</sub>)}{8+√(6u<sub>n</sub>+16)}</p><p>وبما أن <span class="math">u_n≥0</span>، فإن <span class="math">√(6u_n+16)≥4</span>، ومنه <span class="math">8+√(6u_n+16)≥12</span>. لذلك:</p><p class="math-equation">0&lt;8-u<sub>n+1</sub>≤(1/2)(8-u<sub>n</sub>)</p>
<p><strong>3-ب) ما المطلوب؟</strong> نثبت حصرًا هندسيا ثم نستنتج النهاية.</p><p><strong>الفكرة المستعملة:</strong> نطبق المتراجحة السابقة بالتراجع.</p><p><strong>التطبيق:</strong> عند <span class="math">n=0</span>: <span class="math">8-u_0=8=8(1/2)^0</span>. إذا كان <span class="math">0&lt;8-u_n≤8(1/2)^n</span>، فإن:</p><p class="math-equation">0&lt;8-u<sub>n+1</sub>≤(1/2)(8-u<sub>n</sub>)≤8(1/2)<sup>n+1</sup></p><p><strong>النتيجة:</strong> <span class="math">0&lt;8-u_n≤8(1/2)^n</span>. وبما أن <span class="math">8(1/2)^n→0</span>، فإن <span class="math">8-u_n→0</span>، ومنه:</p><p class="math-equation">lim u<sub>n</sub>=8</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> بدأنا بالرسم للتخمين، ثم أثبتنا الحصر بالتراجع. بعد ذلك استعملنا المرافق لدراسة الرتابة، ثم استعملنا المرافق مرة ثانية للحصول على حصر هندسي للفرق <span class="math">8-u_n</span>، ومنه النهاية.</p>
</div>`,
    conceptHints: [
      { title: "التمثيل البياني للمتتالية", hint: "انطلق من <span class='math'>u<sub>0</sub></span> على محور الفواصل، اصعد إلى منحنى h، ثم انتقل أفقيا إلى <span class='math'>y=x</span> وكرر العملية للحصول على الحدود التالية تخمينيا." },
      { title: "الحصر بالتراجع", hint: "للانتقال من <span class='math'>u<sub>n</sub>&lt;8</span> إلى <span class='math'>u<sub>n+1</sub>&lt;8</span>، ارفع المتراجحة إلى المربع لأن الطرفين موجبان: <span class='math'>√(6u<sub>n</sub>+16)&lt;8</span>." },
      { title: "رتابة المتتالية", hint: "احسب <span class='math'>u<sub>n+1</sub>-u<sub>n</sub></span> واستعمل المرافق. بعد التحليل ستظهر العوامل <span class='math'>8-u<sub>n</sub></span> و<span class='math'>u<sub>n</sub>+2</span>." },
      { title: "النهاية باستعمال حصر هندسي", hint: "احسب <span class='math'>8-u<sub>n+1</sub></span> بالمرافق، ثم استعمل <span class='math'>u<sub>n</sub>≥0</span> للحصول على <span class='math'>√(6u<sub>n</sub>+16)≥4</span>." }
    ],
    solution: `<p><strong>1)</strong> من الرسم نخمن أن <span class="math">(u_n)</span> متزايدة وتتقارب نحو <span class="math">8</span>.</p><p><strong>2)</strong> نبرهن بالتراجع: عند <span class="math">n=0</span>، <span class="math">0≤u_0&lt;8</span>. إذا كان <span class="math">0≤u_n&lt;8</span> فإن <span class="math">u_{n+1}=√(6u_n+16)≥0</span>، و<span class="math">u_{n+1}<8</span> يكافئ <span class="math">6u_n+16&lt;64</span> أي <span class="math">u_n&lt;8</span>.</p><p>كما أن:</p><p class="math-equation">u_{n+1}-u_n=((8-u_n)(u_n+2))/(√(6u_n+16)+u_n)&gt;0</p><p>إذن <span class="math">(u_n)</span> متزايدة تماما.</p><p><strong>3)</strong></p><p class="math-equation">8-u_{n+1}=6(8-u_n)/(8+√(6u_n+16))≤(1/2)(8-u_n)</p><p>وبالتراجع:</p><p class="math-equation">0&lt;8-u_n≤8(1/2)^n</p><p>ومنه <span class="math">lim u_n=8</span>.</p>`
  },  {
    id: "bac-2016-technical-math-subject-2",
    branch: "science",
    stream: "technical_math",
    year: "2016",
    title: "بكالوريا 2016 - تقني رياضي - الموضوع الثاني",
    figureHtml: `<figure class="bac-figure" aria-label="تمثيل بياني تقريبي للدالة f على [1,+∞[">
      <svg class="bac-graph" viewBox="0 0 420 300" role="img">
        <rect x="0" y="0" width="420" height="300" rx="10" class="graph-bg"></rect>
        <g class="grid-lines"><path d="M70 20V260 M120 20V260 M170 20V260 M220 20V260 M270 20V260 M320 20V260 M370 20V260 M35 60H385 M35 110H385 M35 160H385 M35 210H385 M35 260H385"></path></g>
        <g class="axes"><path d="M35 260H390"></path><path d="M70 270V20"></path></g>
        <g class="axis-labels"><text x="64" y="276">0</text><text x="114" y="276">1</text><text x="164" y="276">2</text><text x="214" y="276">3</text><text x="264" y="276">4</text><text x="314" y="276">5</text><text x="364" y="276">6</text><text x="52" y="214">1</text><text x="52" y="164">2</text><text x="52" y="114">3</text><text x="52" y="64">4</text></g>
        <path class="curve-f" d="M120 210 C150 198 190 176 230 153 C275 128 320 102 370 73"></path>
        <circle cx="120" cy="210" r="4" class="graph-point"></circle>
        <text x="128" y="203" class="graph-label">(C<sub>f</sub>)</text>
      </svg>
    </figure>`,
    statementHtml: `<div class="bac-statement">
      <p><strong>التمرين: المتتاليات العددية</strong></p>
      <p>نعتبر الدالة العددية <span class="math">f</span> المعرفة على المجال <span class="math">[1,+∞[</span> بـ:</p>
      <p class="math-equation">f(x)=x<sup>2</sup>/(2x-1)</p>
      <ol>
        <li>بين أن الدالة <span class="math">f</span> متزايدة تماما على المجال <span class="math">[1,+∞[</span>.</li>
        <li><p>لتكن المتتالية العددية <span class="math">(u<sub>n</sub>)</span> المعرفة على <span class="math">ℕ</span> بـ <span class="math">u<sub>0</sub>=6</span> ومن أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n+1</sub>=f(u<sub>n</sub>)</span>.</p><ol><li>مثل بيانيا على حامل محور الفواصل الحدود الأولى للمتتالية <span class="math">(u<sub>n</sub>)</span> دون حسابها، موضحا خطوط الإنشاء.</li><li>أعط تخمينا حول اتجاه تغير المتتالية <span class="math">(u<sub>n</sub>)</span> وتقاربها.</li><li>برهن أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">1≤u<sub>n</sub>≤6</span>.</li><li>ادرس اتجاه تغير المتتالية <span class="math">(u<sub>n</sub>)</span>.</li><li>برر تقارب المتتالية <span class="math">(u<sub>n</sub>)</span>.</li></ol></li>
        <li><p>نعتبر المتتاليتين العدديتين <span class="math">(v<sub>n</sub>)</span> و<span class="math">(w<sub>n</sub>)</span> المعرفتين على <span class="math">ℕ</span> بـ:</p><p class="math-equation">v<sub>n</sub>=(u<sub>n</sub>-1)/u<sub>n</sub> ، w<sub>n</sub>=ln(v<sub>n</sub>)</p><ol><li>برهن أن <span class="math">(w<sub>n</sub>)</span> متتالية هندسية أساسها <span class="math">2</span>، ويطلب تعيين حدها الأول.</li><li>اكتب <span class="math">w<sub>n</sub></span> و<span class="math">v<sub>n</sub></span> بدلالة <span class="math">n</span>.</li><li>بين أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n</sub>=1/(1-(5/6)<sup>2<sup>n</sup></sup>)</span>، ثم احسب <span class="math">lim u<sub>n</sub></span>.</li></ol></li>
        <li>احسب بدلالة <span class="math">n</span> المجموع التالي: <span class="math">S<sub>n</sub>=1/w<sub>0</sub>+1/w<sub>1</sub>+...+1/w<sub>n</sub></span>.</li>
      </ol>
    </div>`,
    quickSolution: `<p><strong>1)</strong> <span class="math">f'(x)=2x(x-1)/(2x-1)<sup>2</sup>≥0</span> على <span class="math">[1,+∞[</span>؛ <span class="math">f</span> متزايدة تماما.</p><p><strong>2)</strong> التخمين: <span class="math">(u<sub>n</sub>)</span> متناقصة وتتقارب نحو <span class="math">1</span>؛ <span class="math">1≤u<sub>n</sub>≤6</span>؛ <span class="math">(u<sub>n</sub>)</span> متناقصة ومتقاربة.</p><p><strong>3)</strong> <span class="math">w<sub>0</sub>=ln(5/6)</span>، <span class="math">w<sub>n</sub>=2<sup>n</sup>ln(5/6)</span>؛ <span class="math">v<sub>n</sub>=(5/6)<sup>2<sup>n</sup></sup></span>؛ <span class="math">u<sub>n</sub>=1/(1-(5/6)<sup>2<sup>n</sup></sup>)</span>؛ <span class="math">lim u<sub>n</sub>=1</span>.</p><p><strong>4)</strong> <span class="math">S<sub>n</sub>=2(1-1/2<sup>n+1</sup>)/ln(5/6)</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p><strong>1) ما المطلوب؟</strong> ندرس اتجاه تغير الدالة <span class="math">f</span> على <span class="math">[1,+∞[</span>.</p><p><strong>الفكرة المستعملة:</strong> نستعمل المشتقة لأن السؤال يطلب رتابة دالة.</p><p><strong>التطبيق:</strong></p><p class="math-equation">f'(x)=\frac{2x(2x-1)-2x^2}{(2x-1)^2}=\frac{2x(x-1)}{(2x-1)^2}</p><p>على <span class="math">[1,+∞[</span> لدينا <span class="math">x≥1</span> و<span class="math">(2x-1)^2&gt;0</span>، ومنه <span class="math">f'(x)≥0</span>، وتكون موجبة على <span class="math">]1,+∞[</span>.</p><p><strong>النتيجة:</strong> <span class="math">f</span> متزايدة تماما على <span class="math">[1,+∞[</span>.</p>
<p><strong>2-أ و ب) ما المطلوب؟</strong> نستعمل الرسم لتمثيل الحدود الأولى وتخمين السلوك.</p><p><strong>الفكرة المستعملة:</strong> ننطلق من <span class="math">u_0=6</span> على محور الفواصل، نصعد إلى المنحنى، ثم ننتقل أفقيا إلى المستقيم <span class="math">y=x</span>. الرسم يعطي تخمينا فقط.</p><p><strong>النتيجة:</strong> من الرسم نخمن أن <span class="math">(u_n)</span> متناقصة وتتقارب نحو <span class="math">1</span>.</p>
<p><strong>2-ج) ما المطلوب؟</strong> نثبت الحصر <span class="math">1≤u_n≤6</span>.</p><p><strong>الفكرة المستعملة:</strong> نستعمل البرهان بالتراجع وصورة المجال بالدالة المتزايدة.</p><p><strong>التطبيق:</strong> عند <span class="math">n=0</span>: <span class="math">u_0=6</span>، إذن <span class="math">1≤u_0≤6</span>. نفرض <span class="math">1≤u_n≤6</span>. بما أن <span class="math">f</span> متزايدة على <span class="math">[1,+∞[</span>:</p><p class="math-equation">f(1)≤f(u_n)≤f(6)</p><p>أي:</p><p class="math-equation">1≤u_{n+1}≤36/11≤6</p><p><strong>النتيجة:</strong> <span class="math">1≤u_n≤6</span> لكل <span class="math">n</span>.</p>
<p><strong>2-د و هـ) ما المطلوب؟</strong> ندرس رتابة <span class="math">(u_n)</span> ثم نستنتج تقاربها.</p><p><strong>الفكرة المستعملة:</strong> نحسب <span class="math">f(x)-x</span> لأن <span class="math">u_{n+1}=f(u_n)</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">f(x)-x=\frac{x^2}{2x-1}-x=\frac{x(1-x)}{2x-1}</p><p>إذا كان <span class="math">x≥1</span> فإن <span class="math">x(1-x)≤0</span> و<span class="math">2x-1&gt;0</span>، ومنه <span class="math">f(x)-x≤0</span>. بالتالي <span class="math">u_{n+1}≤u_n</span>.</p><p><strong>النتيجة:</strong> <span class="math">(u_n)</span> متناقصة ومحدودة من الأسفل بـ <span class="math">1</span>، إذن فهي متقاربة.</p>
<p><strong>3-أ) ما المطلوب؟</strong> نثبت أن <span class="math">(w_n)</span> هندسية.</p><p><strong>الفكرة المستعملة:</strong> نحسب <span class="math">v_{n+1}</span> أولا، لأن اللوغاريتم يحول التربيع إلى ضرب.</p><p><strong>التطبيق:</strong></p><p class="math-equation">v_{n+1}=\frac{u_{n+1}-1}{u_{n+1}}=\frac{\frac{u_n^2}{2u_n-1}-1}{\frac{u_n^2}{2u_n-1}}=\frac{(u_n-1)^2}{u_n^2}=v_n^2</p><p>إذن:</p><p class="math-equation">w_{n+1}=ln(v_{n+1})=ln(v_n^2)=2ln(v_n)=2w_n</p><p>كما أن:</p><p class="math-equation">v_0=(6-1)/6=5/6 ، w_0=ln(5/6)</p><p><strong>النتيجة:</strong> <span class="math">(w_n)</span> هندسية أساسها <span class="math">2</span> وحدها الأول <span class="math">ln(5/6)</span>.</p>
<p><strong>3-ب) ما المطلوب؟</strong> نكتب <span class="math">w_n</span> و<span class="math">v_n</span>.</p><p><strong>الفكرة المستعملة:</strong> نستعمل الحد العام للمتتالية الهندسية ثم نرفع بالأساس <span class="math">e</span>.</p><p><strong>التطبيق والنتيجة:</strong></p><p class="math-equation">w_n=2^n ln(5/6)</p><p class="math-equation">v_n=e^{w_n}=e^{2^n ln(5/6)}=(5/6)^{2^n}</p>
<p><strong>3-ج) ما المطلوب؟</strong> نستخرج <span class="math">u_n</span> ونحسب النهاية.</p><p><strong>الفكرة المستعملة:</strong> نحل العلاقة <span class="math">v_n=(u_n-1)/u_n</span> بالنسبة إلى <span class="math">u_n</span>.</p><p><strong>التطبيق:</strong> من <span class="math">v_n=1-1/u_n</span> نحصل على <span class="math">1/u_n=1-v_n</span>، إذن:</p><p class="math-equation">u_n=1/(1-v_n)=1/(1-(5/6)^{2^n})</p><p>وبما أن <span class="math">0&lt;5/6&lt;1</span>، فإن <span class="math">(5/6)^{2^n}→0</span>.</p><p><strong>النتيجة:</strong> <span class="math">lim u_n=1</span>.</p>
<p><strong>4) ما المطلوب؟</strong> نحسب مجموع مقلوبات <span class="math">w_k</span>.</p><p><strong>الفكرة المستعملة:</strong> بما أن <span class="math">w_k=2^k ln(5/6)</span> فإن <span class="math">1/w_k=(1/ln(5/6))(1/2^k)</span>، وهو مجموع هندسي.</p><p><strong>التطبيق:</strong></p><p class="math-equation">S_n=\frac{1}{ln(5/6)}(1+1/2+...+1/2^n)</p><p><strong>النتيجة:</strong></p><p class="math-equation">S_n=\frac{2(1-1/2^{n+1})}{ln(5/6)}</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> بدأنا بدراسة الدالة ثم استعملناها لحصر المتتالية ودراسة رتابتها. بعد ذلك حوّلنا العلاقة عبر <span class="math">v_n</span> إلى تربيع، ثم عبر اللوغاريتم إلى متتالية هندسية، فاستخرجنا العبارة الصريحة والنهاية والمجموع.</p>
</div>`,
    conceptHints: [
      { title: "دراسة دالة", hint: "احسب f'(x) باستعمال قاعدة مشتقة خارج قسمة، ثم حدد إشارة البسط والمقام على [1,+∞[." },
      { title: "التمثيل البياني للمتتالية", hint: "ابدأ من <span class='math'>u<sub>0</sub></span> على محور الفواصل، اصعد إلى المنحنى C_f، ثم انتقل أفقيا إلى المستقيم <span class='math'>y=x</span>. الرسم يعطي تخمينا فقط." },
      { title: "الحصر بالتراجع", hint: "استعمل تزايد f على [1,+∞[. إذا كان <span class='math'>u<sub>n</sub></span> بين 1 و6، فقارن <span class='math'>f(u<sub>n</sub>)</span> بين f(1) وf(6)." },
      { title: "رتابة المتتالية", hint: "ادرس إشارة <span class='math'>f(x)-x</span> على المجال الذي يحصر <span class='math'>u<sub>n</sub></span>، ثم عوض x بـ<span class='math'>u<sub>n</sub></span>." },
      { title: "المتتالية المساعدة", hint: "ابدأ بحساب <span class='math'>v<sub>n+1</sub></span>. ستجد <span class='math'>v<sub>n+1</sub>=v<sub>n</sub><sup>2</sup></span>، ثم استعمل اللوغاريتم حتى تحصل على <span class='math'>w<sub>n+1</sub>=2w<sub>n</sub></span>." },
      { title: "حساب المجموع", hint: "بعد كتابة <span class='math'>w<sub>n</sub>=2<sup>n</sup> ln(5/6)</span>، اقلبه لتحصل على حد هندسي أساسه <span class='math'>1/2</span> مضروب في ثابت." }
    ],
    solution: `<p><strong>1)</strong></p><p class="math-equation">f'(x)=2x(x-1)/(2x-1)^2≥0</p><p>إذن <span class="math">f</span> متزايدة على <span class="math">[1,+∞[</span>.</p><p><strong>2)</strong> من الرسم نخمن أن المتتالية متناقصة وتتقارب نحو <span class="math">1</span>. نبرهن الحصر: إذا كان <span class="math">1≤u_n≤6</span> فبما أن <span class="math">f</span> متزايدة، <span class="math">1=f(1)≤u_{n+1}≤f(6)=36/11≤6</span>. إذن <span class="math">1≤u_n≤6</span>.</p><p>ولدراسة الرتابة:</p><p class="math-equation">f(x)-x=x(1-x)/(2x-1)≤0</p><p>على <span class="math">[1,+∞[</span>، إذن <span class="math">u_{n+1}≤u_n</span>. المتتالية متناقصة ومحدودة من الأسفل، فهي متقاربة.</p><p><strong>3)</strong></p><p class="math-equation">v_{n+1}=((u_n-1)/u_n)^2=v_n^2</p><p>ومنه <span class="math">w_{n+1}=2w_n</span> و<span class="math">w_0=ln(5/6)</span>. إذن:</p><p class="math-equation">w_n=2^n ln(5/6), v_n=(5/6)^{2^n}</p><p>ومن <span class="math">v_n=1-1/u_n</span> نحصل على:</p><p class="math-equation">u_n=1/(1-(5/6)^{2^n})</p><p>وبالتالي <span class="math">lim u_n=1</span>.</p><p><strong>4)</strong></p><p class="math-equation">S_n=\frac{1}{ln(5/6)}(1+1/2+...+1/2^n)=\frac{2(1-1/2^{n+1})}{ln(5/6)}</p>`
  },  {
    id: "bac-2017-technical-math-subject-1",
    branch: "science",
    stream: "technical_math",
    year: "2017",
    title: "بكالوريا 2017 - تقني رياضي - الموضوع الأول",
    figureHtml: `<figure class="bac-figure" aria-label="تمثيل بياني للدالة f والمستقيم y=x">
      <svg class="bac-graph" viewBox="0 0 420 300" role="img">
        <rect x="0" y="0" width="420" height="300" rx="10" class="graph-bg"></rect>
        <g class="grid-lines"><path d="M70 20V260 M140 20V260 M210 20V260 M280 20V260 M350 20V260 M35 60H385 M35 110H385 M35 160H385 M35 210H385 M35 260H385"></path></g>
        <g class="axes"><path d="M35 210H390"></path><path d="M210 270V20"></path></g>
        <g class="axis-labels"><text x="136" y="229">-1</text><text x="204" y="229">0</text><text x="276" y="229">1</text><text x="218" y="64">1</text></g>
        <path class="line-delta" d="M70 280L360 -10"></path>
        <path class="curve-f" d="M35 166 C95 160 150 151 205 136 C252 122 292 94 335 34"></path>
        <g class="graph-points"><circle cx="140" cy="160" r="4"></circle><circle cx="257" cy="122" r="4"></circle><circle cx="292" cy="94" r="4"></circle></g>
        <text x="304" y="42" class="graph-label">(Δ): y=x</text><text x="112" y="148" class="graph-label">(C<sub>f</sub>)</text><text x="125" y="228" class="graph-label">u₀=-1</text>
      </svg>
    </figure>`,
    statementHtml: `<div class="bac-statement">
      <p><strong>التمرين: المتتاليات العددية</strong></p>
      <p>نعتبر الدالة العددية <span class="math">f</span> المعرفة على المجال <span class="math">]-∞ ; 1]</span> بـ:</p>
      <p class="math-equation">f(x) = 1/(2 - x)</p>
      <p>و<span class="math">(C<sub>f</sub>)</span> تمثيلها البياني في المستوى المنسوب إلى المعلم المتعامد المتجانس <span class="math">(O;i,j)</span>، وليكن <span class="math">(Δ)</span> المستقيم ذا المعادلة <span class="math">y=x</span>.</p>
      <p>المتتالية العددية <span class="math">(u<sub>n</sub>)</span> معرفة بحدها الأول <span class="math">u<sub>0</sub> = -1</span>، ومن أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math-equation">u<sub>n+1</sub> = f(u<sub>n</sub>)</p>
      <ol>
        <li>أعد رسم الشكل المقابل، ثم مثل على حامل محور الفواصل الحدود <span class="math">u<sub>0</sub>, u<sub>1</sub>, u<sub>2</sub>, u<sub>3</sub></span> مبرزا خطوط التمثيل، ثم ضع تخمينا حول اتجاه تغير المتتالية <span class="math">(u<sub>n</sub>)</span> وتقاربها.</li>
        <li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n</sub> &lt; 1</span>.</li>
        <li>ادرس اتجاه تغير المتتالية <span class="math">(u<sub>n</sub>)</span>، ثم استنتج أنها متقاربة.</li>
        <li><p>نعتبر المتتالية العددية <span class="math">(v<sub>n</sub>)</span> المعرفة كما يلي، من أجل كل عدد طبيعي <span class="math">n</span>:</p><p class="math-equation">v<sub>n</sub> = 2/(1-u<sub>n</sub>)</p><ol><li>برهن أن <span class="math">(v<sub>n</sub>)</span> متتالية حسابية أساسها <span class="math">2</span>، ثم عين حدها العام بدلالة <span class="math">n</span>.</li><li>استنتج عبارة الحد العام <span class="math">u<sub>n</sub></span> بدلالة <span class="math">n</span>، ثم احسب <span class="math">lim u<sub>n</sub></span>.</li></ol></li>
      </ol>
    </div>`,
    quickSolution: `<p><strong>1)</strong> من التمثيل نخمن أن <span class="math">(u<sub>n</sub>)</span> متزايدة وتتقارب نحو <span class="math">1</span>.</p><p><strong>2)</strong> <span class="math">u<sub>n</sub> &lt; 1</span> لكل <span class="math">n</span>.</p><p><strong>3)</strong> <span class="math">u<sub>n+1</sub>-u<sub>n</sub>=(u<sub>n</sub>-1)<sup>2</sup>/(2-u<sub>n</sub>)&gt;0</span>؛ المتتالية متزايدة ومتقاربة.</p><p><strong>4)</strong> <span class="math">v<sub>0</sub>=1</span>، <span class="math">v<sub>n+1</sub>=v<sub>n</sub>+2</span>؛ <span class="math">v<sub>n</sub>=2n+1</span>؛ <span class="math">u<sub>n</sub>=(2n-1)/(2n+1)</span>؛ <span class="math">lim u<sub>n</sub>=1</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p><strong>1) ما المطلوب؟</strong> نستعمل المنحنى <span class="math">C_f</span> والمستقيم <span class="math">y=x</span> لتمثيل الحدود الأولى ثم نعطي تخمينا.</p><p><strong>الفكرة المستعملة:</strong> نبدأ من <span class="math">u_0=-1</span> على محور الفواصل، نصعد إلى المنحنى، ثم ننتقل أفقيا إلى المستقيم <span class="math">y=x</span>، ونكرر العملية. الرسم يعطي تخمينا فقط.</p><p><strong>التطبيق:</strong> بالحساب نجد <span class="math">u_1=1/3</span>، <span class="math">u_2=3/5</span>، <span class="math">u_3=5/7</span>. هذه القيم توحي بأن الحدود تتزايد وتقترب من <span class="math">1</span>.</p><p><strong>النتيجة:</strong> نخمن أن <span class="math">(u_n)</span> متزايدة وتتقارب نحو <span class="math">1</span>.</p>
<p><strong>2) ما المطلوب؟</strong> نثبت أن كل حدود المتتالية أصغر من <span class="math">1</span>.</p><p><strong>الفكرة المستعملة:</strong> نستعمل البرهان بالتراجع لأن كل حد يعرف من الحد السابق.</p><p><strong>التطبيق:</strong> عند <span class="math">n=0</span>: <span class="math">u_0=-1&lt;1</span>. نفرض أن <span class="math">u_n&lt;1</span>. عندئذ <span class="math">2-u_n&gt;1&gt;0</span>، ونريد إثبات:</p><p class="math-equation">u<sub>n+1</sub> = 1/(2-u<sub>n</sub>) &lt; 1</p><p>وهذا صحيح لأن <span class="math">2-u_n&gt;1</span>.</p><p><strong>النتيجة:</strong> <span class="math">u_n&lt;1</span> لكل <span class="math">n∈ℕ</span>.</p>
<p><strong>3) ما المطلوب؟</strong> ندرس اتجاه تغير المتتالية ثم نستنتج التقارب.</p><p><strong>الفكرة المستعملة:</strong> نحسب الفرق <span class="math">u_{n+1}-u_n</span> ونستعمل الحصر السابق، ثم نستعمل مبرهنة الرتابة والحدود.</p><p><strong>التطبيق:</strong></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub> = 1/(2-u<sub>n</sub>) - u<sub>n</sub></p><p class="math-equation">= [1-u<sub>n</sub>(2-u<sub>n</sub>)]/(2-u<sub>n</sub>) = (u<sub>n</sub>-1)<sup>2</sup>/(2-u<sub>n</sub>)</p><p>وبما أن <span class="math">u_n&lt;1</span>، فإن المقام موجب والبسط موجب تماما.</p><p><strong>النتيجة:</strong> <span class="math">(u_n)</span> متزايدة تماما. وهي محدودة من الأعلى بـ <span class="math">1</span>، إذن فهي متقاربة.</p>
<p><strong>4-أ) ما المطلوب؟</strong> نثبت أن <span class="math">(v_n)</span> حسابية ونكتب حدها العام.</p><p><strong>الفكرة المستعملة:</strong> نحسب <span class="math">v_{n+1}</span> باستعمال <span class="math">u_{n+1}=1/(2-u_n)</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">1-u<sub>n+1</sub> = 1 - 1/(2-u<sub>n</sub>) = (1-u<sub>n</sub>)/(2-u<sub>n</sub>)</p><p>إذن:</p><p class="math-equation">v<sub>n+1</sub> = 2/(1-u<sub>n+1</sub>) = 2(2-u<sub>n</sub>)/(1-u<sub>n</sub>)</p><p>نكتب:</p><p class="math-equation">2(2-u<sub>n</sub>) = 2(1-u<sub>n</sub>) + 2</p><p>فنحصل على:</p><p class="math-equation">v<sub>n+1</sub> = 2 + 2/(1-u<sub>n</sub>) = 2 + v<sub>n</sub></p><p>كما أن:</p><p class="math-equation">v<sub>0</sub> = 2/(1-(-1)) = 1</p><p><strong>النتيجة:</strong> <span class="math">(v_n)</span> حسابية أساسها <span class="math">2</span> و<span class="math">v_n=1+2n</span>.</p>
<p><strong>4-ب) ما المطلوب؟</strong> نستخرج عبارة <span class="math">u_n</span> ونحسب النهاية.</p><p><strong>الفكرة المستعملة:</strong> نحل العلاقة <span class="math">v_n=2/(1-u_n)</span> بالنسبة إلى <span class="math">u_n</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">1-u<sub>n</sub> = 2/v<sub>n</sub> = 2/(2n+1)</p><p>ومنه:</p><p class="math-equation">u<sub>n</sub> = 1 - 2/(2n+1) = (2n-1)/(2n+1)</p><p><strong>النتيجة:</strong> <span class="math">u_n=(2n-1)/(2n+1)</span>، وبالتالي <span class="math">lim u_n=1</span>.</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> استعملنا الرسم لتخمين التزايد والتقارب، ثم أثبتنا الحصر بالتراجع والرتابة بالفرق. بعد ذلك حولنا العلاقة الكسرية بفضل <span class="math">v_n=2/(1-u_n)</span> إلى متتالية حسابية، ومنها استخرجنا العبارة الصريحة والنهاية.</p>
</div>`,
    conceptHints: [
      { title: "التمثيل البياني للمتتالية", hint: "ابدأ من <span class='math'>u<sub>0</sub></span> على محور الفواصل، اصعد إلى المنحنى C_f، ثم انتقل أفقيا إلى المستقيم <span class='math'>y=x</span>، وكرر العملية. استعمل الرسم للتخمين فقط." },
      { title: "الحصر بالتراجع", hint: "لإثبات <span class='math'>u<sub>n</sub>&lt;1</span>، افترض <span class='math'>u<sub>n</sub>&lt;1</span>. عندها <span class='math'>2-u<sub>n</sub></span>>1، وبالتالي <span class='math'>1/(2-u<sub>n</sub>)&lt;1</span>." },
      { title: "رتابة المتتالية", hint: "احسب <span class='math'>u<sub>n+1</sub>-u<sub>n</sub></span> في مقام واحد. ستظهر عبارة مربعة في البسط، والحصر السابق يعطي إشارة المقام." },
      { title: "المتتالية المساعدة", hint: "احسب أولا <span class='math'>1-u<sub>n+1</sub></span>. بعد التعويض ستظهر نسبة تسمح بكتابة <span class='math'>v<sub>n+1</sub>=v<sub>n</sub>+2</span>." },
      { title: "النهاية", hint: "بعد إيجاد <span class='math'>v<sub>n</sub>=2n+1</span>، استعمل <span class='math'>1-u<sub>n</sub>=2/v<sub>n</sub></span> ثم مرر إلى النهاية." }
    ],
    solution: `<p><strong>1)</strong> من الرسم نحصل على تخمين أن <span class="math">(u_n)</span> متزايدة وتتقارب نحو <span class="math">1</span>. وبالحساب: <span class="math">u_1=1/3</span>، <span class="math">u_2=3/5</span>، <span class="math">u_3=5/7</span>.</p><p><strong>2)</strong> عند <span class="math">n=0</span>: <span class="math">u_0=-1&lt;1</span>. إذا كان <span class="math">u_n&lt;1</span> فإن <span class="math">2-u_n&gt;1</span>، ومنه <span class="math">u_{n+1}=1/(2-u_n)&lt;1</span>. إذن <span class="math">u_n&lt;1</span> لكل <span class="math">n</span>.</p><p><strong>3)</strong></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=(u<sub>n</sub>-1)<sup>2</sup>/(2-u<sub>n</sub>)&gt;0</p><p>إذن <span class="math">(u_n)</span> متزايدة ومحدودة من الأعلى بـ <span class="math">1</span>، فهي متقاربة.</p><p><strong>4)</strong> لدينا:</p><p class="math-equation">1-u<sub>n+1</sub>=(1-u<sub>n</sub>)/(2-u<sub>n</sub>)</p><p>إذن:</p><p class="math-equation">v<sub>n+1</sub>=2/(1-u<sub>n+1</sub>)=v<sub>n</sub>+2</p><p>و<span class="math">v_0=1</span>، إذن <span class="math">v_n=2n+1</span>. ومنه:</p><p class="math-equation">u<sub>n</sub>=1-2/(2n+1)=(2n-1)/(2n+1)</p><p>وبالتالي <span class="math">lim u_n=1</span>.</p>`
  },  {
    id: "bac-2017-technical-math-special-subject-2",
    branch: "science",
    stream: "technical_math",
    year: "2017",
    title: "بكالوريا 2017 - تقني رياضي - الدورة الاستثنائية - الموضوع الثاني",
    statementHtml: `<div class="bac-statement">
      <p><strong>التمرين: المتتاليات العددية</strong></p>
      <p>نعتبر المتتالية <span class="math">(u<sub>n</sub>)</span> المعرفة على <span class="math">ℕ*</span> بـ:</p>
      <p class="math-equation">u<sub>1</sub> = 1/a</p>
      <p>ومن أجل كل عدد طبيعي غير معدوم <span class="math">n</span>:</p>
      <p class="math-equation">u<sub>n+1</sub> = ((n+1)/(an))u<sub>n</sub></p>
      <p>حيث <span class="math">a</span> عدد حقيقي أكبر من أو يساوي <span class="math">2</span>.</p>
      <ol>
        <li><ol><li>بين أنه من أجل كل عدد طبيعي غير معدوم <span class="math">n</span>: <span class="math">u<sub>n</sub> &gt; 0</span>.</li><li>بين أن المتتالية <span class="math">(u<sub>n</sub>)</span> متناقصة، ثم استنتج أنها متقاربة.</li></ol></li>
        <li><p>نعتبر المتتالية <span class="math">(v<sub>n</sub>)</span> المعرفة كما يلي، من أجل كل عدد طبيعي غير معدوم <span class="math">n</span>:</p><p class="math-equation">v<sub>n</sub> = (1/n)u<sub>n</sub></p><ol><li>بين أن المتتالية <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">1/a</span>، وعين حدها الأول <span class="math">v<sub>1</sub></span> بدلالة <span class="math">a</span>.</li><li>جد بدلالة <span class="math">n</span> و<span class="math">a</span> عبارة الحد العام <span class="math">v<sub>n</sub></span>، ثم استنتج عبارة <span class="math">u<sub>n</sub></span> واحسب <span class="math">lim u<sub>n</sub></span>.</li></ol></li>
        <li>احسب بدلالة <span class="math">n</span> و<span class="math">a</span> المجموع <span class="math">S<sub>n</sub></span> حيث: <span class="math">S<sub>n</sub> = u<sub>1</sub> + (1/2)u<sub>2</sub> + (1/3)u<sub>3</sub> + ... + (1/n)u<sub>n</sub></span>، ثم عين قيمة <span class="math">a</span> حيث <span class="math">lim S<sub>n</sub> = 1/2016</span>.</li>
      </ol>
    </div>`,
    quickSolution: `<p><strong>1)</strong> <span class="math">u<sub>n</sub> &gt; 0</span> لكل <span class="math">n≥1</span>؛ <span class="math">(u<sub>n</sub>)</span> متناقصة ومحدودة من الأسفل، إذن متقاربة.</p><p><strong>2)</strong> <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">1/a</span>، <span class="math">v<sub>1</sub> = 1/a</span>؛ <span class="math">v<sub>n</sub> = 1/a<sup>n</sup></span>؛ <span class="math">u<sub>n</sub> = n/a<sup>n</sup></span>؛ <span class="math">lim u<sub>n</sub> = 0</span>.</p><p><strong>3)</strong> <span class="math">S<sub>n</sub> = (1 - (1/a)<sup>n</sup>)/(a-1)</span>؛ <span class="math">lim S<sub>n</sub> = 1/(a-1)</span>؛ القيمة المطلوبة <span class="math">a = 2017</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p><strong>1-أ) ما المطلوب؟</strong> نثبت أن كل حدود المتتالية موجبة.</p><p><strong>الفكرة المستعملة:</strong> نستعمل البرهان بالتراجع لأن كل حد يعرف انطلاقا من الحد السابق بعامل موجب.</p><p><strong>التطبيق:</strong> عند <span class="math">n=1</span> لدينا <span class="math">u<sub>1</sub>=1/a&gt;0</span> لأن <span class="math">a≥2</span>. نفترض أن <span class="math">u<sub>n</sub>&gt;0</span>. بما أن <span class="math">(n+1)/(an)&gt;0</span>، فإن:</p><p class="math-equation">u<sub>n+1</sub> = ((n+1)/(an))u<sub>n</sub> &gt; 0</p><p><strong>النتيجة:</strong> <span class="math">u<sub>n</sub>&gt;0</span> لكل <span class="math">n≥1</span>.</p>
<p><strong>1-ب) ما المطلوب؟</strong> ندرس الرتابة ثم نستنتج التقارب.</p><p><strong>الفكرة المستعملة:</strong> نقارن النسبة <span class="math">u<sub>n+1</sub>/u<sub>n</sub></span> بالعدد <span class="math">1</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">u<sub>n+1</sub>/u<sub>n</sub> = (n+1)/(an)</p><p>وبما أن <span class="math">a≥2</span> فإن:</p><p class="math-equation">(n+1)/(an) ≤ (n+1)/(2n) ≤ 1</p><p>إذن <span class="math">u<sub>n+1</sub>≤u<sub>n</sub></span>. وبما أن الحدود موجبة، فالمتتالية محدودة من الأسفل بـ <span class="math">0</span>.</p><p><strong>النتيجة:</strong> <span class="math">(u<sub>n</sub>)</span> متناقصة ومحدودة من الأسفل، إذن متقاربة.</p>
<p><strong>2-أ) ما المطلوب؟</strong> نثبت أن <span class="math">(v_n)</span> هندسية ونحدد حدها الأول.</p><p><strong>الفكرة المستعملة:</strong> التعريف <span class="math">v_n=u_n/n</span> يزيل العامل <span class="math">n+1</span> الموجود في علاقة التراجع.</p><p><strong>التطبيق:</strong></p><p class="math-equation">v<sub>n+1</sub> = u<sub>n+1</sub>/(n+1)</p><p>وبتعويض <span class="math">u<sub>n+1</sub></span> نحصل على:</p><p class="math-equation">v<sub>n+1</sub> = [((n+1)/(an))u<sub>n</sub>]/(n+1) = u<sub>n</sub>/(an) = (1/a)v<sub>n</sub></p><p>كما أن:</p><p class="math-equation">v<sub>1</sub> = u<sub>1</sub>/1 = 1/a</p><p><strong>النتيجة:</strong> <span class="math">(v_n)</span> هندسية أساسها <span class="math">1/a</span> وحدها الأول <span class="math">1/a</span>.</p>
<p><strong>2-ب) ما المطلوب؟</strong> نكتب <span class="math">v_n</span> و<span class="math">u_n</span> ونحسب النهاية.</p><p><strong>الفكرة المستعملة:</strong> نستعمل صيغة الحد العام لمتتالية هندسية تبدأ من الرتبة <span class="math">1</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">v<sub>n</sub> = v<sub>1</sub>(1/a)<sup>n-1</sup> = (1/a)<sup>n</sup></p><p>وبما أن <span class="math">v_n=u_n/n</span>، فإن:</p><p class="math-equation">u<sub>n</sub> = n/a<sup>n</sup></p><p>وبما أن <span class="math">a≥2</span> فإن <span class="math">a^n</span> ينمو أسرع من <span class="math">n</span>.</p><p><strong>النتيجة:</strong> <span class="math">lim u<sub>n</sub>=0</span>.</p>
<p><strong>3) ما المطلوب؟</strong> نحسب مجموع <span class="math">S_n</span> ثم نعين <span class="math">a</span>.</p><p><strong>الفكرة المستعملة:</strong> كل حد في المجموع هو <span class="math">u_k/k=v_k</span>، لذلك <span class="math">S_n</span> مجموع هندسي.</p><p><strong>التطبيق:</strong></p><p class="math-equation">S<sub>n</sub> = v<sub>1</sub> + v<sub>2</sub> + ... + v<sub>n</sub> = 1/a + 1/a<sup>2</sup> + ... + 1/a<sup>n</sup></p><p>إذن:</p><p class="math-equation">S<sub>n</sub> = (1/a)[1-(1/a)<sup>n</sup>]/(1-1/a)</p><p><strong>النتيجة:</strong></p><p class="math-equation">S<sub>n</sub> = [1-(1/a)<sup>n</sup>]/(a-1)</p><p>وبما أن <span class="math">a≥2</span>، فإن <span class="math">(1/a)^n→0</span>، ومنه:</p><p class="math-equation">lim S<sub>n</sub> = 1/(a-1)</p><p>نريد <span class="math">1/(a-1)=1/2016</span>، وبالتالي <span class="math">a-1=2016</span>.</p><p><strong>النتيجة النهائية:</strong> <span class="math">a=2017</span>.</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> أثبتنا أولا إيجابية الحدود ورتابتها باستعمال النسبة بين حدين متتاليين. بعد ذلك قسمنا <span class="math">u_n</span> على <span class="math">n</span> لتحويل العلاقة إلى متتالية هندسية، ثم صار المجموع <span class="math">S_n</span> مجموعا هندسيا مباشرا، ومن نهايته وجدنا <span class="math">a=2017</span>.</p>
</div>`,
    conceptHints: [
      { title: "الإيجابية بالتراجع", hint: "ابدأ من <span class='math'>u<sub>1</sub>=1/</span>a. في خطوة الانتقال لاحظ أن العامل <span class='math'>(n+1)/(</span>an) موجب، لذلك يحافظ على إشارة <span class='math'>u<sub>n</sub></span>." },
      { title: "رتابة المتتالية", hint: "احسب النسبة <span class='math'>u<sub>n+1</sub>/u<sub>n</sub></span>. بما أن a≥2، قارن <span class='math'>(n+1)/(</span>an) مع 1." },
      { title: "المتتالية المساعدة", hint: "تعريف <span class='math'>v<sub>n</sub>=u<sub>n</sub>/n</span> مختار لإلغاء العامل <span class='math'>n+1</span>. احسب <span class='math'>v<sub>n+1</sub>=u<sub>n+1</sub>/(n+1)</span> وستظهر النسبة 1/a." },
      { title: "النهاية", hint: "بعد الوصول إلى <span class='math'>u<sub>n</sub>=n/a^n</span>، استعمل أن a≥2 وأن المتتالية الهندسية في المقام تغلب العامل n." },
      { title: "حساب المجموع", hint: "لاحظ أن الحد العام داخل <span class='math'>S<sub>n</sub></span> هو <span class='math'>u<sub>k</sub>/k</span>، أي <span class='math'>v<sub>k</sub></span>. لذلك <span class='math'>S<sub>n</sub></span> مجموع هندسي من <span class='math'>v<sub>1</sub></span> إلى <span class='math'>v<sub>n</sub></span>." }
    ],
    solution: `<p><strong>1)</strong> عند <span class="math">n=1</span>: <span class="math">u<sub>1</sub>=1/a&gt;0</span>. إذا كان <span class="math">u<sub>n</sub>&gt;0</span> فإن <span class="math">u<sub>n+1</sub>=((n+1)/(an))u<sub>n</sub>&gt;0</span>. إذن <span class="math">u<sub>n</sub>&gt;0</span>.</p><p>كما أن:</p><p class="math-equation">u<sub>n+1</sub>/u<sub>n</sub>=(n+1)/(an)≤(n+1)/(2n)≤1</p><p>إذن <span class="math">(u_n)</span> متناقصة ومحدودة من الأسفل بـ <span class="math">0</span>، فهي متقاربة.</p><p><strong>2)</strong></p><p class="math-equation">v<sub>n+1</sub>=u<sub>n+1</sub>/(n+1)=u<sub>n</sub>/(an)=(1/a)v<sub>n</sub></p><p>و<span class="math">v<sub>1</sub>=1/a</span>، إذن:</p><p class="math-equation">v<sub>n</sub>=1/a<sup>n</sup> ، u<sub>n</sub>=n/a<sup>n</sup></p><p>وبالتالي <span class="math">lim u<sub>n</sub>=0</span>.</p><p><strong>3)</strong> بما أن <span class="math">u_k/k=v_k</span>، فإن:</p><p class="math-equation">S<sub>n</sub>=1/a+1/a<sup>2</sup>+...+1/a<sup>n</sup>=[1-(1/a)<sup>n</sup>]/(a-1)</p><p>ومنه <span class="math">lim S<sub>n</sub>=1/(a-1)</span>. إذا كانت النهاية <span class="math">1/2016</span> فإن <span class="math">a=2017</span>.</p>`
  },  {
    id: "bac-2018-technical-math-subject-1",
    branch: "science",
    stream: "technical_math",
    year: "2018",
    title: "بكالوريا 2018 - تقني رياضي - الموضوع الأول",
    statementHtml: `<div class="bac-statement">
      <p><strong>التمرين: المتتاليات العددية</strong></p>
      <p>الدالة العددية <span class="math">f</span> معرفة ومتزايدة تماما على المجال <span class="math">[0,+∞[</span> بـ:</p>
      <p class="math-equation">f(x) = 2x/(ex + 1)</p>
      <p>حيث <span class="math">e</span> أساس اللوغاريتم النيبيري.</p>
      <p>المتتالية العددية <span class="math">(u<sub>n</sub>)</span> معرفة بحدها الأول <span class="math">u<sub>0</sub> = 5/(4e)</span>، ومن أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math-equation">u<sub>n+1</sub> = f(u<sub>n</sub>)</p>
      <ol>
        <li><ol><li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n</sub> &gt; 1/e</span>.</li><li>بين أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n+1</sub> - u<sub>n</sub> = eu<sub>n</sub>(1/e - u<sub>n</sub>)/(eu<sub>n</sub> + 1)</span>، ثم استنتج اتجاه تغير <span class="math">(u<sub>n</sub>)</span> وبرر أنها متقاربة.</li></ol></li>
        <li><p>نعتبر المتتالية العددية <span class="math">(v<sub>n</sub>)</span> المعرفة على <span class="math">ℕ</span> بـ:</p><p class="math-equation">v<sub>n</sub> = eu<sub>n</sub>/(eu<sub>n</sub> - 1)</p><p>أثبت أن <span class="math">(v<sub>n</sub>)</span> متتالية هندسية أساسها <span class="math">2</span>، ثم عين حدها الأول واكتب <span class="math">v<sub>n</sub></span> بدلالة <span class="math">n</span>.</p></li>
        <li><ol><li>تحقق أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">v<sub>n</sub> = 1 + 1/(eu<sub>n</sub> - 1)</span>، ثم استنتج عبارة <span class="math">u<sub>n</sub></span> بدلالة <span class="math">n</span>، ثم احسب <span class="math">lim u<sub>n</sub></span>.</li><li>احسب بدلالة <span class="math">n</span> المجموع <span class="math">S<sub>n</sub> = v<sub>0</sub> + v<sub>1</sub> + ... + v<sub>n</sub></span>.</li></ol></li>
        <li><ol><li>ادرس حسب قيم العدد الطبيعي <span class="math">n</span> بواقي القسمة الإقليدية للعدد <span class="math">2<sup>n</sup></span> على <span class="math">7</span>.</li><li>عين قيم العدد الطبيعي <span class="math">n</span> التي من أجلها <span class="math">S<sub>n</sub></span> يقبل القسمة على <span class="math">7</span>.</li></ol></li>
      </ol>
    </div>`,
    quickSolution: `<p><strong>1)</strong> <span class="math">u<sub>n</sub> &gt; 1/e</span> لكل <span class="math">n</span>؛ <span class="math">u<sub>n+1</sub>-u<sub>n</sub>=eu<sub>n</sub>(1/e-u<sub>n</sub>)/(eu<sub>n</sub>+1)</span>؛ <span class="math">(u<sub>n</sub>)</span> متناقصة ومتقاربة.</p><p><strong>2)</strong> <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">2</span>، <span class="math">v<sub>0</sub>=5</span>؛ <span class="math">v<sub>n</sub>=5×2<sup>n</sup></span>.</p><p><strong>3)</strong> <span class="math">u<sub>n</sub>=5×2<sup>n</sup>/(e(5×2<sup>n</sup>-1))</span>؛ <span class="math">lim u<sub>n</sub>=1/e</span>؛ <span class="math">S<sub>n</sub>=5(2<sup>n+1</sup>-1)</span>.</p><p><strong>4)</strong> بواقي <span class="math">2<sup>n</sup></span> على <span class="math">7</span>: <span class="math">1,2,4</span> حسب <span class="math">n≡0,1,2 [3]</span>؛ و<span class="math">7 | S<sub>n</sub></span> عندما <span class="math">n≡2 [3]</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p><strong>1-أ) ما المطلوب؟</strong> نثبت أن كل حدود المتتالية أكبر من <span class="math">1/e</span>.</p><p><strong>الفكرة المستعملة:</strong> نستعمل البرهان بالتراجع، ونقارن <span class="math">f(x)</span> مع <span class="math">1/e</span>.</p><p><strong>التطبيق:</strong> عند <span class="math">n=0</span>: <span class="math">u<sub>0</sub>=5/(4e)&gt;1/e</span>. نفرض أن <span class="math">u<sub>n</sub>&gt;1/e</span>. بما أن <span class="math">eu<sub>n</sub>+1&gt;0</span>، فإن:</p><p class="math-equation">u<sub>n+1</sub> &gt; 1/e ⇔ 2u<sub>n</sub>/(eu<sub>n</sub>+1) &gt; 1/e</p><p class="math-equation">⇔ 2eu<sub>n</sub> &gt; eu<sub>n</sub>+1 ⇔ eu<sub>n</sub> &gt; 1</p><p>وهذه صحيحة حسب فرضية التراجع.</p><p><strong>النتيجة:</strong> <span class="math">u<sub>n</sub>&gt;1/e</span> لكل <span class="math">n</span>.</p>
<p><strong>1-ب) ما المطلوب؟</strong> نتحقق من صيغة الفرق ونستنتج الرتابة والتقارب.</p><p><strong>الفكرة المستعملة:</strong> نحسب الفرق في مقام واحد، ثم نستعمل الحصر السابق لتحديد الإشارة.</p><p><strong>التطبيق:</strong></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub> = 2u<sub>n</sub>/(eu<sub>n</sub>+1) - u<sub>n</sub></p><p class="math-equation">= [2u<sub>n</sub>-eu<sub>n</sub><sup>2</sup>-u<sub>n</sub>]/(eu<sub>n</sub>+1)=u<sub>n</sub>(1-eu<sub>n</sub>)/(eu<sub>n</sub>+1)</p><p>أي:</p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=eu<sub>n</sub>(1/e-u<sub>n</sub>)/(eu<sub>n</sub>+1)</p><p>وبما أن <span class="math">u<sub>n</sub>&gt;1/e</span> فإن <span class="math">1/e-u<sub>n</sub>&lt;0</span>، بينما باقي العوامل موجبة.</p><p><strong>النتيجة:</strong> المتتالية متناقصة. وبما أنها محدودة من الأسفل بـ <span class="math">1/e</span> فهي متقاربة.</p>
<p><strong>2) ما المطلوب؟</strong> نثبت أن <span class="math">(v_n)</span> هندسية ونكتب حدها العام.</p><p><strong>الفكرة المستعملة:</strong> نضع <span class="math">y_n=eu_n</span> لتبسيط الحساب، فنحصل على <span class="math">y_{n+1}=2y_n/(y_n+1)</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">eu<sub>n+1</sub> = 2eu<sub>n</sub>/(eu<sub>n</sub>+1)</p><p>إذن:</p><p class="math-equation">v<sub>n+1</sub> = \frac{eu<sub>n+1</sub>}{eu<sub>n+1</sub>-1} = \frac{2eu<sub>n</sub>/(eu<sub>n</sub>+1)}{2eu<sub>n</sub>/(eu<sub>n</sub>+1)-1}</p><p class="math-equation">v<sub>n+1</sub> = 2eu<sub>n</sub>/(eu<sub>n</sub>-1)=2v<sub>n</sub></p><p>كما أن:</p><p class="math-equation">v<sub>0</sub> = (5/4)/(5/4-1)=5</p><p><strong>النتيجة:</strong> <span class="math">(v_n)</span> هندسية أساسها <span class="math">2</span> و<span class="math">v_n=5×2^n</span>.</p>
<p><strong>3-أ) ما المطلوب؟</strong> نستخرج عبارة <span class="math">u_n</span> ونحسب النهاية.</p><p><strong>الفكرة المستعملة:</strong> نعيد كتابة <span class="math">v_n</span> حتى تظهر <span class="math">eu_n-1</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">v<sub>n</sub> = eu<sub>n</sub>/(eu<sub>n</sub>-1)=1+1/(eu<sub>n</sub>-1)</p><p>ومنه <span class="math">eu<sub>n</sub>-1=1/(v<sub>n</sub>-1)</span>، وبالتالي:</p><p class="math-equation">u<sub>n</sub> = v<sub>n</sub>/(e(v<sub>n</sub>-1)) = 5×2<sup>n</sup>/(e(5×2<sup>n</sup>-1))</p><p>وبقسمة البسط والمقام على <span class="math">2^n</span> نحصل على:</p><p class="math-equation">lim u<sub>n</sub>=1/e</p>
<p><strong>3-ب) ما المطلوب؟</strong> نحسب مجموع حدود المتتالية الهندسية <span class="math">(v_n)</span>.</p><p><strong>الفكرة المستعملة:</strong> <span class="math">S_n</span> مجموع هندسي من <span class="math">0</span> إلى <span class="math">n</span>، وعدد حدوده <span class="math">n+1</span>.</p><p><strong>التطبيق والنتيجة:</strong></p><p class="math-equation">S<sub>n</sub>=5(1+2+...+2^n)=5(2<sup>n+1</sup>-1)</p>
<p><strong>4-أ) ما المطلوب؟</strong> ندرس بواقي <span class="math">2^n</span> على <span class="math">7</span>.</p><p><strong>الفكرة المستعملة:</strong> نحسب القوى الأولى ونستخرج الدورة.</p><p><strong>التطبيق والنتيجة:</strong></p><p class="math-equation">2^0≡1 [7] ، 2^1≡2 [7] ، 2^2≡4 [7] ، 2^3≡1 [7]</p><p>إذن البواقي تتكرر بدورة طولها <span class="math">3</span>: إذا كان <span class="math">n≡0 [3]</span> فالباقي <span class="math">1</span>، وإذا كان <span class="math">n≡1 [3]</span> فالباقي <span class="math">2</span>، وإذا كان <span class="math">n≡2 [3]</span> فالباقي <span class="math">4</span>.</p>
<p><strong>4-ب) ما المطلوب؟</strong> نحدد قيم <span class="math">n</span> التي تجعل <span class="math">S_n</span> مضاعفا لـ <span class="math">7</span>.</p><p><strong>الفكرة المستعملة:</strong> نستعمل <span class="math">S_n=5(2^{n+1}-1)</span>، وبما أن <span class="math">5</span> غير قابل للقسمة على <span class="math">7</span>، نبحث عن <span class="math">2^{n+1}≡1 [7]</span>.</p><p><strong>التطبيق والنتيجة:</strong> من الدورة السابقة <span class="math">2^m≡1 [7]</span> عندما <span class="math">m≡0 [3]</span>. إذن:</p><p class="math-equation">7 | S<sub>n</sub> ⇔ n+1≡0 [3] ⇔ n≡2 [3]</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> أثبتنا الحصر ثم استعملناه للرتابة والتقارب. بعد ذلك حولنا العلاقة باستعمال <span class="math">v_n</span> إلى متتالية هندسية، فحسبنا <span class="math">u_n</span> والمجموع، ثم استعملنا دورية قوى <span class="math">2</span> بتطابق <span class="math">7</span> لتحديد قابلية <span class="math">S_n</span> للقسمة على <span class="math">7</span>.</p>
</div>`,
    conceptHints: [
      { title: "الحصر بالتراجع", hint: "لقارن <span class='math'>f(u<sub>n</sub>)</span> مع 1/e، اضرب في e(e<span class='math'>u<sub>n</sub>+1)</span> وهو موجب، وستعود إلى الشرط e<span class='math'>u<sub>n</sub></span>>1." },
      { title: "رتابة المتتالية", hint: "احسب <span class='math'>u<sub>n+1</sub>-u<sub>n</sub></span> في مقام واحد. بعد ذلك استعمل <span class='math'>u<sub>n</sub></span>>1/e لتحديد إشارة 1/e<span class='math'>-u<sub>n</sub></span>." },
      { title: "المتتالية المساعدة", hint: "ضع y_n=e<span class='math'>u<sub>n</sub></span> مؤقتا، فتتحول العلاقة إلى <span class='math'>y_{n+1}=2y_n/(y_n+1)</span>. احسب بعدها <span class='math'>y_{n+1}/(y_{n+1}-1)</span>." },
      { title: "حساب المجموع", hint: "بعد إثبات أن <span class='math'>v<sub>n</sub>=5×2<sup>n</sup></span>، يصبح <span class='math'>S<sub>n</sub></span> مجموعا هندسيا من 0 إلى n أساسه 2." },
      { title: "القسمة على 7", hint: "احسب بواقي <span class='math'>2<sup>0</sup></span> و<span class='math'>2<sup>1</sup></span> و<span class='math'>2<sup>2</sup></span> و<span class='math'>2<sup>3</sup></span> على 7. عندما يعود الباقي إلى 1 تبدأ الدورة." }
    ],
    solution: `<p><strong>1)</strong> عند <span class="math">n=0</span>: <span class="math">u<sub>0</sub>=5/(4e)&gt;1/e</span>. إذا كان <span class="math">u<sub>n</sub>&gt;1/e</span>، فإن <span class="math">u<sub>n+1</sub>&gt;1/e</span> يكافئ <span class="math">eu<sub>n</sub>&gt;1</span>، وهي صحيحة.</p><p>كما أن:</p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=eu<sub>n</sub>(1/e-u<sub>n</sub>)/(eu<sub>n</sub>+1)&lt;0</p><p>إذن <span class="math">(u<sub>n</sub>)</span> متناقصة ومحدودة من الأسفل بـ <span class="math">1/e</span>، فهي متقاربة.</p><p><strong>2)</strong> لدينا:</p><p class="math-equation">eu<sub>n+1</sub>=2eu<sub>n</sub>/(eu<sub>n</sub>+1)</p><p>ومنه:</p><p class="math-equation">v<sub>n+1</sub>=2v<sub>n</sub></p><p>كما أن <span class="math">v<sub>0</sub>=5</span>، إذن <span class="math">v<sub>n</sub>=5×2<sup>n</sup></span>.</p><p><strong>3)</strong> بما أن <span class="math">v<sub>n</sub>=1+1/(eu<sub>n</sub>-1)</span>، فإن:</p><p class="math-equation">u<sub>n</sub>=v<sub>n</sub>/(e(v<sub>n</sub>-1))=5×2<sup>n</sup>/(e(5×2<sup>n</sup>-1))</p><p>وبالتالي <span class="math">lim u<sub>n</sub>=1/e</span>. كما أن:</p><p class="math-equation">S<sub>n</sub>=5(2<sup>n+1</sup>-1)</p><p><strong>4)</strong> بواقي <span class="math">2^n</span> على <span class="math">7</span> هي <span class="math">1,2,4</span> حسب <span class="math">n≡0,1,2 [3]</span>. ومن <span class="math">S<sub>n</sub>=5(2<sup>n+1</sup>-1)</span> نجد أن <span class="math">7|S<sub>n</sub></span> إذا وفقط إذا <span class="math">n+1≡0 [3]</span>، أي <span class="math">n≡2 [3]</span>.</p>`
  },  {
    id: "bac-2018-technical-math-subject-2",
    branch: "science",
    stream: "technical_math",
    year: "2018",
    title: "بكالوريا 2018 - تقني رياضي - الموضوع الثاني",
    statementHtml: `<div class="bac-statement">
      <p><strong>التمرين: المتتاليات العددية والحساب بتطابق</strong></p>
      <p>لتكن <span class="math">(u<sub>n</sub>)</span> متتالية عددية معرفة على <span class="math">ℕ</span> بحدها العام:</p>
      <p class="math-equation">u<sub>n</sub> = 2×3<sup>n</sup></p>
      <p>و<span class="math">(v<sub>n</sub>)</span> متتالية عددية معرفة بحدها الأول <span class="math">v<sub>0</sub> = 4</span>، ومن أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math-equation">v<sub>n+1</sub> = 5v<sub>n</sub> + u<sub>n</sub></p>
      <ol>
        <li><p>نضع من أجل كل عدد طبيعي <span class="math">n</span>:</p><p class="math-equation">w<sub>n</sub> = v<sub>n</sub>/u<sub>n</sub> + 1/2</p><p>أثبت أن <span class="math">(w<sub>n</sub>)</span> متتالية هندسية أساسها <span class="math">5/3</span>، ويطلب تعيين حدها الأول.</p></li>
        <li>اكتب الحد العام <span class="math">w<sub>n</sub></span> بدلالة <span class="math">n</span>، ثم استنتج أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">v<sub>n</sub> = 5<sup>n+1</sup> - 3<sup>n</sup></span>.</li>
        <li>ادرس حسب قيم العدد الطبيعي <span class="math">n</span> بواقي القسمة الإقليدية للعددين <span class="math">3<sup>n</sup></span> و <span class="math">5<sup>n</sup></span> على <span class="math">8</span>.</li>
        <li>عين حسب قيم العدد الطبيعي <span class="math">n</span> بواقي القسمة الإقليدية للعدد <span class="math">v<sub>n</sub></span> على <span class="math">8</span>.</li>
      </ol>
    </div>`,
    quickSolution: `<p><strong>1)</strong> <span class="math">w<sub>0</sub> = 5/2</span>، و<span class="math">(w<sub>n</sub>)</span> هندسية أساسها <span class="math">5/3</span>.</p><p><strong>2)</strong> <span class="math">w<sub>n</sub> = (5/2)(5/3)<sup>n</sup></span>؛ <span class="math">v<sub>n</sub> = 5<sup>n+1</sup> - 3<sup>n</sup></span>.</p><p><strong>3)</strong> <span class="math">3<sup>n</sup>≡1 [8]</span> إذا كان <span class="math">n</span> زوجيا و<span class="math">≡3 [8]</span> إذا كان فرديا؛ <span class="math">5<sup>n</sup>≡1 [8]</span> إذا كان <span class="math">n</span> زوجيا و<span class="math">≡5 [8]</span> إذا كان فرديا.</p><p><strong>4)</strong> باقي <span class="math">v<sub>n</sub></span> على <span class="math">8</span> هو <span class="math">4</span> إذا كان <span class="math">n</span> زوجيا، و<span class="math">6</span> إذا كان <span class="math">n</span> فرديا.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p><strong>1) ما المطلوب؟</strong> نثبت أن <span class="math">(w_n)</span> هندسية ونحسب حدها الأول.</p><p><strong>الفكرة المستعملة:</strong> نحسب <span class="math">w_{n+1}</span> باستعمال العلاقة <span class="math">v_{n+1}=5v_n+u_n</span>، مع الانتباه إلى أن <span class="math">u_{n+1}=3u_n</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">w<sub>n+1</sub> = v<sub>n+1</sub>/u<sub>n+1</sub> + 1/2 = (5v<sub>n</sub>+u<sub>n</sub>)/(3u<sub>n</sub>) + 1/2</p><p class="math-equation">w<sub>n+1</sub> = (5/3)(v<sub>n</sub>/u<sub>n</sub>) + 1/3 + 1/2</p><p>وبما أن <span class="math">v<sub>n</sub>/u<sub>n</sub> = w<sub>n</sub> - 1/2</span>، فإن:</p><p class="math-equation">w<sub>n+1</sub> = (5/3)(w<sub>n</sub>-1/2)+5/6 = (5/3)w<sub>n</sub></p><p>كما أن:</p><p class="math-equation">w<sub>0</sub> = v<sub>0</sub>/u<sub>0</sub> + 1/2 = 4/2 + 1/2 = 5/2</p><p><strong>النتيجة:</strong> <span class="math">(w_n)</span> هندسية أساسها <span class="math">5/3</span> وحدها الأول <span class="math">5/2</span>.</p>
<p><strong>2) ما المطلوب؟</strong> نكتب <span class="math">w_n</span> ثم نستنتج <span class="math">v_n</span>.</p><p><strong>الفكرة المستعملة:</strong> نستعمل صيغة الحد العام لمتتالية هندسية، ثم نرجع إلى العلاقة <span class="math">w_n=v_n/u_n+1/2</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">w<sub>n</sub> = (5/2)(5/3)<sup>n</sup></p><p>ومن <span class="math">w_n=v_n/u_n+1/2</span> نحصل على:</p><p class="math-equation">v<sub>n</sub> = u<sub>n</sub>(w<sub>n</sub>-1/2)</p><p>وبما أن <span class="math">u_n=2×3^n</span>:</p><p class="math-equation">v<sub>n</sub> = 2×3<sup>n</sup>[(5/2)(5/3)<sup>n</sup>-1/2]</p><p class="math-equation">v<sub>n</sub> = 5×5<sup>n</sup> - 3<sup>n</sup> = 5<sup>n+1</sup> - 3<sup>n</sup></p><p><strong>النتيجة:</strong> <span class="math">v_n=5^{n+1}-3^n</span>.</p>
<p><strong>3) ما المطلوب؟</strong> ندرس بواقي <span class="math">3^n</span> و<span class="math">5^n</span> على <span class="math">8</span>.</p><p><strong>الفكرة المستعملة:</strong> نحسب القوى الأولى ونلاحظ دورية حسب زوجية <span class="math">n</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">3^0≡1 [8] ، 3^1≡3 [8] ، 3^2≡1 [8]</p><p class="math-equation">5^0≡1 [8] ، 5^1≡5 [8] ، 5^2≡1 [8]</p><p><strong>النتيجة:</strong> إذا كان <span class="math">n</span> زوجيا فـ <span class="math">3^n≡1 [8]</span> و<span class="math">5^n≡1 [8]</span>. وإذا كان <span class="math">n</span> فرديا فـ <span class="math">3^n≡3 [8]</span> و<span class="math">5^n≡5 [8]</span>.</p>
<p><strong>4) ما المطلوب؟</strong> نعين باقي <span class="math">v_n</span> على <span class="math">8</span>.</p><p><strong>الفكرة المستعملة:</strong> نستعمل <span class="math">v_n=5^{n+1}-3^n</span> ونتعامل حسب زوجية <span class="math">n</span>.</p><p><strong>التطبيق:</strong> إذا كان <span class="math">n</span> زوجيا، فإن <span class="math">n+1</span> فردي، ومنه:</p><p class="math-equation">v_n≡5-1≡4 [8]</p><p>وإذا كان <span class="math">n</span> فرديا، فإن <span class="math">n+1</span> زوجي، ومنه:</p><p class="math-equation">v_n≡1-3≡-2≡6 [8]</p><p><strong>النتيجة:</strong> باقي <span class="math">v_n</span> هو <span class="math">4</span> إذا كان <span class="math">n</span> زوجيا، و<span class="math">6</span> إذا كان <span class="math">n</span> فرديا.</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> استعملنا المتتالية المساعدة <span class="math">w_n</span> لتحويل العلاقة غير المتجانسة لـ <span class="math">v_n</span> إلى علاقة هندسية، ثم استخرجنا <span class="math">v_n</span>. في النهاية درسنا بواقي قوى <span class="math">3</span> و<span class="math">5</span> على <span class="math">8</span> حسب الزوجية، ومنها باقي <span class="math">v_n</span>.</p>
</div>`,
    conceptHints: [
      { title: "المتتالية المساعدة", hint: "ابدأ من <span class='math'>w<sub>n+1</sub>=v<sub>n+1</sub>/u<sub>n+1</sub>+1/2</span>. استعمل <span class='math'>v<sub>n+1</sub>=5v<sub>n</sub>+u<sub>n</sub></span> و<span class='math'>u<sub>n+1</sub>=3u<sub>n</sub></span>، ثم عوض <span class='math'>v<sub>n</sub>/u<sub>n</sub>=w<sub>n</sub>-1/2</span>." },
      { title: "الرجوع إلى <span class='math'>v<sub>n</sub></span>", hint: "بعد إيجاد <span class='math'>w<sub>n</sub></span>، استعمل <span class='math'>v<sub>n</sub>=u<sub>n</sub>(w<sub>n</sub>-1/2)</span> مع <span class='math'>u<sub>n</sub>=2×3<sup>n</sup></span>. انتبه إلى اختصار قوى 3." },
      { title: "القوى modulo 8", hint: "احسب <span class='math'>3<sup>0</sup></span> و<span class='math'>3<sup>1</sup></span> و<span class='math'>3<sup>2</sup></span> modulo 8، ثم افعل الشيء نفسه مع 5. ستجد أن البواقي تتعلق فقط بزوجية n." },
      { title: "باقي <span class='math'>v<sub>n</sub></span>", hint: "استعمل <span class='math'>v<sub>n</sub>=5^{n+1}-3<sup>n</sup></span>. افصل بين حالتي n زوجي وn فردي لأن <span class='math'>n+1</span> يغير الزوجية." }
    ],
    solution: `<p><strong>1)</strong> بما أن <span class="math">u_{n+1}=3u_n</span>، فإن:</p><p class="math-equation">w<sub>n+1</sub>=(5v<sub>n</sub>+u<sub>n</sub>)/(3u<sub>n</sub>)+1/2=(5/3)(w<sub>n</sub>-1/2)+5/6=(5/3)w<sub>n</sub></p><p>كما أن <span class="math">w<sub>0</sub>=4/2+1/2=5/2</span>. إذن <span class="math">(w_n)</span> هندسية أساسها <span class="math">5/3</span>.</p><p><strong>2)</strong></p><p class="math-equation">w<sub>n</sub>=(5/2)(5/3)^n</p><p>ومنه:</p><p class="math-equation">v<sub>n</sub>=u<sub>n</sub>(w<sub>n</sub>-1/2)=5<sup>n+1</sup>-3<sup>n</sup></p><p><strong>3)</strong> على <span class="math">8</span>: إذا كان <span class="math">n</span> زوجيا فـ <span class="math">3^n≡1</span> و<span class="math">5^n≡1</span>، وإذا كان فرديا فـ <span class="math">3^n≡3</span> و<span class="math">5^n≡5</span>.</p><p><strong>4)</strong> من <span class="math">v_n=5^{n+1}-3^n</span>: إذا كان <span class="math">n</span> زوجيا فالباقي <span class="math">4</span>، وإذا كان فرديا فالباقي <span class="math">6</span>.</p>`
  },  {
    id: "bac-2019-technical-math-subject-1",
    branch: "science",
    stream: "technical_math",
    year: "2019",
    title: "بكالوريا 2019 - تقني رياضي - الموضوع الأول",
    statementHtml: `<div class="bac-statement">
      <p><strong>التمرين: المتتاليات العددية والحساب بالتطابق</strong></p>
      <p>المتتاليتان العدديتان <span class="math">(u<sub>n</sub>)</span> و <span class="math">(v<sub>n</sub>)</span> معرفتان على <span class="math">ℕ</span> كما يلي:</p>
      <p class="math-equation">u<sub>0</sub> = 0 ، u<sub>n+1</sub> = 7u<sub>n</sub> - 18n + 9</p>
      <p class="math-equation">v<sub>n</sub> = u<sub>n</sub> - 3n + 1</p>
      <ol>
        <li>أثبت أن المتتالية <span class="math">(v<sub>n</sub>)</span> هندسية، ويطلب تعيين أساسها وحدها الأول.</li>
        <li>اكتب <span class="math">v<sub>n</sub></span> بدلالة <span class="math">n</span>، ثم استنتج <span class="math">u<sub>n</sub></span> بدلالة <span class="math">n</span>.</li>
        <li>احسب بدلالة <span class="math">n</span> المجموع <span class="math">S<sub>n</sub></span> حيث <span class="math">S<sub>n</sub> = u<sub>0</sub> + u<sub>1</sub> + ... + u<sub>n</sub></span>.</li>
        <li><ol><li>ادرس حسب قيم العدد الطبيعي <span class="math">n</span> بواقي القسمة الإقليدية لـ <span class="math">7<sup>n</sup></span> على <span class="math">9</span>.</li><li>ما هو باقي القسمة الإقليدية على <span class="math">9</span> للعدد <span class="math">1442<sup>2019</sup> + 1962<sup>1954</sup> + 1954<sup>1962</sup></span>؟</li><li>أثبت أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">6S<sub>n</sub> - 7u<sub>n</sub> ≡ 0 [9]</span>.</li></ol></li>
      </ol>
    </div>`,
    quickSolution: `<p><strong>1)</strong> <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">7</span>، وحدها الأول <span class="math">v<sub>0</sub> = 1</span>.</p><p><strong>2)</strong> <span class="math">v<sub>n</sub> = 7<sup>n</sup></span>؛ <span class="math">u<sub>n</sub> = 7<sup>n</sup> + 3n - 1</span>.</p><p><strong>3)</strong> <span class="math">S<sub>n</sub> = (7<sup>n+1</sup> - 1)/6 + (n+1)(3n - 2)/2</span>.</p><p><strong>4)</strong> بواقي <span class="math">7<sup>n</sup></span> حسب <span class="math">n mod 3</span>: <span class="math">1,7,4</span>؛ باقي العدد المعطى هو <span class="math">0</span>؛ <span class="math">6S<sub>n</sub> - 7u<sub>n</sub> = 9n(n-2) ≡ 0 [9]</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p><strong>1) ما المطلوب؟</strong> نثبت أن <span class="math">(v_n)</span> هندسية ونحدد أساسها وحدها الأول.</p><p><strong>الفكرة المستعملة:</strong> نحسب <span class="math">v_{n+1}</span> ونعوض <span class="math">u_{n+1}</span>، ثم نحاول إظهار <span class="math">v_{n+1}=qv_n</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">v<sub>n+1</sub> = u<sub>n+1</sub> - 3(n+1) + 1</p><p class="math-equation">v<sub>n+1</sub> = 7u<sub>n</sub> - 18n + 9 - 3n - 3 + 1 = 7u<sub>n</sub> - 21n + 7</p><p class="math-equation">v<sub>n+1</sub> = 7(u<sub>n</sub> - 3n + 1) = 7v<sub>n</sub></p><p>كما أن <span class="math">v<sub>0</sub> = u<sub>0</sub> - 0 + 1 = 1</span>.</p><p><strong>النتيجة:</strong> <span class="math">(v_n)</span> هندسية أساسها <span class="math">7</span> وحدها الأول <span class="math">1</span>.</p>
<p><strong>2) ما المطلوب؟</strong> نكتب <span class="math">v_n</span> ثم نستخرج <span class="math">u_n</span>.</p><p><strong>الفكرة المستعملة:</strong> نستعمل صيغة الحد العام لمتتالية هندسية، ثم تعريف <span class="math">v_n</span>.</p><p><strong>التطبيق والنتيجة:</strong></p><p class="math-equation">v<sub>n</sub> = 7<sup>n</sup></p><p>ومن <span class="math">v<sub>n</sub> = u<sub>n</sub> - 3n + 1</span> نحصل على:</p><p class="math-equation">u<sub>n</sub> = 7<sup>n</sup> + 3n - 1</p>
<p><strong>3) ما المطلوب؟</strong> نحسب مجموع حدود <span class="math">u_k</span> من <span class="math">0</span> إلى <span class="math">n</span>.</p><p><strong>الفكرة المستعملة:</strong> نعوض العبارة الصريحة، فيظهر مجموع هندسي ومجموع حسابي.</p><p><strong>التطبيق:</strong></p><p class="math-equation">S<sub>n</sub> = Σ<sub>k=0</sub><sup>n</sup>(7<sup>k</sup> + 3k - 1)</p><p class="math-equation">S<sub>n</sub> = (7<sup>n+1</sup>-1)/(7-1) + 3n(n+1)/2 - (n+1)</p><p><strong>النتيجة:</strong></p><p class="math-equation">S<sub>n</sub> = (7<sup>n+1</sup> - 1)/6 + (n+1)(3n - 2)/2</p>
<p><strong>4-أ) ما المطلوب؟</strong> ندرس بواقي <span class="math">7^n</span> بتطابق <span class="math">9</span>.</p><p><strong>الفكرة المستعملة:</strong> نحسب القوى الأولى ونلاحظ الدورية.</p><p><strong>التطبيق والنتيجة:</strong></p><p class="math-equation">7<sup>0</sup>≡1 [9] ، 7<sup>1</sup>≡7 [9] ، 7<sup>2</sup>≡49≡4 [9] ، 7<sup>3</sup>≡28≡1 [9]</p><p>إذن البواقي دورية بطول <span class="math">3</span>: إذا كان <span class="math">n≡0 [3]</span> فالباقي <span class="math">1</span>، وإذا كان <span class="math">n≡1 [3]</span> فالباقي <span class="math">7</span>، وإذا كان <span class="math">n≡2 [3]</span> فالباقي <span class="math">4</span>.</p>
<p><strong>4-ب) ما المطلوب؟</strong> نحسب باقي عدد كبير على <span class="math">9</span>.</p><p><strong>الفكرة المستعملة:</strong> نختزل كل أساس بتطابق <span class="math">9</span> ثم نستعمل دورية القوى.</p><p><strong>التطبيق:</strong></p><p class="math-equation">1442≡2 [9] ، 1962≡0 [9] ، 1954≡1 [9]</p><p>ولدينا <span class="math">2019≡3 [6]</span>، ومنه <span class="math">2<sup>2019</sup>≡2<sup>3</sup>≡8 [9]</span>. كما أن <span class="math">0<sup>1954</sup>≡0</span> و<span class="math">1<sup>1962</sup>≡1</span>.</p><p><strong>النتيجة:</strong></p><p class="math-equation">1442<sup>2019</sup> + 1962<sup>1954</sup> + 1954<sup>1962</sup> ≡ 8+0+1 ≡ 0 [9]</p>
<p><strong>4-ج) ما المطلوب؟</strong> نثبت أن <span class="math">6S_n-7u_n</span> مضاعف لـ <span class="math">9</span>.</p><p><strong>الفكرة المستعملة:</strong> نستعمل العبارتين الصريحتين لـ <span class="math">S_n</span> و<span class="math">u_n</span> ثم نبسط.</p><p><strong>التطبيق:</strong></p><p class="math-equation">6S<sub>n</sub> = 7<sup>n+1</sup> - 1 + 3(n+1)(3n-2)</p><p class="math-equation">7u<sub>n</sub> = 7<sup>n+1</sup> + 21n - 7</p><p>إذن:</p><p class="math-equation">6S<sub>n</sub> - 7u<sub>n</sub> = 9n<sup>2</sup> - 18n = 9n(n-2)</p><p><strong>النتيجة:</strong> <span class="math">6S<sub>n</sub> - 7u<sub>n</sub> ≡ 0 [9]</span>.</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> حولنا العلاقة التراجعية إلى متتالية هندسية باستعمال <span class="math">v_n</span>، ثم استخرجنا <span class="math">u_n</span> وحسبنا المجموع. في الجزء العددي استعملنا دورية القوى بتطابق <span class="math">9</span>، ثم أثبتنا تطابقًا عامًا بتبسيط العبارات الصريحة.</p>
</div>`,
    conceptHints: [
      { title: "المتتالية المساعدة", hint: "احسب <span class='math'>v<sub>n+1</sub>=u<sub>n+1</sub>-3(n+1)+1</span>، ثم عوض <span class='math'>u<sub>n+1</sub></span>. حاول جمع الحدود للحصول على <span class='math'>7(u<sub>n</sub>-3n+1)</span>." },
      { title: "حساب المجموع", hint: "بعد إيجاد <span class='math'>u<sub>n</sub></span>، اجمع <span class='math'>7<sup>k</sup></span> و3k و-1 كل جزء وحده. انتبه إلى أن عدد الحدود من 0 إلى n هو <span class='math'>n+1</span>." },
      { title: "القوى بتطابق 9", hint: "احسب بواقي <span class='math'>7<sup>0</sup></span> و<span class='math'>7<sup>1</sup></span> و<span class='math'>7<sup>2</sup></span> و<span class='math'>7<sup>3</sup></span> على 9. عندما يعود الباقي إلى 1 تبدأ الدورة من جديد." },
      { title: "باقي عدد كبير", hint: "اختزل كل أساس modulo 9 أولا، ثم استعمل دورية القوى للأساس المختزل بدل حساب القوة كاملة." },
      { title: "إثبات تطابق عام", hint: "استعمل الصيغ الصريحة لـ <span class='math'>S<sub>n</sub></span> و<span class='math'>u<sub>n</sub></span>، ثم بسط <span class='math'>6S<sub>n</sub>-7u<sub>n</sub></span> حتى يظهر عامل 9." }
    ],
    solution: `<p><strong>1)</strong></p><p class="math-equation">v<sub>n+1</sub>=u<sub>n+1</sub>-3(n+1)+1=7u<sub>n</sub>-21n+7=7v<sub>n</sub></p><p>كما أن <span class="math">v<sub>0</sub>=1</span>. إذن <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">7</span>.</p><p><strong>2)</strong></p><p class="math-equation">v<sub>n</sub>=7<sup>n</sup> ، u<sub>n</sub>=7<sup>n</sup>+3n-1</p><p><strong>3)</strong></p><p class="math-equation">S<sub>n</sub>=Σ(7<sup>k</sup>+3k-1)=(7<sup>n+1</sup>-1)/6+(n+1)(3n-2)/2</p><p><strong>4)</strong> بواقي <span class="math">7^n</span> على <span class="math">9</span> دورية: <span class="math">1,7,4</span> حسب <span class="math">n≡0,1,2 [3]</span>.</p><p>كما أن <span class="math">1442≡2</span> و<span class="math">1962≡0</span> و<span class="math">1954≡1 [9]</span>، ومنه الباقي هو <span class="math">8+0+1≡0 [9]</span>.</p><p>وأخيرا:</p><p class="math-equation">6S<sub>n</sub>-7u<sub>n</sub>=9n(n-2)≡0 [9]</p>`
  },  {
    id: "bac-2020-technical-math-subject-2",
    branch: "science",
    stream: "technical_math",
    year: "2020",
    title: "بكالوريا 2020 - تقني رياضي - الموضوع الثاني",
    statementHtml: `<div class="bac-statement">
      <p><strong>التمرين: المتتاليات العددية</strong></p>
      <p>المتتالية العددية <span class="math">(u<sub>n</sub>)</span> معرفة بحدها الأول <span class="math">u<sub>0</sub> = 1/2</span>، ومن أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math-equation">u<sub>n+1</sub> = 3 - 4/(u<sub>n</sub> + 2)</p>
      <ol>
        <li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">-1 &lt; u<sub>n</sub> &lt; 2</span>.</li>
        <li><ol><li>بين أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n+1</sub> - u<sub>n</sub> = ((2-u<sub>n</sub>)(1+u<sub>n</sub>))/(u<sub>n</sub>+2)</span>.</li><li>حدد اتجاه تغير المتتالية <span class="math">(u<sub>n</sub>)</span>، ثم استنتج أنها متقاربة.</li></ol></li>
        <li><p>نعتبر المتتالية العددية <span class="math">(v<sub>n</sub>)</span> المعرفة على <span class="math">ℕ</span> كما يلي:</p><p class="math-equation">v<sub>n</sub> = (u<sub>n</sub> + a)/(u<sub>n</sub> + 1)</p><ol><li>أوجد قيمة العدد الحقيقي <span class="math">a</span> حتى تكون المتتالية <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">1/4</span>، ثم احسب حدها الأول <span class="math">v<sub>0</sub></span>.</li><li>بين عندئذ أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n</sub> = (2×4<sup>n</sup> - 1)/(4<sup>n</sup> + 1)</span>، ثم احسب <span class="math">lim u<sub>n</sub></span>.</li></ol></li>
      </ol>
    </div>`,
    quickSolution: `<p><strong>1)</strong> <span class="math">-1 &lt; u<sub>n</sub> &lt; 2</span> لكل <span class="math">n</span>.</p><p><strong>2)</strong> <span class="math">u<sub>n+1</sub>-u<sub>n</sub>=((2-u<sub>n</sub>)(1+u<sub>n</sub>))/(u<sub>n</sub>+2)</span>؛ <span class="math">(u<sub>n</sub>)</span> متزايدة تماما ومتقاربة.</p><p><strong>3)</strong> <span class="math">a=-2</span>؛ <span class="math">v<sub>0</sub> = -1</span>؛ <span class="math">v<sub>n</sub> = -(1/4)<sup>n</sup></span>؛ <span class="math">u<sub>n</sub> = (2×4<sup>n</sup>-1)/(4<sup>n</sup>+1)</span>؛ <span class="math">lim u<sub>n</sub> = 2</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p><strong>1) ما المطلوب؟</strong> نثبت أن كل حدود المتتالية تبقى بين <span class="math">-1</span> و<span class="math">2</span>.</p><p><strong>الفكرة المستعملة:</strong> نستعمل البرهان بالتراجع، ونحول العلاقة إلى كسر مناسب.</p><p><strong>التطبيق:</strong> عند <span class="math">n=0</span> لدينا <span class="math">u<sub>0</sub>=1/2</span>، ومنه <span class="math">-1&lt;u<sub>0</sub>&lt;2</span>. نفرض أن <span class="math">-1&lt;u<sub>n</sub>&lt;2</span>. عندئذ <span class="math">u<sub>n</sub>+2&gt;0</span> و:</p><p class="math-equation">u<sub>n+1</sub> = 3 - 4/(u<sub>n</sub>+2) = (3u<sub>n</sub>+2)/(u<sub>n</sub>+2)</p><p>لإثبات الحد السفلي:</p><p class="math-equation">u<sub>n+1</sub> &gt; -1 ⇔ 3u<sub>n</sub>+2 &gt; -(u<sub>n</sub>+2) ⇔ 4u<sub>n</sub> &gt; -4 ⇔ u<sub>n</sub>&gt;-1</p><p>ولإثبات الحد العلوي:</p><p class="math-equation">u<sub>n+1</sub> &lt; 2 ⇔ 3u<sub>n</sub>+2 &lt; 2(u<sub>n</sub>+2) ⇔ u<sub>n</sub>&lt;2</p><p><strong>النتيجة:</strong> <span class="math">-1&lt;u<sub>n</sub>&lt;2</span> لكل <span class="math">n∈ℕ</span>.</p>
<p><strong>2-أ) ما المطلوب؟</strong> نتحقق من صيغة الفرق.</p><p><strong>الفكرة المستعملة:</strong> نكتب الفرق في مقام واحد ثم نحلل البسط.</p><p><strong>التطبيق:</strong></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub> = (3u<sub>n</sub>+2)/(u<sub>n</sub>+2) - u<sub>n</sub></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub> = (-u<sub>n</sub><sup>2</sup>+u<sub>n</sub>+2)/(u<sub>n</sub>+2) = ((2-u<sub>n</sub>)(1+u<sub>n</sub>))/(u<sub>n</sub>+2)</p><p><strong>النتيجة:</strong> الصيغة المطلوبة صحيحة.</p>
<p><strong>2-ب) ما المطلوب؟</strong> نحدد الرتابة ونستنتج التقارب.</p><p><strong>الفكرة المستعملة:</strong> نستعمل الحصر السابق لتحديد إشارة الفرق.</p><p><strong>التطبيق:</strong> من <span class="math">-1&lt;u<sub>n</sub>&lt;2</span> نجد <span class="math">2-u<sub>n</sub>&gt;0</span> و<span class="math">1+u<sub>n</sub>&gt;0</span> و<span class="math">u<sub>n</sub>+2&gt;0</span>، إذن <span class="math">u<sub>n+1</sub>-u<sub>n</sub>&gt;0</span>.</p><p><strong>النتيجة:</strong> <span class="math">(u<sub>n</sub>)</span> متزايدة تماما. وبما أنها محدودة من الأعلى بـ <span class="math">2</span> فهي متقاربة.</p>
<p><strong>3-أ) ما المطلوب؟</strong> نختار <span class="math">a</span> حتى تصبح <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">1/4</span>.</p><p><strong>الفكرة المستعملة:</strong> نقطتا الثبات للعلاقة هما <span class="math">-1</span> و<span class="math">2</span>. بما أن المقام هو <span class="math">u_n+1</span>، نأخذ البسط <span class="math">u_n-2</span>، أي <span class="math">a=-2</span>.</p><p><strong>التطبيق:</strong> نضع <span class="math">a=-2</span>، فيصبح:</p><p class="math-equation">v<sub>n</sub>=(u<sub>n</sub>-2)/(u<sub>n</sub>+1)</p><p>لدينا:</p><p class="math-equation">u<sub>n+1</sub>-2 = (u<sub>n</sub>-2)/(u<sub>n</sub>+2)</p><p class="math-equation">u<sub>n+1</sub>+1 = 4(u<sub>n</sub>+1)/(u<sub>n</sub>+2)</p><p>إذن:</p><p class="math-equation">v<sub>n+1</sub>=(u<sub>n+1</sub>-2)/(u<sub>n+1</sub>+1)=(1/4)(u<sub>n</sub>-2)/(u<sub>n</sub>+1)=(1/4)v<sub>n</sub></p><p>كما أن:</p><p class="math-equation">v<sub>0</sub>=(1/2-2)/(1/2+1)=-1</p><p><strong>النتيجة:</strong> <span class="math">a=-2</span>، و<span class="math">v<sub>0</sub> = -1</span>، و<span class="math">v<sub>n</sub>=-(1/4)^n</span>.</p>
<p><strong>3-ب) ما المطلوب؟</strong> نستخرج <span class="math">u_n</span> من <span class="math">v_n</span> ثم نحسب النهاية.</p><p><strong>الفكرة المستعملة:</strong> نحل العلاقة <span class="math">v_n=(u_n-2)/(u_n+1)</span> بالنسبة إلى <span class="math">u_n</span>.</p><p><strong>التطبيق:</strong> من <span class="math">v_n=-(1/4)^n</span> نكتب:</p><p class="math-equation">(u<sub>n</sub>-2)/(u<sub>n</sub>+1)= -1/4<sup>n</sup></p><p>بالضرب في <span class="math">4^n(u_n+1)</span> نحصل على:</p><p class="math-equation">4^n u<sub>n</sub>-2×4^n = -u<sub>n</sub>-1</p><p>إذن:</p><p class="math-equation">u<sub>n</sub>(4^n+1)=2×4^n-1</p><p><strong>النتيجة:</strong></p><p class="math-equation">u<sub>n</sub>=(2×4<sup>n</sup>-1)/(4<sup>n</sup>+1)</p><p>وبقسمة البسط والمقام على <span class="math">4^n</span> نجد أن النهاية هي:</p><p class="math-equation">lim u<sub>n</sub>=2</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> أثبتنا الحصر بالتراجع، ثم استعملناه في إشارة الفرق لإثبات التزايد والتقارب. بعد ذلك اخترنا <span class="math">a=-2</span> اعتمادا على النقطتين الثابتتين، فصارت المتتالية المساعدة هندسية، ومنها استخرجنا العبارة الصريحة والنهاية.</p>
</div>`,
    conceptHints: [
      { title: "الحصر بالتراجع", hint: "اكتب <span class='math'>u<sub>n+1</sub></span> على شكل <span class='math'>(3u<sub>n</sub>+2)/(u<sub>n</sub>+2)</span>. بما أن <span class='math'>u<sub>n</sub></span>>-1 فالمقام موجب، فتستطيع المقارنة مع -1 و2 بأمان." },
      { title: "رتابة المتتالية", hint: "احسب الفرق في مقام واحد، ثم حلل البسط إلى <span class='math'>(2-u<sub>n</sub>)(1+u<sub>n</sub>)</span>. الحصر السابق يعطي إشارة كل عامل." },
      { title: "المتتالية المساعدة", hint: "ابحث عن النقطتين الثابتتين للعلاقة: هما -1 و2. بما أن المقام هو <span class='math'>u<sub>n</sub>+1</span>، اختر البسط <span class='math'>u<sub>n</sub>-2</span> حتى تظهر نسبة ثابتة." },
      { title: "النهاية باستعمال متتالية هندسية", hint: "بعد الوصول إلى <span class='math'>v<sub>n</sub>=-(1/4)<sup>n</sup></span>، حل العلاقة بين <span class='math'>v<sub>n</sub></span> و<span class='math'>u<sub>n</sub></span>، ثم اقسم على <span class='math'>4<sup>n</sup></span> لحساب النهاية." }
    ],
    solution: `<p><strong>1)</strong> نكتب <span class="math">u<sub>n+1</sub>=(3u<sub>n</sub>+2)/(u<sub>n</sub>+2)</span>. عند <span class="math">n=0</span>: <span class="math">-1&lt;1/2&lt;2</span>. إذا كان <span class="math">-1&lt;u<sub>n</sub>&lt;2</span>، وبما أن <span class="math">u<sub>n</sub>+2&gt;0</span>، فإن <span class="math">u<sub>n+1</sub>&gt;-1</span> يكافئ <span class="math">u<sub>n</sub>&gt;-1</span>، و<span class="math">u<sub>n+1</sub>&lt;2</span> يكافئ <span class="math">u<sub>n</sub>&lt;2</span>.</p><p><strong>2)</strong></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=((2-u<sub>n</sub>)(1+u<sub>n</sub>))/(u<sub>n</sub>+2)&gt;0</p><p>إذن <span class="math">(u<sub>n</sub>)</span> متزايدة ومحدودة من الأعلى، فهي متقاربة.</p><p><strong>3)</strong> حتى تكون <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">1/4</span> نأخذ <span class="math">a=-2</span>، فنجد:</p><p class="math-equation">v<sub>n+1</sub>=(1/4)v<sub>n</sub></p><p>كما أن <span class="math">v<sub>0</sub>=-1</span>، إذن <span class="math">v<sub>n</sub>=-(1/4)^n</span>.</p><p>ومن <span class="math">(u<sub>n</sub>-2)/(u<sub>n</sub>+1)=-(1/4)^n</span> نحصل على:</p><p class="math-equation">u<sub>n</sub>=(2×4<sup>n</sup>-1)/(4<sup>n</sup>+1)</p><p>وبالتالي <span class="math">lim u<sub>n</sub>=2</span>.</p>`
  },  {
    id: "bac-2021-technical-math-subject-1",
    branch: "science",
    stream: "technical_math",
    year: "2021",
    title: "بكالوريا 2021 - تقني رياضي - الموضوع الأول",
    statementHtml: `<div class="bac-statement">
      <p><strong>التمرين: المتتاليات العددية</strong></p>
      <p>المتتالية العددية <span class="math">(u<sub>n</sub>)</span> معرفة بحدها الأول <span class="math">u<sub>0</sub></span> حيث <span class="math">u<sub>0</sub> = 3</span>، ومن أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math-equation">u<sub>n+1</sub> = (7/9)u<sub>n</sub> + 1</p>
      <ol>
        <li><ol><li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n</sub> &lt; 9/2</span>.</li><li>بين أن المتتالية <span class="math">(u<sub>n</sub>)</span> متزايدة تماما ثم استنتج أنها متقاربة.</li></ol></li>
        <li><p>نعتبر المتتالية العددية <span class="math">(v<sub>n</sub>)</span> المعرفة على <span class="math">ℕ</span> بـ:</p><p class="math-equation">v<sub>n</sub> = (1/3)u<sub>n</sub> - 3/2</p><ol><li>بين أن المتتالية <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">7/9</span>، ثم احسب حدها الأول.</li><li>اكتب الحد العام <span class="math">v<sub>n</sub></span> بدلالة <span class="math">n</span>.</li><li>استنتج أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n</sub> = -3/2(7/9)<sup>n</sup> + 9/2</span>، ثم احسب <span class="math">lim u<sub>n</sub></span>.</li></ol></li>
        <li>احسب بدلالة العدد الطبيعي <span class="math">n</span> المجموع <span class="math">S<sub>n</sub></span> حيث: <span class="math">S<sub>n</sub> = (1/3)u<sub>0</sub> + (1/3)u<sub>1</sub> + ... + (1/3)u<sub>n</sub></span>.</li>
      </ol>
    </div>`,
    quickSolution: `<p><strong>1)</strong> <span class="math">u<sub>n</sub> &lt; 9/2</span> لكل <span class="math">n</span>؛ <span class="math">(u<sub>n</sub>)</span> متزايدة تماما ومتقاربة.</p><p><strong>2)</strong> <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">7/9</span>، <span class="math">v<sub>0</sub> = -1/2</span>؛ <span class="math">v<sub>n</sub> = -1/2(7/9)<sup>n</sup></span>؛ <span class="math">u<sub>n</sub> = -3/2(7/9)<sup>n</sup> + 9/2</span>؛ <span class="math">lim u<sub>n</sub> = 9/2</span>.</p><p><strong>3)</strong> <span class="math">S<sub>n</sub> = (3/2)(n+1) - (9/4)(1 - (7/9)<sup>n+1</sup>)</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p><strong>1-أ) ما المطلوب؟</strong> نثبت أن كل حدود المتتالية أصغر من <span class="math">9/2</span>.</p><p><strong>الفكرة المستعملة:</strong> نستعمل البرهان بالتراجع لأن العلاقة تعطي الحد التالي بدلالة الحد السابق.</p><p><strong>التطبيق:</strong> عند <span class="math">n=0</span>: <span class="math">u<sub>0</sub>=3&lt;9/2</span>. نفرض أن <span class="math">u<sub>n</sub>&lt;9/2</span>. عندئذ:</p><p class="math-equation">u<sub>n+1</sub> = (7/9)u<sub>n</sub> + 1 &lt; (7/9)(9/2) + 1 = 7/2 + 1 = 9/2</p><p><strong>النتيجة:</strong> <span class="math">u<sub>n</sub>&lt;9/2</span> لكل <span class="math">n∈ℕ</span>.</p>
<p><strong>1-ب) ما المطلوب؟</strong> ندرس الرتابة ثم نستنتج التقارب.</p><p><strong>الفكرة المستعملة:</strong> نحسب الفرق <span class="math">u<sub>n+1</sub>-u<sub>n</sub></span> ونستعمل الحصر السابق. ثم نستعمل أن المتزايدة والمحدودة من الأعلى متقاربة.</p><p><strong>التطبيق:</strong></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub> = (7/9)u<sub>n</sub> + 1 - u<sub>n</sub> = 1 - (2/9)u<sub>n</sub> = (2/9)(9/2-u<sub>n</sub>)</p><p>وبما أن <span class="math">u<sub>n</sub>&lt;9/2</span> فإن الفرق موجب.</p><p><strong>النتيجة:</strong> <span class="math">(u<sub>n</sub>)</span> متزايدة تماما. وبما أنها محدودة من الأعلى بـ <span class="math">9/2</span> فهي متقاربة.</p>
<p><strong>2-أ) ما المطلوب؟</strong> نثبت أن <span class="math">(v<sub>n</sub>)</span> هندسية ونحسب حدها الأول.</p><p><strong>الفكرة المستعملة:</strong> اخترنا <span class="math">v_n=(1/3)u_n-3/2</span> لأنها تقيس الفرق بين <span class="math">u_n/3</span> والعدد الثابت <span class="math">3/2</span> الموافق للنهاية المرشحة <span class="math">9/2</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">v<sub>n+1</sub> = (1/3)u<sub>n+1</sub> - 3/2 = (1/3)[(7/9)u<sub>n</sub>+1] - 3/2</p><p class="math-equation">v<sub>n+1</sub> = (7/27)u<sub>n</sub> + 1/3 - 3/2 = (7/27)u<sub>n</sub> - 7/6</p><p>ومن جهة أخرى:</p><p class="math-equation">(7/9)v<sub>n</sub> = (7/9)[(1/3)u<sub>n</sub>-3/2] = (7/27)u<sub>n</sub> - 7/6</p><p>إذن <span class="math">v<sub>n+1</sub>=(7/9)v<sub>n</sub></span>. كما أن:</p><p class="math-equation">v<sub>0</sub> = (1/3)×3 - 3/2 = -1/2</p><p><strong>النتيجة:</strong> <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">7/9</span> وحدها الأول <span class="math">v<sub>0</sub> = -1/2</span>.</p>
<p><strong>2-ب) ما المطلوب؟</strong> نكتب الحد العام <span class="math">v<sub>n</sub></span>.</p><p><strong>الفكرة المستعملة:</strong> نستعمل صيغة الحد العام لمتتالية هندسية.</p><p><strong>التطبيق والنتيجة:</strong></p><p class="math-equation">v<sub>n</sub> = v<sub>0</sub>(7/9)<sup>n</sup> = -1/2(7/9)<sup>n</sup></p>
<p><strong>2-ج) ما المطلوب؟</strong> نستخرج <span class="math">u<sub>n</sub></span> ونحسب النهاية.</p><p><strong>الفكرة المستعملة:</strong> من تعريف <span class="math">v_n</span> نحصل على <span class="math">u_n=3v_n+9/2</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">u<sub>n</sub> = 3v<sub>n</sub> + 9/2 = -3/2(7/9)<sup>n</sup> + 9/2</p><p>وبما أن <span class="math">|7/9|&lt;1</span> فإن <span class="math">(7/9)^n→0</span>.</p><p><strong>النتيجة:</strong></p><p class="math-equation">lim u<sub>n</sub> = 9/2</p>
<p><strong>3) ما المطلوب؟</strong> نحسب مجموع الحدود <span class="math">u_k/3</span> من <span class="math">0</span> إلى <span class="math">n</span>.</p><p><strong>الفكرة المستعملة:</strong> من تعريف <span class="math">v_k</span> لدينا <span class="math">(1/3)u_k=v_k+3/2</span>، فنحول المجموع إلى مجموع ثابت زائد مجموع هندسي.</p><p><strong>التطبيق:</strong></p><p class="math-equation">S<sub>n</sub> = Σ<sub>k=0</sub><sup>n</sup>(v_k+3/2) = Σ<sub>k=0</sub><sup>n</sup>v_k + (3/2)(n+1)</p><p>وبما أن <span class="math">v_k=-1/2(7/9)^k</span>:</p><p class="math-equation">Σ<sub>k=0</sub><sup>n</sup>v_k = -1/2 × [1-(7/9)<sup>n+1</sup>]/(1-7/9) = -9/4[1-(7/9)<sup>n+1</sup>]</p><p><strong>النتيجة:</strong></p><p class="math-equation">S<sub>n</sub> = (3/2)(n+1) - (9/4)[1-(7/9)<sup>n+1</sup>]</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> بدأنا بحصر <span class="math">u_n</span> بالتراجع، ثم أثبتنا الرتابة باستعمال الفرق فحصلنا على التقارب. بعد ذلك استعملنا المتتالية المساعدة لتحويل العلاقة إلى هندسية، فاستخرجنا العبارة الصريحة والنهاية، ثم حسبنا المجموع من العلاقة بين <span class="math">u_k/3</span> و<span class="math">v_k</span>.</p>
</div>`,
    conceptHints: [
      { title: "الحصر بالتراجع", hint: "تحقق من <span class='math'>u<sub>0</sub>&lt;9/2</span>، ثم افترض <span class='math'>u<sub>n</sub>&lt;9/2</span> وعوض في العلاقة. قارن <span class='math'>(7/9)u<sub>n</sub>+1</span> بالعدد <span class='math'>9/2</span>." },
      { title: "رتابة المتتالية", hint: "احسب <span class='math'>u<sub>n+1</sub>-u<sub>n</sub></span>. حاول كتابته على شكل ثابت موجب مضروب في <span class='math'>9/2-u<sub>n</sub></span>، ثم استعمل الحصر السابق." },
      { title: "المتتالية المساعدة", hint: "احسب <span class='math'>v<sub>n+1</sub></span> بتعويض <span class='math'>u<sub>n+1</sub></span>. ثم قارن النتيجة مع <span class='math'>(7/9)v<sub>n</sub></span> لإثبات أنها هندسية." },
      { title: "النهاية باستعمال متتالية هندسية", hint: "بعد كتابة <span class='math'>v<sub>n</sub></span>، استعمل أن <span class='math'>(7/9)<sup>n</sup></span> يؤول إلى 0، ثم ارجع إلى <span class='math'>u<sub>n</sub></span> من العلاقة <span class='math'>u<sub>n</sub>=3v<sub>n</sub>+9/2</span>." },
      { title: "حساب المجموع", hint: "استعمل تعريف <span class='math'>v<sub>k</sub></span> للحصول على <span class='math'>u<sub>k</sub>/3=v<sub>k</sub>+3/2</span>. عند الجمع يظهر مجموع ثابت ومجموع هندسي." }
    ],
    solution: `<p><strong>1)</strong> عند <span class="math">n=0</span>: <span class="math">u<sub>0</sub>=3&lt;9/2</span>. إذا كان <span class="math">u<sub>n</sub>&lt;9/2</span> فإن:</p><p class="math-equation">u<sub>n+1</sub>=(7/9)u<sub>n</sub>+1&lt;(7/9)(9/2)+1=9/2</p><p>إذن <span class="math">u<sub>n</sub>&lt;9/2</span> لكل <span class="math">n</span>.</p><p>كما أن:</p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=(2/9)(9/2-u<sub>n</sub>)&gt;0</p><p>إذن <span class="math">(u<sub>n</sub>)</span> متزايدة تماما ومحدودة من الأعلى، فهي متقاربة.</p><p><strong>2)</strong></p><p class="math-equation">v<sub>n+1</sub>=(1/3)u<sub>n+1</sub>-3/2=(7/9)[(1/3)u<sub>n</sub>-3/2]=(7/9)v<sub>n</sub></p><p>و<span class="math">v<sub>0</sub>=-1/2</span>، إذن:</p><p class="math-equation">v<sub>n</sub> = -1/2(7/9)<sup>n</sup></p><p>ومن <span class="math">u<sub>n</sub>=3v<sub>n</sub>+9/2</span> نحصل على:</p><p class="math-equation">u<sub>n</sub>=-3/2(7/9)<sup>n</sup>+9/2</p><p>وبالتالي <span class="math">lim u<sub>n</sub>=9/2</span>.</p><p><strong>3)</strong> بما أن <span class="math">u_k/3=v_k+3/2</span>، فإن:</p><p class="math-equation">S<sub>n</sub>=Σv_k+(3/2)(n+1)</p><p>ومنه:</p><p class="math-equation">S<sub>n</sub>=(3/2)(n+1)-(9/4)(1-(7/9)<sup>n+1</sup>)</p>`
  },  {
    id: "bac-2021-technical-math-subject-2",
    branch: "science",
    stream: "technical_math",
    year: "2021",
    title: "بكالوريا 2021 - تقني رياضي - الموضوع الثاني",
    statementHtml: `<div class="bac-statement">
      <p><strong>التمرين: المتتاليات العددية</strong></p>
      <p>المتتالية العددية <span class="math">(u<sub>n</sub>)</span> معرفة بـ <span class="math">u<sub>0</sub> = 3 + e<sup>-2</sup></span>، ومن أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math-equation">u<sub>n+1</sub> = u<sub>n</sub><sup>2</sup> - 6u<sub>n</sub> + 12</p>
      <ol>
        <li><ol><li>تحقق أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n+1</sub> = (u<sub>n</sub> - 3)<sup>2</sup> + 3</span>.</li><li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">3 &lt; u<sub>n</sub> &lt; 4</span>.</li></ol></li>
        <li><ol><li>ادرس اتجاه تغير المتتالية <span class="math">(u<sub>n</sub>)</span>.</li><li>استنتج أن <span class="math">(u<sub>n</sub>)</span> متقاربة.</li></ol></li>
        <li><p>نعتبر المتتالية العددية <span class="math">(v<sub>n</sub>)</span> المعرفة على <span class="math">ℕ</span> بـ:</p><p class="math-equation">v<sub>n</sub> = ln(u<sub>n</sub> - 3)</p><ol><li>بين أن المتتالية <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">2</span>، ويطلب حساب حدها الأول.</li><li>اكتب <span class="math">v<sub>n</sub></span> بدلالة <span class="math">n</span>، ثم استنتج أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n</sub> = 3 + e<sup>-2<sup>n+1</sup></sup></span>.</li><li>احسب <span class="math">lim u<sub>n</sub></span>.</li></ol></li>
        <li><p>نضع من أجل كل عدد طبيعي <span class="math">n</span>:</p><p class="math-equation">P<sub>n</sub> = (u<sub>0</sub> - 3)(u<sub>1</sub> - 3) × ... × (u<sub>n</sub> - 3)</p><p>احسب <span class="math">P<sub>n</sub></span> بدلالة <span class="math">n</span>.</p></li>
      </ol>
    </div>`,
    quickSolution: `<p><strong>1)</strong> <span class="math">u<sub>n+1</sub>=(u<sub>n</sub>-3)<sup>2</sup>+3</span>؛ <span class="math">3&lt;u<sub>n</sub>&lt;4</span> لكل <span class="math">n</span>.</p><p><strong>2)</strong> <span class="math">(u<sub>n</sub>)</span> متناقصة تماما ومتقاربة.</p><p><strong>3)</strong> <span class="math">v<sub>0</sub> = -2</span>؛ <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">2</span>؛ <span class="math">v<sub>n</sub> = -2<sup>n+1</sup></span>؛ <span class="math">u<sub>n</sub> = 3 + e<sup>-2<sup>n+1</sup></sup></span>؛ <span class="math">lim u<sub>n</sub> = 3</span>.</p><p><strong>4)</strong> <span class="math">P<sub>n</sub> = e<sup>-2(2<sup>n+1</sup>-1)</sup></span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p><strong>1-أ) ما المطلوب؟</strong> نعيد كتابة العلاقة التراجعية بإكمال مربع.</p><p><strong>الفكرة المستعملة:</strong> نلاحظ أن <span class="math">u_n^2-6u_n+9=(u_n-3)^2</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">u<sub>n</sub><sup>2</sup>-6u<sub>n</sub>+12=(u<sub>n</sub><sup>2</sup>-6u<sub>n</sub>+9)+3=(u<sub>n</sub>-3)<sup>2</sup>+3</p><p><strong>النتيجة:</strong> <span class="math">u<sub>n+1</sub>=(u<sub>n</sub>-3)^2+3</span>.</p>
<p><strong>1-ب) ما المطلوب؟</strong> نثبت أن كل الحدود محصورة بين <span class="math">3</span> و<span class="math">4</span>.</p><p><strong>الفكرة المستعملة:</strong> نستعمل البرهان بالتراجع، والصيغة السابقة تجعل الانتقال بسيطا.</p><p><strong>التطبيق:</strong> عند <span class="math">n=0</span>: بما أن <span class="math">0&lt;e^{-2}&lt;1</span> فإن <span class="math">3&lt;u<sub>0</sub>=3+e^{-2}&lt;4</span>. نفرض أن <span class="math">3&lt;u<sub>n</sub>&lt;4</span>. إذن <span class="math">0&lt;u<sub>n</sub>-3&lt;1</span>، ومنه:</p><p class="math-equation">0&lt;(u<sub>n</sub>-3)^2&lt;1</p><p>وبإضافة <span class="math">3</span> نحصل على:</p><p class="math-equation">3&lt;u<sub>n+1</sub>&lt;4</p><p><strong>النتيجة:</strong> <span class="math">3&lt;u<sub>n</sub>&lt;4</span> لكل <span class="math">n∈ℕ</span>.</p>
<p><strong>2-أ) ما المطلوب؟</strong> ندرس اتجاه تغير <span class="math">(u<sub>n</sub>)</span>.</p><p><strong>الفكرة المستعملة:</strong> نستعمل الفرق <span class="math">u<sub>n+1</sub>-u<sub>n</sub></span> ونربط إشارته بالحصر السابق.</p><p><strong>التطبيق:</strong></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=(u<sub>n</sub>-3)^2+3-u<sub>n</sub></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=(u<sub>n</sub>-3)^2-(u<sub>n</sub>-3)=(u<sub>n</sub>-3)(u<sub>n</sub>-4)</p><p>وبما أن <span class="math">3&lt;u<sub>n</sub>&lt;4</span> فإن <span class="math">u<sub>n</sub>-3&gt;0</span> و<span class="math">u<sub>n</sub>-4&lt;0</span>.</p><p><strong>النتيجة:</strong> الفرق سالب، إذن <span class="math">(u<sub>n</sub>)</span> متناقصة تماما.</p>
<p><strong>2-ب) ما المطلوب؟</strong> نستنتج تقارب المتتالية.</p><p><strong>الفكرة المستعملة:</strong> المتتالية المتناقصة والمحدودة من الأسفل متقاربة.</p><p><strong>التطبيق والنتيجة:</strong> بما أن <span class="math">(u_n)</span> متناقصة و<span class="math">u_n&gt;3</span> فهي متقاربة.</p>
<p><strong>3-أ) ما المطلوب؟</strong> نثبت أن <span class="math">(v_n)</span> هندسية ونحسب حدها الأول.</p><p><strong>الفكرة المستعملة:</strong> بما أن <span class="math">u_{n+1}-3=(u_n-3)^2</span>، فاللوغاريتم يحول التربيع إلى ضرب في <span class="math">2</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">v<sub>n+1</sub>=ln(u<sub>n+1</sub>-3)=ln((u<sub>n</sub>-3)^2)=2ln(u<sub>n</sub>-3)=2v<sub>n</sub></p><p>كما أن:</p><p class="math-equation">v<sub>0</sub>=ln(u<sub>0</sub>-3)=ln(e^{-2})=-2</p><p><strong>النتيجة:</strong> <span class="math">(v_n)</span> هندسية أساسها <span class="math">2</span> وحدها الأول <span class="math">v_0=-2</span>.</p>
<p><strong>3-ب) ما المطلوب؟</strong> نكتب <span class="math">v_n</span> ثم نستخرج <span class="math">u_n</span>.</p><p><strong>الفكرة المستعملة:</strong> نستعمل صيغة الحد العام لمتتالية هندسية ثم نرفع بالأساس <span class="math">e</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">v<sub>n</sub>=v<sub>0</sub>2^n=-2×2^n=-2<sup>n+1</sup></p><p>ومن <span class="math">v_n=ln(u_n-3)</span> نحصل على:</p><p class="math-equation">u<sub>n</sub>-3=e^{v_n}=e^{-2^{n+1}}</p><p><strong>النتيجة:</strong></p><p class="math-equation">u<sub>n</sub>=3+e^{-2^{n+1}}</p>
<p><strong>3-ج) ما المطلوب؟</strong> نحسب نهاية <span class="math">u_n</span>.</p><p><strong>الفكرة المستعملة:</strong> بما أن <span class="math">2^{n+1}→+∞</span> فإن <span class="math">e^{-2^{n+1}}→0</span>.</p><p><strong>النتيجة:</strong></p><p class="math-equation">lim u<sub>n</sub>=3</p>
<p><strong>4) ما المطلوب؟</strong> نحسب جداء الحدود <span class="math">u_k-3</span>.</p><p><strong>الفكرة المستعملة:</strong> نستعمل العبارة الصريحة <span class="math">u_k-3=e^{-2^{k+1}}</span>، ثم نجمع الأسس لأن جداء قوى لها نفس الأساس يساوي قوة مجموع الأسس.</p><p><strong>التطبيق:</strong></p><p class="math-equation">P<sub>n</sub>=e^{-2}×e^{-4}×...×e^{-2^{n+1}}=e^{-(2+4+...+2^{n+1})}</p><p>والمجموع <span class="math">2+4+...+2^{n+1}</span> هندسي يساوي <span class="math">2(2^{n+1}-1)</span>.</p><p><strong>النتيجة:</strong></p><p class="math-equation">P<sub>n</sub>=e^{-2(2^{n+1}-1)}</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> بدأنا بإكمال المربع، ثم استعملنا الحصر بالتراجع لإثبات بقاء الحدود بين <span class="math">3</span> و<span class="math">4</span>. بعد ذلك درسنا الرتابة بالفرق، ثم استعملنا اللوغاريتم لتحويل التربيع إلى متتالية هندسية، وأخيرا حسبنا الجداء بجمع الأسس.</p>
</div>`,
    conceptHints: [
      { title: "إكمال مربع", hint: "أضف واطرح 9 داخل <span class='math'>u<sub>n</sub><sup>2</sup>-6u<sub>n</sub>+12</span> حتى يظهر <span class='math'>(u<sub>n</sub>-3)<sup>2</sup></span>." },
      { title: "الحصر بالتراجع", hint: "بعد إثبات <span class='math'>3&lt;u<sub>n</sub>&lt;4</span>، حوله إلى <span class='math'>0&lt;u<sub>n</sub>-3&lt;1</span>. عند التربيع يبقى العدد بين 0 و1، ثم أضف 3." },
      { title: "رتابة المتتالية", hint: "احسب <span class='math'>u<sub>n+1</sub>-u<sub>n</sub></span> باستعمال الصيغة <span class='math'>(u<sub>n</sub>-3)<sup>2</sup>+3</span>، ثم حلله إلى <span class='math'>(u<sub>n</sub>-3)(u<sub>n</sub>-4)</span>." },
      { title: "المتتالية المساعدة", hint: "بما أن <span class='math'>u<sub>n+1</sub>-3=(u<sub>n</sub>-3)<sup>2</sup></span>، استعمل ln حتى يتحول التربيع إلى ضرب في 2." },
      { title: "حساب الجداء", hint: "اكتب كل عامل <span class='math'>u<sub>k</sub>-3</span> على شكل e^{-2^{k+1}}، ثم اجمع الأسس داخل قوة واحدة واستعمل مجموعا هندسيا." }
    ],
    solution: `<p><strong>1)</strong> لدينا:</p><p class="math-equation">u<sub>n+1</sub>=u<sub>n</sub><sup>2</sup>-6u<sub>n</sub>+12=(u<sub>n</sub>-3)<sup>2</sup>+3</p><p>وبالتراجع: عند <span class="math">n=0</span>، <span class="math">3&lt;3+e^{-2}&lt;4</span>. إذا كان <span class="math">3&lt;u<sub>n</sub>&lt;4</span> فإن <span class="math">0&lt;u<sub>n</sub>-3&lt;1</span>، وبالتالي <span class="math">0&lt;(u<sub>n</sub>-3)^2&lt;1</span>، ومنه <span class="math">3&lt;u<sub>n+1</sub>&lt;4</span>.</p><p><strong>2)</strong></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=(u<sub>n</sub>-3)(u<sub>n</sub>-4)&lt;0</p><p>إذن <span class="math">(u<sub>n</sub>)</span> متناقصة تماما. وبما أنها محدودة من الأسفل بـ <span class="math">3</span> فهي متقاربة.</p><p><strong>3)</strong> بما أن <span class="math">u<sub>n+1</sub>-3=(u<sub>n</sub>-3)^2</span>، فإن:</p><p class="math-equation">v<sub>n+1</sub>=ln(u<sub>n+1</sub>-3)=2ln(u<sub>n</sub>-3)=2v<sub>n</sub></p><p>و<span class="math">v<sub>0</sub>=ln(e^{-2})=-2</span>، إذن:</p><p class="math-equation">v<sub>n</sub>=-2^{n+1}</p><p>ومنه:</p><p class="math-equation">u<sub>n</sub>=3+e^{-2^{n+1}}</p><p>وبالتالي <span class="math">lim u<sub>n</sub>=3</span>.</p><p><strong>4)</strong></p><p class="math-equation">P<sub>n</sub>=e^{-2}e^{-4}...e^{-2^{n+1}}=e^{-(2+4+...+2^{n+1})}</p><p>إذن:</p><p class="math-equation">P<sub>n</sub>=e^{-2(2^{n+1}-1)}</p>`
  },  {
    id: "bac-2022-technical-math-subject-1",
    branch: "science",
    stream: "technical_math",
    year: "2022",
    title: "بكالوريا 2022 - تقني رياضي - الموضوع الأول",
    statementHtml: `<div class="bac-statement">
      <p><strong>التمرين: المتتاليات العددية</strong></p>
      <p>المتتاليتان العدديتان <span class="math">(u<sub>n</sub>)</span> و <span class="math">(v<sub>n</sub>)</span> معرفتان على <span class="math">ℕ*</span> كما يلي:</p>
      <p class="math-equation">u<sub>1</sub> = 2</p>
      <p>ومن أجل كل عدد طبيعي غير معدوم <span class="math">n</span>:</p>
      <p class="math-equation">u<sub>n+1</sub> = n/(2n+2) u<sub>n</sub> - 1/(n+1) ، و v<sub>n</sub> = n u<sub>n</sub> + 2</p>
      <ol>
        <li>احسب <span class="math">u<sub>2</sub></span> و <span class="math">u<sub>3</sub></span>.</li>
        <li><ol><li>برهن أن المتتالية <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">1/2</span>.</li><li>اكتب <span class="math">v<sub>n</sub></span> بدلالة <span class="math">n</span>، ثم استنتج <span class="math">u<sub>n</sub></span> بدلالة <span class="math">n</span>.</li></ol></li>
        <li>احسب، بدلالة <span class="math">n</span>، المجموع <span class="math">S<sub>n</sub></span> حيث <span class="math">S<sub>n</sub> = v<sub>1</sub> + v<sub>2</sub> + ... + v<sub>n</sub></span>.</li>
        <li><p>نضع من أجل كل عدد طبيعي غير معدوم <span class="math">n</span>:</p><p class="math-equation">w<sub>n</sub> = 4n/(v<sub>n</sub> - n u<sub>n</sub>)</p><p>احسب، بدلالة <span class="math">n</span>، المجموع <span class="math">S'<sub>n</sub></span> حيث <span class="math">S'<sub>n</sub> = w<sub>1</sub> + w<sub>2</sub> + ... + w<sub>n</sub></span>.</p></li>
      </ol>
    </div>`,
    quickSolution: `<p><strong>1)</strong> <span class="math">u<sub>2</sub> = 0</span>، <span class="math">u<sub>3</sub> = -1/3</span>.</p><p><strong>2)</strong> <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">1/2</span>، <span class="math">v<sub>1</sub> = 4</span>؛ <span class="math">v<sub>n</sub> = 4(1/2)<sup>n-1</sup></span>؛ <span class="math">u<sub>n</sub> = [4(1/2)<sup>n-1</sup> - 2]/n</span>.</p><p><strong>3)</strong> <span class="math">S<sub>n</sub> = 8(1 - (1/2)<sup>n</sup>)</span>.</p><p><strong>4)</strong> <span class="math">w<sub>n</sub> = 2n</span>؛ <span class="math">S'<sub>n</sub> = n(n+1)</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p><strong>1) ما المطلوب؟</strong> نحسب أول حدين بعد <span class="math">u<sub>1</sub></span> باستعمال العلاقة التراجعية.</p><p><strong>الفكرة المستعملة:</strong> نعوض مباشرة <span class="math">n=1</span> ثم <span class="math">n=2</span> في العلاقة.</p><p><strong>التطبيق:</strong></p><p class="math-equation">u<sub>2</sub> = 1/4 u<sub>1</sub> - 1/2 = 1/4×2 - 1/2 = 0</p><p class="math-equation">u<sub>3</sub> = 2/6 u<sub>2</sub> - 1/3 = 1/3×0 - 1/3 = -1/3</p><p><strong>النتيجة:</strong> <span class="math">u<sub>2</sub>=0</span> و <span class="math">u<sub>3</sub>=-1/3</span>.</p>
<p><strong>2-أ) ما المطلوب؟</strong> نثبت أن <span class="math">(v<sub>n</sub>)</span> هندسية.</p><p><strong>الفكرة المستعملة:</strong> نحسب <span class="math">v<sub>n+1</sub></span> انطلاقا من تعريفه، ثم نعوض <span class="math">u<sub>n+1</sub></span> بالعلاقة التراجعية.</p><p><strong>التطبيق:</strong></p><p class="math-equation">v<sub>n+1</sub> = (n+1)u<sub>n+1</sub> + 2</p><p>وبتعويض <span class="math">u<sub>n+1</sub></span> نحصل على:</p><p class="math-equation">v<sub>n+1</sub> = (n+1)[n/(2n+2)u<sub>n</sub> - 1/(n+1)] + 2</p><p class="math-equation">v<sub>n+1</sub> = (n/2)u<sub>n</sub> - 1 + 2 = (n u<sub>n</sub> + 2)/2 = (1/2)v<sub>n</sub></p><p><strong>النتيجة:</strong> <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">1/2</span>.</p>
<p><strong>2-ب) ما المطلوب؟</strong> نكتب <span class="math">v<sub>n</sub></span> ثم نستنتج <span class="math">u<sub>n</sub></span>.</p><p><strong>الفكرة المستعملة:</strong> نستعمل صيغة الحد العام لمتتالية هندسية معرفة على <span class="math">ℕ*</span>: <span class="math">v<sub>n</sub>=v<sub>1</sub>q<sup>n-1</sup></span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">v<sub>1</sub> = 1×u<sub>1</sub> + 2 = 4</p><p>إذن:</p><p class="math-equation">v<sub>n</sub> = 4(1/2)<sup>n-1</sup></p><p>ومن <span class="math">v<sub>n</sub>=n u<sub>n</sub>+2</span> نحصل على:</p><p class="math-equation">n u<sub>n</sub> = v<sub>n</sub> - 2</p><p><strong>النتيجة:</strong></p><p class="math-equation">u<sub>n</sub> = [4(1/2)<sup>n-1</sup> - 2]/n</p>
<p><strong>3) ما المطلوب؟</strong> نحسب مجموع حدود <span class="math">v</span> من الرتبة <span class="math">1</span> إلى <span class="math">n</span>.</p><p><strong>الفكرة المستعملة:</strong> هذا مجموع هندسي عدد حدوده <span class="math">n</span>، وحده الأول <span class="math">v<sub>1</sub>=4</span> وأساسه <span class="math">1/2</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">S<sub>n</sub> = 4[1-(1/2)<sup>n</sup>]/(1-1/2)</p><p><strong>النتيجة:</strong></p><p class="math-equation">S<sub>n</sub> = 8(1-(1/2)<sup>n</sup>)</p>
<p><strong>4) ما المطلوب؟</strong> نحسب <span class="math">w<sub>n</sub></span> ثم مجموع حدوده.</p><p><strong>الفكرة المستعملة:</strong> نستعمل تعريف <span class="math">v<sub>n</sub></span> لتبسيط المقام <span class="math">v<sub>n</sub>-n u<sub>n</sub></span>.</p><p><strong>التطبيق:</strong> بما أن <span class="math">v<sub>n</sub>=n u<sub>n</sub>+2</span> فإن:</p><p class="math-equation">v<sub>n</sub>-n u<sub>n</sub> = 2</p><p>ومنه:</p><p class="math-equation">w<sub>n</sub> = 4n/2 = 2n</p><p>إذن:</p><p class="math-equation">S'<sub>n</sub> = 2(1+2+...+n) = 2×n(n+1)/2</p><p><strong>النتيجة:</strong></p><p class="math-equation">S'<sub>n</sub> = n(n+1)</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> حسبنا الحدود الأولى بالتعويض، ثم استعملنا تعريف <span class="math">v_n</span> لتحويل العلاقة إلى متتالية هندسية. بعد ذلك استخرجنا <span class="math">u_n</span> من العلاقة <span class="math">v_n=n u_n+2</span>، وحسبنا مجموعا هندسيا، ثم بسطنا <span class="math">w_n</span> باستعمال نفس التعريف.</p>
</div>`,
    conceptHints: [
      { title: "حساب حدود أولى", hint: "العلاقة معرفة على N*، لذلك احسب <span class='math'>u<sub>2</sub></span> بتعويض <span class='math'>n=1</span>، ثم <span class='math'>u<sub>3</sub></span> بتعويض <span class='math'>n=2</span> واستعمال القيمة التي وجدتها." },
      { title: "المتتالية المساعدة", hint: "ابدأ من <span class='math'>v<sub>n+1</sub>=(n+1)u<sub>n+1</sub>+2</span>، ثم عوض <span class='math'>u<sub>n+1</sub></span>. انتبه إلى أن <span class='math'>(n+1)/(2n+2)=1/2</span>." },
      { title: "عبارة الحد العام", hint: "لأن المتتالية <span class='math'>v<sub>n</sub></span> تبدأ من <span class='math'>n=1</span>، استعمل الصيغة <span class='math'>v<sub>n</sub>=v<sub>1</sub> q^{n-1}</span> وليس <span class='math'>v<sub>0</sub> q^n</span>." },
      { title: "حساب المجموع", hint: "<span class='math'>S<sub>n</sub></span> مجموع هندسي من <span class='math'>v<sub>1</sub></span> إلى <span class='math'>v<sub>n</sub></span>، وعدد حدوده n. استعمل الحد الأول <span class='math'>v<sub>1</sub></span> والأساس <span class='math'>1/2</span>." },
      { title: "تبسيط <span class='math'>w<sub>n</sub></span>", hint: "قبل جمع <span class='math'>w<sub>n</sub></span>، استعمل تعريف <span class='math'>v<sub>n</sub>=n u<sub>n</sub>+2</span> لتبسيط المقام <span class='math'>v<sub>n</sub>-nu<sub>n</sub></span>. بعد ذلك يصبح المجموع حسابيا بسيطا." }
    ],
    solution: `<p><strong>1)</strong></p><p class="math-equation">u<sub>2</sub>=1/4 u<sub>1</sub>-1/2=0</p><p class="math-equation">u<sub>3</sub>=1/3 u<sub>2</sub>-1/3=-1/3</p><p><strong>2)</strong> لدينا:</p><p class="math-equation">v<sub>n+1</sub>=(n+1)u<sub>n+1</sub>+2=(n/2)u<sub>n</sub>-1+2=(1/2)(n u<sub>n</sub>+2)=(1/2)v<sub>n</sub></p><p>إذن <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">1/2</span>، كما أن <span class="math">v<sub>1</sub>=4</span>، ومنه:</p><p class="math-equation">v<sub>n</sub>=4(1/2)<sup>n-1</sup></p><p>ومن <span class="math">v<sub>n</sub>=n u<sub>n</sub>+2</span> نجد:</p><p class="math-equation">u<sub>n</sub>=[4(1/2)<sup>n-1</sup>-2]/n</p><p><strong>3)</strong></p><p class="math-equation">S<sub>n</sub>=4[1-(1/2)<sup>n</sup>]/(1-1/2)=8(1-(1/2)<sup>n</sup>)</p><p><strong>4)</strong> بما أن <span class="math">v<sub>n</sub>-n u<sub>n</sub>=2</span>، فإن:</p><p class="math-equation">w<sub>n</sub>=4n/2=2n</p><p>ومنه:</p><p class="math-equation">S'<sub>n</sub>=2(1+2+...+n)=n(n+1)</p>`
  },  {
    id: "bac-2022-technical-math-subject-2",
    branch: "science",
    stream: "technical_math",
    year: "2022",
    title: "بكالوريا 2022 - تقني رياضي - الموضوع الثاني",
    statementHtml: `<div class="bac-statement">
      <p><strong>التمرين: المتتاليات العددية</strong></p>
      <p>نعتبر المتتالية العددية <span class="math">(u<sub>n</sub>)</span> المعرفة بحدها الأول <span class="math">u<sub>0</sub> = 0</span>، ومن أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math-equation">u<sub>n+1</sub> = (1/2)(u<sub>n</sub> - 2)</p>
      <ol>
        <li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n</sub> &gt; -2</span>.</li>
        <li>ادرس اتجاه تغير المتتالية <span class="math">(u<sub>n</sub>)</span>، ثم استنتج أنها متقاربة.</li>
        <li>
          <p>نعتبر المتتالية العددية <span class="math">(v<sub>n</sub>)</span> المعرفة على <span class="math">ℕ</span> كما يلي:</p>
          <p class="math-equation">v<sub>n</sub> = 1/(u<sub>n+1</sub> - u<sub>n</sub>)</p>
          <ol>
            <li>برهن أن المتتالية <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">2</span>، ثم اكتب <span class="math">v<sub>n</sub></span> بدلالة <span class="math">n</span>.</li>
            <li>احسب، بدلالة <span class="math">n</span>، المجموع <span class="math">S<sub>n</sub></span> حيث: <span class="math">S<sub>n</sub> = 1/v<sub>0</sub> + 1/v<sub>1</sub> + ... + 1/v<sub>n</sub></span>.</li>
          </ol>
        </li>
        <li>
          <ol>
            <li>بين أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n</sub> = 2(1/2<sup>n</sup> - 1)</span>، ثم احسب <span class="math">lim u<sub>n</sub></span>.</li>
            <li>احسب بدلالة <span class="math">n</span> المجموع <span class="math">S'<sub>n</sub></span> حيث <span class="math">S'<sub>n</sub> = u<sub>0</sub> + u<sub>1</sub> + ... + u<sub>n</sub></span>.</li>
          </ol>
        </li>
      </ol>
    </div>`,
    quickSolution: `<p><strong>1)</strong> <span class="math">u<sub>n</sub> &gt; -2</span> لكل <span class="math">n</span>.</p><p><strong>2)</strong> <span class="math">(u<sub>n</sub>)</span> متناقصة ومحدودة من الأسفل، إذن متقاربة.</p><p><strong>3)</strong> <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">2</span>، <span class="math">v<sub>0</sub> = -1</span>؛ <span class="math">v<sub>n</sub> = -2<sup>n</sup></span>؛ <span class="math">S<sub>n</sub> = -2(1 - 1/2<sup>n+1</sup>)</span>.</p><p><strong>4)</strong> <span class="math">u<sub>n</sub> = 2(1/2<sup>n</sup> - 1)</span>؛ <span class="math">lim u<sub>n</sub> = -2</span>؛ <span class="math">S'<sub>n</sub> = 4(1 - 1/2<sup>n+1</sup>) - 2(n+1)</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p><strong>1) ما المطلوب؟</strong> نثبت أن حدود المتتالية تبقى أكبر من <span class="math">-2</span>.</p><p><strong>الفكرة المستعملة:</strong> نستعمل البرهان بالتراجع لأن الخاصية مطلوبة لكل عدد طبيعي.</p><p><strong>التطبيق:</strong> عند <span class="math">n=0</span>: <span class="math">u<sub>0</sub>=0&gt;-2</span>. نفرض أن <span class="math">u<sub>n</sub>&gt;-2</span>. عندئذ:</p><p class="math-equation">u<sub>n+1</sub> + 2 = (1/2)(u<sub>n</sub>-2)+2 = (1/2)(u<sub>n</sub>+2)</p><p>وبما أن <span class="math">u<sub>n</sub>+2&gt;0</span> فإن <span class="math">u<sub>n+1</sub>+2&gt;0</span>، أي <span class="math">u<sub>n+1</sub>&gt;-2</span>.</p><p><strong>النتيجة:</strong> <span class="math">u<sub>n</sub>&gt;-2</span> لكل <span class="math">n∈ℕ</span>.</p>
<p><strong>2) ما المطلوب؟</strong> ندرس اتجاه تغير المتتالية ونستنتج تقاربها.</p><p><strong>الفكرة المستعملة:</strong> نحسب الفرق ونستعمل الحصر السابق، ثم نستعمل مبرهنة الرتابة والحدود.</p><p><strong>التطبيق:</strong></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub> = (1/2)(u<sub>n</sub>-2)-u<sub>n</sub> = -(1/2)(u<sub>n</sub>+2)</p><p>وبما أن <span class="math">u<sub>n</sub>+2&gt;0</span>، فإن <span class="math">u<sub>n+1</sub>-u<sub>n</sub>&lt;0</span>.</p><p><strong>النتيجة:</strong> <span class="math">(u<sub>n</sub>)</span> متناقصة. وبما أنها محدودة من الأسفل بـ <span class="math">-2</span> فهي متقاربة.</p>
<p><strong>3-أ) ما المطلوب؟</strong> نثبت أن <span class="math">(v<sub>n</sub>)</span> هندسية ونكتب حدها العام.</p><p><strong>الفكرة المستعملة:</strong> نحسب العلاقة بين فرقين متتاليين <span class="math">u<sub>n+2</sub>-u<sub>n+1</sub></span> و<span class="math">u<sub>n+1</sub>-u<sub>n</sub></span>.</p><p><strong>التطبيق:</strong> من العلاقة التراجعية:</p><p class="math-equation">u<sub>n+2</sub>-u<sub>n+1</sub> = (1/2)(u<sub>n+1</sub>-2)-[(1/2)(u<sub>n</sub>-2)] = (1/2)(u<sub>n+1</sub>-u<sub>n</sub>)</p><p>إذن:</p><p class="math-equation">v<sub>n+1</sub> = 1/(u<sub>n+2</sub>-u<sub>n+1</sub>) = 2/(u<sub>n+1</sub>-u<sub>n</sub>) = 2v<sub>n</sub></p><p>كما أن:</p><p class="math-equation">v<sub>0</sub> = 1/(u<sub>1</sub>-u<sub>0</sub>) = 1/(-1) = -1</p><p><strong>النتيجة:</strong> <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">2</span> و<span class="math">v<sub>n</sub> = -2<sup>n</sup></span>.</p>
<p><strong>3-ب) ما المطلوب؟</strong> نحسب مجموع <span class="math">1/v_k</span>.</p><p><strong>الفكرة المستعملة:</strong> بما أن <span class="math">v_k=-2^k</span> فإن <span class="math">1/v_k=-(1/2)^k</span>، وهذا مجموع هندسي.</p><p><strong>التطبيق:</strong></p><p class="math-equation">S<sub>n</sub> = -[1+1/2+...+(1/2)^n]</p><p><strong>النتيجة:</strong></p><p class="math-equation">S<sub>n</sub> = -2(1 - 1/2<sup>n+1</sup>)</p>
<p><strong>4-أ) ما المطلوب؟</strong> نبرهن العبارة الصريحة لـ <span class="math">u<sub>n</sub></span> ثم نحسب النهاية.</p><p><strong>الفكرة المستعملة:</strong> نستعمل العلاقة <span class="math">u<sub>n+1</sub>-u<sub>n</sub>=1/v_n</span> ونلاحظ أن مجموع الفروق من <span class="math">0</span> إلى <span class="math">n-1</span> يعطي <span class="math">u_n-u_0</span>.</p><p><strong>التطبيق:</strong> بما أن <span class="math">1/v_k=-(1/2)^k</span>، فإن:</p><p class="math-equation">u<sub>n</sub> = u<sub>0</sub> + Σ<sub>k=0</sub><sup>n-1</sup>(u<sub>k+1</sub>-u<sub>k</sub>) = -[1+1/2+...+(1/2)<sup>n-1</sup>]</p><p class="math-equation">u<sub>n</sub> = -2(1 - 1/2<sup>n</sup>) = 2(1/2<sup>n</sup> - 1)</p><p>وبما أن <span class="math">1/2<sup>n</sup>→0</span>، فإن:</p><p class="math-equation">lim u<sub>n</sub> = -2</p>
<p><strong>4-ب) ما المطلوب؟</strong> نحسب مجموع حدود <span class="math">u_k</span> من <span class="math">0</span> إلى <span class="math">n</span>.</p><p><strong>الفكرة المستعملة:</strong> نعوض العبارة الصريحة <span class="math">u_k=2(1/2^k-1)</span> ثم نجمع الثابت والمجموع الهندسي.</p><p><strong>التطبيق:</strong></p><p class="math-equation">S'<sub>n</sub> = Σ<sub>k=0</sub><sup>n</sup>[2(1/2)<sup>k</sup>-2]</p><p class="math-equation">S'<sub>n</sub> = 2[1+1/2+...+(1/2)^n] - 2(n+1)</p><p><strong>النتيجة:</strong></p><p class="math-equation">S'<sub>n</sub> = 4(1 - 1/2<sup>n+1</sup>) - 2(n+1)</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> أثبتنا الحصر بالتراجع ثم استعملناه لإثبات التناقص والتقارب. بعد ذلك درسنا فروق الحدود بواسطة <span class="math">v_n</span> فحصلنا على متتالية هندسية، ثم استعملنا مجموع الفروق لإيجاد عبارة <span class="math">u_n</span>، وأخيرا حسبنا مجموع الحدود من العبارة الصريحة.</p>
</div>`,
    conceptHints: [
      { title: "الحصر بالتراجع", hint: "بدل مقارنة <span class='math'>u<sub>n+1</sub></span> مباشرة مع -2، احسب <span class='math'>u<sub>n+1</sub>+2</span>. ستجد أنه يساوي نصف <span class='math'>u<sub>n</sub>+2</span>." },
      { title: "رتابة المتتالية", hint: "احسب <span class='math'>u<sub>n+1</sub>-u<sub>n</sub></span>. إذا ظهر <span class='math'>-(1/2)(u<sub>n</sub>+2)</span>، استعمل الحصر السابق لتحديد الإشارة." },
      { title: "المتتالية المساعدة", hint: "احسب الفرق التالي <span class='math'>u<sub>n+2</sub>-u<sub>n+1</sub></span> بدلالة الفرق السابق <span class='math'>u<sub>n+1</sub>-u<sub>n</sub></span>، ثم اقلب العلاقة لأن <span class='math'>v<sub>n</sub></span> معرف بمقلوب الفرق." },
      { title: "حساب المجموع", hint: "بعد كتابة <span class='math'>v<sub>n</sub></span>، حول <span class='math'>1/v<sub>n</sub></span> إلى حد هندسي أساسه <span class='math'>1/2</span> مع إشارة سالبة، ثم استعمل صيغة المجموع الهندسي." },
      { title: "العبارة الصريحة", hint: "استعمل أن <span class='math'>u<sub>n</sub>-u<sub>0</sub></span> يساوي مجموع الفروق <span class='math'>u<sub>k+1</sub>-u<sub>k</sub></span>. وهذه الفروق هي <span class='math'>1/v<sub>k</sub></span>." }
    ],
    solution: `<p><strong>1)</strong> عند <span class="math">n=0</span>: <span class="math">u<sub>0</sub>=0&gt;-2</span>. إذا كان <span class="math">u<sub>n</sub>&gt;-2</span>، فإن:</p><p class="math-equation">u<sub>n+1</sub>+2=(1/2)(u<sub>n</sub>+2)&gt;0</p><p>إذن <span class="math">u<sub>n+1</sub>&gt;-2</span>.</p><p><strong>2)</strong></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=-(1/2)(u<sub>n</sub>+2)&lt;0</p><p>إذن <span class="math">(u<sub>n</sub>)</span> متناقصة، وبما أنها محدودة من الأسفل بـ <span class="math">-2</span> فهي متقاربة.</p><p><strong>3)</strong> لدينا:</p><p class="math-equation">u<sub>n+2</sub>-u<sub>n+1</sub>=(1/2)(u<sub>n+1</sub>-u<sub>n</sub>)</p><p>إذن <span class="math">v<sub>n+1</sub>=2v<sub>n</sub></span>. كما أن <span class="math">v<sub>0</sub>=1/(u<sub>1</sub>-u<sub>0</sub>)=-1</span>، ومنه:</p><p class="math-equation">v<sub>n</sub> = -2<sup>n</sup></p><p>وبالتالي:</p><p class="math-equation">S<sub>n</sub>=1/v<sub>0</sub>+...+1/v<sub>n</sub>=-2(1-1/2<sup>n+1</sup>)</p><p><strong>4)</strong> بما أن <span class="math">u<sub>n+1</sub>-u<sub>n</sub>=1/v<sub>n</sub>=-(1/2)^n</span>، فإن:</p><p class="math-equation">u<sub>n</sub>=-[1+1/2+...+(1/2)<sup>n-1</sup>]=2(1/2<sup>n</sup>-1)</p><p>ومنه <span class="math">lim u<sub>n</sub>=-2</span>. كما أن:</p><p class="math-equation">S'<sub>n</sub>=Σ<sub>k=0</sub><sup>n</sup>[2(1/2)^k-2]=4(1-1/2<sup>n+1</sup>)-2(n+1)</p>`
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
    quickSolution: `<p><strong>1)</strong> <span class="math">u<sub>1</sub> = e</span>، <span class="math">q = e<sup>-1</sup></span>، <span class="math">u<sub>0</sub> = e²</span>؛ <span class="math">u<sub>n</sub> = e<sup>2-n</sup></span>.</p><p><strong>2)</strong> <span class="math">S<sub>n</sub> = e² [1 - e<sup>-(n+1)</sup>]/[1 - e<sup>-1</sup>]</span>.</p><p><strong>3)</strong> <span class="math">v<sub>n</sub> = (e<sup>3-n</sup> - e⁴)/(1 - e)</span>؛ <span class="math">(v<sub>n</sub>)</span> متقاربة.</p><p><strong>4)</strong> <span class="math">(1/e)v<sub>n</sub> = (u<sub>n</sub> - e³)/(1 - e)</span>؛ <span class="math">S'<sub>n</sub> = (1/(1 - e))[S<sub>n</sub> - (n+1)e³]</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p>في هذا التمرين، نستعمل البرهان بالتراجع، متتالية مساعدة، المتتالية الهندسية، حساب النهاية، حساب مجموع حدود، خواص اللوغاريتمات. الهدف هو إثبات خاصية لكل عدد طبيعي <span class="math">n</span> وإيجاد عبارة الحد العام وحساب النهاية وحساب مجموع حدود.</p>
<p class="pedagogy-step">نستعمل تعريف المتتالية الهندسية لأن النسبة بين حدين متتاليين ثابتة.</p>
<p><strong>1)</strong> بما أن <span class="math">(u<sub>n</sub>)</span> هندسية وحدودها موجبة، فإن:</p>
      <p class="math-equation">u<sub>0</sub> × u<sub>2</sub> = u<sub>1</sub>² = e²</p>
      <p>ومنه:</p>
      <p class="math-equation">u<sub>1</sub> = e</p>
      <p>كما أن <span class="math">u<sub>7</sub> = u<sub>1</sub>q<sup>6</sup> = e q<sup>6</sup></span>، وبالتالي:</p>
      <p class="math-equation">ln(u<sub>1</sub>) + ln(u<sub>7</sub>) = 1 + ln(e q<sup>6</sup>) = 2 + 6ln(q) = -4</p>
      <p>فنجد <span class="math">ln(q) = -1</span>، أي <span class="math">q = e<sup>-1</sup></span>.</p>
      <p>وبما أن <span class="math">u<sub>1</sub> = u<sub>0</sub>q = e</span>، فإن <span class="math">u<sub>0</sub> = e²</span>. إذن:</p>
      <p class="math-equation">u<sub>n</sub> = e² × (e<sup>-1</sup>)<sup>n</sup> = e<sup>2-n</sup></p>

<p class="pedagogy-step">نستعمل صيغة مجموع حدود متتالية هندسية أو خاصية التلاصق.</p>
<p><strong>2)</strong> المجموع:</p>
      <p class="math-equation">S<sub>n</sub> = e² × [1 - e<sup>-(n+1)</sup>]/[1 - e<sup>-1</sup>]</p>

<p class="pedagogy-step">نحسب النهاية باستعمال النهايات المرجعية.</p>
<p><strong>3)</strong> بما أن <span class="math">v<sub>n+1</sub> = v<sub>n</sub> + u<sub>n</sub></span> و <span class="math">v<sub>0</sub> = e³</span>، فإن:</p>
      <p class="math-equation">v<sub>n</sub> = e³ + u<sub>0</sub> + u<sub>1</sub> + ... + u<sub>n-1</sub> = (e<sup>3-n</sup> - e⁴)/(1 - e)</p>
      <p>ومنه:</p>
      <p class="math-equation">lim v<sub>n</sub> = e⁴/(e - 1)</p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> متقاربة.</p>

<p class="pedagogy-step">نستعمل صيغة مجموع حدود متتالية هندسية أو خاصية التلاصق.</p>
<p><strong>4)</strong> نتحقق من أن:</p>
      <p class="math-equation">(1/e)v<sub>n</sub> = (e<sup>2-n</sup> - e³)/(1 - e) = (u<sub>n</sub> - e³)/(1 - e)</p>
      <p>وبجمع هذه العلاقة من <span class="math">k = 0</span> إلى <span class="math">n</span> نحصل على:</p>
      <p class="math-equation">S'<sub>n</sub> = (1/(1 - e)) × [S<sub>n</sub> - (n + 1)e³]</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نتبع الترتيب التالي: البرهان بالتراجع، استعمال متتالية مساعدة، حساب النهاية، حساب المجموع، ونكتب النتيجة النهائية في كل جزء.</p>
</div>`,
    conceptHints: [
      {
        "title": "الحصر بالتراجع",
        "hint": "تحقق من n=0، ثم افترض أن u_n داخل المجال، واستعمل علاقة u_{n+1}=f(u_n) أو صورة المجال بالدالة لإثبات بقاء u_{n+1} داخل نفس المجال."
      },
      {
        "title": "المتتالية المساعدة",
        "hint": "عرف v_n حتى نحول العلاقة التراجعية إلى علاقة هندسية بسيطة، ثم أثبت ذلك بحساب النسبة v_{n+1}/v_n."
      },
      {
        "title": "حساب النهاية",
        "hint": "استعمل العبارة الصريحة أو الحصر أو حقيقة أن q^n يؤول إلى 0 عندما |q|<1 لاستنتاج النهاية."
      },
      {
        "title": "حساب المجموع",
        "hint": "حدد نوع الحدود (هندسية، متداخلة، لوغاريتمية) ثم استعمل الصيغة المناسبة للمجموع."
      },
      {
        "title": "اللوغاريتمات",
        "hint": "استعمل خاصية ln(ab)=ln a+ln b وln(a^k)=k ln a لتبسيط المجاميع والجداوي."
      }
    ],
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
    quickSolution: `<p><strong>1)</strong> <span class="math">(u<sub>n</sub>)</span> حسابية، <span class="math">r = -4</span>، <span class="math">u<sub>0</sub> = 3</span>.</p><p><strong>2)</strong> a) <span class="math">S<sub>n</sub> = -2n² + n + 3</span> &nbsp; b) <span class="math">n = 123</span>.</p><p><strong>3)</strong> a) <span class="math">v<sub>n</sub> = e<sup>-4n+3</sup> = e³(e<sup>-4</sup>)<sup>n</sup></span> &nbsp; b) <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">e<sup>-4</sup></span>.</p><p><strong>4)</strong> <span class="math">S'<sub>n</sub> = -2n² + n + 3 - ln(n + 2)</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p>في هذا التمرين، نستعمل دراسة الرتابة بإشارة الفرق، متتالية مساعدة، المتتالية الحسابية، المتتالية الهندسية، حساب مجموع حدود، خواص اللوغاريتمات. الهدف هو دراسة اتجاه تغير المتتالية وإيجاد عبارة الحد العام وحساب مجموع حدود.</p>
<p class="pedagogy-step">نستعمل دراسة إشارة الفرق <span class="math">u<sub>n+1</sub> - u<sub>n</sub></span> أو إشارة <span class="math">f(x) - x</span> لأن المطلوب اتجاه التغير؛ نستعمل تعريف المتتالية الحسابية لأن الفرق بين حدين متتاليين ثابت.</p>
<p><strong>1)</strong> لدينا:</p>
      <p class="math-equation">u<sub>n+1</sub> - u<sub>n</sub> = -4</p>
      <p>إذن <span class="math">(u<sub>n</sub>)</span> متتالية حسابية أساسها <span class="math">r = -4</span> وحدها الأول <span class="math">u<sub>0</sub> = 3</span>.</p>

<p class="pedagogy-step">نستعمل صيغة مجموع حدود متتالية هندسية أو خاصية التلاصق.</p>
<p><strong>2)</strong> <strong>أ)</strong> المجموع:</p>
      <p class="math-equation">S<sub>n</sub> = (n + 1)(u<sub>0</sub> + u<sub>n</sub>)/2 = (n + 1)(6 - 4n)/2 = (n + 1)(3 - 2n) = -2n² + n + 3</p>

<p class="pedagogy-step">نستعمل صيغة مجموع حدود متتالية هندسية أو خاصية التلاصق.</p>
<p><strong>ب)</strong> لحل <span class="math">S<sub>n</sub> = -30132</span>:</p>
      <p class="math-equation">-2n² + n + 3 = -30132</p>
      <p>أي:</p>
      <p class="math-equation">2n² - n - 30135 = 0</p>
      <p>المعادلة تقبل الحل <span class="math">n = 123</span>.</p>

<p class="pedagogy-step">نعرف متتالية مساعدة حتى نحول العلاقة التراجعية إلى علاقة هندسية بسيطة.</p>
<p><strong>3)</strong> بما أن <span class="math">u<sub>n</sub> = ln(v<sub>n</sub>)</span>، فإن:</p>
      <p class="math-equation">v<sub>n</sub> = e<sup>u<sub>n</sub></sup> = e<sup>-4n+3</sup> = e³ × (e<sup>-4</sup>)<sup>n</sup></p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">e<sup>-4</sup></span>.</p>

<p class="pedagogy-step">نستعمل خواص اللوغاريتمات لحساب المجموع.</p>
<p><strong>4)</strong> لدينا:</p>
      <p class="math-equation">ln[v<sub>k</sub>(1 - 1/(k + 2))] = ln(v<sub>k</sub>) + ln((k + 1)/(k + 2)) = u<sub>k</sub> + ln((k + 1)/(k + 2))</p>
      <p>وبجمع الحدود من <span class="math">k = 0</span> إلى <span class="math">n</span>:</p>
      <p class="math-equation">S'<sub>n</sub> = S<sub>n</sub> + ln(1/(n + 2)) = -2n² + n + 3 - ln(n + 2)</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نتبع الترتيب التالي: دراسة الرتابة، استعمال متتالية مساعدة، حساب المجموع، ونكتب النتيجة النهائية في كل جزء.</p>
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
    year: "2012",
    title: "بكالوريا 2012 - الموضوع الثاني - علوم تجريبية",
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
    quickSolution: `<p><strong>1)</strong> <span class="math">u<sub>n</sub> &lt; 3</span> لكل <span class="math">n</span>؛ <span class="math">(u<sub>n</sub>)</span> متزايدة تماما ومقاربة.</p><p><strong>2)</strong> a) <span class="math">v<sub>0</sub> = 9</span>؛ <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">3/8</span> &nbsp; b) <span class="math">v<sub>n</sub> = 9(3/8)<sup>n</sup></span>؛ <span class="math">u<sub>n</sub> = 3 - 3(3/8)<sup>n</sup></span> &nbsp; c) <span class="math">lim u<sub>n</sub> = 3</span>.</p><p><strong>3)</strong> <span class="math">P<sub>n</sub> = 3<sup>n+1</sup> (3/8)<sup>n(n+1)/2</sup></span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p>في هذا التمرين، نستعمل دراسة تغير الدالة بالمشتقة، البرهان بالتراجع، دراسة الرتابة بإشارة الفرق، متتالية مساعدة، المتتالية الهندسية، حساب النهاية، حساب جداء حدود. الهدف هو إثبات خاصية لكل عدد طبيعي <span class="math">n</span> ودراسة اتجاه تغير المتتالية وإيجاد عبارة الحد العام وحساب النهاية.</p>
<p class="pedagogy-step">نستعمل الحصر بالتراجع على ثلاث مراحل: التحقق عند <span class="math">n = 0</span>، ثم فرضية التراجع، ثم الانتقال من <span class="math">n</span> إلى <span class="math">n + 1</span>؛ ثم ندرس الرتابة بإشارة الفرق <span class="math">u<sub>n+1</sub> - u<sub>n</sub></span> وليس بالتخمين البياني فقط؛ نحسب النهاية باستعمال النهايات المرجعية.</p>
<p><strong>1)</strong> <strong>برهان بالتراجع:</strong> عند <span class="math">n = 0</span>، لدينا <span class="math">u<sub>0</sub> = 0 < 3</span>.</p>
      <p>نفترض أن <span class="math">u<sub>n</sub> < 3</span>. فإن:</p>
      <p class="math-equation">u<sub>n+1</sub> = (3/8)(u<sub>n</sub> + 5) < (3/8) × 8 = 3</p>
      <p>إذن الخاصية تثبت بالتراجع.</p>
      <p>كما أن:</p>
      <p class="math-equation">u<sub>n+1</sub> - u<sub>n</sub> = (3/8)(u<sub>n</sub> + 5) - u<sub>n</sub> = (15 - 5u<sub>n</sub>)/8 = 5(3 - u<sub>n</sub>)/8 > 0</p>
      <p>إذن <span class="math">(u<sub>n</sub>)</span> متزايدة تماما. وهي محدودة من الأعلى بـ 3، فتكون متقاربة.</p>

<p class="pedagogy-step">نعرف متتالية مساعدة حتى نحول العلاقة التراجعية إلى علاقة هندسية بسيطة؛ بعد إيجاد العبارة الصريحة، نستعمل نهاية المتتالية الهندسية <span class="math">q<sup>n</sup></span> لحساب النهاية.</p>
<p><strong>2)</strong> لدينا <span class="math">v<sub>0</sub> = 3(3 - 0) = 9</span>. وبالحساب:</p>
      <p class="math-equation">v<sub>n+1</sub> = 3(3 - u<sub>n+1</sub>) = (3/8) × 3(3 - u<sub>n</sub>) = (3/8)v<sub>n</sub></p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">3/8</span>، وبالتالي:</p>
      <p class="math-equation">v<sub>n</sub> = 9(3/8)<sup>n</sup></p>
      <p>وبما أن <span class="math">v<sub>n</sub> = 3(3 - u<sub>n</sub>)</span>، فإن:</p>
      <p class="math-equation">u<sub>n</sub> = 3 - 3(3/8)<sup>n</sup></p>
      <p>ومنه:</p>
      <p class="math-equation">lim u<sub>n</sub> = 3</p>

<p class="pedagogy-step">نستعمل عبارة الحدود وخواص الأسس لحساب الجداء.</p>
<p><strong>3)</strong> لدينا <span class="math">3 - u<sub>k</sub> = v<sub>k</sub>/3 = 3(3/8)<sup>k</sup></span>، إذن:</p>
      <p class="math-equation">P<sub>n</sub> = ∏<sub>k=0</sub><sup>n</sup> 3(3/8)<sup>k</sup> = 3<sup>n+1</sup> × (3/8)<sup>n(n+1)/2</sup></p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نتبع الترتيب التالي: دراسة الدالة، البرهان بالتراجع، دراسة الرتابة، استعمال متتالية مساعدة، حساب النهاية، حساب الجداء، ونكتب النتيجة النهائية في كل جزء.</p>
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
    quickSolution: `<p><strong>1)</strong> إذا <span class="math">α = -4</span>، فإن <span class="math">u<sub>n</sub> = -4</span> لكل <span class="math">n</span>.</p><p><strong>2)</strong> a) <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">3/4</span> &nbsp; b) <span class="math">u<sub>n</sub> = (α + 4)(3/4)<sup>n</sup> - 4</span>؛ <span class="math">(u<sub>n</sub>)</span> متقاربة نحو <span class="math">-4</span> &nbsp; c) <span class="math">S<sub>n</sub> = 4(α + 4)[1 - (3/4)<sup>n+1</sup>] - 4(n+1)</span>؛ <span class="math">lim S<sub>n</sub> = -∞</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p>في هذا التمرين، نستعمل البرهان بالتراجع، متتالية مساعدة، المتتالية الهندسية، حساب النهاية، حساب مجموع حدود. الهدف هو إثبات خاصية لكل عدد طبيعي <span class="math">n</span> وإيجاد عبارة الحد العام وحساب النهاية وحساب مجموع حدود.</p>
<p class="pedagogy-step">نستعمل البرهان بالتراجع على ثلاث مراحل: التحقق عند <span class="math">n = 0</span>، ثم فرضية التراجع، ثم الانتقال من <span class="math">n</span> إلى <span class="math">n + 1</span>.</p>
<p><strong>1)</strong> إذا كان <span class="math">α = -4</span>، فإن <span class="math">u<sub>0</sub> = -4</span>.</p>
      <p>نفترض أن <span class="math">u<sub>n</sub> = -4</span>. فإن:</p>
      <p class="math-equation">u<sub>n+1</sub> = (3/4)(-4) - 1 = -4</p>
      <p>إذن الخاصية تثبت بالتراجع.</p>

<p class="pedagogy-step">نعرف متتالية مساعدة حتى نحول العلاقة التراجعية إلى علاقة هندسية بسيطة؛ بعد إيجاد العبارة الصريحة، نستعمل نهاية المتتالية الهندسية <span class="math">q<sup>n</sup></span> لحساب النهاية.</p>
<p><strong>2)</strong> نضع <span class="math">v<sub>n</sub> = u<sub>n</sub> + 4</span>. فإن:</p>
      <p class="math-equation">v<sub>n+1</sub> = u<sub>n+1</sub> + 4 = (3/4)u<sub>n</sub> + 3 = (3/4)(u<sub>n</sub> + 4) = (3/4)v<sub>n</sub></p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">3/4</span> وحدها الأول <span class="math">v<sub>0</sub> = α + 4</span>. وبالتالي:</p>
      <p class="math-equation">v<sub>n</sub> = (α + 4)(3/4)<sup>n</sup></p>
      <p>ومنه:</p>
      <p class="math-equation">u<sub>n</sub> = (α + 4)(3/4)<sup>n</sup> - 4</p>
      <p>وبما أن <span class="math">(3/4)<sup>n</sup></span> يؤول إلى 0، فإن:</p>
      <p class="math-equation">lim u<sub>n</sub> = -4</p>
      <p>إذن <span class="math">(u<sub>n</sub>)</span> متقاربة.</p>

<p class="pedagogy-step">نحسب النهاية باستعمال النهايات المرجعية؛ نستعمل صيغة مجموع حدود متتالية هندسية أو خاصية التلاصق.</p>
<p><strong>3)</strong> لدينا:</p>
      <p class="math-equation">S<sub>n</sub> = Σ<sub>k=0</sub><sup>n</sup> [(α + 4)(3/4)<sup>k</sup> - 4]</p>
      <p>أي:</p>
      <p class="math-equation">S<sub>n</sub> = 4(α + 4)[1 - (3/4)<sup>n+1</sup>] - 4(n + 1)</p>
      <p>وبما أن <span class="math">-4(n + 1)</span> يؤول إلى <span class="math">-∞</span>، فإن:</p>
      <p class="math-equation">lim S<sub>n</sub> = -∞</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نتبع الترتيب التالي: البرهان بالتراجع، استعمال متتالية مساعدة، حساب النهاية، حساب المجموع، ونكتب النتيجة النهائية في كل جزء.</p>
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
    quickSolution: `<p><strong>1)</strong> <span class="math">u<sub>1</sub> = 3</span>، <span class="math">u<sub>2</sub> = 10</span>؛ التخمين: <span class="math">(u<sub>n</sub>)</span> متزايدة.</p><p><strong>2)</strong> a) <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">3</span>، <span class="math">v<sub>0</sub> = 1</span> &nbsp; b) <span class="math">v<sub>n</sub> = 3<sup>n</sup></span>؛ <span class="math">u<sub>n</sub> = 3<sup>n</sup> + n - 1</span> &nbsp; c) <span class="math">(u<sub>n</sub>)</span> متزايدة تماما.</p><p><strong>3)</strong> a) <span class="math">S<sub>n</sub> = 1/2(3<sup>n+1</sup> + n² - n - 3)</span> &nbsp; b) <span class="math">lim S<sub>n</sub> = +∞</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p>في هذا التمرين، نستعمل دراسة تغير الدالة بالمشتقة، دراسة الرتابة بإشارة الفرق، متتالية مساعدة، المتتالية الهندسية، حساب النهاية، حساب مجموع حدود. الهدف هو دراسة اتجاه تغير المتتالية وإيجاد عبارة الحد العام وحساب النهاية وحساب مجموع حدود.</p>
<p class="pedagogy-step">نستعمل دراسة إشارة الفرق <span class="math">u<sub>n+1</sub> - u<sub>n</sub></span> أو إشارة <span class="math">f(x) - x</span> لأن المطلوب اتجاه التغير.</p>
<p><strong>1)</strong> بالتعويض المباشر:</p>
      <p class="math-equation">u<sub>1</sub> = 3 &nbsp; و &nbsp; u<sub>2</sub> = 10</p>
      <p>نخمن أن <span class="math">(u<sub>n</sub>)</span> متزايدة.</p>

<p class="pedagogy-step">نستعمل دراسة إشارة الفرق <span class="math">u<sub>n+1</sub> - u<sub>n</sub></span> أو إشارة <span class="math">f(x) - x</span> لأن المطلوب اتجاه التغير؛ نعرف متتالية مساعدة حتى نحول العلاقة التراجعية إلى علاقة هندسية بسيطة.</p>
<p><strong>2)</strong> نضع <span class="math">v<sub>n</sub> = u<sub>n</sub> - n + 1</span>. فإن:</p>
      <p class="math-equation">v<sub>n+1</sub> = u<sub>n+1</sub> - (n + 1) + 1 = 3u<sub>n</sub> - 2n + 3 - n = 3u<sub>n</sub> - 3n + 3 = 3v<sub>n</sub></p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">3</span> وحدها الأول <span class="math">v<sub>0</sub> = 1</span>. وبالتالي:</p>
      <p class="math-equation">v<sub>n</sub> = 3<sup>n</sup></p>
      <p>ومنه:</p>
      <p class="math-equation">u<sub>n</sub> = 3<sup>n</sup> + n - 1</p>
      <p>إذن:</p>
      <p class="math-equation">u<sub>n+1</sub> - u<sub>n</sub> = 2 × 3<sup>n</sup> + 1 > 0</p>
      <p>فالمتتالية متزايدة تماما.</p>

<p class="pedagogy-step">نحسب النهاية باستعمال النهايات المرجعية؛ نستعمل صيغة مجموع حدود متتالية هندسية أو خاصية التلاصق.</p>
<p><strong>3)</strong> المجموع:</p>
      <p class="math-equation">S<sub>n</sub> = Σ<sub>k=0</sub><sup>n</sup> (3<sup>k</sup> + k - 1) = (3<sup>n+1</sup> - 1)/2 + n(n + 1)/2 - (n + 1)</p>
      <p>أي:</p>
      <p class="math-equation">S<sub>n</sub> = 1/2 × (3<sup>n+1</sup> + n² - n - 3)</p>
      <p>وبالتالي:</p>
      <p class="math-equation">lim S<sub>n</sub> = +∞</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نتبع الترتيب التالي: دراسة الدالة، دراسة الرتابة، استعمال متتالية مساعدة، حساب النهاية، حساب المجموع، ونكتب النتيجة النهائية في كل جزء.</p>
</div>`,
    solution: `<p><strong>1)</strong> بالتعويض المباشر:</p>
      <p class="math-equation">u<sub>1</sub> = 3 &nbsp; و &nbsp; u<sub>2</sub> = 10</p>
      <p>نخمن أن <span class="math">(u<sub>n</sub>)</span> متزايدة.</p>
      <p><strong>2)</strong> نضع <span class="math">v<sub>n</sub> = u<sub>n</sub> - n + 1</span>. فإن:</p>
      <p class="math-equation">v<sub>n+1</sub> = u<sub>n+1</sub> - (n + 1) + 1 = 3u<sub>n</sub> - 2n + 3 - n = 3u<sub>n</sub> - 3n + 3 = 3v<sub>n</sub></p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">3</span> وحدها الأول <span class="math">v<sub>0</sub> = 1</span>. وبالتالي:</p>
      <p class="math-equation">v<sub>n</sub> = 3<sup>n</sup></p>
      <p>ومنه:</p>
      <p class="math-equation">u<sub>n</sub> = 3<sup>n</sup> + n - 1</p>
      <p>إذن:</p>
      <p class="math-equation">u<sub>n+1</sub> - u<sub>n</sub> = 2 × 3<sup>n</sup> + 1 > 0</p>
      <p>فالمتتالية متزايدة تماما.</p>
      <p><strong>3)</strong> المجموع:</p>
      <p class="math-equation">S<sub>n</sub> = Σ<sub>k=0</sub><sup>n</sup> (3<sup>k</sup> + k - 1) = (3<sup>n+1</sup> - 1)/2 + n(n + 1)/2 - (n + 1)</p>
      <p>أي:</p>
      <p class="math-equation">S<sub>n</sub> = 1/2 × (3<sup>n+1</sup> + n² - n - 3)</p>
      <p>وبالتالي:</p>
      <p class="math-equation">lim S<sub>n</sub> = +∞</p>`
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
    quickSolution: `<p><strong>1)</strong> <span class="math">u<sub>n</sub> &gt; 1</span> لكل <span class="math">n</span>؛ <span class="math">(u<sub>n</sub>)</span> متناقصة تماما ومقاربة.</p><p><strong>2)</strong> <span class="math">(v<sub>n</sub>)</span> حسابية أساسها <span class="math">-ln 5</span>، <span class="math">v<sub>0</sub> = ln 12</span>.</p><p><strong>3)</strong> <span class="math">v<sub>n</sub> = ln(12/5<sup>n</sup>)</span>؛ <span class="math">u<sub>n</sub> = 1 + 12/5<sup>n</sup></span>؛ <span class="math">lim u<sub>n</sub> = 1</span>.</p><p><strong>4)</strong> <span class="math">∏(u<sub>k</sub> - 1) = 12<sup>n+1</sup>/5<sup>n(n+1)/2</sup></span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p>في هذا التمرين، نستعمل البرهان بالتراجع، دراسة الرتابة بإشارة الفرق، متتالية مساعدة، المتتالية الحسابية، حساب النهاية، خواص اللوغاريتمات، حساب جداء حدود. الهدف هو إثبات خاصية لكل عدد طبيعي <span class="math">n</span> ودراسة اتجاه تغير المتتالية وإيجاد عبارة الحد العام وحساب النهاية.</p>
<p class="pedagogy-step">نستعمل الحصر بالتراجع على ثلاث مراحل: التحقق عند <span class="math">n = 0</span>، ثم فرضية التراجع، ثم الانتقال من <span class="math">n</span> إلى <span class="math">n + 1</span>؛ ثم ندرس الرتابة بإشارة الفرق <span class="math">u<sub>n+1</sub> - u<sub>n</sub></span> وليس بالتخمين البياني فقط؛ نحسب النهاية باستعمال النهايات المرجعية.</p>
<p><strong>1)</strong> <strong>برهان بالتراجع:</strong> عند <span class="math">n = 0</span>، لدينا <span class="math">u<sub>0</sub> = 13 > 1</span>.</p>
      <p>نفترض أن <span class="math">u<sub>n</sub> > 1</span>. فإن:</p>
      <p class="math-equation">u<sub>n+1</sub> - 1 = (1/5)u<sub>n</sub> + 4/5 - 1 = (u<sub>n</sub> - 1)/5 > 0</p>
      <p>إذن الخاصية تثبت بالتراجع.</p>
      <p>كما أن:</p>
      <p class="math-equation">u<sub>n+1</sub> - u<sub>n</sub> = (4/5)(1 - u<sub>n</sub>) < 0</p>
      <p>إذن <span class="math">(u<sub>n</sub>)</span> متناقصة تماما ومحدودة من الأسفل بـ 1، فهي متقاربة.</p>

<p class="pedagogy-step">نعرف متتالية مساعدة حتى نحول العلاقة التراجعية إلى علاقة هندسية بسيطة.</p>
<p><strong>2)</strong> لدينا:</p>
      <p class="math-equation">v<sub>n+1</sub> = ln(u<sub>n+1</sub> - 1) = ln((u<sub>n</sub> - 1)/5) = ln(u<sub>n</sub> - 1) - ln 5 = v<sub>n</sub> - ln 5</p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> حسابية أساسها <span class="math">-ln 5</span> وحدها الأول <span class="math">v<sub>0</sub> = ln 12</span>. وبالتالي:</p>
      <p class="math-equation">v<sub>n</sub> = ln 12 - n ln 5 = ln(12/5<sup>n</sup>)</p>

<p class="pedagogy-step">نحسب النهاية باستعمال النهايات المرجعية.</p>
<p><strong>3)</strong> من <span class="math">v<sub>n</sub> = ln(u<sub>n</sub> - 1)</span> نستنتج:</p>
      <p class="math-equation">u<sub>n</sub> - 1 = 12/5<sup>n</sup></p>
      <p>أي:</p>
      <p class="math-equation">u<sub>n</sub> = 1 + 12/5<sup>n</sup></p>
      <p>ومنه:</p>
      <p class="math-equation">lim u<sub>n</sub> = 1</p>

<p class="pedagogy-step">نستعمل عبارة الحدود وخواص الأسس لحساب الجداء.</p>
<p><strong>4)</strong> الجداء:</p>
      <p class="math-equation">(u<sub>0</sub> - 1)(u<sub>1</sub> - 1) × ... × (u<sub>n</sub> - 1) = ∏<sub>k=0</sub><sup>n</sup> (12/5<sup>k</sup>) = 12<sup>n+1</sup>/5<sup>n(n+1)/2</sup></p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نتبع الترتيب التالي: البرهان بالتراجع، دراسة الرتابة، استعمال متتالية مساعدة، حساب النهاية، حساب الجداء، ونكتب النتيجة النهائية في كل جزء.</p>
</div>`,
    solution: `<p><strong>1)</strong> <strong>برهان بالتراجع:</strong> عند <span class="math">n = 0</span>، لدينا <span class="math">u<sub>0</sub> = 13 > 1</span>.</p>
      <p>نفترض أن <span class="math">u<sub>n</sub> > 1</span>. فإن:</p>
      <p class="math-equation">u<sub>n+1</sub> - 1 = (1/5)u<sub>n</sub> + 4/5 - 1 = (u<sub>n</sub> - 1)/5 > 0</p>
      <p>إذن الخاصية تثبت بالتراجع.</p>
      <p>كما أن:</p>
      <p class="math-equation">u<sub>n+1</sub> - u<sub>n</sub> = (4/5)(1 - u<sub>n</sub>) < 0</p>
      <p>إذن <span class="math">(u<sub>n</sub>)</span> متناقصة تماما ومحدودة من الأسفل بـ 1، فهي متقاربة.</p>
      <p><strong>2)</strong> لدينا:</p>
      <p class="math-equation">v<sub>n+1</sub> = ln(u<sub>n+1</sub> - 1) = ln((u<sub>n</sub> - 1)/5) = ln(u<sub>n</sub> - 1) - ln 5 = v<sub>n</sub> - ln 5</p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> حسابية أساسها <span class="math">-ln 5</span> وحدها الأول <span class="math">v<sub>0</sub> = ln 12</span>. وبالتالي:</p>
      <p class="math-equation">v<sub>n</sub> = ln 12 - n ln 5 = ln(12/5<sup>n</sup>)</p>
      <p><strong>3)</strong> من <span class="math">v<sub>n</sub> = ln(u<sub>n</sub> - 1)</span> نستنتج:</p>
      <p class="math-equation">u<sub>n</sub> - 1 = 12/5<sup>n</sup></p>
      <p>أي:</p>
      <p class="math-equation">u<sub>n</sub> = 1 + 12/5<sup>n</sup></p>
      <p>ومنه:</p>
      <p class="math-equation">lim u<sub>n</sub> = 1</p>
      <p><strong>4)</strong> الجداء:</p>
      <p class="math-equation">(u<sub>0</sub> - 1)(u<sub>1</sub> - 1) × ... × (u<sub>n</sub> - 1) = ∏<sub>k=0</sub><sup>n</sup> (12/5<sup>k</sup>) = 12<sup>n+1</sup>/5<sup>n(n+1)/2</sup></p>`
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
    quickSolution: `<p><strong>1)</strong> <span class="math">f</span> متزايدة تماما على <span class="math">[4, 7[</span>؛ <span class="math">f(x) ∈ [4, 7[</span>.</p><p><strong>2)</strong> <span class="math">f(x) - x = (-x² + 9x - 14)/(x - 4 + √(x+2))</span>؛ <span class="math">f(x) - x &gt; 0</span> على <span class="math">[4, 7[</span>.</p><p><strong>3)</strong> a) <span class="math">4 ≤ u<sub>n</sub> &lt; 7</span> لكل <span class="math">n</span> &nbsp; b) <span class="math">(u<sub>n</sub>)</span> متزايدة تماما ومقاربة.</p><p><strong>4)</strong> a) <span class="math">7 - u<sub>n+1</sub> &lt; (1/4)(7 - u<sub>n</sub>)</span> &nbsp; b) <span class="math">0 &lt; 7 - u<sub>n</sub> &lt; 3(1/4)<sup>n</sup></span>؛ <span class="math">lim u<sub>n</sub> = 7</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p>في هذا التمرين، نستعمل دراسة تغير الدالة بالمشتقة، البرهان بالتراجع، دراسة الرتابة بإشارة الفرق، حساب النهاية. الهدف هو إثبات خاصية لكل عدد طبيعي <span class="math">n</span> ودراسة اتجاه تغير المتتالية وحساب النهاية.</p>
<p class="pedagogy-step">نستعمل المشتقة لدراسة تغير الدالة وصورة المجال؛ نستعمل دراسة إشارة الفرق <span class="math">u<sub>n+1</sub> - u<sub>n</sub></span> أو إشارة <span class="math">f(x) - x</span> لأن المطلوب اتجاه التغير؛ نحسب النهاية باستعمال النهايات المرجعية.</p>
<p><strong>1)</strong> الدالة <span class="math">f</span> مشتقة على <span class="math">[4, 7[</span> و:</p>
      <p class="math-equation">f'(x) = 1/(2√(x + 2)) > 0</p>
      <p>إذن <span class="math">f</span> متزايدة تماما. وبما أن <span class="math">f(4) = √6 + 4 > 4</span> و <span class="math">lim<sub>x→7⁻</sub> f(x) = 7</span>، فإن:</p>
      <p class="math-equation">f(x) ∈ [4, 7[</p>

<p class="pedagogy-step">نستعمل دراسة إشارة الفرق <span class="math">u<sub>n+1</sub> - u<sub>n</sub></span> أو إشارة <span class="math">f(x) - x</span> لأن المطلوب اتجاه التغير.</p>
<p><strong>2)</strong> لدينا <span class="math">f(x) - x = √(x + 2) + 4 - x</span>. بالضرب في المرافق نحصل على الصيغة المعطاة. وبما أن:</p>
      <p class="math-equation">-x² + 9x - 14 = -(x - 7)(x - 2) > 0</p>
      <p>على <span class="math">[4, 7[</span> والمقام موجب، فإن <span class="math">f(x) - x > 0</span>.</p>

<p class="pedagogy-step">نستعمل الحصر بالتراجع على ثلاث مراحل: التحقق عند <span class="math">n = 0</span>، ثم فرضية التراجع، ثم الانتقال من <span class="math">n</span> إلى <span class="math">n + 1</span>؛ ثم ندرس الرتابة بإشارة الفرق <span class="math">u<sub>n+1</sub> - u<sub>n</sub></span> وليس بالتخمين البياني فقط؛ نحسب النهاية باستعمال الحصر بين متتاليتين لهما نفس النهاية.</p>
<p><strong>3)</strong> <strong>برهان بالتراجع:</strong> عند <span class="math">n = 0</span>، لدينا <span class="math">u<sub>0</sub> = 4</span>.</p>
      <p>نفترض أن <span class="math">4 ≤ u<sub>n</sub> < 7</span>. فبما أن <span class="math">f</span> متزايدة و <span class="math">f([4, 7[) = [4, 7[</span>، فإن <span class="math">u<sub>n+1</sub> ∈ [4, 7[</span>.</p>
      <p>كما أن <span class="math">u<sub>n+1</sub> - u<sub>n</sub> = f(u<sub>n</sub>) - u<sub>n</sub> > 0</span>، إذن <span class="math">(u<sub>n</sub>)</span> متزايدة ومحدودة من الأعلى بـ 7، فهي متقاربة.</p>

<p class="pedagogy-step">نستعمل البرهان بالتراجع على ثلاث مراحل: التحقق عند <span class="math">n = 0</span>، ثم فرضية التراجع، ثم الانتقال من <span class="math">n</span> إلى <span class="math">n + 1</span>؛ نحسب النهاية باستعمال النهايات المرجعية.</p>
<p><strong>4)</strong> لدينا:</p>
      <p class="math-equation">7 - u<sub>n+1</sub> = 7 - √(u<sub>n</sub> + 2) - 4 = 3 - √(u<sub>n</sub> + 2) = (7 - u<sub>n</sub>)/(3 + √(u<sub>n</sub> + 2))</p>
      <p>وبما أن <span class="math">√(u<sub>n</sub> + 2) > 0</span>، فإن:</p>
      <p class="math-equation">7 - u<sub>n+1</sub> < (1/4)(7 - u<sub>n</sub>)</p>
      <p>وبالتراجع:</p>
      <p class="math-equation">0 < 7 - u<sub>n</sub> < 3(1/4)<sup>n</sup></p>
      <p>ومنه <span class="math">lim (7 - u<sub>n</sub>) = 0</span>، وبالتالي:</p>
      <p class="math-equation">lim u<sub>n</sub> = 7</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نتبع الترتيب التالي: دراسة الدالة، البرهان بالتراجع، دراسة الرتابة، حساب النهاية، ونكتب النتيجة النهائية في كل جزء.</p>
</div>`,
    solution: `<p><strong>1)</strong> الدالة <span class="math">f</span> مشتقة على <span class="math">[4, 7[</span> و:</p>
      <p class="math-equation">f'(x) = 1/(2√(x + 2)) > 0</p>
      <p>إذن <span class="math">f</span> متزايدة تماما. وبما أن <span class="math">f(4) = √6 + 4 > 4</span> و <span class="math">lim<sub>x→7⁻</sub> f(x) = 7</span>، فإن:</p>
      <p class="math-equation">f(x) ∈ [4, 7[</p>
      <p><strong>2)</strong> لدينا <span class="math">f(x) - x = √(x + 2) + 4 - x</span>. بالضرب في المرافق نحصل على الصيغة المعطاة. وبما أن:</p>
      <p class="math-equation">-x² + 9x - 14 = -(x - 7)(x - 2) > 0</p>
      <p>على <span class="math">[4, 7[</span> والمقام موجب، فإن <span class="math">f(x) - x > 0</span>.</p>
      <p><strong>3)</strong> <strong>برهان بالتراجع:</strong> عند <span class="math">n = 0</span>، لدينا <span class="math">u<sub>0</sub> = 4</span>.</p>
      <p>نفترض أن <span class="math">4 ≤ u<sub>n</sub> < 7</span>. فبما أن <span class="math">f</span> متزايدة و <span class="math">f([4, 7[) = [4, 7[</span>، فإن <span class="math">u<sub>n+1</sub> ∈ [4, 7[</span>.</p>
      <p>كما أن <span class="math">u<sub>n+1</sub> - u<sub>n</sub> = f(u<sub>n</sub>) - u<sub>n</sub> > 0</span>، إذن <span class="math">(u<sub>n</sub>)</span> متزايدة ومحدودة من الأعلى بـ 7، فهي متقاربة.</p>
      <p><strong>4)</strong> لدينا:</p>
      <p class="math-equation">7 - u<sub>n+1</sub> = 7 - √(u<sub>n</sub> + 2) - 4 = 3 - √(u<sub>n</sub> + 2) = (7 - u<sub>n</sub>)/(3 + √(u<sub>n</sub> + 2))</p>
      <p>وبما أن <span class="math">√(u<sub>n</sub> + 2) > 0</span>، فإن:</p>
      <p class="math-equation">7 - u<sub>n+1</sub> < (1/4)(7 - u<sub>n</sub>)</p>
      <p>وبالتراجع:</p>
      <p class="math-equation">0 < 7 - u<sub>n</sub> < 3(1/4)<sup>n</sup></p>
      <p>ومنه <span class="math">lim (7 - u<sub>n</sub>) = 0</span>، وبالتالي:</p>
      <p class="math-equation">lim u<sub>n</sub> = 7</p>`
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
    quickSolution: `<p><strong>1)</strong> <span class="math">u<sub>n</sub> &gt; -2</span> لكل <span class="math">n</span>؛ <span class="math">(u<sub>n</sub>)</span> متناقصة تماما ومقاربة.</p><p><strong>2)</strong> <span class="math">(v<sub>n</sub>)</span> حسابية أساسها <span class="math">1/3</span>، <span class="math">v<sub>0</sub> = 1/3</span>.</p><p><strong>3)</strong> <span class="math">v<sub>n</sub> = (n+1)/3</span>؛ <span class="math">u<sub>n</sub> = 3/(n+1) - 2</span>؛ <span class="math">lim u<sub>n</sub> = -2</span>.</p><p><strong>4)</strong> <span class="math">Σ u<sub>k</sub>v<sub>k</sub> = (1/3)(1 - n²)</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p>في هذا التمرين، نستعمل البرهان بالتراجع، دراسة الرتابة بإشارة الفرق، متتالية مساعدة، المتتالية الحسابية، حساب النهاية. الهدف هو إثبات خاصية لكل عدد طبيعي <span class="math">n</span> ودراسة اتجاه تغير المتتالية وإيجاد عبارة الحد العام وحساب النهاية.</p>
<p class="pedagogy-step">نستعمل الحصر بالتراجع على ثلاث مراحل: التحقق عند <span class="math">n = 0</span>، ثم فرضية التراجع، ثم الانتقال من <span class="math">n</span> إلى <span class="math">n + 1</span>؛ ثم ندرس الرتابة بإشارة الفرق <span class="math">u<sub>n+1</sub> - u<sub>n</sub></span> وليس بالتخمين البياني فقط؛ نحسب النهاية باستعمال النهايات المرجعية.</p>
<p><strong>1)</strong> <strong>برهان بالتراجع:</strong> عند <span class="math">n = 0</span>، لدينا <span class="math">u<sub>0</sub> = 1 > -2</span>.</p>
      <p>نفترض أن <span class="math">u<sub>n</sub> > -2</span>. فإن <span class="math">u<sub>n</sub> + 5 > 3</span>، ومنه <span class="math">0 < 9/(u<sub>n</sub> + 5) < 3</span>، وبالتالي:</p>
      <p class="math-equation">u<sub>n+1</sub> = 1 - 9/(u<sub>n</sub> + 5) > -2</p>
      <p>إذن الخاصية تثبت بالتراجع.</p>
      <p>كما أن:</p>
      <p class="math-equation">u<sub>n+1</sub> - u<sub>n</sub> = -(u<sub>n</sub> + 2)²/(u<sub>n</sub> + 5) < 0</p>
      <p>إذن <span class="math">(u<sub>n</sub>)</span> متناقصة تماما ومحدودة من الأسفل بـ -2، فهي متقاربة.</p>

<p class="pedagogy-step">نعرف متتالية مساعدة حتى نحول العلاقة التراجعية إلى علاقة هندسية بسيطة.</p>
<p><strong>2)</strong> لدينا:</p>
      <p class="math-equation">u<sub>n+1</sub> + 2 = 3 - 9/(u<sub>n</sub> + 5) = 3(u<sub>n</sub> + 2)/(u<sub>n</sub> + 5)</p>
      <p>وبما أن <span class="math">v<sub>n</sub> = 1/(u<sub>n</sub> + 2)</span>، فإن:</p>
      <p class="math-equation">v<sub>n+1</sub> = (u<sub>n</sub> + 5)/(3(u<sub>n</sub> + 2)) = 1/3 + v<sub>n</sub></p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> حسابية أساسها <span class="math">1/3</span> وحدها الأول <span class="math">v<sub>0</sub> = 1/3</span>. وبالتالي:</p>
      <p class="math-equation">v<sub>n</sub> = (n + 1)/3</p>

<p class="pedagogy-step">نحسب النهاية باستعمال النهايات المرجعية.</p>
<p><strong>3)</strong> من <span class="math">v<sub>n</sub> = 1/(u<sub>n</sub> + 2)</span> نستنتج:</p>
      <p class="math-equation">u<sub>n</sub> = 1/v<sub>n</sub> - 2 = 3/(n + 1) - 2</p>
      <p>وبالتالي:</p>
      <p class="math-equation">lim u<sub>n</sub> = -2</p>

<p class="pedagogy-step">نستعمل تعريف المتتالية الحسابية لأن الفرق بين حدين متتاليين ثابت.</p>
<p><strong>4)</strong> لدينا:</p>
      <p class="math-equation">u<sub>k</sub>v<sub>k</sub> = u<sub>k</sub>/(u<sub>k</sub> + 2) = 1 - 2v<sub>k</sub> = 1 - 2(k + 1)/3 = (1 - 2k)/3</p>
      <p>وبالجمع من <span class="math">k = 0</span> إلى <span class="math">n</span>:</p>
      <p class="math-equation">u<sub>0</sub>v<sub>0</sub> + u<sub>1</sub>v<sub>1</sub> + ... + u<sub>n</sub>v<sub>n</sub> = (1/3)(1 - n²)</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نتبع الترتيب التالي: البرهان بالتراجع، دراسة الرتابة، استعمال متتالية مساعدة، حساب النهاية، ونكتب النتيجة النهائية في كل جزء.</p>
</div>`,
    solution: `<p><strong>1)</strong> <strong>برهان بالتراجع:</strong> عند <span class="math">n = 0</span>، لدينا <span class="math">u<sub>0</sub> = 1 > -2</span>.</p>
      <p>نفترض أن <span class="math">u<sub>n</sub> > -2</span>. فإن <span class="math">u<sub>n</sub> + 5 > 3</span>، ومنه <span class="math">0 < 9/(u<sub>n</sub> + 5) < 3</span>، وبالتالي:</p>
      <p class="math-equation">u<sub>n+1</sub> = 1 - 9/(u<sub>n</sub> + 5) > -2</p>
      <p>إذن الخاصية تثبت بالتراجع.</p>
      <p>كما أن:</p>
      <p class="math-equation">u<sub>n+1</sub> - u<sub>n</sub> = -(u<sub>n</sub> + 2)²/(u<sub>n</sub> + 5) < 0</p>
      <p>إذن <span class="math">(u<sub>n</sub>)</span> متناقصة تماما ومحدودة من الأسفل بـ -2، فهي متقاربة.</p>
      <p><strong>2)</strong> لدينا:</p>
      <p class="math-equation">u<sub>n+1</sub> + 2 = 3 - 9/(u<sub>n</sub> + 5) = 3(u<sub>n</sub> + 2)/(u<sub>n</sub> + 5)</p>
      <p>وبما أن <span class="math">v<sub>n</sub> = 1/(u<sub>n</sub> + 2)</span>، فإن:</p>
      <p class="math-equation">v<sub>n+1</sub> = (u<sub>n</sub> + 5)/(3(u<sub>n</sub> + 2)) = 1/3 + v<sub>n</sub></p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> حسابية أساسها <span class="math">1/3</span> وحدها الأول <span class="math">v<sub>0</sub> = 1/3</span>. وبالتالي:</p>
      <p class="math-equation">v<sub>n</sub> = (n + 1)/3</p>
      <p><strong>3)</strong> من <span class="math">v<sub>n</sub> = 1/(u<sub>n</sub> + 2)</span> نستنتج:</p>
      <p class="math-equation">u<sub>n</sub> = 1/v<sub>n</sub> - 2 = 3/(n + 1) - 2</p>
      <p>وبالتالي:</p>
      <p class="math-equation">lim u<sub>n</sub> = -2</p>
      <p><strong>4)</strong> لدينا:</p>
      <p class="math-equation">u<sub>k</sub>v<sub>k</sub> = u<sub>k</sub>/(u<sub>k</sub> + 2) = 1 - 2v<sub>k</sub> = 1 - 2(k + 1)/3 = (1 - 2k)/3</p>
      <p>وبالجمع من <span class="math">k = 0</span> إلى <span class="math">n</span>:</p>
      <p class="math-equation">u<sub>0</sub>v<sub>0</sub> + u<sub>1</sub>v<sub>1</sub> + ... + u<sub>n</sub>v<sub>n</sub> = (1/3)(1 - n²)</p>`
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
    quickSolution: `<p><strong>1)</strong> <span class="math">u<sub>1</sub> = ln 3</span>، <span class="math">u<sub>2</sub> = ln 5</span>، <span class="math">u<sub>3</sub> = ln 7</span>؛ <span class="math">(u<sub>n</sub>)</span> متزايدة تماما.</p><p><strong>2)</strong> a) <span class="math">e<sup>u<sub>n</sub></sup> = 2n + 1</span> لكل <span class="math">n</span> &nbsp; b) <span class="math">u<sub>n</sub> = ln(2n+1)</span>؛ <span class="math">lim u<sub>n</sub> = +∞</span>.</p><p><strong>3)</strong> <span class="math">S<sub>n</sub> = ln(2n+1)</span>؛ <span class="math">T = e<sup>1439</sup>(e<sup>580</sup> - 1)/(e - 1)</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p>في هذا التمرين، نستعمل دراسة تغير الدالة بالمشتقة، البرهان بالتراجع، دراسة الرتابة بإشارة الفرق، متتالية مساعدة، المتتالية الهندسية، حساب النهاية، حساب مجموع حدود، خواص اللوغاريتمات. الهدف هو إثبات خاصية لكل عدد طبيعي <span class="math">n</span> ودراسة اتجاه تغير المتتالية وإيجاد عبارة الحد العام وحساب النهاية وحساب مجموع حدود.</p>
<p class="pedagogy-step">نستعمل المشتقة لدراسة تغير الدالة وصورة المجال؛ نستعمل دراسة إشارة الفرق <span class="math">u<sub>n+1</sub> - u<sub>n</sub></span> أو إشارة <span class="math">f(x) - x</span> لأن المطلوب اتجاه التغير.</p>
<p><strong>1)</strong> بالتعويض المباشر:</p>
      <p class="math-equation">u<sub>1</sub> = ln 3</p>
      <p class="math-equation">u<sub>2</sub> = ln 3 + ln(5/3) = ln 5</p>
      <p class="math-equation">u<sub>3</sub> = ln 5 + ln(7/5) = ln 7</p>
      <p>بما أن <span class="math">2n + 3 > 2n + 1</span> فإن النسبة أكبر من 1، ومنه:</p>
      <p class="math-equation">ln((2n + 3)/(2n + 1)) > 0</p>
      <p>إذن <span class="math">(u<sub>n</sub>)</span> متزايدة تماما.</p>

<p class="pedagogy-step">نستعمل البرهان بالتراجع على ثلاث مراحل: التحقق عند <span class="math">n = 0</span>، ثم فرضية التراجع، ثم الانتقال من <span class="math">n</span> إلى <span class="math">n + 1</span>؛ نحسب النهاية باستعمال النهايات المرجعية.</p>
<p><strong>2)</strong> <strong>برهان بالتراجع:</strong> عند <span class="math">n = 0</span>، لدينا <span class="math">e<sup>u<sub>0</sub></sup> = e<sup>0</sup> = 1 = v<sub>0</sub></span>.</p>
      <p>نفترض أن <span class="math">e<sup>u<sub>n</sub></sup> = 2n + 1</span>. فإن:</p>
      <p class="math-equation">e<sup>u<sub>n+1</sub></sup> = e<sup>u<sub>n</sub></sup> × (2n + 3)/(2n + 1) = 2n + 3 = v<sub>n+1</sub></p>
      <p>إذن:</p>
      <p class="math-equation">u<sub>n</sub> = ln(2n + 1)</p>
      <p>ومنه:</p>
      <p class="math-equation">lim u<sub>n</sub> = +∞</p>

<p class="pedagogy-step">نستعمل خواص اللوغاريتمات لحساب المجموع.</p>
<p><strong>3)</strong> <span class="math">S<sub>n</sub></span> مجموع متتالي متداخل:</p>
      <p class="math-equation">S<sub>n</sub> = ln(v<sub>n</sub>/v<sub>0</sub>) = ln(2n + 1)</p>

<p class="pedagogy-step">نستعمل تعريف المتتالية الهندسية لأن النسبة بين حدين متتاليين ثابتة؛ نستعمل صيغة مجموع حدود متتالية هندسية أو خاصية التلاصق.</p>
<p><strong>4)</strong> <span class="math">T</span> مجموع حدود متتالية هندسية:</p>
      <p class="math-equation">T = e<sup>1439</sup> + e<sup>1440</sup> + ... + e<sup>2018</sup> = e<sup>1439</sup> × (e<sup>580</sup> - 1)/(e - 1)</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نتبع الترتيب التالي: دراسة الدالة، البرهان بالتراجع، دراسة الرتابة، استعمال متتالية مساعدة، حساب النهاية، حساب المجموع، ونكتب النتيجة النهائية في كل جزء.</p>
</div>`,
    conceptHints: [
      {
        "title": "الحصر بالتراجع",
        "hint": "تحقق من n=0، ثم افترض أن u_n داخل المجال، واستعمل علاقة u_{n+1}=f(u_n) أو صورة المجال بالدالة لإثبات بقاء u_{n+1} داخل نفس المجال."
      },
      {
        "title": "رتابة المتتالية",
        "hint": "لدراسة الاتجاه، احسب u_{n+1}-u_n أو درس إشارة f(x)-x على المجال المعطى، واستعمل الحصر لتحديد الإشارة دون الاكتفاء بالتخمين البياني."
      },
      {
        "title": "المتتالية المساعدة",
        "hint": "عرف v_n حتى نحول العلاقة التراجعية إلى علاقة هندسية بسيطة، ثم أثبت ذلك بحساب النسبة v_{n+1}/v_n."
      },
      {
        "title": "حساب النهاية",
        "hint": "استعمل العبارة الصريحة أو الحصر أو حقيقة أن q^n يؤول إلى 0 عندما |q|<1 لاستنتاج النهاية."
      },
      {
        "title": "حساب المجموع",
        "hint": "حدد نوع الحدود (هندسية، متداخلة، لوغاريتمية) ثم استعمل الصيغة المناسبة للمجموع."
      },
      {
        "title": "اللوغاريتمات",
        "hint": "استعمل خاصية ln(ab)=ln a+ln b وln(a^k)=k ln a لتبسيط المجاميع والجداوي."
      }
    ],
    solution: `<p><strong>1)</strong> بالتعويض المباشر:</p>
      <p class="math-equation">u<sub>1</sub> = ln 3</p>
      <p class="math-equation">u<sub>2</sub> = ln 3 + ln(5/3) = ln 5</p>
      <p class="math-equation">u<sub>3</sub> = ln 5 + ln(7/5) = ln 7</p>
      <p>بما أن <span class="math">2n + 3 > 2n + 1</span> فإن النسبة أكبر من 1، ومنه:</p>
      <p class="math-equation">ln((2n + 3)/(2n + 1)) > 0</p>
      <p>إذن <span class="math">(u<sub>n</sub>)</span> متزايدة تماما.</p>
      <p><strong>2)</strong> <strong>برهان بالتراجع:</strong> عند <span class="math">n = 0</span>، لدينا <span class="math">e<sup>u<sub>0</sub></sup> = e<sup>0</sup> = 1 = v<sub>0</sub></span>.</p>
      <p>نفترض أن <span class="math">e<sup>u<sub>n</sub></sup> = 2n + 1</span>. فإن:</p>
      <p class="math-equation">e<sup>u<sub>n+1</sub></sup> = e<sup>u<sub>n</sub></sup> × (2n + 3)/(2n + 1) = 2n + 3 = v<sub>n+1</sub></p>
      <p>إذن:</p>
      <p class="math-equation">u<sub>n</sub> = ln(2n + 1)</p>
      <p>ومنه:</p>
      <p class="math-equation">lim u<sub>n</sub> = +∞</p>
      <p><strong>3)</strong> <span class="math">S<sub>n</sub></span> مجموع متتالي متداخل:</p>
      <p class="math-equation">S<sub>n</sub> = ln(v<sub>n</sub>/v<sub>0</sub>) = ln(2n + 1)</p>
      <p><strong>4)</strong> <span class="math">T</span> مجموع حدود متتالية هندسية:</p>
      <p class="math-equation">T = e<sup>1439</sup> + e<sup>1440</sup> + ... + e<sup>2018</sup> = e<sup>1439</sup> × (e<sup>580</sup> - 1)/(e - 1)</p>`
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
    quickSolution: `<p><strong>1)</strong> <span class="math">u<sub>1</sub> = 7/4</span>، <span class="math">v<sub>1</sub> = 11/2</span>؛ <span class="math">u<sub>n+2</sub> - u<sub>n+1</sub> = (3/4)(u<sub>n+1</sub> - u<sub>n</sub>)</span>.</p><p><strong>2)</strong> <span class="math">(u<sub>n</sub>)</span> متزايدة تماما؛ <span class="math">(v<sub>n</sub>)</span> متناقصة تماما.</p><p><strong>3)</strong> <span class="math">(w<sub>n</sub>)</span> هندسية أساسها <span class="math">3/4</span>، <span class="math">w<sub>0</sub> = -5</span>؛ <span class="math">w<sub>n</sub> = -5(3/4)<sup>n</sup></span>.</p><p><strong>4)</strong> <span class="math">(u<sub>n</sub>)</span> و <span class="math">(v<sub>n</sub>)</span> متجاورتان.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p>في هذا التمرين، نستعمل دراسة تغير الدالة بالمشتقة، البرهان بالتراجع، دراسة الرتابة بإشارة الفرق، متتالية مساعدة، المتتالية الهندسية، حساب مجموع حدود، المتتاليات المتجاورة. الهدف هو إثبات خاصية لكل عدد طبيعي <span class="math">n</span> ودراسة اتجاه تغير المتتالية وإيجاد عبارة الحد العام وحساب مجموع حدود.</p>
<p class="pedagogy-step">نستعمل المشتقة لدراسة تغير الدالة وصورة المجال؛ نستعمل دراسة إشارة الفرق <span class="math">u<sub>n+1</sub> - u<sub>n</sub></span> أو إشارة <span class="math">f(x) - x</span> لأن المطلوب اتجاه التغير.</p>
<p><strong>1)</strong> بالتعويض المباشر:</p>
      <p class="math-equation">u<sub>1</sub> = (3/4) × 1 + 1 = 7/4</p>
      <p class="math-equation">v<sub>1</sub> = (3/4) × 6 + 1 = 11/2</p>
      <p>كما أن:</p>
      <p class="math-equation">u<sub>n+2</sub> - u<sub>n+1</sub> = (3/4)(u<sub>n+1</sub> - u<sub>n</sub>)</p>
      <p>وبما أن <span class="math">u<sub>1</sub> - u<sub>0</sub> = 3/4 > 0</span>، فإن كل الفروق التالية موجبة، إذن <span class="math">(u<sub>n</sub>)</span> متزايدة تماما.</p>
      <p>وبما أن <span class="math">v<sub>1</sub> - v<sub>0</sub> = -1/2 < 0</span>، فإن كل الفروق التالية سالبة، إذن <span class="math">(v<sub>n</sub>)</span> متناقصة تماما.</p>

<p class="pedagogy-step">نعرف متتالية مساعدة حتى نحول العلاقة التراجعية إلى علاقة هندسية بسيطة؛ نستعمل مفهوم المتتاليات المتجاورة لاستنتاج النهاية.</p>
<p><strong>2)</strong> نضع <span class="math">w<sub>n</sub> = u<sub>n</sub> - v<sub>n</sub></span>. فإن:</p>
      <p class="math-equation">w<sub>n+1</sub> = (3/4)(u<sub>n</sub> - v<sub>n</sub>) = (3/4)w<sub>n</sub></p>
      <p>إذن <span class="math">(w<sub>n</sub>)</span> هندسية أساسها <span class="math">q = 3/4</span> وحدها الأول <span class="math">w<sub>0</sub> = 1 - 6 = -5</span>. وبالتالي:</p>
      <p class="math-equation">w<sub>n</sub> = -5(3/4)<sup>n</sup></p>
      <p>بما أن <span class="math">w<sub>n</sub> < 0</span> فإن <span class="math">u<sub>n</sub> < v<sub>n</sub></span>. وبما أن <span class="math">w<sub>n</sub></span> يؤول إلى 0، فإن <span class="math">v<sub>n</sub> - u<sub>n</sub></span> يؤول إلى 0. ومع تزايد <span class="math">(u<sub>n</sub>)</span> وتناقص <span class="math">(v<sub>n</sub>)</span>، نستنتج أن المتتاليتين متجاورتان.</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نتبع الترتيب التالي: دراسة الدالة، البرهان بالتراجع، دراسة الرتابة، استعمال متتالية مساعدة، حساب المجموع، استنتاج المتتاليات المتجاورة، ونكتب النتيجة النهائية في كل جزء.</p>
</div>`,
    conceptHints: [
      {
        "title": "الحصر بالتراجع",
        "hint": "تحقق من n=0، ثم افترض أن u_n داخل المجال، واستعمل علاقة u_{n+1}=f(u_n) أو صورة المجال بالدالة لإثبات بقاء u_{n+1} داخل نفس المجال."
      },
      {
        "title": "رتابة المتتالية",
        "hint": "لدراسة الاتجاه، احسب u_{n+1}-u_n أو درس إشارة f(x)-x على المجال المعطى، واستعمل الحصر لتحديد الإشارة دون الاكتفاء بالتخمين البياني."
      },
      {
        "title": "المتتالية المساعدة",
        "hint": "عرف v_n حتى نحول العلاقة التراجعية إلى علاقة هندسية بسيطة، ثم أثبت ذلك بحساب النسبة v_{n+1}/v_n."
      },
      {
        "title": "حساب المجموع",
        "hint": "حدد نوع الحدود (هندسية، متداخلة، لوغاريتمية) ثم استعمل الصيغة المناسبة للمجموع."
      },
      {
        "title": "المتتاليات المتجاورة",
        "hint": "أثبت أن إحداهما متزايدة والأخرى متناقصة وأن الفرق بينهما يؤول إلى 0."
      }
    ],
    solution: `<p><strong>1)</strong> بالتعويض المباشر:</p>
      <p class="math-equation">u<sub>1</sub> = (3/4) × 1 + 1 = 7/4</p>
      <p class="math-equation">v<sub>1</sub> = (3/4) × 6 + 1 = 11/2</p>
      <p>كما أن:</p>
      <p class="math-equation">u<sub>n+2</sub> - u<sub>n+1</sub> = (3/4)(u<sub>n+1</sub> - u<sub>n</sub>)</p>
      <p>وبما أن <span class="math">u<sub>1</sub> - u<sub>0</sub> = 3/4 > 0</span>، فإن كل الفروق التالية موجبة، إذن <span class="math">(u<sub>n</sub>)</span> متزايدة تماما.</p>
      <p>وبما أن <span class="math">v<sub>1</sub> - v<sub>0</sub> = -1/2 < 0</span>، فإن كل الفروق التالية سالبة، إذن <span class="math">(v<sub>n</sub>)</span> متناقصة تماما.</p>
      <p><strong>2)</strong> نضع <span class="math">w<sub>n</sub> = u<sub>n</sub> - v<sub>n</sub></span>. فإن:</p>
      <p class="math-equation">w<sub>n+1</sub> = (3/4)(u<sub>n</sub> - v<sub>n</sub>) = (3/4)w<sub>n</sub></p>
      <p>إذن <span class="math">(w<sub>n</sub>)</span> هندسية أساسها <span class="math">q = 3/4</span> وحدها الأول <span class="math">w<sub>0</sub> = 1 - 6 = -5</span>. وبالتالي:</p>
      <p class="math-equation">w<sub>n</sub> = -5(3/4)<sup>n</sup></p>
      <p>بما أن <span class="math">w<sub>n</sub> < 0</span> فإن <span class="math">u<sub>n</sub> < v<sub>n</sub></span>. وبما أن <span class="math">w<sub>n</sub></span> يؤول إلى 0، فإن <span class="math">v<sub>n</sub> - u<sub>n</sub></span> يؤول إلى 0. ومع تزايد <span class="math">(u<sub>n</sub>)</span> وتناقص <span class="math">(v<sub>n</sub>)</span>، نستنتج أن المتتاليتين متجاورتان.</p>`
  },  {
    id: "bac-2017-exp-subject-2",
    branch: "science",
    stream: "experimental",
    year: "2017",
    title: "بكالوريا 2017 - الدورة الاستثنائية - الموضوع الثاني - علوم تجريبية",
    figureHtml: `<figure class="bac-figure" aria-label="تمثيل بياني للمنحنى Cf والمستقيم Delta">
      <svg class="bac-graph" viewBox="0 0 420 300" role="img">
        <rect x="0" y="0" width="420" height="300" rx="10" class="graph-bg"></rect>
        <g class="grid-lines"><path d="M80 30V260 M140 30V260 M200 30V260 M260 30V260 M320 30V260 M380 30V260 M40 60H390 M40 110H390 M40 160H390 M40 210H390 M40 260H390"></path></g>
        <g class="axes"><path d="M40 260H395"></path><path d="M80 270V25"></path></g>
        <g class="axis-labels"><text x="74" y="278">0</text><text x="134" y="278">1</text><text x="194" y="278">2</text><text x="254" y="278">3</text><text x="314" y="278">4</text><text x="374" y="278">5</text><text x="57" y="224">1</text><text x="57" y="174">2</text><text x="57" y="124">3</text></g>
        <path class="line-delta" d="M80 260L320 60"></path>
        <path class="curve-f" d="M80 232 C116 178 158 151 210 135 C270 116 326 106 390 100"></path>
        <text x="255" y="78" class="graph-label">(Δ)</text>
        <text x="315" y="103" class="graph-label">(Cf)</text>
      </svg>
    </figure>`,
    statementHtml: `<div class="bac-statement">
      <p>نعتبر الدالة <span class="math">f</span> المعرفة على <span class="math">[0، +∞[</span> كما يلي:</p>
      <p class="math">f(x)=(3x+1)/(x+3)</p>
      <p>و <span class="math">(Cf)</span> تمثيلها البياني، والمستقيم <span class="math">(Δ)</span> معادلته <span class="math">y=x</span>.</p>
      <p>ليكن <span class="math">α</span> عددا حقيقيا موجبا. المتتالية العددية <span class="math">(uₙ)</span> معرفة على <span class="math">N</span> بحدها الأول <span class="math">u₀=α</span>، ومن أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math">uₙ₊₁=f(uₙ)</p>
      <p><strong>I.</strong> عين قيمة <span class="math">α</span> حتى تكون <span class="math">(uₙ)</span> متتالية ثابتة.</p>
      <p><strong>II.</strong> نضع في كل ما يلي <span class="math">α=5</span>.</p>
      <ol>
        <li>انقل الشكل، ثم مثل على حامل محور الفواصل الحدود <span class="math">u₀، u₁، u₂، u₃</span> دون حسابها، مبرزا خطوط التمثيل.</li>
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
    quickSolution: `<p><strong>I)</strong> <span class="math">α = 1</span> (القيمة الموجبة).</p><p><strong>II)</strong> <span class="math">u<sub>0</sub> = 5</span>؛ التخمين: <span class="math">(u<sub>n</sub>)</span> متناقصة وتتقارب نحو <span class="math">1</span>.</p><p><strong>2)</strong> a) <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">1/2</span>، <span class="math">v<sub>0</sub> = 2/3</span> &nbsp; b) <span class="math">v<sub>n</sub> = (2/3)(1/2)<sup>n</sup></span>؛ <span class="math">u<sub>n</sub> = (1+v<sub>n</sub>)/(1-v<sub>n</sub>)</span>؛ <span class="math">lim u<sub>n</sub> = 1</span>.</p><p><strong>3)</strong> <span class="math">S<sub>n</sub> = (4/3)(1 - (1/2)<sup>2017</sup>)(1/2)<sup>n</sup></span>؛ <span class="math">S'<sub>n</sub> = 2017/2 - S<sub>n</sub>/2</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p>في هذا التمرين، نستعمل التمثيل البياني للتخمين، دراسة الرتابة بإشارة الفرق، المتتالية الهندسية، النقاط الثابتة، حساب النهاية، حساب مجموع حدود. الهدف هو دراسة اتجاه تغير المتتالية والتعرف على المتتالية الهندسية وحساب النهاية وحساب مجموع حدود وتحديد النقاط الثابتة.</p>
<p class="pedagogy-step">نستعمل التمثيل البياني أولا للتخمين، ثم نبرهن الجزء جبريا ولا نكتفي بالرسم؛ نحدد نقاط التقاطع مع المستقيم <span class="math">y = x</span> لأنها المرشحة للنهاية؛ نستعمل تعريف المتتالية الهندسية لأن النسبة بين حدين متتاليين ثابتة؛ بعد إيجاد العبارة الصريحة، نستعمل نهاية المتتالية الهندسية <span class="math">q<sup>n</sup></span> لحساب النهاية.</p>
المتتالية تكون ثابتة عندما α=f(α)، أي α=(3α+1)/(α+3)، ومنه α²=1. وبما أن α موجب، فإن α=1. عند α=5 يظهر بيانيا أن الحدود تتناقص وتتقارب نحو 1. نحسب vₙ₊₁=(uₙ₊₁-1)/(uₙ₊₁+1). وباستعمال uₙ₊₁=(3uₙ+1)/(uₙ+3) نجد vₙ₊₁=[(3uₙ+1)-(uₙ+3)]/[(3uₙ+1)+(uₙ+3)]=(2uₙ-2)/(4uₙ+4)=1/2 · (uₙ-1)/(uₙ+1)=vₙ/2. إذن (vₙ) هندسية أساسها 1/2، و v₀=(5-1)/(5+1)=2/3، ومنه vₙ=(2/3)(1/2)ⁿ. ومن vₙ=(uₙ-1)/(uₙ+1) نستنتج uₙ=(1+vₙ)/(1-vₙ)، وبالتالي lim uₙ=1. كما أن Sₙ=vₙ(1-(1/2)²⁰¹⁷)/(1-1/2)=2vₙ(1-(1/2)²⁰¹⁷). وبما أن 1/(uₖ+1)=(1-vₖ)/2، فإن S'ₙ=2017/2 - Sₙ/2.
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نتبع الترتيب التالي: التخمين البياني، تحديد النقاط الثابتة، دراسة الرتابة، استعمال المتتالية الهندسية، حساب النهاية، حساب المجموع، ونكتب النتيجة النهائية في كل جزء.</p>
</div>`,
    solution: "المتتالية تكون ثابتة عندما α=f(α)، أي α=(3α+1)/(α+3)، ومنه α²=1. وبما أن α موجب، فإن α=1. عند α=5 يظهر بيانيا أن الحدود تتناقص وتتقارب نحو 1. نحسب vₙ₊₁=(uₙ₊₁-1)/(uₙ₊₁+1). وباستعمال uₙ₊₁=(3uₙ+1)/(uₙ+3) نجد vₙ₊₁=[(3uₙ+1)-(uₙ+3)]/[(3uₙ+1)+(uₙ+3)]=(2uₙ-2)/(4uₙ+4)=1/2 · (uₙ-1)/(uₙ+1)=vₙ/2. إذن (vₙ) هندسية أساسها 1/2، و v₀=(5-1)/(5+1)=2/3، ومنه vₙ=(2/3)(1/2)ⁿ. ومن vₙ=(uₙ-1)/(uₙ+1) نستنتج uₙ=(1+vₙ)/(1-vₙ)، وبالتالي lim uₙ=1. كما أن Sₙ=vₙ(1-(1/2)²⁰¹⁷)/(1-1/2)=2vₙ(1-(1/2)²⁰¹⁷). وبما أن 1/(uₖ+1)=(1-vₖ)/2، فإن S'ₙ=2017/2 - Sₙ/2."
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
    quickSolution: `<p><strong>1)</strong> <span class="math">0 &lt; u<sub>n</sub> &lt; 1</span> لكل <span class="math">n</span>؛ <span class="math">(u<sub>n</sub>)</span> متزايدة تماما ومقاربة.</p><p><strong>2)</strong> a) <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">5/2</span>، <span class="math">v<sub>0</sub> = 3</span>؛ <span class="math">v<sub>n</sub> = 3(5/2)<sup>n</sup></span> &nbsp; b) <span class="math">u<sub>n</sub> = 1 - 3/(v<sub>n</sub> + 1)</span>؛ <span class="math">lim u<sub>n</sub> = 1</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p>في هذا التمرين، نستعمل دراسة تغير الدالة بالمشتقة، البرهان بالتراجع، دراسة الرتابة بإشارة الفرق، متتالية مساعدة، المتتالية الهندسية، حساب النهاية، حساب مجموع حدود. الهدف هو إثبات خاصية لكل عدد طبيعي <span class="math">n</span> ودراسة اتجاه تغير المتتالية وإيجاد عبارة الحد العام وحساب النهاية وحساب مجموع حدود.</p>
<p class="pedagogy-step">نستعمل التحويلات الجبرية (توحيد المقام، التعويض، التبسيط) للوصول إلى العبارة المطلوبة.</p>
<p><strong>1)</strong> نكتب أولا:</p>
      <p class="math-equation">u<sub>n+1</sub> = 3 - 10/(u<sub>n</sub> + 4) = (3u<sub>n</sub> + 2)/(u<sub>n</sub> + 4)</p>

<p class="pedagogy-step">نستعمل الحصر بالتراجع على ثلاث مراحل: التحقق عند <span class="math">n = 0</span>، ثم فرضية التراجع، ثم الانتقال من <span class="math">n</span> إلى <span class="math">n + 1</span>؛ ثم ندرس الرتابة بإشارة الفرق <span class="math">u<sub>n+1</sub> - u<sub>n</sub></span> وليس بالتخمين البياني فقط؛ نحسب النهاية باستعمال النهايات المرجعية.</p>
<p><strong>برهان بالتراجع:</strong> عند <span class="math">n = 0</span>، لدينا <span class="math">0 < u<sub>0</sub> = 1/4 < 1</span>.</p>
      <p>نفترض أن <span class="math">0 < u<sub>n</sub> < 1</span>. فإن <span class="math">u<sub>n+1</sub> > 0</span>، كما أن <span class="math">u<sub>n+1</sub> < 1</span> لأن <span class="math">3u<sub>n</sub> + 2 < u<sub>n</sub> + 4</span> يكافئ <span class="math">u<sub>n</sub> < 1</span>.</p>
      <p>إذن الخاصية تثبت بالتراجع.</p>
      <p>ولدراسة التغير:</p>
      <p class="math-equation">u<sub>n+1</sub> - u<sub>n</sub> = -(u<sub>n</sub> - 1)(u<sub>n</sub> + 2)/(u<sub>n</sub> + 4) > 0</p>
      <p>لأن <span class="math">0 < u<sub>n</sub> < 1</span>. إذن <span class="math">(u<sub>n</sub>)</span> متزايدة ومحدودة من الأعلى بـ 1، فهي متقاربة.</p>

<p class="pedagogy-step">نعرف متتالية مساعدة حتى نحول العلاقة التراجعية إلى علاقة هندسية بسيطة؛ بعد إيجاد العبارة الصريحة، نستعمل نهاية المتتالية الهندسية <span class="math">q<sup>n</sup></span> لحساب النهاية.</p>
<p><strong>2)</strong> نحسب:</p>
      <p class="math-equation">v<sub>n+1</sub> = (u<sub>n+1</sub> + 2)/(1 - u<sub>n+1</sub>) = (5/2)v<sub>n</sub></p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">5/2</span>. لدينا:</p>
      <p class="math-equation">v<sub>0</sub> = (1/4 + 2)/(1 - 1/4) = 3</p>
      <p>وبالتالي:</p>
      <p class="math-equation">v<sub>n</sub> = 3(5/2)<sup>n</sup></p>
      <p>ومن <span class="math">v<sub>n</sub> = (u<sub>n</sub> + 2)/(1 - u<sub>n</sub>)</span> نستنتج:</p>
      <p class="math-equation">u<sub>n</sub> = (v<sub>n</sub> - 2)/(v<sub>n</sub> + 1) = 1 - 3/(v<sub>n</sub> + 1)</p>
      <p>وبما أن <span class="math">v<sub>n</sub></span> يؤول إلى <span class="math">+∞</span>، فإن:</p>
      <p class="math-equation">lim u<sub>n</sub> = 1</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نتبع الترتيب التالي: دراسة الدالة، البرهان بالتراجع، دراسة الرتابة، استعمال متتالية مساعدة، حساب النهاية، حساب المجموع، ونكتب النتيجة النهائية في كل جزء.</p>
</div>`,
    conceptHints: [
      {
        "title": "الحصر بالتراجع",
        "hint": "تحقق من n=0، ثم افترض أن u_n داخل المجال، واستعمل علاقة u_{n+1}=f(u_n) أو صورة المجال بالدالة لإثبات بقاء u_{n+1} داخل نفس المجال."
      },
      {
        "title": "رتابة المتتالية",
        "hint": "لدراسة الاتجاه، احسب u_{n+1}-u_n أو درس إشارة f(x)-x على المجال المعطى، واستعمل الحصر لتحديد الإشارة دون الاكتفاء بالتخمين البياني."
      },
      {
        "title": "المتتالية المساعدة",
        "hint": "عرف v_n حتى نحول العلاقة التراجعية إلى علاقة هندسية بسيطة، ثم أثبت ذلك بحساب النسبة v_{n+1}/v_n."
      },
      {
        "title": "حساب النهاية",
        "hint": "استعمل العبارة الصريحة أو الحصر أو حقيقة أن q^n يؤول إلى 0 عندما |q|<1 لاستنتاج النهاية."
      },
      {
        "title": "حساب المجموع",
        "hint": "حدد نوع الحدود (هندسية، متداخلة، لوغاريتمية) ثم استعمل الصيغة المناسبة للمجموع."
      }
    ],
    solution: `<p><strong>1)</strong> نكتب أولا:</p>
      <p class="math-equation">u<sub>n+1</sub> = 3 - 10/(u<sub>n</sub> + 4) = (3u<sub>n</sub> + 2)/(u<sub>n</sub> + 4)</p>
      <p><strong>برهان بالتراجع:</strong> عند <span class="math">n = 0</span>، لدينا <span class="math">0 < u<sub>0</sub> = 1/4 < 1</span>.</p>
      <p>نفترض أن <span class="math">0 < u<sub>n</sub> < 1</span>. فإن <span class="math">u<sub>n+1</sub> > 0</span>، كما أن <span class="math">u<sub>n+1</sub> < 1</span> لأن <span class="math">3u<sub>n</sub> + 2 < u<sub>n</sub> + 4</span> يكافئ <span class="math">u<sub>n</sub> < 1</span>.</p>
      <p>إذن الخاصية تثبت بالتراجع.</p>
      <p>ولدراسة التغير:</p>
      <p class="math-equation">u<sub>n+1</sub> - u<sub>n</sub> = -(u<sub>n</sub> - 1)(u<sub>n</sub> + 2)/(u<sub>n</sub> + 4) > 0</p>
      <p>لأن <span class="math">0 < u<sub>n</sub> < 1</span>. إذن <span class="math">(u<sub>n</sub>)</span> متزايدة ومحدودة من الأعلى بـ 1، فهي متقاربة.</p>
      <p><strong>2)</strong> نحسب:</p>
      <p class="math-equation">v<sub>n+1</sub> = (u<sub>n+1</sub> + 2)/(1 - u<sub>n+1</sub>) = (5/2)v<sub>n</sub></p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">5/2</span>. لدينا:</p>
      <p class="math-equation">v<sub>0</sub> = (1/4 + 2)/(1 - 1/4) = 3</p>
      <p>وبالتالي:</p>
      <p class="math-equation">v<sub>n</sub> = 3(5/2)<sup>n</sup></p>
      <p>ومن <span class="math">v<sub>n</sub> = (u<sub>n</sub> + 2)/(1 - u<sub>n</sub>)</span> نستنتج:</p>
      <p class="math-equation">u<sub>n</sub> = (v<sub>n</sub> - 2)/(v<sub>n</sub> + 1) = 1 - 3/(v<sub>n</sub> + 1)</p>
      <p>وبما أن <span class="math">v<sub>n</sub></span> يؤول إلى <span class="math">+∞</span>، فإن:</p>
      <p class="math-equation">lim u<sub>n</sub> = 1</p>`
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
    quickSolution: `<p><strong>1)</strong> <span class="math">f</span> متزايدة تماما على <span class="math">[0, 4]</span>؛ <span class="math">f([0,4]) ⊂ [0,4]</span>.</p><p><strong>2)</strong> a) <span class="math">0 ≤ u<sub>n</sub> ≤ 4</span> لكل <span class="math">n</span> &nbsp; b) <span class="math">(u<sub>n</sub>)</span> متناقصة تماما ومقاربة.</p><p><strong>3)</strong> <span class="math">u<sub>n</sub> ≠ 0</span> لكل <span class="math">n</span>.</p><p><strong>4)</strong> a) <span class="math">(v<sub>n</sub>)</span> حسابية أساسها <span class="math">9</span>، <span class="math">v<sub>0</sub> = 21/4</span> &nbsp; b) <span class="math">v<sub>n</sub> = (36n + 21)/4</span> &nbsp; c) <span class="math">u<sub>n</sub> = 52/(36n + 13)</span>؛ <span class="math">lim u<sub>n</sub> = 0</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p>في هذا التمرين، نستعمل دراسة تغير الدالة بالمشتقة، البرهان بالتراجع، دراسة الرتابة بإشارة الفرق، متتالية مساعدة، المتتالية الحسابية، حساب النهاية. الهدف هو إثبات خاصية لكل عدد طبيعي <span class="math">n</span> ودراسة اتجاه تغير المتتالية وإيجاد عبارة الحد العام وحساب النهاية.</p>
<p class="pedagogy-step">نستعمل المشتقة لدراسة تغير الدالة وصورة المجال؛ نستعمل دراسة إشارة الفرق <span class="math">u<sub>n+1</sub> - u<sub>n</sub></span> أو إشارة <span class="math">f(x) - x</span> لأن المطلوب اتجاه التغير.</p>
<p><strong>1)</strong> لدينا:</p>
      <p class="math-equation">f'(x) = 169/(9x + 13)² > 0</p>
      <p>إذن <span class="math">f</span> متزايدة تماما على <span class="math">I</span>. كما أن <span class="math">f(0) = 0</span> و <span class="math">f(4) = 52/49</span>، وبما أن <span class="math">f</span> متزايدة فإن:</p>
      <p class="math-equation">f(I) = [0, 52/49] ⊂ [0, 4]</p>

<p class="pedagogy-step">نستعمل الحصر بالتراجع على ثلاث مراحل: التحقق عند <span class="math">n = 0</span>، ثم فرضية التراجع، ثم الانتقال من <span class="math">n</span> إلى <span class="math">n + 1</span>؛ ثم ندرس الرتابة بإشارة الفرق <span class="math">u<sub>n+1</sub> - u<sub>n</sub></span> وليس بالتخمين البياني فقط؛ نحسب النهاية باستعمال الحصر بين متتاليتين لهما نفس النهاية.</p>
<p><strong>2)</strong> <strong>برهان بالتراجع:</strong> عند <span class="math">n = 0</span>، لدينا <span class="math">u<sub>0</sub> = 4 ∈ I</span>.</p>
      <p>نفترض أن <span class="math">u<sub>n</sub> ∈ I</span>. فبما أن <span class="math">f(I) ⊂ I</span>، فإن <span class="math">u<sub>n+1</sub> = f(u<sub>n</sub>) ∈ I</span>.</p>
      <p>إذن <span class="math">0 ≤ u<sub>n</sub> ≤ 4</span> لكل <span class="math">n</span>.</p>
      <p>كما أن:</p>
      <p class="math-equation">f(x) - x = 13x/(9x + 13) - x = -9x(x + 4/9)/(9x + 13) ≤ 0</p>
      <p>وبالتالي <span class="math">(u<sub>n</sub>)</span> متناقصة ومحدودة من الأسفل بـ 0، فهي متقاربة.</p>

<p class="pedagogy-step">نستعمل تعريف المتتالية الحسابية لأن الفرق بين حدين متتاليين ثابت.</p>
<p><strong>3)</strong> بما أن <span class="math">u<sub>0</sub> > 0</span> و <span class="math">f(x) > 0</span> لكل <span class="math">x > 0</span>، فإن <span class="math">u<sub>n</sub> ≠ 0</span>.</p>

<p class="pedagogy-step">نعرف متتالية مساعدة حتى نحول العلاقة التراجعية إلى علاقة هندسية بسيطة؛ بعد إيجاد العبارة الصريحة، نستعمل نهاية المتتالية الهندسية <span class="math">q<sup>n</sup></span> لحساب النهاية.</p>
<p><strong>4)</strong> نحسب:</p>
      <p class="math-equation">v<sub>n+1</sub> = 2 + 13/u<sub>n+1</sub> = 2 + 13(9u<sub>n</sub> + 13)/(13u<sub>n</sub>) = 11 + 13/u<sub>n</sub> = v<sub>n</sub> + 9</p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> حسابية أساسها <span class="math">9</span> وحدها الأول:</p>
      <p class="math-equation">v<sub>0</sub> = 2 + 13/4 = 21/4</p>
      <p>وبالتالي:</p>
      <p class="math-equation">v<sub>n</sub> = 21/4 + 9n = (36n + 21)/4</p>
      <p>بما أن <span class="math">v<sub>n</sub> = 2 + 13/u<sub>n</sub></span>، فإن:</p>
      <p class="math-equation">13/u<sub>n</sub> = v<sub>n</sub> - 2 = (36n + 13)/4</p>
      <p>وبالتالي:</p>
      <p class="math-equation">u<sub>n</sub> = 52/(36n + 13)</p>
      <p>ومنه:</p>
      <p class="math-equation">lim u<sub>n</sub> = 0</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نتبع الترتيب التالي: دراسة الدالة، البرهان بالتراجع، دراسة الرتابة، استعمال متتالية مساعدة، حساب النهاية، ونكتب النتيجة النهائية في كل جزء.</p>
</div>`,
    solution: `<p><strong>1)</strong> لدينا:</p>
      <p class="math-equation">f'(x) = 169/(9x + 13)² > 0</p>
      <p>إذن <span class="math">f</span> متزايدة تماما على <span class="math">I</span>. كما أن <span class="math">f(0) = 0</span> و <span class="math">f(4) = 52/49</span>، وبما أن <span class="math">f</span> متزايدة فإن:</p>
      <p class="math-equation">f(I) = [0, 52/49] ⊂ [0, 4]</p>
      <p><strong>2)</strong> <strong>برهان بالتراجع:</strong> عند <span class="math">n = 0</span>، لدينا <span class="math">u<sub>0</sub> = 4 ∈ I</span>.</p>
      <p>نفترض أن <span class="math">u<sub>n</sub> ∈ I</span>. فبما أن <span class="math">f(I) ⊂ I</span>، فإن <span class="math">u<sub>n+1</sub> = f(u<sub>n</sub>) ∈ I</span>.</p>
      <p>إذن <span class="math">0 ≤ u<sub>n</sub> ≤ 4</span> لكل <span class="math">n</span>.</p>
      <p>كما أن:</p>
      <p class="math-equation">f(x) - x = 13x/(9x + 13) - x = -9x(x + 4/9)/(9x + 13) ≤ 0</p>
      <p>وبالتالي <span class="math">(u<sub>n</sub>)</span> متناقصة ومحدودة من الأسفل بـ 0، فهي متقاربة.</p>
      <p><strong>3)</strong> بما أن <span class="math">u<sub>0</sub> > 0</span> و <span class="math">f(x) > 0</span> لكل <span class="math">x > 0</span>، فإن <span class="math">u<sub>n</sub> ≠ 0</span>.</p>
      <p><strong>4)</strong> نحسب:</p>
      <p class="math-equation">v<sub>n+1</sub> = 2 + 13/u<sub>n+1</sub> = 2 + 13(9u<sub>n</sub> + 13)/(13u<sub>n</sub>) = 11 + 13/u<sub>n</sub> = v<sub>n</sub> + 9</p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> حسابية أساسها <span class="math">9</span> وحدها الأول:</p>
      <p class="math-equation">v<sub>0</sub> = 2 + 13/4 = 21/4</p>
      <p>وبالتالي:</p>
      <p class="math-equation">v<sub>n</sub> = 21/4 + 9n = (36n + 21)/4</p>
      <p>بما أن <span class="math">v<sub>n</sub> = 2 + 13/u<sub>n</sub></span>، فإن:</p>
      <p class="math-equation">13/u<sub>n</sub> = v<sub>n</sub> - 2 = (36n + 13)/4</p>
      <p>وبالتالي:</p>
      <p class="math-equation">u<sub>n</sub> = 52/(36n + 13)</p>
      <p>ومنه:</p>
      <p class="math-equation">lim u<sub>n</sub> = 0</p>`
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
    quickSolution: `<p><strong>1)</strong> <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">1/4</span>، <span class="math">v<sub>0</sub> = -1/2</span>؛ <span class="math">v<sub>n</sub> = -(1/2)(1/4)<sup>n</sup></span>؛ <span class="math">u<sub>n</sub> = (1 + 2v<sub>n</sub>)/(1 - v<sub>n</sub>)</span>؛ <span class="math">lim u<sub>n</sub> = 1</span>.</p><p><strong>2)</strong> <span class="math">S<sub>n</sub> = -2/3 [1 - (1/4)<sup>n+1</sup>]</span>.</p><p><strong>3)</strong> <span class="math">1/(u<sub>n</sub>+2) = (1/3)(1 - v<sub>n</sub>)</span>؛ <span class="math">S'<sub>n</sub> = (1/3)[n + 1 + (2/3)(1 - (1/4)<sup>n+1</sup>)]</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p>في هذا التمرين، نستعمل متتالية مساعدة، المتتالية الهندسية، حساب النهاية، حساب مجموع حدود. الهدف هو إيجاد عبارة الحد العام وحساب النهاية وحساب مجموع حدود.</p>
<p class="pedagogy-step">نعرف متتالية مساعدة حتى نحول العلاقة التراجعية إلى علاقة هندسية بسيطة؛ بعد إيجاد العبارة الصريحة، نستعمل نهاية المتتالية الهندسية <span class="math">q<sup>n</sup></span> لحساب النهاية.</p>
<p><strong>1)</strong> نحسب:</p>
      <p class="math-equation">v<sub>n+1</sub> = (u<sub>n+1</sub> - 1)/(u<sub>n+1</sub> + 2)</p>
      <p>بالتعويض <span class="math">u<sub>n+1</sub> = (2u<sub>n</sub> + 2)/(u<sub>n</sub> + 3)</span> نجد:</p>
      <p class="math-equation">v<sub>n+1</sub> = (1/4)v<sub>n</sub></p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">q = 1/4</span> وحدها الأول:</p>
      <p class="math-equation">v<sub>0</sub> = (0 - 1)/(0 + 2) = -1/2</p>
      <p>وبالتالي:</p>
      <p class="math-equation">v<sub>n</sub> = -(1/2)(1/4)<sup>n</sup></p>
      <p>ومن <span class="math">v<sub>n</sub> = (u<sub>n</sub> - 1)/(u<sub>n</sub> + 2)</span> نحصل على:</p>
      <p class="math-equation">u<sub>n</sub> = (1 + 2v<sub>n</sub>)/(1 - v<sub>n</sub>)</p>
      <p>ومنه:</p>
      <p class="math-equation">lim u<sub>n</sub> = 1</p>

<p class="pedagogy-step">نستعمل صيغة مجموع حدود متتالية هندسية أو خاصية التلاصق.</p>
<p><strong>2)</strong> المجموع:</p>
      <p class="math-equation">S<sub>n</sub> = v<sub>0</sub>(1 - q<sup>n+1</sup>)/(1 - q) = (-1/2)(1 - (1/4)<sup>n+1</sup>)/(3/4) = -2/3[1 - (1/4)<sup>n+1</sup>]</p>

<p class="pedagogy-step">نستعمل صيغة مجموع حدود متتالية هندسية أو خاصية التلاصق.</p>
<p><strong>3)</strong> بما أن <span class="math">1/(u<sub>n</sub> + 2) = (1/3)(1 - v<sub>n</sub>)</span>، فإن:</p>
      <p class="math-equation">S'<sub>n</sub> = (1/3)[(n + 1) - S<sub>n</sub>] = (1/3)[n + 1 + (2/3)(1 - (1/4)<sup>n+1</sup>)]</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نتبع الترتيب التالي: استعمال متتالية مساعدة، حساب النهاية، حساب المجموع، ونكتب النتيجة النهائية في كل جزء.</p>
</div>`,
    solution: `<p><strong>1)</strong> نحسب:</p>
      <p class="math-equation">v<sub>n+1</sub> = (u<sub>n+1</sub> - 1)/(u<sub>n+1</sub> + 2)</p>
      <p>بالتعويض <span class="math">u<sub>n+1</sub> = (2u<sub>n</sub> + 2)/(u<sub>n</sub> + 3)</span> نجد:</p>
      <p class="math-equation">v<sub>n+1</sub> = (1/4)v<sub>n</sub></p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">q = 1/4</span> وحدها الأول:</p>
      <p class="math-equation">v<sub>0</sub> = (0 - 1)/(0 + 2) = -1/2</p>
      <p>وبالتالي:</p>
      <p class="math-equation">v<sub>n</sub> = -(1/2)(1/4)<sup>n</sup></p>
      <p>ومن <span class="math">v<sub>n</sub> = (u<sub>n</sub> - 1)/(u<sub>n</sub> + 2)</span> نحصل على:</p>
      <p class="math-equation">u<sub>n</sub> = (1 + 2v<sub>n</sub>)/(1 - v<sub>n</sub>)</p>
      <p>ومنه:</p>
      <p class="math-equation">lim u<sub>n</sub> = 1</p>
      <p><strong>2)</strong> المجموع:</p>
      <p class="math-equation">S<sub>n</sub> = v<sub>0</sub>(1 - q<sup>n+1</sup>)/(1 - q) = (-1/2)(1 - (1/4)<sup>n+1</sup>)/(3/4) = -2/3[1 - (1/4)<sup>n+1</sup>]</p>
      <p><strong>3)</strong> بما أن <span class="math">1/(u<sub>n</sub> + 2) = (1/3)(1 - v<sub>n</sub>)</span>، فإن:</p>
      <p class="math-equation">S'<sub>n</sub> = (1/3)[(n + 1) - S<sub>n</sub>] = (1/3)[n + 1 + (2/3)(1 - (1/4)<sup>n+1</sup>)]</p>`
  },  {
    id: "bac-2016-exp-subject-1-radical",
    branch: "science",
    stream: "experimental",
    year: "2016",
    title: "بكالوريا 2016 - الموضوع الأول - علوم تجريبية (الدالة الجذرية)",
    figureHtml: `<figure class="bac-figure" aria-label="تمثيل بياني للمنحنى C والمستقيم Delta">
      <svg class="bac-graph" viewBox="0 0 420 300" role="img">
        <rect x="0" y="0" width="420" height="300" rx="10" class="graph-bg"></rect>
        <g class="grid-lines"><path d="M80 30V260 M140 30V260 M200 30V260 M260 30V260 M320 30V260 M380 30V260 M40 60H390 M40 110H390 M40 160H390 M40 210H390 M40 260H390"></path></g>
        <g class="axes"><path d="M40 260H395"></path><path d="M80 270V25"></path></g>
        <g class="axis-labels"><text x="74" y="278">0</text><text x="134" y="278">1</text><text x="194" y="278">2</text><text x="254" y="278">3</text><text x="314" y="278">4</text><text x="56" y="214">1</text><text x="56" y="164">2</text><text x="56" y="114">3</text><text x="56" y="64">4</text></g>
        <path class="line-delta" d="M80 260L320 60"></path>
        <path class="curve-f" d="M80 119 C128 106 182 94 242 84 C292 76 343 70 390 66"></path>
        <g class="graph-points"><circle cx="320" cy="60" r="4"></circle></g>
        <text x="280" y="82" class="graph-label">y=x</text>
        <text x="305" y="58" class="graph-label">C</text>
      </svg>
    </figure>`,
    statementHtml: `<div class="bac-statement">
      <p><strong>I.</strong> لتكن الدالة العددية <span class="math">f</span> المعرفة على المجال <span class="math">[0، +∞[</span> بـ:</p>
      <p class="math">f(x)=√(2x+8)</p>
      <p>وتمثيلها البياني <span class="math">(C)</span> في المستوى المنسوب إلى المعلم المتعامد والمتجانس.</p>
      <ol>
        <li>احسب <span class="math">lim f(x)</span> عندما <span class="math">x→+∞</span>.</li>
        <li>ادرس اتجاه تغير الدالة <span class="math">f</span>، ثم شكل جدول تغيراتها.</li>
        <li>عين إحداثيي نقطة تقاطع المنحنى <span class="math">(C)</span> مع المستقيم <span class="math">(Δ)</span> الذي معادلته <span class="math">y=x</span>.</li>
        <li>ارسم <span class="math">(C)</span> و <span class="math">(Δ)</span>.</li>
      </ol>
      <p><strong>II.</strong> المتتالية العددية <span class="math">(uₙ)</span> معرفة بحدها الأول <span class="math">u₀=0</span>، ومن أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math">uₙ₊₁=f(uₙ)</p>
      <ol>
        <li>مثل على محور الفواصل الحدود <span class="math">u₀، u₁، u₂، u₃</span> دون حسابها، موضحا خطوط الإنشاء.</li>
        <li>ضع تخمينا حول اتجاه تغير المتتالية <span class="math">(uₙ)</span> وتقاربها.</li>
        <li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">0≤uₙ&lt;4</span>.</li>
        <li>ادرس اتجاه تغير المتتالية <span class="math">(uₙ)</span>.</li>
        <li>بين أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">4-uₙ₊₁≤(1/2)(4-uₙ)</span>.</li>
        <li>استنتج أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">4-uₙ≤(1/2ⁿ)(4-u₀)</span>، ثم استنتج <span class="math">lim uₙ</span>.</li>
      </ol>
    </div>`,
    quickSolution: `<p><strong>I)</strong> <span class="math">lim f(x) = -∞</span> عند <span class="math">1/2</span>؛ <span class="math">lim f(x) = +∞</span> عند <span class="math">+∞</span>؛ <span class="math">f</span> متزايدة تماما؛ نقطة تقاطع <span class="math">(4, 4)</span>.</p><p><strong>II)</strong> <span class="math">g</span> متزايدة على <span class="math">]1/2, 3/2[</span> ومتناقصة على <span class="math">]3/2, +∞[</span>؛ <span class="math">g(x) = 0</span> عند <span class="math">x = 1</span> و <span class="math">x = β &gt; 3/2</span>.</p><p><strong>III)</strong> <span class="math">(C)</span> فوق <span class="math">y = x</span> على <span class="math">]1/2, 1[ ∪ ]β, +∞[</span> وتحته على <span class="math">]1, β[</span>؛ النهاية الممكنة <span class="math">1</span> أو <span class="math">β</span> حسب المجال.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p>في هذا التمرين، نستعمل دراسة تغير الدالة بالمشتقة، التمثيل البياني للتخمين، البرهان بالتراجع، دراسة الرتابة بإشارة الفرق، النقاط الثابتة، حساب النهاية. الهدف هو إثبات خاصية لكل عدد طبيعي <span class="math">n</span> ودراسة اتجاه تغير المتتالية وحساب النهاية وتحديد النقاط الثابتة.</p>
<p class="pedagogy-step">نستعمل المشتقة لدراسة تغير الدالة وصورة المجال؛ نحدد نقاط التقاطع مع المستقيم <span class="math">y = x</span> لأنها المرشحة للنهاية؛ نستعمل دراسة إشارة الفرق <span class="math">u<sub>n+1</sub> - u<sub>n</sub></span> أو إشارة <span class="math">f(x) - x</span> لأن المطلوب اتجاه التغير؛ نحسب النهاية باستعمال الحصر بين متتاليتين لهما نفس النهاية.</p>
<p><strong>I.</strong> لدينا <span class="math">lim<sub>x→+∞</sub> f(x) = +∞</span>، و:</p>
      <p class="math-equation">f'(x) = 1/√(2x + 8) > 0</p>
      <p>إذن <span class="math">f</span> متزايدة تماما على <span class="math">[0, +∞[</span>.</p>
      <p>نقطة تقاطع <span class="math">(C)</span> مع <span class="math">y = x</span> تحقق <span class="math">x = √(2x + 8)</span>، أي <span class="math">x² = 2x + 8</span>، ومنه <span class="math">(x - 4)(x + 2) = 0</span>. وبما أن <span class="math">x ≥ 0</span>، نجد <span class="math">x = 4</span>. إذن النقطة هي <span class="math">(4, 4)</span>.</p>

<p class="pedagogy-step">نستعمل الحصر بالتراجع على ثلاث مراحل: التحقق عند <span class="math">n = 0</span>، ثم فرضية التراجع، ثم الانتقال من <span class="math">n</span> إلى <span class="math">n + 1</span>؛ ثم ندرس الرتابة بإشارة الفرق <span class="math">u<sub>n+1</sub> - u<sub>n</sub></span> وليس بالتخمين البياني فقط؛ نحسب النهاية باستعمال الحصر بين متتاليتين لهما نفس النهاية.</p>
<p><strong>II.</strong> <strong>برهان بالتراجع:</strong> عند <span class="math">n = 0</span>، لدينا <span class="math">u<sub>0</sub> = 0</span>، إذن <span class="math">0 ≤ u<sub>0</sub> < 4</span>.</p>
      <p>نفترض أن <span class="math">0 ≤ u<sub>n</sub> < 4</span>. فإن:</p>
      <p class="math-equation">0 ≤ u<sub>n+1</sub> = √(2u<sub>n</sub> + 8) < √16 = 4</p>
      <p>إذن الخاصية تثبت بالتراجع.</p>
      <p>كما أن <span class="math">u<sub>n+1</sub> - u<sub>n</sub> = f(u<sub>n</sub>) - u<sub>n</sub></span>، وبما أن <span class="math">f(x) > x</span> على <span class="math">[0, 4[</span>، فإن <span class="math">(u<sub>n</sub>)</span> متزايدة.</p>
      <p>ثم:</p>
      <p class="math-equation">4 - u<sub>n+1</sub> = 4 - √(2u<sub>n</sub> + 8) = 2(4 - u<sub>n</sub>)/(4 + √(2u<sub>n</sub> + 8)) ≤ (1/2)(4 - u<sub>n</sub>)</p>
      <p>وبالتراجع:</p>
      <p class="math-equation">4 - u<sub>n</sub> ≤ (1/2<sup>n</sup>)(4 - u<sub>0</sub>)</p>
      <p>وبالتالي:</p>
      <p class="math-equation">lim u<sub>n</sub> = 4</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نتبع الترتيب التالي: التخمين البياني، دراسة الدالة، تحديد النقاط الثابتة، البرهان بالتراجع، دراسة الرتابة، حساب النهاية، ونكتب النتيجة النهائية في كل جزء.</p>
</div>`,
    conceptHints: [
      {
        "title": "الحصر بالتراجع",
        "hint": "تحقق من n=0، ثم افترض أن u_n داخل المجال، واستعمل علاقة u_{n+1}=f(u_n) أو صورة المجال بالدالة لإثبات بقاء u_{n+1} داخل نفس المجال."
      },
      {
        "title": "رتابة المتتالية",
        "hint": "لدراسة الاتجاه، احسب u_{n+1}-u_n أو درس إشارة f(x)-x على المجال المعطى، واستعمل الحصر لتحديد الإشارة دون الاكتفاء بالتخمين البياني."
      },
      {
        "title": "حساب النهاية",
        "hint": "استعمل العبارة الصريحة أو الحصر أو حقيقة أن q^n يؤول إلى 0 عندما |q|<1 لاستنتاج النهاية."
      },
      {
        "title": "النقاط الثابتة",
        "hint": "حل المعادلة f(x)=x؛ هذه النقاط هي المرشحة الوحيدة للنهاية إذا كانت المتتالية متقاربة."
      }
    ],
    solution: `<p><strong>I.</strong> لدينا <span class="math">lim<sub>x→+∞</sub> f(x) = +∞</span>، و:</p>
      <p class="math-equation">f'(x) = 1/√(2x + 8) > 0</p>
      <p>إذن <span class="math">f</span> متزايدة تماما على <span class="math">[0, +∞[</span>.</p>
      <p>نقطة تقاطع <span class="math">(C)</span> مع <span class="math">y = x</span> تحقق <span class="math">x = √(2x + 8)</span>، أي <span class="math">x² = 2x + 8</span>، ومنه <span class="math">(x - 4)(x + 2) = 0</span>. وبما أن <span class="math">x ≥ 0</span>، نجد <span class="math">x = 4</span>. إذن النقطة هي <span class="math">(4, 4)</span>.</p>
      <p><strong>II.</strong> <strong>برهان بالتراجع:</strong> عند <span class="math">n = 0</span>، لدينا <span class="math">u<sub>0</sub> = 0</span>، إذن <span class="math">0 ≤ u<sub>0</sub> < 4</span>.</p>
      <p>نفترض أن <span class="math">0 ≤ u<sub>n</sub> < 4</span>. فإن:</p>
      <p class="math-equation">0 ≤ u<sub>n+1</sub> = √(2u<sub>n</sub> + 8) < √16 = 4</p>
      <p>إذن الخاصية تثبت بالتراجع.</p>
      <p>كما أن <span class="math">u<sub>n+1</sub> - u<sub>n</sub> = f(u<sub>n</sub>) - u<sub>n</sub></span>، وبما أن <span class="math">f(x) > x</span> على <span class="math">[0, 4[</span>، فإن <span class="math">(u<sub>n</sub>)</span> متزايدة.</p>
      <p>ثم:</p>
      <p class="math-equation">4 - u<sub>n+1</sub> = 4 - √(2u<sub>n</sub> + 8) = 2(4 - u<sub>n</sub>)/(4 + √(2u<sub>n</sub> + 8)) ≤ (1/2)(4 - u<sub>n</sub>)</p>
      <p>وبالتراجع:</p>
      <p class="math-equation">4 - u<sub>n</sub> ≤ (1/2<sup>n</sup>)(4 - u<sub>0</sub>)</p>
      <p>وبالتالي:</p>
      <p class="math-equation">lim u<sub>n</sub> = 4</p>`
  },  {
    id: "bac-2016-exp-subject-2-rational",
    branch: "science",
    stream: "experimental",
    year: "2016",
    title: "بكالوريا 2016 - الموضوع الثاني - علوم تجريبية (الدالة الكسرية)",
    statementHtml: `<div class="bac-statement">
      <p><strong>I.</strong> لتكن الدالة العددية <span class="math">f</span> المعرفة على المجال <span class="math">[0، +∞[</span> بـ:</p>
      <p class="math">f(x)=5x/(x+2)</p>
      <ol>
        <li>احسب <span class="math">lim f(x)</span> عندما <span class="math">x→+∞</span>.</li>
        <li>ادرس اتجاه تغير الدالة <span class="math">f</span>، ثم شكل جدول تغيراتها.</li>
        <li>بين أنه من أجل كل عدد حقيقي <span class="math">x</span> من المجال <span class="math">[0، +∞[</span>: <span class="math">f(x)≥0</span>.</li>
      </ol>
      <p><strong>II.</strong> المتتالية العددية <span class="math">(uₙ)</span> معرفة على <span class="math">N</span> بحدها الأول <span class="math">u₀=1</span>، ومن أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math">uₙ₊₁=5uₙ/(uₙ+2)</p>
      <ol>
        <li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">1≤uₙ≤3</span>.</li>
        <li>ادرس اتجاه تغير المتتالية <span class="math">(uₙ)</span>، ثم استنتج أنها متقاربة.</li>
      </ol>
      <p><strong>2.</strong> المتتالية العددية <span class="math">(vₙ)</span> معرفة على <span class="math">N</span> كما يلي:</p>
      <p class="math">vₙ=1-3/uₙ</p>
      <ol>
        <li>برهن أن <span class="math">(vₙ)</span> متتالية هندسية أساسها <span class="math">2/5</span>، ثم احسب حدها الأول <span class="math">v₀</span>.</li>
        <li>اكتب <span class="math">vₙ</span> بدلالة <span class="math">n</span>، ثم استنتج عبارة <span class="math">uₙ</span> بدلالة <span class="math">n</span>.</li>
        <li>احسب نهاية المتتالية <span class="math">(uₙ)</span>.</li>
      </ol>
      <p><strong>3.</strong> اكتب بدلالة <span class="math">n</span> المجموع:</p>
      <p class="math">Sₙ=1/u₀+1/u₁+1/u₂+...+1/uₙ</p>
    </div>`,
    quickSolution: `<p><strong>I)</strong> <span class="math">lim f(x) = 5</span> عند <span class="math">+∞</span>؛ <span class="math">f</span> متزايدة تماما على <span class="math">[0, +∞[</span>؛ <span class="math">f(x) ≥ 0</span>.</p><p><strong>II)</strong> a) <span class="math">1 ≤ u<sub>n</sub> ≤ 3</span> لكل <span class="math">n</span> &nbsp; b) <span class="math">(u<sub>n</sub>)</span> متزايدة تماما ومقاربة.</p><p><strong>2)</strong> a) <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">2/5</span>، <span class="math">v<sub>0</sub> = -2</span> &nbsp; b) <span class="math">v<sub>n</sub> = -2(2/5)<sup>n</sup></span>؛ <span class="math">u<sub>n</sub> = 3/(1 + 2(2/5)<sup>n</sup>)</span> &nbsp; c) <span class="math">lim u<sub>n</sub> = 3</span>.</p><p><strong>3)</strong> <span class="math">S<sub>n</sub> = (n+1)/3 + (10/9)[1 - (2/5)<sup>n+1</sup>]</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p>في هذا التمرين، نستعمل دراسة تغير الدالة بالمشتقة، التمثيل البياني للتخمين، البرهان بالتراجع، دراسة الرتابة بإشارة الفرق، متتالية مساعدة، المتتالية الهندسية، حساب النهاية، حساب مجموع حدود. الهدف هو إثبات خاصية لكل عدد طبيعي <span class="math">n</span> ودراسة اتجاه تغير المتتالية وإيجاد عبارة الحد العام وحساب النهاية وحساب مجموع حدود.</p>
<p class="pedagogy-step">نستعمل المشتقة لدراسة تغير الدالة وصورة المجال؛ نستعمل دراسة إشارة الفرق <span class="math">u<sub>n+1</sub> - u<sub>n</sub></span> أو إشارة <span class="math">f(x) - x</span> لأن المطلوب اتجاه التغير؛ نحسب النهاية باستعمال الحصر بين متتاليتين لهما نفس النهاية.</p>
<p><strong>I.</strong> لدينا <span class="math">lim<sub>x→+∞</sub> f(x) = 5</span>، و:</p>
      <p class="math-equation">f'(x) = 10/(x + 2)² > 0</p>
      <p>إذن <span class="math">f</span> متزايدة تماما على <span class="math">[0, +∞[</span>. كما أن <span class="math">f(x) ≥ 0</span> لأن <span class="math">x ≥ 0</span> والمقام موجب.</p>

<p class="pedagogy-step">نستعمل الحصر بالتراجع على ثلاث مراحل: التحقق عند <span class="math">n = 0</span>، ثم فرضية التراجع، ثم الانتقال من <span class="math">n</span> إلى <span class="math">n + 1</span>؛ ثم ندرس الرتابة بإشارة الفرق <span class="math">u<sub>n+1</sub> - u<sub>n</sub></span> وليس بالتخمين البياني فقط؛ نحسب النهاية باستعمال الحصر بين متتاليتين لهما نفس النهاية.</p>
<p><strong>II.</strong> <strong>برهان بالتراجع:</strong> عند <span class="math">n = 0</span>، لدينا <span class="math">u<sub>0</sub> = 1</span>، إذن <span class="math">1 ≤ u<sub>0</sub> ≤ 3</span>.</p>
      <p>نفترض أن <span class="math">1 ≤ u<sub>n</sub> ≤ 3</span>. فبما أن <span class="math">f</span> متزايدة، <span class="math">f(1) = 5/3</span> و <span class="math">f(3) = 3</span>، نحصل على <span class="math">1 ≤ u<sub>n+1</sub> ≤ 3</span>.</p>
      <p>كما أن:</p>
      <p class="math-equation">u<sub>n+1</sub> - u<sub>n</sub> = u<sub>n</sub>(3 - u<sub>n</sub>)/(u<sub>n</sub> + 2) ≥ 0</p>
      <p>إذن <span class="math">(u<sub>n</sub>)</span> متزايدة ومحدودة من الأعلى بـ 3، فهي متقاربة.</p>

<p class="pedagogy-step">نعرف متتالية مساعدة حتى نحول العلاقة التراجعية إلى علاقة هندسية بسيطة؛ بعد إيجاد العبارة الصريحة، نستعمل نهاية المتتالية الهندسية <span class="math">q<sup>n</sup></span> لحساب النهاية.</p>
<p><strong>2.</strong> نحسب:</p>
      <p class="math-equation">v<sub>n+1</sub> = 1 - 3/u<sub>n+1</sub> = 1 - 3(u<sub>n</sub> + 2)/(5u<sub>n</sub>) = (2/5)(1 - 3/u<sub>n</sub>) = (2/5)v<sub>n</sub></p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">2/5</span> وحدها الأول <span class="math">v<sub>0</sub> = 1 - 3 = -2</span>. وبالتالي:</p>
      <p class="math-equation">v<sub>n</sub> = -2(2/5)<sup>n</sup></p>
      <p>وبما أن <span class="math">v<sub>n</sub> = 1 - 3/u<sub>n</sub></span>، فإن:</p>
      <p class="math-equation">u<sub>n</sub> = 3/(1 - v<sub>n</sub>) = 3/(1 + 2(2/5)<sup>n</sup>)</p>
      <p>وبالتالي:</p>
      <p class="math-equation">lim u<sub>n</sub> = 3</p>

<p class="pedagogy-step">نستعمل صيغة مجموع حدود متتالية هندسية أو خاصية التلاصق.</p>
<p><strong>3.</strong> بما أن <span class="math">1/u<sub>n</sub> = (1 - v<sub>n</sub>)/3</span>، فإن:</p>
      <p class="math-equation">S<sub>n</sub> = (n + 1)/3 - (1/3)Σ<sub>k=0</sub><sup>n</sup>v<sub>k</sub> = (n + 1)/3 + (2/3) × [1 - (2/5)<sup>n+1</sup>]/[1 - 2/5]</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نتبع الترتيب التالي: التخمين البياني، دراسة الدالة، البرهان بالتراجع، دراسة الرتابة، استعمال متتالية مساعدة، حساب النهاية، حساب المجموع، ونكتب النتيجة النهائية في كل جزء.</p>
</div>`,
    conceptHints: [
      {
        "title": "الحصر بالتراجع",
        "hint": "تحقق من n=0، ثم افترض أن u_n داخل المجال، واستعمل علاقة u_{n+1}=f(u_n) أو صورة المجال بالدالة لإثبات بقاء u_{n+1} داخل نفس المجال."
      },
      {
        "title": "رتابة المتتالية",
        "hint": "لدراسة الاتجاه، احسب u_{n+1}-u_n أو درس إشارة f(x)-x على المجال المعطى، واستعمل الحصر لتحديد الإشارة دون الاكتفاء بالتخمين البياني."
      },
      {
        "title": "المتتالية المساعدة",
        "hint": "عرف v_n حتى نحول العلاقة التراجعية إلى علاقة هندسية بسيطة، ثم أثبت ذلك بحساب النسبة v_{n+1}/v_n."
      },
      {
        "title": "حساب النهاية",
        "hint": "استعمل العبارة الصريحة أو الحصر أو حقيقة أن q^n يؤول إلى 0 عندما |q|<1 لاستنتاج النهاية."
      },
      {
        "title": "حساب المجموع",
        "hint": "حدد نوع الحدود (هندسية، متداخلة، لوغاريتمية) ثم استعمل الصيغة المناسبة للمجموع."
      }
    ],
    solution: `<p><strong>I.</strong> لدينا <span class="math">lim<sub>x→+∞</sub> f(x) = 5</span>، و:</p>
      <p class="math-equation">f'(x) = 10/(x + 2)² > 0</p>
      <p>إذن <span class="math">f</span> متزايدة تماما على <span class="math">[0, +∞[</span>. كما أن <span class="math">f(x) ≥ 0</span> لأن <span class="math">x ≥ 0</span> والمقام موجب.</p>
      <p><strong>II.</strong> <strong>برهان بالتراجع:</strong> عند <span class="math">n = 0</span>، لدينا <span class="math">u<sub>0</sub> = 1</span>، إذن <span class="math">1 ≤ u<sub>0</sub> ≤ 3</span>.</p>
      <p>نفترض أن <span class="math">1 ≤ u<sub>n</sub> ≤ 3</span>. فبما أن <span class="math">f</span> متزايدة، <span class="math">f(1) = 5/3</span> و <span class="math">f(3) = 3</span>، نحصل على <span class="math">1 ≤ u<sub>n+1</sub> ≤ 3</span>.</p>
      <p>كما أن:</p>
      <p class="math-equation">u<sub>n+1</sub> - u<sub>n</sub> = u<sub>n</sub>(3 - u<sub>n</sub>)/(u<sub>n</sub> + 2) ≥ 0</p>
      <p>إذن <span class="math">(u<sub>n</sub>)</span> متزايدة ومحدودة من الأعلى بـ 3، فهي متقاربة.</p>
      <p><strong>2.</strong> نحسب:</p>
      <p class="math-equation">v<sub>n+1</sub> = 1 - 3/u<sub>n+1</sub> = 1 - 3(u<sub>n</sub> + 2)/(5u<sub>n</sub>) = (2/5)(1 - 3/u<sub>n</sub>) = (2/5)v<sub>n</sub></p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">2/5</span> وحدها الأول <span class="math">v<sub>0</sub> = 1 - 3 = -2</span>. وبالتالي:</p>
      <p class="math-equation">v<sub>n</sub> = -2(2/5)<sup>n</sup></p>
      <p>وبما أن <span class="math">v<sub>n</sub> = 1 - 3/u<sub>n</sub></span>، فإن:</p>
      <p class="math-equation">u<sub>n</sub> = 3/(1 - v<sub>n</sub>) = 3/(1 + 2(2/5)<sup>n</sup>)</p>
      <p>وبالتالي:</p>
      <p class="math-equation">lim u<sub>n</sub> = 3</p>
      <p><strong>3.</strong> بما أن <span class="math">1/u<sub>n</sub> = (1 - v<sub>n</sub>)/3</span>، فإن:</p>
      <p class="math-equation">S<sub>n</sub> = (n + 1)/3 - (1/3)Σ<sub>k=0</sub><sup>n</sup>v<sub>k</sub> = (n + 1)/3 + (2/3) × [1 - (2/5)<sup>n+1</sup>]/[1 - 2/5]</p>`
  },  {
    id: "bac-2014-exp-subject-1",
    branch: "science",
    stream: "experimental",
    year: "2014",
    title: "بكالوريا 2014 - الموضوع الأول - علوم تجريبية",
    statementHtml: `<div class="bac-statement">
      <p>لتكن المتتالية العددية <span class="math">(uₙ)</span> المعرفة كما يلي:</p>
      <p class="math">u₀=1 ، uₙ₊₁=(2/3)uₙ-4/3</p>
      <p>والمتتالية العددية <span class="math">(vₙ)</span> المعرفة كما يلي، من أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math">vₙ=uₙ+4</p>
      <ol>
        <li>بين أن <span class="math">(vₙ)</span> متتالية هندسية، ثم عين أساسها وحدها الأول.</li>
        <li>اكتب كلا من <span class="math">vₙ</span> و <span class="math">uₙ</span> بدلالة <span class="math">n</span>.</li>
        <li>ادرس اتجاه تغير المتتالية <span class="math">(uₙ)</span> على <span class="math">N</span>.</li>
        <li>احسب بدلالة <span class="math">n</span> المجموع: <span class="math">Sₙ=u₀+u₁+u₂+...+uₙ</span>.</li>
      </ol>
      <p><strong>5.</strong> لتكن المتتالية العددية <span class="math">(wₙ)</span> المعرفة على <span class="math">N</span> كما يلي:</p>
      <p class="math">wₙ=5(1/(vₙ+5)-1)</p>
      <ol>
        <li>بين أن المتتالية <span class="math">(wₙ)</span> متزايدة تماما على <span class="math">N</span>.</li>
        <li>احسب <span class="math">lim(uₙ-wₙ)</span>.</li>
      </ol>
    </div>`,
    quickSolution: `<p><strong>1)</strong> <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">2/3</span>، <span class="math">v<sub>0</sub> = 5</span>؛ <span class="math">v<sub>n</sub> = 5(2/3)<sup>n</sup></span>؛ <span class="math">u<sub>n</sub> = 5(2/3)<sup>n</sup> - 4</span>.</p><p><strong>2)</strong> <span class="math">(u<sub>n</sub>)</span> متناقصة تماما.</p><p><strong>3)</strong> <span class="math">S<sub>n</sub> = 15[1 - (2/3)<sup>n+1</sup>] - 4(n+1)</span>.</p><p><strong>4)</strong> a) <span class="math">(w<sub>n</sub>)</span> متزايدة تماما &nbsp; b) <span class="math">lim (u<sub>n</sub> - w<sub>n</sub>) = 0</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p>في هذا التمرين، نستعمل دراسة تغير الدالة بالمشتقة، دراسة الرتابة بإشارة الفرق، متتالية مساعدة، المتتالية الهندسية، حساب النهاية، حساب مجموع حدود. الهدف هو دراسة اتجاه تغير المتتالية وإيجاد عبارة الحد العام وحساب النهاية وحساب مجموع حدود.</p>
<p class="pedagogy-step">نستعمل دراسة إشارة الفرق <span class="math">u<sub>n+1</sub> - u<sub>n</sub></span> أو إشارة <span class="math">f(x) - x</span> لأن المطلوب اتجاه التغير؛ نعرف متتالية مساعدة حتى نحول العلاقة التراجعية إلى علاقة هندسية بسيطة.</p>
<p><strong>1)</strong> لدينا <span class="math">v<sub>n</sub> = u<sub>n</sub> + 4</span>، وبالتالي:</p>
      <p class="math-equation">v<sub>n+1</sub> = u<sub>n+1</sub> + 4 = (2/3)u<sub>n</sub> - 4/3 + 4 = (2/3)(u<sub>n</sub> + 4) = (2/3)v<sub>n</sub></p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">2/3</span> وحدها الأول <span class="math">v<sub>0</sub> = 5</span>. ومنه:</p>
      <p class="math-equation">v<sub>n</sub> = 5(2/3)<sup>n</sup></p>
      <p>و:</p>
      <p class="math-equation">u<sub>n</sub> = v<sub>n</sub> - 4 = 5(2/3)<sup>n</sup> - 4</p>
      <p>بما أن <span class="math">(2/3)<sup>n</sup></span> متناقصة، فإن <span class="math">(u<sub>n</sub>)</span> متناقصة تماما.</p>

<p class="pedagogy-step">نستعمل صيغة مجموع حدود متتالية هندسية أو خاصية التلاصق.</p>
<p><strong>2)</strong> المجموع:</p>
      <p class="math-equation">S<sub>n</sub> = Σ<sub>k=0</sub><sup>n</sup> [5(2/3)<sup>k</sup> - 4] = 15[1 - (2/3)<sup>n+1</sup>] - 4(n + 1)</p>

<p class="pedagogy-step">نستعمل المشتقة لدراسة تغير الدالة وصورة المجال؛ نستعمل دراسة إشارة الفرق <span class="math">u<sub>n+1</sub> - u<sub>n</sub></span> أو إشارة <span class="math">f(x) - x</span> لأن المطلوب اتجاه التغير؛ نحسب النهاية باستعمال النهايات المرجعية.</p>
<p><strong>3)</strong> بالنسبة إلى <span class="math">w<sub>n</sub></span>، بما أن <span class="math">v<sub>n</sub></span> متناقصة موجبة فإن <span class="math">v<sub>n</sub> + 5</span> متناقصة و <span class="math">1/(v<sub>n</sub> + 5)</span> متزايدة، وبالتالي <span class="math">w<sub>n</sub></span> متزايدة تماما.</p>
      <p>وأخيرا:</p>
      <p class="math-equation">lim u<sub>n</sub> = -4</p>
      <p class="math-equation">lim w<sub>n</sub> = 5(1/5 - 1) = -4</p>
      <p>ومنه:</p>
      <p class="math-equation">lim (u<sub>n</sub> - w<sub>n</sub>) = 0</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نتبع الترتيب التالي: دراسة الدالة، دراسة الرتابة، استعمال متتالية مساعدة، حساب النهاية، حساب المجموع، ونكتب النتيجة النهائية في كل جزء.</p>
</div>`,
    solution: `<p><strong>1)</strong> لدينا <span class="math">v<sub>n</sub> = u<sub>n</sub> + 4</span>، وبالتالي:</p>
      <p class="math-equation">v<sub>n+1</sub> = u<sub>n+1</sub> + 4 = (2/3)u<sub>n</sub> - 4/3 + 4 = (2/3)(u<sub>n</sub> + 4) = (2/3)v<sub>n</sub></p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">2/3</span> وحدها الأول <span class="math">v<sub>0</sub> = 5</span>. ومنه:</p>
      <p class="math-equation">v<sub>n</sub> = 5(2/3)<sup>n</sup></p>
      <p>و:</p>
      <p class="math-equation">u<sub>n</sub> = v<sub>n</sub> - 4 = 5(2/3)<sup>n</sup> - 4</p>
      <p>بما أن <span class="math">(2/3)<sup>n</sup></span> متناقصة، فإن <span class="math">(u<sub>n</sub>)</span> متناقصة تماما.</p>
      <p><strong>2)</strong> المجموع:</p>
      <p class="math-equation">S<sub>n</sub> = Σ<sub>k=0</sub><sup>n</sup> [5(2/3)<sup>k</sup> - 4] = 15[1 - (2/3)<sup>n+1</sup>] - 4(n + 1)</p>
      <p><strong>3)</strong> بالنسبة إلى <span class="math">w<sub>n</sub></span>، بما أن <span class="math">v<sub>n</sub></span> متناقصة موجبة فإن <span class="math">v<sub>n</sub> + 5</span> متناقصة و <span class="math">1/(v<sub>n</sub> + 5)</span> متزايدة، وبالتالي <span class="math">w<sub>n</sub></span> متزايدة تماما.</p>
      <p>وأخيرا:</p>
      <p class="math-equation">lim u<sub>n</sub> = -4</p>
      <p class="math-equation">lim w<sub>n</sub> = 5(1/5 - 1) = -4</p>
      <p>ومنه:</p>
      <p class="math-equation">lim (u<sub>n</sub> - w<sub>n</sub>) = 0</p>`
  },  {
    id: "bac-2014-exp-subject-2-exponential",
    branch: "science",
    stream: "experimental",
    year: "2014",
    title: "بكالوريا 2014 - الموضوع الثاني - علوم تجريبية (المتتالية الأسية)",
    statementHtml: `<div class="bac-statement">
      <p><strong>I.</strong> نعتبر المتتالية العددية <span class="math">(uₙ)</span> المعرفة على مجموعة الأعداد الطبيعية <span class="math">N</span> بحدها العام:</p>
      <p class="math">uₙ=e^(1/2-n)</p>
      <p>حيث <span class="math">e</span> هو أساس اللوغاريتم النيبيري.</p>
      <ol>
        <li>بين أن <span class="math">(uₙ)</span> متتالية هندسية، ثم عين أساسها وحدها الأول.</li>
        <li>احسب <span class="math">lim uₙ</span>. ماذا تستنتج؟</li>
        <li>احسب بدلالة <span class="math">n</span> المجموع <span class="math">Sₙ=u₀+u₁+u₂+...+uₙ</span>.</li>
      </ol>
      <p><strong>II.</strong> نضع من أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math">vₙ=ln(uₙ)</p>
      <ol>
        <li>عبر عن <span class="math">vₙ</span> بدلالة <span class="math">n</span>، ثم استنتج نوع المتتالية <span class="math">(vₙ)</span>.</li>
        <li>احسب بدلالة <span class="math">n</span> العدد <span class="math">Pₙ=ln(u₀×u₁×u₂×...×uₙ)</span>.</li>
        <li>عين مجموعة قيم العدد الطبيعي <span class="math">n</span> بحيث: <span class="math">Pₙ+4n&gt;0</span>.</li>
      </ol>
    </div>`,
    quickSolution: `<p><strong>I)</strong> <span class="math">(u<sub>n</sub>)</span> هندسية أساسها <span class="math">e<sup>-1</sup></span>، <span class="math">u<sub>0</sub> = e<sup>1/2</sup></span>؛ <span class="math">lim u<sub>n</sub> = 0</span>؛ <span class="math">S<sub>n</sub> = e<sup>1/2</sup>(1 - e<sup>-(n+1)</sup>)/(1 - e<sup>-1</sup>)</span>.</p><p><strong>II)</strong> <span class="math">v<sub>n</sub> = 1/2 - n</span> (حسابية أساسها <span class="math">-1</span>)؛ <span class="math">P<sub>n</sub> = (1 - n²)/2</span>؛ <span class="math">n ∈ {0, 1, ..., 8}</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p>في هذا التمرين، نستعمل متتالية مساعدة، المتتالية الحسابية، المتتالية الهندسية، حساب النهاية، حساب مجموع حدود، خواص اللوغاريتمات، حساب جداء حدود. الهدف هو إيجاد عبارة الحد العام وحساب النهاية وحساب مجموع حدود.</p>
<p class="pedagogy-step">نستعمل تعريف المتتالية الهندسية لأن النسبة بين حدين متتاليين ثابتة؛ بعد إيجاد العبارة الصريحة، نستعمل نهاية المتتالية الهندسية <span class="math">q<sup>n</sup></span> لحساب النهاية؛ نستعمل صيغة مجموع حدود متتالية هندسية أو خاصية التلاصق.</p>
<p><strong>I.</strong> لدينا:</p>
      <p class="math-equation">u<sub>n+1</sub>/u<sub>n</sub> = e<sup>1/2-(n+1)</sup>/e<sup>1/2-n</sup> = e<sup>-1</sup></p>
      <p>إذن <span class="math">(u<sub>n</sub>)</span> هندسية أساسها <span class="math">q = e<sup>-1</sup></span> وحدها الأول <span class="math">u<sub>0</sub> = e<sup>1/2</sup></span>.</p>
      <p>وبما أن <span class="math">0 &lt; e<sup>-1</sup> &lt; 1</span> فإن:</p>
      <p class="math-equation">lim u<sub>n</sub> = 0</p>
      <p>وبالتالي المتتالية متقاربة نحو 0.</p>
      <p class="math-equation">S<sub>n</sub> = u<sub>0</sub>(1 - q<sup>n+1</sup>)/(1 - q) = e<sup>1/2</sup>(1 - e<sup>-(n+1)</sup>)/(1 - e<sup>-1</sup>)</p>

<p class="pedagogy-step">نعرف متتالية مساعدة حتى نحول العلاقة التراجعية إلى علاقة هندسية بسيطة؛ نستعمل عبارة الحدود وخواص الأسس لحساب الجداء.</p>
<p><strong>II.</strong> لدينا:</p>
      <p class="math-equation">v<sub>n</sub> = ln(u<sub>n</sub>) = 1/2 - n</p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> حسابية أساسها <span class="math">-1</span> وحدها الأول <span class="math">1/2</span>.</p>
      <p>ثم:</p>
      <p class="math-equation">P<sub>n</sub> = ln(∏<sub>k=0</sub><sup>n</sup>u<sub>k</sub>) = Σ<sub>k=0</sub><sup>n</sup>ln(u<sub>k</sub>) = Σ<sub>k=0</sub><sup>n</sup>(1/2 - k) = (n + 1)/2 - n(n + 1)/2 = (1 - n²)/2</p>
      <p>الشرط <span class="math">P<sub>n</sub> + 4n &gt; 0</span> يعطي:</p>
      <p class="math-equation">(1 - n²)/2 + 4n &gt; 0 &nbsp; أي &nbsp; n² - 8n - 1 &lt; 0</p>
      <p>ومنه للأعداد الطبيعية:</p>
      <p class="math-equation">n ∈ {0, 1, 2, 3, 4, 5, 6, 7, 8}</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نتبع الترتيب التالي: استعمال متتالية مساعدة، حساب النهاية، حساب المجموع، حساب الجداء، ونكتب النتيجة النهائية في كل جزء.</p>
</div>`,
    conceptHints: [
      {
        "title": "المتتالية المساعدة",
        "hint": "عرف v_n حتى نحول العلاقة التراجعية إلى علاقة هندسية بسيطة، ثم أثبت ذلك بحساب النسبة v_{n+1}/v_n."
      },
      {
        "title": "حساب النهاية",
        "hint": "استعمل العبارة الصريحة أو الحصر أو حقيقة أن q^n يؤول إلى 0 عندما |q|<1 لاستنتاج النهاية."
      },
      {
        "title": "حساب المجموع",
        "hint": "حدد نوع الحدود (هندسية، متداخلة، لوغاريتمية) ثم استعمل الصيغة المناسبة للمجموع."
      },
      {
        "title": "اللوغاريتمات",
        "hint": "استعمل خاصية ln(ab)=ln a+ln b وln(a^k)=k ln a لتبسيط المجاميع والجداوي."
      }
    ],
    solution: `<p><strong>I.</strong> لدينا:</p>
      <p class=\"math-equation\">u<sub>n+1</sub>/u<sub>n</sub> = e<sup>1/2-(n+1)</sup>/e<sup>1/2-n</sup> = e<sup>-1</sup></p>
      <p>إذن <span class=\"math\">(u<sub>n</sub>)</span> هندسية أساسها <span class=\"math\">q = e<sup>-1</sup></span> وحدها الأول <span class=\"math\">u<sub>0</sub> = e<sup>1/2</sup></span>.</p>
      <p>وبما أن <span class=\"math\">0 &lt; e<sup>-1</sup> &lt; 1</span> فإن:</p>
      <p class=\"math-equation\">lim u<sub>n</sub> = 0</p>
      <p>وبالتالي المتتالية متقاربة نحو 0.</p>
      <p class=\"math-equation\">S<sub>n</sub> = u<sub>0</sub>(1 - q<sup>n+1</sup>)/(1 - q) = e<sup>1/2</sup>(1 - e<sup>-(n+1)</sup>)/(1 - e<sup>-1</sup>)</p>
      <p><strong>II.</strong> لدينا:</p>
      <p class=\"math-equation\">v<sub>n</sub> = ln(u<sub>n</sub>) = 1/2 - n</p>
      <p>إذن <span class=\"math\">(v<sub>n</sub>)</span> حسابية أساسها <span class=\"math\">-1</span> وحدها الأول <span class=\"math\">1/2</span>.</p>
      <p>ثم:</p>
      <p class=\"math-equation\">P<sub>n</sub> = ln(∏<sub>k=0</sub><sup>n</sup>u<sub>k</sub>) = Σ<sub>k=0</sub><sup>n</sup>ln(u<sub>k</sub>) = Σ<sub>k=0</sub><sup>n</sup>(1/2 - k) = (n + 1)/2 - n(n + 1)/2 = (1 - n²)/2</p>
      <p>الشرط <span class=\"math\">P<sub>n</sub> + 4n &gt; 0</span> يعطي:</p>
      <p class=\"math-equation\">(1 - n²)/2 + 4n &gt; 0 &nbsp; أي &nbsp; n² - 8n - 1 &lt; 0</p>
      <p>ومنه للأعداد الطبيعية:</p>
      <p class=\"math-equation\">n ∈ {0, 1, 2, 3, 4, 5, 6, 7, 8}</p>`
  },  {
    id: "bac-2013-exp-subject-1",
    branch: "science",
    stream: "experimental",
    year: "2013",
    title: "بكالوريا 2013 - الموضوع الأول - علوم تجريبية",
    statementHtml: `<div class="bac-statement">
      <p><strong>I.</strong> المتتالية <span class="math">(vₙ)</span> معرفة على <span class="math">N</span> بـ:</p>
      <p class="math">vₙ=5ⁿ⁺¹/6ⁿ</p>
      <ol>
        <li>بين أن <span class="math">(vₙ)</span> متتالية هندسية، ثم حدد أساسها وحدها الأول.</li>
        <li>احسب <span class="math">lim vₙ</span>.</li>
      </ol>
      <p><strong>II.</strong> المتتالية <span class="math">(uₙ)</span> معرفة بـ <span class="math">u₀=1</span>، ومن أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math">uₙ₊₁=√(5uₙ+6)</p>
      <ol>
        <li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">1≤uₙ≤6</span>.</li>
        <li>ادرس اتجاه تغير المتتالية <span class="math">(uₙ)</span>.</li>
        <li>برهن أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">6-uₙ₊₁≤(5/6)(6-uₙ)</span>.</li>
        <li>بين أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">0≤6-uₙ≤vₙ</span>، ثم استنتج <span class="math">lim uₙ</span>.</li>
      </ol>
    </div>`,
    quickSolution: `<p><strong>I)</strong> <span class="math">v<sub>n</sub> = 5(5/6)<sup>n</sup></span>؛ <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">5/6</span>، <span class="math">v<sub>0</sub> = 5</span>؛ <span class="math">lim v<sub>n</sub> = 0</span>.</p><p><strong>II)</strong> a) <span class="math">1 ≤ u<sub>n</sub> ≤ 6</span> لكل <span class="math">n</span> &nbsp; b) <span class="math">(u<sub>n</sub>)</span> متزايدة &nbsp; c) <span class="math">6 - u<sub>n+1</sub> ≤ (5/6)(6 - u<sub>n</sub>)</span> &nbsp; d) <span class="math">0 ≤ 6 - u<sub>n</sub> ≤ v<sub>n</sub></span>؛ <span class="math">lim u<sub>n</sub> = 6</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p>في هذا التمرين، نستعمل البرهان بالتراجع، دراسة الرتابة بإشارة الفرق، متتالية مساعدة، المتتالية الهندسية، حساب النهاية. الهدف هو إثبات خاصية لكل عدد طبيعي <span class="math">n</span> ودراسة اتجاه تغير المتتالية وإيجاد عبارة الحد العام وحساب النهاية.</p>
<p class="pedagogy-step">نعرف متتالية مساعدة حتى نحول العلاقة التراجعية إلى علاقة هندسية بسيطة؛ بعد إيجاد العبارة الصريحة، نستعمل نهاية المتتالية الهندسية <span class="math">q<sup>n</sup></span> لحساب النهاية.</p>
<p><strong>I.</strong> نكتب:</p>
      <p class="math-equation">v<sub>n</sub> = 5 · (5/6)<sup>n</sup></p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">5/6</span> وحدها الأول <span class="math">v<sub>0</sub> = 5</span>.</p>
      <p>وبما أن <span class="math">|5/6| &lt; 1</span> فإن:</p>
      <p class="math-equation">lim v<sub>n</sub> = 0</p>

<p class="pedagogy-step">نستعمل الحصر بالتراجع على ثلاث مراحل: التحقق عند <span class="math">n = 0</span>، ثم فرضية التراجع، ثم الانتقال من <span class="math">n</span> إلى <span class="math">n + 1</span>؛ ثم ندرس الرتابة بإشارة الفرق <span class="math">u<sub>n+1</sub> - u<sub>n</sub></span> وليس بالتخمين البياني فقط؛ نحسب النهاية باستعمال الحصر بين متتاليتين لهما نفس النهاية.</p>
<p><strong>II.</strong> بالنسبة إلى <span class="math">(u<sub>n</sub>)</span>:</p>
      <p>إذا كان <span class="math">1 ≤ u<sub>n</sub> ≤ 6</span> فإن <span class="math">11 ≤ 5u<sub>n</sub> + 6 ≤ 36</span>، ومنه <span class="math">1 ≤ u<sub>n+1</sub> ≤ 6</span>. فتثبت الخاصية بالتراجع.</p>
      <p>كما أن <span class="math">u<sub>n+1</sub> ≥ u<sub>n</sub></span> لأن:</p>
      <p class="math-equation">√(5u<sub>n</sub> + 6) ≥ u<sub>n</sub> &nbsp; ⇔ &nbsp; u<sub>n</sub>² - 5u<sub>n</sub> - 6 ≤ 0 &nbsp; ⇔ &nbsp; (u<sub>n</sub> - 6)(u<sub>n</sub> + 1) ≤ 0</p>
      <p>وهذا صحيح عندما <span class="math">1 ≤ u<sub>n</sub> ≤ 6</span>، إذن <span class="math">(u<sub>n</sub>)</span> متزايدة.</p>
      <p>ثم:</p>
      <p class="math-equation">6 - u<sub>n+1</sub> = 6 - √(5u<sub>n</sub> + 6) = [36 - (5u<sub>n</sub> + 6)]/[6 + √(5u<sub>n</sub> + 6)] = 5(6 - u<sub>n</sub>)/(6 + u<sub>n+1</sub>) ≤ (5/6)(6 - u<sub>n</sub>)</p>
      <p>وبالتراجع نحصل على:</p>
      <p class="math-equation">0 ≤ 6 - u<sub>n</sub> ≤ 5(5/6)<sup>n</sup> = v<sub>n</sub></p>
      <p>ومنه بما أن <span class="math">v<sub>n</sub></span> يؤول إلى 0 فإن:</p>
      <p class="math-equation">lim u<sub>n</sub> = 6</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نتبع الترتيب التالي: البرهان بالتراجع، دراسة الرتابة، استعمال متتالية مساعدة، حساب النهاية، ونكتب النتيجة النهائية في كل جزء.</p>
</div>`,
    solution: `<p><strong>I.</strong> نكتب:</p>
      <p class=\"math-equation\">v<sub>n</sub> = 5 · (5/6)<sup>n</sup></p>
      <p>إذن <span class=\"math\">(v<sub>n</sub>)</span> هندسية أساسها <span class=\"math\">5/6</span> وحدها الأول <span class=\"math\">v<sub>0</sub> = 5</span>.</p>
      <p>وبما أن <span class=\"math\">|5/6| &lt; 1</span> فإن:</p>
      <p class=\"math-equation\">lim v<sub>n</sub> = 0</p>
      <p><strong>II.</strong> بالنسبة إلى <span class=\"math\">(u<sub>n</sub>)</span>:</p>
      <p>إذا كان <span class=\"math\">1 ≤ u<sub>n</sub> ≤ 6</span> فإن <span class=\"math\">11 ≤ 5u<sub>n</sub> + 6 ≤ 36</span>، ومنه <span class=\"math\">1 ≤ u<sub>n+1</sub> ≤ 6</span>. فتثبت الخاصية بالتراجع.</p>
      <p>كما أن <span class=\"math\">u<sub>n+1</sub> ≥ u<sub>n</sub></span> لأن:</p>
      <p class=\"math-equation\">√(5u<sub>n</sub> + 6) ≥ u<sub>n</sub> &nbsp; ⇔ &nbsp; u<sub>n</sub>² - 5u<sub>n</sub> - 6 ≤ 0 &nbsp; ⇔ &nbsp; (u<sub>n</sub> - 6)(u<sub>n</sub> + 1) ≤ 0</p>
      <p>وهذا صحيح عندما <span class=\"math\">1 ≤ u<sub>n</sub> ≤ 6</span>، إذن <span class=\"math\">(u<sub>n</sub>)</span> متزايدة.</p>
      <p>ثم:</p>
      <p class=\"math-equation\">6 - u<sub>n+1</sub> = 6 - √(5u<sub>n</sub> + 6) = [36 - (5u<sub>n</sub> + 6)]/[6 + √(5u<sub>n</sub> + 6)] = 5(6 - u<sub>n</sub>)/(6 + u<sub>n+1</sub>) ≤ (5/6)(6 - u<sub>n</sub>)</p>
      <p>وبالتراجع نحصل على:</p>
      <p class=\"math-equation\">0 ≤ 6 - u<sub>n</sub> ≤ 5(5/6)<sup>n</sup> = v<sub>n</sub></p>
      <p>ومنه بما أن <span class=\"math\">v<sub>n</sub></span> يؤول إلى 0 فإن:</p>
      <p class=\"math-equation\">lim u<sub>n</sub> = 6</p>`
  },  {
    id: "bac-2013-exp-subject-2",
    branch: "science",
    stream: "experimental",
    year: "2013",
    title: "بكالوريا 2013 - الموضوع الثاني - علوم تجريبية",
    figureHtml: `<figure class="bac-figure" aria-label="تمثيل بياني للدالة f والمستقيم y=x">
      <svg class="bac-graph" viewBox="0 0 420 300" role="img">
        <rect x="0" y="0" width="420" height="300" rx="10" class="graph-bg"></rect>
        <g class="grid-lines"><path d="M80 30V260 M140 30V260 M200 30V260 M260 30V260 M320 30V260 M380 30V260 M40 60H390 M40 110H390 M40 160H390 M40 210H390 M40 260H390"></path></g>
        <g class="axes"><path d="M40 260H395"></path><path d="M80 270V25"></path></g>
        <g class="axis-labels"><text x="74" y="278">0</text><text x="134" y="278">0.2</text><text x="194" y="278">0.4</text><text x="254" y="278">0.6</text><text x="314" y="278">0.8</text><text x="374" y="278">1</text><text x="56" y="214">0.2</text><text x="56" y="164">0.4</text><text x="56" y="114">0.6</text><text x="56" y="64">0.8</text></g>
        <path class="line-delta" d="M80 260L380 10"></path>
        <path class="curve-f" d="M80 260 C130 178 198 122 270 84 C315 61 352 48 380 40"></path>
        <text x="302" y="72" class="graph-label">Cf</text>
        <text x="280" y="92" class="graph-label">y=x</text>
      </svg>
    </figure>`,
    statementHtml: `<div class="bac-statement">
      <p>في الشكل المقابل، <span class="math">(Cf)</span> هو التمثيل البياني للدالة <span class="math">f</span> المعرفة على المجال <span class="math">[0،1]</span> بالعلاقة:</p>
      <p class="math">f(x)=2x/(x+1)</p>
      <p>والمستقيم <span class="math">(d)</span> معادلته <span class="math">y=x</span>.</p>
      <p><strong>1.</strong> المتتالية العددية <span class="math">(uₙ)</span> معرفة على <span class="math">N</span> بحدها الأول <span class="math">u₀=1/2</span>، ومن أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math">uₙ₊₁=f(uₙ)</p>
      <ol>
        <li>انقل الشكل، ثم مثل بيانيا وبطريقة الإنشاء الحدود <span class="math">u₀، u₁، u₂، u₃، u₄</span> على محور الفواصل دون حسابها.</li>
        <li>ضع تخمينا حول اتجاه تغير المتتالية <span class="math">(uₙ)</span> وتقاربها.</li>
      </ol>
      <p><strong>2.</strong></p>
      <ol>
        <li>أثبت أن الدالة <span class="math">f</span> متزايدة تماما على المجال <span class="math">[0،1]</span>.</li>
        <li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">0&lt;uₙ≤1</span>.</li>
        <li>ادرس اتجاه تغير المتتالية <span class="math">(uₙ)</span>.</li>
      </ol>
      <p><strong>3.</strong> نعتبر المتتالية العددية <span class="math">(vₙ)</span> المعرفة كما يلي:</p>
      <p class="math">vₙ=(uₙ-1)/uₙ</p>
      <ol>
        <li>برهن أن <span class="math">(vₙ)</span> متتالية هندسية أساسها <span class="math">1/2</span>، ثم احسب حدها الأول <span class="math">v₀</span>.</li>
        <li>احسب نهاية <span class="math">(uₙ)</span>.</li>
      </ol>
    </div>`,
    quickSolution: `<p><strong>1)</strong> تمثيل بياني للحدود؛ التخمين: <span class="math">(u<sub>n</sub>)</span> متزايدة وتتقارب نحو <span class="math">1</span>.</p><p><strong>2)</strong> a) <span class="math">f</span> متزايدة تماما على <span class="math">[0,1]</span> &nbsp; b) <span class="math">0 &lt; u<sub>n</sub> ≤ 1</span> لكل <span class="math">n</span> &nbsp; c) <span class="math">(u<sub>n</sub>)</span> متزايدة ومقاربة.</p><p><strong>3)</strong> a) <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">1/2</span>، <span class="math">v<sub>0</sub> = -1</span> &nbsp; b) <span class="math">lim u<sub>n</sub> = 1</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p>في هذا التمرين، نستعمل دراسة تغير الدالة بالمشتقة، التمثيل البياني للتخمين، البرهان بالتراجع، دراسة الرتابة بإشارة الفرق، متتالية مساعدة، المتتالية الهندسية، النقاط الثابتة، حساب النهاية. الهدف هو إثبات خاصية لكل عدد طبيعي <span class="math">n</span> ودراسة اتجاه تغير المتتالية وإيجاد عبارة الحد العام وحساب النهاية وتحديد النقاط الثابتة.</p>
<p class="pedagogy-step">نستعمل الحصر بالتراجع على ثلاث مراحل: التحقق عند <span class="math">n = 0</span>، ثم فرضية التراجع، ثم الانتقال من <span class="math">n</span> إلى <span class="math">n + 1</span>؛ ثم ندرس الرتابة بإشارة الفرق <span class="math">u<sub>n+1</sub> - u<sub>n</sub></span> وليس بالتخمين البياني فقط؛ نحسب النهاية باستعمال الحصر بين متتاليتين لهما نفس النهاية.</p>
<p><strong>2.</strong> لدينا:</p>
      <p class="math-equation">f'(x) = 2/(x + 1)² &gt; 0</p>
      <p>إذن <span class="math">f</span> متزايدة تماما على <span class="math">[0, 1]</span>.</p>
      <p>إذا كان <span class="math">0 &lt; u<sub>n</sub> ≤ 1</span> فإن <span class="math">0 &lt; 2u<sub>n</sub>/(u<sub>n</sub> + 1) ≤ 1</span>، فتثبت الخاصية بالتراجع.</p>
      <p>كما أن:</p>
      <p class="math-equation">u<sub>n+1</sub> - u<sub>n</sub> = 2u<sub>n</sub>/(u<sub>n</sub> + 1) - u<sub>n</sub> = u<sub>n</sub>(1 - u<sub>n</sub>)/(u<sub>n</sub> + 1) ≥ 0</p>
      <p>إذن <span class="math">(u<sub>n</sub>)</span> متزايدة ومحدودة من الأعلى بـ <span class="math">1</span>، فهي متقاربة.</p>

<p class="pedagogy-step">نعرف متتالية مساعدة حتى نحول العلاقة التراجعية إلى علاقة هندسية بسيطة؛ بعد إيجاد العبارة الصريحة، نستعمل نهاية المتتالية الهندسية <span class="math">q<sup>n</sup></span> لحساب النهاية.</p>
<p><strong>3.</strong> نضع:</p>
      <p class="math-equation">v<sub>n</sub> = (u<sub>n</sub> - 1)/u<sub>n</sub> = 1 - 1/u<sub>n</sub></p>
      <p>عندئذ:</p>
      <p class="math-equation">v<sub>n+1</sub> = (u<sub>n+1</sub> - 1)/u<sub>n+1</sub> = (u<sub>n</sub> - 1)/(2u<sub>n</sub>) = (1/2)v<sub>n</sub></p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">1/2</span> وحدها الأول <span class="math">v<sub>0</sub> = (1/2 - 1)/(1/2) = -1</span>.</p>
      <p>ومنه:</p>
      <p class="math-equation">v<sub>n</sub> = -(1/2)<sup>n</sup></p>
      <p>وبما أن <span class="math">v<sub>n</sub></span> يؤول إلى 0 فإن <span class="math">1 - 1/u<sub>n</sub></span> يؤول إلى 0، وبالتالي:</p>
      <p class="math-equation">lim u<sub>n</sub> = 1</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نتبع الترتيب التالي: التخمين البياني، دراسة الدالة، تحديد النقاط الثابتة، البرهان بالتراجع، دراسة الرتابة، استعمال متتالية مساعدة، حساب النهاية، ونكتب النتيجة النهائية في كل جزء.</p>
</div>`,
    conceptHints: [
      {
        "title": "الحصر بالتراجع",
        "hint": "تحقق من n=0، ثم افترض أن u_n داخل المجال، واستعمل علاقة u_{n+1}=f(u_n) أو صورة المجال بالدالة لإثبات بقاء u_{n+1} داخل نفس المجال."
      },
      {
        "title": "رتابة المتتالية",
        "hint": "لدراسة الاتجاه، احسب u_{n+1}-u_n أو درس إشارة f(x)-x على المجال المعطى، واستعمل الحصر لتحديد الإشارة دون الاكتفاء بالتخمين البياني."
      },
      {
        "title": "المتتالية المساعدة",
        "hint": "عرف v_n حتى نحول العلاقة التراجعية إلى علاقة هندسية بسيطة، ثم أثبت ذلك بحساب النسبة v_{n+1}/v_n."
      },
      {
        "title": "حساب النهاية",
        "hint": "استعمل العبارة الصريحة أو الحصر أو حقيقة أن q^n يؤول إلى 0 عندما |q|<1 لاستنتاج النهاية."
      },
      {
        "title": "النقاط الثابتة",
        "hint": "حل المعادلة f(x)=x؛ هذه النقاط هي المرشحة الوحيدة للنهاية إذا كانت المتتالية متقاربة."
      }
    ],
    solution: `<p><strong>2.</strong> لدينا:</p>
      <p class=\"math-equation\">f'(x) = 2/(x + 1)² &gt; 0</p>
      <p>إذن <span class=\"math\">f</span> متزايدة تماما على <span class=\"math\">[0, 1]</span>.</p>
      <p>إذا كان <span class=\"math\">0 &lt; u<sub>n</sub> ≤ 1</span> فإن <span class=\"math\">0 &lt; 2u<sub>n</sub>/(u<sub>n</sub> + 1) ≤ 1</span>، فتثبت الخاصية بالتراجع.</p>
      <p>كما أن:</p>
      <p class=\"math-equation\">u<sub>n+1</sub> - u<sub>n</sub> = 2u<sub>n</sub>/(u<sub>n</sub> + 1) - u<sub>n</sub> = u<sub>n</sub>(1 - u<sub>n</sub>)/(u<sub>n</sub> + 1) ≥ 0</p>
      <p>إذن <span class=\"math\">(u<sub>n</sub>)</span> متزايدة ومحدودة من الأعلى بـ <span class=\"math\">1</span>، فهي متقاربة.</p>
      <p><strong>3.</strong> نضع:</p>
      <p class=\"math-equation\">v<sub>n</sub> = (u<sub>n</sub> - 1)/u<sub>n</sub> = 1 - 1/u<sub>n</sub></p>
      <p>عندئذ:</p>
      <p class=\"math-equation\">v<sub>n+1</sub> = (u<sub>n+1</sub> - 1)/u<sub>n+1</sub> = (u<sub>n</sub> - 1)/(2u<sub>n</sub>) = (1/2)v<sub>n</sub></p>
      <p>إذن <span class=\"math\">(v<sub>n</sub>)</span> هندسية أساسها <span class=\"math\">1/2</span> وحدها الأول <span class=\"math\">v<sub>0</sub> = (1/2 - 1)/(1/2) = -1</span>.</p>
      <p>ومنه:</p>
      <p class=\"math-equation\">v<sub>n</sub> = -(1/2)<sup>n</sup></p>
      <p>وبما أن <span class=\"math\">v<sub>n</sub></span> يؤول إلى 0 فإن <span class=\"math\">1 - 1/u<sub>n</sub></span> يؤول إلى 0، وبالتالي:</p>
      <p class=\"math-equation\">lim u<sub>n</sub> = 1</p>`
  },  {
    id: "bac-2012-exp-subject-1",
    branch: "science",
    stream: "experimental",
    year: "2012",
    title: "بكالوريا 2012 - الموضوع الأول - علوم تجريبية",
    figureHtml: `<figure class="bac-figure" aria-label="تمثيل بياني للدالة h والمستقيم y=x">
      <svg class="bac-graph" viewBox="0 0 420 300" role="img">
        <rect x="0" y="0" width="420" height="300" rx="10" class="graph-bg"></rect>
        <g class="grid-lines"><path d="M40 30V260 M90 30V260 M140 30V260 M190 30V260 M240 30V260 M290 30V260 M340 30V260 M390 30V260 M40 60H390 M40 110H390 M40 160H390 M40 210H390 M40 260H390"></path></g>
        <g class="axes"><path d="M40 260H395"></path><path d="M140 270V25"></path></g>
        <g class="axis-labels"><text x="134" y="278">0</text><text x="184" y="278">1</text><text x="234" y="278">2</text><text x="284" y="278">3</text><text x="334" y="278">4</text><text x="84" y="278">-1</text><text x="32" y="278">-2</text><text x="116" y="214">1</text><text x="116" y="164">2</text><text x="116" y="114">3</text><text x="116" y="64">4</text></g>
        <path class="line-delta" d="M40 360L390 10"></path>
        <path class="curve-f" d="M65 260 C70 218 100 185 145 160 C205 127 282 96 390 78"></path>
        <text x="270" y="88" class="graph-label">(C)</text>
        <text x="305" y="56" class="graph-label">(Δ)</text>
      </svg>
    </figure>`,
    statementHtml: `<div class="bac-statement">
      <p>نعتبر المتتالية العددية <span class="math">(uₙ)</span> المعرفة بحدها الأول <span class="math">u₀=1</span>، ومن أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math">uₙ₊₁=√(2uₙ+3)</p>
      <p><strong>1.</strong> لتكن الدالة <span class="math">h</span> المعرفة على المجال <span class="math">[-3/2، +∞[</span> كما يلي:</p>
      <p class="math">h(x)=√(2x+3)</p>
      <p>و <span class="math">(C)</span> تمثيلها البياني، و <span class="math">(Δ)</span> هو المستقيم ذو المعادلة <span class="math">y=x</span>.</p>
      <ol>
        <li>أعد رسم الشكل، ثم مثل على محور الفواصل الحدود <span class="math">u₀، u₁، u₂، u₃</span> دون حسابها، موضحا خطوط الإنشاء.</li>
        <li>ضع تخمينا حول اتجاه تغير <span class="math">(uₙ)</span> وتقاربها.</li>
      </ol>
      <p><strong>2.</strong> برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">0&lt;uₙ&lt;3</span>.</p>
      <p><strong>3.</strong></p>
      <ol>
        <li>ادرس اتجاه تغير المتتالية <span class="math">(uₙ)</span>.</li>
        <li>استنتج أن المتتالية <span class="math">(uₙ)</span> متقاربة، ثم احسب <span class="math">lim uₙ</span>.</li>
      </ol>
    </div>`,
    quickSolution: `<p><strong>1)</strong> تمثيل بياني؛ التخمين: <span class="math">(u<sub>n</sub>)</span> متزايدة وتتقارب نحو <span class="math">3</span>.</p><p><strong>2)</strong> <span class="math">0 &lt; u<sub>n</sub> &lt; 3</span> لكل <span class="math">n</span>.</p><p><strong>3)</strong> a) <span class="math">(u<sub>n</sub>)</span> متزايدة &nbsp; b) <span class="math">(u<sub>n</sub>)</span> متقاربة؛ <span class="math">lim u<sub>n</sub> = 3</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p>في هذا التمرين، نستعمل التمثيل البياني للتخمين، البرهان بالتراجع، دراسة الرتابة بإشارة الفرق، النقاط الثابتة، حساب النهاية. الهدف هو إثبات خاصية لكل عدد طبيعي <span class="math">n</span> ودراسة اتجاه تغير المتتالية وحساب النهاية وتحديد النقاط الثابتة.</p>
<p class="pedagogy-step">نستعمل البرهان بالتراجع على ثلاث مراحل: التحقق عند <span class="math">n = 0</span>، ثم فرضية التراجع، ثم الانتقال من <span class="math">n</span> إلى <span class="math">n + 1</span>.</p>
<p><strong>2.</strong> إذا كان <span class="math">0 &lt; u<sub>n</sub> &lt; 3</span> فإن <span class="math">3 &lt; 2u<sub>n</sub> + 3 &lt; 9</span>، ومنه <span class="math">0 &lt; u<sub>n+1</sub> &lt; 3</span>.</p>
      <p>ومع <span class="math">u<sub>0</sub> = 1</span> تثبت الخاصية بالتراجع.</p>

<p class="pedagogy-step">نستعمل دراسة إشارة الفرق <span class="math">u<sub>n+1</sub> - u<sub>n</sub></span> أو إشارة <span class="math">f(x) - x</span> لأن المطلوب اتجاه التغير؛ نحسب النهاية باستعمال الحصر بين متتاليتين لهما نفس النهاية.</p>
<p><strong>3.</strong> كما أن <span class="math">u<sub>n+1</sub> ≥ u<sub>n</sub></span> يكافئ:</p>
      <p class="math-equation">√(2u<sub>n</sub> + 3) ≥ u<sub>n</sub> &nbsp; ⇔ &nbsp; u<sub>n</sub>² - 2u<sub>n</sub> - 3 ≤ 0 &nbsp; ⇔ &nbsp; (u<sub>n</sub> - 3)(u<sub>n</sub> + 1) ≤ 0</p>
      <p>وهو صحيح لأن <span class="math">0 &lt; u<sub>n</sub> &lt; 3</span>. إذن <span class="math">(u<sub>n</sub>)</span> متزايدة ومحدودة من الأعلى بـ <span class="math">3</span>، فهي متقاربة.</p>
      <p>إذا كانت نهايتها <span class="math">l</span> فإن <span class="math">l = √(2l + 3)</span>، ومنه:</p>
      <p class="math-equation">l² - 2l - 3 = 0</p>
      <p>وبما أن <span class="math">l &gt; 0</span> نحصل على:</p>
      <p class="math-equation">l = 3</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نتبع الترتيب التالي: التخمين البياني، تحديد النقاط الثابتة، البرهان بالتراجع، دراسة الرتابة، حساب النهاية، ونكتب النتيجة النهائية في كل جزء.</p>
</div>`,
    solution: `<p><strong>2.</strong> إذا كان <span class=\"math\">0 &lt; u<sub>n</sub> &lt; 3</span> فإن <span class=\"math\">3 &lt; 2u<sub>n</sub> + 3 &lt; 9</span>، ومنه <span class=\"math\">0 &lt; u<sub>n+1</sub> &lt; 3</span>.</p>
      <p>ومع <span class=\"math\">u<sub>0</sub> = 1</span> تثبت الخاصية بالتراجع.</p>
      <p><strong>3.</strong> كما أن <span class=\"math\">u<sub>n+1</sub> ≥ u<sub>n</sub></span> يكافئ:</p>
      <p class=\"math-equation\">√(2u<sub>n</sub> + 3) ≥ u<sub>n</sub> &nbsp; ⇔ &nbsp; u<sub>n</sub>² - 2u<sub>n</sub> - 3 ≤ 0 &nbsp; ⇔ &nbsp; (u<sub>n</sub> - 3)(u<sub>n</sub> + 1) ≤ 0</p>
      <p>وهو صحيح لأن <span class=\"math\">0 &lt; u<sub>n</sub> &lt; 3</span>. إذن <span class=\"math\">(u<sub>n</sub>)</span> متزايدة ومحدودة من الأعلى بـ <span class=\"math\">3</span>، فهي متقاربة.</p>
      <p>إذا كانت نهايتها <span class=\"math\">l</span> فإن <span class=\"math\">l = √(2l + 3)</span>، ومنه:</p>
      <p class=\"math-equation\">l² - 2l - 3 = 0</p>
      <p>وبما أن <span class=\"math\">l &gt; 0</span> نحصل على:</p>
      <p class=\"math-equation\">l = 3</p>`
  },  {
    id: "bac-2011-exp-subject-1",
    branch: "science",
    stream: "experimental",
    year: "2011",
    title: "بكالوريا 2011 - الموضوع الأول - علوم تجريبية",
    statementHtml: `<div class="bac-statement">
      <p>المتتالية العددية <span class="math">(uₙ)</span> معرفة بـ:</p>
      <p class="math">u₀=-1 ، uₙ₊₁=3uₙ+1</p>
      <p>والمتتالية العددية <span class="math">(vₙ)</span> معرفة من أجل كل عدد طبيعي <span class="math">n</span> بـ:</p>
      <p class="math">vₙ=uₙ+1/2</p>
      <p>في كل حالة من الحالات الآتية اقترحت ثلاث إجابات، إجابة واحدة فقط صحيحة، حددها مع التعليل.</p>
      <ol>
        <li>المتتالية <span class="math">(vₙ)</span> هي:</li>
      </ol>
      <p>أ- حسابية &nbsp;&nbsp; ب- هندسية &nbsp;&nbsp; ج- لا حسابية ولا هندسية</p>
      <ol start="2">
        <li>نهاية المتتالية <span class="math">(uₙ)</span> هي:</li>
      </ol>
      <p>أ- <span class="math">+∞</span> &nbsp;&nbsp; ب- <span class="math">-1/2</span> &nbsp;&nbsp; ج- <span class="math">-∞</span></p>
      <ol start="3">
        <li>نضع من أجل كل عدد طبيعي <span class="math">n</span>:</li>
      </ol>
      <p class="math">Sₙ=1/2[1+eˡⁿ³+e²ˡⁿ³+e³ˡⁿ³+...+eⁿˡⁿ³]</p>
      <p>القيمة الصحيحة لـ <span class="math">Sₙ</span> هي:</p>
      <p>أ- <span class="math">(3ⁿ⁺¹-1)/2</span> &nbsp;&nbsp; ب- <span class="math">(1-3ⁿ⁺¹)/4</span> &nbsp;&nbsp; ج- <span class="math">(1-3ⁿ⁺¹)/4</span></p>
    </div>`,
    quickSolution: `<p><strong>1)</strong> <span class="math">(v<sub>n</sub>)</span> هندسية (الإجابة: ب).</p><p><strong>2)</strong> <span class="math">lim u<sub>n</sub> = -∞</span> (الإجابة: ج).</p><p><strong>3)</strong> <span class="math">S<sub>n</sub> = (3<sup>n+1</sup> - 1)/4</span> (الإجابة: أ).</p>`,
    detailedSolution: `<div class="detailed-solution">
<p>في هذا التمرين، نستعمل متتالية مساعدة، المتتالية الحسابية، المتتالية الهندسية، حساب النهاية، حساب مجموع حدود، خواص اللوغاريتمات. الهدف هو إيجاد عبارة الحد العام وحساب النهاية وحساب مجموع حدود.</p>
<p class="pedagogy-step">نعرف متتالية مساعدة حتى نحول العلاقة التراجعية إلى علاقة هندسية بسيطة.</p>
<p><strong>1)</strong> لدينا:</p>
      <p class="math-equation">v<sub>n+1</sub> = u<sub>n+1</sub> + 1/2 = 3u<sub>n</sub> + 1 + 1/2 = 3(u<sub>n</sub> + 1/2) = 3v<sub>n</sub></p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> هندسية، والإجابة الصحيحة هي: <strong>ب</strong>.</p>

<p class="pedagogy-step">نحسب النهاية باستعمال النهايات المرجعية.</p>
<p><strong>2)</strong> كما أن <span class="math">v<sub>0</sub> = u<sub>0</sub> + 1/2 = -1/2</span>، ومنه:</p>
      <p class="math-equation">v<sub>n</sub> = -(1/2)·3<sup>n</sup></p>
      <p>وبالتالي:</p>
      <p class="math-equation">u<sub>n</sub> = v<sub>n</sub> - 1/2 = -(3<sup>n</sup> + 1)/2</p>
      <p>ومنه:</p>
      <p class="math-equation">lim u<sub>n</sub> = -∞</p>
      <p>والإجابة الصحيحة هي: <strong>ج</strong>.</p>

<p class="pedagogy-step">نستعمل خواص اللوغاريتمات لحساب المجموع.</p>
<p><strong>3)</strong> وأخيرا <span class="math">e<sup>k ln3</sup> = 3<sup>k</sup></span>، لذلك:</p>
      <p class="math-equation">S<sub>n</sub> = 1/2(1 + 3 + 3² + ... + 3<sup>n</sup>) = 1/2 · (3<sup>n+1</sup> - 1)/(3 - 1) = (3<sup>n+1</sup> - 1)/4</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نتبع الترتيب التالي: استعمال متتالية مساعدة، حساب النهاية، حساب المجموع، ونكتب النتيجة النهائية في كل جزء.</p>
</div>`,
    solution: `<p><strong>1)</strong> لدينا:</p>
      <p class=\"math-equation\">v<sub>n+1</sub> = u<sub>n+1</sub> + 1/2 = 3u<sub>n</sub> + 1 + 1/2 = 3(u<sub>n</sub> + 1/2) = 3v<sub>n</sub></p>
      <p>إذن <span class=\"math\">(v<sub>n</sub>)</span> هندسية، والإجابة الصحيحة هي: <strong>ب</strong>.</p>
      <p><strong>2)</strong> كما أن <span class=\"math\">v<sub>0</sub> = u<sub>0</sub> + 1/2 = -1/2</span>، ومنه:</p>
      <p class=\"math-equation\">v<sub>n</sub> = -(1/2)·3<sup>n</sup></p>
      <p>وبالتالي:</p>
      <p class=\"math-equation\">u<sub>n</sub> = v<sub>n</sub> - 1/2 = -(3<sup>n</sup> + 1)/2</p>
      <p>ومنه:</p>
      <p class=\"math-equation\">lim u<sub>n</sub> = -∞</p>
      <p>والإجابة الصحيحة هي: <strong>ج</strong>.</p>
      <p><strong>3)</strong> وأخيرا <span class=\"math\">e<sup>k ln3</sup> = 3<sup>k</sup></span>، لذلك:</p>
      <p class=\"math-equation\">S<sub>n</sub> = 1/2(1 + 3 + 3² + ... + 3<sup>n</sup>) = 1/2 · (3<sup>n+1</sup> - 1)/(3 - 1) = (3<sup>n+1</sup> - 1)/4</p>`
  },  {
    id: "bac-2011-exp-subject-2",
    branch: "science",
    stream: "experimental",
    year: "2011",
    title: "بكالوريا 2011 - الموضوع الثاني - علوم تجريبية",
    statementHtml: `<div class="bac-statement">
      <p><span class="math">α</span> عدد حقيقي موجب تماما ويختلف عن <span class="math">1</span>.</p>
      <p>متتالية عددية <span class="math">(uₙ)</span> معرفة على <span class="math">N</span> بـ:</p>
      <p class="math">u₀=6 ، uₙ₊₁=αuₙ+1</p>
      <p>ومتتالية عددية <span class="math">(vₙ)</span> معرفة من أجل كل عدد طبيعي <span class="math">n</span> بـ:</p>
      <p class="math">vₙ=uₙ+1/(α-1)</p>
      <ol>
        <li>بين أن <span class="math">(vₙ)</span> متتالية هندسية أساسها <span class="math">α</span>.</li>
        <li>اكتب بدلالة <span class="math">n</span> و <span class="math">α</span> عبارة <span class="math">vₙ</span>، ثم استنتج عبارة <span class="math">uₙ</span>.</li>
        <li>عين قيم العدد الحقيقي <span class="math">α</span> حتى تكون <span class="math">(uₙ)</span> متقاربة.</li>
      </ol>
      <p><strong>2.</strong> نضع <span class="math">α=3/2</span>.</p>
      <p>احسب بدلالة <span class="math">n</span> المجموعين:</p>
      <p class="math">Sₙ=v₀+v₁+...+vₙ</p>
      <p class="math">Tₙ=u₀+u₁+...+uₙ</p>
    </div>`,
    quickSolution: `<p><strong>1)</strong> a) <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">α</span> &nbsp; b) <span class="math">v<sub>n</sub> = (6 + 1/(α-1)) α<sup>n</sup></span>؛ <span class="math">u<sub>n</sub> = (6 + 1/(α-1)) α<sup>n</sup> - 1/(α-1)</span> &nbsp; c) <span class="math">(u<sub>n</sub>)</span> متقاربة عندما <span class="math">0 &lt; α &lt; 1</span>.</p><p><strong>2)</strong> <span class="math">S<sub>n</sub> = 16((3/2)<sup>n+1</sup> - 1)</span>؛ <span class="math">T<sub>n</sub> = 16((3/2)<sup>n+1</sup> - 1) - 2(n+1)</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p>في هذا التمرين، نستعمل متتالية مساعدة، المتتالية الهندسية، حساب النهاية، حساب مجموع حدود. الهدف هو إيجاد عبارة الحد العام وحساب النهاية وحساب مجموع حدود.</p>
<p class="pedagogy-step">نعرف متتالية مساعدة حتى نحول العلاقة التراجعية إلى علاقة هندسية بسيطة؛ بعد إيجاد العبارة الصريحة، نستعمل نهاية المتتالية الهندسية <span class="math">q<sup>n</sup></span> لحساب النهاية.</p>
<p><strong>1.</strong> نحسب:</p>
      <p class="math-equation">v<sub>n+1</sub> = u<sub>n+1</sub> + 1/(α - 1) = αu<sub>n</sub> + 1 + 1/(α - 1) = α[u<sub>n</sub> + 1/(α - 1)] = αv<sub>n</sub></p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">α</span>.</p>
      <p>حدها الأول:</p>
      <p class="math-equation">v<sub>0</sub> = 6 + 1/(α - 1)</p>
      <p>ومنه:</p>
      <p class="math-equation">v<sub>n</sub> = (6 + 1/(α - 1))α<sup>n</sup></p>
      <p>وبالتالي:</p>
      <p class="math-equation">u<sub>n</sub> = (6 + 1/(α - 1))α<sup>n</sup> - 1/(α - 1)</p>
      <p>تتقارب <span class="math">(u<sub>n</sub>)</span> إذا وفقط إذا <span class="math">0 &lt; α &lt; 1</span>، لأن <span class="math">α</span> موجب ومختلف عن <span class="math">1</span>.</p>

<p class="pedagogy-step">نستعمل صيغة مجموع حدود متتالية هندسية أو خاصية التلاصق.</p>
<p><strong>2.</strong> عند <span class="math">α = 3/2</span>، لدينا <span class="math">v<sub>0</sub> = 8</span> و:</p>
      <p class="math-equation">v<sub>n</sub> = 8(3/2)<sup>n</sup></p>
      <p>ومنه:</p>
      <p class="math-equation">S<sub>n</sub> = 8[(3/2)<sup>n+1</sup> - 1]/(1/2) = 16((3/2)<sup>n+1</sup> - 1)</p>
      <p>كما أن <span class="math">u<sub>n</sub> = v<sub>n</sub> - 2</span>، إذن:</p>
      <p class="math-equation">T<sub>n</sub> = S<sub>n</sub> - 2(n + 1) = 16((3/2)<sup>n+1</sup> - 1) - 2(n + 1)</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نتبع الترتيب التالي: استعمال متتالية مساعدة، حساب النهاية، حساب المجموع، ونكتب النتيجة النهائية في كل جزء.</p>
</div>`,
    solution: `<p><strong>1.</strong> نحسب:</p>
      <p class=\"math-equation\">v<sub>n+1</sub> = u<sub>n+1</sub> + 1/(α - 1) = αu<sub>n</sub> + 1 + 1/(α - 1) = α[u<sub>n</sub> + 1/(α - 1)] = αv<sub>n</sub></p>
      <p>إذن <span class=\"math\">(v<sub>n</sub>)</span> هندسية أساسها <span class=\"math\">α</span>.</p>
      <p>حدها الأول:</p>
      <p class=\"math-equation\">v<sub>0</sub> = 6 + 1/(α - 1)</p>
      <p>ومنه:</p>
      <p class=\"math-equation\">v<sub>n</sub> = (6 + 1/(α - 1))α<sup>n</sup></p>
      <p>وبالتالي:</p>
      <p class=\"math-equation\">u<sub>n</sub> = (6 + 1/(α - 1))α<sup>n</sup> - 1/(α - 1)</p>
      <p>تتقارب <span class=\"math\">(u<sub>n</sub>)</span> إذا وفقط إذا <span class=\"math\">0 &lt; α &lt; 1</span>، لأن <span class=\"math\">α</span> موجب ومختلف عن <span class=\"math\">1</span>.</p>
      <p><strong>2.</strong> عند <span class=\"math\">α = 3/2</span>، لدينا <span class=\"math\">v<sub>0</sub> = 8</span> و:</p>
      <p class=\"math-equation\">v<sub>n</sub> = 8(3/2)<sup>n</sup></p>
      <p>ومنه:</p>
      <p class=\"math-equation\">S<sub>n</sub> = 8[(3/2)<sup>n+1</sup> - 1]/(1/2) = 16((3/2)<sup>n+1</sup> - 1)</p>
      <p>كما أن <span class=\"math\">u<sub>n</sub> = v<sub>n</sub> - 2</span>، إذن:</p>
      <p class=\"math-equation\">T<sub>n</sub> = S<sub>n</sub> - 2(n + 1) = 16((3/2)<sup>n+1</sup> - 1) - 2(n + 1)</p>`
  },  {
    id: "bac-2010-exp-subject-1",
    branch: "science",
    stream: "experimental",
    year: "2010",
    title: "بكالوريا 2010 - الموضوع الأول - علوم تجريبية",
    figureHtml: `<figure class="bac-figure" aria-label="تمثيل بياني تقريبي للدالة اللوغاريتمية">
      <svg class="bac-graph" viewBox="0 0 420 300" role="img">
        <rect x="0" y="0" width="420" height="300" rx="10" class="graph-bg"></rect>
        <g class="grid-lines"><path d="M80 30V260 M140 30V260 M200 30V260 M260 30V260 M320 30V260 M380 30V260 M40 60H390 M40 110H390 M40 160H390 M40 210H390 M40 260H390"></path></g>
        <g class="axes"><path d="M40 230H395"></path><path d="M80 270V25"></path></g>
        <g class="axis-labels"><text x="74" y="248">0</text><text x="134" y="248">1</text><text x="194" y="248">2</text><text x="254" y="248">3</text><text x="314" y="248">4</text><text x="56" y="214">1</text><text x="56" y="164">2</text><text x="56" y="114">3</text></g>
        <path class="curve-f" d="M111 265 C116 230 130 198 155 170 C195 126 260 99 380 70"></path>
        <path class="line-delta" d="M80 230L350 5"></path>
        <text x="255" y="96" class="graph-label">Cf</text>
        <text x="292" y="42" class="graph-label">y=x</text>
      </svg>
    </figure>`,
    statementHtml: `<div class="bac-statement">
      <p><strong>I.</strong> لتكن الدالة <span class="math">f</span> المعرفة على المجال <span class="math">]1/2، +∞[</span> بـ:</p>
      <p class="math">f(x)=1+ln(2x-1)</p>
      <ol>
        <li>احسب نهايتي <span class="math">f</span> عند طرفي مجال تعريفها.</li>
        <li>بين أن الدالة <span class="math">f</span> متزايدة تماما على مجالها، ثم شكل جدول تغيراتها.</li>
        <li>ادرس تقاطع منحنى <span class="math">(Cf)</span> مع المستقيم ذي المعادلة <span class="math">y=x</span>.</li>
      </ol>
      <p><strong>II.</strong> نعتبر الدالة <span class="math">g</span> المعرفة على نفس المجال بـ:</p>
      <p class="math">g(x)=f(x)-x</p>
      <ol>
        <li>ادرس اتجاه تغير الدالة <span class="math">g</span>.</li>
        <li>بين أن المعادلة <span class="math">g(x)=0</span> تقبل حلين، أحدهما <span class="math">x=1</span>.</li>
        <li>استنتج وضعية منحنى <span class="math">(Cf)</span> بالنسبة إلى المستقيم <span class="math">y=x</span>.</li>
      </ol>
      <p><strong>III.</strong> نعتبر المتتالية العددية <span class="math">(uₙ)</span> المعرفة، عندما تكون حدودها في مجال تعريف <span class="math">f</span>، بالعلاقة:</p>
      <p class="math">uₙ₊₁=f(uₙ)</p>
      <ol>
        <li>استعمل نتائج دراسة <span class="math">g</span> لتخمين اتجاه تغير وتقارب المتتالية حسب الحد الأول.</li>
        <li>احسب النهاية الممكنة للمتتالية إذا كانت متقاربة.</li>
      </ol>
    </div>`,
    quickSolution: `<p><strong>I)</strong> <span class="math">lim f = -∞</span> عند <span class="math">1/2</span>؛ <span class="math">lim f = +∞</span> عند <span class="math">+∞</span>؛ <span class="math">f</span> متزايدة تماما.</p><p><strong>II)</strong> <span class="math">g</span> متزايدة على <span class="math">]1/2, 3/2[</span> ومتناقصة على <span class="math">]3/2, +∞[</span>؛ <span class="math">g(x) = 0</span> عند <span class="math">x = 1</span> و <span class="math">x = β &gt; 3/2</span>.</p><p><strong>III)</strong> <span class="math">(Cf)</span> فوق <span class="math">y = x</span> على <span class="math">]1/2, 1[ ∪ ]β, +∞[</span> وتحته على <span class="math">]1, β[</span>؛ النهاية الممكنة <span class="math">1</span> أو <span class="math">β</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p>في هذا التمرين، نستعمل دراسة تغير الدالة بالمشتقة، التمثيل البياني للتخمين، دراسة الرتابة بإشارة الفرق، النقاط الثابتة، حساب النهاية، خواص اللوغاريتمات. الهدف هو دراسة اتجاه تغير المتتالية وحساب النهاية وتحديد النقاط الثابتة.</p>
<p class="pedagogy-step">نستعمل المشتقة لدراسة تغير الدالة وصورة المجال؛ نستعمل دراسة إشارة الفرق <span class="math">u<sub>n+1</sub> - u<sub>n</sub></span> أو إشارة <span class="math">f(x) - x</span> لأن المطلوب اتجاه التغير؛ نحسب النهاية باستعمال النهايات المرجعية.</p>
<p><strong>I.</strong> لدينا:</p>
      <p class="math-equation">lim<sub>x→1/2⁺</sub> f(x) = -∞</p>
      <p class="math-equation">lim<sub>x→+∞</sub> f(x) = +∞</p>
      <p>كما أن:</p>
      <p class="math-equation">f'(x) = 2/(2x - 1) &gt; 0</p>
      <p>إذن <span class="math">f</span> متزايدة تماما.</p>

<p class="pedagogy-step">نحدد نقاط التقاطع مع المستقيم <span class="math">y = x</span> لأنها المرشحة للنهاية؛ نستعمل دراسة إشارة الفرق <span class="math">u<sub>n+1</sub> - u<sub>n</sub></span> أو إشارة <span class="math">f(x) - x</span> لأن المطلوب اتجاه التغير.</p>
<p><strong>II.</strong> ندرس <span class="math">g(x) = 1 + ln(2x - 1) - x</span>، فنجد:</p>
      <p class="math-equation">g'(x) = 2/(2x - 1) - 1 = (3 - 2x)/(2x - 1)</p>
      <p>لذلك <span class="math">g</span> متزايدة على <span class="math">]1/2, 3/2[</span> ومتناقصة على <span class="math">]3/2, +∞[</span>.</p>
      <p>كما أن <span class="math">g(1) = 0</span>، وتوجد قيمة ثانية <span class="math">β &gt; 3/2</span> تحقق <span class="math">g(β) = 0</span>.</p>
      <p>إذن تقاطعات <span class="math">(Cf)</span> مع <span class="math">y = x</span> توافق حلول <span class="math">g(x) = 0</span>.</p>

<p class="pedagogy-step">نحدد نقاط التقاطع مع المستقيم <span class="math">y = x</span> لأنها المرشحة للنهاية؛ نستعمل النقاط الثابتة لتحديد النهاية الممكنة.</p>
<p><strong>III.</strong> إذا تقاربت متتالية معرفة بـ <span class="math">u<sub>n+1</sub> = f(u<sub>n</sub>)</span> نحو <span class="math">l</span> فإن <span class="math">l = f(l)</span>، أي <span class="math">g(l) = 0</span>، فتكون النهاية إحدى نقطتي التقاطع حسب المجال الذي توجد فيه حدود المتتالية.</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نتبع الترتيب التالي: التخمين البياني، دراسة الدالة، تحديد النقاط الثابتة، دراسة الرتابة، حساب النهاية، ونكتب النتيجة النهائية في كل جزء.</p>
</div>`,
    solution: `<p><strong>I.</strong> لدينا:</p>
      <p class=\"math-equation\">lim<sub>x→1/2⁺</sub> f(x) = -∞</p>
      <p class=\"math-equation\">lim<sub>x→+∞</sub> f(x) = +∞</p>
      <p>كما أن:</p>
      <p class=\"math-equation\">f'(x) = 2/(2x - 1) &gt; 0</p>
      <p>إذن <span class=\"math\">f</span> متزايدة تماما.</p>
      <p><strong>II.</strong> ندرس <span class=\"math\">g(x) = 1 + ln(2x - 1) - x</span>، فنجد:</p>
      <p class=\"math-equation\">g'(x) = 2/(2x - 1) - 1 = (3 - 2x)/(2x - 1)</p>
      <p>لذلك <span class=\"math\">g</span> متزايدة على <span class=\"math\">]1/2, 3/2[</span> ومتناقصة على <span class=\"math\">]3/2, +∞[</span>.</p>
      <p>كما أن <span class=\"math\">g(1) = 0</span>، وتوجد قيمة ثانية <span class=\"math\">β &gt; 3/2</span> تحقق <span class=\"math\">g(β) = 0</span>.</p>
      <p>إذن تقاطعات <span class=\"math\">(Cf)</span> مع <span class=\"math\">y = x</span> توافق حلول <span class=\"math\">g(x) = 0</span>.</p>
      <p><strong>III.</strong> إذا تقاربت متتالية معرفة بـ <span class=\"math\">u<sub>n+1</sub> = f(u<sub>n</sub>)</span> نحو <span class=\"math\">l</span> فإن <span class=\"math\">l = f(l)</span>، أي <span class=\"math\">g(l) = 0</span>، فتكون النهاية إحدى نقطتي التقاطع حسب المجال الذي توجد فيه حدود المتتالية.</p>`
  },  {
    id: "bac-2010-exp-subject-2",
    branch: "science",
    stream: "experimental",
    year: "2010",
    title: "بكالوريا 2010 - الموضوع الثاني - علوم تجريبية",
    figureHtml: `<figure class="bac-figure" aria-label="تمثيل بياني للمستقيمين y=x و y=1/2x+1/3">
      <svg class="bac-graph" viewBox="0 0 420 300" role="img">
        <rect x="0" y="0" width="420" height="300" rx="10" class="graph-bg"></rect>
        <g class="grid-lines"><path d="M80 30V260 M130 30V260 M180 30V260 M230 30V260 M280 30V260 M330 30V260 M380 30V260 M40 60H390 M40 110H390 M40 160H390 M40 210H390 M40 260H390"></path></g>
        <g class="axes"><path d="M40 260H395"></path><path d="M80 270V25"></path></g>
        <g class="axis-labels"><text x="74" y="278">0</text><text x="124" y="278">1</text><text x="174" y="278">2</text><text x="224" y="278">3</text><text x="274" y="278">4</text><text x="324" y="278">5</text><text x="374" y="278">6</text><text x="56" y="214">1</text><text x="56" y="164">2</text><text x="56" y="114">3</text><text x="56" y="64">4</text></g>
        <path class="line-delta" d="M80 260L330 10"></path>
        <path class="curve-f" d="M80 243L390 88"></path>
        <text x="275" y="48" class="graph-label">y=x</text>
        <text x="304" y="100" class="graph-label">D</text>
      </svg>
    </figure>`,
    statementHtml: `<div class="bac-statement">
      <p>في المستوى المنسوب إلى معلم متعامد ومتجانس، نعتبر المستقيمين:</p>
      <p class="math">(D): y=(1/2)x+1/3 ، (Δ): y=x</p>
      <p><strong>1.</strong> لتكن الدالة <span class="math">f</span> المعرفة على <span class="math">R</span> بـ:</p>
      <p class="math">f(x)=(1/2)x+1/3</p>
      <ol>
        <li>بين أن الدالة <span class="math">f</span> متزايدة تماما.</li>
        <li>مثل المستقيمين <span class="math">(D)</span> و <span class="math">(Δ)</span>، ثم استعمل الشكل للإنشاء البياني للحدود الأولى.</li>
      </ol>
      <p><strong>2.</strong> نعتبر المتتالية العددية <span class="math">(uₙ)</span> المعرفة بحدها الأول <span class="math">u₀=6</span>، ومن أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math">uₙ₊₁=f(uₙ)=(1/2)uₙ+1/3</p>
      <ol>
        <li>مثل بيانيا الحدود <span class="math">u₀، u₁، u₂، u₃، u₄</span> دون حسابها.</li>
        <li>ضع تخمينا حول اتجاه تغير المتتالية وتقاربها، ثم حدد بيانيا نهايتها.</li>
        <li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">uₙ&gt;2/3</span>.</li>
        <li>ادرس اتجاه تغير المتتالية، ثم استنتج أنها متقاربة.</li>
      </ol>
      <p><strong>3.</strong> نضع من أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math">vₙ=uₙ-2/3</p>
      <ol>
        <li>بين أن <span class="math">(vₙ)</span> متتالية هندسية، ثم عين أساسها وحدها الأول.</li>
        <li>اكتب <span class="math">vₙ</span> ثم <span class="math">uₙ</span> بدلالة <span class="math">n</span>.</li>
        <li>احسب نهاية المتتالية <span class="math">(uₙ)</span>.</li>
      </ol>
      <p><strong>4.</strong> احسب بدلالة <span class="math">n</span> المجموعين:</p>
      <p class="math">Sₙ=v₀+v₁+...+vₙ ، Tₙ=u₀+u₁+...+uₙ</p>
    </div>`,
    quickSolution: `<p><strong>1)</strong> <span class="math">f</span> متزايدة تماما؛ نقطة تقاطع <span class="math">y = x</span> و <span class="math">y = (1/2)x + 1/3</span> هي <span class="math">x = 2/3</span>.</p><p><strong>2)</strong> a) تمثيل بياني &nbsp; b) التخمين: متناقصة وتتقارب نحو <span class="math">2/3</span> &nbsp; c) <span class="math">u<sub>n</sub> &gt; 2/3</span> لكل <span class="math">n</span> &nbsp; d) <span class="math">(u<sub>n</sub>)</span> متناقصة ومقاربة.</p><p><strong>3)</strong> a) <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">1/2</span>، <span class="math">v<sub>0</sub> = 16/3</span> &nbsp; b) <span class="math">v<sub>n</sub> = (16/3)(1/2)<sup>n</sup></span>؛ <span class="math">u<sub>n</sub> = 2/3 + (16/3)(1/2)<sup>n</sup></span> &nbsp; c) <span class="math">lim u<sub>n</sub> = 2/3</span>.</p><p><strong>4)</strong> <span class="math">S<sub>n</sub> = 32/3 [1 - (1/2)<sup>n+1</sup>]</span>؛ <span class="math">T<sub>n</sub> = 2(n+1)/3 + S<sub>n</sub></span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p>في هذا التمرين، نستعمل دراسة تغير الدالة بالمشتقة، التمثيل البياني للتخمين، البرهان بالتراجع، دراسة الرتابة بإشارة الفرق، متتالية مساعدة، المتتالية الهندسية، النقاط الثابتة، حساب النهاية، حساب مجموع حدود. الهدف هو إثبات خاصية لكل عدد طبيعي <span class="math">n</span> ودراسة اتجاه تغير المتتالية وإيجاد عبارة الحد العام وحساب النهاية وحساب مجموع حدود وتحديد النقاط الثابتة.</p>
<p class="pedagogy-step">نستعمل التمثيل البياني أولا للتخمين، ثم نبرهن الجزء جبريا ولا نكتفي بالرسم؛ نحدد نقاط التقاطع مع المستقيم <span class="math">y = x</span> لأنها المرشحة للنهاية؛ نستعمل دراسة إشارة الفرق <span class="math">u<sub>n+1</sub> - u<sub>n</sub></span> أو إشارة <span class="math">f(x) - x</span> لأن المطلوب اتجاه التغير؛ نستعمل النقاط الثابتة لتحديد النهاية الممكنة.</p>
<p><strong>1.</strong> الدالة <span class="math">f</span> متزايدة لأن معاملها الموجه <span class="math">1/2</span> موجب.</p>
      <p>نقطة تقاطع <span class="math">y = x</span> مع <span class="math">y = (1/2)x + 1/3</span> تحقق:</p>
      <p class="math-equation">x = (1/2)x + 1/3 &nbsp; ⇒ &nbsp; x = 2/3</p>
      <p>وهي النهاية المتوقعة بيانيا.</p>

<p class="pedagogy-step">نستعمل الحصر بالتراجع على ثلاث مراحل: التحقق عند <span class="math">n = 0</span>، ثم فرضية التراجع، ثم الانتقال من <span class="math">n</span> إلى <span class="math">n + 1</span>؛ ثم ندرس الرتابة بإشارة الفرق <span class="math">u<sub>n+1</sub> - u<sub>n</sub></span> وليس بالتخمين البياني فقط؛ نحسب النهاية باستعمال النهايات المرجعية.</p>
<p><strong>2.</strong> إذا كان <span class="math">u<sub>n</sub> &gt; 2/3</span> فإن:</p>
      <p class="math-equation">u<sub>n+1</sub> - 2/3 = (1/2)u<sub>n</sub> + 1/3 - 2/3 = (1/2)(u<sub>n</sub> - 2/3) &gt; 0</p>
      <p>فتثبت الخاصية بالتراجع.</p>
      <p>كما أن:</p>
      <p class="math-equation">u<sub>n+1</sub> - u<sub>n</sub> = 1/3 - (1/2)u<sub>n</sub> &lt; 0</p>
      <p>لأن <span class="math">u<sub>n</sub> &gt; 2/3</span>، إذن <span class="math">(u<sub>n</sub>)</span> متناقصة ومحدودة من الأسفل بـ <span class="math">2/3</span>، فهي متقاربة.</p>

<p class="pedagogy-step">نعرف متتالية مساعدة حتى نحول العلاقة التراجعية إلى علاقة هندسية بسيطة؛ بعد إيجاد العبارة الصريحة، نستعمل نهاية المتتالية الهندسية <span class="math">q<sup>n</sup></span> لحساب النهاية.</p>
<p><strong>3.</strong> نضع <span class="math">v<sub>n</sub> = u<sub>n</sub> - 2/3</span>، فنجد:</p>
      <p class="math-equation">v<sub>n+1</sub> = (1/2)v<sub>n</sub></p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">1/2</span> وحدها الأول <span class="math">v<sub>0</sub> = 6 - 2/3 = 16/3</span>.</p>
      <p>ومنه:</p>
      <p class="math-equation">v<sub>n</sub> = (16/3)(1/2)<sup>n</sup></p>
      <p class="math-equation">u<sub>n</sub> = 2/3 + (16/3)(1/2)<sup>n</sup></p>
      <p>وبالتالي:</p>
      <p class="math-equation">lim u<sub>n</sub> = 2/3</p>

<p class="pedagogy-step">نستعمل صيغة مجموع حدود متتالية هندسية أو خاصية التلاصق.</p>
<p><strong>4.</strong> كما أن:</p>
      <p class="math-equation">S<sub>n</sub> = (16/3)[1 - (1/2)<sup>n+1</sup>]/(1/2) = 32/3[1 - (1/2)<sup>n+1</sup>]</p>
      <p>و:</p>
      <p class="math-equation">T<sub>n</sub> = (n + 1)·2/3 + S<sub>n</sub></p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نتبع الترتيب التالي: التخمين البياني، دراسة الدالة، تحديد النقاط الثابتة، البرهان بالتراجع، دراسة الرتابة، استعمال متتالية مساعدة، حساب النهاية، حساب المجموع، ونكتب النتيجة النهائية في كل جزء.</p>
</div>`,
    conceptHints: [
      {
        "title": "الحصر بالتراجع",
        "hint": "تحقق من n=0، ثم افترض أن u_n داخل المجال، واستعمل علاقة u_{n+1}=f(u_n) أو صورة المجال بالدالة لإثبات بقاء u_{n+1} داخل نفس المجال."
      },
      {
        "title": "رتابة المتتالية",
        "hint": "لدراسة الاتجاه، احسب u_{n+1}-u_n أو درس إشارة f(x)-x على المجال المعطى، واستعمل الحصر لتحديد الإشارة دون الاكتفاء بالتخمين البياني."
      },
      {
        "title": "المتتالية المساعدة",
        "hint": "عرف v_n حتى نحول العلاقة التراجعية إلى علاقة هندسية بسيطة، ثم أثبت ذلك بحساب النسبة v_{n+1}/v_n."
      },
      {
        "title": "حساب النهاية",
        "hint": "استعمل العبارة الصريحة أو الحصر أو حقيقة أن q^n يؤول إلى 0 عندما |q|<1 لاستنتاج النهاية."
      },
      {
        "title": "حساب المجموع",
        "hint": "حدد نوع الحدود (هندسية، متداخلة، لوغاريتمية) ثم استعمل الصيغة المناسبة للمجموع."
      },
      {
        "title": "النقاط الثابتة",
        "hint": "حل المعادلة f(x)=x؛ هذه النقاط هي المرشحة الوحيدة للنهاية إذا كانت المتتالية متقاربة."
      }
    ],
    solution: `<p><strong>1.</strong> الدالة <span class=\"math\">f</span> متزايدة لأن معاملها الموجه <span class=\"math\">1/2</span> موجب.</p>
      <p>نقطة تقاطع <span class=\"math\">y = x</span> مع <span class=\"math\">y = (1/2)x + 1/3</span> تحقق:</p>
      <p class=\"math-equation\">x = (1/2)x + 1/3 &nbsp; ⇒ &nbsp; x = 2/3</p>
      <p>وهي النهاية المتوقعة بيانيا.</p>
      <p><strong>2.</strong> إذا كان <span class=\"math\">u<sub>n</sub> &gt; 2/3</span> فإن:</p>
      <p class=\"math-equation\">u<sub>n+1</sub> - 2/3 = (1/2)u<sub>n</sub> + 1/3 - 2/3 = (1/2)(u<sub>n</sub> - 2/3) &gt; 0</p>
      <p>فتثبت الخاصية بالتراجع.</p>
      <p>كما أن:</p>
      <p class=\"math-equation\">u<sub>n+1</sub> - u<sub>n</sub> = 1/3 - (1/2)u<sub>n</sub> &lt; 0</p>
      <p>لأن <span class=\"math\">u<sub>n</sub> &gt; 2/3</span>، إذن <span class=\"math\">(u<sub>n</sub>)</span> متناقصة ومحدودة من الأسفل بـ <span class=\"math\">2/3</span>، فهي متقاربة.</p>
      <p><strong>3.</strong> نضع <span class=\"math\">v<sub>n</sub> = u<sub>n</sub> - 2/3</span>، فنجد:</p>
      <p class=\"math-equation\">v<sub>n+1</sub> = (1/2)v<sub>n</sub></p>
      <p>إذن <span class=\"math\">(v<sub>n</sub>)</span> هندسية أساسها <span class=\"math\">1/2</span> وحدها الأول <span class=\"math\">v<sub>0</sub> = 6 - 2/3 = 16/3</span>.</p>
      <p>ومنه:</p>
      <p class=\"math-equation\">v<sub>n</sub> = (16/3)(1/2)<sup>n</sup></p>
      <p class=\"math-equation\">u<sub>n</sub> = 2/3 + (16/3)(1/2)<sup>n</sup></p>
      <p>وبالتالي:</p>
      <p class=\"math-equation\">lim u<sub>n</sub> = 2/3</p>
      <p><strong>4.</strong> كما أن:</p>
      <p class=\"math-equation\">S<sub>n</sub> = (16/3)[1 - (1/2)<sup>n+1</sup>]/(1/2) = 32/3[1 - (1/2)<sup>n+1</sup>]</p>
      <p>و:</p>
      <p class=\"math-equation\">T<sub>n</sub> = (n + 1)·2/3 + S<sub>n</sub></p>`
  },  {
    id: "bac-2009-exp-subject-2",
    branch: "science",
    stream: "experimental",
    year: "2009",
    title: "بكالوريا 2009 - الموضوع الثاني - علوم تجريبية",
    statementHtml: `<div class="bac-statement">
      <p>متتالية <span class="math">(uₙ)</span> معرفة على <span class="math">N</span> كما يلي:</p>
      <p class="math">u₀=1 ، u₁=2 ، uₙ₊₂=(4/3)uₙ₊₁-(1/3)uₙ</p>
      <p>والمتتالية <span class="math">(vₙ)</span> معرفة على <span class="math">N</span> كما يلي:</p>
      <p class="math">vₙ=uₙ₊₁-uₙ</p>
      <ol>
        <li>احسب <span class="math">v₀</span> و <span class="math">v₁</span>.</li>
        <li>برهن أن <span class="math">(vₙ)</span> متتالية هندسية، ثم عين أساسها.</li>
        <li>احسب بدلالة <span class="math">n</span> المجموع: <span class="math">Sₙ=v₀+v₁+...+vₙ₋₁</span>.</li>
        <li>برهن أنه من أجل كل عدد طبيعي <span class="math">n</span>:</li>
      </ol>
      <p class="math">uₙ=(3/2)(1-(1/3)ⁿ)+1</p>
      <ol start="5">
        <li>بين أن <span class="math">(uₙ)</span> متقاربة.</li>
      </ol>
    </div>`,
    quickSolution: `<p><strong>1)</strong> <span class="math">v<sub>0</sub> = 1</span>، <span class="math">v<sub>1</sub> = 1/3</span>.</p><p><strong>2)</strong> <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">1/3</span>.</p><p><strong>3)</strong> <span class="math">S<sub>n</sub> = (3/2)(1 - (1/3)<sup>n</sup>)</span>.</p><p><strong>4)</strong> <span class="math">u<sub>n</sub> = (3/2)(1 - (1/3)<sup>n</sup>) + 1</span>.</p><p><strong>5)</strong> <span class="math">(u<sub>n</sub>)</span> متقاربة نحو <span class="math">5/2</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p>في هذا التمرين، نستعمل دراسة الرتابة بإشارة الفرق، متتالية مساعدة، المتتالية الهندسية، حساب النهاية، حساب مجموع حدود. الهدف هو دراسة اتجاه تغير المتتالية وإيجاد عبارة الحد العام وحساب النهاية وحساب مجموع حدود.</p>
<p class="pedagogy-step">نستعمل تعريف المتتالية الهندسية لأن النسبة بين حدين متتاليين ثابتة.</p>
<p><strong>1.</strong> نحسب:</p>
      <p class="math-equation">v<sub>0</sub> = u<sub>1</sub> - u<sub>0</sub> = 1</p>
      <p class="math-equation">u<sub>2</sub> = (4/3)u<sub>1</sub> - (1/3)u<sub>0</sub> = 8/3 - 1/3 = 7/3</p>
      <p class="math-equation">v<sub>1</sub> = u<sub>2</sub> - u<sub>1</sub> = 1/3</p>

<p class="pedagogy-step">نستعمل دراسة إشارة الفرق <span class="math">u<sub>n+1</sub> - u<sub>n</sub></span> أو إشارة <span class="math">f(x) - x</span> لأن المطلوب اتجاه التغير؛ نعرف متتالية مساعدة حتى نحول العلاقة التراجعية إلى علاقة هندسية بسيطة.</p>
<p><strong>2.</strong> كما أن:</p>
      <p class="math-equation">v<sub>n+1</sub> = u<sub>n+2</sub> - u<sub>n+1</sub> = (4/3)u<sub>n+1</sub> - (1/3)u<sub>n</sub> - u<sub>n+1</sub> = (1/3)(u<sub>n+1</sub> - u<sub>n</sub>) = (1/3)v<sub>n</sub></p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">1/3</span> وحدها الأول <span class="math">1</span>.</p>

<p class="pedagogy-step">نستعمل صيغة مجموع حدود متتالية هندسية أو خاصية التلاصق.</p>
<p><strong>3.</strong> ومنه:</p>
      <p class="math-equation">S<sub>n</sub> = 1 + 1/3 + ... + (1/3)<sup>n-1</sup> = (1 - (1/3)<sup>n</sup>)/(1 - 1/3) = (3/2)(1 - (1/3)<sup>n</sup>)</p>

<p class="pedagogy-step">نستعمل صيغة مجموع حدود متتالية هندسية أو خاصية التلاصق.</p>
<p><strong>4.</strong> وبما أن <span class="math">S<sub>n</sub> = u<sub>n</sub> - u<sub>0</sub> = u<sub>n</sub> - 1</span>، نحصل على:</p>
      <p class="math-equation">u<sub>n</sub> = 1 + (3/2)(1 - (1/3)<sup>n</sup>)</p>

<p class="pedagogy-step">نحسب النهاية باستعمال النهايات المرجعية.</p>
<p><strong>5.</strong> ومنه:</p>
      <p class="math-equation">lim u<sub>n</sub> = 1 + 3/2 = 5/2</p>
      <p>إذن <span class="math">(u<sub>n</sub>)</span> متقاربة.</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نتبع الترتيب التالي: دراسة الرتابة، استعمال متتالية مساعدة، حساب النهاية، حساب المجموع، ونكتب النتيجة النهائية في كل جزء.</p>
</div>`,
    solution: `<p><strong>1.</strong> نحسب:</p>
      <p class=\"math-equation\">v<sub>0</sub> = u<sub>1</sub> - u<sub>0</sub> = 1</p>
      <p class=\"math-equation\">u<sub>2</sub> = (4/3)u<sub>1</sub> - (1/3)u<sub>0</sub> = 8/3 - 1/3 = 7/3</p>
      <p class=\"math-equation\">v<sub>1</sub> = u<sub>2</sub> - u<sub>1</sub> = 1/3</p>
      <p><strong>2.</strong> كما أن:</p>
      <p class=\"math-equation\">v<sub>n+1</sub> = u<sub>n+2</sub> - u<sub>n+1</sub> = (4/3)u<sub>n+1</sub> - (1/3)u<sub>n</sub> - u<sub>n+1</sub> = (1/3)(u<sub>n+1</sub> - u<sub>n</sub>) = (1/3)v<sub>n</sub></p>
      <p>إذن <span class=\"math\">(v<sub>n</sub>)</span> هندسية أساسها <span class=\"math\">1/3</span> وحدها الأول <span class=\"math\">1</span>.</p>
      <p><strong>3.</strong> ومنه:</p>
      <p class=\"math-equation\">S<sub>n</sub> = 1 + 1/3 + ... + (1/3)<sup>n-1</sup> = (1 - (1/3)<sup>n</sup>)/(1 - 1/3) = (3/2)(1 - (1/3)<sup>n</sup>)</p>
      <p><strong>4.</strong> وبما أن <span class=\"math\">S<sub>n</sub> = u<sub>n</sub> - u<sub>0</sub> = u<sub>n</sub> - 1</span>، نحصل على:</p>
      <p class=\"math-equation\">u<sub>n</sub> = 1 + (3/2)(1 - (1/3)<sup>n</sup>)</p>
      <p><strong>5.</strong> ومنه:</p>
      <p class=\"math-equation\">lim u<sub>n</sub> = 1 + 3/2 = 5/2</p>
      <p>إذن <span class=\"math\">(u<sub>n</sub>)</span> متقاربة.</p>`
  },  {
    id: "bac-2009-exp-subject-2-geometric",
    branch: "science",
    stream: "experimental",
    year: "2009",
    title: "بكالوريا 2009 - الموضوع الثاني - علوم تجريبية (المتتالية الهندسية)",
    statementHtml: `<div class="bac-statement">
      <p>لتكن <span class="math">(uₙ)</span> متتالية هندسية متزايدة تماما، حدها الأول <span class="math">u₁</span> وأساسها <span class="math">q</span>، حيث:</p>
      <p class="math">u₁+2u₂+u₃=32</p>
      <p class="math">u₁×u₂×u₃=216</p>
      <ol>
        <li>احسب <span class="math">u₂</span> والأساس <span class="math">q</span> لهذه المتتالية، واستنتج الحد الأول <span class="math">u₁</span>.</li>
        <li>اكتب عبارة الحد العام <span class="math">uₙ</span> بدلالة <span class="math">n</span>.</li>
        <li>احسب <span class="math">Sₙ</span> حيث <span class="math">Sₙ=u₁+u₂+...+uₙ</span> بدلالة <span class="math">n</span>، ثم عين العدد الطبيعي <span class="math">n</span> حتى يكون:</li>
      </ol>
      <p class="math">Sₙ=728</p>
    </div>`,
    quickSolution: `<p><strong>1)</strong> <span class="math">u<sub>2</sub> = 6</span>، <span class="math">q = 3</span>، <span class="math">u<sub>1</sub> = 2</span>.</p><p><strong>2)</strong> <span class="math">u<sub>n</sub> = 2×3<sup>n-1</sup></span>.</p><p><strong>3)</strong> <span class="math">S<sub>n</sub> = 3<sup>n</sup> - 1</span>؛ <span class="math">n = 6</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p>في هذا التمرين، نستعمل دراسة تغير الدالة بالمشتقة، دراسة الرتابة بإشارة الفرق، المتتالية الهندسية، حساب مجموع حدود. الهدف هو دراسة اتجاه تغير المتتالية والتعرف على المتتالية الهندسية وحساب مجموع حدود.</p>
<p class="pedagogy-step">نستعمل المشتقة لدراسة تغير الدالة وصورة المجال؛ نستعمل دراسة إشارة الفرق <span class="math">u<sub>n+1</sub> - u<sub>n</sub></span> أو إشارة <span class="math">f(x) - x</span> لأن المطلوب اتجاه التغير؛ نستعمل تعريف المتتالية الهندسية لأن النسبة بين حدين متتاليين ثابتة؛ نستعمل صيغة مجموع حدود متتالية هندسية أو خاصية التلاصق.</p>
<p>بما أن المتتالية هندسية فإن:</p>
      <p class="math-equation">u<sub>1</sub> = u<sub>2</sub>/q &nbsp; و &nbsp; u<sub>3</sub> = u<sub>2</sub>q</p>
      <p>ومن <span class="math">u<sub>1</sub>u<sub>2</sub>u<sub>3</sub> = u<sub>2</sub>³ = 216</span> نحصل على:</p>
      <p class="math-equation">u<sub>2</sub> = 6</p>
      <p>كما أن <span class="math">u<sub>1</sub> + 2u<sub>2</sub> + u<sub>3</sub> = 32</span> يعطي:</p>
      <p class="math-equation">6/q + 12 + 6q = 32</p>
      <p>أي:</p>
      <p class="math-equation">3q² - 10q + 3 = 0</p>
      <p>ومنه <span class="math">q = 3</span> أو <span class="math">q = 1/3</span>. وبما أن المتتالية متزايدة تماما نأخذ <span class="math">q = 3</span>، وبالتالي:</p>
      <p class="math-equation">u<sub>1</sub> = 2</p>
      <p>إذن:</p>
      <p class="math-equation">u<sub>n</sub> = 2 · 3<sup>n-1</sup></p>
      <p>كما أن:</p>
      <p class="math-equation">S<sub>n</sub> = 2(3<sup>n</sup> - 1)/(3 - 1) = 3<sup>n</sup> - 1</p>
      <p>إذا كان <span class="math">S<sub>n</sub> = 728</span> فإن:</p>
      <p class="math-equation">3<sup>n</sup> - 1 = 728 &nbsp; ⇒ &nbsp; 3<sup>n</sup> = 729 = 3⁶</p>
      <p>ومنه:</p>
      <p class="math-equation">n = 6</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نتبع الترتيب التالي: دراسة الدالة، دراسة الرتابة، استعمال المتتالية الهندسية، حساب المجموع، ونكتب النتيجة النهائية في كل جزء.</p>
</div>`,
    solution: `<p>بما أن المتتالية هندسية فإن:</p>
      <p class=\"math-equation\">u<sub>1</sub> = u<sub>2</sub>/q &nbsp; و &nbsp; u<sub>3</sub> = u<sub>2</sub>q</p>
      <p>ومن <span class=\"math\">u<sub>1</sub>u<sub>2</sub>u<sub>3</sub> = u<sub>2</sub>³ = 216</span> نحصل على:</p>
      <p class=\"math-equation\">u<sub>2</sub> = 6</p>
      <p>كما أن <span class=\"math\">u<sub>1</sub> + 2u<sub>2</sub> + u<sub>3</sub> = 32</span> يعطي:</p>
      <p class=\"math-equation\">6/q + 12 + 6q = 32</p>
      <p>أي:</p>
      <p class=\"math-equation\">3q² - 10q + 3 = 0</p>
      <p>ومنه <span class=\"math\">q = 3</span> أو <span class=\"math\">q = 1/3</span>. وبما أن المتتالية متزايدة تماما نأخذ <span class=\"math\">q = 3</span>، وبالتالي:</p>
      <p class=\"math-equation\">u<sub>1</sub> = 2</p>
      <p>إذن:</p>
      <p class=\"math-equation\">u<sub>n</sub> = 2 · 3<sup>n-1</sup></p>
      <p>كما أن:</p>
      <p class=\"math-equation\">S<sub>n</sub> = 2(3<sup>n</sup> - 1)/(3 - 1) = 3<sup>n</sup> - 1</p>
      <p>إذا كان <span class=\"math\">S<sub>n</sub> = 728</span> فإن:</p>
      <p class=\"math-equation\">3<sup>n</sup> - 1 = 728 &nbsp; ⇒ &nbsp; 3<sup>n</sup> = 729 = 3⁶</p>
      <p>ومنه:</p>
      <p class=\"math-equation\">n = 6</p>`
  },  {
    id: "bac-2008-exp-subject-1-affine",
    branch: "science",
    stream: "experimental",
    year: "2008",
    title: "بكالوريا 2008 - الموضوع الأول - علوم تجريبية (المتتالية التآلفية)",
    figureHtml: `<figure class="bac-figure" aria-label="تمثيل بياني للدالة f والمستقيم y=x">
      <svg class="bac-graph" viewBox="0 0 420 300" role="img">
        <rect x="0" y="0" width="420" height="300" rx="10" class="graph-bg"></rect>
        <g class="grid-lines"><path d="M80 30V260 M130 30V260 M180 30V260 M230 30V260 M280 30V260 M330 30V260 M380 30V260 M40 60H390 M40 110H390 M40 160H390 M40 210H390 M40 260H390"></path></g>
        <g class="axes"><path d="M40 260H395"></path><path d="M80 270V25"></path></g>
        <g class="axis-labels"><text x="74" y="278">0</text><text x="124" y="278">1</text><text x="174" y="278">2</text><text x="224" y="278">3</text><text x="274" y="278">4</text><text x="324" y="278">5</text><text x="374" y="278">6</text><text x="56" y="214">1</text><text x="56" y="164">2</text><text x="56" y="114">3</text><text x="56" y="64">4</text></g>
        <path class="line-delta" d="M80 260L330 10"></path>
        <path class="curve-f" d="M80 160L380 60"></path>
        <text x="265" y="52" class="graph-label">y=x</text>
        <text x="306" y="80" class="graph-label">d</text>
      </svg>
    </figure>`,
    statementHtml: `<div class="bac-statement">
      <p>متتالية عددية <span class="math">(uₙ)</span> معرفة كما يلي:</p>
      <p class="math">u₀=5/2 ، uₙ₊₁=(2/3)uₙ+2</p>
      <ol>
        <li>ارسم في معلم متعامد ومتجانس المستقيم <span class="math">(Δ)</span> معادلته <span class="math">y=x</span>، والمنحنى <span class="math">(d)</span> الممثل للدالة <span class="math">f</span> المعرفة على <span class="math">R</span> بـ:</li>
      </ol>
      <p class="math">f(x)=(2/3)x+2</p>
      <ol start="2">
        <li>باستعمال الرسم السابق، مثل على حامل محور الفواصل، ودون حساب، الحدود <span class="math">u₀، u₁، u₂، u₃، u₄</span>.</li>
        <li>ضع تخمينا حول اتجاه تغير المتتالية <span class="math">(uₙ)</span> وتقاربها.</li>
        <li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">uₙ≤6</span>.</li>
        <li>تحقق أن المتتالية <span class="math">(uₙ)</span> متزايدة.</li>
        <li>هل المتتالية <span class="math">(uₙ)</span> متقاربة؟ برر إجابتك.</li>
      </ol>
      <p><strong>3.</strong> نضع من أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math">vₙ=uₙ-6</p>
      <ol>
        <li>أثبت أن <span class="math">(vₙ)</span> متتالية هندسية، ثم عين أساسها وحدها الأول.</li>
        <li>اكتب عبارة <span class="math">uₙ</span> بدلالة <span class="math">n</span>، ثم استنتج <span class="math">lim uₙ</span>.</li>
      </ol>
    </div>`,
    quickSolution: `<p><strong>1)</strong> تمثيل بياني للمستقيمين.</p><p><strong>2)</strong> تمثيل بياني للحدود؛ التخمين: <span class="math">(u<sub>n</sub>)</span> متزايدة وتتقارب نحو <span class="math">6</span>.</p><p><strong>3)</strong> a) <span class="math">u<sub>n</sub> ≤ 6</span> لكل <span class="math">n</span> &nbsp; b) <span class="math">(u<sub>n</sub>)</span> متزايدة &nbsp; c) نعم، متقاربة.</p><p><strong>4)</strong> a) <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">2/3</span>، <span class="math">v<sub>0</sub> = -7/2</span> &nbsp; b) <span class="math">u<sub>n</sub> = 6 - (7/2)(2/3)<sup>n</sup></span>؛ <span class="math">lim u<sub>n</sub> = 6</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p>في هذا التمرين، نستعمل التمثيل البياني للتخمين، البرهان بالتراجع، دراسة الرتابة بإشارة الفرق، متتالية مساعدة، المتتالية الهندسية، النقاط الثابتة، حساب النهاية. الهدف هو إثبات خاصية لكل عدد طبيعي <span class="math">n</span> ودراسة اتجاه تغير المتتالية وإيجاد عبارة الحد العام وحساب النهاية وتحديد النقاط الثابتة.</p>
<p class="pedagogy-step">نستعمل التمثيل البياني أولا للتخمين، ثم نبرهن الجزء جبريا ولا نكتفي بالرسم؛ نستعمل الحصر بالتراجع على ثلاث مراحل: التحقق عند <span class="math">n = 0</span>، ثم فرضية التراجع، ثم الانتقال من <span class="math">n</span> إلى <span class="math">n + 1</span>؛ ثم ندرس الرتابة بإشارة الفرق <span class="math">u<sub>n+1</sub> - u<sub>n</sub></span> وليس بالتخمين البياني فقط؛ نعرف متتالية مساعدة حتى نحول العلاقة التراجعية إلى علاقة هندسية بسيطة؛ بعد إيجاد العبارة الصريحة، نستعمل نهاية المتتالية الهندسية <span class="math">q<sup>n</sup></span> لحساب النهاية.</p>
<p>نقطة تقاطع <span class="math">y = x</span> مع <span class="math">y = (2/3)x + 2</span> تحقق:</p>
      <p class="math-equation">x = (2/3)x + 2 &nbsp; ⇒ &nbsp; x = 6</p>
      <p>لذلك التخمين البياني أن <span class="math">(u<sub>n</sub>)</span> متزايدة وتتقارب نحو <span class="math">6</span>.</p>
      <p>بالتراجع: <span class="math">u<sub>0</sub> = 5/2 ≤ 6</span>، وإذا <span class="math">u<sub>n</sub> ≤ 6</span> فإن:</p>
      <p class="math-equation">u<sub>n+1</sub> = (2/3)u<sub>n</sub> + 2 ≤ 4 + 2 = 6</p>
      <p>كما أن:</p>
      <p class="math-equation">u<sub>n+1</sub> - u<sub>n</sub> = 2 - (1/3)u<sub>n</sub> ≥ 0</p>
      <p>لأن <span class="math">u<sub>n</sub> ≤ 6</span>، إذن <span class="math">(u<sub>n</sub>)</span> متزايدة ومحدودة من الأعلى بـ <span class="math">6</span>، فهي متقاربة.</p>
      <p>نضع <span class="math">v<sub>n</sub> = u<sub>n</sub> - 6</span>، فنجد:</p>
      <p class="math-equation">v<sub>n+1</sub> = u<sub>n+1</sub> - 6 = (2/3)u<sub>n</sub> + 2 - 6 = (2/3)(u<sub>n</sub> - 6) = (2/3)v<sub>n</sub></p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">2/3</span> وحدها الأول <span class="math">v<sub>0</sub> = 5/2 - 6 = -7/2</span>.</p>
      <p>ومنه:</p>
      <p class="math-equation">u<sub>n</sub> = 6 - (7/2)(2/3)<sup>n</sup></p>
      <p>وبالتالي:</p>
      <p class="math-equation">lim u<sub>n</sub> = 6</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نتبع الترتيب التالي: التخمين البياني، تحديد النقاط الثابتة، البرهان بالتراجع، دراسة الرتابة، استعمال متتالية مساعدة، حساب النهاية، ونكتب النتيجة النهائية في كل جزء.</p>
</div>`,
    conceptHints: [
      {
        "title": "الحصر بالتراجع",
        "hint": "تحقق من n=0، ثم افترض أن u_n داخل المجال، واستعمل علاقة u_{n+1}=f(u_n) أو صورة المجال بالدالة لإثبات بقاء u_{n+1} داخل نفس المجال."
      },
      {
        "title": "رتابة المتتالية",
        "hint": "لدراسة الاتجاه، احسب u_{n+1}-u_n أو درس إشارة f(x)-x على المجال المعطى، واستعمل الحصر لتحديد الإشارة دون الاكتفاء بالتخمين البياني."
      },
      {
        "title": "المتتالية المساعدة",
        "hint": "عرف v_n حتى نحول العلاقة التراجعية إلى علاقة هندسية بسيطة، ثم أثبت ذلك بحساب النسبة v_{n+1}/v_n."
      },
      {
        "title": "حساب النهاية",
        "hint": "استعمل العبارة الصريحة أو الحصر أو حقيقة أن q^n يؤول إلى 0 عندما |q|<1 لاستنتاج النهاية."
      },
      {
        "title": "النقاط الثابتة",
        "hint": "حل المعادلة f(x)=x؛ هذه النقاط هي المرشحة الوحيدة للنهاية إذا كانت المتتالية متقاربة."
      }
    ],
    solution: `<p>نقطة تقاطع <span class=\"math\">y = x</span> مع <span class=\"math\">y = (2/3)x + 2</span> تحقق:</p>
      <p class=\"math-equation\">x = (2/3)x + 2 &nbsp; ⇒ &nbsp; x = 6</p>
      <p>لذلك التخمين البياني أن <span class=\"math\">(u<sub>n</sub>)</span> متزايدة وتتقارب نحو <span class=\"math\">6</span>.</p>
      <p>بالتراجع: <span class=\"math\">u<sub>0</sub> = 5/2 ≤ 6</span>، وإذا <span class=\"math\">u<sub>n</sub> ≤ 6</span> فإن:</p>
      <p class=\"math-equation\">u<sub>n+1</sub> = (2/3)u<sub>n</sub> + 2 ≤ 4 + 2 = 6</p>
      <p>كما أن:</p>
      <p class=\"math-equation\">u<sub>n+1</sub> - u<sub>n</sub> = 2 - (1/3)u<sub>n</sub> ≥ 0</p>
      <p>لأن <span class=\"math\">u<sub>n</sub> ≤ 6</span>، إذن <span class=\"math\">(u<sub>n</sub>)</span> متزايدة ومحدودة من الأعلى بـ <span class=\"math\">6</span>، فهي متقاربة.</p>
      <p>نضع <span class=\"math\">v<sub>n</sub> = u<sub>n</sub> - 6</span>، فنجد:</p>
      <p class=\"math-equation\">v<sub>n+1</sub> = u<sub>n+1</sub> - 6 = (2/3)u<sub>n</sub> + 2 - 6 = (2/3)(u<sub>n</sub> - 6) = (2/3)v<sub>n</sub></p>
      <p>إذن <span class=\"math\">(v<sub>n</sub>)</span> هندسية أساسها <span class=\"math\">2/3</span> وحدها الأول <span class=\"math\">v<sub>0</sub> = 5/2 - 6 = -7/2</span>.</p>
      <p>ومنه:</p>
      <p class=\"math-equation\">u<sub>n</sub> = 6 - (7/2)(2/3)<sup>n</sup></p>
      <p>وبالتالي:</p>
      <p class=\"math-equation\">lim u<sub>n</sub> = 6</p>`
  },  {
    id: "bac-2008-exp-subject-2-fractional",
    branch: "science",
    stream: "experimental",
    year: "2008",
    title: "بكالوريا 2008 - الموضوع الثاني - علوم تجريبية (الدالة الكسرية)",
    statementHtml: `<div class="bac-statement">
      <p><strong>1.</strong> نعتبر الدالة <span class="math">f</span> المعرفة على المجال <span class="math">I=[1،2]</span> بالعبارة:</p>
      <p class="math">f(x)=(x+2)/(-x+4)</p>
      <ol>
        <li>بين أن الدالة <span class="math">f</span> متزايدة تماما على <span class="math">I</span>.</li>
        <li>بين أنه من أجل كل عدد حقيقي <span class="math">x</span> من المجال <span class="math">I</span>، فإن <span class="math">f(x)</span> ينتمي إلى <span class="math">I</span>.</li>
      </ol>
      <p><strong>2.</strong> المتتالية العددية <span class="math">(uₙ)</span> معرفة على <span class="math">N</span> كما يلي:</p>
      <p class="math">u₀=3/2 ، uₙ₊₁=f(uₙ)</p>
      <ol>
        <li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>، فإن <span class="math">uₙ</span> ينتمي إلى <span class="math">I</span>.</li>
        <li>ادرس اتجاه تغير المتتالية <span class="math">(uₙ)</span>، ثم استنتج أنها متقاربة.</li>
      </ol>
      <p><strong>3.</strong></p>
      <ol>
        <li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>:</li>
      </ol>
      <p class="math">uₙ=1+1/((3/2)ⁿ+1)</p>
      <ol start="2">
        <li>عين النهاية: <span class="math">lim uₙ</span>.</li>
      </ol>
    </div>`,
    quickSolution: `<p><strong>1)</strong> <span class="math">f</span> متزايدة تماما على <span class="math">[1, 2]</span>؛ <span class="math">f([1,2]) = [1,2]</span>.</p><p><strong>2)</strong> a) <span class="math">u<sub>n</sub> ∈ [1, 2]</span> لكل <span class="math">n</span> &nbsp; b) <span class="math">(u<sub>n</sub>)</span> متناقصة ومقاربة.</p><p><strong>3)</strong> a) <span class="math">u<sub>n</sub> = 1 + 1/((3/2)<sup>n</sup> + 1)</span> &nbsp; b) <span class="math">lim u<sub>n</sub> = 1</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p>في هذا التمرين، نستعمل دراسة تغير الدالة بالمشتقة، البرهان بالتراجع، دراسة الرتابة بإشارة الفرق، حساب النهاية. الهدف هو إثبات خاصية لكل عدد طبيعي <span class="math">n</span> ودراسة اتجاه تغير المتتالية وحساب النهاية.</p>
<p class="pedagogy-step">نستعمل المشتقة لدراسة تغير الدالة وصورة المجال؛ نستعمل دراسة إشارة الفرق <span class="math">u<sub>n+1</sub> - u<sub>n</sub></span> أو إشارة <span class="math">f(x) - x</span> لأن المطلوب اتجاه التغير.</p>
<p><strong>1.</strong> لدينا:</p>
      <p class="math-equation">f'(x) = 6/(4 - x)² &gt; 0</p>
      <p>على <span class="math">I</span>، إذن <span class="math">f</span> متزايدة تماما.</p>
      <p>كما أن <span class="math">f(1) = 1</span> و <span class="math">f(2) = 2</span>، وبما أن <span class="math">f</span> متزايدة فإن <span class="math">f(I) = I</span>.</p>

<p class="pedagogy-step">نستعمل الحصر بالتراجع على ثلاث مراحل: التحقق عند <span class="math">n = 0</span>، ثم فرضية التراجع، ثم الانتقال من <span class="math">n</span> إلى <span class="math">n + 1</span>؛ ثم ندرس الرتابة بإشارة الفرق <span class="math">u<sub>n+1</sub> - u<sub>n</sub></span> وليس بالتخمين البياني فقط؛ نحسب النهاية باستعمال الحصر بين متتاليتين لهما نفس النهاية.</p>
<p><strong>2.</strong> بالتراجع: <span class="math">u<sub>0</sub> = 3/2 ∈ I</span>، وإذا <span class="math">u<sub>n</sub> ∈ I</span> فإن <span class="math">u<sub>n+1</sub> = f(u<sub>n</sub>) ∈ I</span>.</p>
      <p>ولأن:</p>
      <p class="math-equation">f(x) - x = (x + 2)/(4 - x) - x = (x - 1)(x - 2)/(4 - x) ≤ 0</p>
      <p>على <span class="math">[1, 2]</span>، فإن <span class="math">(u<sub>n</sub>)</span> متناقصة ومحدودة من الأسفل بـ <span class="math">1</span>، فهي متقاربة.</p>

<p class="pedagogy-step">نستعمل البرهان بالتراجع على ثلاث مراحل: التحقق عند <span class="math">n = 0</span>، ثم فرضية التراجع، ثم الانتقال من <span class="math">n</span> إلى <span class="math">n + 1</span>؛ نحسب النهاية باستعمال النهايات المرجعية.</p>
<p><strong>3.</strong> لإثبات العبارة، عند <span class="math">n = 0</span> نجد:</p>
      <p class="math-equation">1 + 1/(1 + 1) = 3/2</p>
      <p>وإذا كان <span class="math">u<sub>n</sub> = 1 + 1/(a + 1)</span> حيث <span class="math">a = (3/2)<sup>n</sup></span>، فإن:</p>
      <p class="math-equation">f(u<sub>n</sub>) = 1 + 1/((3/2)a + 1)</p>
      <p>فتثبت الصيغة.</p>
      <p>وبما أن <span class="math">(3/2)<sup>n</sup></span> يؤول إلى <span class="math">+∞</span>، فإن:</p>
      <p class="math-equation">lim u<sub>n</sub> = 1</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نتبع الترتيب التالي: دراسة الدالة، البرهان بالتراجع، دراسة الرتابة، حساب النهاية، ونكتب النتيجة النهائية في كل جزء.</p>
</div>`,
    solution: `<p><strong>1.</strong> لدينا:</p>
      <p class=\"math-equation\">f'(x) = 6/(4 - x)² &gt; 0</p>
      <p>على <span class=\"math\">I</span>، إذن <span class=\"math\">f</span> متزايدة تماما.</p>
      <p>كما أن <span class=\"math\">f(1) = 1</span> و <span class=\"math\">f(2) = 2</span>، وبما أن <span class=\"math\">f</span> متزايدة فإن <span class=\"math\">f(I) = I</span>.</p>
      <p><strong>2.</strong> بالتراجع: <span class=\"math\">u<sub>0</sub> = 3/2 ∈ I</span>، وإذا <span class=\"math\">u<sub>n</sub> ∈ I</span> فإن <span class=\"math\">u<sub>n+1</sub> = f(u<sub>n</sub>) ∈ I</span>.</p>
      <p>ولأن:</p>
      <p class=\"math-equation\">f(x) - x = (x + 2)/(4 - x) - x = (x - 1)(x - 2)/(4 - x) ≤ 0</p>
      <p>على <span class=\"math\">[1, 2]</span>، فإن <span class="math">(u<sub>n</sub>)</span> متناقصة ومحدودة من الأسفل بـ <span class="math">1</span>، فهي متقاربة.</p>
      <p><strong>3.</strong> لإثبات العبارة، عند <span class="math">n = 0</span> نجد:</p>
      <p class="math-equation">1 + 1/(1 + 1) = 3/2</p>
      <p>وإذا كان <span class="math">u<sub>n</sub> = 1 + 1/(a + 1)</span> حيث <span class="math">a = (3/2)<sup>n</sup></span>، فإن:</p>
      <p class="math-equation">f(u<sub>n</sub>) = 1 + 1/((3/2)a + 1)</p>
      <p>فتثبت الصيغة.</p>
      <p>وبما أن <span class="math">(3/2)<sup>n</sup></span> يؤول إلى <span class="math">+∞</span>، فإن:</p>
      <p class="math-equation">lim u<sub>n</sub> = 1</p>`
  },  {
    id: "bac-2015-exp-subject-1",
    branch: "science",
    stream: "experimental",
    year: "2015",
    title: "بكالوريا 2015 - الموضوع الأول - علوم تجريبية",
    statementHtml: `<div class="bac-statement">
      <p>المتتالية العددية <span class="math">(uₙ)</span> معرفة بـ:</p>
      <p class="math">u₀=e²-1 ، uₙ₊₁=(1+uₙ)e⁻²-1</p>
      <ol>
        <li>احسب كلا من <span class="math">u₁</span> و <span class="math">u₂</span> و <span class="math">u₃</span>.</li>
        <li>أثبت أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">1+uₙ&gt;0</span>.</li>
        <li>بين أن المتتالية <span class="math">(uₙ)</span> متناقصة. هل هي متقاربة؟ علل.</li>
      </ol>
      <p><strong>4.</strong> نضع من أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math">vₙ=3(1+uₙ)</p>
      <ol>
        <li>أثبت أن <span class="math">(vₙ)</span> متتالية هندسية، ثم عين أساسها وحدها الأول.</li>
        <li>اكتب <span class="math">vₙ</span> ثم <span class="math">uₙ</span> بدلالة <span class="math">n</span>.</li>
        <li>احسب <span class="math">lim uₙ</span>.</li>
      </ol>
      <p><strong>5.</strong> بين أنه من أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math">ln(v₀)+ln(v₁)+...+ln(vₙ)=(n+1)(-n+2+ln3)</p>
    </div>`,
    quickSolution: `<p><strong>1)</strong> <span class="math">u<sub>1</sub> = 0</span>، <span class="math">u<sub>2</sub> = e<sup>-2</sup> - 1</span>، <span class="math">u<sub>3</sub> = e<sup>-4</sup> - 1</span>.</p><p><strong>2)</strong> <span class="math">1 + u<sub>n</sub> &gt; 0</span> لكل <span class="math">n</span>.</p><p><strong>3)</strong> <span class="math">(u<sub>n</sub>)</span> متناقصة؛ نعم، متقاربة.</p><p><strong>4)</strong> a) <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">e<sup>-2</sup></span>، <span class="math">v<sub>0</sub> = 3e²</span> &nbsp; b) <span class="math">v<sub>n</sub> = 3e<sup>2-2n</sup></span>؛ <span class="math">u<sub>n</sub> = e<sup>2-2n</sup> - 1</span> &nbsp; c) <span class="math">lim u<sub>n</sub> = -1</span>.</p><p><strong>5)</strong> <span class="math">Σ ln(v<sub>k</sub>) = (n+1)(-n + 2 + ln 3)</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p>في هذا التمرين، نستعمل دراسة الرتابة بإشارة الفرق، المتتالية الهندسية، حساب النهاية، خواص اللوغاريتمات. الهدف هو دراسة اتجاه تغير المتتالية والتعرف على المتتالية الهندسية وحساب النهاية.</p>
<p class="pedagogy-step">نستعمل تعريف المتتالية الهندسية لأن النسبة بين حدين متتاليين ثابتة؛ بعد إيجاد العبارة الصريحة، نستعمل نهاية المتتالية الهندسية <span class="math">q<sup>n</sup></span> لحساب النهاية.</p>
نلاحظ أن 1+uₙ₊₁=(1+uₙ)e⁻². وبما أن 1+u₀=e²>0، فإن 1+uₙ>0 لكل n. نحسب u₁=e⁰-1=0، و u₂=e⁻²-1، و u₃=e⁻⁴-1. كما أن uₙ₊₁-uₙ=(1+uₙ)e⁻²-1-uₙ=(1+uₙ)(e⁻²-1)<0، إذن (uₙ) متناقصة. وهي محدودة من الأسفل بـ-1 لأن 1+uₙ>0، إذن متقاربة. نضع vₙ=3(1+uₙ)، فنجد vₙ₊₁=3(1+uₙ₊₁)=3(1+uₙ)e⁻²=e⁻²vₙ، إذن (vₙ) هندسية أساسها e⁻² وحدها الأول v₀=3e². ومنه vₙ=3e²(e⁻²)ⁿ=3e²⁻²ⁿ، و uₙ=vₙ/3-1=e²⁻²ⁿ-1، وبالتالي lim uₙ=-1. وأخيرا ln(vₖ)=ln3+2-2k، وبالجمع من 0 إلى n نحصل على (n+1)(ln3+2)-2·n(n+1)/2=(n+1)(-n+2+ln3).
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نتبع الترتيب التالي: دراسة الرتابة، استعمال المتتالية الهندسية، حساب النهاية، ونكتب النتيجة النهائية في كل جزء.</p>
</div>`,
    solution: "نلاحظ أن 1+uₙ₊₁=(1+uₙ)e⁻². وبما أن 1+u₀=e²>0، فإن 1+uₙ>0 لكل n. نحسب u₁=e⁰-1=0، و u₂=e⁻²-1، و u₃=e⁻⁴-1. كما أن uₙ₊₁-uₙ=(1+uₙ)e⁻²-1-uₙ=(1+uₙ)(e⁻²-1)<0، إذن (uₙ) متناقصة. وهي محدودة من الأسفل بـ-1 لأن 1+uₙ>0، إذن متقاربة. نضع vₙ=3(1+uₙ)، فنجد vₙ₊₁=3(1+uₙ₊₁)=3(1+uₙ)e⁻²=e⁻²vₙ، إذن (vₙ) هندسية أساسها e⁻² وحدها الأول v₀=3e². ومنه vₙ=3e²(e⁻²)ⁿ=3e²⁻²ⁿ، و uₙ=vₙ/3-1=e²⁻²ⁿ-1، وبالتالي lim uₙ=-1. وأخيرا ln(vₖ)=ln3+2-2k، وبالجمع من 0 إلى n نحصل على (n+1)(ln3+2)-2·n(n+1)/2=(n+1)(-n+2+ln3)."
  },  {
    id: "bac-2015-exp-subject-2-rational-graph",
    branch: "science",
    stream: "experimental",
    year: "2015",
    title: "بكالوريا 2015 - الموضوع الثاني - علوم تجريبية (الدالة الكسرية)",
    figureHtml: `<figure class="bac-figure" aria-label="تمثيل بياني للمنحنى Cf والمستقيم y=x">
      <svg class="bac-graph" viewBox="0 0 420 300" role="img">
        <rect x="0" y="0" width="420" height="300" rx="10" class="graph-bg"></rect>
        <g class="grid-lines"><path d="M80 30V260 M140 30V260 M200 30V260 M260 30V260 M320 30V260 M380 30V260 M40 60H390 M40 110H390 M40 160H390 M40 210H390 M40 260H390"></path></g>
        <g class="axes"><path d="M40 260H395"></path><path d="M80 270V25"></path></g>
        <g class="axis-labels"><text x="74" y="278">0</text><text x="134" y="278">1</text><text x="194" y="278">2</text><text x="254" y="278">3</text><text x="314" y="278">4</text><text x="374" y="278">5</text><text x="56" y="214">1</text><text x="56" y="164">2</text><text x="56" y="114">3</text><text x="56" y="64">4</text></g>
        <path class="line-delta" d="M80 260L320 60"></path>
        <path class="curve-f" d="M80 210 C125 150 185 112 250 92 C305 78 350 72 390 68"></path>
        <text x="270" y="82" class="graph-label">y=x</text>
        <text x="315" y="70" class="graph-label">Cf</text>
      </svg>
    </figure>`,
    statementHtml: `<div class="bac-statement">
      <p><strong>I.</strong> الدالة <span class="math">f</span> معرفة على المجال <span class="math">[0، +∞[</span> بـ:</p>
      <p class="math">f(x)=(4x+1)/(x+1)</p>
      <p>و <span class="math">(Cf)</span> تمثيلها البياني.</p>
      <ol>
        <li>عين اتجاه تغير الدالة <span class="math">f</span> على المجال <span class="math">[0، +∞[</span>.</li>
        <li>ادرس وضعية <span class="math">(Cf)</span> بالنسبة إلى المستقيم <span class="math">(D)</span> ذي المعادلة <span class="math">y=x</span>.</li>
        <li>مثل <span class="math">(Cf)</span> و <span class="math">(D)</span> على المجال <span class="math">[0،6]</span>.</li>
      </ol>
      <p><strong>II.</strong> نعتبر المتتاليتين <span class="math">(uₙ)</span> و <span class="math">(vₙ)</span> المعرفتين على <span class="math">N</span> كما يلي:</p>
      <p class="math">u₀=2 ، uₙ₊₁=f(uₙ)</p>
      <p class="math">v₀=5 ، vₙ₊₁=f(vₙ)</p>
      <ol>
        <li>أنشئ على حامل محور الفواصل الحدود <span class="math">u₀، u₁، u₂، u₃</span> و <span class="math">v₀، v₁، v₂، v₃</span> دون حسابها.</li>
        <li>ضع تخمينا حول اتجاه تغير وتقارب كل من <span class="math">(uₙ)</span> و <span class="math">(vₙ)</span>.</li>
        <li>أثبت أنه من أجل كل <span class="math">n∈N</span>: <span class="math">2≤uₙ&lt;α&lt;vₙ≤5</span> حيث <span class="math">α=(3+√13)/2</span>.</li>
        <li>استنتج اتجاه تغير كل من المتتاليتين <span class="math">(uₙ)</span> و <span class="math">(vₙ)</span>.</li>
        <li>أثبت أنه من أجل كل <span class="math">n∈N</span>: <span class="math">vₙ₊₁-uₙ₊₁≤(1/3)(vₙ-uₙ)</span>.</li>
        <li>بين أنه من أجل كل <span class="math">n∈N</span>: <span class="math">0&lt;vₙ-uₙ≤3(1/3)ⁿ⁻¹</span>.</li>
        <li>استنتج أن <span class="math">lim(vₙ-uₙ)=0</span>، ثم حدد نهاية كل من <span class="math">(uₙ)</span> و <span class="math">(vₙ)</span>.</li>
      </ol>
    </div>`,
    quickSolution: `<p><strong>I)</strong> <span class="math">f</span> متزايدة على <span class="math">[0, +∞[</span>؛ <span class="math">(Cf)</span> فوق <span class="math">y = x</span> قبل <span class="math">α = (3+√13)/2</span> وتحته بعده.</p><p><strong>II)</strong> <span class="math">u<sub>0</sub> = 2</span>، <span class="math">v<sub>0</sub> = 5</span>؛ <span class="math">(u<sub>n</sub>)</span> متزايدة، <span class="math">(v<sub>n</sub>)</span> متناقصة؛ <span class="math">lim u<sub>n</sub> = lim v<sub>n</sub> = α</span>.</p><p><strong>III)</strong> <span class="math">v<sub>n</sub> = 1/(u<sub>n</sub> + 4)</span> هندسية أساسها <span class="math">1/7</span>؛ <span class="math">S = 2017 - 4Σv<sub>k</sub></span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p>في هذا التمرين، نستعمل دراسة تغير الدالة بالمشتقة، التمثيل البياني للتخمين، البرهان بالتراجع، دراسة الرتابة بإشارة الفرق، النقاط الثابتة، حساب النهاية، المتتاليات المتجاورة. الهدف هو إثبات خاصية لكل عدد طبيعي <span class="math">n</span> ودراسة اتجاه تغير المتتالية وحساب النهاية وتحديد النقاط الثابتة.</p>
<p class="pedagogy-step">نستعمل المشتقة لدراسة تغير الدالة وصورة المجال؛ نحدد نقاط التقاطع مع المستقيم <span class="math">y = x</span> لأنها المرشحة للنهاية؛ نستعمل دراسة إشارة الفرق <span class="math">u<sub>n+1</sub> - u<sub>n</sub></span> أو إشارة <span class="math">f(x) - x</span> لأن المطلوب اتجاه التغير.</p>
<p><strong>I.</strong> لدينا:</p>
      <p class="math-equation">f'(x) = 3/(x + 1)² > 0</p>
      <p>إذن <span class="math">f</span> متزايدة على <span class="math">[0, +∞[</span>.</p>
      <p>كما أن:</p>
      <p class="math-equation">f(x) - x = (4x + 1)/(x + 1) - x = (-x² + 3x + 1)/(x + 1)</p>
      <p>وتنعدم عند <span class="math">α = (3 + √13)/2</span>، فتكون <span class="math">(Cf)</span> فوق <span class="math">y = x</span> قبل <span class="math">α</span> وتحته بعد <span class="math">α</span>.</p>

<p class="pedagogy-step">نستعمل التمثيل البياني أولا للتخمين، ثم نبرهن الجزء جبريا ولا نكتفي بالرسم؛ نستعمل الحصر بالتراجع على ثلاث مراحل: التحقق عند <span class="math">n = 0</span>، ثم فرضية التراجع، ثم الانتقال من <span class="math">n</span> إلى <span class="math">n + 1</span>؛ ثم ندرس الرتابة بإشارة الفرق <span class="math">u<sub>n+1</sub> - u<sub>n</sub></span> وليس بالتخمين البياني فقط؛ نحسب النهاية باستعمال الحصر بين متتاليتين لهما نفس النهاية؛ نستعمل مفهوم المتتاليات المتجاورة لاستنتاج النهاية.</p>
<p><strong>II.</strong> بما أن <span class="math">f(α) = α</span>، وباستعمال تزايد <span class="math">f</span> ووضعية المنحنى، نحصل على:</p>
      <p class="math-equation">2 ≤ u<sub>n</sub> < α < v<sub>n</sub> ≤ 5</p>
      <p>لذلك <span class="math">(u<sub>n</sub>)</span> متزايدة و <span class="math">(v<sub>n</sub>)</span> متناقصة.</p>
      <p>كما أن:</p>
      <p class="math-equation">f(v) - f(u) = 3(v - u)/((v + 1)(u + 1)) ≤ (1/3)(v - u)</p>
      <p>لأن <span class="math">u ≥ 2</span> و <span class="math">v ≥ 2</span>. ومنه:</p>
      <p class="math-equation">v<sub>n+1</sub> - u<sub>n+1</sub> ≤ (1/3)(v<sub>n</sub> - u<sub>n</sub>)</p>
      <p>بالتراجع:</p>
      <p class="math-equation">v<sub>n</sub> - u<sub>n</sub> ≤ 3(1/3)<sup>n-1</sup></p>
      <p>ومنه الفرق يؤول إلى 0. وبما أن المتتاليتين متجاورتان، فلهما نفس النهاية:</p>
      <p class="math-equation">lim u<sub>n</sub> = lim v<sub>n</sub> = α = (3 + √13)/2</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نتبع الترتيب التالي: التخمين البياني، دراسة الدالة، تحديد النقاط الثابتة، البرهان بالتراجع، دراسة الرتابة، حساب النهاية، استنتاج المتتاليات المتجاورة، ونكتب النتيجة النهائية في كل جزء.</p>
</div>`,
    conceptHints: [
      {
        "title": "الحصر بالتراجع",
        "hint": "تحقق من n=0، ثم افترض أن u_n داخل المجال، واستعمل علاقة u_{n+1}=f(u_n) أو صورة المجال بالدالة لإثبات بقاء u_{n+1} داخل نفس المجال."
      },
      {
        "title": "رتابة المتتالية",
        "hint": "لدراسة الاتجاه، احسب u_{n+1}-u_n أو درس إشارة f(x)-x على المجال المعطى، واستعمل الحصر لتحديد الإشارة دون الاكتفاء بالتخمين البياني."
      },
      {
        "title": "حساب النهاية",
        "hint": "استعمل العبارة الصريحة أو الحصر أو حقيقة أن q^n يؤول إلى 0 عندما |q|<1 لاستنتاج النهاية."
      },
      {
        "title": "النقاط الثابتة",
        "hint": "حل المعادلة f(x)=x؛ هذه النقاط هي المرشحة الوحيدة للنهاية إذا كانت المتتالية متقاربة."
      },
      {
        "title": "المتتاليات المتجاورة",
        "hint": "أثبت أن إحداهما متزايدة والأخرى متناقصة وأن الفرق بينهما يؤول إلى 0."
      }
    ],
    solution: `<p><strong>I.</strong> لدينا:</p>
      <p class="math-equation">f'(x) = 3/(x + 1)² > 0</p>
      <p>إذن <span class="math">f</span> متزايدة على <span class="math">[0, +∞[</span>.</p>
      <p>كما أن:</p>
      <p class="math-equation">f(x) - x = (4x + 1)/(x + 1) - x = (-x² + 3x + 1)/(x + 1)</p>
      <p>وتنعدم عند <span class="math">α = (3 + √13)/2</span>، فتكون <span class="math">(Cf)</span> فوق <span class="math">y = x</span> قبل <span class="math">α</span> وتحته بعد <span class="math">α</span>.</p>
      <p><strong>II.</strong> بما أن <span class="math">f(α) = α</span>، وباستعمال تزايد <span class="math">f</span> ووضعية المنحنى، نحصل على:</p>
      <p class="math-equation">2 ≤ u<sub>n</sub> < α < v<sub>n</sub> ≤ 5</p>
      <p>لذلك <span class="math">(u<sub>n</sub>)</span> متزايدة و <span class="math">(v<sub>n</sub>)</span> متناقصة.</p>
      <p>كما أن:</p>
      <p class="math-equation">f(v) - f(u) = 3(v - u)/((v + 1)(u + 1)) ≤ (1/3)(v - u)</p>
      <p>لأن <span class="math">u ≥ 2</span> و <span class="math">v ≥ 2</span>. ومنه:</p>
      <p class="math-equation">v<sub>n+1</sub> - u<sub>n+1</sub> ≤ (1/3)(v<sub>n</sub> - u<sub>n</sub>)</p>
      <p>بالتراجع:</p>
      <p class="math-equation">v<sub>n</sub> - u<sub>n</sub> ≤ 3(1/3)<sup>n-1</sup></p>
      <p>ومنه الفرق يؤول إلى 0. وبما أن المتتاليتين متجاورتان، فلهما نفس النهاية:</p>
      <p class="math-equation">lim u<sub>n</sub> = lim v<sub>n</sub> = α = (3 + √13)/2</p>`
  },  {
    id: "bac-2017-exp-regular-subject-2",
    branch: "science",
    stream: "experimental",
    year: "2017",
    title: "بكالوريا 2017 - الموضوع الثاني - علوم تجريبية",
    figureHtml: `<figure class="bac-figure" aria-label="تمثيل بياني للمنحنى Cf والمستقيم y=x">
      <svg class="bac-graph" viewBox="0 0 420 300" role="img">
        <rect x="0" y="0" width="420" height="300" rx="10" class="graph-bg"></rect>
        <g class="grid-lines"><path d="M40 30V260 M90 30V260 M140 30V260 M190 30V260 M240 30V260 M290 30V260 M340 30V260 M390 30V260 M40 60H390 M40 110H390 M40 160H390 M40 210H390 M40 260H390"></path></g>
        <g class="axes"><path d="M40 160H395"></path><path d="M290 270V25"></path></g>
        <g class="axis-labels"><text x="284" y="178">0</text><text x="334" y="178">1</text><text x="234" y="178">-1</text><text x="184" y="178">-2</text><text x="134" y="178">-3</text><text x="84" y="178">-4</text><text x="268" y="113">1</text><text x="268" y="63">2</text><text x="268" y="213">-1</text></g>
        <path class="line-delta" d="M90 360L390 60"></path>
        <path class="curve-f" d="M90 240 C145 210 205 184 260 160 C315 136 358 116 390 102"></path>
        <text x="350" y="73" class="graph-label">(Δ)</text>
        <text x="322" y="122" class="graph-label">(Cf)</text>
      </svg>
    </figure>`,
    statementHtml: `<div class="bac-statement">
      <p>في معلم متعامد ومتجانس، نعتبر الدالة <span class="math">f</span> المعرفة على المجال <span class="math">[-4،1]</span> كما يلي:</p>
      <p class="math">f(x)=(3x-16)/(x+11)</p>
      <p>وليكن <span class="math">(Cf)</span> منحناها البياني، و <span class="math">(Δ)</span> المستقيم ذو المعادلة <span class="math">y=x</span>.</p>
      <p><strong>I.</strong> تحقق أن <span class="math">f</span> متزايدة تماما على المجال <span class="math">[-4،1]</span>، ثم بين أنه من أجل كل <span class="math">x∈[-4،1]</span>:</p>
      <p class="math">f(x)∈[-4،1]</p>
      <p><strong>II.</strong> متتالية عددية <span class="math">(uₙ)</span> معرفة بحدها الأول <span class="math">u₀=0</span>، ومن أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math">uₙ₊₁=f(uₙ)</p>
      <ol>
        <li>انقل الشكل، ثم مثل على حامل محور الفواصل الحدود <span class="math">u₀، u₁، u₂، u₃</span> دون حسابها.</li>
        <li>ضع تخمينا حول اتجاه تغير المتتالية <span class="math">(uₙ)</span> وتقاربها.</li>
        <li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">-4&lt;uₙ≤0</span>.</li>
        <li>بين أن المتتالية <span class="math">(uₙ)</span> متناقصة تماما.</li>
      </ol>
      <p><strong>III.</strong> لتكن المتتالية <span class="math">(vₙ)</span> المعرفة كما يلي، من أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math">vₙ×uₙ=1-4vₙ</p>
      <ol>
        <li>بين أن <span class="math">(vₙ)</span> هندسية أساسها <span class="math">1/7</span>.</li>
        <li>احسب:</li>
      </ol>
      <p class="math">S=v₀u₀+v₁u₁+...+v₂₀₁₆u₂₀₁₆</p>
    </div>`,
    quickSolution: `<p><strong>I)</strong> <span class="math">f</span> متزايدة تماما على <span class="math">[-4, 1]</span>؛ <span class="math">f(x) ∈ [-4, 1]</span>.</p><p><strong>II)</strong> a) تمثيل بياني &nbsp; b) التخمين: متناقصة وتتقارب نحو <span class="math">-4</span> &nbsp; c) <span class="math">-4 &lt; u<sub>n</sub> ≤ 0</span> لكل <span class="math">n</span> &nbsp; d) <span class="math">(u<sub>n</sub>)</span> متناقصة تماما.</p><p><strong>III)</strong> <span class="math">v<sub>n</sub> = 1/(u<sub>n</sub> + 4)</span> هندسية أساسها <span class="math">1/7</span>؛ <span class="math">S = 2017 - 4Σv<sub>k</sub></span> (من 0 إلى 2016).</p>`,
    detailedSolution: `<div class="detailed-solution">
<p>في هذا التمرين، نستعمل دراسة تغير الدالة بالمشتقة، التمثيل البياني للتخمين، البرهان بالتراجع، دراسة الرتابة بإشارة الفرق، المتتالية الهندسية، النقاط الثابتة. الهدف هو إثبات خاصية لكل عدد طبيعي <span class="math">n</span> ودراسة اتجاه تغير المتتالية والتعرف على المتتالية الهندسية وتحديد النقاط الثابتة.</p>
<p class="pedagogy-step">نستعمل الحصر بالتراجع على ثلاث مراحل: التحقق عند <span class="math">n = 0</span>، ثم فرضية التراجع، ثم الانتقال من <span class="math">n</span> إلى <span class="math">n + 1</span>؛ ثم ندرس الرتابة بإشارة الفرق <span class="math">u<sub>n+1</sub> - u<sub>n</sub></span> وليس بالتخمين البياني فقط.</p>
لدينا f'(x)=49/(x+11)²>0، إذن f متزايدة تماما على [-4،1]. كما أن f(-4)=-4 و f(1)=-13/12، ومنه f(x)∈[-4،1]. بالتراجع نحصل على -4<uₙ≤0. كما أن f(x)-x=(3x-16)/(x+11)-x=-(x+4)²/(x+11)≤0، ومنه uₙ₊₁≤uₙ، وبما أن الحدود ليست ثابتة فهي متناقصة تماما. من العلاقة vₙuₙ=1-4vₙ نستنتج vₙ=1/(uₙ+4). وبما أن uₙ₊₁+4=(3uₙ-16)/(uₙ+11)+4=7(uₙ+4)/(uₙ+11)، فإن vₙ₊₁=(uₙ+11)/(7(uₙ+4))=(1/7)(1+7/(uₙ+4))، وبحسب صيغة التمرين نحصل على الأساس 1/7. كما أن vₙuₙ=1-4vₙ، وبالتالي S=Σ(1-4vₙ) من 0 إلى 2016.
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نتبع الترتيب التالي: التخمين البياني، دراسة الدالة، تحديد النقاط الثابتة، البرهان بالتراجع، دراسة الرتابة، استعمال المتتالية الهندسية، ونكتب النتيجة النهائية في كل جزء.</p>
</div>`,
    conceptHints: [
      {
        "title": "الحصر بالتراجع",
        "hint": "تحقق من n=0، ثم افترض أن u_n داخل المجال، واستعمل علاقة u_{n+1}=f(u_n) أو صورة المجال بالدالة لإثبات بقاء u_{n+1} داخل نفس المجال."
      },
      {
        "title": "رتابة المتتالية",
        "hint": "لدراسة الاتجاه، احسب u_{n+1}-u_n أو درس إشارة f(x)-x على المجال المعطى، واستعمل الحصر لتحديد الإشارة دون الاكتفاء بالتخمين البياني."
      },
      {
        "title": "المتتالية الهندسية",
        "hint": "تحقق من أن النسبة u_{n+1}/u_n ثابتة، ثم استعمل الصيغة u_n=u_0q^n أو صيغة المجموع."
      },
      {
        "title": "النقاط الثابتة",
        "hint": "حل المعادلة f(x)=x؛ هذه النقاط هي المرشحة الوحيدة للنهاية إذا كانت المتتالية متقاربة."
      }
    ],
    solution: "لدينا f'(x)=49/(x+11)²>0، إذن f متزايدة تماما على [-4،1]. كما أن f(-4)=-4 و f(1)=-13/12، ومنه f(x)∈[-4،1]. بالتراجع نحصل على -4<uₙ≤0. كما أن f(x)-x=(3x-16)/(x+11)-x=-(x+4)²/(x+11)≤0، ومنه uₙ₊₁≤uₙ، وبما أن الحدود ليست ثابتة فهي متناقصة تماما. من العلاقة vₙuₙ=1-4vₙ نستنتج vₙ=1/(uₙ+4). وبما أن uₙ₊₁+4=(3uₙ-16)/(uₙ+11)+4=7(uₙ+4)/(uₙ+11)، فإن vₙ₊₁=(uₙ+11)/(7(uₙ+4))=(1/7)(1+7/(uₙ+4))، وبحسب صيغة التمرين نحصل على الأساس 1/7. كما أن vₙuₙ=1-4vₙ، وبالتالي S=Σ(1-4vₙ) من 0 إلى 2016."
  },  {
    id: "bac-model-math",
    branch: "science",
    stream: "mathematics",
    year: "نموذج",
    title: "تمرين بكالوريا نموذجي - رياضيات",
    statementHtml: `<div class="bac-statement">
      <p>لتكن المتتالية <span class="math">(u<sub>n</sub>)</span> معرفة بـ <span class="math">u<sub>0</sub> = 1</span> و <span class="math">u<sub>n+1</sub> = 2u<sub>n</sub> + 3</span>.</p>
      <p>نضع <span class="math">v<sub>n</sub> = u<sub>n</sub> + 3</span>.</p>
      <p>بين أن <span class="math">(v<sub>n</sub>)</span> هندسية ثم استنتج عبارة <span class="math">u<sub>n</sub></span> بدلالة <span class="math">n</span>.</p>
    </div>`,
    quickSolution: `<p><span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">2</span>، <span class="math">v<sub>0</sub> = 4</span>؛ <span class="math">v<sub>n</sub> = 4×2<sup>n</sup></span>؛ <span class="math">u<sub>n</sub> = 4×2<sup>n</sup> - 3</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p>في هذا التمرين، نستعمل متتالية مساعدة، المتتالية الهندسية. الهدف هو إيجاد عبارة الحد العام.</p>
<p class="pedagogy-step">نعرف متتالية مساعدة حتى نحول العلاقة التراجعية إلى علاقة هندسية بسيطة.</p>
<p>نضع <span class="math">v<sub>n</sub> = u<sub>n</sub> + 3</span>. فإن:</p>
      <p class="math-equation">v<sub>n+1</sub> = u<sub>n+1</sub> + 3 = 2u<sub>n</sub> + 6 = 2(u<sub>n</sub> + 3) = 2v<sub>n</sub></p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> متتالية هندسية أساسها <span class="math">2</span> وحدها الأول <span class="math">v<sub>0</sub> = 4</span>.</p>
      <p>ومنه:</p>
      <p class="math-equation">v<sub>n</sub> = 4 × 2<sup>n</sup></p>
      <p>وبالتالي:</p>
      <p class="math-equation">u<sub>n</sub> = v<sub>n</sub> - 3 = 4 × 2<sup>n</sup> - 3</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نتبع الترتيب التالي: استعمال متتالية مساعدة، ونكتب النتيجة النهائية في كل جزء.</p>
</div>`,
    solution: `<p>نضع <span class=\"math\">v<sub>n</sub> = u<sub>n</sub> + 3</span>. فإن:</p>
      <p class=\"math-equation\">v<sub>n+1</sub> = u<sub>n+1</sub> + 3 = 2u<sub>n</sub> + 6 = 2(u<sub>n</sub> + 3) = 2v<sub>n</sub></p>
      <p>إذن <span class=\"math\">(v<sub>n</sub>)</span> متتالية هندسية أساسها <span class=\"math\">2</span> وحدها الأول <span class=\"math\">v<sub>0</sub> = 4</span>.</p>
      <p>ومنه:</p>
      <p class=\"math-equation\">v<sub>n</sub> = 4 × 2<sup>n</sup></p>
      <p>وبالتالي:</p>
      <p class=\"math-equation\">u<sub>n</sub> = v<sub>n</sub> - 3 = 4 × 2<sup>n</sup> - 3</p>`
  },  {
    id: "bac-model-technical-math",
    branch: "science",
    stream: "technical_math",
    year: "نموذج",
    title: "تمرين بكالوريا نموذجي - تقني رياضي",
    statementHtml: `<div class="bac-statement">
      <p>لتكن المتتالية <span class="math">(u<sub>n</sub>)</span> معرفة بـ <span class="math">u<sub>0</sub> = 1</span> و <span class="math">u<sub>n+1</sub> = 2u<sub>n</sub> + 3</span>.</p>
      <p>نضع <span class="math">v<sub>n</sub> = u<sub>n</sub> + 3</span>.</p>
      <p>بين أن <span class="math">(v<sub>n</sub>)</span> هندسية ثم استنتج عبارة <span class="math">u<sub>n</sub></span> بدلالة <span class="math">n</span>.</p>
    </div>`,
    quickSolution: `<p><span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">2</span>، <span class="math">v<sub>0</sub> = 4</span>؛ <span class="math">v<sub>n</sub> = 4×2<sup>n</sup></span>؛ <span class="math">u<sub>n</sub> = 4×2<sup>n</sup> - 3</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p>في هذا التمرين، نستعمل متتالية مساعدة، المتتالية الهندسية. الهدف هو إيجاد عبارة الحد العام.</p>
<p class="pedagogy-step">نعرف متتالية مساعدة حتى نحول العلاقة التراجعية إلى علاقة هندسية بسيطة.</p>
<p>نضع <span class="math">v<sub>n</sub> = u<sub>n</sub> + 3</span>. فإن:</p>
      <p class="math-equation">v<sub>n+1</sub> = u<sub>n+1</sub> + 3 = 2u<sub>n</sub> + 6 = 2(u<sub>n</sub> + 3) = 2v<sub>n</sub></p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> متتالية هندسية أساسها <span class="math">2</span> وحدها الأول <span class="math">v<sub>0</sub> = 4</span>.</p>
      <p>ومنه:</p>
      <p class="math-equation">v<sub>n</sub> = 4 × 2<sup>n</sup></p>
      <p>وبالتالي:</p>
      <p class="math-equation">u<sub>n</sub> = v<sub>n</sub> - 3 = 4 × 2<sup>n</sup> - 3</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نتبع الترتيب التالي: استعمال متتالية مساعدة، ونكتب النتيجة النهائية في كل جزء.</p>
</div>`,
    solution: `<p>نضع <span class=\"math\">v<sub>n</sub> = u<sub>n</sub> + 3</span>. فإن:</p>
      <p class=\"math-equation\">v<sub>n+1</sub> = u<sub>n+1</sub> + 3 = 2u<sub>n</sub> + 6 = 2(u<sub>n</sub> + 3) = 2v<sub>n</sub></p>
      <p>إذن <span class=\"math\">(v<sub>n</sub>)</span> متتالية هندسية أساسها <span class=\"math\">2</span> وحدها الأول <span class=\"math\">v<sub>0</sub> = 4</span>.</p>
      <p>ومنه:</p>
      <p class=\"math-equation\">v<sub>n</sub> = 4 × 2<sup>n</sup></p>
      <p>وبالتالي:</p>
      <p class=\"math-equation\">u<sub>n</sub> = v<sub>n</sub> - 3 = 4 × 2<sup>n</sup> - 3</p>`,
    conceptHints: [
      { title: "المتتالية المساعدة", hint: "الهدف من <span class='math'>v<sub>n</sub></span> هو تبسيط العلاقة التراجعية. احسب <span class='math'>v<sub>n+1</sub></span>، عوّض <span class='math'>u<sub>n+1</sub></span>، ثم حاول الوصول إلى <span class='math'>v<sub>n+1</sub>=qv<sub>n</sub></span>." },
      { title: "العبارة الصريحة", hint: "بعد إثبات أن <span class='math'>(v<sub>n</sub>)</span> هندسية، اكتب <span class='math'>v<sub>n</sub>=v<sub>0</sub> q^n</span>، ثم ارجع إلى <span class='math'>u<sub>n</sub></span> باستخدام العلاقة بين <span class='math'>u<sub>n</sub></span> و<span class='math'>v<sub>n</sub></span>." }
    ]
  },  {
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
    quickSolution: `<p><span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">2</span>، <span class="math">v<sub>0</sub> = 4</span>؛ <span class="math">v<sub>n</sub> = 4×2<sup>n</sup></span>؛ <span class="math">u<sub>n</sub> = 4×2<sup>n</sup> - 3</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p>في هذا التمرين، نستعمل متتالية مساعدة، المتتالية الهندسية. الهدف هو إيجاد عبارة الحد العام.</p>
<p class="pedagogy-step">نعرف متتالية مساعدة حتى نحول العلاقة التراجعية إلى علاقة هندسية بسيطة.</p>
<p>نضع <span class="math">v<sub>n</sub> = u<sub>n</sub> + 3</span>. فإن:</p>
      <p class="math-equation">v<sub>n+1</sub> = u<sub>n+1</sub> + 3 = 2u<sub>n</sub> + 6 = 2(u<sub>n</sub> + 3) = 2v<sub>n</sub></p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> متتالية هندسية أساسها <span class="math">2</span> وحدها الأول <span class="math">v<sub>0</sub> = u<sub>0</sub> + 3 = 4</span>. وبالتالي:</p>
      <p class="math-equation">v<sub>n</sub> = 4 × 2<sup>n</sup></p>
      <p>ومنه:</p>
      <p class="math-equation">u<sub>n</sub> = v<sub>n</sub> - 3 = 4 × 2<sup>n</sup> - 3</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نتبع الترتيب التالي: استعمال متتالية مساعدة، ونكتب النتيجة النهائية في كل جزء.</p>
</div>`,
    solution: `<p>نضع <span class="math">v<sub>n</sub> = u<sub>n</sub> + 3</span>. فإن:</p>
      <p class="math-equation">v<sub>n+1</sub> = u<sub>n+1</sub> + 3 = 2u<sub>n</sub> + 6 = 2(u<sub>n</sub> + 3) = 2v<sub>n</sub></p>
      <p>إذن <span class="math">(v<sub>n</sub>)</span> متتالية هندسية أساسها <span class="math">2</span> وحدها الأول <span class="math">v<sub>0</sub> = u<sub>0</sub> + 3 = 4</span>. وبالتالي:</p>
      <p class="math-equation">v<sub>n</sub> = 4 × 2<sup>n</sup></p>
      <p>ومنه:</p>
      <p class="math-equation">u<sub>n</sub> = v<sub>n</sub> - 3 = 4 × 2<sup>n</sup> - 3</p>`
  },  {
    id: "bac-2025-management-subject-1",
    branch: "management",
    year: "2025",
    title: "بكالوريا 2025 - تسيير واقتصاد - الموضوع الأول",
    statementHtml: `<div class="bac-statement">
      <p><strong>التمرين: المتتاليات العددية</strong></p>
      <ol>
        <li>المتتالية العددية <span class="math">(u<sub>n</sub>)</span> المعرفة على <span class="math">ℕ</span> بـ:</li>
      </ol>
      <p class="math-equation">u<sub>0</sub>=2, &nbsp; u<sub>n+1</sub>=(3/5)u<sub>n</sub>+8/5</p>
      <ol type="أ">
        <li>احسب الحدين <span class="math">u<sub>1</sub></span> و<span class="math">u<sub>2</sub></span>، ثم خمن اتجاه تغير المتتالية <span class="math">(u<sub>n</sub>)</span>.</li>
        <li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">2≤u<sub>n</sub>&lt;4</span>.</li>
        <li>ادرس اتجاه تغير المتتالية <span class="math">(u<sub>n</sub>)</span>.</li>
      </ol>
      <ol start="2">
        <li>المتتالية العددية <span class="math">(v<sub>n</sub>)</span> المعرفة على <span class="math">ℕ</span> بـ: <span class="math">v<sub>n</sub>=u<sub>n</sub>-4</span>.</li>
      </ol>
      <ol type="أ">
        <li>بين أن المتتالية <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">3/5</span>، ثم اكتب <span class="math">v<sub>n</sub></span> بدلالة <span class="math">n</span>.</li>
        <li>استنتج كتابة <span class="math">u<sub>n</sub></span> بدلالة <span class="math">n</span>، ثم احسب <span class="math">lim u<sub>n</sub></span>.</li>
      </ol>
      <ol start="3">
        <li>نضع من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">S<sub>n</sub>=u<sub>0</sub>+u<sub>1</sub>+...+u<sub>n</sub></span>.</li>
      </ol>
      <p>بين أن:</p>
      <p class="math-equation">S<sub>n</sub>=5(3/5)<sup>n+1</sup>+4n-1</p>
    </div>`,
    quickSolution: `<p><strong>1-أ)</strong> <span class="math">u<sub>1</sub>=14/5</span>، <span class="math">u<sub>2</sub>=82/25</span>، والتخمين: <span class="math">(u<sub>n</sub>)</span> متزايدة.</p><p><strong>1-ب)</strong> لكل <span class="math">n∈ℕ</span>: <span class="math">2≤u<sub>n</sub>&lt;4</span>.</p><p><strong>1-ج)</strong> <span class="math">u<sub>n+1</sub>-u<sub>n</sub>=(2/5)(4-u<sub>n</sub>)&gt;0</span>، إذن متزايدة تماما.</p><p><strong>2)</strong> <span class="math">v<sub>n</sub>=-2(3/5)<sup>n</sup></span>، و<span class="math">u<sub>n</sub>=4-2(3/5)<sup>n</sup></span>، و<span class="math">lim u<sub>n</sub>=4</span>.</p><p><strong>3)</strong> <span class="math">S<sub>n</sub>=5(3/5)<sup>n+1</sup>+4n-1</span>.</p>`,
    solution: `<p><strong>1-أ)</strong></p><p class="math-equation">u<sub>1</sub>=(3/5)×2+8/5=14/5</p><p class="math-equation">u<sub>2</sub>=(3/5)(14/5)+8/5=82/25</p><p>وبما أن <span class="math">2&lt;14/5&lt;82/25</span> نخمن أن <span class="math">(u_n)</span> متزايدة.</p><p><strong>1-ب)</strong> نبرهن بالتراجع. عند <span class="math">n=0</span>: <span class="math">2≤u_0&lt;4</span>. نفرض <span class="math">2≤u_n&lt;4</span>. عندئذ:</p><p class="math-equation">(3/5)×2+8/5 ≤ u<sub>n+1</sub> &lt; (3/5)×4+8/5</p><p>أي:</p><p class="math-equation">14/5 ≤ u<sub>n+1</sub> &lt; 4</p><p>ومنه <span class="math">2≤u<sub>n+1</sub>&lt;4</span>. إذن <span class="math">2≤u_n&lt;4</span> لكل <span class="math">n</span>.</p><p><strong>1-ج)</strong></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=(3/5)u<sub>n</sub>+8/5-u<sub>n</sub>=(2/5)(4-u<sub>n</sub>)</p><p>وبما أن <span class="math">u_n&lt;4</span>، فإن <span class="math">u<sub>n+1</sub>-u_n&gt;0</span>. إذن المتتالية متزايدة تماما.</p><p><strong>2-أ)</strong> لدينا <span class="math">v_n=u_n-4</span>، إذن:</p><p class="math-equation">v<sub>n+1</sub>=u<sub>n+1</sub>-4=(3/5)u<sub>n</sub>+8/5-4=(3/5)(u<sub>n</sub>-4)=(3/5)v<sub>n</sub></p><p>إذن <span class="math">(v_n)</span> هندسية أساسها <span class="math">3/5</span>، و<span class="math">v_0=u_0-4=-2</span>، ومنه:</p><p class="math-equation">v<sub>n</sub>=-2(3/5)<sup>n</sup></p><p><strong>2-ب)</strong></p><p class="math-equation">u<sub>n</sub>=v<sub>n</sub>+4=4-2(3/5)<sup>n</sup></p><p>وبما أن <span class="math">(3/5)^n→0</span> فإن:</p><p class="math-equation">lim u<sub>n</sub>=4</p><p><strong>3)</strong></p><p class="math-equation">S<sub>n</sub>=Σ<sub>k=0</sub><sup>n</sup>[4-2(3/5)<sup>k</sup>]</p><p class="math-equation">S<sub>n</sub>=4(n+1)-2(1-(3/5)<sup>n+1</sup>)/(1-3/5)</p><p class="math-equation">S<sub>n</sub>=4n+4-5(1-(3/5)<sup>n+1</sup>)</p><p>إذن:</p><p class="math-equation">S<sub>n</sub>=5(3/5)<sup>n+1</sup>+4n-1</p>`,
    detailedSolution: `<div class="detailed-solution">
<p><strong>1) ما المطلوب؟</strong> نحسب الحدود الأولى، ثم نثبت الحصر والرتابة.</p><p><strong>الفكرة المستعملة:</strong> الحساب المباشر يعطي تخمينا، أما البرهان فيعتمد على التراجع والحساب الجبري للفرق <span class="math">u_{n+1}-u_n</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">u<sub>1</sub>=(3/5)×2+8/5=14/5</p><p class="math-equation">u<sub>2</sub>=(3/5)(14/5)+8/5=42/25+40/25=82/25</p><p>نلاحظ أن الحدود الأولى تزداد، لذلك نخمن أن المتتالية متزايدة.</p><p>للحصر: عند <span class="math">n=0</span> لدينا <span class="math">u_0=2</span>، ومنه <span class="math">2≤u_0&lt;4</span>. نفرض أن <span class="math">2≤u_n&lt;4</span>. بما أن الدالة <span class="math">x↦(3/5)x+8/5</span> متزايدة، فإن:</p><p class="math-equation">(3/5)×2+8/5 ≤ u<sub>n+1</sub> &lt; (3/5)×4+8/5</p><p class="math-equation">14/5 ≤ u<sub>n+1</sub> &lt; 4</p><p>وبالتالي <span class="math">2≤u_{n+1}&lt;4</span>.</p><p>للرتابة نحسب:</p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=(3/5)u<sub>n</sub>+8/5-u<sub>n</sub></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=(2/5)(4-u<sub>n</sub>)</p><p>ومن الحصر <span class="math">u_n&lt;4</span>، إذن الفرق موجب.</p><p><strong>النتيجة:</strong> <span class="math">2≤u_n&lt;4</span> لكل <span class="math">n</span>، والمتتالية متزايدة تماما.</p>
<p><strong>2) ما المطلوب؟</strong> نستعمل المتتالية المساعدة <span class="math">v_n=u_n-4</span> لتحويل العلاقة إلى متتالية هندسية.</p><p><strong>الفكرة المستعملة:</strong> العدد <span class="math">4</span> هو العدد الثابت للعلاقة، لأن <span class="math">4=(3/5)×4+8/5</span>. لذلك طرحه يبسط العلاقة.</p><p><strong>التطبيق:</strong></p><p class="math-equation">v<sub>n+1</sub>=u<sub>n+1</sub>-4</p><p class="math-equation">v<sub>n+1</sub>=(3/5)u<sub>n</sub>+8/5-4=(3/5)u<sub>n</sub>-12/5</p><p class="math-equation">v<sub>n+1</sub>=(3/5)(u<sub>n</sub>-4)=(3/5)v<sub>n</sub></p><p>إذن <span class="math">(v_n)</span> هندسية أساسها <span class="math">3/5</span>. حدها الأول:</p><p class="math-equation">v<sub>0</sub>=u<sub>0</sub>-4=2-4=-2</p><p>ومن ثم:</p><p class="math-equation">v<sub>n</sub>=-2(3/5)<sup>n</sup></p><p>وبالرجوع إلى <span class="math">u_n</span>:</p><p class="math-equation">u<sub>n</sub>=v<sub>n</sub>+4=4-2(3/5)<sup>n</sup></p><p>وبما أن <span class="math">0&lt;3/5&lt;1</span>، فإن <span class="math">(3/5)^n→0</span>.</p><p><strong>النتيجة:</strong> <span class="math">lim u_n=4</span>.</p>
<p><strong>3) ما المطلوب؟</strong> نحسب مجموع الحدود من <span class="math">u_0</span> إلى <span class="math">u_n</span>.</p><p><strong>الفكرة المستعملة:</strong> نعوض <span class="math">u_k</span> بعبارته الصريحة. يظهر مجموع ثابت وعدد حدوده <span class="math">n+1</span>، ومجموع هندسي أساسه <span class="math">3/5</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">S<sub>n</sub>=Σ<sub>k=0</sub><sup>n</sup>u<sub>k</sub>=Σ<sub>k=0</sub><sup>n</sup>[4-2(3/5)<sup>k</sup>]</p><p class="math-equation">S<sub>n</sub>=4(n+1)-2Σ<sub>k=0</sub><sup>n</sup>(3/5)<sup>k</sup></p><p>وعدد حدود المجموع الهندسي هو <span class="math">n+1</span>، لذلك:</p><p class="math-equation">Σ<sub>k=0</sub><sup>n</sup>(3/5)<sup>k</sup>=(1-(3/5)<sup>n+1</sup>)/(1-3/5)</p><p>إذن:</p><p class="math-equation">S<sub>n</sub>=4(n+1)-2(1-(3/5)<sup>n+1</sup>)/(2/5)</p><p class="math-equation">S<sub>n</sub>=4n+4-5(1-(3/5)<sup>n+1</sup>)</p><p><strong>النتيجة:</strong></p><p class="math-equation">S<sub>n</sub>=5(3/5)<sup>n+1</sup>+4n-1</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> حسبنا الحدود الأولى للتخمين، ثم أثبتنا الحصر بالتراجع والرتابة بالفرق. بعد ذلك طرحنا العدد الثابت <span class="math">4</span> للحصول على متتالية هندسية، ومن عبارتها الصريحة حسبنا النهاية والمجموع.</p>
</div>`,
    conceptHints: [
      { title: "الحصر بالتراجع", hint: "ابدأ من <span class='math'>u<sub>0</sub></span>، ثم افترض أن <span class='math'>u<sub>n</sub></span> بين 2 و4. استعمل أن العلاقة التآلفية متزايدة لتحصر <span class='math'>u<sub>n+1</sub></span> بين صورتي الطرفين." },
      { title: "رتابة المتتالية", hint: "احسب <span class='math'>u<sub>n+1</sub>-u<sub>n</sub></span> ثم استعمل الحصر السابق، خصوصا أن <span class='math'>u<sub>n</sub></span> أصغر من 4." },
      { title: "المتتالية المساعدة", hint: "ابحث عن العدد الثابت للعلاقة، أي العدد الذي يبقى كما هو بعد تطبيق العلاقة. هنا طرح هذا العدد يجعل العلاقة هندسية." },
      { title: "حساب المجموع", hint: "بعد إيجاد <span class='math'>u<sub>n</sub></span>، اجمع الثابت 4 على <span class='math'>n+1</span> حد، ثم اجمع الحد الهندسي باستعمال صيغة مجموع هندسي." }
    ]
  },  {
    id: "bac-2025-management-subject-2",
    branch: "management",
    year: "2025",
    title: "بكالوريا 2025 - تسيير واقتصاد - الموضوع الثاني",
    figureHtml: `<figure class="bac-figure" aria-label="تمثيل بياني تقريبي لمنحنى الدالة f والمماس T">
      <svg class="bac-graph" viewBox="0 0 420 320" role="img">
        <rect x="0" y="0" width="420" height="320" rx="10" class="graph-bg"></rect>
        <g stroke="rgba(220,245,255,.16)" stroke-width="1">
          <line x1="56" y1="260" x2="364" y2="260"></line>
          <line x1="56" y1="208" x2="364" y2="208"></line>
          <line x1="56" y1="156" x2="364" y2="156"></line>
          <line x1="56" y1="104" x2="364" y2="104"></line>
          <line x1="56" y1="52" x2="364" y2="52"></line>
          <line x1="56" y1="260" x2="56" y2="52"></line>
          <line x1="108" y1="260" x2="108" y2="52"></line>
          <line x1="160" y1="260" x2="160" y2="52"></line>
          <line x1="212" y1="260" x2="212" y2="52"></line>
          <line x1="264" y1="260" x2="264" y2="52"></line>
          <line x1="316" y1="260" x2="316" y2="52"></line>
          <line x1="364" y1="260" x2="364" y2="52"></line>
        </g>
        <line x1="48" y1="156" x2="372" y2="156" stroke="#e8f8fb" stroke-width="2"></line>
        <line x1="160" y1="272" x2="160" y2="40" stroke="#e8f8fb" stroke-width="2"></line>
        <line x1="56" y1="52" x2="316" y2="260" stroke="#f6c85f" stroke-width="3" fill="none"></line>
        <path d="M96 42 C116 118, 139 151, 160 156 C188 163, 214 193, 238 186 C272 176, 300 104, 318 38" stroke="#22d3c5" stroke-width="4" fill="none" stroke-linecap="round"></path>
        <g fill="#f7fbff" stroke="#071112" stroke-width="2">
          <circle cx="160" cy="156" r="4"></circle>
          <circle cx="246" cy="156" r="4"></circle>
          <circle cx="212" cy="186" r="4"></circle>
        </g>
        <text x="164" y="176" class="graph-label">0</text>
        <text x="248" y="176" class="graph-label">α</text>
        <text x="218" y="202" class="graph-label">-7/12</text>
        <text x="72" y="70" class="graph-label">T</text>
        <text x="300" y="58" class="graph-label">C_f</text>
      </svg>
      <figcaption>رسم تقريبي للمنحنى <span class="math">C_f</span> والمماس <span class="math">T</span> عند مبدأ المعلم، مع الجذرين <span class="math">0</span> و<span class="math">α</span>.</figcaption>
    </figure>`,
    statementHtml: `<div class="bac-statement">
      <p>الدالة <span class="math">f</span> معرفة على <span class="math">ℝ</span>، تمثيلها البياني <span class="math">C_f</span> يقطع حامل محور الفواصل في نقطتين فاصلتاهما <span class="math">0</span> و<span class="math">α</span>، و<span class="math">T</span> مماس <span class="math">C_f</span> عند مبدأ المعلم.</p>
      <ol>
        <li>بقراءة بيانية:
          <ol type="أ">
            <li>حدد إشارة كل من <span class="math">f(x)</span> و<span class="math">f'(x)</span> على <span class="math">ℝ</span>.</li>
            <li>شكل جدول تغيرات الدالة <span class="math">f</span>.</li>
            <li>جد <span class="math">f'(0)</span> ثم اكتب معادلة المماس <span class="math">T</span>.</li>
          </ol>
        </li>
        <li>نقبل أن:</li>
      </ol>
      <p class="math-equation">f(x)=1/12(3x<sup>4</sup>-4x<sup>3</sup>+6x<sup>2</sup>-12x)</p>
      <ol type="أ">
        <li>بين أن <span class="math">1.6&lt;α&lt;1.7</span>.</li>
        <li>احسب <span class="math">f'(x)</span> ثم تحقق من إجابة السؤال <span class="math">1-ج</span>.</li>
      </ol>
      <p>تعتبر المتتالية العددية <span class="math">(u<sub>n</sub>)</span> المعرفة على <span class="math">ℕ</span> بـ:</p>
      <p class="math-equation">u<sub>0</sub>=1, &nbsp; u<sub>n+1</sub>=(2/5)u<sub>n</sub>+1</p>
      <ol start="3">
        <li>المتتالية العددية <span class="math">(v<sub>n</sub>)</span> المعرفة على <span class="math">ℕ</span> بـ: <span class="math">v<sub>n</sub>=u<sub>n</sub>-5/3</span>.
          <ol type="أ">
            <li>بين أن <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">2/5</span>، ثم اكتب <span class="math">v<sub>n</sub></span> بدلالة <span class="math">n</span>.</li>
            <li>استنتج كتابة <span class="math">u<sub>n</sub></span> بدلالة <span class="math">n</span>، ثم احسب <span class="math">lim u<sub>n</sub></span>.</li>
          </ol>
        </li>
        <li>نضع من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">S<sub>n</sub>=u<sub>0</sub>+u<sub>1</sub>+...+u<sub>n</sub></span>. بين أن:</li>
      </ol>
      <p class="math-equation">S<sub>n</sub>=4/9(2/5)<sup>n</sup>+(5/3)n+5/9</p>
    </div>`,
    quickSolution: `<p><strong>1)</strong> <span class="math">f&gt;0</span> على <span class="math">]-∞,0[∪]α,+∞[</span> و<span class="math">f&lt;0</span> على <span class="math">]0,α[</span>. <span class="math">f'</span> سالبة على <span class="math">]-∞,1[</span> وموجبة على <span class="math">]1,+∞[</span>. <span class="math">f'(0)=-1</span> و<span class="math">T:y=-x</span>.</p><p><strong>2)</strong> <span class="math">1.6&lt;α&lt;1.7</span>، و<span class="math">f'(x)=x<sup>3</sup>-x<sup>2</sup>+x-1=(x-1)(x<sup>2</sup>+1)</span>.</p><p><strong>3)</strong> <span class="math">v<sub>n</sub>=-2/3(2/5)<sup>n</sup></span>، <span class="math">u<sub>n</sub>=5/3-2/3(2/5)<sup>n</sup></span>، و<span class="math">lim u<sub>n</sub>=5/3</span>.</p><p><strong>4)</strong> <span class="math">S<sub>n</sub>=4/9(2/5)<sup>n</sup>+(5/3)n+5/9</span>.</p>`,
    solution: `<p><strong>1)</strong> من الرسم: <span class="math">f(x)</span> موجبة قبل <span class="math">0</span> وبعد <span class="math">α</span>، وسالبة بينهما. كما أن المنحنى يتناقص إلى غاية <span class="math">x=1</span> ثم يتزايد، لذلك <span class="math">f'(x)&lt;0</span> على <span class="math">]-∞,1[</span> و<span class="math">f'(x)&gt;0</span> على <span class="math">]1,+∞[</span>. من المماس عند الأصل نجد ميله <span class="math">-1</span>، إذن <span class="math">f'(0)=-1</span> و<span class="math">T:y=-x</span>.</p><p><strong>2-أ)</strong> نحسب:</p><p class="math-equation">f(1.6)=1/12(3(1.6)<sup>4</sup>-4(1.6)<sup>3</sup>+6(1.6)<sup>2</sup>-12(1.6))&lt;0</p><p class="math-equation">f(1.7)=1/12(3(1.7)<sup>4</sup>-4(1.7)<sup>3</sup>+6(1.7)<sup>2</sup>-12(1.7))&gt;0</p><p>وبما أن <span class="math">f</span> متزايدة بعد <span class="math">1</span> وتقطع المحور في <span class="math">α</span>، فإن <span class="math">1.6&lt;α&lt;1.7</span>.</p><p><strong>2-ب)</strong></p><p class="math-equation">f'(x)=1/12(12x<sup>3</sup>-12x<sup>2</sup>+12x-12)=x<sup>3</sup>-x<sup>2</sup>+x-1</p><p class="math-equation">f'(x)=(x-1)(x<sup>2</sup>+1)</p><p>وبما أن <span class="math">x<sup>2</sup>+1&gt;0</span>، فإن إشارة <span class="math">f'</span> هي إشارة <span class="math">x-1</span>. كما أن <span class="math">f'(0)=-1</span>، فيكون المماس عند الأصل <span class="math">y=-x</span>.</p><p><strong>3-أ)</strong> بما أن <span class="math">v_n=u_n-5/3</span>، فإن:</p><p class="math-equation">v<sub>n+1</sub>=u<sub>n+1</sub>-5/3=(2/5)u<sub>n</sub>+1-5/3=(2/5)(u<sub>n</sub>-5/3)=(2/5)v<sub>n</sub></p><p>إذن <span class="math">(v_n)</span> هندسية أساسها <span class="math">2/5</span>، و<span class="math">v_0=1-5/3=-2/3</span>، ومنه:</p><p class="math-equation">v<sub>n</sub>=-2/3(2/5)<sup>n</sup></p><p><strong>3-ب)</strong></p><p class="math-equation">u<sub>n</sub>=v<sub>n</sub>+5/3=5/3-2/3(2/5)<sup>n</sup></p><p>وبما أن <span class="math">(2/5)^n→0</span>، فإن <span class="math">lim u_n=5/3</span>.</p><p><strong>4)</strong></p><p class="math-equation">S<sub>n</sub>=Σ<sub>k=0</sub><sup>n</sup>[5/3-2/3(2/5)<sup>k</sup>]</p><p class="math-equation">S<sub>n</sub>=(5/3)(n+1)-(2/3)(1-(2/5)<sup>n+1</sup>)/(1-2/5)</p><p class="math-equation">S<sub>n</sub>=(5/3)(n+1)-(10/9)(1-(2/5)<sup>n+1</sup>)</p><p>ومنه بعد التبسيط:</p><p class="math-equation">S<sub>n</sub>=4/9(2/5)<sup>n</sup>+(5/3)n+5/9</p>`,
    detailedSolution: `<div class="detailed-solution">
<p><strong>1) ما المطلوب؟</strong> نستخرج من الرسم إشارة الدالة ومشتقتها وجدول التغيرات ومماس الأصل.</p><p><strong>الفكرة المستعملة:</strong> إشارة <span class="math">f</span> تقرأ من موضع المنحنى بالنسبة لمحور الفواصل، وإشارة <span class="math">f'</span> تقرأ من اتجاه المنحنى: تناقص يعني مشتقة سالبة وتزايد يعني مشتقة موجبة.</p><p><strong>التطبيق:</strong> المنحنى يقطع محور الفواصل في <span class="math">0</span> و<span class="math">α</span>. لذلك <span class="math">f(x)&gt;0</span> على <span class="math">]-∞,0[∪]α,+∞[</span> و<span class="math">f(x)&lt;0</span> على <span class="math">]0,α[</span>. كما يظهر أن المنحنى يتناقص إلى غاية <span class="math">x=1</span> حيث يأخذ القيمة <span class="math">-7/12</span>، ثم يتزايد. إذن جدول التغيرات: من <span class="math">+∞</span> يتناقص إلى <span class="math">-7/12</span> ثم يتزايد إلى <span class="math">+∞</span>.</p><p>المماس <span class="math">T</span> يمر بالأصل وميله من الرسم <span class="math">-1</span>، إذن <span class="math">f'(0)=-1</span> ومعادلته:</p><p class="math-equation">T: y=-x</p><p><strong>النتيجة:</strong> القراءة البيانية تعطي إشارة <span class="math">f</span>، وتغيرات <span class="math">f</span>، و<span class="math">f'(0)=-1</span>.</p>
<p><strong>2) ما المطلوب؟</strong> نستعمل العبارة الجبرية لتحديد موضع <span class="math">α</span> والتحقق من المشتقة.</p><p><strong>الفكرة المستعملة:</strong> بما أن <span class="math">α</span> جذر موجب بعد <span class="math">1</span>، يكفي حساب إشارة <span class="math">f(1.6)</span> و<span class="math">f(1.7)</span>. أما المشتقة فنحسبها مباشرة ثم نحللها.</p><p><strong>التطبيق:</strong> بالحساب نجد <span class="math">f(1.6)&lt;0</span> و<span class="math">f(1.7)&gt;0</span>. وبما أن <span class="math">f</span> متزايدة على <span class="math">]1,+∞[</span>، فإن الجذر <span class="math">α</span> محصور بينهما:</p><p class="math-equation">1.6&lt;α&lt;1.7</p><p>نحسب:</p><p class="math-equation">f'(x)=1/12(12x<sup>3</sup>-12x<sup>2</sup>+12x-12)</p><p class="math-equation">f'(x)=x<sup>3</sup>-x<sup>2</sup>+x-1=(x-1)(x<sup>2</sup>+1)</p><p>وبما أن <span class="math">x^2+1&gt;0</span>، فإن إشارة المشتقة هي إشارة <span class="math">x-1</span>، وهذا يوافق جدول التغيرات. كما أن <span class="math">f'(0)=-1</span>، فيوافق المماس <span class="math">y=-x</span>.</p><p><strong>النتيجة:</strong> <span class="math">1.6&lt;α&lt;1.7</span> و<span class="math">f'(x)=(x-1)(x^2+1)</span>.</p>
<p><strong>3) ما المطلوب؟</strong> نحول العلاقة التراجعية للمتتالية <span class="math">u_n</span> إلى متتالية هندسية بواسطة <span class="math">v_n</span>.</p><p><strong>الفكرة المستعملة:</strong> العدد <span class="math">5/3</span> ثابت للعلاقة لأن <span class="math">5/3=(2/5)(5/3)+1</span>. لذلك طرحه يجعل العلاقة هندسية.</p><p><strong>التطبيق:</strong></p><p class="math-equation">v<sub>n+1</sub>=u<sub>n+1</sub>-5/3</p><p class="math-equation">v<sub>n+1</sub>=(2/5)u<sub>n</sub>+1-5/3=(2/5)u<sub>n</sub>-2/3</p><p class="math-equation">v<sub>n+1</sub>=(2/5)(u<sub>n</sub>-5/3)=(2/5)v<sub>n</sub></p><p>إذن <span class="math">(v_n)</span> هندسية أساسها <span class="math">2/5</span>، وحدها الأول:</p><p class="math-equation">v<sub>0</sub>=u<sub>0</sub>-5/3=1-5/3=-2/3</p><p>إذن:</p><p class="math-equation">v<sub>n</sub>=-2/3(2/5)<sup>n</sup></p><p>وبالتالي:</p><p class="math-equation">u<sub>n</sub>=5/3-2/3(2/5)<sup>n</sup></p><p>وبما أن <span class="math">0&lt;2/5&lt;1</span>، فإن <span class="math">(2/5)^n→0</span>.</p><p><strong>النتيجة:</strong> <span class="math">lim u_n=5/3</span>.</p>
<p><strong>4) ما المطلوب؟</strong> نحسب مجموع الحدود <span class="math">S_n</span>.</p><p><strong>الفكرة المستعملة:</strong> نستعمل العبارة الصريحة لـ <span class="math">u_k</span>: يظهر مجموع ثابت وعدد حدوده <span class="math">n+1</span>، ومجموع هندسي أساسه <span class="math">2/5</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">S<sub>n</sub>=Σ<sub>k=0</sub><sup>n</sup>[5/3-2/3(2/5)<sup>k</sup>]</p><p class="math-equation">S<sub>n</sub>=(5/3)(n+1)-(2/3)Σ<sub>k=0</sub><sup>n</sup>(2/5)<sup>k</sup></p><p class="math-equation">Σ<sub>k=0</sub><sup>n</sup>(2/5)<sup>k</sup>=(1-(2/5)<sup>n+1</sup>)/(1-2/5)</p><p>إذن:</p><p class="math-equation">S<sub>n</sub>=(5/3)(n+1)-(10/9)(1-(2/5)<sup>n+1</sup>)</p><p>وبالتبسيط:</p><p class="math-equation">S<sub>n</sub>=5n/3+5/9+(10/9)(2/5)<sup>n+1</sup></p><p>ولأن <span class="math">(10/9)(2/5)<sup>n+1</sup>=(4/9)(2/5)<sup>n</sup></span> نحصل على:</p><p class="math-equation">S<sub>n</sub>=4/9(2/5)<sup>n</sup>+(5/3)n+5/9</p><p class="pedagogy-summary"><strong>خلاصة المسار:</strong> بدأنا بقراءة الرسم لاستخراج الإشارات والتغيرات، ثم تحققنا جبريا من المشتقة وموقع الجذر. في المتتالية طرحنا العدد الثابت <span class="math">5/3</span> للحصول على متتالية هندسية، ثم استعملنا العبارة الصريحة لحساب النهاية والمجموع.</p>
</div>`,
    conceptHints: [
      { title: "القراءة البيانية", hint: "إشارة f تقرأ من موضع المنحنى بالنسبة لمحور الفواصل. أما إشارة f' فتقرأ من اتجاه الحركة: تناقص ثم تزايد." },
      { title: "المماس عند الأصل", hint: "ميل المماس عند x=0 هو f'(0). إذا كان المماس يمر بالأصل وميله مقروءا من الرسم، فاكتب معادلته على شكل y=ax." },
      { title: "حصر الجذر", hint: "احسب f(1.6) وf(1.7). إذا تغيرت الإشارة وبينهما دالة متزايدة في ذلك المجال، فإن الجذر يقع بين العددين." },
      { title: "المتتالية المساعدة", hint: "ابحث عن العدد الثابت للعلاقة <span class='math'>u<sub>n+1</sub>=</span>a<span class='math'>u<sub>n</sub>+</span>b. طرح هذا العدد غالبا يحول العلاقة إلى <span class='math'>v<sub>n+1</sub>=</span>a<span class='math'>v<sub>n</sub></span>." },
      { title: "حساب المجموع", hint: "بعد كتابة <span class='math'>u<sub>n</sub></span>، اجمع الحد الثابت على <span class='math'>n+1</span> حدود، ثم استعمل صيغة مجموع هندسي للحد الذي يحتوي <span class='math'>(2/5)<sup>n</sup></span>." }
    ]
  },  {
    id: "bac-2024-management-subject-1",
    branch: "management",
    year: "2024",
    title: "بكالوريا 2024 - تسيير واقتصاد - الموضوع الأول",
    statementHtml: `<div class="bac-statement">
      <p><strong>التمرين: المتتاليات العددية</strong></p>
      <p>المتتالية العددية <span class="math">(u<sub>n</sub>)</span> المعرفة بـ:</p>
      <p class="math-equation">u<sub>0</sub>=0, &nbsp; u<sub>n+1</sub>=(5/6)u<sub>n</sub>-1/3</p>
      <ol>
        <li>احسب <span class="math">u<sub>1</sub></span> و<span class="math">u<sub>2</sub></span>.</li>
        <li>
          <ol type="أ">
            <li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">-2&lt;u<sub>n</sub>≤0</span>.</li>
            <li>بين أن المتتالية <span class="math">(u<sub>n</sub>)</span> متناقصة تماما.</li>
          </ol>
        </li>
        <li>المتتالية العددية <span class="math">(v<sub>n</sub>)</span> المعرفة على <span class="math">ℕ</span> بـ: <span class="math">v<sub>n</sub>=u<sub>n</sub>+2</span>.
          <ol type="أ">
            <li>بين أن المتتالية <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">5/6</span>.</li>
            <li>اكتب <span class="math">v<sub>n</sub></span> بدلالة <span class="math">n</span>، ثم بين أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n</sub>=2(5/6)<sup>n</sup>-2</span>.</li>
            <li>احسب <span class="math">lim u<sub>n</sub></span>.</li>
          </ol>
        </li>
        <li>نضع من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">S<sub>n</sub>=v<sub>0</sub>+v<sub>1</sub>+...+v<sub>n</sub></span> و<span class="math">T<sub>n</sub>=u<sub>0</sub>+u<sub>1</sub>+...+u<sub>n</sub></span>.</li>
      </ol>
      <p>احسب <span class="math">S<sub>n</sub></span> بدلالة <span class="math">n</span> ثم استنتج <span class="math">T<sub>n</sub></span> بدلالة <span class="math">n</span>.</p>
    </div>`,
    quickSolution: `<p><strong>1)</strong> <span class="math">u<sub>1</sub>=-1/3</span>، <span class="math">u<sub>2</sub>=-11/18</span>.</p><p><strong>2)</strong> لكل <span class="math">n</span>: <span class="math">-2&lt;u<sub>n</sub>≤0</span>، و<span class="math">u<sub>n+1</sub>-u<sub>n</sub>=-(u<sub>n</sub>+2)/6&lt;0</span>، إذن <span class="math">(u<sub>n</sub>)</span> متناقصة تماما.</p><p><strong>3)</strong> <span class="math">v<sub>n</sub>=2(5/6)<sup>n</sup></span>، و<span class="math">u<sub>n</sub>=2(5/6)<sup>n</sup>-2</span>، و<span class="math">lim u<sub>n</sub>=-2</span>.</p><p><strong>4)</strong> <span class="math">S<sub>n</sub>=12(1-(5/6)<sup>n+1</sup>)</span>، و<span class="math">T<sub>n</sub>=10-2n-12(5/6)<sup>n+1</sup></span>.</p>`,
    solution: `<p><strong>1)</strong></p><p class="math-equation">u<sub>1</sub>=(5/6)×0-1/3=-1/3</p><p class="math-equation">u<sub>2</sub>=(5/6)(-1/3)-1/3=-5/18-6/18=-11/18</p><p><strong>2-أ)</strong> نبرهن بالتراجع. عند <span class="math">n=0</span>: <span class="math">-2&lt;0≤0</span>. نفرض <span class="math">-2&lt;u_n≤0</span>. بما أن العلاقة التآلفية متزايدة:</p><p class="math-equation">(5/6)(-2)-1/3 &lt; u<sub>n+1</sub> ≤ (5/6)×0-1/3</p><p>أي:</p><p class="math-equation">-2 &lt; u<sub>n+1</sub> ≤ -1/3 ≤ 0</p><p>إذن <span class="math">-2&lt;u_n≤0</span> لكل <span class="math">n</span>.</p><p><strong>2-ب)</strong></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=(5/6)u<sub>n</sub>-1/3-u<sub>n</sub>=-(u<sub>n</sub>+2)/6</p><p>وبما أن <span class="math">u_n&gt;-2</span>، فإن <span class="math">u_n+2&gt;0</span>، وبالتالي <span class="math">u_{n+1}-u_n&lt;0</span>. إذن <span class="math">(u_n)</span> متناقصة تماما.</p><p><strong>3-أ)</strong> بما أن <span class="math">v_n=u_n+2</span>، فإن:</p><p class="math-equation">v<sub>n+1</sub>=u<sub>n+1</sub>+2=(5/6)u<sub>n</sub>-1/3+2=(5/6)(u<sub>n</sub>+2)=(5/6)v<sub>n</sub></p><p>إذن <span class="math">(v_n)</span> هندسية أساسها <span class="math">5/6</span>.</p><p><strong>3-ب)</strong> لدينا <span class="math">v_0=u_0+2=2</span>، ومنه:</p><p class="math-equation">v<sub>n</sub>=2(5/6)<sup>n</sup></p><p>وبالتالي:</p><p class="math-equation">u<sub>n</sub>=v<sub>n</sub>-2=2(5/6)<sup>n</sup>-2</p><p><strong>3-ج)</strong> بما أن <span class="math">0&lt;5/6&lt;1</span>، فإن <span class="math">(5/6)^n→0</span>، ومنه:</p><p class="math-equation">lim u<sub>n</sub>=-2</p><p><strong>4)</strong> بما أن <span class="math">(v_n)</span> هندسية:</p><p class="math-equation">S<sub>n</sub>=2(1-(5/6)<sup>n+1</sup>)/(1-5/6)=12(1-(5/6)<sup>n+1</sup>)</p><p>ومن <span class="math">u_k=v_k-2</span> نحصل على:</p><p class="math-equation">T<sub>n</sub>=S<sub>n</sub>-2(n+1)</p><p class="math-equation">T<sub>n</sub>=12(1-(5/6)<sup>n+1</sup>)-2n-2</p><p>إذن:</p><p class="math-equation">T<sub>n</sub>=10-2n-12(5/6)<sup>n+1</sup></p>`,
    detailedSolution: `<div class="detailed-solution">
<p><strong>1) ما المطلوب؟</strong> نحسب أول حدين بعد <span class="math">u_0</span> باستعمال العلاقة التراجعية مباشرة.</p><p><strong>الفكرة المستعملة:</strong> نعوض <span class="math">u_0=0</span> في العلاقة للحصول على <span class="math">u_1</span>، ثم نعوض <span class="math">u_1</span> للحصول على <span class="math">u_2</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">u<sub>1</sub>=(5/6)×0-1/3=-1/3</p><p class="math-equation">u<sub>2</sub>=(5/6)(-1/3)-1/3=-5/18-6/18=-11/18</p><p><strong>النتيجة:</strong> <span class="math">u_1=-1/3</span> و<span class="math">u_2=-11/18</span>.</p>
<p><strong>2) ما المطلوب؟</strong> نثبت الحصر <span class="math">-2&lt;u_n≤0</span> ثم ندرس الرتابة.</p><p><strong>الفكرة المستعملة:</strong> الحصر يثبت بالتراجع باستعمال تزايد الدالة التآلفية <span class="math">x↦(5/6)x-1/3</span>. أما الرتابة فنستعمل الفرق <span class="math">u_{n+1}-u_n</span>.</p><p><strong>التطبيق:</strong> عند <span class="math">n=0</span> لدينا <span class="math">u_0=0</span>، ومنه <span class="math">-2&lt;u_0≤0</span>. نفرض <span class="math">-2&lt;u_n≤0</span>. بما أن معامل <span class="math">x</span> هو <span class="math">5/6&gt;0</span>، فإن الدالة التآلفية متزايدة، لذلك:</p><p class="math-equation">(5/6)(-2)-1/3 &lt; u<sub>n+1</sub> ≤ (5/6)×0-1/3</p><p class="math-equation">-2 &lt; u<sub>n+1</sub> ≤ -1/3 ≤ 0</p><p>إذن ينتقل الحصر من الرتبة <span class="math">n</span> إلى الرتبة <span class="math">n+1</span>.</p><p>وللرتابة:</p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=(5/6)u<sub>n</sub>-1/3-u<sub>n</sub></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=-(u<sub>n</sub>+2)/6</p><p>ومن الحصر <span class="math">u_n&gt;-2</span>، إذن <span class="math">u_n+2&gt;0</span>، وبالتالي الفرق سالب.</p><p><strong>النتيجة:</strong> <span class="math">-2&lt;u_n≤0</span> لكل <span class="math">n</span>، والمتتالية متناقصة تماما.</p>
<p><strong>3) ما المطلوب؟</strong> نستعمل المتتالية المساعدة <span class="math">v_n=u_n+2</span> للحصول على متتالية هندسية.</p><p><strong>الفكرة المستعملة:</strong> العدد <span class="math">-2</span> هو العدد الثابت للعلاقة، لذلك إضافة <span class="math">2</span> إلى <span class="math">u_n</span> تزيل الحد الثابت في العلاقة.</p><p><strong>التطبيق:</strong></p><p class="math-equation">v<sub>n+1</sub>=u<sub>n+1</sub>+2</p><p class="math-equation">v<sub>n+1</sub>=(5/6)u<sub>n</sub>-1/3+2=(5/6)u<sub>n</sub>+5/3</p><p class="math-equation">v<sub>n+1</sub>=(5/6)(u<sub>n</sub>+2)=(5/6)v<sub>n</sub></p><p>إذن <span class="math">(v_n)</span> هندسية أساسها <span class="math">5/6</span>. كما أن:</p><p class="math-equation">v<sub>0</sub>=u<sub>0</sub>+2=2</p><p>ومنه:</p><p class="math-equation">v<sub>n</sub>=2(5/6)<sup>n</sup></p><p>وبالرجوع إلى <span class="math">u_n</span>:</p><p class="math-equation">u<sub>n</sub>=v<sub>n</sub>-2=2(5/6)<sup>n</sup>-2</p><p>وبما أن <span class="math">0&lt;5/6&lt;1</span> فإن <span class="math">(5/6)^n→0</span>.</p><p><strong>النتيجة:</strong> <span class="math">lim u_n=-2</span>.</p>
<p><strong>4) ما المطلوب؟</strong> نحسب مجموع <span class="math">v_k</span> ثم نستنتج مجموع <span class="math">u_k</span>.</p><p><strong>الفكرة المستعملة:</strong> <span class="math">S_n</span> مجموع هندسي من <span class="math">v_0</span> إلى <span class="math">v_n</span> وعدد حدوده <span class="math">n+1</span>. ولأن <span class="math">u_k=v_k-2</span>، فإن <span class="math">T_n=S_n-2(n+1)</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">S<sub>n</sub>=2[1-(5/6)<sup>n+1</sup>]/(1-5/6)</p><p class="math-equation">S<sub>n</sub>=12(1-(5/6)<sup>n+1</sup>)</p><p>ثم:</p><p class="math-equation">T<sub>n</sub>=S<sub>n</sub>-2(n+1)</p><p class="math-equation">T<sub>n</sub>=12(1-(5/6)<sup>n+1</sup>)-2n-2</p><p><strong>النتيجة:</strong></p><p class="math-equation">T<sub>n</sub>=10-2n-12(5/6)<sup>n+1</sup></p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> بدأنا بحساب الحدود الأولى، ثم أثبتنا الحصر بالتراجع والرتابة بالفرق. بعد ذلك استعملنا <span class="math">v_n=u_n+2</span> لتحويل العلاقة إلى هندسية، ثم حسبنا النهاية والمجموعين باستعمال صيغة مجموع هندسي.</p>
</div>`,
    conceptHints: [
      { title: "الحصر بالتراجع", hint: "ابدأ من <span class='math'>u<sub>0</sub>=0</span>، ثم افترض أن <span class='math'>u<sub>n</sub></span> بين -2 و0. استعمل تزايد الدالة x↦<span class='math'>(5/6)x-1/3</span> لحصر <span class='math'>u<sub>n+1</sub></span>." },
      { title: "رتابة المتتالية", hint: "احسب <span class='math'>u<sub>n+1</sub>-u<sub>n</sub></span> وحاول إخراج العامل <span class='math'>u<sub>n</sub>+2</span>. الحصر السابق يعطي إشارة هذا العامل." },
      { title: "المتتالية المساعدة", hint: "العلاقة لها عدد ثابت هو -2. لذلك إضافة 2 إلى <span class='math'>u<sub>n</sub></span> تجعل الحد الثابت يختفي وتظهر علاقة هندسية." },
      { title: "حساب المجموع", hint: "احسب <span class='math'>S<sub>n</sub></span> كمجموع هندسي أولا. ثم استعمل <span class='math'>u<sub>k</sub>=v<sub>k</sub>-2</span> للحصول على <span class='math'>T<sub>n</sub></span> بطرح 2 بعدد الحدود <span class='math'>n+1</span>." }
    ]
  },  {
    id: "bac-2024-management-subject-2",
    branch: "management",
    year: "2024",
    title: "بكالوريا 2024 - تسيير واقتصاد - الموضوع الثاني",
    statementHtml: `<div class="bac-statement">
      <p><strong>التمرين: المتتاليات العددية</strong></p>
      <p>المتتالية العددية <span class="math">(u<sub>n</sub>)</span> المعرفة بـ:</p>
      <p class="math-equation">u<sub>0</sub>=4, &nbsp; u<sub>n+1</sub>=(3/4)u<sub>n</sub>-1/2</p>
      <ol>
        <li>احسب <span class="math">u<sub>1</sub></span> و<span class="math">u<sub>2</sub></span>.</li>
        <li>
          <ol type="أ">
            <li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n</sub>&gt;-2</span>.</li>
            <li>أثبت أن المتتالية <span class="math">(u<sub>n</sub>)</span> متناقصة تماما.</li>
          </ol>
        </li>
        <li>المتتالية العددية <span class="math">(v<sub>n</sub>)</span> المعرفة على <span class="math">ℕ</span> بـ: <span class="math">v<sub>n</sub>=u<sub>n</sub>+2</span>.
          <ol type="أ">
            <li>بين أن المتتالية <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">3/4</span>.</li>
            <li>اكتب <span class="math">v<sub>n</sub></span> بدلالة <span class="math">n</span>، ثم بين أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n</sub>=6(3/4)<sup>n</sup>-2</span>.</li>
            <li>احسب <span class="math">lim u<sub>n</sub></span>.</li>
          </ol>
        </li>
        <li>احسب بدلالة <span class="math">n</span> كلا من المجموعين <span class="math">S<sub>n</sub></span> و<span class="math">T<sub>n</sub></span> حيث:</li>
      </ol>
      <p class="math-equation">S<sub>n</sub>=v<sub>0</sub>+v<sub>1</sub>+...+v<sub>n</sub></p>
      <p class="math-equation">T<sub>n</sub>=1/(2+u<sub>0</sub>)+1/(2+u<sub>1</sub>)+...+1/(2+u<sub>n</sub>)</p>
    </div>`,
    quickSolution: `<p><strong>1)</strong> <span class="math">u<sub>1</sub>=5/2</span>، <span class="math">u<sub>2</sub>=11/8</span>.</p><p><strong>2)</strong> لكل <span class="math">n</span>: <span class="math">u<sub>n</sub>&gt;-2</span>، و<span class="math">u<sub>n+1</sub>-u<sub>n</sub>=-(u<sub>n</sub>+2)/4&lt;0</span>، إذن <span class="math">(u<sub>n</sub>)</span> متناقصة تماما.</p><p><strong>3)</strong> <span class="math">v<sub>n</sub>=6(3/4)<sup>n</sup></span>، و<span class="math">u<sub>n</sub>=6(3/4)<sup>n</sup>-2</span>، و<span class="math">lim u<sub>n</sub>=-2</span>.</p><p><strong>4)</strong> <span class="math">S<sub>n</sub>=24(1-(3/4)<sup>n+1</sup>)</span>، و<span class="math">T<sub>n</sub>=(1/2)((4/3)<sup>n+1</sup>-1)</span>.</p>`,
    solution: `<p><strong>1)</strong></p><p class="math-equation">u<sub>1</sub>=(3/4)×4-1/2=5/2</p><p class="math-equation">u<sub>2</sub>=(3/4)(5/2)-1/2=15/8-4/8=11/8</p><p><strong>2-أ)</strong> نبرهن بالتراجع. عند <span class="math">n=0</span>: <span class="math">u_0=4&gt;-2</span>. نفرض <span class="math">u_n&gt;-2</span>. عندئذ:</p><p class="math-equation">u<sub>n+1</sub>=(3/4)u<sub>n</sub>-1/2 &gt; (3/4)(-2)-1/2=-2</p><p>إذن <span class="math">u_n&gt;-2</span> لكل <span class="math">n</span>.</p><p><strong>2-ب)</strong></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=(3/4)u<sub>n</sub>-1/2-u<sub>n</sub>=-(u<sub>n</sub>+2)/4</p><p>وبما أن <span class="math">u_n&gt;-2</span>، فإن <span class="math">u_n+2&gt;0</span>، ومنه <span class="math">u_{n+1}-u_n&lt;0</span>. إذن <span class="math">(u_n)</span> متناقصة تماما.</p><p><strong>3-أ)</strong> بما أن <span class="math">v_n=u_n+2</span>:</p><p class="math-equation">v<sub>n+1</sub>=u<sub>n+1</sub>+2=(3/4)u<sub>n</sub>-1/2+2=(3/4)(u<sub>n</sub>+2)=(3/4)v<sub>n</sub></p><p>إذن <span class="math">(v_n)</span> هندسية أساسها <span class="math">3/4</span>.</p><p><strong>3-ب)</strong> لدينا <span class="math">v_0=u_0+2=6</span>، ومنه:</p><p class="math-equation">v<sub>n</sub>=6(3/4)<sup>n</sup></p><p>وبالتالي:</p><p class="math-equation">u<sub>n</sub>=v<sub>n</sub>-2=6(3/4)<sup>n</sup>-2</p><p><strong>3-ج)</strong> بما أن <span class="math">0&lt;3/4&lt;1</span>، فإن <span class="math">(3/4)^n→0</span>، ومنه <span class="math">lim u_n=-2</span>.</p><p><strong>4)</strong> بما أن <span class="math">(v_n)</span> هندسية:</p><p class="math-equation">S<sub>n</sub>=6(1-(3/4)<sup>n+1</sup>)/(1-3/4)=24(1-(3/4)<sup>n+1</sup>)</p><p>كما أن <span class="math">2+u_k=v_k=6(3/4)^k</span>، إذن:</p><p class="math-equation">1/(2+u<sub>k</sub>)=1/v<sub>k</sub>=(1/6)(4/3)<sup>k</sup></p><p>وبالتالي:</p><p class="math-equation">T<sub>n</sub>=(1/6)Σ<sub>k=0</sub><sup>n</sup>(4/3)<sup>k</sup></p><p class="math-equation">T<sub>n</sub>=(1/6)((4/3)<sup>n+1</sup>-1)/(4/3-1)=(1/2)((4/3)<sup>n+1</sup>-1)</p>`,
    detailedSolution: `<div class="detailed-solution">
<p><strong>1) ما المطلوب؟</strong> نحسب <span class="math">u_1</span> و<span class="math">u_2</span> من العلاقة التراجعية.</p><p><strong>الفكرة المستعملة:</strong> نعوض أولا <span class="math">u_0=4</span> ثم نستعمل النتيجة لحساب الحد التالي.</p><p><strong>التطبيق:</strong></p><p class="math-equation">u<sub>1</sub>=(3/4)×4-1/2=3-1/2=5/2</p><p class="math-equation">u<sub>2</sub>=(3/4)(5/2)-1/2=15/8-4/8=11/8</p><p><strong>النتيجة:</strong> <span class="math">u_1=5/2</span> و<span class="math">u_2=11/8</span>.</p>
<p><strong>2) ما المطلوب؟</strong> نثبت أن الحدود تبقى أكبر من <span class="math">-2</span> ثم نثبت التناقص.</p><p><strong>الفكرة المستعملة:</strong> الحصر يثبت بالتراجع. والرتابة تثبت بحساب الفرق <span class="math">u_{n+1}-u_n</span>.</p><p><strong>التطبيق:</strong> عند <span class="math">n=0</span> لدينا <span class="math">u_0=4&gt;-2</span>. نفرض <span class="math">u_n&gt;-2</span>. بما أن معامل <span class="math">u_n</span> موجب، نحصل على:</p><p class="math-equation">u<sub>n+1</sub>=(3/4)u<sub>n</sub>-1/2 &gt; (3/4)(-2)-1/2=-2</p><p>إذن الخاصية تنتقل إلى الرتبة التالية.</p><p>نحسب الفرق:</p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=(3/4)u<sub>n</sub>-1/2-u<sub>n</sub></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=-(u<sub>n</sub>+2)/4</p><p>وبما أن <span class="math">u_n&gt;-2</span>، فإن <span class="math">u_n+2&gt;0</span>، ومنه الفرق سالب.</p><p><strong>النتيجة:</strong> <span class="math">u_n&gt;-2</span> لكل <span class="math">n</span>، والمتتالية متناقصة تماما.</p>
<p><strong>3) ما المطلوب؟</strong> نحول المتتالية إلى هندسية باستعمال <span class="math">v_n=u_n+2</span>.</p><p><strong>الفكرة المستعملة:</strong> العدد <span class="math">-2</span> هو العدد الثابت للعلاقة، لذلك إضافة <span class="math">2</span> تجعل العلاقة من الشكل <span class="math">v_{n+1}=qv_n</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">v<sub>n+1</sub>=u<sub>n+1</sub>+2</p><p class="math-equation">v<sub>n+1</sub>=(3/4)u<sub>n</sub>-1/2+2=(3/4)u<sub>n</sub>+3/2</p><p class="math-equation">v<sub>n+1</sub>=(3/4)(u<sub>n</sub>+2)=(3/4)v<sub>n</sub></p><p>إذن <span class="math">(v_n)</span> هندسية أساسها <span class="math">3/4</span>. كما أن:</p><p class="math-equation">v<sub>0</sub>=u<sub>0</sub>+2=6</p><p>إذن:</p><p class="math-equation">v<sub>n</sub>=6(3/4)<sup>n</sup></p><p>ومن <span class="math">u_n=v_n-2</span>:</p><p class="math-equation">u<sub>n</sub>=6(3/4)<sup>n</sup>-2</p><p>وبما أن <span class="math">0&lt;3/4&lt;1</span>، فإن <span class="math">(3/4)^n→0</span>.</p><p><strong>النتيجة:</strong> <span class="math">lim u_n=-2</span>.</p>
<p><strong>4) ما المطلوب؟</strong> نحسب مجموع حدود <span class="math">v_n</span> ومجموع مقلوبات <span class="math">2+u_n</span>.</p><p><strong>الفكرة المستعملة:</strong> <span class="math">S_n</span> مجموع هندسي مباشر. أما <span class="math">T_n</span> فنستعمل <span class="math">2+u_k=v_k</span>، فتتحول حدوده إلى <span class="math">1/v_k</span> وهي هندسية أيضا.</p><p><strong>التطبيق:</strong></p><p class="math-equation">S<sub>n</sub>=6[1-(3/4)<sup>n+1</sup>]/(1-3/4)</p><p class="math-equation">S<sub>n</sub>=24(1-(3/4)<sup>n+1</sup>)</p><p>وللمجموع الثاني:</p><p class="math-equation">2+u<sub>k</sub>=v<sub>k</sub>=6(3/4)<sup>k</sup></p><p class="math-equation">1/(2+u<sub>k</sub>)=(1/6)(4/3)<sup>k</sup></p><p>إذن:</p><p class="math-equation">T<sub>n</sub>=(1/6)[(4/3)<sup>n+1</sup>-1]/(4/3-1)</p><p><strong>النتيجة:</strong></p><p class="math-equation">T<sub>n</sub>=(1/2)((4/3)<sup>n+1</sup>-1)</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> حسبنا الحدود الأولى، ثم أثبتنا الحصر بالتراجع والتناقص بالفرق. بعد ذلك استعملنا <span class="math">v_n=u_n+2</span> للحصول على متتالية هندسية، ثم حسبنا المجموعين: الأول مباشر، والثاني باستعمال <span class="math">2+u_k=v_k</span>.</p>
</div>`,
    conceptHints: [
      { title: "الحصر بالتراجع", hint: "تحقق من <span class='math'>u<sub>0</sub></span> أولا، ثم افترض <span class='math'>u<sub>n</sub></span>>-2. عوض الحد الأدنى -2 في العلاقة لأن معامل <span class='math'>u<sub>n</sub></span> موجب." },
      { title: "رتابة المتتالية", hint: "احسب <span class='math'>u<sub>n+1</sub>-u<sub>n</sub></span> وحاول كتابته بدلالة <span class='math'>u<sub>n</sub>+2</span>. الحصر السابق يعطي إشارة الفرق مباشرة." },
      { title: "المتتالية المساعدة", hint: "لاحظ أن -2 عدد ثابت للعلاقة. لذلك وضع <span class='math'>v<sub>n</sub>=u<sub>n</sub>+2</span> يجعل العلاقة خالية من الحد الثابت." },
      { title: "مجموع المقلوبات", hint: "في <span class='math'>T<sub>n</sub></span> لا تجمع <span class='math'>1/(2+u<sub>k</sub>)</span> مباشرة. استعمل أن <span class='math'>2+u<sub>k</sub>=v<sub>k</sub></span> ثم عوض <span class='math'>v<sub>k</sub></span> بعبارته الهندسية." }
    ]
  },  {
    id: "bac-2023-management-subject-1",
    branch: "management",
    year: "2023",
    title: "بكالوريا 2023 - تسيير واقتصاد - الموضوع الأول",
    statementHtml: `<div class="bac-statement">
      <p><strong>التمرين: المتتاليات العددية</strong></p>
      <p>المتتالية العددية <span class="math">(u<sub>n</sub>)</span> المعرفة بـ:</p>
      <p class="math-equation">u<sub>0</sub>=2, &nbsp; u<sub>n+1</sub>=(3/5)u<sub>n</sub>-6/5</p>
      <ol>
        <li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n</sub>&gt;-3</span>.</li>
        <li>بين أن المتتالية <span class="math">(u<sub>n</sub>)</span> متناقصة تماما، ثم استنتج أنها متقاربة.</li>
        <li>المتتالية العددية <span class="math">(v<sub>n</sub>)</span> المعرفة على <span class="math">ℕ</span> بـ: <span class="math">v<sub>n</sub>=u<sub>n</sub>+3</span>.
          <ol type="أ">
            <li>بين أن المتتالية <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">3/5</span>، ثم عين حدها الأول <span class="math">v<sub>0</sub></span>.</li>
            <li>عين عبارة الحد العام <span class="math">v<sub>n</sub></span> بدلالة <span class="math">n</span>، ثم استنتج أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n</sub>=5(3/5)<sup>n</sup>-3</span>.</li>
            <li>احسب <span class="math">lim u<sub>n</sub></span>.</li>
          </ol>
        </li>
        <li>نضع من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">S<sub>n</sub>=v<sub>0</sub>+v<sub>1</sub>+...+v<sub>n</sub></span> و<span class="math">T<sub>n</sub>=u<sub>0</sub>+u<sub>1</sub>+...+u<sub>n</sub></span>.</li>
      </ol>
      <p>احسب <span class="math">S<sub>n</sub></span> بدلالة <span class="math">n</span>، ثم بين أنه من أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math-equation">T<sub>n</sub>=19/2-3n-(15/2)(3/5)<sup>n</sup></p>
    </div>`,
    quickSolution: `<p><strong>1)</strong> لكل <span class="math">n</span>: <span class="math">u<sub>n</sub>&gt;-3</span>.</p><p><strong>2)</strong> <span class="math">u<sub>n+1</sub>-u<sub>n</sub>=-(2/5)(u<sub>n</sub>+3)&lt;0</span>، إذن <span class="math">(u<sub>n</sub>)</span> متناقصة تماما ومتقاربة.</p><p><strong>3)</strong> <span class="math">v<sub>0</sub>=5</span>، <span class="math">v<sub>n</sub>=5(3/5)<sup>n</sup></span>، <span class="math">u<sub>n</sub>=5(3/5)<sup>n</sup>-3</span>، و<span class="math">lim u<sub>n</sub>=-3</span>.</p><p><strong>4)</strong> <span class="math">S<sub>n</sub>=(25/2)(1-(3/5)<sup>n+1</sup>)</span>، و<span class="math">T<sub>n</sub>=19/2-3n-(15/2)(3/5)<sup>n</sup></span>.</p>`,
    solution: `<p><strong>1)</strong> نبرهن بالتراجع. عند <span class="math">n=0</span>: <span class="math">u_0=2&gt;-3</span>. نفرض <span class="math">u_n&gt;-3</span>. عندئذ:</p><p class="math-equation">u<sub>n+1</sub>=(3/5)u<sub>n</sub>-6/5 &gt; (3/5)(-3)-6/5=-3</p><p>إذن <span class="math">u_n&gt;-3</span> لكل <span class="math">n</span>.</p><p><strong>2)</strong></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=(3/5)u<sub>n</sub>-6/5-u<sub>n</sub>=-(2/5)(u<sub>n</sub>+3)</p><p>وبما أن <span class="math">u_n&gt;-3</span>، فإن <span class="math">u_n+3&gt;0</span>، ومنه <span class="math">u_{n+1}-u_n&lt;0</span>. إذن المتتالية متناقصة تماما. كما أنها محدودة من الأسفل بـ <span class="math">-3</span>، فهي متقاربة.</p><p><strong>3-أ)</strong> بما أن <span class="math">v_n=u_n+3</span>، فإن:</p><p class="math-equation">v<sub>n+1</sub>=u<sub>n+1</sub>+3=(3/5)u<sub>n</sub>-6/5+3=(3/5)(u<sub>n</sub>+3)=(3/5)v<sub>n</sub></p><p>إذن <span class="math">(v_n)</span> هندسية أساسها <span class="math">3/5</span>، وحدها الأول <span class="math">v_0=u_0+3=5</span>.</p><p><strong>3-ب)</strong></p><p class="math-equation">v<sub>n</sub>=5(3/5)<sup>n</sup></p><p>ومنه:</p><p class="math-equation">u<sub>n</sub>=v<sub>n</sub>-3=5(3/5)<sup>n</sup>-3</p><p><strong>3-ج)</strong> بما أن <span class="math">0&lt;3/5&lt;1</span>، فإن <span class="math">(3/5)^n→0</span>، وبالتالي <span class="math">lim u_n=-3</span>.</p><p><strong>4)</strong></p><p class="math-equation">S<sub>n</sub>=5(1-(3/5)<sup>n+1</sup>)/(1-3/5)=(25/2)(1-(3/5)<sup>n+1</sup>)</p><p>وبما أن <span class="math">u_k=v_k-3</span>، فإن:</p><p class="math-equation">T<sub>n</sub>=S<sub>n</sub>-3(n+1)</p><p class="math-equation">T<sub>n</sub>=(25/2)(1-(3/5)<sup>n+1</sup>)-3n-3</p><p>ومنه:</p><p class="math-equation">T<sub>n</sub>=19/2-3n-(15/2)(3/5)<sup>n</sup></p>`,
    detailedSolution: `<div class="detailed-solution">
<p><strong>1) ما المطلوب؟</strong> نثبت أن كل حدود المتتالية أكبر من <span class="math">-3</span>.</p><p><strong>الفكرة المستعملة:</strong> نستعمل البرهان بالتراجع، لأن العلاقة تعطي <span class="math">u_{n+1}</span> انطلاقا من <span class="math">u_n</span>.</p><p><strong>التطبيق:</strong> عند <span class="math">n=0</span> لدينا <span class="math">u_0=2&gt;-3</span>. نفرض أن <span class="math">u_n&gt;-3</span>. بما أن معامل <span class="math">u_n</span> موجب، فإن:</p><p class="math-equation">u<sub>n+1</sub>=(3/5)u<sub>n</sub>-6/5 &gt; (3/5)(-3)-6/5</p><p class="math-equation">u<sub>n+1</sub>&gt;-9/5-6/5=-3</p><p><strong>النتيجة:</strong> <span class="math">u_n&gt;-3</span> لكل <span class="math">n∈ℕ</span>.</p>
<p><strong>2) ما المطلوب؟</strong> نثبت أن المتتالية متناقصة ثم نستنتج التقارب.</p><p><strong>الفكرة المستعملة:</strong> الرتابة تثبت بحساب الفرق <span class="math">u_{n+1}-u_n</span>، والتقارب ينتج عن التناقص مع وجود حد سفلي.</p><p><strong>التطبيق:</strong></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=(3/5)u<sub>n</sub>-6/5-u<sub>n</sub></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=-(2/5)u<sub>n</sub>-6/5=-(2/5)(u<sub>n</sub>+3)</p><p>ومن السؤال الأول <span class="math">u_n+3&gt;0</span>، لذلك <span class="math">u_{n+1}-u_n&lt;0</span>.</p><p><strong>النتيجة:</strong> <span class="math">(u_n)</span> متناقصة تماما، وهي محدودة من الأسفل بـ <span class="math">-3</span>، إذن متقاربة.</p>
<p><strong>3) ما المطلوب؟</strong> نستعمل <span class="math">v_n=u_n+3</span> لتحويل العلاقة إلى متتالية هندسية.</p><p><strong>الفكرة المستعملة:</strong> العدد <span class="math">-3</span> هو العدد الثابت للعلاقة، لذلك إضافة <span class="math">3</span> إلى <span class="math">u_n</span> تلغي الحد الثابت.</p><p><strong>التطبيق:</strong></p><p class="math-equation">v<sub>n+1</sub>=u<sub>n+1</sub>+3</p><p class="math-equation">v<sub>n+1</sub>=(3/5)u<sub>n</sub>-6/5+3=(3/5)u<sub>n</sub>+9/5</p><p class="math-equation">v<sub>n+1</sub>=(3/5)(u<sub>n</sub>+3)=(3/5)v<sub>n</sub></p><p>إذن <span class="math">(v_n)</span> هندسية أساسها <span class="math">3/5</span>. وحدها الأول:</p><p class="math-equation">v<sub>0</sub>=u<sub>0</sub>+3=5</p><p>إذن:</p><p class="math-equation">v<sub>n</sub>=5(3/5)<sup>n</sup></p><p>ومنه:</p><p class="math-equation">u<sub>n</sub>=v<sub>n</sub>-3=5(3/5)<sup>n</sup>-3</p><p>وبما أن <span class="math">0&lt;3/5&lt;1</span> فإن <span class="math">(3/5)^n→0</span>.</p><p><strong>النتيجة:</strong> <span class="math">lim u_n=-3</span>.</p>
<p><strong>4) ما المطلوب؟</strong> نحسب مجموع حدود <span class="math">v_n</span> ثم نستنتج مجموع حدود <span class="math">u_n</span>.</p><p><strong>الفكرة المستعملة:</strong> <span class="math">S_n</span> مجموع هندسي. ولأن <span class="math">u_k=v_k-3</span>، فإن <span class="math">T_n=S_n-3(n+1)</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">S<sub>n</sub>=5[1-(3/5)<sup>n+1</sup>]/(1-3/5)</p><p class="math-equation">S<sub>n</sub>=(25/2)(1-(3/5)<sup>n+1</sup>)</p><p>ثم:</p><p class="math-equation">T<sub>n</sub>=S<sub>n</sub>-3(n+1)</p><p class="math-equation">T<sub>n</sub>=(25/2)(1-(3/5)<sup>n+1</sup>)-3n-3</p><p>وبما أن <span class="math">(25/2)(3/5)<sup>n+1</span> = <span class="math">(15/2)(3/5)^n</span>، نحصل على:</p><p class="math-equation">T<sub>n</sub>=19/2-3n-(15/2)(3/5)<sup>n</sup></p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> أثبتنا أولا الحصر بالتراجع، ثم استعملناه لتحديد إشارة الفرق وإثبات التناقص والتقارب. بعد ذلك حولنا العلاقة إلى متتالية هندسية بواسطة <span class="math">v_n=u_n+3</span>، ومنها حسبنا النهاية والمجموعين.</p>
</div>`,
    conceptHints: [
      { title: "الحصر بالتراجع", hint: "ابدأ من <span class='math'>u<sub>0</sub></span>، ثم افترض أن <span class='math'>u<sub>n</sub></span> أكبر من -3. عوض الحد الأدنى -3 في العلاقة لأن معامل <span class='math'>u<sub>n</sub></span> موجب." },
      { title: "رتابة المتتالية", hint: "احسب <span class='math'>u<sub>n+1</sub>-u<sub>n</sub></span> وحاول إخراج العامل <span class='math'>u<sub>n</sub>+3</span>. الحصر السابق يعطي إشارة هذا العامل." },
      { title: "المتتالية المساعدة", hint: "العدد الثابت للعلاقة هو -3. لذلك وضع <span class='math'>v<sub>n</sub>=u<sub>n</sub>+3</span> يحول العلاقة إلى <span class='math'>v<sub>n+1</sub>=qv<sub>n</sub></span>." },
      { title: "حساب المجموع", hint: "احسب <span class='math'>S<sub>n</sub></span> أولا لأنه مجموع هندسي. ثم استعمل <span class='math'>u<sub>k</sub>=v<sub>k</sub>-3</span> للحصول على <span class='math'>T<sub>n</sub></span> بطرح 3 بعدد الحدود <span class='math'>n+1</span>." }
    ]
  },  {
    id: "bac-2023-management-subject-2",
    branch: "management",
    year: "2023",
    title: "بكالوريا 2023 - تسيير واقتصاد - الموضوع الثاني",
    statementHtml: `<div class="bac-statement">
      <p><strong>التمرين: المتتاليات العددية</strong></p>
      <p>المتتالية العددية <span class="math">(u<sub>n</sub>)</span> المعرفة بـ:</p>
      <p class="math-equation">u<sub>0</sub>=2, &nbsp; u<sub>n+1</sub>=(1/4)u<sub>n</sub>+3</p>
      <ol>
        <li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n</sub>&lt;4</span>.</li>
        <li>بين أن المتتالية <span class="math">(u<sub>n</sub>)</span> متزايدة تماما، ثم استنتج أنها متقاربة.</li>
        <li>المتتالية العددية <span class="math">(v<sub>n</sub>)</span> المعرفة على <span class="math">ℕ</span> بـ: <span class="math">v<sub>n</sub>=u<sub>n</sub>-4</span>.
          <ol type="أ">
            <li>بين أن المتتالية <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">1/4</span>، ثم عين حدها الأول <span class="math">v<sub>0</sub></span>.</li>
            <li>عين عبارة الحد العام <span class="math">v<sub>n</sub></span> بدلالة <span class="math">n</span>، ثم استنتج أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n</sub>=-2(1/4)<sup>n</sup>+4</span>.</li>
            <li>احسب <span class="math">lim u<sub>n</sub></span>.</li>
          </ol>
        </li>
        <li>نضع من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">S<sub>n</sub>=v<sub>0</sub>+v<sub>1</sub>+...+v<sub>n</sub></span> و<span class="math">T<sub>n</sub>=u<sub>0</sub>+u<sub>1</sub>+...+u<sub>n</sub></span>.</li>
      </ol>
      <p>احسب <span class="math">S<sub>n</sub></span> بدلالة <span class="math">n</span>، ثم بين أنه من أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math-equation">T<sub>n</sub>=4n+4/3+(2/3)(1/4)<sup>n</sup></p>
    </div>`,
    quickSolution: `<p><strong>1)</strong> لكل <span class="math">n</span>: <span class="math">u<sub>n</sub>&lt;4</span>.</p><p><strong>2)</strong> <span class="math">u<sub>n+1</sub>-u<sub>n</sub>=(3/4)(4-u<sub>n</sub>)&gt;0</span>، إذن <span class="math">(u<sub>n</sub>)</span> متزايدة تماما ومتقاربة.</p><p><strong>3)</strong> <span class="math">v<sub>0</sub>=-2</span>، <span class="math">v<sub>n</sub>=-2(1/4)<sup>n</sup></span>، <span class="math">u<sub>n</sub>=4-2(1/4)<sup>n</sup></span>، و<span class="math">lim u<sub>n</sub>=4</span>.</p><p><strong>4)</strong> <span class="math">S<sub>n</sub>=-(8/3)(1-(1/4)<sup>n+1</sup>)</span>، و<span class="math">T<sub>n</sub>=4n+4/3+(2/3)(1/4)<sup>n</sup></span>.</p>`,
    solution: `<p><strong>1)</strong> نبرهن بالتراجع. عند <span class="math">n=0</span>: <span class="math">u_0=2&lt;4</span>. نفرض <span class="math">u_n&lt;4</span>. عندئذ:</p><p class="math-equation">u<sub>n+1</sub>=(1/4)u<sub>n</sub>+3 &lt; (1/4)×4+3=4</p><p>إذن <span class="math">u_n&lt;4</span> لكل <span class="math">n</span>.</p><p><strong>2)</strong></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=(1/4)u<sub>n</sub>+3-u<sub>n</sub>=(3/4)(4-u<sub>n</sub>)</p><p>وبما أن <span class="math">u_n&lt;4</span>، فإن <span class="math">4-u_n&gt;0</span>، ومنه <span class="math">u_{n+1}-u_n&gt;0</span>. إذن المتتالية متزايدة تماما. كما أنها محدودة من الأعلى بـ <span class="math">4</span>، فهي متقاربة.</p><p><strong>3-أ)</strong> بما أن <span class="math">v_n=u_n-4</span>، فإن:</p><p class="math-equation">v<sub>n+1</sub>=u<sub>n+1</sub>-4=(1/4)u<sub>n</sub>+3-4=(1/4)(u<sub>n</sub>-4)=(1/4)v<sub>n</sub></p><p>إذن <span class="math">(v_n)</span> هندسية أساسها <span class="math">1/4</span>، وحدها الأول <span class="math">v_0=u_0-4=-2</span>.</p><p><strong>3-ب)</strong></p><p class="math-equation">v<sub>n</sub>=-2(1/4)<sup>n</sup></p><p>ومنه:</p><p class="math-equation">u<sub>n</sub>=v<sub>n</sub>+4=4-2(1/4)<sup>n</sup></p><p><strong>3-ج)</strong> بما أن <span class="math">0&lt;1/4&lt;1</span>، فإن <span class="math">(1/4)^n→0</span>، وبالتالي <span class="math">lim u_n=4</span>.</p><p><strong>4)</strong></p><p class="math-equation">S<sub>n</sub>=-2(1-(1/4)<sup>n+1</sup>)/(1-1/4)=-(8/3)(1-(1/4)<sup>n+1</sup>)</p><p>وبما أن <span class="math">u_k=v_k+4</span>، فإن:</p><p class="math-equation">T<sub>n</sub>=S<sub>n</sub>+4(n+1)</p><p class="math-equation">T<sub>n</sub>=-(8/3)(1-(1/4)<sup>n+1</sup>)+4n+4</p><p>ومنه:</p><p class="math-equation">T<sub>n</sub>=4n+4/3+(2/3)(1/4)<sup>n</sup></p>`,
    detailedSolution: `<div class="detailed-solution">
<p><strong>1) ما المطلوب؟</strong> نثبت أن كل حدود المتتالية أصغر من <span class="math">4</span>.</p><p><strong>الفكرة المستعملة:</strong> نستعمل البرهان بالتراجع لأن العلاقة تعطي الحد التالي انطلاقا من الحد الحالي.</p><p><strong>التطبيق:</strong> عند <span class="math">n=0</span> لدينا <span class="math">u_0=2&lt;4</span>. نفرض أن <span class="math">u_n&lt;4</span>. بما أن معامل <span class="math">u_n</span> موجب:</p><p class="math-equation">u<sub>n+1</sub>=(1/4)u<sub>n</sub>+3 &lt; (1/4)×4+3=4</p><p><strong>النتيجة:</strong> <span class="math">u_n&lt;4</span> لكل <span class="math">n∈ℕ</span>.</p>
<p><strong>2) ما المطلوب؟</strong> نثبت التزايد ثم نستنتج التقارب.</p><p><strong>الفكرة المستعملة:</strong> نحسب الفرق <span class="math">u_{n+1}-u_n</span> ونستعمل الحصر السابق لتحديد إشارته.</p><p><strong>التطبيق:</strong></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=(1/4)u<sub>n</sub>+3-u<sub>n</sub></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=3-(3/4)u<sub>n</sub>=(3/4)(4-u<sub>n</sub>)</p><p>ومن السؤال الأول <span class="math">4-u_n&gt;0</span>، لذلك الفرق موجب.</p><p><strong>النتيجة:</strong> <span class="math">(u_n)</span> متزايدة تماما، ومحدودة من الأعلى بـ <span class="math">4</span>، إذن متقاربة.</p>
<p><strong>3) ما المطلوب؟</strong> نستعمل <span class="math">v_n=u_n-4</span> لتحويل العلاقة إلى متتالية هندسية.</p><p><strong>الفكرة المستعملة:</strong> العدد <span class="math">4</span> هو العدد الثابت للعلاقة، لذلك طرحه من <span class="math">u_n</span> يلغي الحد الثابت.</p><p><strong>التطبيق:</strong></p><p class="math-equation">v<sub>n+1</sub>=u<sub>n+1</sub>-4</p><p class="math-equation">v<sub>n+1</sub>=(1/4)u<sub>n</sub>+3-4=(1/4)u<sub>n</sub>-1</p><p class="math-equation">v<sub>n+1</sub>=(1/4)(u<sub>n</sub>-4)=(1/4)v<sub>n</sub></p><p>إذن <span class="math">(v_n)</span> هندسية أساسها <span class="math">1/4</span>. وحدها الأول:</p><p class="math-equation">v<sub>0</sub>=u<sub>0</sub>-4=2-4=-2</p><p>إذن:</p><p class="math-equation">v<sub>n</sub>=-2(1/4)<sup>n</sup></p><p>ومنه:</p><p class="math-equation">u<sub>n</sub>=v<sub>n</sub>+4=4-2(1/4)<sup>n</sup></p><p>وبما أن <span class="math">0&lt;1/4&lt;1</span> فإن <span class="math">(1/4)^n→0</span>.</p><p><strong>النتيجة:</strong> <span class="math">lim u_n=4</span>.</p>
<p><strong>4) ما المطلوب؟</strong> نحسب مجموع حدود <span class="math">v_n</span> ثم نستنتج مجموع حدود <span class="math">u_n</span>.</p><p><strong>الفكرة المستعملة:</strong> <span class="math">S_n</span> مجموع هندسي. ولأن <span class="math">u_k=v_k+4</span>، فإن <span class="math">T_n=S_n+4(n+1)</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">S<sub>n</sub>=-2[1-(1/4)<sup>n+1</sup>]/(1-1/4)</p><p class="math-equation">S<sub>n</sub>=-(8/3)(1-(1/4)<sup>n+1</sup>)</p><p>ثم:</p><p class="math-equation">T<sub>n</sub>=S<sub>n</sub>+4(n+1)</p><p class="math-equation">T<sub>n</sub>=-(8/3)(1-(1/4)<sup>n+1</sup>)+4n+4</p><p>وبما أن <span class="math">(8/3)(1/4)<sup>n+1</sup>=(2/3)(1/4)<sup>n</sup></span>، نحصل على:</p><p class="math-equation">T<sub>n</sub>=4n+4/3+(2/3)(1/4)<sup>n</sup></p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> أثبتنا أولا الحصر بالتراجع، ثم استعملناه لإثبات التزايد والتقارب. بعد ذلك طرحنا العدد الثابت <span class="math">4</span> للحصول على متتالية هندسية، ومنها حسبنا النهاية والمجموعين.</p>
</div>`,
    conceptHints: [
      { title: "الحصر بالتراجع", hint: "ابدأ من <span class='math'>u<sub>0</sub></span>، ثم افترض أن <span class='math'>u<sub>n</sub></span> أصغر من 4. عوض الحد الأعلى 4 في العلاقة لأن معامل <span class='math'>u<sub>n</sub></span> موجب." },
      { title: "رتابة المتتالية", hint: "احسب <span class='math'>u<sub>n+1</sub>-u<sub>n</sub></span> وحاول إخراج العامل <span class='math'>4-u<sub>n</sub></span>. الحصر السابق يعطي إشارة هذا العامل." },
      { title: "المتتالية المساعدة", hint: "العدد الثابت للعلاقة هو 4. لذلك وضع <span class='math'>v<sub>n</sub>=u<sub>n</sub>-4</span> يحول العلاقة إلى <span class='math'>v<sub>n+1</sub>=qv<sub>n</sub></span>." },
      { title: "حساب المجموع", hint: "احسب <span class='math'>S<sub>n</sub></span> أولا لأنه مجموع هندسي. ثم استعمل <span class='math'>u<sub>k</sub>=v<sub>k</sub>+4</span> للحصول على <span class='math'>T<sub>n</sub></span> بإضافة 4 بعدد الحدود <span class='math'>n+1</span>." }
    ]
  },  {
    id: "bac-2022-management-subject-1",
    branch: "management",
    year: "2022",
    title: "بكالوريا 2022 - تسيير واقتصاد - الموضوع الأول",
    statementHtml: `<div class="bac-statement">
      <p><strong>التمرين: متتاليات حسابية وهندسية</strong></p>
      <p>المتتالية الحسابية <span class="math">(u<sub>n</sub>)</span> المعرفة على <span class="math">ℕ</span> وأساسها <span class="math">r</span> حيث:</p>
      <p class="math-equation">u<sub>2</sub>+u<sub>3</sub>+u<sub>4</sub>=21, &nbsp; u<sub>4</sub>+u<sub>5</sub>=20</p>
      <ol>
        <li>
          <ol type="أ">
            <li>بين أن <span class="math">u<sub>3</sub>=7</span> و<span class="math">r=2</span>، ثم استنتج قيمة <span class="math">u<sub>0</sub></span>.</li>
            <li>اكتب <span class="math">u<sub>n</sub></span> بدلالة <span class="math">n</span>.</li>
            <li>احسب، بدلالة <span class="math">n</span>، المجموع <span class="math">S<sub>n</sub></span> حيث <span class="math">S<sub>n</sub>=u<sub>0</sub>+u<sub>1</sub>+...+u<sub>n-1</sub></span>.</li>
          </ol>
        </li>
        <li>المتتالية العددية <span class="math">(v<sub>n</sub>)</span> المعرفة على <span class="math">ℕ</span> بـ: <span class="math">v<sub>n</sub>=3×2<sup>2n</sup></span>.
          <ol type="أ">
            <li>بين أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">v<sub>n+1</sub>/v<sub>n</sub>=4</span>، ثم استنتج طبيعة المتتالية <span class="math">(v<sub>n</sub>)</span>.</li>
            <li>احسب، بدلالة <span class="math">n</span>، المجموع <span class="math">S'<sub>n</sub></span> حيث <span class="math">S'<sub>n</sub>=v<sub>0</sub>+v<sub>1</sub>+...+v<sub>n-1</sub></span>.</li>
          </ol>
        </li>
        <li>نضع من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">w<sub>n</sub>=(2/3)v<sub>n</sub></span>.
          <ol type="أ">
            <li>تحقق أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">w<sub>n</sub>=2<sup>u<sub>n</sub></sup></span>.</li>
            <li>احسب <span class="math">p<sub>n</sub></span> حيث <span class="math">p<sub>n</sub>=w<sub>0</sub>×w<sub>1</sub>×...×w<sub>n-1</sub></span>.</li>
          </ol>
        </li>
      </ol>
    </div>`,
    quickSolution: `<p><strong>1)</strong> <span class="math">u<sub>3</sub>=7</span>، <span class="math">r=2</span>، <span class="math">u<sub>0</sub>=1</span>، <span class="math">u<sub>n</sub>=2n+1</span>، و<span class="math">S<sub>n</sub>=n<sup>2</sup></span>.</p><p><strong>2)</strong> <span class="math">v<sub>n+1</sub>/v<sub>n</sub>=4</span>، إذن <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">4</span>، و<span class="math">S'<sub>n</sub>=4<sup>n</sup>-1</span>.</p><p><strong>3)</strong> <span class="math">w<sub>n</sub>=2<sup>u<sub>n</sub></sup></span>، و<span class="math">p<sub>n</sub>=2<sup>n<sup>2</sup></sup></span>.</p>`,
    solution: `<p><strong>1-أ)</strong> بما أن <span class="math">(u_n)</span> حسابية، فإن <span class="math">u_2+u_4=2u_3</span>، ومنه:</p><p class="math-equation">u<sub>2</sub>+u<sub>3</sub>+u<sub>4</sub>=3u<sub>3</sub>=21</p><p>إذن <span class="math">u<sub>3</sub>=7</span>. ومنه <span class="math">u<sub>4</sub>=7+r</span> و<span class="math">u<sub>5</sub>=7+2r</span>. وبما أن <span class="math">u<sub>4</sub>+u<sub>5</sub>=20</span>:</p><p class="math-equation">14+3r=20</p><p>إذن <span class="math">r=2</span>. وبما أن <span class="math">u_3=u_0+3r</span>، فإن <span class="math">u_0=7-6=1</span>.</p><p><strong>1-ب)</strong></p><p class="math-equation">u<sub>n</sub>=u<sub>0</sub>+nr=1+2n</p><p><strong>1-ج)</strong></p><p class="math-equation">S<sub>n</sub>=u<sub>0</sub>+u<sub>1</sub>+...+u<sub>n-1</sub></p><p>عدد الحدود هو <span class="math">n</span>، والحد الأخير <span class="math">u<sub>n-1</sub>=2n-1</span>، إذن:</p><p class="math-equation">S<sub>n</sub>=n(u<sub>0</sub>+u<sub>n-1</sub>)/2=n(1+2n-1)/2=n<sup>2</sup></p><p><strong>2-أ)</strong></p><p class="math-equation">v<sub>n+1</sub>/v<sub>n</sub> = [3×2<sup>2n+2</sup>]/[3×2<sup>2n</sup>] = 2<sup>2</sup>=4</p><p>إذن <span class="math">(v_n)</span> هندسية أساسها <span class="math">4</span> وحدها الأول <span class="math">v_0=3</span>.</p><p><strong>2-ب)</strong></p><p class="math-equation">S'<sub>n</sub>=3(1-4<sup>n</sup>)/(1-4)=4<sup>n</sup>-1</p><p><strong>3-أ)</strong></p><p class="math-equation">w<sub>n</sub>=(2/3)v<sub>n</sub>=(2/3)×3×2<sup>2n</sup>=2<sup>2n+1</sup></p><p>وبما أن <span class="math">u_n=2n+1</span>، فإن:</p><p class="math-equation">w<sub>n</sub>=2<sup>u<sub>n</sub></sup></p><p><strong>3-ب)</strong></p><p class="math-equation">p<sub>n</sub>=w<sub>0</sub>w<sub>1</sub>...w<sub>n-1</sub>=2<sup>u<sub>0</sub></sup>×2<sup>u<sub>1</sub></sup>×...×2<sup>u<sub>n-1</sub></sup></p><p class="math-equation">p<sub>n</sub>=2<sup>u<sub>0</sub>+u<sub>1</sub>+...+u<sub>n-1</sub></sup>=2<sup>S<sub>n</sub></sup>=2<sup>n<sup>2</sup></sup></p>`,
    detailedSolution: `<div class="detailed-solution">
<p><strong>1) ما المطلوب؟</strong> نستخرج أساس المتتالية الحسابية وحدها الأول ثم نكتب حدها العام ومجموع أول <span class="math">n</span> حدود.</p><p><strong>الفكرة المستعملة:</strong> في المتتالية الحسابية يكون الحد الأوسط متوسطا حسابيا للحدين المتناظرين حوله، لذلك <span class="math">u_2+u_4=2u_3</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">u<sub>2</sub>+u<sub>3</sub>+u<sub>4</sub>=(u<sub>2</sub>+u<sub>4</sub>)+u<sub>3</sub>=2u<sub>3</sub>+u<sub>3</sub>=3u<sub>3</sub></p><p>وبما أن هذا المجموع يساوي <span class="math">21</span>، فإن:</p><p class="math-equation">3u<sub>3</sub>=21</p><p>إذن <span class="math">u_3=7</span>. كما أن:</p><p class="math-equation">u<sub>4</sub>=u<sub>3</sub>+r=7+r, &nbsp; u<sub>5</sub>=u<sub>3</sub>+2r=7+2r</p><p>ومن <span class="math">u_4+u_5=20</span>:</p><p class="math-equation">14+3r=20</p><p>إذن <span class="math">r=2</span>. وبما أن <span class="math">u_3=u_0+3r</span> نحصل على:</p><p class="math-equation">u<sub>0</sub>=7-6=1</p><p>وبالتالي:</p><p class="math-equation">u<sub>n</sub>=u<sub>0</sub>+nr=1+2n</p><p>لحساب <span class="math">S_n</span> نلاحظ أن عدد الحدود من <span class="math">u_0</span> إلى <span class="math">u_{n-1}</span> هو <span class="math">n</span>، وآخرها <span class="math">u_{n-1}=2n-1</span>:</p><p class="math-equation">S<sub>n</sub>=n(u<sub>0</sub>+u<sub>n-1</sub>)/2=n(1+2n-1)/2=n<sup>2</sup></p><p><strong>النتيجة:</strong> <span class="math">u_n=2n+1</span> و<span class="math">S_n=n^2</span>.</p>
<p><strong>2) ما المطلوب؟</strong> نحدد طبيعة <span class="math">(v_n)</span> ثم نحسب مجموع حدودها من <span class="math">v_0</span> إلى <span class="math">v_{n-1}</span>.</p><p><strong>الفكرة المستعملة:</strong> نحسب النسبة <span class="math">v_{n+1}/v_n</span>. إذا كانت ثابتة، فالمتتالية هندسية.</p><p><strong>التطبيق:</strong></p><p class="math-equation">v<sub>n+1</sub>/v<sub>n</sub> = [3×2<sup>2(n+1)</sup>]/[3×2<sup>2n</sup>]</p><p class="math-equation">v<sub>n+1</sub>/v<sub>n</sub>=2<sup>2</sup>=4</p><p>إذن <span class="math">(v_n)</span> هندسية أساسها <span class="math">4</span> وحدها الأول <span class="math">v_0=3</span>. وعدد حدود <span class="math">S'_n</span> هو <span class="math">n</span>:</p><p class="math-equation">S'<sub>n</sub>=3(1-4<sup>n</sup>)/(1-4)</p><p><strong>النتيجة:</strong></p><p class="math-equation">S'<sub>n</sub>=4<sup>n</sup>-1</p>
<p><strong>3) ما المطلوب؟</strong> نربط <span class="math">w_n</span> بالمتتالية <span class="math">u_n</span>، ثم نحسب الجداء <span class="math">p_n</span>.</p><p><strong>الفكرة المستعملة:</strong> بما أن <span class="math">w_n</span> قوة للعدد <span class="math">2</span>، فإن جداء حدود <span class="math">w_n</span> يتحول إلى جمع للأسس.</p><p><strong>التطبيق:</strong></p><p class="math-equation">w<sub>n</sub>=(2/3)v<sub>n</sub>=(2/3)×3×2<sup>2n</sup>=2<sup>2n+1</sup></p><p>وبما أن <span class="math">u_n=2n+1</span>، إذن:</p><p class="math-equation">w<sub>n</sub>=2<sup>u<sub>n</sub></sup></p><p>وبالتالي:</p><p class="math-equation">p<sub>n</sub>=Π<sub>k=0</sub><sup>n-1</sup>w<sub>k</sub>=Π<sub>k=0</sub><sup>n-1</sup>2<sup>u<sub>k</sub></sup></p><p class="math-equation">p<sub>n</sub>=2<sup>u<sub>0</sub>+u<sub>1</sub>+...+u<sub>n-1</sub></sup>=2<sup>S<sub>n</sub></sup></p><p><strong>النتيجة:</strong></p><p class="math-equation">p<sub>n</sub>=2<sup>n<sup>2</sup></sup></p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> استعملنا خواص المتتالية الحسابية لاستخراج <span class="math">r</span> و<span class="math">u_0</span>، ثم حسبنا مجموع أول <span class="math">n</span> حدود. بعد ذلك أثبتنا أن <span class="math">v_n</span> هندسية، وأخيرا حولنا جداء <span class="math">w_n</span> إلى مجموع أسس للحصول على <span class="math">p_n</span>.</p>
</div>`,
    conceptHints: [
      { title: "المتتالية الحسابية", hint: "استعمل أن <span class='math'>u<sub>3</sub></span> هو الحد الأوسط بين <span class='math'>u<sub>2</sub></span> و<span class='math'>u<sub>4</sub></span>، لذلك <span class='math'>u<sub>2</sub>+u<sub>4</sub>=2u<sub>3</sub></span>. بعدها استعمل <span class='math'>u<sub>4</sub></span> و<span class='math'>u<sub>5</sub></span> بدلالة <span class='math'>u<sub>3</sub></span> وr." },
      { title: "مجموع حسابي", hint: "المجموع <span class='math'>S<sub>n</sub></span> يبدأ من <span class='math'>u<sub>0</sub></span> وينتهي عند <span class='math'>u<sub>n-1</sub></span>، لذلك عدد حدوده n وليس <span class='math'>n+1</span>." },
      { title: "المتتالية الهندسية", hint: "لحساب طبيعة <span class='math'>v<sub>n</sub></span>، احسب النسبة <span class='math'>v<sub>n+1</sub>/v<sub>n</sub></span> واختزل العوامل المشتركة." },
      { title: "جداء قوى", hint: "عند ضرب قوى لها نفس الأساس 2، نجمع الأسس. لذلك يتحول p_n إلى 2 مرفوعة إلى مجموع حدود <span class='math'>u<sub>k</sub></span>." }
    ]
  },
  {
    id: "bac-2022-management-subject-2",
    branch: "management",
    year: "2022",
    title: "بكالوريا 2022 - تسيير واقتصاد - الموضوع الثاني",
    statementHtml: `<div class="bac-statement"><p><strong>التمرين: المتتاليات العددية</strong></p><p class="math-equation">u<sub>0</sub>=-2, &nbsp; u<sub>n+1</sub>=5u<sub>n</sub>+20</p><ol><li><ol type="أ"><li>احسب <span class="math">u<sub>1</sub></span> و<span class="math">u<sub>2</sub></span>.</li><li>تحقق أن <span class="math">u<sub>n+1</sub>+5=5(u<sub>n</sub>+5)</span>.</li></ol></li><li><ol type="أ"><li>برهن بالتراجع أن <span class="math">u<sub>n</sub>&gt;-5</span>.</li><li>ادرس اتجاه تغير <span class="math">(u<sub>n</sub>)</span>.</li></ol></li><li>نعتبر <span class="math">v<sub>n</sub>=u<sub>n</sub>+5</span>. تحقق أن <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">5</span> ثم اكتب <span class="math">v<sub>n</sub></span>.</li><li>احسب <span class="math">S<sub>n</sub>=u<sub>0</sub>+...+u<sub>n</sub></span>.</li></ol></div>`,
    quickSolution: `<p><strong>1)</strong> <span class="math">u_1=10</span> و<span class="math">u_2=70</span>.</p><p><strong>2)</strong> <span class="math">u_n&gt;-5</span> و<span class="math">u_{n+1}-u_n=4(u_n+5)&gt;0</span>، إذن متزايدة تماما.</p><p><strong>3)</strong> <span class="math">v_n=3×5^n</span> و<span class="math">u_n=3×5^n-5</span>.</p><p><strong>4)</strong> <span class="math">S_n=(3/4)(5^{n+1}-1)-5(n+1)</span>.</p>`,
    solution: `<p><strong>1)</strong> <span class="math">u_1=5(-2)+20=10</span> و<span class="math">u_2=5×10+20=70</span>. كما أن <span class="math">u_{n+1}+5=5u_n+25=5(u_n+5)</span>.</p><p><strong>2)</strong> إذا كان <span class="math">u_n&gt;-5</span> فإن <span class="math">u_n+5&gt;0</span> ومنه <span class="math">u_{n+1}+5=5(u_n+5)&gt;0</span>، أي <span class="math">u_{n+1}&gt;-5</span>. كما أن <span class="math">u_{n+1}-u_n=4(u_n+5)&gt;0</span>.</p><p><strong>3)</strong> <span class="math">v_{n+1}=5v_n</span> و<span class="math">v_0=3</span>، إذن <span class="math">v_n=3×5^n</span>.</p><p><strong>4)</strong> <span class="math">u_k=3×5^k-5</span>، لذلك <span class="math">S_n=(3/4)(5^{n+1}-1)-5(n+1)</span>.</p>`,
    detailedSolution: `<div class="detailed-solution"><p><strong>ما المطلوب؟</strong> نحسب الحدود الأولى، ثم نستعمل العلاقة المحولة والمتتالية المساعدة.</p><p><strong>الفكرة المستعملة:</strong> إضافة <span class="math">5</span> إلى الطرفين تظهر العامل <span class="math">u_n+5</span>.</p><p><strong>التطبيق:</strong> <span class="math">u_1=10</span> و<span class="math">u_2=70</span>، و<span class="math">u_{n+1}+5=5(u_n+5)</span>. بالتراجع نحصل على <span class="math">u_n&gt;-5</span>، ومنه <span class="math">u_{n+1}-u_n=4(u_n+5)&gt;0</span>. وبوضع <span class="math">v_n=u_n+5</span> نجد <span class="math">v_n=3×5^n</span>، ثم <span class="math">u_n=3×5^n-5</span>.</p><p class="math-equation">S_n=Σ_{k=0}^{n}(3×5^k-5)=(3/4)(5^{n+1}-1)-5(n+1)</p><p class="pedagogy-summary"><strong>خلاصة المسار:</strong> العلاقة المحولة أعطت الحصر والرتابة، ثم المتتالية الهندسية والمجموع.</p></div>`,
    conceptHints: [
      { title: "إعادة كتابة العلاقة", hint: "أضف 5 إلى الطرفين حتى يظهر u_n+5." },
      { title: "الحصر والرتابة", hint: "استعمل u_{n+1}+5=5(u_n+5)، ثم احسب u_{n+1}-u_n." },
      { title: "المجموع", hint: "استعمل u_n=3×5^n-5 واجمع الحد الهندسي والثابت منفصلين." }
    ]
  },
  {
    id: "bac-2021-management-subject-1",
    branch: "management",
    year: "2021",
    title: "بكالوريا 2021 - تسيير واقتصاد - الموضوع الأول",
    statementHtml: `<div class="bac-statement"><p><strong>التمرين: المتتاليات العددية</strong></p><p class="math-equation">u<sub>n</sub>=2(1/4)<sup>n</sup>+1</p><ol><li><ol type="أ"><li>احسب <span class="math">u<sub>0</sub></span> و<span class="math">u<sub>1</sub></span> و<span class="math">u<sub>2</sub></span>.</li><li>تحقق أن <span class="math">u<sub>n+1</sub>-u<sub>n</sub>=-3/2(1/4)<sup>n</sup></span>.</li><li>استنتج اتجاه تغير <span class="math">(u<sub>n</sub>)</span>.</li></ol></li><li>نضع <span class="math">v<sub>n</sub>=u<sub>n</sub>-1</span>. احسب <span class="math">v<sub>0</sub></span> واكتب <span class="math">v<sub>n</sub></span> ثم بين أنها هندسية أساسها <span class="math">1/4</span>.</li><li>نضع <span class="math">S_n=v_0+...+v_n</span> و<span class="math">S'_n=u_0+...+u_n</span>. احسب <span class="math">S_n</span> ثم استنتج <span class="math">S'_n</span>.</li></ol><p class="math-equation">S'<sub>n</sub>=n+11/3-(8/3)(1/4)<sup>n+1</sup></p></div>`,
    quickSolution: `<p><strong>1)</strong> <span class="math">u_0=3</span>، <span class="math">u_1=3/2</span>، <span class="math">u_2=9/8</span>، والمتتالية متناقصة تماما.</p><p><strong>2)</strong> <span class="math">v_0=2</span> و<span class="math">v_n=2(1/4)^n</span>، وهي هندسية أساسها <span class="math">1/4</span>.</p><p><strong>3)</strong> <span class="math">S_n=(8/3)(1-(1/4)^{n+1})</span> و<span class="math">S'_n=n+11/3-(8/3)(1/4)^{n+1}</span>.</p>`,
    solution: `<p><strong>1)</strong> <span class="math">u_0=3</span>، <span class="math">u_1=3/2</span>، <span class="math">u_2=9/8</span>. كما أن <span class="math">u_{n+1}-u_n=2(1/4)^n(1/4-1)=-3/2(1/4)^n&lt;0</span>، إذن متناقصة.</p><p><strong>2)</strong> <span class="math">v_0=2</span> و<span class="math">v_n=u_n-1=2(1/4)^n</span>، ومنه <span class="math">v_{n+1}=(1/4)v_n</span>.</p><p><strong>3)</strong> <span class="math">S_n=2[1-(1/4)^{n+1}]/(1-1/4)=(8/3)(1-(1/4)^{n+1})</span>. وبما أن <span class="math">u_k=v_k+1</span> فإن <span class="math">S'_n=S_n+n+1=n+11/3-(8/3)(1/4)^{n+1}</span>.</p>`,
    detailedSolution: `<div class="detailed-solution"><p><strong>ما المطلوب؟</strong> نستعمل الحد العام مباشرة لحساب الحدود والرتابة والمجموع.</p><p><strong>الفكرة المستعملة:</strong> طرح <span class="math">1</span> يعزل الحد الهندسي في <span class="math">u_n</span>.</p><p><strong>التطبيق:</strong> <span class="math">u_0=3</span> و<span class="math">u_1=3/2</span> و<span class="math">u_2=9/8</span>، كما أن <span class="math">u_{n+1}-u_n=-3/2(1/4)^n&lt;0</span>. ثم <span class="math">v_n=2(1/4)^n</span>، فهي هندسية أساسها <span class="math">1/4</span>.</p><p class="math-equation">S_n=(8/3)(1-(1/4)^{n+1})</p><p class="math-equation">S'_n=S_n+n+1=n+11/3-(8/3)(1/4)^{n+1}</p><p class="pedagogy-summary"><strong>خلاصة المسار:</strong> الحد العام أعطى الفرق مباشرة، وطرح الثابت أعطى مجموعا هندسيا.</p></div>`,
    conceptHints: [
      { title: "الفرق", hint: "احسب u_{n+1}-u_n وأخرج العامل (1/4)^n." },
      { title: "المتتالية المساعدة", hint: "اطرح 1 من u_n حتى يبقى الحد الهندسي فقط." },
      { title: "المجموع", hint: "احسب مجموع v_n هندسيا، ثم أضف 1 بعدد الحدود n+1." }
    ]
  },  {
    id: "bac-2020-management-subject-1",
    branch: "management",
    year: "2020",
    title: "بكالوريا 2020 - تسيير واقتصاد - الموضوع الأول",
    statementHtml: `<div class="bac-statement">
      <p><strong>التمرين: المتتاليات العددية</strong></p>
      <p>المتتالية العددية <span class="math">(u<sub>n</sub>)</span> معرفة بحدها الأول <span class="math">u<sub>0</sub>=1</span>، ومن أجل كل عدد طبيعي <span class="math">n</span>:</p>
      <p class="math-equation">u<sub>n+1</sub>=(2/3)u<sub>n</sub>+3/2</p>
      <ol>
        <li><ol type="أ"><li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n</sub>&lt;9/2</span>.</li><li>ادرس اتجاه تغير المتتالية <span class="math">(u<sub>n</sub>)</span> واستنتج أنها متقاربة.</li></ol></li>
        <li>نضع من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">v<sub>n</sub>=u<sub>n</sub>-9/2</span>.<ol type="أ"><li>بين أن <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">2/3</span>، ثم احسب حدها الأول <span class="math">v<sub>0</sub></span>.</li><li>عبر عن <span class="math">v<sub>n</sub></span> بدلالة <span class="math">n</span>، ثم احسب <span class="math">lim u<sub>n</sub></span>.</li></ol></li>
        <li>نضع من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">S<sub>n</sub>=u<sub>0</sub>+u<sub>1</sub>+...+u<sub>n</sub></span>. احسب <span class="math">S<sub>n</sub></span> بدلالة <span class="math">n</span>.</li>
      </ol>
    </div>`,
    quickSolution: `<p><strong>1)</strong> لكل <span class="math">n</span>: <span class="math">u<sub>n</sub>&lt;9/2</span>. كما أن <span class="math">u<sub>n+1</sub>-u<sub>n</sub>=(1/3)(9/2-u<sub>n</sub>)&gt;0</span>، إذن <span class="math">(u<sub>n</sub>)</span> متزايدة ومتقاربة.</p><p><strong>2)</strong> <span class="math">v<sub>0</sub>=-7/2</span>، <span class="math">v<sub>n</sub>=-(7/2)(2/3)<sup>n</sup></span>، و<span class="math">u<sub>n</sub>=9/2-(7/2)(2/3)<sup>n</sup></span>، و<span class="math">lim u<sub>n</sub>=9/2</span>.</p><p><strong>3)</strong> <span class="math">S<sub>n</sub>=(9/2)(n+1)-(21/2)(1-(2/3)<sup>n+1</sup>)</span>.</p>`,
    solution: `<p><strong>1-أ)</strong> نبرهن بالتراجع. عند <span class="math">n=0</span>: <span class="math">u_0=1&lt;9/2</span>. نفرض <span class="math">u_n&lt;9/2</span>. عندئذ:</p><p class="math-equation">u<sub>n+1</sub>=(2/3)u<sub>n</sub>+3/2 &lt; (2/3)(9/2)+3/2=9/2</p><p>إذن <span class="math">u_n&lt;9/2</span> لكل <span class="math">n</span>.</p><p><strong>1-ب)</strong></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=(2/3)u<sub>n</sub>+3/2-u<sub>n</sub>=(1/3)(9/2-u<sub>n</sub>)</p><p>وبما أن <span class="math">u_n&lt;9/2</span>، فالفرق موجب. إذن المتتالية متزايدة ومحدودة من الأعلى، فهي متقاربة.</p><p><strong>2-أ)</strong> بما أن <span class="math">v_n=u_n-9/2</span>:</p><p class="math-equation">v<sub>n+1</sub>=u<sub>n+1</sub>-9/2=(2/3)u<sub>n</sub>+3/2-9/2=(2/3)(u<sub>n</sub>-9/2)=(2/3)v<sub>n</sub></p><p>إذن <span class="math">(v_n)</span> هندسية أساسها <span class="math">2/3</span>، وحدها الأول <span class="math">v_0=1-9/2=-7/2</span>.</p><p><strong>2-ب)</strong></p><p class="math-equation">v<sub>n</sub>=-(7/2)(2/3)<sup>n</sup></p><p>ومنه <span class="math">u_n=v_n+9/2=9/2-(7/2)(2/3)^n</span>. وبما أن <span class="math">(2/3)^n→0</span>، فإن <span class="math">lim u_n=9/2</span>.</p><p><strong>3)</strong></p><p class="math-equation">S<sub>n</sub>=Σ<sub>k=0</sub><sup>n</sup>[9/2-(7/2)(2/3)<sup>k</sup>]</p><p class="math-equation">S<sub>n</sub>=(9/2)(n+1)-(7/2)(1-(2/3)<sup>n+1</sup>)/(1-2/3)</p><p class="math-equation">S<sub>n</sub>=(9/2)(n+1)-(21/2)(1-(2/3)<sup>n+1</sup>)</p>`,
    detailedSolution: `<div class="detailed-solution">
<p><strong>1) ما المطلوب؟</strong> نثبت الحصر <span class="math">u_n&lt;9/2</span> ثم ندرس الرتابة والتقارب.</p><p><strong>الفكرة المستعملة:</strong> الحصر يثبت بالتراجع، والرتابة تظهر من الفرق <span class="math">u_{n+1}-u_n</span>.</p><p><strong>التطبيق:</strong> عند <span class="math">n=0</span>: <span class="math">1&lt;9/2</span>. إذا كان <span class="math">u_n&lt;9/2</span>، فإن:</p><p class="math-equation">u<sub>n+1</sub>&lt;(2/3)(9/2)+3/2=9/2</p><p>ثم نحسب:</p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=(1/3)(9/2-u<sub>n</sub>)</p><p>وهذا موجب بفضل الحصر، إذن المتتالية متزايدة ومحدودة من الأعلى، فهي متقاربة.</p><p><strong>النتيجة:</strong> <span class="math">u_n&lt;9/2</span> والمتتالية متزايدة ومتقاربة.</p>
<p><strong>2) ما المطلوب؟</strong> نطرح العدد الثابت <span class="math">9/2</span> لتحويل العلاقة إلى هندسية.</p><p><strong>الفكرة المستعملة:</strong> العدد <span class="math">9/2</span> يحقق <span class="math">L=(2/3)L+3/2</span>، لذلك <span class="math">v_n=u_n-9/2</span> مناسب.</p><p><strong>التطبيق:</strong></p><p class="math-equation">v<sub>n+1</sub>=u<sub>n+1</sub>-9/2=(2/3)(u<sub>n</sub>-9/2)=(2/3)v<sub>n</sub></p><p>كما أن <span class="math">v_0=-7/2</span>، ومنه:</p><p class="math-equation">v<sub>n</sub>=-(7/2)(2/3)<sup>n</sup></p><p>وبالتالي:</p><p class="math-equation">u<sub>n</sub>=9/2-(7/2)(2/3)<sup>n</sup></p><p><strong>النتيجة:</strong> <span class="math">lim u_n=9/2</span>.</p>
<p><strong>3) ما المطلوب؟</strong> نحسب مجموع حدود <span class="math">u_k</span> من <span class="math">0</span> إلى <span class="math">n</span>.</p><p><strong>الفكرة المستعملة:</strong> نستعمل العبارة الصريحة، فيظهر مجموع ثابت وعدد حدوده <span class="math">n+1</span>، ومجموع هندسي أساسه <span class="math">2/3</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">S<sub>n</sub>=(9/2)(n+1)-(7/2)Σ<sub>k=0</sub><sup>n</sup>(2/3)<sup>k</sup></p><p class="math-equation">S<sub>n</sub>=(9/2)(n+1)-(21/2)(1-(2/3)<sup>n+1</sup>)</p><p class="pedagogy-summary"><strong>خلاصة المسار:</strong> أثبتنا الحصر والرتابة، ثم استعملنا العدد الثابت للحصول على متتالية هندسية، وبعدها حسبنا النهاية والمجموع.</p></div>`,
    conceptHints: [
      { title: "الحصر بالتراجع", hint: "افترض أن u_n أصغر من 9/2، ثم عوض 9/2 في العلاقة لأن معامل u_n موجب." },
      { title: "رتابة المتتالية", hint: "احسب الفرق u_{n+1}-u_n وحاول كتابته بدلالة 9/2-u_n." },
      { title: "المتتالية المساعدة", hint: "ابحث عن العدد الثابت للعلاقة، ثم اطرحه من u_n للحصول على متتالية هندسية." },
      { title: "حساب المجموع", hint: "استعمل عبارة u_n الصريحة واجمع الثابت والحد الهندسي كل على حدة." }
    ]
  },
  {
    id: "bac-2020-management-subject-2",
    branch: "management",
    year: "2020",
    title: "بكالوريا 2020 - تسيير واقتصاد - الموضوع الثاني",
    statementHtml: `<div class="bac-statement">
      <p><strong>التمرين: المتتاليات الهندسية والحسابية</strong></p>
      <p>المتتالية <span class="math">(v<sub>n</sub>)</span> هندسية حدها الأول <span class="math">v<sub>0</sub></span> وأساسها <span class="math">q</span> موجبان تماما، و:</p>
      <p class="math-equation">ln v<sub>5</sub> + ln v<sub>3</sub> = 8ln2, &nbsp; ln v<sub>5</sub> - ln v<sub>3</sub> = 2ln2</p>
      <ol>
        <li>بين أن <span class="math">v<sub>3</sub>=8</span> و<span class="math">v<sub>5</sub>=32</span>.</li>
        <li>
          <ol type="أ">
            <li>بين أن <span class="math">q=2</span> و<span class="math">v<sub>0</sub>=1</span>.</li>
            <li>اكتب <span class="math">v<sub>n</sub></span> بدلالة <span class="math">n</span>.</li>
            <li>هل العدد <span class="math">1024</span> حد من حدود المتتالية <span class="math">(v<sub>n</sub>)</span>؟</li>
          </ol>
        </li>
        <li>المتتالية <span class="math">(w<sub>n</sub>)</span> معرفة على <span class="math">ℕ</span> بـ:</li>
      </ol>
      <p class="math-equation">w<sub>n</sub>=2n-3+2<sup>n</sup></p>
      <ol type="أ">
        <li>تحقق أن <span class="math">w<sub>n</sub>=u<sub>n</sub>+v<sub>n</sub></span> حيث <span class="math">(u<sub>n</sub>)</span> متتالية حسابية يطلب تعيين أساسها وحدها الأول <span class="math">u<sub>0</sub></span>.</li>
        <li>نضع من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">S<sub>n</sub>=w<sub>0</sub>+w<sub>1</sub>+...+w<sub>n</sub></span>. بين أنه من أجل كل عدد طبيعي <span class="math">n</span>:</li>
      </ol>
      <p class="math-equation">S<sub>n</sub>=(n+1)(n-3)+2<sup>n+1</sup>-1</p>
    </div>`,
    quickSolution: `<p><strong>1)</strong> <span class="math">v<sub>3</sub>=8</span> و<span class="math">v<sub>5</sub>=32</span>.</p><p><strong>2)</strong> <span class="math">q=2</span>، <span class="math">v<sub>0</sub>=1</span>، <span class="math">v<sub>n</sub>=2<sup>n</sup></span>. نعم، <span class="math">1024=v<sub>10</sub></span>.</p><p><strong>3)</strong> <span class="math">u<sub>n</sub>=2n-3</span>، أساسها <span class="math">2</span> وحدها الأول <span class="math">u<sub>0</sub>=-3</span>.</p><p><strong>4)</strong> <span class="math">S<sub>n</sub>=(n+1)(n-3)+2<sup>n+1</sup>-1</span>.</p>`,
    solution: `<p><strong>1)</strong> من المعطيات:</p><p class="math-equation">ln(v<sub>5</sub>v<sub>3</sub>)=8ln2 ⇒ v<sub>5</sub>v<sub>3</sub>=2<sup>8</sup>=256</p><p class="math-equation">ln(v<sub>5</sub>/v<sub>3</sub>)=2ln2 ⇒ v<sub>5</sub>/v<sub>3</sub>=4</p><p>إذن <span class="math">v<sub>5</sub>=4v<sub>3</sub></span>، ومنه <span class="math">4v<sub>3</sub><sup>2</sup>=256</span>. وبما أن الحدود موجبة تماما: <span class="math">v<sub>3</sub>=8</span> و<span class="math">v<sub>5</sub>=32</span>.</p><p><strong>2-أ)</strong> بما أن <span class="math">(v_n)</span> هندسية، فإن:</p><p class="math-equation">v<sub>5</sub>/v<sub>3</sub>=q<sup>2</sup>=32/8=4</p><p>وبما أن <span class="math">q&gt;0</span>، فإن <span class="math">q=2</span>. ثم <span class="math">v<sub>3</sub>=v<sub>0</sub>q<sup>3</sup></span> يعطي <span class="math">8=8v<sub>0</sub></span>، إذن <span class="math">v<sub>0</sub>=1</span>.</p><p><strong>2-ب)</strong></p><p class="math-equation">v<sub>n</sub>=v<sub>0</sub>q<sup>n</sup>=2<sup>n</sup></p><p><strong>2-ج)</strong> <span class="math">1024=2<sup>10</sup></span>، إذن <span class="math">1024=v<sub>10</sub></span> فهو حد من حدود المتتالية.</p><p><strong>3-أ)</strong> بما أن <span class="math">v<sub>n</sub>=2<sup>n</sup></span> و<span class="math">w<sub>n</sub>=2n-3+2<sup>n</sup></span>، نضع:</p><p class="math-equation">u<sub>n</sub>=2n-3</p><p>فتكون <span class="math">w<sub>n</sub>=u<sub>n</sub>+v<sub>n</sub></span>. والمتتالية <span class="math">(u_n)</span> حسابية أساسها <span class="math">2</span> وحدها الأول <span class="math">u<sub>0</sub>=-3</span>.</p><p><strong>3-ب)</strong></p><p class="math-equation">S<sub>n</sub>=Σ<sub>k=0</sub><sup>n</sup>(2k-3)+Σ<sub>k=0</sub><sup>n</sup>2<sup>k</sup></p><p class="math-equation">S<sub>n</sub>=2×n(n+1)/2-3(n+1)+(2<sup>n+1</sup>-1)</p><p>إذن:</p><p class="math-equation">S<sub>n</sub>=(n+1)(n-3)+2<sup>n+1</sup>-1</p>`,
    detailedSolution: `<div class="detailed-solution">
<p><strong>1) ما المطلوب؟</strong> نستخرج <span class="math">v_3</span> و<span class="math">v_5</span> من علاقتين لوغاريتميتين.</p><p><strong>الفكرة المستعملة:</strong> نستعمل خواص اللوغاريتم: مجموع اللوغاريتمات هو لوغاريتم الجداء، والفرق هو لوغاريتم خارج القسمة.</p><p><strong>التطبيق:</strong></p><p class="math-equation">ln(v<sub>5</sub>v<sub>3</sub>)=8ln2 ⇒ v<sub>5</sub>v<sub>3</sub>=256</p><p class="math-equation">ln(v<sub>5</sub>/v<sub>3</sub>)=2ln2 ⇒ v<sub>5</sub>/v<sub>3</sub>=4</p><p>إذن <span class="math">v_5=4v_3</span>، وبالتعويض <span class="math">4v_3^2=256</span>. وبما أن الحدود موجبة، نأخذ <span class="math">v_3=8</span> و<span class="math">v_5=32</span>.</p><p><strong>النتيجة:</strong> <span class="math">v_3=8</span> و<span class="math">v_5=32</span>.</p>
<p><strong>2) ما المطلوب؟</strong> نحدد أساس المتتالية الهندسية وحدها الأول ثم حدها العام.</p><p><strong>الفكرة المستعملة:</strong> في المتتالية الهندسية <span class="math">v_5/v_3=q^2</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">q<sup>2</sup>=v<sub>5</sub>/v<sub>3</sub>=4</p><p>ومادام <span class="math">q&gt;0</span> فإن <span class="math">q=2</span>. ثم:</p><p class="math-equation">v<sub>3</sub>=v<sub>0</sub>q<sup>3</sup> ⇒ 8=8v<sub>0</sub> ⇒ v<sub>0</sub>=1</p><p>إذن <span class="math">v_n=2^n</span>. وبما أن <span class="math">1024=2^{10}</span> فهو <span class="math">v_{10}</span>.</p><p><strong>النتيجة:</strong> <span class="math">v_n=2^n</span> و<span class="math">1024</span> حد من حدودها.</p>
<p><strong>3) ما المطلوب؟</strong> نفصل <span class="math">w_n</span> إلى جزء حسابي وجزء هندسي، ثم نحسب المجموع.</p><p><strong>الفكرة المستعملة:</strong> بما أن <span class="math">v_n=2^n</span>، فالجزء الباقي في <span class="math">w_n</span> هو <span class="math">u_n=2n-3</span> وهو حسابي.</p><p><strong>التطبيق:</strong></p><p class="math-equation">w<sub>n</sub>=2n-3+2<sup>n</sup>=u<sub>n</sub>+v<sub>n</sub></p><p>حيث <span class="math">u_n=2n-3</span>. إذن <span class="math">(u_n)</span> حسابية أساسها <span class="math">2</span> وحدها الأول <span class="math">u_0=-3</span>.</p><p>ولحساب <span class="math">S_n</span>:</p><p class="math-equation">S<sub>n</sub>=Σ(2k-3)+Σ2<sup>k</sup></p><p class="math-equation">S<sub>n</sub>=n(n+1)-3(n+1)+2<sup>n+1</sup>-1</p><p><strong>النتيجة:</strong></p><p class="math-equation">S<sub>n</sub>=(n+1)(n-3)+2<sup>n+1</sup>-1</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> حولنا العلاقات اللوغاريتمية إلى جداء وخارج قسمة، فحددنا المتتالية الهندسية. بعد ذلك فصلنا <span class="math">w_n</span> إلى حد حسابي وحد هندسي، وجمعنا كل جزء على حدة.</p>
</div>`,
    conceptHints: [
      { title: "اللوغاريتمات", hint: "حوّل مجموع اللوغاريتمات إلى لوغاريتم جداء، والفرق إلى لوغاريتم خارج قسمة." },
      { title: "المتتالية الهندسية", hint: "استعمل العلاقة v_5/v_3=q^2، ثم استعمل v_3=v_0q^3 لإيجاد v_0." },
      { title: "تفكيك w_n", hint: "بعد إيجاد v_n=2^n، قارن w_n مع v_n لتحديد u_n." },
      { title: "حساب المجموع", hint: "اجمع الجزء الحسابي 2k-3 والجزء الهندسي 2^k كل واحد بصيغته المناسبة." }
    ]
  },  {
    id: "bac-2019-management-subject-1",
    branch: "management",
    year: "2019",
    title: "بكالوريا 2019 - تسيير واقتصاد - الموضوع الأول",
    statementHtml: `<div class="bac-statement">
      <p><strong>التمرين: المتتاليات العددية</strong></p>
      <p>المتتالية العددية <span class="math">(u<sub>n</sub>)</span> معرفة كما يلي:</p>
      <p class="math-equation">u<sub>0</sub>=-4, &nbsp; u<sub>n+1</sub>=(3/4)u<sub>n</sub>+2</p>
      <ol>
        <li>
          <ol type="أ">
            <li>احسب كلا من <span class="math">u<sub>1</sub></span> و<span class="math">u<sub>2</sub></span>.</li>
            <li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n</sub>&lt;8</span>.</li>
          </ol>
        </li>
        <li>ادرس اتجاه تغير المتتالية <span class="math">(u<sub>n</sub>)</span> واستنتج أنها متقاربة.</li>
        <li>من أجل كل عدد طبيعي <span class="math">n</span>، نضع: <span class="math">v<sub>n</sub>=u<sub>n</sub>-α</span>، حيث <span class="math">α</span> عدد حقيقي.
          <ol type="أ">
            <li>بين أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">v<sub>n+1</sub>=(3/4)v<sub>n</sub>-(1/4)α+2</span>.</li>
            <li>عين قيمة العدد <span class="math">α</span> حتى تكون <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">3/4</span>، ثم عين حدها الأول <span class="math">v<sub>0</sub></span>.</li>
            <li>نضع <span class="math">α=8</span>. عبر عن <span class="math">v<sub>n</sub></span> بدلالة <span class="math">n</span>، ثم استنتج أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n</sub>=-12(3/4)<sup>n</sup>+8</span>.</li>
          </ol>
        </li>
        <li>احسب المجموع <span class="math">S<sub>n</sub></span> بدلالة <span class="math">n</span> حيث: <span class="math">S<sub>n</sub>=u<sub>1</sub>+u<sub>2</sub>+...+u<sub>n</sub></span>.</li>
      </ol>
    </div>`,
    quickSolution: `<p><strong>1)</strong> <span class="math">u<sub>1</sub>=-1</span>، <span class="math">u<sub>2</sub>=5/4</span>، ولكل <span class="math">n</span>: <span class="math">u<sub>n</sub>&lt;8</span>.</p><p><strong>2)</strong> <span class="math">u<sub>n+1</sub>-u<sub>n</sub>=(8-u<sub>n</sub>)/4&gt;0</span>، إذن متزايدة ومتقاربة.</p><p><strong>3)</strong> <span class="math">α=8</span>، <span class="math">v<sub>0</sub>=-12</span>، <span class="math">v<sub>n</sub>=-12(3/4)<sup>n</sup></span>، و<span class="math">u<sub>n</sub>=8-12(3/4)<sup>n</sup></span>.</p><p><strong>4)</strong> <span class="math">S<sub>n</sub>=8n-36+36(3/4)<sup>n</sup></span>.</p>`,
    solution: `<p><strong>1-أ)</strong></p><p class="math-equation">u<sub>1</sub>=(3/4)(-4)+2=-1</p><p class="math-equation">u<sub>2</sub>=(3/4)(-1)+2=5/4</p><p><strong>1-ب)</strong> نبرهن بالتراجع. عند <span class="math">n=0</span>: <span class="math">u<sub>0</sub>=-4&lt;8</span>. نفرض <span class="math">u<sub>n</sub>&lt;8</span>. عندئذ:</p><p class="math-equation">u<sub>n+1</sub>=(3/4)u<sub>n</sub>+2&lt;(3/4)×8+2=8</p><p>إذن <span class="math">u<sub>n</sub>&lt;8</span> لكل <span class="math">n</span>.</p><p><strong>2)</strong></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=(3/4)u<sub>n</sub>+2-u<sub>n</sub>=(8-u<sub>n</sub>)/4</p><p>وبما أن <span class="math">u<sub>n</sub>&lt;8</span>، فإن الفرق موجب. إذن المتتالية متزايدة، وهي محدودة من الأعلى بـ <span class="math">8</span>، فهي متقاربة.</p><p><strong>3-أ)</strong> لدينا <span class="math">v<sub>n</sub>=u<sub>n</sub>-α</span>، إذن:</p><p class="math-equation">v<sub>n+1</sub>=u<sub>n+1</sub>-α=(3/4)u<sub>n</sub>+2-α</p><p class="math-equation">v<sub>n+1</sub>=(3/4)(v<sub>n</sub>+α)+2-α=(3/4)v<sub>n</sub>-(1/4)α+2</p><p><strong>3-ب)</strong> حتى تكون <span class="math">(v<sub>n</sub>)</span> هندسية أساسها <span class="math">3/4</span> يجب أن يكون الحد الثابت معدوما:</p><p class="math-equation">-(1/4)α+2=0</p><p>إذن <span class="math">α=8</span>. عندئذ <span class="math">v<sub>0</sub>=u<sub>0</sub>-8=-12</span>.</p><p><strong>3-ج)</strong></p><p class="math-equation">v<sub>n</sub>=-12(3/4)<sup>n</sup></p><p>ومنه:</p><p class="math-equation">u<sub>n</sub>=v<sub>n</sub>+8=8-12(3/4)<sup>n</sup></p><p><strong>4)</strong></p><p class="math-equation">S<sub>n</sub>=Σ<sub>k=1</sub><sup>n</sup>[8-12(3/4)<sup>k</sup>]</p><p class="math-equation">S<sub>n</sub>=8n-12×(3/4)(1-(3/4)<sup>n</sup>)/(1-3/4)</p><p class="math-equation">S<sub>n</sub>=8n-36+36(3/4)<sup>n</sup></p>`,
    detailedSolution: `<div class="detailed-solution">
<p><strong>1) ما المطلوب؟</strong> نحسب الحدين الأولين ثم نثبت الحصر <span class="math">u_n&lt;8</span>.</p><p><strong>الفكرة المستعملة:</strong> نحسب مباشرة بالتعويض، ثم نستعمل التراجع لأن العلاقة تعطي الحد التالي من الحد الحالي.</p><p><strong>التطبيق:</strong></p><p class="math-equation">u<sub>1</sub>=-1, &nbsp; u<sub>2</sub>=5/4</p><p>عند <span class="math">n=0</span> لدينا <span class="math">u_0=-4&lt;8</span>. وإذا كان <span class="math">u_n&lt;8</span> فإن:</p><p class="math-equation">u<sub>n+1</sub>&lt;(3/4)×8+2=8</p><p><strong>النتيجة:</strong> <span class="math">u_n&lt;8</span> لكل <span class="math">n</span>.</p>
<p><strong>2) ما المطلوب؟</strong> ندرس الرتابة ثم نستنتج التقارب.</p><p><strong>الفكرة المستعملة:</strong> نحسب الفرق ونستعمل الحصر السابق.</p><p><strong>التطبيق:</strong></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=(8-u<sub>n</sub>)/4</p><p>هذا الفرق موجب لأن <span class="math">u_n&lt;8</span>. إذن <span class="math">(u_n)</span> متزايدة ومحدودة من الأعلى، ومنه فهي متقاربة.</p>
<p><strong>3) ما المطلوب؟</strong> نختار <span class="math">α</span> حتى تصبح <span class="math">v_n=u_n-α</span> هندسية.</p><p><strong>الفكرة المستعملة:</strong> نحسب <span class="math">v_{n+1}</span> ونلغي الحد الثابت.</p><p><strong>التطبيق:</strong></p><p class="math-equation">v<sub>n+1</sub>=(3/4)v<sub>n</sub>-(1/4)α+2</p><p>حتى تكون هندسية أساسها <span class="math">3/4</span> نأخذ <span class="math">-(1/4)α+2=0</span>، أي <span class="math">α=8</span>. ومنه <span class="math">v_0=-12</span> و:</p><p class="math-equation">v<sub>n</sub>=-12(3/4)<sup>n</sup></p><p class="math-equation">u<sub>n</sub>=8-12(3/4)<sup>n</sup></p>
<p><strong>4) ما المطلوب؟</strong> نحسب مجموع الحدود من <span class="math">u_1</span> إلى <span class="math">u_n</span>.</p><p><strong>الفكرة المستعملة:</strong> نستعمل عبارة <span class="math">u_k</span> ثم نجمع الثابت والمجموع الهندسي.</p><p><strong>التطبيق:</strong></p><p class="math-equation">S<sub>n</sub>=Σ<sub>k=1</sub><sup>n</sup>[8-12(3/4)<sup>k</sup>]</p><p class="math-equation">S<sub>n</sub>=8n-36(1-(3/4)<sup>n</sup>)</p><p><strong>النتيجة:</strong></p><p class="math-equation">S<sub>n</sub>=8n-36+36(3/4)<sup>n</sup></p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> أثبتنا الحصر والرتابة، ثم اخترنا العدد الثابت <span class="math">8</span> لتحويل العلاقة إلى هندسية، واستعملنا العبارة الصريحة لحساب المجموع.</p>
</div>`,
    conceptHints: [
      { title: "الحصر بالتراجع", hint: "افترض أن u_n أقل من 8، ثم عوض 8 في العلاقة لأن معامل u_n موجب." },
      { title: "رتابة المتتالية", hint: "احسب u_{n+1}-u_n وحاول كتابته بدلالة 8-u_n." },
      { title: "اختيار α", hint: "بعد حساب v_{n+1}، اجعل الحد الثابت معدوما حتى تبقى العلاقة v_{n+1}=qv_n." },
      { title: "حساب المجموع", hint: "المجموع يبدأ من k=1 لا من k=0؛ انتبه لأول حد في مجموع القوى الهندسية." }
    ]
  },  {
    id: "bac-2019-management-subject-2",
    branch: "management",
    year: "2019",
    title: "بكالوريا 2019 - تسيير واقتصاد - الموضوع الثاني",
    statementHtml: `<div class="bac-statement">
      <p><strong>التمرين: المتتاليات العددية</strong></p>
      <p>المتتالية الحسابية <span class="math">(u<sub>n</sub>)</span> المعرفة على <span class="math">ℕ</span> بحيث:</p>
      <p class="math-equation">u<sub>2</sub>+2u<sub>5</sub>=27, &nbsp; u<sub>1</sub>=9/2</p>
      <ol>
        <li>احسب حدها الأول <span class="math">u<sub>0</sub></span> وأساسها <span class="math">r</span>.</li>
        <li>اكتب عبارة الحد العام <span class="math">u<sub>n</sub></span> بدلالة <span class="math">n</span>.</li>
        <li>بين أن العدد <span class="math">2019</span> حد من حدود هذه المتتالية، ثم احسب كلا من <span class="math">S<sub>1</sub></span> و<span class="math">S<sub>2</sub></span> حيث:</li>
      </ol>
      <p class="math-equation">S<sub>1</sub>=u<sub>1</sub>+u<sub>2</sub>+u<sub>3</sub>+...+u<sub>1344</sub></p>
      <p class="math-equation">S<sub>2</sub>=u<sub>2</sub>+u<sub>4</sub>+u<sub>6</sub>+...+u<sub>1344</sub></p>
      <p>استنتج حساب <span class="math">S<sub>3</sub></span> حيث:</p>
      <p class="math-equation">S<sub>3</sub>=u<sub>1</sub>+u<sub>3</sub>+u<sub>5</sub>+...+u<sub>1343</sub></p>
      <ol start="4"><li>المتتالية العددية <span class="math">(v<sub>n</sub>)</span> المعرفة على <span class="math">ℕ</span> بـ:</li></ol>
      <p class="math-equation">v<sub>n</sub>=e<sup>6-2u<sub>n</sub></sup></p>
      <p>احسب المجموع:</p>
      <p class="math-equation">R<sub>n</sub>=1/v<sub>0</sub>+1/v<sub>1</sub>+...+1/v<sub>n</sub></p>
    </div>`,
    quickSolution: `<p><strong>1)</strong> <span class="math">r=3/2</span> و<span class="math">u<sub>0</sub>=3</span>.</p><p><strong>2)</strong> <span class="math">u<sub>n</sub>=3+(3/2)n=(3/2)(n+2)</span>.</p><p><strong>3)</strong> <span class="math">2019=u<sub>1344</sub></span>، <span class="math">S<sub>1</sub>=1359792</span>، <span class="math">S<sub>2</sub>=680400</span>، <span class="math">S<sub>3</sub>=679392</span>.</p><p><strong>4)</strong> <span class="math">v<sub>n</sub>=e<sup>-3n</sup></span> و<span class="math">R<sub>n</sub>=(e<sup>3(n+1)</sup>-1)/(e<sup>3</sup>-1)</span>.</p>`,
    solution: `<p><strong>1)</strong> بما أن <span class="math">u<sub>n</sub>=u<sub>0</sub>+nr</span>، فإن <span class="math">u<sub>0</sub>+r=9/2</span>، ومن جهة أخرى:</p><p class="math-equation">u<sub>2</sub>+2u<sub>5</sub>=(u<sub>0</sub>+2r)+2(u<sub>0</sub>+5r)=3u<sub>0</sub>+12r=27</p><p>نعوض <span class="math">u<sub>0</sub>=9/2-r</span> فنحصل على <span class="math">27/2+9r=27</span>، ومنه <span class="math">r=3/2</span> و<span class="math">u<sub>0</sub>=3</span>.</p><p><strong>2)</strong></p><p class="math-equation">u<sub>n</sub>=3+(3/2)n=(3/2)(n+2)</p><p><strong>3)</strong> من <span class="math">(3/2)(n+2)=2019</span> نجد <span class="math">n=1344</span>، إذن <span class="math">2019=u<sub>1344</sub></span>.</p><p class="math-equation">S<sub>1</sub>=1344(u<sub>1</sub>+u<sub>1344</sub>)/2=1359792</p><p class="math-equation">S<sub>2</sub>=672(u<sub>2</sub>+u<sub>1344</sub>)/2=680400</p><p class="math-equation">S<sub>3</sub>=S<sub>1</sub>-S<sub>2</sub>=679392</p><p><strong>4)</strong> لدينا <span class="math">6-2u<sub>n</sub>=-3n</span>، إذن <span class="math">v<sub>n</sub>=e<sup>-3n</sup></span> و<span class="math">1/v<sub>n</sub>=e<sup>3n</sup></span>. ومنه:</p><p class="math-equation">R<sub>n</sub>=1+e<sup>3</sup>+...+e<sup>3n</sup>=(e<sup>3(n+1)</sup>-1)/(e<sup>3</sup>-1)</p>`,
    detailedSolution: `<div class="detailed-solution">
<p><strong>1) ما المطلوب؟</strong> نحدد أساس المتتالية الحسابية وحدها الأول.</p><p><strong>الفكرة المستعملة:</strong> نكتب الحدود بدلالة <span class="math">u_0</span> و<span class="math">r</span> ثم نحل الجهاز.</p><p><strong>التطبيق:</strong> من <span class="math">u_1=9/2</span> لدينا <span class="math">u_0+r=9/2</span>. كما أن:</p><p class="math-equation">u<sub>2</sub>+2u<sub>5</sub>=3u<sub>0</sub>+12r=27</p><p>وبالتعويض نحصل على <span class="math">r=3/2</span> و<span class="math">u_0=3</span>.</p><p><strong>النتيجة:</strong> <span class="math">u_n=(3/2)(n+2)</span>.</p>
<p><strong>2) ما المطلوب؟</strong> نثبت أن <span class="math">2019</span> حد، ثم نحسب المجاميع.</p><p><strong>الفكرة المستعملة:</strong> نحل <span class="math">u_n=2019</span>، ثم نستعمل صيغة مجموع حدود حسابية.</p><p><strong>التطبيق:</strong> <span class="math">(3/2)(n+2)=2019</span> يعطي <span class="math">n=1344</span>. إذن <span class="math">2019=u_{1344}</span>.</p><p class="math-equation">S<sub>1</sub>=1344(9/2+2019)/2=1359792</p><p class="math-equation">S<sub>2</sub>=672(6+2019)/2=680400</p><p class="math-equation">S<sub>3</sub>=S<sub>1</sub>-S<sub>2</sub>=679392</p><p><strong>النتيجة:</strong> هذه هي المجاميع المطلوبة.</p>
<p><strong>3) ما المطلوب؟</strong> نحسب مجموع مقلوبات <span class="math">v_k</span>.</p><p><strong>الفكرة المستعملة:</strong> نعوض عبارة <span class="math">u_n</span> داخل الأس، فيظهر مجموع هندسي.</p><p><strong>التطبيق:</strong></p><p class="math-equation">6-2u<sub>n</sub>=6-2(3+(3/2)n)=-3n</p><p>إذن <span class="math">v_n=e^{-3n}</span> و<span class="math">1/v_n=e^{3n}</span>، وبالتالي:</p><p class="math-equation">R<sub>n</sub>=(e<sup>3(n+1)</sup>-1)/(e<sup>3</sup>-1)</p><p class="pedagogy-summary"><strong>خلاصة المسار:</strong> استخرجنا المتتالية الحسابية، ثم فصلنا المجاميع حسب الرتب، وأخيرا حولنا المجموع الأسي إلى مجموع هندسي.</p>
</div>`,
    conceptHints: [
      { title: "المتتالية الحسابية", hint: "اكتب u_1 وu_2 وu_5 بدلالة u_0 وr، ثم حل الجهاز الناتج." },
      { title: "إثبات أن 2019 حد", hint: "حل المعادلة u_n=2019 وتحقق أن n طبيعي." },
      { title: "مجاميع الرتب", hint: "عدد الرتب من 1 إلى 1344 هو 1344، وعدد الرتب الزوجية من 2 إلى 1344 هو 672." },
      { title: "المجموع الأسي", hint: "احسب 6-2u_n أولا، ثم حول 1/v_n إلى قوة هندسية." }
    ]
  },
  {
    id: "bac-2008-management-subject-1",
    branch: "management",
    year: "2008",
    title: "بكالوريا 2008 - تسيير واقتصاد - الموضوع الأول",
    statementHtml: `<div class="bac-statement"><p><strong>التمرين: المتتاليات العددية</strong></p><p>متتالية عددية <span class="math">(u<sub>n</sub>)</span> معرفة كما يلي:</p><p class="math-equation">u<sub>0</sub>=α, &nbsp; u<sub>n+1</sub>=2/3 u<sub>n</sub>-8/9, &nbsp; α∈ℝ</p><ol><li>برهن بالتراجع أنه في حالة <span class="math">α=-8/3</span> تكون المتتالية <span class="math">(u<sub>n</sub>)</span> ثابتة.</li><li>في كل ما يلي نأخذ <span class="math">α=2</span>، ونعرف المتتالية <span class="math">(v<sub>n</sub>)</span> كما يلي: <span class="math">v<sub>n</sub>=u<sub>n</sub>+8/3</span>.<ol type="أ"><li>احسب <span class="math">u<sub>1</sub></span> و<span class="math">u<sub>2</sub></span>.</li><li>أثبت أن <span class="math">(v<sub>n</sub>)</span> متتالية هندسية يطلب تعيين أساسها <span class="math">q</span> وحدها الأول <span class="math">v<sub>0</sub></span>.</li><li>اكتب عبارة <span class="math">u<sub>n</sub></span> بدلالة <span class="math">n</span>، واحسب <span class="math">lim u<sub>n</sub></span>.</li></ol></li></ol></div>`,
    quickSolution: `<p><strong>1)</strong> إذا <span class="math">α=-8/3</span> فإن <span class="math">u<sub>n</sub>=-8/3</span> لكل <span class="math">n</span>.</p><p><strong>2)</strong> عند <span class="math">α=2</span>: <span class="math">u<sub>1</sub>=4/9</span> و<span class="math">u<sub>2</sub>=-16/27</span>. كما أن <span class="math">v<sub>0</sub>=14/3</span>، وأساس <span class="math">v_n</span> هو <span class="math">2/3</span>. إذن <span class="math">u<sub>n</sub>=14/3(2/3)<sup>n</sup>-8/3</span> و<span class="math">lim u<sub>n</sub>=-8/3</span>.</p>`,
    solution: `<p><strong>1)</strong> نبرهن بالتراجع. عند <span class="math">n=0</span> لدينا <span class="math">u_0=-8/3</span>. إذا افترضنا <span class="math">u_n=-8/3</span>، فإن:</p><p class="math-equation">u<sub>n+1</sub>=(2/3)(-8/3)-8/9=-16/9-8/9=-24/9=-8/3</p><p>إذن <span class="math">u_n=-8/3</span> لكل <span class="math">n</span>، والمتتالية ثابتة.</p><p><strong>2-أ)</strong> عندما <span class="math">α=2</span>:</p><p class="math-equation">u<sub>1</sub>=(2/3)×2-8/9=4/9</p><p class="math-equation">u<sub>2</sub>=(2/3)(4/9)-8/9=8/27-24/27=-16/27</p><p><strong>2-ب)</strong> بما أن <span class="math">v_n=u_n+8/3</span>، فإن:</p><p class="math-equation">v<sub>n+1</sub>=u<sub>n+1</sub>+8/3=(2/3)u<sub>n</sub>-8/9+8/3=(2/3)u<sub>n</sub>+16/9</p><p class="math-equation">v<sub>n+1</sub>=(2/3)(u<sub>n</sub>+8/3)=(2/3)v<sub>n</sub></p><p>إذن <span class="math">(v_n)</span> هندسية أساسها <span class="math">q=2/3</span>، وحدها الأول:</p><p class="math-equation">v<sub>0</sub>=u<sub>0</sub>+8/3=2+8/3=14/3</p><p><strong>2-ج)</strong></p><p class="math-equation">v<sub>n</sub>=14/3(2/3)<sup>n</sup></p><p>ومنه:</p><p class="math-equation">u<sub>n</sub>=v<sub>n</sub>-8/3=14/3(2/3)<sup>n</sup>-8/3</p><p>وبما أن <span class="math">(2/3)^n→0</span>، فإن:</p><p class="math-equation">lim u<sub>n</sub>=-8/3</p>`,
    detailedSolution: `<div class="detailed-solution"><p><strong>1) ما المطلوب؟</strong> نثبت أن قيمة ابتدائية معينة تجعل كل الحدود ثابتة.</p><p><strong>الفكرة المستعملة:</strong> نستعمل التراجع: إذا كان الحد الحالي يساوي <span class="math">-8/3</span> فإن العلاقة تعطي الحد التالي نفسه.</p><p class="math-equation">(2/3)(-8/3)-8/9=-8/3</p><p><strong>النتيجة:</strong> إذا <span class="math">α=-8/3</span> فإن <span class="math">u_n=-8/3</span> لكل <span class="math">n</span>.</p><p><strong>2) ما المطلوب؟</strong> في حالة <span class="math">α=2</span> نحسب حدودا أولى ثم نحول العلاقة إلى هندسية.</p><p><strong>التطبيق:</strong></p><p class="math-equation">u<sub>1</sub>=4/9, &nbsp; u<sub>2</sub>=-16/27</p><p><strong>الفكرة المستعملة:</strong> العدد الثابت في العلاقة هو <span class="math">-8/3</span>، لذلك ندرس المسافة إليه باستعمال <span class="math">v_n=u_n+8/3</span>.</p><p class="math-equation">v<sub>n+1</sub>=(2/3)v<sub>n</sub></p><p>إذن <span class="math">v_0=14/3</span> و<span class="math">v_n=14/3(2/3)^n</span>. بالرجوع إلى <span class="math">u_n</span>:</p><p class="math-equation">u<sub>n</sub>=14/3(2/3)<sup>n</sup>-8/3</p><p>وبما أن <span class="math">(2/3)^n</span> يؤول إلى <span class="math">0</span>، نحصل على <span class="math">lim u_n=-8/3</span>.</p><p class="pedagogy-summary"><strong>خلاصة المسار:</strong> أثبتنا الحالة الثابتة بالتراجع، ثم في الحالة <span class="math">α=2</span> أضفنا <span class="math">8/3</span> إلى <span class="math">u_n</span> للحصول على متتالية هندسية وعبارة صريحة.</p></div>`,
    conceptHints: [
      { title: "الحالة الثابتة", hint: "تحقق أن العدد -8/3 إذا عوض مكان u_n يعطي من جديد -8/3 في الحد التالي." },
      { title: "المتتالية المساعدة", hint: "أضف 8/3 إلى طرفي العلاقة بطريقة تجعل الحد الثابت يختفي." },
      { title: "النهاية", hint: "بعد كتابة u_n بدلالة (2/3)^n، استعمل أن هذه القوة تؤور إلى 0." }
    ]
  },  {
    id: "bac-2009-management-subject-1",
    branch: "management",
    year: "2009",
    title: "بكالوريا 2009 - تسيير واقتصاد - الموضوع الأول",
    statementHtml: `<div class="bac-statement"><p><strong>التمرين: المتتاليات العددية</strong></p><p>نعتبر المتتالية العددية <span class="math">(u<sub>n</sub>)</span> المعرفة بـ <span class="math">u<sub>0</sub>=-1</span>، وليكن من أجل كل عدد طبيعي <span class="math">n</span>:</p><p class="math-equation">3u<sub>n+1</sub>=u<sub>n</sub>+4</p><ol><li><ol type="أ"><li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n</sub>≤2</span>.</li><li>بين أن المتتالية <span class="math">(u<sub>n</sub>)</span> متزايدة.</li><li>استنتج مع التبرير أن المتتالية <span class="math">(u<sub>n</sub>)</span> متقاربة.</li></ol></li><li>نضع من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">v<sub>n</sub>=u<sub>n</sub>-2</span>.<ol type="أ"><li>بين أن <span class="math">(v<sub>n</sub>)</span> متتالية هندسية يطلب تحديد حدها الأول وأساسها.</li><li>اكتب الحد العام <span class="math">v<sub>n</sub></span> بدلالة <span class="math">n</span>، ثم استنتج الحد العام <span class="math">u<sub>n</sub></span> بدلالة <span class="math">n</span>.</li><li>احسب <span class="math">lim u<sub>n</sub></span>.</li><li>احسب بدلالة <span class="math">n</span> المجموع <span class="math">S<sub>n</sub></span> حيث <span class="math">S<sub>n</sub>=u<sub>0</sub>+...+u<sub>n</sub></span>.</li></ol></li></ol></div>`,
    quickSolution: `<p><strong>1)</strong> لكل <span class="math">n</span>: <span class="math">u<sub>n</sub>≤2</span>. كما أن <span class="math">u<sub>n+1</sub>-u<sub>n</sub>=2/3(2-u<sub>n</sub>)≥0</span>، إذن <span class="math">(u_n)</span> متزايدة ومتقاربة.</p><p><strong>2)</strong> <span class="math">v<sub>0</sub>=-3</span>، أساسها <span class="math">1/3</span>، <span class="math">v<sub>n</sub>=-3(1/3)<sup>n</sup></span>، و<span class="math">u<sub>n</sub>=2-3(1/3)<sup>n</sup></span>. النهاية <span class="math">2</span>.</p><p><strong>3)</strong> <span class="math">S<sub>n</sub>=2(n+1)-9/2(1-(1/3)<sup>n+1</sup>)</span>.</p>`,
    solution: `<p><strong>1-أ)</strong> من العلاقة <span class="math">3u_{n+1}=u_n+4</span> نحصل على <span class="math">u_{n+1}=(u_n+4)/3</span>. نبرهن بالتراجع أن <span class="math">u_n≤2</span>. عند <span class="math">n=0</span>: <span class="math">u_0=-1≤2</span>. نفرض أن <span class="math">u_n≤2</span>، عندئذ:</p><p class="math-equation">u<sub>n+1</sub>=(u<sub>n</sub>+4)/3≤(2+4)/3=2</p><p>إذن <span class="math">u_n≤2</span> لكل <span class="math">n</span>.</p><p><strong>1-ب)</strong></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=(u<sub>n</sub>+4)/3-u<sub>n</sub>=2/3(2-u<sub>n</sub>)</p><p>وبما أن <span class="math">u_n≤2</span> فإن الفرق غير سالب، إذن المتتالية متزايدة.</p><p><strong>1-ج)</strong> المتتالية متزايدة ومحدودة من الأعلى بـ <span class="math">2</span>، إذن فهي متقاربة.</p><p><strong>2-أ)</strong> لدينا <span class="math">v_n=u_n-2</span>، ومنه:</p><p class="math-equation">v<sub>n+1</sub>=u<sub>n+1</sub>-2=(u<sub>n</sub>+4)/3-2=(u<sub>n</sub>-2)/3=1/3v<sub>n</sub></p><p>إذن <span class="math">(v_n)</span> هندسية أساسها <span class="math">1/3</span> وحدها الأول <span class="math">v_0=-1-2=-3</span>.</p><p><strong>2-ب)</strong></p><p class="math-equation">v<sub>n</sub>=-3(1/3)<sup>n</sup></p><p>وبالتالي:</p><p class="math-equation">u<sub>n</sub>=v<sub>n</sub>+2=2-3(1/3)<sup>n</sup></p><p><strong>2-ج)</strong> بما أن <span class="math">(1/3)^n→0</span>، فإن <span class="math">lim u_n=2</span>.</p><p><strong>2-د)</strong></p><p class="math-equation">S<sub>n</sub>=Σ<sub>k=0</sub><sup>n</sup>[2-3(1/3)<sup>k</sup>]</p><p class="math-equation">S<sub>n</sub>=2(n+1)-3×(1-(1/3)<sup>n+1</sup>)/(1-1/3)</p><p class="math-equation">S<sub>n</sub>=2(n+1)-9/2(1-(1/3)<sup>n+1</sup>)</p>`,
    detailedSolution: `<div class="detailed-solution"><p><strong>1) ما المطلوب؟</strong> نثبت أن الحدود لا تتجاوز <span class="math">2</span>، ثم نستعمل هذا الحصر للرتابة والتقارب.</p><p><strong>الفكرة المستعملة:</strong> العدد <span class="math">2</span> ثابت في العلاقة، لذلك يظهر في الحصر وفي الفرق.</p><p>إذا كان <span class="math">u_n≤2</span> فإن:</p><p class="math-equation">u<sub>n+1</sub>≤(2+4)/3=2</p><p>ثم نحسب:</p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=2/3(2-u<sub>n</sub>)</p><p>وهذا الفرق غير سالب، إذن المتتالية متزايدة ومحدودة من الأعلى، فهي متقاربة.</p><p><strong>2) ما المطلوب؟</strong> نحول العلاقة إلى هندسية باستعمال <span class="math">v_n=u_n-2</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">v<sub>n+1</sub>=1/3v<sub>n</sub></p><p>إذن <span class="math">v_0=-3</span> و<span class="math">v_n=-3(1/3)^n</span>. وبالرجوع إلى <span class="math">u_n</span>:</p><p class="math-equation">u<sub>n</sub>=2-3(1/3)<sup>n</sup></p><p>فتكون النهاية <span class="math">2</span>.</p><p><strong>3) ما المطلوب؟</strong> نحسب مجموع <span class="math">u_k</span> من <span class="math">0</span> إلى <span class="math">n</span>.</p><p><strong>الفكرة المستعملة:</strong> نفصل الثابت <span class="math">2</span> عن الحد الهندسي <span class="math">3(1/3)^k</span>.</p><p class="math-equation">S<sub>n</sub>=2(n+1)-9/2(1-(1/3)<sup>n+1</sup>)</p><p class="pedagogy-summary"><strong>خلاصة المسار:</strong> حصرنا المتتالية تحت العدد الثابت <span class="math">2</span>، ثم طرحناه للحصول على متتالية هندسية. بعد ذلك استعملنا العبارة الصريحة لحساب النهاية والمجموع.</p></div>`,
    conceptHints: [
      { title: "الحصر بالتراجع", hint: "افترض u_n≤2، ثم عوض في u_{n+1}=(u_n+4)/3 لإثبات الحصر للحد التالي." },
      { title: "رتابة المتتالية", hint: "احسب الفرق u_{n+1}-u_n وحاول كتابته بدلالة 2-u_n." },
      { title: "المتتالية المساعدة", hint: "اطرح العدد الثابت 2 من u_n ثم احسب v_{n+1}." },
      { title: "حساب المجموع", hint: "اكتب u_k على شكل ثابت زائد حد هندسي، ثم اجمع كل جزء على حدة." }
    ]
  },
  {
    id: "bac-2009-management-subject-2",
    branch: "management",
    year: "2009",
    title: "بكالوريا 2009 - تسيير واقتصاد - الموضوع الثاني",
    statementHtml: `<div class="bac-statement"><p><strong>التمرين: المتتاليات العددية</strong></p><p>متتالية عددية <span class="math">(U<sub>n</sub>)</span> معرفة بـ <span class="math">U<sub>0</sub>=-1</span>، ومن أجل كل عدد طبيعي <span class="math">n</span>:</p><p class="math-equation">U<sub>n+1</sub>=3U<sub>n</sub>-2</p><ol><li>احسب <span class="math">U<sub>1</sub></span> و<span class="math">U<sub>2</sub></span>.</li><li>لتكن <span class="math">(V<sub>n</sub>)</span> المعرفة بـ <span class="math">V<sub>n</sub>=U<sub>n</sub>-1</span>.<ol type="أ"><li>أثبت أن <span class="math">(V<sub>n</sub>)</span> متتالية هندسية يطلب تعيين أساسها <span class="math">q</span> وحدها الأول <span class="math">V<sub>0</sub></span>.</li><li>اكتب عبارة الحد العام <span class="math">V<sub>n</sub></span> بدلالة <span class="math">n</span>.</li></ol></li><li>بين أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">U<sub>n+1</sub>-U<sub>n</sub>=(-4)×3<sup>n</sup></span>، ثم استنتج اتجاه تغير <span class="math">(U<sub>n</sub>)</span>.</li><li>عين العدد الطبيعي <span class="math">n</span> بحيث: <span class="math">U<sub>0</sub>+U<sub>1</sub>+...+U<sub>n</sub>=n-79</span>.</li></ol></div>`,
    quickSolution: `<p><strong>1)</strong> <span class="math">U<sub>1</sub>=-5</span> و<span class="math">U<sub>2</sub>=-17</span>.</p><p><strong>2)</strong> <span class="math">V<sub>0</sub>=-2</span>، <span class="math">q=3</span>، و<span class="math">V<sub>n</sub>=-2×3<sup>n</sup></span>.</p><p><strong>3)</strong> <span class="math">U<sub>n</sub>=1-2×3<sup>n</sup></span>، و<span class="math">U<sub>n+1</sub>-U<sub>n</sub>=-4×3<sup>n</sup>&lt;0</span>، إذن <span class="math">(U_n)</span> متناقصة تماما.</p><p><strong>4)</strong> <span class="math">n=3</span>.</p>`,
    solution: `<p><strong>1)</strong> <span class="math">U_1=3(-1)-2=-5</span> و<span class="math">U_2=3(-5)-2=-17</span>.</p><p><strong>2-أ)</strong> بما أن <span class="math">V_n=U_n-1</span>، فإن:</p><p class="math-equation">V<sub>n+1</sub>=U<sub>n+1</sub>-1=3U<sub>n</sub>-3=3(U<sub>n</sub>-1)=3V<sub>n</sub></p><p>إذن <span class="math">(V_n)</span> هندسية أساسها <span class="math">q=3</span> وحدها الأول <span class="math">V_0=-2</span>.</p><p><strong>2-ب)</strong> <span class="math">V_n=-2×3^n</span>، ومنه <span class="math">U_n=1-2×3^n</span>.</p><p><strong>3)</strong></p><p class="math-equation">U<sub>n+1</sub>-U<sub>n</sub>=(1-2×3<sup>n+1</sup>)-(1-2×3<sup>n</sup>)=-4×3<sup>n</sup></p><p>وهذا الفرق سالب، إذن <span class="math">(U_n)</span> متناقصة تماما.</p><p><strong>4)</strong></p><p class="math-equation">U<sub>0</sub>+...+U<sub>n</sub>=Σ(1-2×3<sup>k</sup>)=n+2-3<sup>n+1</sup></p><p>نحل:</p><p class="math-equation">n+2-3<sup>n+1</sup>=n-79 ⇒ 3<sup>n+1</sup>=81=3<sup>4</sup></p><p>إذن <span class="math">n=3</span>.</p>`,
    detailedSolution: `<div class="detailed-solution"><p><strong>1) ما المطلوب؟</strong> نحسب أول حدين بعد <span class="math">U_0</span>.</p><p class="math-equation">U<sub>1</sub>=-5, &nbsp; U<sub>2</sub>=-17</p><p><strong>2) ما المطلوب؟</strong> نثبت أن <span class="math">V_n=U_n-1</span> هندسية.</p><p><strong>الفكرة المستعملة:</strong> العدد <span class="math">1</span> ثابت في العلاقة، وطرحه من <span class="math">U_n</span> يحذف الحد المستقل.</p><p class="math-equation">V<sub>n+1</sub>=3V<sub>n</sub></p><p>إذن <span class="math">q=3</span>، <span class="math">V_0=-2</span>، و<span class="math">V_n=-2×3^n</span>. ومنه <span class="math">U_n=1-2×3^n</span>.</p><p><strong>3) ما المطلوب؟</strong> نستخرج الفرق ونحدد الرتابة.</p><p class="math-equation">U<sub>n+1</sub>-U<sub>n</sub>=-4×3<sup>n</sup></p><p>الفرق سالب دائما، إذن المتتالية متناقصة تماما.</p><p><strong>4) ما المطلوب؟</strong> نحل معادلة على مجموع الحدود.</p><p class="math-equation">U<sub>0</sub>+...+U<sub>n</sub>=n+2-3<sup>n+1</sup></p><p>بالمساواة مع <span class="math">n-79</span> نحصل على <span class="math">3^{n+1}=81=3^4</span>، إذن <span class="math">n=3</span>.</p><p class="pedagogy-summary"><strong>خلاصة المسار:</strong> طرحنا العدد الثابت <span class="math">1</span> لتحويل العلاقة إلى هندسية، ثم استعملنا العبارة الصريحة لحساب الفرق والمجموع وتحديد <span class="math">n</span>.</p></div>`,
    conceptHints: [
      { title: "المتتالية المساعدة", hint: "احسب V_{n+1}=U_{n+1}-1، ثم عوض U_{n+1} حتى تظهر V_n." },
      { title: "رتابة المتتالية", hint: "بعد إيجاد U_n، احسب U_{n+1}-U_n وادرس إشارته." },
      { title: "حساب المجموع", hint: "اجمع U_k=1-2×3^k بفصل مجموع الثابت عن المجموع الهندسي." },
      { title: "إيجاد n", hint: "بعد تبسيط المجموع، ستبقى معادلة من نوع 3^{n+1}=عدد." }
    ]
  },  {
    id: "bac-2010-management-subject-1",
    branch: "management",
    year: "2010",
    title: "بكالوريا 2010 - تسيير واقتصاد - الموضوع الأول",
    statementHtml: `<div class="bac-statement"><p><strong>التمرين: المجاميع والمتتاليات</strong></p><ol><li>احسب بدلالة <span class="math">n</span> المجموع <span class="math">S<sub>n</sub></span> حيث:</li></ol><p class="math-equation">S<sub>n</sub>=1+e+e<sup>2</sup>+...+e<sup>n</sup></p><p><span class="math">S<sub>n</sub></span> هو مجموع حدود متتالية هندسية أساسها <span class="math">e</span> وحدها الأول <span class="math">1</span>، و<span class="math">e</span> يرمز إلى أساس اللوغاريتم النيبيري.</p><ol start="2"><li>لتكن المتتالية العددية <span class="math">(w<sub>n</sub>)</span> المعرفة على <span class="math">ℕ</span> بـ:</li></ol><p class="math-equation">w<sub>n</sub>=2n+4+e<sup>n</sup></p><p>بين أن <span class="math">w<sub>n</sub>=u<sub>n</sub>+v<sub>n</sub></span> حيث <span class="math">(u<sub>n</sub>)</span> متتالية حسابية و<span class="math">(v<sub>n</sub>)</span> متتالية هندسية، يطلب تعيين الحد الأول والأساس لكل منهما.</p><ol start="3"><li>أثبت أنه من أجل كل عدد طبيعي <span class="math">n</span>:</li></ol><p class="math-equation">4+6+8+...+(2n+4)=(n+1)(n+4)</p><ol start="4"><li>استنتج المجموع <span class="math">S</span> بدلالة <span class="math">n</span> حيث:</li></ol><p class="math-equation">S=w<sub>0</sub>+w<sub>1</sub>+...+w<sub>n</sub></p></div>`,
    quickSolution: `<p><strong>1)</strong> <span class="math">S<sub>n</sub>=(e<sup>n+1</sup>-1)/(e-1)</span>.</p><p><strong>2)</strong> <span class="math">u<sub>n</sub>=2n+4</span>: حسابية، <span class="math">u<sub>0</sub>=4</span> وأساسها <span class="math">2</span>. و<span class="math">v<sub>n</sub>=e<sup>n</sup></span>: هندسية، <span class="math">v<sub>0</sub>=1</span> وأساسها <span class="math">e</span>.</p><p><strong>3)</strong> <span class="math">4+6+...+(2n+4)=(n+1)(n+4)</span>.</p><p><strong>4)</strong> <span class="math">S=(n+1)(n+4)+(e<sup>n+1</sup>-1)/(e-1)</span>.</p>`,
    solution: `<p><strong>1)</strong> المجموع <span class="math">S_n</span> هندسي حدّه الأول <span class="math">1</span> وأساسه <span class="math">e</span>. إذن:</p><p class="math-equation">S<sub>n</sub>=1+e+...+e<sup>n</sup>=(e<sup>n+1</sup>-1)/(e-1)</p><p><strong>2)</strong> نكتب:</p><p class="math-equation">w<sub>n</sub>=2n+4+e<sup>n</sup>=(2n+4)+e<sup>n</sup></p><p>نضع <span class="math">u_n=2n+4</span> و<span class="math">v_n=e^n</span>. عندئذ <span class="math">(u_n)</span> حسابية حدها الأول <span class="math">u_0=4</span> وأساسها <span class="math">2</span>، و<span class="math">(v_n)</span> هندسية حدها الأول <span class="math">v_0=1</span> وأساسها <span class="math">e</span>.</p><p><strong>3)</strong> المجموع <span class="math">4+6+...+(2n+4)</span> هو مجموع حدود <span class="math">u_k=2k+4</span> من <span class="math">k=0</span> إلى <span class="math">n</span>. عدد الحدود <span class="math">n+1</span>، والحد الأول <span class="math">4</span> والأخير <span class="math">2n+4</span>. إذن:</p><p class="math-equation">4+6+...+(2n+4)=(n+1)(4+2n+4)/2=(n+1)(n+4)</p><p><strong>4)</strong></p><p class="math-equation">S=Σ<sub>k=0</sub><sup>n</sup>w<sub>k</sub>=Σ<sub>k=0</sub><sup>n</sup>(2k+4)+Σ<sub>k=0</sub><sup>n</sup>e<sup>k</sup></p><p>وباستخدام النتيجتين السابقتين:</p><p class="math-equation">S=(n+1)(n+4)+(e<sup>n+1</sup>-1)/(e-1)</p>`,
    detailedSolution: `<div class="detailed-solution"><p><strong>1) ما المطلوب؟</strong> حساب مجموع هندسي من <span class="math">1</span> إلى <span class="math">e^n</span>.</p><p><strong>الفكرة المستعملة:</strong> نستعمل صيغة مجموع الحدود الهندسية، لأن كل حد يساوي السابق مضروبا في <span class="math">e</span>.</p><p class="math-equation">S<sub>n</sub>=(e<sup>n+1</sup>-1)/(e-1)</p><p><strong>2) ما المطلوب؟</strong> نفكك <span class="math">w_n</span> إلى جزء حسابي وجزء هندسي.</p><p><strong>التطبيق:</strong> نأخذ <span class="math">u_n=2n+4</span> و<span class="math">v_n=e^n</span>. عندها <span class="math">u_0=4</span> وأساس الحسابية <span class="math">2</span>، أما <span class="math">v_0=1</span> وأساس الهندسية <span class="math">e</span>.</p><p><strong>3) ما المطلوب؟</strong> إثبات صيغة مجموع الحدود الحسابية.</p><p><strong>الفكرة المستعملة:</strong> عدد الحدود من <span class="math">4</span> إلى <span class="math">2n+4</span> هو <span class="math">n+1</span>، ونستعمل صيغة مجموع حسابي.</p><p class="math-equation">4+6+...+(2n+4)=(n+1)(n+4)</p><p><strong>4) ما المطلوب؟</strong> حساب مجموع <span class="math">w_k</span>.</p><p><strong>الفكرة المستعملة:</strong> نجمع الجزء الحسابي والجزء الهندسي كل واحد على حدة.</p><p class="math-equation">S=(n+1)(n+4)+(e<sup>n+1</sup>-1)/(e-1)</p><p class="pedagogy-summary"><strong>خلاصة المسار:</strong> بدأنا بمجموع هندسي، ثم فككنا <span class="math">w_n</span> إلى متتالية حسابية وأخرى هندسية، فصار مجموع <span class="math">w_n</span> مجموعين معروفين.</p></div>`,
    conceptHints: [
      { title: "مجموع هندسي", hint: "حدد الحد الأول والأساس وعدد الحدود قبل تطبيق صيغة المجموع." },
      { title: "تفكيك w_n", hint: "افصل الجزء الخطي 2n+4 عن الجزء الأسي e^n." },
      { title: "مجموع حسابي", hint: "عدد الحدود من 4 إلى 2n+4 هو n+1، واستعمل متوسط الحدين الأول والأخير." },
      { title: "تفكيك المجموع", hint: "اكتب w_k=u_k+v_k، ثم اجمع كل جزء بصيغته المناسبة." }
    ]
  },
  {
    id: "bac-2010-management-subject-2",
    branch: "management",
    year: "2010",
    title: "بكالوريا 2010 - تسيير واقتصاد - الموضوع الثاني",
    statementHtml: `<div class="bac-statement"><p><strong>التمرين: المتتاليات العددية</strong></p><p>لتكن المتتالية العددية <span class="math">(u<sub>n</sub>)</span> المعرفة بـ <span class="math">u<sub>0</sub>=1</span>، ومن أجل كل عدد طبيعي <span class="math">n</span>:</p><p class="math-equation">u<sub>n+1</sub>=(3u<sub>n</sub>+2)/4</p><ol><li>احسب الحدود <span class="math">u<sub>1</sub></span>، <span class="math">u<sub>2</sub></span> و<span class="math">u<sub>3</sub></span>.</li><li><ol type="أ"><li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n</sub>&lt;2</span>.</li><li>بين أن المتتالية <span class="math">(u<sub>n</sub>)</span> متزايدة تماما.</li><li>استنتج أن المتتالية <span class="math">(u<sub>n</sub>)</span> متقاربة.</li></ol></li><li>نعتبر المتتالية <span class="math">(v<sub>n</sub>)</span> المعرفة بـ <span class="math">v<sub>n</sub>=u<sub>n</sub>-2</span>.<ol type="أ"><li>بين أن <span class="math">(v<sub>n</sub>)</span> متتالية هندسية يطلب تحديد أساسها وحدها الأول.</li><li>اكتب <span class="math">v<sub>n</sub></span> بدلالة <span class="math">n</span>، ثم استنتج <span class="math">u<sub>n</sub>=2-(3/4)<sup>n</sup></span>.</li><li>ما هي نهاية <span class="math">(u<sub>n</sub>)</span>؟</li></ol></li><li>احسب بدلالة <span class="math">n</span> المجموع <span class="math">S<sub>n</sub></span> حيث <span class="math">S<sub>n</sub>=v<sub>0</sub>+...+v<sub>n</sub></span>، واستنتج أن:</li></ol><p class="math-equation">u<sub>0</sub>+u<sub>1</sub>+...+u<sub>n</sub>=3(3/4)<sup>n</sup>+2n-2</p></div>`,
    quickSolution: `<p><strong>1)</strong> <span class="math">u<sub>1</sub>=5/4</span>، <span class="math">u<sub>2</sub>=23/16</span>، <span class="math">u<sub>3</sub>=101/64</span>.</p><p><strong>2)</strong> <span class="math">u_n&lt;2</span>، و<span class="math">u_{n+1}-u_n=(2-u_n)/4&gt;0</span>، إذن متزايدة ومتقاربة.</p><p><strong>3)</strong> <span class="math">v_0=-1</span>، أساسها <span class="math">3/4</span>، <span class="math">v_n=-(3/4)^n</span>، <span class="math">u_n=2-(3/4)^n</span>، و<span class="math">lim u_n=2</span>.</p><p><strong>4)</strong> <span class="math">S_n=-4(1-(3/4)^{n+1})</span>، و<span class="math">u_0+...+u_n=3(3/4)^n+2n-2</span>.</p>`,
    solution: `<p><strong>1)</strong> <span class="math">u_1=5/4</span>، <span class="math">u_2=23/16</span>، <span class="math">u_3=101/64</span>.</p><p><strong>2-أ)</strong> إذا كان <span class="math">u_n&lt;2</span> فإن <span class="math">u_{n+1}=(3u_n+2)/4&lt;2</span>، ومع <span class="math">u_0=1&lt;2</span> يثبت الحصر بالتراجع.</p><p><strong>2-ب)</strong> <span class="math">u_{n+1}-u_n=(2-u_n)/4&gt;0</span>، إذن <span class="math">(u_n)</span> متزايدة تماما.</p><p><strong>2-ج)</strong> هي متزايدة ومحدودة من الأعلى بـ <span class="math">2</span>، إذن متقاربة.</p><p><strong>3-أ)</strong> بما أن <span class="math">v_n=u_n-2</span>:</p><p class="math-equation">v<sub>n+1</sub>=u<sub>n+1</sub>-2=(3/4)(u<sub>n</sub>-2)=(3/4)v<sub>n</sub></p><p>إذن <span class="math">(v_n)</span> هندسية أساسها <span class="math">3/4</span> وحدها الأول <span class="math">v_0=-1</span>.</p><p><strong>3-ب)</strong> <span class="math">v_n=-(3/4)^n</span>، ومنه <span class="math">u_n=2-(3/4)^n</span>.</p><p><strong>3-ج)</strong> بما أن <span class="math">(3/4)^n→0</span> فإن <span class="math">lim u_n=2</span>.</p><p><strong>4)</strong></p><p class="math-equation">S<sub>n</sub>=Σ[-(3/4)^k]=-4(1-(3/4)<sup>n+1</sup>)</p><p>وبما أن <span class="math">u_k=v_k+2</span>:</p><p class="math-equation">u<sub>0</sub>+...+u<sub>n</sub>=S<sub>n</sub>+2(n+1)=3(3/4)<sup>n</sup>+2n-2</p>`,
    detailedSolution: `<div class="detailed-solution"><p><strong>1) ما المطلوب؟</strong> نحسب الحدود الأولى بالتعويض المباشر.</p><p class="math-equation">u<sub>1</sub>=5/4, &nbsp; u<sub>2</sub>=23/16, &nbsp; u<sub>3</sub>=101/64</p><p><strong>2) ما المطلوب؟</strong> نثبت الحصر <span class="math">u_n&lt;2</span> ثم نستعمله للرتابة والتقارب.</p><p>إذا كان <span class="math">u_n&lt;2</span> فإن <span class="math">u_{n+1}&lt;2</span>. كما أن:</p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=(2-u<sub>n</sub>)/4</p><p>إذن الفرق موجب، والمتتالية متزايدة ومحدودة من الأعلى، فهي متقاربة.</p><p><strong>3) ما المطلوب؟</strong> نستعمل <span class="math">v_n=u_n-2</span> للحصول على متتالية هندسية.</p><p class="math-equation">v<sub>n+1</sub>=(3/4)v<sub>n</sub></p><p>إذن <span class="math">v_0=-1</span> و<span class="math">v_n=-(3/4)^n</span>، ومنه <span class="math">u_n=2-(3/4)^n</span> و<span class="math">lim u_n=2</span>.</p><p><strong>4) ما المطلوب؟</strong> نحسب مجموع <span class="math">v_k</span> ثم نضيف <span class="math">2</span> بعدد الحدود.</p><p class="math-equation">S<sub>n</sub>=-4(1-(3/4)<sup>n+1</sup>)</p><p class="math-equation">u<sub>0</sub>+...+u<sub>n</sub>=S_n+2(n+1)=3(3/4)^n+2n-2</p><p class="pedagogy-summary"><strong>خلاصة المسار:</strong> حصرنا المتتالية تحت العدد الثابت <span class="math">2</span>، ثم طرحناه للحصول على متتالية هندسية، وبعدها استعملنا مجموع <span class="math">v_n</span> لاستخراج مجموع <span class="math">u_n</span>.</p></div>`,
    conceptHints: [
      { title: "الحصر بالتراجع", hint: "افترض u_n<2، ثم عوض في العلاقة لإثبات أن u_{n+1}<2." },
      { title: "رتابة المتتالية", hint: "احسب u_{n+1}-u_n واكتبه بدلالة 2-u_n." },
      { title: "المتتالية المساعدة", hint: "اطرح العدد الثابت 2 من u_n ثم احسب v_{n+1}." },
      { title: "حساب المجموع", hint: "احسب أولا مجموع v_n الهندسي، ثم استعمل u_n=v_n+2." }
    ]
  },  {
    id: "bac-2011-management-subject-2",
    branch: "management",
    year: "2011",
    title: "بكالوريا 2011 - تسيير واقتصاد - الموضوع الثاني",
    statementHtml: `<div class="bac-statement"><p><strong>التمرين: المتتاليات العددية</strong></p><p>لتكن المتتالية العددية <span class="math">(u<sub>n</sub>)</span> حيث <span class="math">u<sub>0</sub>=1/2</span>، ومن أجل كل عدد طبيعي <span class="math">n</span>:</p><p class="math-equation">u<sub>n+1</sub>=2/5 u<sub>n</sub>+1/5</p><ol><li>احسب <span class="math">u<sub>1</sub></span> و<span class="math">u<sub>2</sub></span>.</li><li>بين أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n</sub>&gt;1/3</span>.</li><li>بين أن المتتالية <span class="math">(u<sub>n</sub>)</span> متناقصة تماما ثم استنتج أنها متقاربة.</li><li>لتكن المتتالية <span class="math">(v<sub>n</sub>)</span> حيث من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">v<sub>n</sub>=u<sub>n</sub>-1/3</span>.<ol type="أ"><li>بين أن <span class="math">(v<sub>n</sub>)</span> متتالية هندسية يطلب تحديد أساسها وحدها الأول.</li><li>اكتب كلا من <span class="math">v<sub>n</sub></span> و<span class="math">u<sub>n</sub></span> بدلالة <span class="math">n</span>.</li><li>احسب نهاية المتتالية <span class="math">(u<sub>n</sub>)</span>.</li></ol></li></ol></div>`,
    quickSolution: `<p><strong>1)</strong> <span class="math">u<sub>1</sub>=2/5</span> و<span class="math">u<sub>2</sub>=9/25</span>.</p><p><strong>2)</strong> لكل <span class="math">n</span>: <span class="math">u<sub>n</sub>&gt;1/3</span>.</p><p><strong>3)</strong> <span class="math">u<sub>n+1</sub>-u<sub>n</sub>=-3/5(u<sub>n</sub>-1/3)&lt;0</span>، إذن <span class="math">(u_n)</span> متناقصة تماما ومتقاربة.</p><p><strong>4)</strong> <span class="math">v<sub>0</sub>=1/6</span>، أساسها <span class="math">2/5</span>، <span class="math">v<sub>n</sub>=1/6(2/5)<sup>n</sup></span>، <span class="math">u<sub>n</sub>=1/3+1/6(2/5)<sup>n</sup></span>، و<span class="math">lim u<sub>n</sub>=1/3</span>.</p>`,
    solution: `<p><strong>1)</strong></p><p class="math-equation">u<sub>1</sub>=(2/5)(1/2)+1/5=2/5</p><p class="math-equation">u<sub>2</sub>=(2/5)(2/5)+1/5=9/25</p><p><strong>2)</strong> نبرهن بالتراجع أن <span class="math">u_n&gt;1/3</span>. عند <span class="math">n=0</span>: <span class="math">1/2&gt;1/3</span>. نفرض <span class="math">u_n&gt;1/3</span>، فنجد:</p><p class="math-equation">u<sub>n+1</sub>=(2/5)u<sub>n</sub>+1/5&gt;(2/5)(1/3)+1/5=1/3</p><p>إذن <span class="math">u_n&gt;1/3</span> لكل <span class="math">n</span>.</p><p><strong>3)</strong></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=(2/5)u<sub>n</sub>+1/5-u<sub>n</sub>=-3/5(u<sub>n</sub>-1/3)</p><p>وبما أن <span class="math">u_n&gt;1/3</span>، فإن الفرق سالب، إذن <span class="math">(u_n)</span> متناقصة تماما. وهي محدودة من الأسفل بـ <span class="math">1/3</span>، لذلك فهي متقاربة.</p><p><strong>4-أ)</strong> بما أن <span class="math">v_n=u_n-1/3</span>، فإن:</p><p class="math-equation">v<sub>n+1</sub>=u<sub>n+1</sub>-1/3=(2/5)u<sub>n</sub>+1/5-1/3=(2/5)(u<sub>n</sub>-1/3)=(2/5)v<sub>n</sub></p><p>إذن <span class="math">(v_n)</span> هندسية أساسها <span class="math">2/5</span> وحدها الأول <span class="math">v_0=1/2-1/3=1/6</span>.</p><p><strong>4-ب)</strong></p><p class="math-equation">v<sub>n</sub>=1/6(2/5)<sup>n</sup></p><p>ومنه:</p><p class="math-equation">u<sub>n</sub>=1/3+1/6(2/5)<sup>n</sup></p><p><strong>4-ج)</strong> بما أن <span class="math">0&lt;2/5&lt;1</span> فإن <span class="math">(2/5)^n→0</span>، وبالتالي:</p><p class="math-equation">lim u<sub>n</sub>=1/3</p>`,
    detailedSolution: `<div class="detailed-solution"><p><strong>1) ما المطلوب؟</strong> نحسب الحدين الأولين بالتعويض في العلاقة.</p><p class="math-equation">u<sub>1</sub>=2/5, &nbsp; u<sub>2</sub>=9/25</p><p><strong>2) ما المطلوب؟</strong> نثبت أن كل الحدود تبقى أكبر من <span class="math">1/3</span>.</p><p><strong>الفكرة المستعملة:</strong> العلاقة تراجعية، لذلك نستعمل البرهان بالتراجع. العدد <span class="math">1/3</span> ثابت في العلاقة لأنه يحقق <span class="math">1/3=(2/5)(1/3)+1/5</span>.</p><p>إذا كان <span class="math">u_n&gt;1/3</span> فإن:</p><p class="math-equation">u<sub>n+1</sub>&gt;(2/5)(1/3)+1/5=1/3</p><p><strong>3) ما المطلوب؟</strong> ندرس الرتابة ثم نستنتج التقارب.</p><p><strong>الفكرة المستعملة:</strong> نحسب الفرق ونستعمل الحصر السابق.</p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=-3/5(u<sub>n</sub>-1/3)</p><p>الفرق سالب لأن <span class="math">u_n&gt;1/3</span>، إذن المتتالية متناقصة ومحدودة من الأسفل، فهي متقاربة.</p><p><strong>4) ما المطلوب؟</strong> نحول العلاقة إلى هندسية بواسطة <span class="math">v_n=u_n-1/3</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">v<sub>n+1</sub>=(2/5)v<sub>n</sub></p><p>إذن <span class="math">v_0=1/6</span> و<span class="math">v_n=1/6(2/5)^n</span>. وبالرجوع إلى <span class="math">u_n</span>:</p><p class="math-equation">u<sub>n</sub>=1/3+1/6(2/5)<sup>n</sup></p><p>وبما أن <span class="math">(2/5)^n→0</span> فإن <span class="math">lim u_n=1/3</span>.</p><p class="pedagogy-summary"><strong>خلاصة المسار:</strong> أثبتنا الحصر حول العدد الثابت <span class="math">1/3</span>، ثم استعملناه للرتابة والتقارب. أخيرا طرحنا العدد الثابت للحصول على متتالية هندسية وعبارة صريحة.</p></div>`,
    conceptHints: [
      { title: "الحصر بالتراجع", hint: "تحقق من u_0، ثم افترض u_n>1/3 واستعمل العلاقة لإثبات أن الحد التالي يبقى أكبر من 1/3." },
      { title: "رتابة المتتالية", hint: "احسب u_{n+1}-u_n واكتبه بدلالة u_n-1/3." },
      { title: "التقارب", hint: "بعد إثبات التناقص، استعمل الحصر من الأسفل بـ 1/3." },
      { title: "المتتالية المساعدة", hint: "اطرح العدد الثابت 1/3 من u_n ثم احسب v_{n+1}." }
    ]
  },  {
    id: "bac-2012-management-subject-1",
    branch: "management",
    year: "2012",
    title: "بكالوريا 2012 - تسيير واقتصاد - الموضوع الأول",
    statementHtml: `<div class="bac-statement"><p><strong>التمرين: المتتاليات العددية</strong></p><p>لتكن المتتالية العددية <span class="math">(u<sub>n</sub>)</span> المعرفة بـ <span class="math">u<sub>0</sub>=1</span>، ومن أجل كل عدد طبيعي <span class="math">n</span>:</p><p class="math-equation">u<sub>n+1</sub>=(3u<sub>n</sub>+4)/9</p><ol><li><ol type="أ"><li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n</sub>&gt;2/3</span>.</li><li>بين أن المتتالية <span class="math">(u<sub>n</sub>)</span> متناقصة.</li></ol></li><li>نعتبر المتتالية <span class="math">(v<sub>n</sub>)</span> المعرفة من أجل كل عدد طبيعي <span class="math">n</span> بـ: <span class="math">v<sub>n</sub>=u<sub>n</sub>-2/3</span>.<ol type="أ"><li>بين أن <span class="math">(v<sub>n</sub>)</span> متتالية هندسية، يطلب تحديد أساسها وحدها الأول.</li><li>اكتب <span class="math">v<sub>n</sub></span> بدلالة <span class="math">n</span>، ثم استنتج أنه من أجل كل عدد طبيعي <span class="math">n</span>:</li></ol></li></ol><p class="math-equation">u<sub>n</sub>=1/3[(1/3)<sup>n</sup>+2]</p><ol start="2" type="أ"><li>ما هي نهاية المتتالية <span class="math">(u<sub>n</sub>)</span>؟</li></ol><ol start="3"><li>احسب بدلالة <span class="math">n</span> المجموع <span class="math">S<sub>n</sub></span> حيث:</li></ol><p class="math-equation">S<sub>n</sub>=u<sub>0</sub>+u<sub>1</sub>+u<sub>2</sub>+...+u<sub>n</sub></p></div>`,
    quickSolution: `<p><strong>1)</strong> لكل <span class="math">n</span>: <span class="math">u<sub>n</sub>&gt;2/3</span>. كما أن <span class="math">u<sub>n+1</sub>-u<sub>n</sub>=-2/3(u<sub>n</sub>-2/3)&lt;0</span>، إذن <span class="math">(u_n)</span> متناقصة.</p><p><strong>2)</strong> <span class="math">v<sub>0</sub>=1/3</span>، أساسها <span class="math">1/3</span>، <span class="math">v<sub>n</sub>=(1/3)<sup>n+1</sup></span>، و<span class="math">u<sub>n</sub>=1/3[(1/3)<sup>n</sup>+2]</span>. النهاية <span class="math">2/3</span>.</p><p><strong>3)</strong> <span class="math">S<sub>n</sub>=2(n+1)/3+1/2(1-(1/3)<sup>n+1</sup>)</span>.</p>`,
    solution: `<p><strong>1-أ)</strong> نبرهن بالتراجع أن <span class="math">u_n&gt;2/3</span>. عند <span class="math">n=0</span>: <span class="math">u_0=1&gt;2/3</span>. نفرض أن <span class="math">u_n&gt;2/3</span>. عندئذ:</p><p class="math-equation">u<sub>n+1</sub>=(3u<sub>n</sub>+4)/9&gt;(3×2/3+4)/9=6/9=2/3</p><p>إذن <span class="math">u_n&gt;2/3</span> لكل <span class="math">n</span>.</p><p><strong>1-ب)</strong></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=(3u<sub>n</sub>+4)/9-u<sub>n</sub>=(4-6u<sub>n</sub>)/9=-2/3(u<sub>n</sub>-2/3)</p><p>وبما أن <span class="math">u_n&gt;2/3</span>، فالفرق سالب، إذن <span class="math">(u_n)</span> متناقصة.</p><p><strong>2-أ)</strong> لدينا <span class="math">v_n=u_n-2/3</span>، ومنه:</p><p class="math-equation">v<sub>n+1</sub>=u<sub>n+1</sub>-2/3=(3u<sub>n</sub>+4)/9-2/3=(u<sub>n</sub>-2/3)/3=1/3v<sub>n</sub></p><p>إذن <span class="math">(v_n)</span> هندسية أساسها <span class="math">1/3</span> وحدها الأول <span class="math">v_0=1-2/3=1/3</span>.</p><p><strong>2-ب)</strong></p><p class="math-equation">v<sub>n</sub>=v<sub>0</sub>(1/3)<sup>n</sup>=(1/3)<sup>n+1</sup></p><p>ومنه:</p><p class="math-equation">u<sub>n</sub>=v<sub>n</sub>+2/3=(1/3)<sup>n+1</sup>+2/3=1/3[(1/3)<sup>n</sup>+2]</p><p><strong>2-ج)</strong> بما أن <span class="math">(1/3)^n→0</span>، فإن <span class="math">lim u_n=2/3</span>.</p><p><strong>3)</strong></p><p class="math-equation">S<sub>n</sub>=Σ<sub>k=0</sub><sup>n</sup>[2/3+(1/3)<sup>k+1</sup>]</p><p class="math-equation">S<sub>n</sub>=2(n+1)/3+(1/3)(1-(1/3)<sup>n+1</sup>)/(1-1/3)</p><p class="math-equation">S<sub>n</sub>=2(n+1)/3+1/2(1-(1/3)<sup>n+1</sup>)</p>`,
    detailedSolution: `<div class="detailed-solution"><p><strong>1) ما المطلوب؟</strong> نثبت أن الحدود تبقى أكبر من <span class="math">2/3</span>، ثم نستعمل ذلك لدراسة الرتابة.</p><p><strong>الفكرة المستعملة:</strong> العدد <span class="math">2/3</span> ثابت في العلاقة، لذلك يظهر طبيعيا في الحصر والفرق.</p><p><strong>التطبيق:</strong> عند <span class="math">n=0</span> الحصر صحيح. وإذا كان <span class="math">u_n&gt;2/3</span> فإن:</p><p class="math-equation">u<sub>n+1</sub>&gt;(3×2/3+4)/9=2/3</p><p>ثم:</p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=-2/3(u<sub>n</sub>-2/3)</p><p>وهذا الفرق سالب، إذن المتتالية متناقصة.</p><p><strong>2) ما المطلوب؟</strong> نستعمل <span class="math">v_n=u_n-2/3</span> لتحويل العلاقة إلى هندسية.</p><p><strong>الفكرة المستعملة:</strong> طرح العدد الثابت من <span class="math">u_n</span> يلغي الحد الثابت في العلاقة التراجعية.</p><p class="math-equation">v<sub>n+1</sub>=u<sub>n+1</sub>-2/3=1/3(u<sub>n</sub>-2/3)=1/3v<sub>n</sub></p><p>إذن <span class="math">v_0=1/3</span> و<span class="math">v_n=(1/3)^{n+1}</span>. ومنه:</p><p class="math-equation">u<sub>n</sub>=1/3[(1/3)^n+2]</p><p>وبما أن <span class="math">(1/3)^n→0</span>، فإن <span class="math">lim u_n=2/3</span>.</p><p><strong>3) ما المطلوب؟</strong> نحسب مجموع الحدود من <span class="math">0</span> إلى <span class="math">n</span>.</p><p><strong>الفكرة المستعملة:</strong> نفصل في <span class="math">u_k</span> بين الثابت <span class="math">2/3</span> والحد الهندسي <span class="math">(1/3)^{k+1}</span>.</p><p class="math-equation">S<sub>n</sub>=2(n+1)/3+1/2(1-(1/3)<sup>n+1</sup>)</p><p class="pedagogy-summary"><strong>خلاصة المسار:</strong> أثبتنا الحصر والرتابة حول العدد الثابت <span class="math">2/3</span>، ثم طرحناه للحصول على متتالية هندسية، واستعملنا العبارة الصريحة لحساب النهاية والمجموع.</p></div>`,
    conceptHints: [
      { title: "الحصر بالتراجع", hint: "ابدأ من u_0، ثم افترض u_n>2/3 واستعمل العلاقة لإثبات أن u_{n+1}>2/3." },
      { title: "رتابة المتتالية", hint: "احسب u_{n+1}-u_n وحاول كتابته بدلالة u_n-2/3." },
      { title: "المتتالية المساعدة", hint: "اطرح العدد الثابت 2/3 من u_n، ثم احسب v_{n+1}." },
      { title: "حساب المجموع", hint: "اكتب u_k على شكل ثابت زائد حد هندسي، ثم اجمع كل جزء على حدة." }
    ]
  },
  {
    id: "bac-2012-management-subject-2",
    branch: "management",
    year: "2012",
    title: "بكالوريا 2012 - تسيير واقتصاد - الموضوع الثاني",
    statementHtml: `<div class="bac-statement"><p><strong>التمرين: متتالية مالية</strong></p><p>في بداية جانفي <span class="math">2008</span> وضع شخص مبلغا قدره <span class="math">50000 DA</span> في صندوق التوفير والاحتياط. يقدم الصندوق فائدة قدرها <span class="math">5%</span> سنويا. يسحب هذا الشخص في نهاية كل سنة مبلغا قدره <span class="math">5000 DA</span> بعد حساب الفوائد.</p><p>نرمز بـ <span class="math">u<sub>n</sub></span> إلى المبلغ الذي يملكه هذا الشخص في حسابه بداية جانفي من السنة <span class="math">2008+n</span>.</p><ol><li><ol type="أ"><li>احسب كلا من <span class="math">u<sub>0</sub></span>، <span class="math">u<sub>1</sub></span> و<span class="math">u<sub>2</sub></span>.</li><li>هل المتتالية <span class="math">(u<sub>n</sub>)</span> هندسية؟ هل هي حسابية؟ برر إجابتك.</li><li>بين لماذا من أجل كل عدد طبيعي <span class="math">n</span> لدينا: <span class="math">u<sub>n+1</sub>=1.05u<sub>n</sub>-5000</span>.</li></ol></li><li>نضع <span class="math">v<sub>n</sub>=u<sub>n</sub>-100000</span>.<ol type="أ"><li>بين أن <span class="math">(v<sub>n</sub>)</span> متتالية هندسية، حدد أساسها وحدها الأول.</li><li>اكتب <span class="math">v<sub>n</sub></span> بدلالة <span class="math">n</span>، ثم استنتج <span class="math">u<sub>n</sub>=-50000(1.05)<sup>n</sup>+100000</span>.</li></ol></li><li><ol type="أ"><li>ما هو المبلغ الذي يكون في حساب هذا الشخص نهاية عام <span class="math">2015</span>؟</li><li>ابتداء من أية سنة لا تسمح إدارة الصندوق لهذا الشخص بسحب المبلغ المعتاد في نهاية كل سنة؟</li></ol></li></ol></div>`,
    quickSolution: `<p><strong>1)</strong> <span class="math">u<sub>0</sub>=50000</span>، <span class="math">u<sub>1</sub>=47500</span>، <span class="math">u<sub>2</sub>=44875</span>. المتتالية ليست هندسية ولا حسابية، و<span class="math">u<sub>n+1</sub>=1.05u<sub>n</sub>-5000</span>.</p><p><strong>2)</strong> <span class="math">v<sub>0</sub>=-50000</span>، أساسها <span class="math">1.05</span>، <span class="math">v<sub>n</sub>=-50000(1.05)<sup>n</sup></span>، و<span class="math">u<sub>n</sub>=100000-50000(1.05)<sup>n</sup></span>.</p><p><strong>3)</strong> نهاية 2015: <span class="math">u<sub>8</sub>≈26127.72 DA</span>. لا يسمح بالسحب المعتاد ابتداء من نهاية سنة <span class="math">2022</span>، أي عمليا من سنة <span class="math">2023</span>.</p>`,
    solution: `<p><strong>1-أ)</strong> <span class="math">u_0=50000</span>.</p><p class="math-equation">u<sub>1</sub>=1.05×50000-5000=47500</p><p class="math-equation">u<sub>2</sub>=1.05×47500-5000=44875</p><p><strong>1-ب)</strong> الفروقان <span class="math">u_1-u_0=-2500</span> و<span class="math">u_2-u_1=-2625</span> غير متساويين، فليست حسابية. والنسبتان <span class="math">u_1/u_0=0.95</span> و<span class="math">u_2/u_1≈0.9447</span> غير متساويتين، فليست هندسية.</p><p><strong>1-ج)</strong> بعد الفائدة يصبح المبلغ <span class="math">1.05u_n</span>، ثم يسحب <span class="math">5000</span>، لذلك:</p><p class="math-equation">u<sub>n+1</sub>=1.05u<sub>n</sub>-5000</p><p><strong>2-أ)</strong></p><p class="math-equation">v<sub>n+1</sub>=u<sub>n+1</sub>-100000=1.05u<sub>n</sub>-105000=1.05(u<sub>n</sub>-100000)=1.05v<sub>n</sub></p><p>إذن <span class="math">(v_n)</span> هندسية أساسها <span class="math">1.05</span> وحدها الأول <span class="math">v_0=-50000</span>.</p><p><strong>2-ب)</strong></p><p class="math-equation">v<sub>n</sub>=-50000(1.05)<sup>n</sup>, &nbsp; u<sub>n</sub>=100000-50000(1.05)<sup>n</sup></p><p><strong>3-أ)</strong> نهاية 2015 توافق بداية جانفي 2016، أي <span class="math">n=8</span>:</p><p class="math-equation">u<sub>8</sub>=100000-50000(1.05)<sup>8</sup>≈26127.72</p><p><strong>3-ب)</strong> لكي يستطيع السحب يجب أن يكون المبلغ بعد الفائدة على الأقل <span class="math">5000</span>. نجد <span class="math">u_{13}≈5717.14</span> و<span class="math">u_{14}≈103.42</span>، لذلك بعد فائدة سنة <span class="math">2022</span> لا يكفي المبلغ لسحب <span class="math">5000</span>. ابتداء من سنة <span class="math">2023</span> لا يكون السحب السنوي المعتاد ممكنا.</p>`,
    detailedSolution: `<div class="detailed-solution"><p><strong>1) ما المطلوب؟</strong> نحسب المبالغ الأولى ونترجم العملية المالية إلى علاقة تراجعية.</p><p><strong>الفكرة المستعملة:</strong> الفائدة <span class="math">5%</span> تعني الضرب في <span class="math">1.05</span>، وبعدها يطرح مبلغ السحب.</p><p class="math-equation">u<sub>0</sub>=50000, &nbsp; u<sub>1</sub>=47500, &nbsp; u<sub>2</sub>=44875</p><p>الفروق والنسب الأولى غير ثابتة، إذن المتتالية ليست حسابية ولا هندسية. والعلاقة هي <span class="math">u_{n+1}=1.05u_n-5000</span>.</p><p><strong>2) ما المطلوب؟</strong> نحول العلاقة إلى هندسية باستعمال <span class="math">v_n=u_n-100000</span>.</p><p><strong>الفكرة المستعملة:</strong> العدد <span class="math">100000</span> ثابت في العلاقة لأنه يحقق <span class="math">L=1.05L-5000</span>.</p><p class="math-equation">v<sub>n+1</sub>=1.05v<sub>n</sub></p><p>إذن <span class="math">v_0=-50000</span> و<span class="math">u_n=100000-50000(1.05)^n</span>.</p><p><strong>3) ما المطلوب؟</strong> نحسب مبلغ نهاية 2015، ثم نحدد متى يتعذر السحب.</p><p>نهاية 2015 توافق <span class="math">u_8</span> فنجد <span class="math">u_8≈26127.72</span>. وللسحب المعتاد يجب أن يكون بعد الفائدة ما لا يقل عن <span class="math">5000</span>. بما أن <span class="math">u_{13}≈5717.14</span> و<span class="math">u_{14}≈103.42</span>، فإن السحب يتعذر عند نهاية سنة <span class="math">2022</span>، أي ابتداء من سنة <span class="math">2023</span>.</p><p class="pedagogy-summary"><strong>خلاصة المسار:</strong> ترجمنا الفائدة والسحب إلى علاقة تراجعية، ثم طرحنا العدد الثابت <span class="math">100000</span> للحصول على متتالية هندسية، واستعملنا العبارة الصريحة لحساب المبلغ والسنة الحرجة.</p></div>`,
    conceptHints: [
      { title: "الترجمة المالية", hint: "أضف الفائدة أولا بالضرب في 1.05، ثم اطرح مبلغ السحب 5000." },
      { title: "ليست حسابية ولا هندسية", hint: "قارن أول فرقين وأول نسبتين باستعمال u_0 وu_1 وu_2." },
      { title: "المتتالية المساعدة", hint: "ابحث عن العدد L الذي يحقق L=1.05L-5000، ثم اطرح هذا العدد من u_n." },
      { title: "مطابقة السنة", hint: "بداية 2008 هي n=0، لذلك نهاية 2015 توافق بداية 2016 أي n=8." },
      { title: "شرط السحب", hint: "السحب يكون في نهاية السنة بعد الفائدة؛ تحقق متى يصبح 1.05u_n أقل من 5000." }
    ]
  },  {
    id: "bac-2013-management-subject-1",
    branch: "management",
    year: "2013",
    title: "بكالوريا 2013 - تسيير واقتصاد - الموضوع الأول",
    statementHtml: `<div class="bac-statement"><p><strong>التمرين: متتالية حسب وسيط</strong></p><p>المتتالية العددية <span class="math">(u<sub>n</sub>)</span> معرفة بـ <span class="math">u<sub>0</sub>=3</span>، ومن أجل كل عدد طبيعي <span class="math">n</span>:</p><p class="math-equation">u<sub>n+1</sub>=((2a+1)/3)u<sub>n</sub>-(2a+4)/3</p><p>حيث <span class="math">a</span> وسيط حقيقي.</p><ol><li>عين قيمة <span class="math">a</span> التي من أجلها تكون المتتالية <span class="math">(u_n)</span> ثابتة.</li><li>نفرض أن <span class="math">a≠5/2</span>. عين قيمة <span class="math">a</span> حتى تكون <span class="math">(u_n)</span> حسابية، ثم احسب عندئذ <span class="math">u_n</span> ومجموع <span class="math">n</span> حدا الأولى من المتتالية.</li><li>عين قيمة <span class="math">a</span> حتى تكون <span class="math">(u_n)</span> هندسية، ثم عين في هذه الحالة كلا من <span class="math">u<sub>50</sub></span> ومجموع <span class="math">50</span> حدا الأولى منها.</li><li>نفرض <span class="math">a=4</span>. برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n</sub>=3<sup>n</sup>+2</span>، ثم بين أن:</li></ol><p class="math-equation">u<sub>0</sub>+u<sub>1</sub>+...+u<sub>n</sub>=1/2(3<sup>n+1</sup>+4n+3)</p></div>`,
    quickSolution: `<p><strong>1)</strong> المتتالية ثابتة من أجل <span class="math">a=5/2</span>.</p><p><strong>2)</strong> لكي تكون حسابية غير ثابتة: <span class="math">a=1</span>، وعندها <span class="math">u<sub>n</sub>=3-2n</span> ومجموع أول <span class="math">n</span> حدود هو <span class="math">n(4-n)</span>.</p><p><strong>3)</strong> لكي تكون هندسية غير ثابتة: <span class="math">a=-2</span>، وعندها <span class="math">u<sub>n</sub>=3(-1)<sup>n</sup></span>، <span class="math">u<sub>50</sub>=3</span>، ومجموع أول <span class="math">50</span> حدا هو <span class="math">0</span>.</p><p><strong>4)</strong> إذا <span class="math">a=4</span>: <span class="math">u<sub>n</sub>=3<sup>n</sup>+2</span> و<span class="math">u<sub>0</sub>+...+u<sub>n</sub>=1/2(3<sup>n+1</sup>+4n+3)</span>.</p>`,
    solution: `<p><strong>1)</strong> حتى تكون المتتالية ثابتة وبما أن <span class="math">u_0=3</span>، يجب أن يكون <span class="math">u_1=3</span>. نحسب:</p><p class="math-equation">u<sub>1</sub>=((2a+1)/3)×3-(2a+4)/3=(4a-1)/3</p><p>ومن <span class="math">(4a-1)/3=3</span> نجد <span class="math">a=5/2</span>.</p><p><strong>2)</strong> لكي تكون حسابية غير ثابتة، يجب أن تكون العلاقة من الشكل <span class="math">u_{n+1}=u_n+r</span>، أي <span class="math">(2a+1)/3=1</span>. إذن <span class="math">a=1</span>. عندئذ:</p><p class="math-equation">u<sub>n+1</sub>=u<sub>n</sub>-2</p><p>ومنها <span class="math">u_n=3-2n</span>. ومجموع أول <span class="math">n</span> حدود، أي من <span class="math">u_0</span> إلى <span class="math">u_{n-1}</span>، هو:</p><p class="math-equation">u<sub>0</sub>+...+u<sub>n-1</sub>=n(3+3-2(n-1))/2=n(4-n)</p><p><strong>3)</strong> لكي تكون هندسية غير ثابتة، نلغي الحد الثابت في العلاقة، أي <span class="math">2a+4=0</span>، فنجد <span class="math">a=-2</span>. عندئذ:</p><p class="math-equation">u<sub>n+1</sub>=-u<sub>n</sub></p><p>إذن <span class="math">u_n=3(-1)^n</span>، ومنه <span class="math">u_{50}=3</span>. ومجموع أول <span class="math">50</span> حدا هو مجموع عدد زوجي من حدود متناوبة <span class="math">3,-3,...</span>، لذلك يساوي <span class="math">0</span>.</p><p><strong>4)</strong> إذا <span class="math">a=4</span> تصبح العلاقة:</p><p class="math-equation">u<sub>n+1</sub>=3u<sub>n</sub>-4</p><p>نبرهن بالتراجع أن <span class="math">u_n=3^n+2</span>. عند <span class="math">n=0</span>: <span class="math">3^0+2=3=u_0</span>. إذا كان <span class="math">u_n=3^n+2</span> فإن:</p><p class="math-equation">u<sub>n+1</sub>=3(3<sup>n</sup>+2)-4=3<sup>n+1</sup>+2</p><p>إذن العبارة صحيحة. ثم:</p><p class="math-equation">u<sub>0</sub>+...+u<sub>n</sub>=Σ<sub>k=0</sub><sup>n</sup>(3<sup>k</sup>+2)</p><p class="math-equation">=(3<sup>n+1</sup>-1)/2+2(n+1)=1/2(3<sup>n+1</sup>+4n+3)</p>`,
    detailedSolution: `<div class="detailed-solution"><p><strong>1) ما المطلوب؟</strong> نبحث عن قيمة <span class="math">a</span> التي تجعل كل الحدود مساوية للحد الأول <span class="math">3</span>.</p><p><strong>الفكرة المستعملة:</strong> يكفي فرض <span class="math">u_1=3</span> لأن العلاقة التراجعية عندها تحافظ على نفس القيمة.</p><p class="math-equation">u<sub>1</sub>=(4a-1)/3</p><p>ومن <span class="math">u_1=3</span> نحصل على <span class="math">a=5/2</span>.</p><p><strong>2) ما المطلوب؟</strong> نجعل العلاقة حسابية غير ثابتة.</p><p><strong>الفكرة المستعملة:</strong> في المتتالية الحسابية غير الثابتة يجب أن يكون معامل <span class="math">u_n</span> مساويا لـ <span class="math">1</span> حتى يصبح الفرق ثابتا.</p><p class="math-equation">(2a+1)/3=1 ⇒ a=1</p><p>فتصبح <span class="math">u_{n+1}=u_n-2</span>، ومنه <span class="math">u_n=3-2n</span> ومجموع أول <span class="math">n</span> حدود هو <span class="math">n(4-n)</span>.</p><p><strong>3) ما المطلوب؟</strong> نجعل المتتالية هندسية غير ثابتة.</p><p><strong>الفكرة المستعملة:</strong> العلاقة الهندسية لا تحتوي حدا ثابتا خارج <span class="math">u_n</span>، لذلك نطلب <span class="math">2a+4=0</span>.</p><p>فنجد <span class="math">a=-2</span>، وتصبح <span class="math">u_{n+1}=-u_n</span>، أي <span class="math">u_n=3(-1)^n</span>. لذلك <span class="math">u_{50}=3</span>، ومجموع أول <span class="math">50</span> حدا يساوي <span class="math">0</span>.</p><p><strong>4) ما المطلوب؟</strong> عند <span class="math">a=4</span> نثبت العبارة الصريحة ثم نحسب المجموع.</p><p><strong>التطبيق:</strong> العلاقة تصبح <span class="math">u_{n+1}=3u_n-4</span>. إذا كان <span class="math">u_n=3^n+2</span> فإن <span class="math">u_{n+1}=3^{n+1}+2</span>، فتثبت العبارة بالتراجع.</p><p>ثم نجمع:</p><p class="math-equation">Σ(3^k+2)=(3^{n+1}-1)/2+2(n+1)=1/2(3^{n+1}+4n+3)</p><p class="pedagogy-summary"><strong>خلاصة المسار:</strong> درسنا العلاقة حسب قيمة الوسيط: الثبات من شرط <span class="math">u_1=u_0</span>، والحسابية من جعل معامل <span class="math">u_n</span> مساويا لـ <span class="math">1</span>، والهندسية من إلغاء الحد الثابت، ثم أنهينا بحالة <span class="math">a=4</span> بالتراجع والمجموع.</p></div>`,
    conceptHints: [
      { title: "المتتالية الثابتة", hint: "إذا كانت المتتالية ثابتة وحدها الأول 3، فابدأ بفرض u_1=3 واستخرج a." },
      { title: "الحالة الحسابية", hint: "كي يصبح الفرق ثابتا في علاقة خطية، اجعل معامل u_n مساويا لـ 1، ثم احسب الأساس." },
      { title: "الحالة الهندسية", hint: "العلاقة الهندسية لا تحتوي حدا ثابتا، لذلك حاول جعل الحد المستقل معدوما." },
      { title: "البرهان بالتراجع", hint: "عند a=4 عوض العبارة المقترحة في العلاقة u_{n+1}=3u_n-4 وتحقق أنها تعطي الحد التالي." },
      { title: "حساب المجموع", hint: "اجمع 3^k كمجموع هندسي، واجمع الثابت 2 بعدد الحدود n+1." }
    ]
  },
  {
    id: "bac-2013-management-subject-2",
    branch: "management",
    year: "2013",
    title: "بكالوريا 2013 - تسيير واقتصاد - الموضوع الثاني",
    statementHtml: `<div class="bac-statement"><p><strong>التمرين: المتتاليات العددية</strong></p><p>المتتالية العددية <span class="math">(u<sub>n</sub>)</span> معرفة بـ <span class="math">u<sub>0</sub>=6</span>، ومن أجل كل عدد طبيعي <span class="math">n</span>:</p><p class="math-equation">u<sub>n+1</sub>=-1/2 u<sub>n</sub>+6</p><ol><li><ol type="أ"><li>احسب الحدود <span class="math">u<sub>1</sub></span>، <span class="math">u<sub>2</sub></span>، <span class="math">u<sub>3</sub></span> و<span class="math">u<sub>4</sub></span>.</li><li>هل المتتالية <span class="math">(u<sub>n</sub>)</span> رتيبة على <span class="math">ℕ</span>؟ برر إجابتك.</li></ol></li><li><ol type="أ"><li>بين أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n+1</sub>-4=-1/2(u<sub>n</sub>-4)</span>.</li><li>استنتج أن <span class="math">(v<sub>n</sub>)</span> المعرفة بـ <span class="math">v<sub>n</sub>=u<sub>n</sub>-4</span> هندسية، وعيّن أساسها وحدها الأول.</li><li>اكتب <span class="math">v<sub>n</sub></span> ثم <span class="math">u<sub>n</sub></span> بدلالة <span class="math">n</span>.</li><li>بين أن <span class="math">(u<sub>n</sub>)</span> متقاربة.</li></ol></li><li>باستعمال عبارة <span class="math">u<sub>n</sub></span>، تأكد ثانية من نتيجة السؤال <span class="math">1-ب</span>.</li></ol></div>`,
    quickSolution: `<p><strong>1)</strong> <span class="math">u<sub>1</sub>=3</span>، <span class="math">u<sub>2</sub>=9/2</span>، <span class="math">u<sub>3</sub>=15/4</span>، <span class="math">u<sub>4</sub>=33/8</span>. المتتالية ليست رتيبة.</p><p><strong>2)</strong> <span class="math">v<sub>0</sub>=2</span>، أساسها <span class="math">-1/2</span>، <span class="math">v<sub>n</sub>=2(-1/2)<sup>n</sup></span>، <span class="math">u<sub>n</sub>=4+2(-1/2)<sup>n</sup></span>، و<span class="math">lim u<sub>n</sub>=4</span>.</p><p><strong>3)</strong> إشارة <span class="math">u<sub>n</sub>-4=2(-1/2)^n</span> تتناوب، لذلك <span class="math">(u_n)</span> ليست رتيبة.</p>`,
    solution: `<p><strong>1-أ)</strong></p><p class="math-equation">u<sub>1</sub>=3, &nbsp; u<sub>2</sub>=9/2, &nbsp; u<sub>3</sub>=15/4, &nbsp; u<sub>4</sub>=33/8</p><p><strong>1-ب)</strong> لدينا <span class="math">u_1&lt;u_0</span>، بينما <span class="math">u_2&gt;u_1</span>. إذن المتتالية ليست متزايدة وليست متناقصة، فهي ليست رتيبة.</p><p><strong>2-أ)</strong></p><p class="math-equation">u<sub>n+1</sub>-4=-1/2u<sub>n</sub>+6-4=-1/2(u<sub>n</sub>-4)</p><p><strong>2-ب)</strong> بما أن <span class="math">v_n=u_n-4</span>، فإن:</p><p class="math-equation">v<sub>n+1</sub>=-1/2v<sub>n</sub></p><p>إذن <span class="math">(v_n)</span> هندسية أساسها <span class="math">-1/2</span>، وحدها الأول <span class="math">v_0=2</span>.</p><p><strong>2-ج)</strong></p><p class="math-equation">v<sub>n</sub>=2(-1/2)<sup>n</sup>, &nbsp; u<sub>n</sub>=4+2(-1/2)<sup>n</sup></p><p><strong>2-د)</strong> بما أن <span class="math">|-1/2|&lt;1</span>، فإن <span class="math">(-1/2)^n→0</span>، ومنه <span class="math">lim u_n=4</span>. إذن <span class="math">(u_n)</span> متقاربة.</p><p><strong>3)</strong> من <span class="math">u_n=4+2(-1/2)^n</span>، تكون الحدود الزوجية أكبر من <span class="math">4</span> والفردية أصغر من <span class="math">4</span>، فتتذبذب حول <span class="math">4</span>، وهذا يؤكد أنها ليست رتيبة.</p>`,
    detailedSolution: `<div class="detailed-solution"><p><strong>1) ما المطلوب؟</strong> نحسب أول الحدود ثم نستعملها للحكم على الرتابة.</p><p><strong>الفكرة المستعملة:</strong> لإبطال الرتابة يكفي أن نجد مرة نزولا ومرة صعودا في الحدود الأولى.</p><p class="math-equation">u<sub>1</sub>=3, &nbsp; u<sub>2</sub>=9/2, &nbsp; u<sub>3</sub>=15/4, &nbsp; u<sub>4</sub>=33/8</p><p>بما أن <span class="math">u_1&lt;u_0</span> و<span class="math">u_2&gt;u_1</span>، فالمتتالية ليست رتيبة.</p><p><strong>2) ما المطلوب؟</strong> نحول العلاقة التراجعية إلى متتالية هندسية باستعمال <span class="math">v_n=u_n-4</span>.</p><p><strong>الفكرة المستعملة:</strong> العدد <span class="math">4</span> ثابت في العلاقة لأنه يحقق <span class="math">4=-1/2×4+6</span>، لذلك طرحه من <span class="math">u_n</span> يلغي الحد الثابت.</p><p class="math-equation">u<sub>n+1</sub>-4=-1/2(u<sub>n</sub>-4)</p><p>إذن <span class="math">v_{n+1}=-1/2v_n</span>، ومنه <span class="math">v_0=2</span> و<span class="math">v_n=2(-1/2)^n</span>، وبالتالي:</p><p class="math-equation">u<sub>n</sub>=4+2(-1/2)<sup>n</sup></p><p>ولأن <span class="math">|-1/2|&lt;1</span>، فإن <span class="math">lim u_n=4</span>.</p><p><strong>3) ما المطلوب؟</strong> نؤكد عدم الرتابة باستعمال العبارة الصريحة.</p><p>عندما يكون <span class="math">n</span> زوجيا يكون <span class="math">u_n&gt;4</span>، وعندما يكون فرديا يكون <span class="math">u_n&lt;4</span>. إذن الحدود تتناوب حول <span class="math">4</span>، ولا يمكن أن تكون المتتالية رتيبة.</p><p class="pedagogy-summary"><strong>خلاصة المسار:</strong> أول الحدود أظهرت عدم الرتابة، ثم طرحنا العدد الثابت <span class="math">4</span> للحصول على متتالية هندسية أساسها سالب. هذا الأساس السالب يفسر التناوب حول النهاية <span class="math">4</span>.</p></div>`,
    conceptHints: [
      { title: "اختبار الرتابة", hint: "احسب أول حدين أو ثلاثة. إذا وجدت مرة صعودا ومرة نزولا، فهذا يكفي لإثبات أن المتتالية ليست رتيبة." },
      { title: "المتتالية المساعدة", hint: "ابحث عن العدد الثابت للعلاقة، ثم اطرح هذا العدد من u_n حتى تظهر علاقة هندسية." },
      { title: "أساس سالب", hint: "إذا كان أساس المتتالية الهندسية سالبا، انتبه إلى تناوب الإشارة بين الحدود الزوجية والفردية." },
      { title: "التقارب", hint: "استعمل أن |q|<1 في q^n حتى لو كان q سالبا، لأن q^n يؤول إلى 0." }
    ]
  },  {
    id: "bac-2014-management-subject-2",
    branch: "management",
    year: "2014",
    title: "بكالوريا 2014 - تسيير واقتصاد - الموضوع الثاني",
    statementHtml: `<div class="bac-statement"><p><strong>التمرين: المتتاليات العددية والهندسية</strong></p><p>المتتالية العددية <span class="math">(u<sub>n</sub>)</span> معرفة بـ:</p><p class="math-equation">u<sub>0</sub>=3, &nbsp; u<sub>n+1</sub>=2/3 u<sub>n</sub>-1</p><ol><li><ol type="أ"><li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n</sub>&gt;-3</span>.</li><li>بين أن المتتالية <span class="math">(u<sub>n</sub>)</span> متناقصة تماما.</li><li>استنتج أن المتتالية <span class="math">(u<sub>n</sub>)</span> متقاربة.</li></ol></li><li>لتكن <span class="math">(v<sub>n</sub>)</span> متتالية هندسية متقاربة أساسها <span class="math">q</span> حيث <span class="math">v<sub>0</sub>=6</span> و<span class="math">lim(v<sub>0</sub>+v<sub>1</sub>+...+v<sub>n</sub>)=18</span>.<ol type="أ"><li>بين أن النهاية السابقة تساوي <span class="math">v<sub>0</sub>/(1-q)</span>.</li><li>احسب <span class="math">q</span> ثم عين <span class="math">v<sub>n</sub></span> بدلالة <span class="math">n</span>.</li><li>برهن أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n</sub>=v<sub>n</sub>-3</span>، واستنتج عبارة <span class="math">u<sub>n</sub></span>.</li></ol></li></ol></div>`,
    quickSolution: `<p><strong>1)</strong> <span class="math">u<sub>n</sub>&gt;-3</span>، و<span class="math">u<sub>n+1</sub>-u<sub>n</sub>=-(u<sub>n</sub>+3)/3&lt;0</span>، إذن <span class="math">(u_n)</span> متناقصة تماما ومتقاربة.</p><p><strong>2)</strong> <span class="math">lim Σv_k=v<sub>0</sub>/(1-q)</span>، ومن <span class="math">18=6/(1-q)</span> نجد <span class="math">q=2/3</span>. إذن <span class="math">v<sub>n</sub>=6(2/3)<sup>n</sup></span> و<span class="math">u<sub>n</sub>=6(2/3)<sup>n</sup>-3</span>.</p>`,
    solution: `<p><strong>1-أ)</strong> نبرهن بالتراجع. عند <span class="math">n=0</span>: <span class="math">u_0=3&gt;-3</span>. نفرض <span class="math">u_n&gt;-3</span>، فنجد:</p><p class="math-equation">u<sub>n+1</sub>=(2/3)u<sub>n</sub>-1&gt;(2/3)(-3)-1=-3</p><p>إذن <span class="math">u_n&gt;-3</span> لكل <span class="math">n</span>.</p><p><strong>1-ب)</strong></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=(2/3)u<sub>n</sub>-1-u<sub>n</sub>=-(u<sub>n</sub>+3)/3</p><p>وبما أن <span class="math">u_n&gt;-3</span>، فالفرق سالب، إذن المتتالية متناقصة تماما.</p><p><strong>1-ج)</strong> المتتالية متناقصة ومحدودة من الأسفل بـ <span class="math">-3</span>، إذن فهي متقاربة.</p><p><strong>2-أ)</strong> بما أن <span class="math">(v_n)</span> هندسية متقاربة، فإن <span class="math">|q|&lt;1</span>:</p><p class="math-equation">v<sub>0</sub>+...+v<sub>n</sub>=v<sub>0</sub>(1-q<sup>n+1</sup>)/(1-q)</p><p>وبالمرور إلى النهاية نحصل على <span class="math">v_0/(1-q)</span>.</p><p><strong>2-ب)</strong></p><p class="math-equation">18=6/(1-q) ⇒ q=2/3</p><p>ومنه <span class="math">v_n=6(2/3)^n</span>.</p><p><strong>2-ج)</strong> نلاحظ أن <span class="math">v_0-3=3=u_0</span>، كما أن:</p><p class="math-equation">v<sub>n+1</sub>-3=(2/3)v<sub>n</sub>-3=(2/3)(v<sub>n</sub>-3)-1</p><p>إذن <span class="math">v_n-3</span> تحقق نفس العلاقة ونفس الحد الأول مثل <span class="math">u_n</span>، ومنه:</p><p class="math-equation">u<sub>n</sub>=v<sub>n</sub>-3=6(2/3)<sup>n</sup>-3</p>`,
    detailedSolution: `<div class="detailed-solution"><p><strong>1) ما المطلوب؟</strong> نثبت الحصر <span class="math">u_n&gt;-3</span> ثم نستعمله لإشارة الفرق.</p><p><strong>الفكرة المستعملة:</strong> العدد <span class="math">-3</span> ثابت في العلاقة، والحصر بالتراجع يسمح بمعرفة إشارة <span class="math">u_n+3</span>.</p><p><strong>التطبيق:</strong> إذا كان <span class="math">u_n&gt;-3</span> فإن <span class="math">u_{n+1}&gt;-3</span>. ثم:</p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=-(u<sub>n</sub>+3)/3</p><p>وهذا الفرق سالب، إذن المتتالية متناقصة. وبما أنها محدودة من الأسفل بـ <span class="math">-3</span> فهي متقاربة.</p><p><strong>2) ما المطلوب؟</strong> نستعمل نهاية مجموع هندسي لاستخراج الأساس، ثم نربط <span class="math">v_n</span> بـ <span class="math">u_n</span>.</p><p><strong>الفكرة المستعملة:</strong> مجموع متتالية هندسية متقاربة من <span class="math">0</span> إلى <span class="math">n</span> يؤول إلى <span class="math">v_0/(1-q)</span>.</p><p class="math-equation">18=6/(1-q) ⇒ q=2/3</p><p>إذن <span class="math">v_n=6(2/3)^n</span>. وبما أن <span class="math">v_n-3</span> له نفس الحد الأول ونفس العلاقة التراجعية مثل <span class="math">u_n</span>، نستنتج:</p><p class="math-equation">u<sub>n</sub>=6(2/3)<sup>n</sup>-3</p><p class="pedagogy-summary"><strong>خلاصة المسار:</strong> استعملنا الحصر حول العدد الثابت <span class="math">-3</span> للرتابة والتقارب، ثم استعملنا مجموعا هندسيا لتحديد <span class="math">q</span> والحصول على العبارة الصريحة.</p></div>`,
    conceptHints: [
      { title: "الحصر بالتراجع", hint: "تحقق من u_0، ثم افترض u_n>-3 وعوض في العلاقة لإثبات أن u_{n+1}>-3." },
      { title: "رتابة المتتالية", hint: "احسب u_{n+1}-u_n واكتبه بدلالة u_n+3 حتى تستعمل الحصر السابق." },
      { title: "مجموع هندسي", hint: "اكتب مجموع v_0 إلى v_n، ثم مرر إلى النهاية باستعمال أن المتتالية الهندسية متقاربة." },
      { title: "الربط بين المتتاليتين", hint: "قارن v_n-3 مع u_n: تحقق من الحد الأول ومن العلاقة التراجعية." }
    ]
  },  {
    id: "bac-2015-management-subject-1",
    branch: "management",
    year: "2015",
    title: "بكالوريا 2015 - تسيير واقتصاد - الموضوع الأول",
    statementHtml: `<div class="bac-statement"><p><strong>التمرين: اختيار من متعدد في المتتاليات</strong></p><p>اختر الاقتراح الصحيح الوحيد من بين الاقتراحات الثلاثة في كل حالة، مع التبرير.</p><ol><li>نعتبر المتتالية <span class="math">(u<sub>n</sub>)</span> المعرفة من أجل كل عدد طبيعي <span class="math">n</span> بحدها العام:</li></ol><p class="math-equation">u<sub>n</sub>=5×2<sup>n</sup>×3<sup>n-1</sup></p><p>الاقتراحات: <span class="math">(أ)</span> <span class="math">(u_n)</span> حسابية، <span class="math">(ب)</span> <span class="math">(u_n)</span> هندسية، <span class="math">(ج)</span> <span class="math">(u_n)</span> ليست هندسية ولا حسابية.</p><ol start="2"><li>متتالية حسابية حدها الأول <span class="math">v<sub>0</sub>=1</span> وأساسها <span class="math">4</span>؛ قيمة <span class="math">n</span> التي من أجلها يكون:</li></ol><p class="math-equation">v<sub>1</sub>+v<sub>2</sub>+...+v<sub>n</sub>=2015</p><p>هي: <span class="math">(أ)</span> <span class="math">n=31</span>، <span class="math">(ب)</span> <span class="math">n=32</span>، <span class="math">(ج)</span> <span class="math">n=33</span>.</p></div>`,
    quickSolution: `<p><strong>1)</strong> الاختيار الصحيح: <span class="math">(ب)</span> <span class="math">(u_n)</span> هندسية.</p><p><strong>2)</strong> الاختيار الصحيح: <span class="math">(أ)</span> <span class="math">n=31</span>.</p>`,
    solution: `<p><strong>1)</strong> نكتب الحد العام:</p><p class="math-equation">u<sub>n</sub>=5×2<sup>n</sup>×3<sup>n-1</sup>=(5/3)×6<sup>n</sup></p><p>إذن <span class="math">u<sub>n+1</sub>/u<sub>n</sub>=6</span> ثابت، ومنه <span class="math">(u_n)</span> متتالية هندسية. الاختيار الصحيح هو <span class="math">(ب)</span>.</p><p><strong>2)</strong> بما أن <span class="math">(v_n)</span> حسابية حدها الأول <span class="math">v_0=1</span> وأساسها <span class="math">4</span>، فإن:</p><p class="math-equation">v<sub>k</sub>=1+4k</p><p class="math-equation">v<sub>1</sub>+...+v<sub>n</sub>=Σ<sub>k=1</sub><sup>n</sup>(1+4k)=n+4×n(n+1)/2=2n<sup>2</sup>+3n</p><p>وبالتعويض في الاقتراحات نجد:</p><p class="math-equation">2×31<sup>2</sup>+3×31=2015</p><p>إذن الاختيار الصحيح هو <span class="math">(أ)</span>: <span class="math">n=31</span>.</p>`,
    detailedSolution: `<div class="detailed-solution"><p><strong>1) ما المطلوب؟</strong> نحدد طبيعة المتتالية <span class="math">(u_n)</span>.</p><p><strong>الفكرة المستعملة:</strong> إذا استطعنا كتابة <span class="math">u_n</span> على شكل ثابت مضروب في <span class="math">q^n</span>، فهي هندسية.</p><p class="math-equation">u<sub>n</sub>=5×2<sup>n</sup>×3<sup>n-1</sup>=5×2<sup>n</sup>×3<sup>n</sup>/3=(5/3)6<sup>n</sup></p><p><strong>النتيجة:</strong> الاختيار الصحيح هو <span class="math">(ب)</span>: المتتالية هندسية.</p><p><strong>2) ما المطلوب؟</strong> نبحث عن <span class="math">n</span> الذي يجعل مجموع حدود متتالية حسابية يساوي <span class="math">2015</span>.</p><p><strong>الفكرة المستعملة:</strong> نكتب الحد العام <span class="math">v_k=1+4k</span> ثم نجمع من <span class="math">k=1</span> إلى <span class="math">n</span>. بما أن السؤال اختيار من متعدد، يمكن اختبار القيم المقترحة بعد صياغة المجموع.</p><p class="math-equation">v<sub>1</sub>+...+v<sub>n</sub>=Σ(1+4k)=n+4\frac{n(n+1)}{2}=2n^2+3n</p><p>نعوض <span class="math">n=31</span> فنجد:</p><p class="math-equation">2×31^2+3×31=1922+93=2015</p><p><strong>النتيجة:</strong> الاختيار الصحيح هو <span class="math">(أ)</span>: <span class="math">n=31</span>.</p><p class="pedagogy-summary"><strong>خلاصة المسار:</strong> في السؤال الأول بحثنا عن شكل هندسي للحد العام، وفي السؤال الثاني حولنا المجموع إلى صيغة في <span class="math">n</span> ثم اختبرنا الاقتراح الصحيح.</p></div>`,
    conceptHints: [
      { title: "تمييز المتتالية الهندسية", hint: "حاول جمع العوامل التي تحمل الأس n في قوة واحدة، أو احسب النسبة u_{n+1}/u_n." },
      { title: "المتتالية الحسابية", hint: "اكتب v_k بدلالة k باستعمال الحد الأول والأساس، ثم اجمع من k=1 إلى n." },
      { title: "اختيار من متعدد", hint: "بعد إيجاد صيغة المجموع، عوض القيم المقترحة بدل حل معادلة طويلة إذا كان ذلك أسرع." }
    ]
  },
  {
    id: "bac-2015-management-subject-2",
    branch: "management",
    year: "2015",
    title: "بكالوريا 2015 - تسيير واقتصاد - الموضوع الثاني",
    statementHtml: `<div class="bac-statement"><p><strong>التمرين: المتتاليات وتطبيق اقتصادي</strong></p><p>بينت دراسة أن <span class="math">5%</span> من عمال إحدى القطاعات الصناعية يحالون على التقاعد سنويا، وبالمقابل يوظف <span class="math">3000</span> عامل سنويا. علمًا أنه في سنة <span class="math">2012</span> كان عدد العمال <span class="math">50000</span>.</p><p>نعتبر الألف هو الوحدة، ونرمز بـ <span class="math">u<sub>n</sub></span> لعدد العمال في سنة <span class="math">2012+n</span>، أي <span class="math">u<sub>0</sub>=50</span>.</p><ol><li>احسب <span class="math">u<sub>1</sub></span> و<span class="math">u<sub>2</sub></span>.</li><li><ol type="أ"><li>بين أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n+1</sub>=0.95u<sub>n</sub>+3</span>.</li><li>بين أن المتتالية <span class="math">(u<sub>n</sub>)</span> ليست حسابية وليست هندسية.</li></ol></li><li>من أجل كل عدد طبيعي <span class="math">n</span> نضع: <span class="math">v<sub>n</sub>=60-u<sub>n</sub></span>.<ol type="أ"><li>بين أن <span class="math">(v<sub>n</sub>)</span> متتالية هندسية يطلب تعيين أساسها وحدها الأول.</li><li>اكتب <span class="math">v<sub>n</sub></span> بدلالة <span class="math">n</span>، ثم استنتج <span class="math">u<sub>n</sub></span> بدلالة <span class="math">n</span>.</li><li>قدر عدد العمال سنة <span class="math">2017</span>.</li><li>حدد اتجاه تغير المتتالية <span class="math">(u<sub>n</sub>)</span>.</li><li>احسب نهاية المتتالية <span class="math">(u<sub>n</sub>)</span>. هل يمكن أن يصل عدد عمال المصنع إلى <span class="math">60000</span> عامل؟</li></ol></li></ol></div>`,
    quickSolution: `<p><strong>1)</strong> <span class="math">u<sub>1</sub>=50.5</span> و<span class="math">u<sub>2</sub>=50.975</span>.</p><p><strong>2)</strong> <span class="math">u<sub>n+1</sub>=0.95u<sub>n</sub>+3</span>، و<span class="math">(u_n)</span> ليست حسابية ولا هندسية.</p><p><strong>3)</strong> <span class="math">v<sub>0</sub>=10</span>، أساسها <span class="math">0.95</span>، <span class="math">v<sub>n</sub>=10(0.95)<sup>n</sup></span>، <span class="math">u<sub>n</sub>=60-10(0.95)<sup>n</sup></span>. سنة 2017: حوالي <span class="math">52262</span> عاملا. <span class="math">(u_n)</span> متزايدة و<span class="math">lim u_n=60</span> ألفا؛ لا يصل العدد إلى <span class="math">60000</span>.</p>`,
    solution: `<p><strong>1)</strong> بما أن الوحدة هي الألف:</p><p class="math-equation">u<sub>1</sub>=0.95×50+3=50.5</p><p class="math-equation">u<sub>2</sub>=0.95×50.5+3=50.975</p><p><strong>2-أ)</strong> كل سنة يبقى <span class="math">95%</span> من العمال، أي <span class="math">0.95u_n</span>، ويوظف <span class="math">3000</span> عامل أي <span class="math">3</span> آلاف. إذن <span class="math">u<sub>n+1</sub>=0.95u<sub>n</sub>+3</span>.</p><p><strong>2-ب)</strong> لدينا <span class="math">u_1-u_0=0.5</span> و<span class="math">u_2-u_1=0.475</span>، فالفروق غير ثابتة، إذن ليست حسابية. كما أن <span class="math">u_1/u_0=1.01</span> و<span class="math">u_2/u_1≈1.0094</span>، فالنسب غير ثابتة، إذن ليست هندسية.</p><p><strong>3-أ)</strong></p><p class="math-equation">v<sub>n+1</sub>=60-u<sub>n+1</sub>=60-(0.95u<sub>n</sub>+3)=0.95(60-u<sub>n</sub>)=0.95v<sub>n</sub></p><p>إذن <span class="math">(v_n)</span> هندسية أساسها <span class="math">0.95</span> وحدها الأول <span class="math">v_0=10</span>.</p><p><strong>3-ب)</strong></p><p class="math-equation">v<sub>n</sub>=10(0.95)<sup>n</sup>, &nbsp; u<sub>n</sub>=60-10(0.95)<sup>n</sup></p><p><strong>3-ج)</strong> سنة 2017 توافق <span class="math">n=5</span>، ومنه <span class="math">u_5≈52.262</span>، أي حوالي <span class="math">52262</span> عاملا.</p><p><strong>3-د)</strong></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=0.05(60-u<sub>n</sub>)=0.05v<sub>n</sub>&gt;0</p><p>إذن <span class="math">(u_n)</span> متزايدة.</p><p><strong>3-هـ)</strong> بما أن <span class="math">0&lt;0.95&lt;1</span> فإن <span class="math">(0.95)^n→0</span>، ومنه <span class="math">lim u_n=60</span>. وبما أن <span class="math">u_n=60-10(0.95)^n&lt;60</span> لكل <span class="math">n</span>، فلا يمكن أن يصل عدد العمال إلى <span class="math">60000</span>.</p>`,
    detailedSolution: `<div class="detailed-solution"><p><strong>1) ما المطلوب؟</strong> نحسب عدد العمال بعد سنة وبعد سنتين، مع الانتباه إلى أن الوحدة هي الألف.</p><p><strong>التطبيق:</strong> فقدان <span class="math">5%</span> يعني بقاء <span class="math">95%</span>، وإضافة <span class="math">3000</span> تعني إضافة <span class="math">3</span> بوحدة الألف.</p><p class="math-equation">u<sub>1</sub>=50.5, &nbsp; u<sub>2</sub>=50.975</p><p><strong>2) ما المطلوب؟</strong> نترجم الوضعية إلى علاقة تراجعية، ثم نتحقق أن المتتالية ليست حسابية ولا هندسية.</p><p><strong>الفكرة المستعملة:</strong> الحسابية لها فرق ثابت، والهندسية لها نسبة ثابتة.</p><p class="math-equation">u<sub>n+1</sub>=0.95u<sub>n</sub>+3</p><p>أول فرقين هما <span class="math">0.5</span> و<span class="math">0.475</span>، فليست حسابية. وأول نسبتين مختلفتان، فليست هندسية.</p><p><strong>3) ما المطلوب؟</strong> نستعمل <span class="math">v_n=60-u_n</span> للحصول على علاقة هندسية.</p><p><strong>الفكرة المستعملة:</strong> العدد <span class="math">60</span> هو العدد الثابت للعلاقة لأنه يحقق <span class="math">60=0.95×60+3</span>.</p><p class="math-equation">v<sub>n+1</sub>=60-u<sub>n+1</sub>=0.95(60-u<sub>n</sub>)=0.95v<sub>n</sub></p><p>إذن <span class="math">v_0=10</span> و<span class="math">v_n=10(0.95)^n</span>، ومنه <span class="math">u_n=60-10(0.95)^n</span>.</p><p>سنة <span class="math">2017</span> تقابل <span class="math">n=5</span>، فنجد <span class="math">u_5≈52.262</span> أي حوالي <span class="math">52262</span> عاملا.</p><p>وللرتابة: <span class="math">u_{n+1}-u_n=0.05(60-u_n)&gt;0</span>، إذن المتتالية متزايدة. أما النهاية فهي <span class="math">60</span> لأن <span class="math">0.95^n→0</span>. وبما أن <span class="math">u_n&lt;60</span> دائما، فإن عدد العمال يقترب من <span class="math">60000</span> ولا يبلغه.</p><p class="pedagogy-summary"><strong>خلاصة المسار:</strong> حولنا المعطيات الاقتصادية إلى علاقة تراجعية بوحدة الألف، ثم استعملنا العدد الثابت <span class="math">60</span> لبناء متتالية هندسية تساعدنا على إيجاد العبارة الصريحة والنهاية.</p></div>`,
    conceptHints: [
      { title: "الترجمة الاقتصادية", hint: "حوّل كل الأعداد إلى وحدة الألف: 50000 تصبح 50 و3000 تصبح 3، وفقدان 5% يعني ضرب العدد السابق في 0.95." },
      { title: "ليست حسابية ولا هندسية", hint: "قارن أول فرقين لإبطال الحسابية، وقارن أول نسبتين لإبطال الهندسية." },
      { title: "المتتالية المساعدة", hint: "ابحث عن العدد الثابت للعلاقة، ثم ادرس الفرق بينه وبين u_n باستعمال v_n=60-u_n." },
      { title: "تقدير سنة معينة", hint: "سنة 2017 توافق n=5 لأن البداية هي سنة 2012." },
      { title: "النهاية", hint: "بعد إيجاد u_n، استعمل أن 0.95^n يؤول إلى 0، ثم قارنه بالحد 60." }
    ]
  },  {
    id: "bac-2016-management-subject-1",
    branch: "management",
    year: "2016",
    title: "بكالوريا 2016 - تسيير واقتصاد - الموضوع الأول",
    statementHtml: `<div class="bac-statement"><p><strong>التمرين: المتتاليات الهندسية</strong></p><p>المتتالية <span class="math">(V<sub>n</sub>)</span> هندسية حدودها موجبة ومعرفة على <span class="math">ℕ</span>، حدها الأول <span class="math">V<sub>0</sub>=18</span>، والعلاقة:</p><p class="math-equation">V<sub>0</sub>+V<sub>1</sub>+V<sub>2</sub>=38</p><ol><li>بين أن أساس المتتالية <span class="math">(V<sub>n</sub>)</span> هو <span class="math">q=2/3</span>.</li><li><ol type="أ"><li>اكتب الحد العام <span class="math">V<sub>n</sub></span> بدلالة <span class="math">n</span>.</li><li>ادرس اتجاه تغير المتتالية <span class="math">(V<sub>n</sub>)</span>.</li><li>احسب نهاية <span class="math">(V<sub>n</sub>)</span>.</li></ol></li><li>نضع <span class="math">S<sub>n</sub>=V<sub>0</sub>+V<sub>1</sub>+...+V<sub>n-1</sub></span>.<ol type="أ"><li>احسب <span class="math">S<sub>n</sub></span> بدلالة <span class="math">n</span> ثم استنتج نهاية <span class="math">S<sub>n</sub></span> عندما يؤول <span class="math">n</span> إلى <span class="math">+∞</span>.</li><li>جد العدد الطبيعي <span class="math">n</span> بحيث <span class="math">S<sub>n</sub>=3510/81</span>.</li></ol></li></ol></div>`,
    quickSolution: `<p><strong>1)</strong> <span class="math">q=2/3</span>.</p><p><strong>2)</strong> <span class="math">V<sub>n</sub>=18(2/3)<sup>n</sup></span>. المتتالية متناقصة و<span class="math">lim V<sub>n</sub>=0</span>.</p><p><strong>3)</strong> <span class="math">S<sub>n</sub>=54(1-(2/3)<sup>n</sup>)</span> و<span class="math">lim S<sub>n</sub>=54</span>. إذا <span class="math">S<sub>n</sub>=3510/81</span> فإن <span class="math">n=4</span>.</p>`,
    solution: `<p><strong>1)</strong> بما أن <span class="math">(V_n)</span> هندسية حدها الأول <span class="math">V_0=18</span> وأساسها <span class="math">q</span>، فإن:</p><p class="math-equation">V<sub>1</sub>=18q, &nbsp; V<sub>2</sub>=18q<sup>2</sup></p><p>ومن العلاقة المعطاة:</p><p class="math-equation">18+18q+18q<sup>2</sup>=38</p><p class="math-equation">9q<sup>2</sup>+9q-10=0</p><p>حل هذه المعادلة يعطي <span class="math">q=2/3</span> أو <span class="math">q=-5/3</span>. وبما أن حدود المتتالية موجبة، فإن الأساس موجب، ومنه <span class="math">q=2/3</span>.</p><p><strong>2-أ)</strong></p><p class="math-equation">V<sub>n</sub>=V<sub>0</sub>q<sup>n</sup>=18(2/3)<sup>n</sup></p><p><strong>2-ب)</strong> بما أن <span class="math">0&lt;2/3&lt;1</span> و<span class="math">V_0&gt;0</span>، فإن المتتالية الهندسية <span class="math">(V_n)</span> متناقصة.</p><p><strong>2-ج)</strong> بما أن <span class="math">(2/3)^n→0</span>، فإن:</p><p class="math-equation">lim V<sub>n</sub>=0</p><p><strong>3-أ)</strong> المجموع <span class="math">S_n</span> يحتوي الحدود من <span class="math">V_0</span> إلى <span class="math">V_{n-1}</span>، أي <span class="math">n</span> حدود. إذن:</p><p class="math-equation">S<sub>n</sub>=18×(1-(2/3)<sup>n</sup>)/(1-2/3)=54(1-(2/3)<sup>n</sup>)</p><p>ومنه:</p><p class="math-equation">lim S<sub>n</sub>=54</p><p><strong>3-ب)</strong> نحل:</p><p class="math-equation">54(1-(2/3)<sup>n</sup>)=3510/81</p><p class="math-equation">(2/3)<sup>n</sup>=16/81=(2/3)<sup>4</sup></p><p>إذن <span class="math">n=4</span>.</p>`,
    detailedSolution: `<div class="detailed-solution"><p><strong>1) ما المطلوب؟</strong> نستخرج أساس المتتالية الهندسية من علاقة تضم أول ثلاثة حدود.</p><p><strong>الفكرة المستعملة:</strong> في المتتالية الهندسية نكتب <span class="math">V_1=V_0q</span> و<span class="math">V_2=V_0q^2</span>، ثم نعوض في العلاقة المعطاة.</p><p><strong>التطبيق:</strong></p><p class="math-equation">18+18q+18q<sup>2</sup>=38</p><p>بعد القسمة والترتيب نحصل على:</p><p class="math-equation">9q<sup>2</sup>+9q-10=0</p><p>حلها يعطي <span class="math">q=2/3</span> أو <span class="math">q=-5/3</span>. وبما أن حدود المتتالية موجبة، نأخذ الأساس الموجب.</p><p><strong>النتيجة:</strong> <span class="math">q=2/3</span>.</p><p><strong>2) ما المطلوب؟</strong> نكتب الحد العام، ثم ندرس الرتابة والنهاية.</p><p><strong>الفكرة المستعملة:</strong> الحد العام في المتتالية الهندسية هو <span class="math">V_n=V_0q^n</span>. وإذا كان <span class="math">0&lt;q&lt;1</span> والحدود موجبة فهي متناقصة وتؤول إلى <span class="math">0</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">V<sub>n</sub>=18(2/3)<sup>n</sup></p><p>لأن <span class="math">0&lt;2/3&lt;1</span>، فإن <span class="math">(V_n)</span> متناقصة و<span class="math">(2/3)^n</span> يؤول إلى <span class="math">0</span>.</p><p><strong>النتيجة:</strong> <span class="math">lim V_n=0</span>.</p><p><strong>3) ما المطلوب؟</strong> نحسب مجموع أول <span class="math">n</span> حدود، ثم نستعمله لإيجاد <span class="math">n</span>.</p><p><strong>الفكرة المستعملة:</strong> <span class="math">S_n</span> يبدأ من <span class="math">V_0</span> وينتهي عند <span class="math">V_{n-1}</span>، لذلك عدد حدوده هو <span class="math">n</span>.</p><p class="math-equation">S<sub>n</sub>=18\frac{1-(2/3)^n}{1-2/3}=54(1-(2/3)^n)</p><p>وبما أن <span class="math">(2/3)^n→0</span>، فإن <span class="math">lim S_n=54</span>.</p><p>لحل <span class="math">S_n=3510/81</span>:</p><p class="math-equation">54(1-(2/3)^n)=3510/81 ⇒ (2/3)^n=16/81=(2/3)^4</p><p><strong>النتيجة:</strong> <span class="math">n=4</span>.</p><p class="pedagogy-summary"><strong>خلاصة المسار:</strong> استخرجنا الأساس من مجموع أول ثلاثة حدود، ثم كتبنا الحد العام. بعد ذلك استعملنا صيغة مجموع هندسي بعد الانتباه إلى أن <span class="math">S_n</span> يحتوي <span class="math">n</span> حدود فقط.</p></div>`,
    conceptHints: [
      { title: "استخراج الأساس", hint: "اكتب V_1 وV_2 بدلالة V_0 وq، ثم عوض في V_0+V_1+V_2=38 لتحصل على معادلة في q." },
      { title: "إشارة الأساس", hint: "بعد حل المعادلة قد تظهر قيمتان، استعمل كون حدود المتتالية موجبة لاختيار الأساس المناسب." },
      { title: "النهاية باستعمال متتالية هندسية", hint: "إذا كان الأساس بين 0 و1 فإن q^n يؤول إلى 0، ومنه تعرف نهاية V_n." },
      { title: "حساب المجموع", hint: "انتبه أن S_n ينتهي عند V_{n-1}، لذلك عدد الحدود هو n وليس n+1." },
      { title: "إيجاد n", hint: "بعد كتابة S_n، حول المعادلة إلى q^n=عدد، ثم قارنه بقوة معروفة للأساس." }
    ]
  },
  {
    id: "bac-2016-management-subject-2",
    branch: "management",
    year: "2016",
    title: "بكالوريا 2016 - تسيير واقتصاد - الموضوع الثاني",
    statementHtml: `<div class="bac-statement"><p><strong>التمرين: المتتاليات العددية</strong></p><p>نعتبر المتتالية <span class="math">(U<sub>n</sub>)</span> المعرفة على <span class="math">ℕ</span> بـ:</p><p class="math-equation">U<sub>0</sub>=5, &nbsp; U<sub>n+1</sub>=4/7 U<sub>n</sub>+3/7</p><ol><li>احسب الحدين <span class="math">U<sub>1</sub></span> و<span class="math">U<sub>2</sub></span>.</li><li><ol type="أ"><li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">U<sub>n</sub>&gt;1</span>.</li><li>بين أن المتتالية <span class="math">(U<sub>n</sub>)</span> متناقصة تماما.</li><li>ماذا تستنتج بالنسبة لتقارب المتتالية <span class="math">(U<sub>n</sub>)</span>؟</li></ol></li><li>لتكن المتتالية <span class="math">(V<sub>n</sub>)</span> المعرفة على <span class="math">ℕ</span> بـ: <span class="math">V<sub>n</sub>=U<sub>n</sub>-1</span>.<ol type="أ"><li>بين أن <span class="math">(V<sub>n</sub>)</span> متتالية هندسية معينا أساسها وحدها الأول.</li><li>اكتب <span class="math">V<sub>n</sub></span> بدلالة <span class="math">n</span>، ثم استنتج أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">U<sub>n</sub>=1+4(4/7)<sup>n</sup></span>.</li><li>احسب نهاية <span class="math">(U<sub>n</sub>)</span>.</li></ol></li></ol></div>`,
    quickSolution: `<p><strong>1)</strong> <span class="math">U<sub>1</sub>=23/7</span> و<span class="math">U<sub>2</sub>=113/49</span>.</p><p><strong>2)</strong> لكل <span class="math">n</span>: <span class="math">U<sub>n</sub>&gt;1</span>. كما أن <span class="math">U<sub>n+1</sub>-U<sub>n</sub>=-3(U<sub>n</sub>-1)/7&lt;0</span>، إذن <span class="math">(U_n)</span> متناقصة تماما ومتقاربة.</p><p><strong>3)</strong> <span class="math">V<sub>0</sub>=4</span>، أساسها <span class="math">4/7</span>، <span class="math">V<sub>n</sub>=4(4/7)<sup>n</sup></span>، <span class="math">U<sub>n</sub>=1+4(4/7)<sup>n</sup></span>، و<span class="math">lim U<sub>n</sub>=1</span>.</p>`,
    solution: `<p><strong>1)</strong></p><p class="math-equation">U<sub>1</sub>=(4/7)×5+3/7=23/7</p><p class="math-equation">U<sub>2</sub>=(4/7)×(23/7)+3/7=113/49</p><p><strong>2-أ)</strong> نبرهن بالتراجع أن <span class="math">U_n&gt;1</span>. عند <span class="math">n=0</span>: <span class="math">U_0=5&gt;1</span>. نفرض أن <span class="math">U_n&gt;1</span>. عندئذ:</p><p class="math-equation">U<sub>n+1</sub>=(4/7)U<sub>n</sub>+3/7&gt;4/7+3/7=1</p><p>إذن <span class="math">U_n&gt;1</span> لكل <span class="math">n</span>.</p><p><strong>2-ب)</strong></p><p class="math-equation">U<sub>n+1</sub>-U<sub>n</sub>=(4/7)U<sub>n</sub>+3/7-U<sub>n</sub>=-3(U<sub>n</sub>-1)/7</p><p>وبما أن <span class="math">U_n&gt;1</span> فإن الفرق سالب، إذن <span class="math">(U_n)</span> متناقصة تماما.</p><p><strong>2-ج)</strong> المتتالية متناقصة ومحدودة من الأسفل بـ <span class="math">1</span>، لذلك فهي متقاربة.</p><p><strong>3-أ)</strong> بما أن <span class="math">V_n=U_n-1</span>، فإن:</p><p class="math-equation">V<sub>n+1</sub>=U<sub>n+1</sub>-1=(4/7)U<sub>n</sub>+3/7-1=(4/7)(U<sub>n</sub>-1)=(4/7)V<sub>n</sub></p><p>إذن <span class="math">(V_n)</span> هندسية أساسها <span class="math">4/7</span> وحدها الأول <span class="math">V_0=U_0-1=4</span>.</p><p><strong>3-ب)</strong></p><p class="math-equation">V<sub>n</sub>=4(4/7)<sup>n</sup></p><p>ومنه:</p><p class="math-equation">U<sub>n</sub>=V<sub>n</sub>+1=1+4(4/7)<sup>n</sup></p><p><strong>3-ج)</strong> بما أن <span class="math">0&lt;4/7&lt;1</span> فإن <span class="math">(4/7)^n</span> يؤول إلى <span class="math">0</span>، وبالتالي:</p><p class="math-equation">lim U<sub>n</sub>=1</p>`,
    detailedSolution: `<div class="detailed-solution"><p><strong>1) ما المطلوب؟</strong> نحسب أول حدين بعد <span class="math">U_0</span> بالتعويض المباشر.</p><p class="math-equation">U<sub>1</sub>=23/7, &nbsp; U<sub>2</sub>=113/49</p><p><strong>2) ما المطلوب؟</strong> نثبت أن الحدود أكبر من <span class="math">1</span>، ثم ندرس الرتابة والتقارب.</p><p><strong>الفكرة المستعملة:</strong> الحصر يثبت بالتراجع لأن العلاقة تراجعية، والرتابة تظهر من إشارة الفرق <span class="math">U_{n+1}-U_n</span>.</p><p>إذا كان <span class="math">U_n&gt;1</span> فإن <span class="math">U_{n+1}&gt;(4/7)×1+3/7=1</span>. ثم:</p><p class="math-equation">U<sub>n+1</sub>-U<sub>n</sub>=-3(U<sub>n</sub>-1)/7</p><p>وهذا الفرق سالب لأن <span class="math">U_n&gt;1</span>. إذن المتتالية متناقصة ومحدودة من الأسفل بـ <span class="math">1</span>، فهي متقاربة.</p><p><strong>3) ما المطلوب؟</strong> نستعمل <span class="math">V_n=U_n-1</span> لتحويل العلاقة إلى هندسية.</p><p><strong>الفكرة المستعملة:</strong> العدد <span class="math">1</span> ثابت في العلاقة لأنه يحقق <span class="math">1=(4/7)×1+3/7</span>، لذلك طرحه يلغي الحد الثابت.</p><p class="math-equation">V<sub>n+1</sub>=(4/7)(U<sub>n</sub>-1)=(4/7)V<sub>n</sub></p><p>إذن <span class="math">(V_n)</span> هندسية أساسها <span class="math">4/7</span> وحدها الأول <span class="math">V_0=4</span>، ومنه <span class="math">V_n=4(4/7)^n</span> و<span class="math">U_n=1+4(4/7)^n</span>.</p><p>ولأن <span class="math">0&lt;4/7&lt;1</span>، فإن <span class="math">(4/7)^n→0</span>، ومنه <span class="math">lim U_n=1</span>.</p><p class="pedagogy-summary"><strong>خلاصة المسار:</strong> بدأنا بالحصر بالتراجع، ثم استعملناه لإشارة الفرق والرتابة. بعد ذلك طرحنا العدد الثابت <span class="math">1</span> للحصول على متتالية هندسية، ومنها وجدنا العبارة الصريحة والنهاية.</p></div>`,
    conceptHints: [
      { title: "الحصر بالتراجع", hint: "تحقق من U_0، ثم افترض U_n>1 واستعمل العلاقة لإثبات أن U_{n+1}>1." },
      { title: "رتابة المتتالية", hint: "احسب الفرق U_{n+1}-U_n وحاول كتابته بدلالة U_n-1 حتى تستعمل الحصر السابق." },
      { title: "التقارب", hint: "بعد إثبات أن المتتالية متناقصة، ابحث عن حد سفلي ثابت لتحصل على التقارب." },
      { title: "المتتالية المساعدة", hint: "اطرح العدد الثابت 1 من U_n، ثم احسب V_{n+1} للوصول إلى علاقة هندسية." },
      { title: "النهاية", hint: "بعد الحصول على (4/7)^n، استعمل أن أساسها بين 0 و1 حتى تحسب النهاية." }
    ]
  },  {
    id: "bac-2017-management-subject-1",
    branch: "management",
    year: "2017",
    title: "بكالوريا 2017 - تسيير واقتصاد - الموضوع الأول",
    statementHtml: `<div class="bac-statement"><p><strong>التمرين: المتتاليات العددية</strong></p><p>لتكن المتتالية <span class="math">(u<sub>n</sub>)</span> معرفة بحدها الأول <span class="math">u<sub>0</sub>=-2</span>، ومن أجل كل عدد طبيعي <span class="math">n</span>:</p><p class="math-equation">u<sub>n+1</sub>=1/2 u<sub>n</sub>+1</p><ol><li><ol type="أ"><li>بين أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n</sub>&lt;2</span>.</li><li>عين اتجاه تغير المتتالية <span class="math">(u<sub>n</sub>)</span> ثم استنتج أنها متقاربة.</li></ol></li><li>لتكن المتتالية <span class="math">(v<sub>n</sub>)</span> المعرفة كما يلي: <span class="math">v<sub>n</sub>=2u<sub>n</sub>-4</span>.<ol type="أ"><li>أثبت أن <span class="math">(v<sub>n</sub>)</span> متتالية هندسية يطلب تعيين أساسها <span class="math">q</span> وحدها الأول <span class="math">v<sub>0</sub></span>.</li><li>جد عبارة <span class="math">v<sub>n</sub></span> بدلالة <span class="math">n</span>، ثم استنتج عبارة <span class="math">u<sub>n</sub></span> بدلالة <span class="math">n</span>.</li></ol></li><li>احسب بدلالة <span class="math">n</span> المجموع <span class="math">S<sub>n</sub></span> حيث:</li></ol><p class="math-equation">S<sub>n</sub>=u<sub>0</sub>+u<sub>1</sub>+...+u<sub>n</sub></p></div>`,
    quickSolution: `<p><strong>1)</strong> لكل <span class="math">n</span>: <span class="math">u<sub>n</sub>&lt;2</span>. كما أن <span class="math">u<sub>n+1</sub>-u<sub>n</sub>=(2-u<sub>n</sub>)/2&gt;0</span>، إذن <span class="math">(u_n)</span> متزايدة ومتقاربة.</p><p><strong>2)</strong> <span class="math">v<sub>0</sub>=-8</span>، <span class="math">q=1/2</span>، <span class="math">v<sub>n</sub>=-8(1/2)<sup>n</sup></span>، و<span class="math">u<sub>n</sub>=2-4(1/2)<sup>n</sup></span>.</p><p><strong>3)</strong> <span class="math">S<sub>n</sub>=2n-6+8(1/2)<sup>n+1</sup></span>.</p>`,
    solution: `<p><strong>1-أ)</strong> نبرهن بالتراجع أن <span class="math">u_n&lt;2</span>. عند <span class="math">n=0</span>: <span class="math">u_0=-2&lt;2</span>. نفرض أن <span class="math">u_n&lt;2</span>. عندئذ:</p><p class="math-equation">u<sub>n+1</sub>=(1/2)u<sub>n</sub>+1&lt;(1/2)×2+1=2</p><p>إذن <span class="math">u_n&lt;2</span> لكل <span class="math">n</span>.</p><p><strong>1-ب)</strong></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=(1/2)u<sub>n</sub>+1-u<sub>n</sub>=(2-u<sub>n</sub>)/2</p><p>وبما أن <span class="math">u_n&lt;2</span> فإن الفرق موجب، إذن <span class="math">(u_n)</span> متزايدة. وهي محدودة من الأعلى بـ <span class="math">2</span>، وبالتالي فهي متقاربة.</p><p><strong>2-أ)</strong> بما أن <span class="math">v_n=2u_n-4</span>، فإن:</p><p class="math-equation">v<sub>n+1</sub>=2u<sub>n+1</sub>-4=2((1/2)u<sub>n</sub>+1)-4=u<sub>n</sub>-2</p><p>ومن جهة أخرى <span class="math">(1/2)v_n=(1/2)(2u_n-4)=u_n-2</span>. إذن:</p><p class="math-equation">v<sub>n+1</sub>=(1/2)v<sub>n</sub></p><p>فتكون <span class="math">(v_n)</span> هندسية أساسها <span class="math">q=1/2</span>، وحدها الأول <span class="math">v_0=2(-2)-4=-8</span>.</p><p><strong>2-ب)</strong></p><p class="math-equation">v<sub>n</sub>=-8(1/2)<sup>n</sup></p><p>وبما أن <span class="math">v_n=2u_n-4</span>، فإن:</p><p class="math-equation">u<sub>n</sub>=(v<sub>n</sub>+4)/2=2-4(1/2)<sup>n</sup></p><p><strong>3)</strong></p><p class="math-equation">S<sub>n</sub>=Σ<sub>k=0</sub><sup>n</sup>[2-4(1/2)<sup>k</sup>]</p><p class="math-equation">S<sub>n</sub>=2(n+1)-4×(1-(1/2)<sup>n+1</sup>)/(1-1/2)</p><p class="math-equation">S<sub>n</sub>=2n-6+8(1/2)<sup>n+1</sup></p>`,
    detailedSolution: `<div class="detailed-solution"><p><strong>1) ما المطلوب؟</strong> نثبت الحصر <span class="math">u_n&lt;2</span> ثم نستعمله لتحديد الرتابة والتقارب.</p><p><strong>الفكرة المستعملة:</strong> العلاقة تراجعية، لذلك نثبت الحصر بالتراجع. ثم نحسب الفرق <span class="math">u_{n+1}-u_n</span> ونستعمل الحصر لتحديد إشارته.</p><p><strong>التطبيق:</strong> عند <span class="math">n=0</span>: <span class="math">-2&lt;2</span>. إذا كان <span class="math">u_n&lt;2</span> فإن <span class="math">u_{n+1}&lt;2</span>. ثم:</p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=(2-u<sub>n</sub>)/2</p><p>وهذا الفرق موجب لأن <span class="math">u_n&lt;2</span>. إذن المتتالية متزايدة ومحدودة من الأعلى، فهي متقاربة.</p><p><strong>2) ما المطلوب؟</strong> نثبت أن <span class="math">v_n=2u_n-4</span> هندسية ونستخرج العبارات الصريحة.</p><p><strong>الفكرة المستعملة:</strong> العدد <span class="math">2</span> هو العدد الثابت للعلاقة، لذلك التعبير <span class="math">2u_n-4=2(u_n-2)</span> يعزل البعد عن هذا العدد الثابت.</p><p><strong>التطبيق:</strong></p><p class="math-equation">v<sub>n+1</sub>=2u<sub>n+1</sub>-4=u<sub>n</sub>-2=(1/2)(2u<sub>n</sub>-4)=(1/2)v<sub>n</sub></p><p>إذن <span class="math">q=1/2</span> و<span class="math">v_0=-8</span>. ومنه <span class="math">v_n=-8(1/2)^n</span>، وبالرجوع إلى <span class="math">u_n</span>: <span class="math">u_n=2-4(1/2)^n</span>.</p><p><strong>3) ما المطلوب؟</strong> نحسب مجموع الحدود من <span class="math">0</span> إلى <span class="math">n</span>.</p><p><strong>الفكرة المستعملة:</strong> نستعمل عبارة <span class="math">u_k</span> ونفصل مجموع الثابت عن مجموع هندسي أساسه <span class="math">1/2</span>.</p><p class="math-equation">S<sub>n</sub>=2(n+1)-4Σ<sub>k=0</sub><sup>n</sup>(1/2)<sup>k</sup>=2n-6+8(1/2)<sup>n+1</sup></p><p class="pedagogy-summary"><strong>خلاصة المسار:</strong> بدأنا بالحصر بالتراجع، ثم استعملنا الفرق لدراسة الرتابة. بعد ذلك حولنا العلاقة إلى متتالية هندسية بواسطة <span class="math">v_n</span>، واستعملنا العبارة الصريحة لحساب المجموع.</p></div>`,
    conceptHints: [
      { title: "الحصر بالتراجع", hint: "تحقق من u_0 أولا، ثم افترض u_n<2 واستعمل u_{n+1}=1/2u_n+1 لإثبات أن الحد التالي يبقى أصغر من 2." },
      { title: "رتابة المتتالية", hint: "احسب u_{n+1}-u_n وحاول كتابته بدلالة 2-u_n حتى تستفيد من الحصر السابق." },
      { title: "المتتالية المساعدة", hint: "احسب v_{n+1}=2u_{n+1}-4، ثم عوض u_{n+1} للوصول إلى v_{n+1}=qv_n." },
      { title: "حساب المجموع", hint: "بعد إيجاد u_n، اجمع الثابت 2 بعدد الحدود n+1، ثم اجمع الحد الهندسي أساسه 1/2." }
    ]
  },
  {
    id: "bac-2017-management-subject-2",
    branch: "management",
    year: "2017",
    title: "بكالوريا 2017 - تسيير واقتصاد - الموضوع الثاني",
    statementHtml: `<div class="bac-statement"><p><strong>التمرين: المتتاليات العددية</strong></p><p>نعتبر المتتالية الهندسية <span class="math">(v<sub>n</sub>)</span> ذات الأساس <span class="math">e<sup>2</sup></span> والحد الأول <span class="math">v<sub>0</sub>=1</span>، حيث <span class="math">e</span> أساس اللوغاريتم النيبيري.</p><ol><li>احسب بدلالة <span class="math">n</span> المجموع <span class="math">S<sub>n</sub></span> حيث: <span class="math">S<sub>n</sub>=v<sub>0</sub>+v<sub>1</sub>+...+v<sub>n</sub></span>.</li><li>نعتبر المتتاليتين <span class="math">(u<sub>n</sub>)</span> و<span class="math">(w<sub>n</sub>)</span> المعرفتين كما يلي، من أجل كل عدد طبيعي <span class="math">n</span>:</li></ol><p class="math-equation">u<sub>n</sub>=w<sub>n</sub>-v<sub>n</sub>, &nbsp; w<sub>n</sub>=2n+4+e<sup>2n</sup></p><p>بين أن <span class="math">(u<sub>n</sub>)</span> متتالية حسابية، حدد أساسها <span class="math">r</span> وحدها الأول <span class="math">u<sub>0</sub></span>.</p><ol start="3"><li>أثبت أنه من أجل كل عدد طبيعي <span class="math">n</span>:</li></ol><p class="math-equation">4+6+8+...+(2n+4)=(n+1)(n+4)</p><ol start="4"><li>استنتج المجموع <span class="math">T<sub>n</sub></span> بدلالة <span class="math">n</span> حيث: <span class="math">T<sub>n</sub>=w<sub>0</sub>+w<sub>1</sub>+...+w<sub>n</sub></span>.</li></ol></div>`,
    quickSolution: `<p><strong>1)</strong> <span class="math">v<sub>n</sub>=e<sup>2n</sup></span> و<span class="math">S<sub>n</sub>=(e<sup>2(n+1)</sup>-1)/(e<sup>2</sup>-1)</span>.</p><p><strong>2)</strong> <span class="math">u<sub>n</sub>=2n+4</span>، فهي حسابية أساسها <span class="math">r=2</span> وحدها الأول <span class="math">u<sub>0</sub>=4</span>.</p><p><strong>3)</strong> <span class="math">4+6+...+(2n+4)=(n+1)(n+4)</span>.</p><p><strong>4)</strong> <span class="math">T<sub>n</sub>=(n+1)(n+4)+(e<sup>2(n+1)</sup>-1)/(e<sup>2</sup>-1)</span>.</p>`,
    solution: `<p><strong>1)</strong> بما أن <span class="math">(v_n)</span> هندسية أساسها <span class="math">e^2</span> وحدها الأول <span class="math">v_0=1</span>، فإن:</p><p class="math-equation">v<sub>n</sub>=(e<sup>2</sup>)<sup>n</sup>=e<sup>2n</sup></p><p>إذن:</p><p class="math-equation">S<sub>n</sub>=1+e<sup>2</sup>+...+e<sup>2n</sup>=(e<sup>2(n+1)</sup>-1)/(e<sup>2</sup>-1)</p><p><strong>2)</strong> لدينا:</p><p class="math-equation">u<sub>n</sub>=w<sub>n</sub>-v<sub>n</sub>=2n+4+e<sup>2n</sup>-e<sup>2n</sup>=2n+4</p><p>إذن <span class="math">(u_n)</span> حسابية، أساسها <span class="math">r=2</span> وحدها الأول <span class="math">u_0=4</span>.</p><p><strong>3)</strong> هذا مجموع حدود المتتالية الحسابية <span class="math">u_k=2k+4</span> من <span class="math">k=0</span> إلى <span class="math">n</span>. عدد الحدود هو <span class="math">n+1</span>، والحد الأول <span class="math">4</span> والأخير <span class="math">2n+4</span>، ومنه:</p><p class="math-equation">4+6+...+(2n+4)=(n+1)(4+2n+4)/2=(n+1)(n+4)</p><p><strong>4)</strong> بما أن <span class="math">w_n=u_n+v_n</span>، فإن:</p><p class="math-equation">T<sub>n</sub>=Σ<sub>k=0</sub><sup>n</sup>u<sub>k</sub>+Σ<sub>k=0</sub><sup>n</sup>v<sub>k</sub></p><p>وباستعمال النتيجتين السابقتين:</p><p class="math-equation">T<sub>n</sub>=(n+1)(n+4)+(e<sup>2(n+1)</sup>-1)/(e<sup>2</sup>-1)</p>`,
    detailedSolution: `<div class="detailed-solution"><p><strong>1) ما المطلوب؟</strong> نحسب مجموع حدود متتالية هندسية من <span class="math">v_0</span> إلى <span class="math">v_n</span>.</p><p><strong>الفكرة المستعملة:</strong> عندما تكون المتتالية هندسية، نستعمل صيغة مجموع الحدود الهندسية. هنا الأساس هو <span class="math">e^2</span> وليس مساويا لـ <span class="math">1</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">v<sub>n</sub>=v<sub>0</sub>(e<sup>2</sup>)<sup>n</sup>=e<sup>2n</sup></p><p class="math-equation">S<sub>n</sub>=(e<sup>2(n+1)</sup>-1)/(e<sup>2</sup>-1)</p><p><strong>2) ما المطلوب؟</strong> نثبت أن <span class="math">u_n=w_n-v_n</span> حسابية.</p><p><strong>الفكرة المستعملة:</strong> نعوض <span class="math">w_n</span> و<span class="math">v_n</span>، ونلاحظ أن الحد الأسي يحذف.</p><p class="math-equation">u<sub>n</sub>=2n+4+e<sup>2n</sup>-e<sup>2n</sup>=2n+4</p><p><strong>النتيجة:</strong> <span class="math">r=2</span> و<span class="math">u_0=4</span>.</p><p><strong>3) ما المطلوب؟</strong> نحسب مجموع الحدود الزوجية من <span class="math">4</span> إلى <span class="math">2n+4</span>.</p><p><strong>الفكرة المستعملة:</strong> هذا هو مجموع حدود المتتالية الحسابية <span class="math">u_k=2k+4</span>، وعدد الحدود من <span class="math">0</span> إلى <span class="math">n</span> هو <span class="math">n+1</span>.</p><p class="math-equation">4+6+...+(2n+4)=(n+1)(4+2n+4)/2=(n+1)(n+4)</p><p><strong>4) ما المطلوب؟</strong> نحسب مجموع <span class="math">w_k</span>.</p><p><strong>الفكرة المستعملة:</strong> نفصل <span class="math">w_k</span> إلى جزء حسابي <span class="math">u_k</span> وجزء هندسي <span class="math">v_k</span>.</p><p class="math-equation">T<sub>n</sub>=Σu<sub>k</sub>+Σv<sub>k</sub>=(n+1)(n+4)+(e<sup>2(n+1)</sup>-1)/(e<sup>2</sup>-1)</p><p class="pedagogy-summary"><strong>خلاصة المسار:</strong> حسبنا أولا مجموع المتتالية الهندسية، ثم لاحظنا أن طرح <span class="math">v_n</span> من <span class="math">w_n</span> يترك متتالية حسابية. وفي النهاية جمعنا <span class="math">w_n</span> بفصل الجزء الحسابي عن الجزء الهندسي.</p></div>`,
    conceptHints: [
      { title: "المتتالية الهندسية", hint: "اكتب v_n أولا باستعمال v_0 والأساس e^2، ثم استعمل صيغة مجموع الحدود الهندسية من 0 إلى n." },
      { title: "المتتالية الحسابية", hint: "عوض w_n وv_n داخل u_n=w_n-v_n ولاحظ أي حد يختفي بعد الطرح." },
      { title: "حساب مجموع حسابي", hint: "عدد الحدود من 4 إلى 2n+4 هو n+1 لأنها توافق k=0 إلى k=n." },
      { title: "تفكيك المجموع", hint: "اكتب w_k=u_k+v_k، ثم اجمع مجموع u_k ومجموع v_k كل واحد بصيغته." }
    ]
  },  {
    id: "bac-2018-management-subject-2",
    branch: "management",
    year: "2018",
    title: "بكالوريا 2018 - تسيير واقتصاد - الموضوع الثاني",
    statementHtml: `<div class="bac-statement">
      <p><strong>التمرين: المتتاليات العددية</strong></p>
      <p>المتتالية العددية <span class="math">(u<sub>n</sub>)</span> معرفة كما يلي:</p>
      <p class="math-equation">u<sub>0</sub>=-1, &nbsp; 2u<sub>n+1</sub>=u<sub>n</sub>+6</p>
      <ol>
        <li>
          <ol type="أ">
            <li>برهن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">u<sub>n</sub>&lt;6</span>.</li>
            <li>ادرس اتجاه تغير المتتالية <span class="math">(u<sub>n</sub>)</span>، واستنتج أنها متقاربة.</li>
          </ol>
        </li>
        <li>نضع من أجل كل عدد طبيعي <span class="math">n</span>: <span class="math">v<sub>n</sub>=u<sub>n</sub>-6</span>.
          <ol type="أ">
            <li>بين أن <span class="math">(v<sub>n</sub>)</span> متتالية هندسية أساسها <span class="math">1/2</span> يطلب حساب حدها الأول <span class="math">v<sub>0</sub></span>.</li>
            <li>اكتب <span class="math">v<sub>n</sub></span> بدلالة <span class="math">n</span>، ثم احسب <span class="math">lim u<sub>n</sub></span>.</li>
          </ol>
        </li>
        <li>احسب بدلالة <span class="math">n</span> كلا من:</li>
      </ol>
      <p class="math-equation">S<sub>n</sub>=u<sub>0</sub>+u<sub>1</sub>+u<sub>2</sub>+...+u<sub>n</sub>, &nbsp; P<sub>n</sub>=v<sub>0</sub>×v<sub>1</sub>×v<sub>2</sub>×...×v<sub>n</sub></p>
    </div>`,
    quickSolution: `<p><strong>1)</strong> لكل <span class="math">n</span>: <span class="math">u<sub>n</sub>&lt;6</span>. كما أن <span class="math">u<sub>n+1</sub>-u<sub>n</sub>=(6-u<sub>n</sub>)/2&gt;0</span>، إذن <span class="math">(u_n)</span> متزايدة ومتقاربة.</p><p><strong>2)</strong> <span class="math">v<sub>0</sub>=-7</span>، <span class="math">v<sub>n+1</sub>=(1/2)v<sub>n</sub></span>، <span class="math">v<sub>n</sub>=-7(1/2)<sup>n</sup></span>، و<span class="math">lim u<sub>n</sub>=6</span>.</p><p><strong>3)</strong> <span class="math">S<sub>n</sub>=6n-8+7(1/2)<sup>n</sup></span>، و<span class="math">P<sub>n</sub>=(-7)<sup>n+1</sup>(1/2)<sup>n(n+1)/2</sup></span>.</p>`,
    solution: `<p><strong>1-أ)</strong> من العلاقة <span class="math">2u<sub>n+1</sub>=u<sub>n</sub>+6</span> نحصل على <span class="math">u<sub>n+1</sub>=(1/2)u<sub>n</sub>+3</span>.</p><p>نبرهن بالتراجع أن <span class="math">u_n&lt;6</span>. عند <span class="math">n=0</span>: <span class="math">u_0=-1&lt;6</span>. نفرض أن <span class="math">u_n&lt;6</span>. عندئذ:</p><p class="math-equation">u<sub>n+1</sub>=(1/2)u<sub>n</sub>+3&lt;(1/2)×6+3=6</p><p>إذن <span class="math">u_n&lt;6</span> لكل <span class="math">n</span>.</p><p><strong>1-ب)</strong></p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=(1/2)u<sub>n</sub>+3-u<sub>n</sub>=(6-u<sub>n</sub>)/2</p><p>وبما أن <span class="math">u_n&lt;6</span> فإن الفرق موجب، إذن <span class="math">(u_n)</span> متزايدة. وهي محدودة من الأعلى بـ <span class="math">6</span>، وبالتالي فهي متقاربة.</p><p><strong>2-أ)</strong> بما أن <span class="math">v_n=u_n-6</span>، فإن:</p><p class="math-equation">v<sub>n+1</sub>=u<sub>n+1</sub>-6=(1/2)u<sub>n</sub>+3-6=(1/2)(u<sub>n</sub>-6)=(1/2)v<sub>n</sub></p><p>إذن <span class="math">(v_n)</span> هندسية أساسها <span class="math">1/2</span>، وحدها الأول <span class="math">v_0=u_0-6=-7</span>.</p><p><strong>2-ب)</strong></p><p class="math-equation">v<sub>n</sub>=-7(1/2)<sup>n</sup></p><p>ومنه <span class="math">u_n=v_n+6=6-7(1/2)^n</span>. وبما أن <span class="math">(1/2)^n</span> يؤول إلى <span class="math">0</span>، فإن:</p><p class="math-equation">lim u<sub>n</sub>=6</p><p><strong>3)</strong> نحسب المجموع باستعمال <span class="math">u_k=6-7(1/2)^k</span>:</p><p class="math-equation">S<sub>n</sub>=Σ<sub>k=0</sub><sup>n</sup>[6-7(1/2)<sup>k</sup>]</p><p class="math-equation">S<sub>n</sub>=6(n+1)-7×(1-(1/2)<sup>n+1</sup>)/(1-1/2)</p><p class="math-equation">S<sub>n</sub>=6n-8+7(1/2)<sup>n</sup></p><p>وللجداء:</p><p class="math-equation">P<sub>n</sub>=∏<sub>k=0</sub><sup>n</sup>[-7(1/2)<sup>k</sup>]=(-7)<sup>n+1</sup>(1/2)<sup>0+1+...+n</sup></p><p class="math-equation">P<sub>n</sub>=(-7)<sup>n+1</sup>(1/2)<sup>n(n+1)/2</sup></p>`,
    detailedSolution: `<div class="detailed-solution"><p><strong>1) ما المطلوب؟</strong> نثبت أولا أن كل حدود المتتالية أصغر من <span class="math">6</span>، ثم نستعمل هذا الحصر لدراسة الرتابة.</p><p><strong>الفكرة المستعملة:</strong> بما أن العلاقة تراجعية، فالحصر يثبت بالتراجع. والرتابة تظهر من إشارة الفرق <span class="math">u_{n+1}-u_n</span>.</p><p><strong>التطبيق:</strong> عند <span class="math">n=0</span> لدينا <span class="math">-1&lt;6</span>. إذا افترضنا <span class="math">u_n&lt;6</span> فإن:</p><p class="math-equation">u<sub>n+1</sub>=(1/2)u<sub>n</sub>+3&lt;6</p><p>إذن الحصر صحيح لكل <span class="math">n</span>. ثم:</p><p class="math-equation">u<sub>n+1</sub>-u<sub>n</sub>=(6-u<sub>n</sub>)/2</p><p>وهذا الفرق موجب بفضل الحصر السابق، إذن المتتالية متزايدة. وبما أنها محدودة من الأعلى بـ <span class="math">6</span> فهي متقاربة.</p><p><strong>النتيجة:</strong> <span class="math">u_n&lt;6</span> و<span class="math">(u_n)</span> متزايدة ومتقاربة.</p><p><strong>2) ما المطلوب؟</strong> نريد تحويل العلاقة إلى متتالية هندسية باستعمال <span class="math">v_n=u_n-6</span>.</p><p><strong>الفكرة المستعملة:</strong> العدد <span class="math">6</span> هو العدد الثابت للعلاقة لأنه يحقق <span class="math">6=(1/2)×6+3</span>. لذلك طرحه يلغي الحد الثابت.</p><p><strong>التطبيق:</strong></p><p class="math-equation">v<sub>n+1</sub>=u<sub>n+1</sub>-6=(1/2)(u<sub>n</sub>-6)=(1/2)v<sub>n</sub></p><p>كما أن <span class="math">v_0=-1-6=-7</span>، ومنه:</p><p class="math-equation">v<sub>n</sub>=-7(1/2)<sup>n</sup></p><p>وبالتالي <span class="math">u_n=6-7(1/2)^n</span>. وبما أن <span class="math">(1/2)^n→0</span> فإن <span class="math">lim u_n=6</span>.</p><p><strong>3) ما المطلوب؟</strong> نحسب مجموع حدود <span class="math">u_n</span> وجداء حدود <span class="math">v_n</span>.</p><p><strong>الفكرة المستعملة:</strong> في المجموع نفصل الثابت <span class="math">6</span> عن الحد الهندسي. وفي الجداء نجمع أسس <span class="math">1/2</span> من <span class="math">0</span> إلى <span class="math">n</span>.</p><p><strong>التطبيق:</strong></p><p class="math-equation">S<sub>n</sub>=6(n+1)-7\frac{1-(1/2)^{n+1}}{1-1/2}=6n-8+7(1/2)^n</p><p class="math-equation">P<sub>n</sub>=(-7)<sup>n+1</sup>(1/2)<sup>0+1+...+n</sup>=(-7)<sup>n+1</sup>(1/2)<sup>n(n+1)/2</sup></p><p class="pedagogy-summary"><strong>خلاصة المسار:</strong> أثبتنا الحصر بالتراجع، ثم استعملناه لإشارة الفرق والرتابة. بعد ذلك طرحنا العدد الثابت <span class="math">6</span> للحصول على متتالية هندسية، ومنها استخرجنا النهاية والمجموع والجداء.</p></div>`,
    conceptHints: [
      { title: "الحصر بالتراجع", hint: "ابدأ من u_0، ثم افترض أن u_n أصغر من 6 واستعمل العلاقة u_{n+1}=(1/2)u_n+3 لإثبات نفس الحصر للحد التالي." },
      { title: "رتابة المتتالية", hint: "احسب الفرق u_{n+1}-u_n وحاول كتابته بدلالة 6-u_n حتى تستعمل الحصر السابق." },
      { title: "المتتالية المساعدة", hint: "احسب v_{n+1}=u_{n+1}-6، ثم عوض u_{n+1}. الهدف هو الوصول إلى علاقة من الشكل v_{n+1}=qv_n." },
      { title: "حساب المجموع", hint: "اكتب u_k على شكل ثابت زائد حد هندسي، ثم اجمع من k=0 إلى n مع الانتباه إلى أن عدد الحدود n+1." },
      { title: "حساب الجداء", hint: "بعد كتابة v_k=-7(1/2)^k، اجمع الأسس 0+1+...+n داخل الجداء." }
    ]
  },  {
    id: "bac-model-2",
    branch: "management",
    year: "نموذج",
    title: "تمرين تطبيقي - تسيير واقتصاد",
    statementHtml: `<div class="bac-statement">
      <p>رأس مال قدره <span class="math">50000</span> دج يزداد بنسبة <span class="math">4%</span> كل سنة.</p>
      <p>اكتب عبارة رأس المال بعد <span class="math">n</span> سنوات واحسب قيمته بعد <span class="math">3</span> سنوات.</p>
    </div>`,
    quickSolution: `<p><span class="math">C<sub>n</sub> = 50000 × 1.04<sup>n</sup></span> دج؛ <span class="math">C<sub>3</sub> = 56243.2</span> دج تقريبا.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p>في هذا التمرين، نستعمل المتتالية الهندسية. الهدف هو التعرف على المتتالية الهندسية.</p>
<p class="pedagogy-step">نستعمل تعريف المتتالية الهندسية لأن النسبة بين حدين متتاليين ثابتة.</p>
<p>بعد <span class="math">n</span> سنة:</p>
      <p class="math-equation">C<sub>n</sub> = 50000 × 1.04<sup>n</sup></p>
      <p>بعد 3 سنوات:</p>
      <p class="math-equation">C<sub>3</sub> = 50000 × 1.04³ = 56243.2 دج تقريبا</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نتبع الترتيب التالي: استعمال المتتالية الهندسية، ونكتب النتيجة النهائية في كل جزء.</p>
</div>`,
    solution: `<p>بعد <span class=\"math\">n</span> سنة:</p>
      <p class=\"math-equation\">C<sub>n</sub> = 50000 × 1.04<sup>n</sup></p>
      <p>بعد 3 سنوات:</p>
      <p class=\"math-equation\">C<sub>3</sub> = 50000 × 1.04³ = 56243.2 دج تقريبا</p>`
  },  {
    id: "bac-model-3",
    branch: "literary",
    year: "نموذج",
    title: "تمرين نموذجي - أدبي",
    statementHtml: `<div class="bac-statement">
      <p>نمط عددي يبدأ بـ <span class="math">6</span> ثم نضيف <span class="math">5</span> في كل مرة.</p>
      <p>اكتب الحدود الخمسة الأولى والحد العام.</p>
    </div>`,
    quickSolution: `<p>الحدود الخمسة الأولى: <span class="math">6, 11, 16, 21, 26</span>؛ <span class="math">u<sub>n</sub> = 6 + 5n</span>.</p>`,
    detailedSolution: `<div class="detailed-solution">
<p>في هذا التمرين، نستعمل المتتالية الحسابية. الهدف هو التعرف على المتتالية الحسابية.</p>
<p class="pedagogy-step">نستعمل تعريف المتتالية الحسابية لأن الفرق بين حدين متتاليين ثابت.</p>
<p>الحدود الخمسة الأولى:</p>
      <p class="math-equation">6, 11, 16, 21, 26</p>
      <p>المتتالية حسابية أساسها <span class="math">5</span>، والحد العام:</p>
      <p class="math-equation">u<sub>n</sub> = 6 + 5n</p>
<p class="pedagogy-summary"><strong>خلاصة المسار:</strong> نتبع الترتيب التالي: استعمال المتتالية الحسابية، ونكتب النتيجة النهائية في كل جزء.</p>
</div>`,
    solution: `<p>الحدود الخمسة الأولى:</p>
      <p class=\"math-equation\">6, 11, 16, 21, 26</p>
      <p>المتتالية حسابية أساسها <span class=\"math\">5</span>، والحد العام:</p>
      <p class=\"math-equation\">u<sub>n</sub> = 6 + 5n</p>`
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

function stripHtml(value = "") {
  return String(value).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function extractMathEquations(html = "") {
  const equations = [];
  const regex = /<p class="math-equation">(.*?)<\/p>/gis;
  let match;
  while ((match = regex.exec(html)) !== null) {
    equations.push(match[1].trim());
  }
  return equations;
}

function finalAnswerFor(ex) {
  if (ex.finalAnswer) return ex.finalAnswer;
  if (ex.quickSolution) return ex.quickSolution;

  const source = ex.solution || ex.answer || "";
  if (!source) return "لا توجد نتائج نهائية بعد.";

  const equations = extractMathEquations(source);
  if (equations.length > 0) {
    const finalEquations = equations.slice(-4);
    return `<p>النتائج النهائية:</p>${finalEquations.map((eq) => `<p class="math-equation">${eq}</p>`).join("")}`;
  }

  const plain = stripHtml(source);
  return plain ? `<p>النتيجة النهائية: ${plain}</p>` : "لا توجد نتائج نهائية بعد.";
}

function hintButton(title, hint) {
  return `<details class="concept-hint"><summary><span>${title}</span><strong>الفكرة</strong></summary><p>${hint}</p></details>`;
}

function conceptHintsFor(ex) {
  if (ex.conceptHints) return ex.conceptHints;
  const source = stripHtml(`${ex.statementHtml || ex.statement || ex.text || ""} ${ex.solution || ex.answer || ""}`);
  const hints = [];

  if (/f\(|f'|مشتق|الدالة|تغير الدالة|وضعية/.test(source)) {
    hints.push({
      title: "دراسة دالة",
      hint: "ابدأ بالمشتقة أو بالفرق <span class='math'>f(x)-x</span> حسب المطلوب: المشتقة تعطي اتجاه التغير، والفرق <span class='math'>f(x)-x</span> يحدد موضع المنحنى بالنسبة إلى <span class='math'>y=x</span> أو إشارة uₙ₊₁-uₙ."
    });
  }
  if (/بالتراجع|الحصر|≤|<|ينتمي|المجال/.test(source)) {
    hints.push({
      title: "الحصر بالتراجع",
      hint: "ثبت الحصر عند <span class='math'>n=0</span> أولا، ثم افترض أن uₙ داخل المجال المطلوب واستعمل علاقة التعريف أو صورة المجال بالدالة لتثبت أن uₙ₊₁ يبقى داخل نفس الحصر."
    });
  }
  if (/متزايد|متناق|اتجاه تغير|رتابة/.test(source)) {
    hints.push({
      title: "رتابة المتتالية",
      hint: "لا تخمن فقط: احسب uₙ₊₁-uₙ أو استعمل إشارة <span class='math'>f(x)-x</span> عندما تكون uₙ₊₁=f(uₙ). إذا كان الفرق موجبا فهي متزايدة، وإذا كان سالبا فهي متناقصة."
    });
  }
  if (/متقارب|محدود|النهاية|lim/.test(source)) {
    hints.push({
      title: "التقارب والنهاية",
      hint: "بعد إثبات الرتابة، ابحث عن حد علوي أو سفلي. المتتالية الرتيبة والمحدودة متقاربة. لحساب النهاية استعمل العبارة الصريحة أو مرر إلى النهاية في العلاقة إذا كان ذلك آمنا."
    });
  }
  if (/هندسية|أساسها|v<sub>|vₙ|w<sub>|wₙ/.test(source)) {
    hints.push({
      title: "المتتالية المساعدة",
      hint: "عند تعريف vₙ أو wₙ، احسب vₙ₊₁ بدلالة uₙ ثم عوض علاقة uₙ₊₁. الهدف أن تصل إلى شكل vₙ₊₁ = qvₙ، وبعدها مباشرة vₙ = v₀qⁿ."
    });
  }
  if (/S<sub>|Sₙ|مجموع|Σ|\+ \.\.\./.test(source)) {
    hints.push({
      title: "حساب المجموع",
      hint: "حوّل كل حد في المجموع إلى صيغة معروفة: ثابت زائد حد هندسي، أو حد هندسي فقط. بعدها استعمل مجموع المتتالية الهندسية 1+q+...+qⁿ."
    });
  }
  if (/PGCD|القاسم|قاسم/.test(source)) {
    hints.push({
      title: "القاسم المشترك PGCD",
      hint: "استعمل الخاصية PGCD(a,b+ka)=PGCD(a,b). احذف من العدد الثاني كل جزء مضاعف للأول، ثم احسب القاسم المشترك الباقي."
    });
  }

  if (!hints.length) {
    hints.push({
      title: "قراءة المطلوب",
      hint: "قسّم السؤال إلى مراحل صغيرة: احسب الحد الأول، استخرج العلاقة المناسبة، ثم استعمل النتيجة السابقة في السؤال الموالي."
    });
  }
  return hints;
}

function renderConceptHints(ex) {
  const hints = conceptHintsFor(ex);
  return `<div class="solution-hints"><strong>أفكار مساعدة قبل الحل</strong><div class="concept-hint-list">${hints.map((item) => hintButton(item.title, item.hint)).join("")}</div></div>`;
}

function detailedSolutionFor(ex) {
  const detailed = ex.detailedSolution || ex.solution || ex.answer || "";
  if (!detailed) return "لا يوجد حل مفصل بعد.";
  return `${renderConceptHints(ex)}${detailed}`;
}

function solutionContent(ex, mode) {
  if (mode === "quick") return finalAnswerFor(ex);
  if (mode === "detailed") return detailedSolutionFor(ex);
  return ex.solution || ex.answer || "لا يوجد حل عادي بعد.";
}
function solutionLabel(mode) {
  if (mode === "quick") return "حل سريع";
  if (mode === "detailed") return "حل مفصل";
  return "حل عادي";
}

function renderSolutionButtons(id, activeMode, buttonClass = "solution-action") {
  return ["quick", "normal", "detailed"].map((mode) => (
    `<button type="button" class="ghost-action ${buttonClass} ${activeMode === mode ? "active" : ""}" data-solution-id="${id}" data-solution-mode="${mode}">${solutionLabel(mode)}</button>`
  )).join("");
}

function renderExerciseCard(ex, id) {
  const statement = ex.statementHtml || `<p>${ex.text || ex.statement}</p>`;
  const figure = ex.figureHtml || "";
  const activeMode = state.openSolutions[id] || "";
  const solution = activeMode ? `<div class="solution-heading">${solutionLabel(activeMode)}</div><div class="solution-text">${solutionContent(ex, activeMode)}</div>` : "";
  return `<section class="exercise-card"><h3>${ex.title}</h3>${figure}${statement}<div class="solution-actions">${renderSolutionButtons(id, activeMode)}</div><div class="solution ${activeMode ? "show" : ""}">${solution}</div></section>`;
}

function renderBacCard(ex, id) {
  const statement = ex.statementHtml || `<p>${ex.text || ex.statement}</p>`;
  const figure = ex.figureHtml || "";
  const activeMode = state.openSolutions[id] || "";
  const solution = activeMode ? `<div class="bac-solution-title">${solutionLabel(activeMode)}</div><div class="bac-solution-text">${solutionContent(ex, activeMode)}</div>` : "";
  const shortTitle = ex.title.replace(/^بكالوريا \d+ - /, "").replace(/^تمرين بكالوريا نموذجي - /, "");
  return `<article class="bac-exercise-card" data-year="${ex.year}" data-stream="${ex.stream}">
    <header class="bac-exercise-header">
      <h3 class="bac-exercise-title"><span class="bac-year-badge">${ex.year}</span><span>${shortTitle}</span></h3>
    </header>
    <div class="bac-exercise-body"><div class="bac-exercise-text">${figure}${statement}</div></div>
    <footer class="bac-exercise-footer"><div class="solution-actions">${renderSolutionButtons(id, activeMode, "bac-solution-toggle")}</div></footer>
    <div class="bac-solution-panel ${activeMode ? "open" : ""}">${solution}</div>
  </article>`;
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
  list.innerHTML = visible.length ? `<div class="bac-exercises-list">${visible.map((ex) => renderBacCard(ex, `bac-${ex.id}`)).join("")}</div>` : `<section class="card"><p>لا توجد نماذج لهذه الشعبة بعد.</p></section>`;
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
  const solutionMode = event.target.closest("[data-solution-mode]");
  if (solutionMode) {
    const id = solutionMode.dataset.solutionId;
    const mode = solutionMode.dataset.solutionMode;
    state.openSolutions[id] = state.openSolutions[id] === mode ? "" : mode;
    renderAll();
  }
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
