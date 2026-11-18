export interface CaseStudy {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  organization: string;
  timeline: string;
  metrics: { label: string; value: string }[];
  challenge: string;
  architecture: {
    title: string;
    steps: { number: string; title: string; description: string }[];
  };
  impact: string[];
  techStack: string[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'palantir-vlm',
    tag: 'Multimodal AI Platform',
    title: 'AM-UDM: Enterprise Multimodal Intelligence with Palantir Foundry',
    subtitle: 'Consolidating 90M+ documents into an governed, multimodal retrieval and GenAI foundation.',
    organization: 'Swiss Re',
    timeline: '2025 - Present',
    metrics: [
      { label: 'Scale', value: '90M Docs / ~59TB' },
      { label: 'Domains', value: 'CorSo, L&H, P&C' },
      { label: 'AI Layer', value: 'VLMs + Embeddings' },
    ],
    challenge:
      'Heterogeneous, unstructured documents (PDFs, scans, Outlook emails, tabular charts) were fragmented across Swiss Re business lines. Siloed extraction logic resulted in duplicated compute, inconsistent schema models, and slow ML/GenAI experimentation.',
    architecture: {
      title: 'Multimodal Document Extraction & Ingestion Pipeline',
      steps: [
        {
          number: '01',
          title: 'Request-Based Distributed Ingestion',
          description: 'Automated streaming and event-based ingestion from core systems into Palantir Foundry with granular data governance.',
        },
        {
          number: '02',
          title: 'Multimodal Parsing Engine',
          description: 'Vision-Language Models (VLMs) and specialized OCR decompose complex layouts, extracting text, inline tables, and visual charts.',
        },
        {
          number: '03',
          title: 'Contextual Summarization & Vectorization',
          description: 'Generates semantically dense summaries combining visual and textual features, indexed into vector spaces for hybrid retrieval.',
        },
        {
          number: '04',
          title: 'Governed Knowledge & Chat Interface',
          description: 'Empowers analysts with semantic search across the entire 59TB corpus, powering downstream agentic reasoning tools.',
        },
      ],
    },
    impact: [
      'Eliminated redundant team-specific extraction pipelines across CorSo, L&H, and P&C.',
      'Established a single enterprise-governed access and compliance model for 90M+ documents.',
      'Dramatically accelerated ML and GenAI experimentation cycles for underwriting and asset management teams.',
    ],
    techStack: ['Palantir Foundry', 'Vision-Language Models', 'Apache Spark', 'Vector Search', 'Python', 'Embeddings'],
  },
  {
    id: 'insights-copilot',
    tag: 'Enterprise GenAI & NL2SQL',
    title: 'Insights Copilot: Enterprise Natural Language Data Platform',
    subtitle: 'Enabling cross-functional natural language SQL querying across 5+ global business verticals.',
    organization: 'AB InBev',
    timeline: '2022 - 2025',
    metrics: [
      { label: 'Revenue Gain', value: '+$1.7M' },
      { label: 'Sales Uplift', value: '5% LATAM' },
      { label: 'Scope', value: '5+ Global Verticals' },
    ],
    challenge:
      'Decision-makers across Finance, Logistics, Procurement, and Marketing required fast access to disparate data lakes without having to write complex SQL or wait for weeks on engineering backlogs.',
    architecture: {
      title: 'End-to-End NL2SQL Data Foundation',
      steps: [
        {
          number: '01',
          title: 'Multi-Domain Databricks Pipelines',
          description: 'Ingested and harmonized FMCG datasets across global regions using high-throughput PySpark on Azure Databricks.',
        },
        {
          number: '02',
          title: 'Data Quality Framework Check-Gate',
          description: 'Custom framework enforcing schema consistency, anomaly detection, and semantic validation before ingestion.',
        },
        {
          number: '03',
          title: 'Domain-Aware Ontology & Semantic Modeling',
          description: 'Engineered compact, context-optimized schema representations tailored for LLM token budgets and high-accuracy SQL generation.',
        },
        {
          number: '04',
          title: 'DTC-MROI Revenue Engine',
          description: 'Engineered direct-to-consumer marketing ROI pipelines across Brazil, Mexico, Colombia, and Argentina delivering measurable sales uplift.',
        },
      ],
    },
    impact: [
      'Delivered 5% sales uplift and $1.7M net revenue gain across Latin American markets.',
      'Empowered non-technical stakeholders to query multi-domain data via verified natural language querying.',
      'Established the core Data Quality Framework that became the organizational prerequisite for any new AI workload.',
    ],
    techStack: ['Azure Databricks', 'Apache Spark', 'NL2SQL', 'Python', 'Delta Lake', 'Azure Event Hub', 'SQL'],
  },
  {
    id: 'spark-cost-optimization',
    tag: 'Distributed Systems & FinOps',
    title: 'Spark Workload Profiling & 51.2% Cloud Platform Cost Reduction',
    subtitle: 'From $26.9K/month to $13.1K/month via execution plan profiling and Catalyst optimization.',
    organization: 'Swiss Re / Cloud Platforms',
    timeline: 'Jan - Apr 2025',
    metrics: [
      { label: 'Cost Reduction', value: '51.2%' },
      { label: 'Monthly Spend', value: '$26.9K → $13.1K' },
      { label: 'April MoM', value: '-42.8%' },
    ],
    challenge:
      'Legacy ACDC Spark workloads suffered from heavy shuffle spills, inefficient serialization overhead from custom Python UDFs, and expensive full-table overwrites, driving monthly cloud platform bills beyond budget limits.',
    architecture: {
      title: 'Catalyst Optimization & Plan Profiling Journey',
      steps: [
        {
          number: '01',
          title: 'Execution Plan Profiling',
          description: 'Analyzed physical and logical query plans to isolate shuffle bottlenecks, data skew, and non-predicate-pushed stages.',
        },
        {
          number: '02',
          title: 'UDF Replacement with Native Expressions',
          description: 'Eliminated JVM-to-Python process serialization boundaries by rewriting costly Python UDFs with Spark native Catalyst functions.',
        },
        {
          number: '03',
          title: 'Incremental Loading & Partition Pruning',
          description: 'Replaced full-volume table re-computations with incremental delta loads and dynamic partition pruning.',
        },
        {
          number: '04',
          title: 'Resource Rightsizing & Cluster Tuning',
          description: 'Tuned executor core-to-memory ratios and shuffle partitions to match workload shapes without spilling to disk.',
        },
      ],
    },
    impact: [
      'Slashed monthly platform cloud costs by 51.2% ($13.8K/month recurring savings).',
      'Achieved a peak single-month cost reduction of 42.8% in April 2025.',
      'Lowered pipeline execution latency, improving upstream data availability for business decision-makers.',
    ],
    techStack: ['Apache Spark', 'Catalyst Optimizer', 'Execution Plan Profiling', 'PySpark', 'FinOps', 'Delta Lake'],
  },
];
