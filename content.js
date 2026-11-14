/*
  Everything the site says lives in this file.
  Change the text between the quotation marks, save the file and the site updates.

  Figures you can use for the "figure" field
    signal, bars, scatter, boot, grid, route, trails,
    ab, season, forecast, segments, turnaround

  Colors you can use for the "accent" field
    lilac, mint, peach, sky, butter, rose

  To swap the resume, upload a new PDF named resume.pdf over the old one.
*/
window.SITE = {
  name: "Rohit Durbha",
  resume: "resume.pdf",

  hero: {
    lede: "I am a data scientist who looks for the signal inside noisy data.",
    intro: "I spent three years at Schneider Electric designing A/B tests and causal measurement across more than four million customer accounts. In May 2026 I finished an M.S. in Data Science at San Jose State University, where I trained GANs to produce data good enough to teach a classifier on its own.",
    figure: "signal",
    accent: "lilac"
  },

  /* kind is either "research" or "build". The link is optional. */
  entries: [
    {
      id: "thesis",
      kind: "research",
      title: "Synthetic data for class-imbalanced modeling",
      body: "My master's project asked whether a classifier can learn rare classes from data that never existed. I trained AC-GANs on multimodal embeddings of malware samples and used the generated rows to fill in the thin end of a 20-class dataset. The solid bars beside this text are real samples, and the lighter pattern is the synthetic data closing the gap.",
      stats: [
        { value: "90.86%", label: "accuracy with synthetic training data only", fill: 18, of: 20 }
      ],
      stack: "Python, AC-GAN, Word2Vec, TF-IDF, BERT, CVAE, byte-entropy images, MLP, Random Forest, SVM",
      figure: "bars",
      accent: "lilac"
    },
    {
      id: "scientiarec",
      kind: "research",
      title: "Serendipity-aware paper recommendations",
      body: "Most recommenders keep handing researchers papers that look like the ones they already read. I built a BERT-based two-tower attention model over SPECTER2 embeddings with a regularizer that rewards useful surprises. In the figure, the dashed line leaves a reader's home cluster for a relevant paper in a distant one.",
      stats: [
        { value: "97.5%", label: "diversity across recommended papers", fill: 19, of: 20 },
        { value: "92.3%", label: "unexpectedness, ahead of Doc2Vec with KNN, matrix factorization and VAEs", fill: 18, of: 20 }
      ],
      stack: "Python, NLP, SPECTER2, two-tower attention, cosine similarity regularization",
      figure: "scatter",
      accent: "sky"
    },
    {
      id: "savant",
      kind: "build",
      title: "Savant",
      body: "Savant is an analytics engine where a local language model plans each analysis and a deterministic statistics layer runs every test. A finding only reaches the report after it passes false discovery control, leakage detection and bootstrap stability checks. The histogram here keeps resampling, and only the bins inside the dashed gates count as stable.",
      stack: "Python, statistics, bootstrap validation, local LLMs",
      link: { label: "Open the Savant repository", url: "https://github.com/rohitDurbha/savant" },
      figure: "boot",
      accent: "mint"
    },
    {
      id: "mcp-watcher",
      kind: "build",
      title: "MCP Watcher",
      body: "AI agents trust the tools they are handed, which makes a poisoned tool description a real attack surface. MCP Watcher scans every public MCP server each day, parses source code safely in four languages and pairs rule-based signals with a trained classifier. Each square in the grid is one real attack, and the two hollow squares are the ones it missed.",
      stats: [
        { value: "14 / 16", label: "real attacks against agent tools caught", fill: 14, of: 16 }
      ],
      stack: "Python, Scikit-learn, Tree-sitter, GitHub Actions",
      link: { label: "Open the MCP Watcher repository", url: "https://github.com/rohitDurbha/mcp-watcher" },
      figure: "grid",
      accent: "peach"
    },
    {
      id: "safestride",
      kind: "build",
      title: "SafeStride",
      body: "Map apps optimize for the fastest walk home, and SafeStride optimizes for the safest one. It plots recent crime data as intensity hot spots and bends each route away from as many of them as it can. A voice agent listens for emergency notes, works out what is happening and marks the spot for other walkers.",
      stack: "Routing on live crime data, Gemini voice agent, open-source map services",
      link: { label: "Open the SafeStride repository", url: "https://github.com/rohitDurbha/safe-stride" },
      figure: "route",
      accent: "rose"
    }
  ],

  more: {
    title: "More builds in progress",
    items: [
      { name: "CareerPilot", what: "AI agents that score job matches and run mock interviews, built with Node.js, React and TypeScript.", url: "https://github.com/rohitDurbha/CareerPilot" },
      { name: "CareerAtlas", what: "A feed of contract and full-time roles from job boards and staffing portals that powers CareerPilot.", url: "https://github.com/rohitDurbha/contract-atlas" },
      { name: "Filla", what: "A Chrome extension that tailors a resume to each job description and then fills in the application.", url: "https://github.com/rohitDurbha/Filla" },
      { name: "StudyPilot", what: "An attention-aware study assistant that turns a PDF into short sections and switches to flashcards, quizzes or mind maps when focus starts to slip.", url: "https://github.com/rohitDurbha/study-pilot" }
    ]
  },

  work: {
    id: "experience",
    company: "Schneider Electric",
    role: "Senior Data Analyst",
    place: "Bengaluru, India",
    dates: "May 2021 to August 2024",
    months: 40,
    intro: "For a little over three years I sat between product, engineering and leadership teams, and my job was to make sure launch decisions rested on evidence. That meant sizing which bets were worth testing, designing the experiments, checking the models behind new features and telling the story clearly enough for someone to act on it.",
    accent: "butter",
    /* Each thread opens its own figure. The value is optional. */
    threads: [
      {
        title: "Experiments and holdout groups",
        value: "4M+",
        label: "customer accounts sized for experiment opportunities",
        body: "I partnered with product and engineering teams to work out where an experiment could change a decision, across more than four million customer accounts. From there I designed the A/B tests and holdout groups that turned ambiguous roadmap bets into launch calls a team could measure.",
        caption: "The solid curve is a treatment group pulling away from its control.",
        figure: "ab"
      },
      {
        title: "Causal measurement",
        value: "10M+",
        label: "production records covered by quality and trust metrics",
        body: "I defined quality and trust metrics for machine learning features running on more than ten million production records. Launch readouts used causal measurement, so a seasonal upswing was never mistaken for the effect of a feature.",
        caption: "The dashed line is what the season alone would have done, and the solid band above it is the real effect after launch.",
        figure: "season"
      },
      {
        title: "Model evaluation",
        value: "5M+",
        label: "customer records behind the evaluated models",
        body: "I built evaluation methods for predictive and generative models trained on more than five million customer records, including transformer-based revenue forecasts. The benchmarks gave product teams a clear bar a model had to pass before a feature reached production.",
        caption: "Incoming actuals land inside the forecast band as the months arrive.",
        figure: "forecast"
      },
      {
        title: "Segmentation and pipelines",
        label: "ML-based customer segments fed by multi-tier sales analytics pipelines",
        body: "I built machine learning customer segmentation and the multi-tier sales analytics pipelines that fed it, with large-scale data integration running in Databricks. Segments gave the sales and product teams a shared view of which customers behaved alike.",
        caption: "Centroids settle into place as customers sort into their segments.",
        figure: "segments"
      },
      {
        title: "Dashboards and data stories",
        value: "25%",
        label: "faster decision turnaround across partner product teams",
        body: "I delivered dashboards and executive-ready stories in Tableau and Looker Studio that translated complex behavioral analysis into clear recommendations. Partner product teams reached decisions about a quarter faster once the evidence arrived in a form they could read quickly.",
        caption: "Each pair of bars is one team, with the thin bar showing turnaround before and the solid bar after.",
        figure: "turnaround"
      }
    ],
    toolkit: [
      { group: "Programming", items: "Python, SQL, R, Pandas" },
      { group: "Experimentation", items: "A/B testing, holdout design, causal measurement, hypothesis testing" },
      { group: "Machine learning", items: "Predictive modeling, generative models, model evaluation, Scikit-learn" },
      { group: "Analytics and BI", items: "Tableau, Looker Studio, Databricks, dashboards, data storytelling" },
      { group: "Generative AI", items: "LLM evaluation, prompt engineering, agentic workflows, vector embeddings" }
    ],
    education: [
      "M.S. in Data Science, San Jose State University, 2024 to 2026",
      "B.E. in Computer Science, Ramaiah Institute of Technology, 2017 to 2021"
    ]
  },

  offHours: {
    id: "off-hours",
    title: "Off hours",
    paragraphs: [
      "When the laptop closes I am usually replaying a Pokemon game, catching up on anime or a film, or standing in the cold waiting on a long exposure of the night sky.",
      "The pattern running through this site borrows a little from each of them. It has the chunky pixels of a handheld game, the grain of film and the patience of star trails slowly turning around the pole."
    ],
    figure: "trails",
    accent: "sky"
  },

  contact: {
    id: "contact",
    title: "Say hello",
    body: "I am looking for data science roles where careful experiments and honest models shape real product decisions. The quickest way to reach me is by email.",
    email: "rohitdurbha@gmail.com",
    linkedin: "https://www.linkedin.com/in/rohit-durbha",
    github: "https://github.com/rohitDurbha",
    figure: "signal",
    accent: "mint"
  }
};
