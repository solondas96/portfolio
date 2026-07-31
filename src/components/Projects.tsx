import React from 'react';
import { motion } from 'motion/react';
import { FolderGit2, ExternalLink, Video, Presentation, BookOpen, FileText } from 'lucide-react';

const getIcon = (type?: string) => {
  switch (type?.toLowerCase()) {
    case 'video': return <Video className="h-6 w-6" />;
    case 'presentation': return <Presentation className="h-6 w-6" />;
    case 'research': return <BookOpen className="h-6 w-6" />;
    case 'portfolio': return <FolderGit2 className="h-6 w-6" />;
    default: return <FileText className="h-6 w-6" />;
  }
};

export default function Projects({ data }: { data: any[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="projects" className="relative flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 sm:px-12 lg:px-24">
      <div className="z-10 flex w-full max-w-5xl flex-col gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-500/30 bg-orange-500/10 text-orange-400 backdrop-blur-md">
              <FolderGit2 className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-bold tracking-tighter text-gray-100 sm:text-4xl lg:text-5xl">
              Projects & Research
            </h2>
          </div>
          <p className="max-w-2xl text-base text-slate-300 sm:text-lg">
            A selection of work spanning applied AI systems, data platform design, and research-led product innovation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {data.map((project, index) => {
            const actionLinks = Array.isArray(project.links) && project.links.length > 0
              ? project.links
              : (project.url ? [{ name: 'Open', url: project.url }] : []);

            return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.2 } }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/12 bg-slate-900/80 backdrop-blur-xl transition-all hover:border-orange-400/40 hover:bg-slate-800/80 hover:shadow-[0_12px_40px_rgba(249,115,22,0.12)]"
            >
              <div className="flex flex-col gap-6 p-8 h-full">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400">
                      {getIcon(project.type)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-100 leading-tight">
                        {project.title}
                      </h3>
                      {project.category && (
                        <p className="mt-1 text-sm text-cyan-300">{project.category}</p>
                      )}
                    </div>
                  </div>
                </div>

                {project.stack && project.stack.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.stack.map((tech: string, i: number) => (
                      <span
                        key={i}
                        className="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {project.bullets && project.bullets.length > 0 && (
                  <ul className="flex flex-col gap-3 mt-4">
                    {project.bullets.map((bullet: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-slate-300">
                        <span className="mt-1.5 flex h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                        <span className="text-sm leading-relaxed text-slate-300">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {actionLinks.length > 0 && (
                  <div className="mt-auto flex flex-wrap gap-3 pt-2">
                    {actionLinks.map((link: { name?: string; url: string }, linkIndex: number) => (
                      <a
                        key={linkIndex}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-800/70 px-4 py-2 text-xs font-semibold tracking-wide text-slate-200 transition-all hover:-translate-y-0.5 hover:border-orange-400/50 hover:bg-slate-700/80 hover:text-orange-200"
                      >
                        {link.name || 'Open'}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Decorative gradient overlay */}
              <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl transition-all group-hover:bg-orange-500/20" />
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
