export interface Article {
  title: string;
  tag: string;
  date: string;
  readTime: string;
  summary: string;
  url: string;
  publication?: string;
}

export const ARTICLES: Article[] = [
  {
    title: 'The Next Unicorns Won’t Build Apps. They’ll Build AI Operating Systems.',
    tag: 'AI Operating Systems',
    date: 'May 2026',
    readTime: '6 min read',
    publication: 'Towards Data Engineering',
    summary:
      'Why the post-app era belongs to autonomous orchestration layers: exploring how agentic AI systems, persistent context buses, and tool-use runtimes are replacing static application silos.',
    url: 'https://medium.com/towards-data-engineering/the-next-unicorns-wont-build-apps-they-ll-build-ai-operating-systems-6d52016f2a9d',
  },
  {
    title: 'AI Agents and Their Practical Applications',
    tag: 'Agentic AI',
    date: 'Apr 2026',
    readTime: '7 min read',
    publication: 'Towards Data Engineering',
    summary:
      'Demystifying AI agents beyond chatbots: core architectural patterns for deterministic multi-step planning, tool invocation, loop verification, and state persistence in modern software.',
    url: 'https://medium.com/towards-data-engineering/ai-agents-and-their-practical-applications-2bbc342424b5',
  },
  {
    title: '30 Hard Real-World Questions Asked in AI Data Engineering Interviews: With Practical Solutions',
    tag: 'AI Data Engineering',
    date: 'Apr 2026',
    readTime: '12 min read',
    publication: 'Towards Data Engineering',
    summary:
      'Battlefield-tested solutions to tough interview problems spanning vector search scaling, LLM pipeline backpressure, distributed shuffle skew, schema drift, and token budget governance.',
    url: 'https://medium.com/towards-data-engineering/30-hard-real-world-questions-asked-in-ai-data-engineering-interviews-with-practical-solutions-4bbce483987e',
  },
  {
    title: 'Palantir Foundry Explained: The Operating System for the Modern Enterprise',
    tag: 'Palantir Foundry',
    date: 'Apr 2026',
    readTime: '8 min read',
    publication: 'Towards Data Engineering',
    summary:
      'How Palantir Foundry unifies fragmented enterprise data into operational ontologies, enabling seamless business decision loops from underwriting analytics to supply chain logistics.',
    url: 'https://medium.com/towards-data-engineering/palantir-foundry-explained-the-operating-system-for-the-modern-enterprise-3978cf6658b4',
  },
  {
    title: 'Building Throttle-Safe Pipelines for Vision Language Models (VLMs) in Production',
    tag: 'Multimodal & VLMs',
    date: 'Jul 2025',
    readTime: '6 min read',
    publication: 'Towards Data Engineering',
    summary:
      'Architectural patterns for ingesting high-throughput image and document streams under restrictive API rate limits, featuring adaptive concurrency throttles and dead-letter queues.',
    url: 'https://medium.com/towards-data-engineering/%EF%B8%8Fbuilding-throttle-safe-pipelines-for-vision-language-models-vlms-in-production-1ae0d5dca3af',
  },
  {
    title: '15 Common Spark Errors in the Big Data Industry — Causes, Detection & Detailed Fixes',
    tag: 'Apache Spark',
    date: 'May 2025',
    readTime: '9 min read',
    publication: 'Towards Data Engineering',
    summary:
      'Deep dive into OutOfMemory errors, shuffle fetch failures, container killed by YARN, serialization crashes, and driver heap exhaustion, complete with practical code fixes.',
    url: 'https://medium.com/towards-data-engineering/15-common-spark-errors-in-the-big-data-industry-causes-detection-detailed-fixes-0fa1f28a578c',
  },
  {
    title: '18 Spark Optimization Techniques Every Data Engineer Should Know',
    tag: 'Distributed Systems',
    date: 'Apr 2025',
    readTime: '8 min read',
    publication: 'Towards Data Engineering',
    summary:
      'Essential strategies to boost PySpark pipeline performance: broadcast hash joins, bucketing, partition pruning, adaptive query execution (AQE), and intelligent caching.',
    url: 'https://medium.com/towards-data-engineering/18-spark-optimization-techniques-every-data-engineer-should-know-bf10024d500c',
  },
  {
    title: '15 Real-World Data Pipeline Issues and How to Solve Them Like a Pro',
    tag: 'ETL Pipelines',
    date: 'Apr 2025',
    readTime: '7 min read',
    publication: 'Towards Data Engineering',
    summary:
      'From schema drift and backpressure to idempotency failures and silent data corruption: 15 proven engineering remedies for production data pipelines.',
    url: 'https://medium.com/towards-data-engineering/15-real-world-data-pipeline-issues-and-how-to-solve-them-like-a-pro-c8f8771591d9',
  },
  {
    title: 'Database Scaling Strategies — Deep Dive',
    tag: 'System Design',
    date: 'Mar 2025',
    readTime: '7 min read',
    publication: 'Towards Data Engineering',
    summary:
      'Comprehensive analysis of horizontal vs. vertical scaling, replication lag, range vs. hash sharding, connection pooling dynamics, and distributed caching topologies.',
    url: 'https://medium.com/towards-data-engineering/database-scaling-strategies-deep-dive-e349a225c9c3',
  },
  {
    title: 'Data Warehouse Design: A Guide to Building Scalable and Efficient Architectures',
    tag: 'Data Architecture',
    date: 'Feb 2025',
    readTime: '8 min read',
    publication: 'Towards Data Engineering',
    summary:
      'A master guide to analytical warehouse modeling: star vs. snowflake schemas, slowly changing dimensions (SCD), surrogate keys, and cloud-native columnar optimizations.',
    url: 'https://medium.com/towards-data-engineering/data-warehouse-design-a-guide-to-building-scalable-and-efficient-architectures-4162b34a7063',
  },
];
