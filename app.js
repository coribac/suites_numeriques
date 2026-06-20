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
        hint: "ابدأ من u_0 على محور الفواصل، اصعد إلى المنحنى، ثم انتقل أفقيا إلى المستقيم y=x. الرسم يعطي التخمين فقط، أما الرتابة والنهاية فتثبت جبريا."
      },
      {
        title: "الحصر بالتراجع",
        hint: "تحقق من n=0، ثم افترض أن u_n بين -4 و-1، وأثبت أن f(u_n) يبقى بين -4 و-1 بدراسة f(x)+1 وf(x)+4."
      },
      {
        title: "إشارة u_n + 1",
        hint: "انتبه: من الحصر لدينا u_n+1<0. لذلك عند ضرب متراجحة في u_n+1 يتغير اتجاه الإشارة."
      },
      {
        title: "حساب النهاية بالحصر",
        hint: "إذا حصلت على -2(3/4)^n ≤ u_n+1 < 0، فالطرفان يؤولان إلى 0، ومنه u_n+1 يؤول إلى 0."
      },
      {
        title: "حساب المجموع",
        hint: "اجمع المتراجحات من k=0 إلى n، واستعمل مجموع المتتالية الهندسية 1+q+...+q^n."
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
        hint: "لاحظ أن u_n + 2√u_n + 1 يساوي (√u_n + 1)^2. هذه الفكرة تحول العلاقة التراجعية إلى علاقة بسيطة بين الجذور."
      },
      {
        title: "متتالية الجذور",
        hint: "بعد الحصول على √u_{n+1}-√u_n=1، اعتبر √u_n متتالية حسابية أساسها 1، ثم استعمل حدها الأول √u_1."
      },
      {
        title: "القسمة",
        hint: "لإثبات أن عددا يقسم آخر، حاول كتابة العدد الثاني بدلالة الأول زائد باقي صغير، مثل n-5=(n-2)-3."
      },
      {
        title: "PGCD",
        hint: "استعمل الكتابة u_n=n(n-2)+1، فباقي قسمة u_n على n-2 هو 1، وهذا يعطي مباشرة القاسم المشترك."
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
      <p class=\"math-equation\">u<sub>n</sub> = v<sub>n</sub> - 3 = 4 × 2<sup>n</sup> - 3</p>`
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
      hint: "ابدأ بالمشتقة أو بالفرق f(x)-x حسب المطلوب: المشتقة تعطي اتجاه التغير، والفرق f(x)-x يحدد موضع المنحنى بالنسبة إلى y=x أو إشارة uₙ₊₁-uₙ."
    });
  }
  if (/بالتراجع|الحصر|≤|<|ينتمي|المجال/.test(source)) {
    hints.push({
      title: "الحصر بالتراجع",
      hint: "ثبت الحصر عند n=0 أولا، ثم افترض أن uₙ داخل المجال المطلوب واستعمل علاقة التعريف أو صورة المجال بالدالة لتثبت أن uₙ₊₁ يبقى داخل نفس الحصر."
    });
  }
  if (/متزايد|متناق|اتجاه تغير|رتابة/.test(source)) {
    hints.push({
      title: "رتابة المتتالية",
      hint: "لا تخمن فقط: احسب uₙ₊₁-uₙ أو استعمل إشارة f(x)-x عندما تكون uₙ₊₁=f(uₙ). إذا كان الفرق موجبا فهي متزايدة، وإذا كان سالبا فهي متناقصة."
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

function renderSolutionButtons(id, activeMode) {
  return ["quick", "normal", "detailed"].map((mode) => (
    `<button type="button" class="ghost-action solution-action ${activeMode === mode ? "active" : ""}" data-solution-id="${id}" data-solution-mode="${mode}">${solutionLabel(mode)}</button>`
  )).join("");
}

function renderExerciseCard(ex, id) {
  const statement = ex.statementHtml || `<p>${ex.text || ex.statement}</p>`;
  const figure = ex.figureHtml || "";
  const activeMode = state.openSolutions[id] || "";
  const solution = activeMode ? `<div class="solution-heading">${solutionLabel(activeMode)}</div><div class="solution-text">${solutionContent(ex, activeMode)}</div>` : "";
  return `<section class="exercise-card"><h3>${ex.title}</h3>${figure}${statement}<div class="solution-actions">${renderSolutionButtons(id, activeMode)}</div><div class="solution ${activeMode ? "show" : ""}">${solution}</div></section>`;
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
