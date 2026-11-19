export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  category: 'Interactive & Games' | 'Applied AI & Research' | 'Systems & Tools';
  type: 'interactive' | 'research' | 'applied-ai' | 'tool';
  description: string;
  bullets: string[];
  stack: string[];
  language?: 'TypeScript' | 'JavaScript' | 'Python' | 'React';
  languageColor?: string;
  repoUrl?: string;
  liveUrl?: string;
  drivePreviewUrl?: string;
  isPlayable?: boolean;
  featured?: boolean;
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'xoxo',
    title: 'XOXO · Intelligent Tic-Tac-Toe',
    tagline: 'Minimax heuristic game engine in TypeScript',
    category: 'Interactive & Games',
    type: 'interactive',
    description: 'A responsive, interactive game engine featuring an adversarial Minimax decision algorithm with depth-limited heuristic evaluation.',
    bullets: [
      'Engineered with TypeScript and React with zero external UI dependencies.',
      'Unbeatable AI decision logic using minimax graph search with alpha-beta pruning.',
      'Fluid tactile animations, dynamic turn states, and live win-condition detection.',
    ],
    stack: ['TypeScript', 'React', 'Minimax Algorithm', 'Game Loop', 'Tailwind CSS'],
    language: 'TypeScript',
    languageColor: '#3178c6',
    repoUrl: 'https://github.com/solondas96/tic-tac-toe',
    liveUrl: 'https://solondas96.github.io/tic-tac-toe/',
    isPlayable: true,
    featured: true,
  },
  {
    id: 'mamba',
    title: 'Mamba · Arcade Snake Engine',
    tagline: 'Pure JavaScript 60 FPS HTML5 canvas physics',
    category: 'Interactive & Games',
    type: 'interactive',
    description: 'Classic retro arcade snake built from scratch in vanilla JavaScript utilizing HTML5 Canvas 2D rendering and delta-time frame rate stabilization.',
    bullets: [
      'Custom vector collision detection and coordinate wrap-around boundary math.',
      'Smooth 60 FPS rendering pipeline with keyboard and mobile touch swipe listeners.',
      'Persistent local high-score tracking and reactive audio feedback.',
    ],
    stack: ['JavaScript', 'HTML5 Canvas', 'Physics Loop', 'Web Audio API'],
    language: 'JavaScript',
    languageColor: '#f7df1e',
    repoUrl: 'https://github.com/solondas96/mamba',
    liveUrl: 'https://solondas96.github.io/mamba/',
    isPlayable: true,
    featured: true,
  },
  {
    id: 'tomd',
    title: 'TOMD · Automated Doc Engine',
    tagline: 'Static documentation generator & pipeline',
    category: 'Interactive & Games',
    type: 'interactive',
    description: 'Modern web application and static documentation generator with continuous delivery pipeline automation.',
    bullets: [
      'Automated deployment via custom GitLab CI/CD artifact publication.',
      'Markdown-to-DOM parser pipeline with syntax highlighting.',
      'Zero-latency static asset serving on GitLab Pages.',
    ],
    stack: ['JavaScript', 'Markdown Parser', 'GitLab CI/CD', 'GitLab Pages'],
    language: 'JavaScript',
    languageColor: '#f7df1e',
    repoUrl: 'https://gitlab.com/solondas96/tomd',
    liveUrl: 'https://tomd-793db3.gitlab.io',
    isPlayable: true,
  },
  {
    id: 'fraud-jobs',
    title: 'Predicting Fraudulent Jobs Research',
    tagline: 'Natural Language Processing & ML Classification',
    category: 'Applied AI & Research',
    type: 'research',
    description: 'Master of Science thesis research on natural language processing pipelines and ensemble machine learning classifiers to detect deceptive job postings.',
    bullets: [
      'Trained ensemble models (Random Forests, Gradient Boosting, SVM) on imbalanced textual corpora.',
      'Feature engineering with TF-IDF, n-gram vectorization, and sentiment polarity extraction.',
      'Achieved >94% AUC-ROC with rigorous cross-validation and confusion matrix auditing.',
    ],
    stack: ['Python', 'NLP', 'Scikit-learn', 'TF-IDF', 'Pandas', 'Statistical Modeling'],
    language: 'Python',
    languageColor: '#3572A5',
    liveUrl: 'https://drive.google.com/file/d/1L_AUwU-8rhUBQazGOdKtWB0eRaaRE8SS/view?usp=share_link',
    drivePreviewUrl: 'https://drive.google.com/file/d/1L_AUwU-8rhUBQazGOdKtWB0eRaaRE8SS/preview',
    isPlayable: false,
    featured: true,
  },
  {
    id: 'copilot',
    title: 'AB InBev Insights Copilot',
    tagline: 'Enterprise Natural Language to SQL analytics assistant',
    category: 'Applied AI & Research',
    type: 'applied-ai',
    description: 'Production generative AI copilot translating natural language business inquiries into deterministic SQL over petabyte-scale lakehouse data.',
    bullets: [
      'Semantic schema linking and SQL validation preventing halluncinated column joins.',
      'Multi-turn conversation state persistence with contextual prompt pruning.',
      'Production deployment serving global revenue management and sales executive teams.',
    ],
    stack: ['GenAI', 'NL2SQL', 'Databricks', 'Azure OpenAI', 'Python', 'Vector DB'],
    language: 'Python',
    languageColor: '#3572A5',
    liveUrl: 'https://drive.google.com/file/d/1jTKfCRb-4R07m4BTK3qxOCVJyZuZj_kA/view?usp=sharing',
    drivePreviewUrl: 'https://drive.google.com/file/d/1jTKfCRb-4R07m4BTK3qxOCVJyZuZj_kA/preview',
    isPlayable: false,
    featured: true,
  },
  {
    id: 'resume-os',
    title: 'Resume OS · Precision Resume Engineering',
    tagline: 'In-browser Markdown resume builder & ATS matching engine',
    category: 'Systems & Tools',
    type: 'tool',
    description: 'Calm, client-side Markdown resume builder featuring a real-time ATS keyword matcher, Google XYZ impact linter, 1-page budget optimizer, and vector PDF export.',
    bullets: [
      'Real-time ATS keyword analysis and side-by-side job description tailoring.',
      'Smart "Fit-to-1-Page" budget gauge with auto-tuned margins and typography scale.',
      'Zero-backend client-side architecture with vector PDF export and shareable recruiter hash links.',
    ],
    stack: ['TypeScript', 'React', 'Vite', 'Tailwind CSS', 'CodeMirror'],
    language: 'TypeScript',
    languageColor: '#3178c6',
    repoUrl: 'https://github.com/solondas96/resume-os',
    liveUrl: 'https://solondas96.github.io/resume-os/',
    isPlayable: true,
    featured: true,
  },
];
