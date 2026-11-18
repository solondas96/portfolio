export interface Article {
  title: string;
  tag: string;
  date: string;
  readTime: string;
  summary: string;
  url: string;
}

export const ARTICLES: Article[] = [
  {
    title: 'Deconstructing Spark Execution Plans: How We Reduced Cloud Spend by 51.2%',
    tag: 'Distributed Systems',
    date: '2025',
    readTime: '6 min read',
    summary:
      'A deep dive into Catalyst query optimization: diagnosing shuffle skew, eliminating Python UDF serialization penalties, and adopting incremental delta processing.',
    url: 'https://medium.com/@solondas96',
  },
  {
    title: 'Architecting Enterprise Multimodal Data Products: From Documents to Embeddings',
    tag: 'GenAI & RAG',
    date: '2025',
    readTime: '8 min read',
    summary:
      'How to structure enterprise ingestion across 90M+ heterogeneous PDFs, scanned forms, and tables using Vision-Language Models and hybrid semantic retrieval.',
    url: 'https://medium.com/@solondas96',
  },
  {
    title: 'Data Quality Check-Gates: The Foundation of Reliable Enterprise NL2SQL',
    tag: 'AI Data Platforms',
    date: '2024',
    readTime: '5 min read',
    summary:
      'Why LLMs fail on uncurated schemas and how a domain-aware data modeling strategy turns messy data lakes into predictable natural language query surfaces.',
    url: 'https://medium.com/@solondas96',
  },
  {
    title: 'Event-Driven Architectures with Kafka and Spark: Lessons from High-Throughput Pipelines',
    tag: 'Streaming & Big Data',
    date: '2024',
    readTime: '7 min read',
    summary:
      'Best practices for fault-tolerant replay, offset management, and end-to-end lineage tracking when streaming millions of events per hour in enterprise environments.',
    url: 'https://medium.com/@solondas96',
  },
];
