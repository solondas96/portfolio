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
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-400/10 text-indigo-400 backdrop-blur-md">
              <FolderGit2 className="h-6 w-6" />
            </div>
            <h2 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl">
              Projects & Research
            </h2>
          </div>
          <p className="max-w-2xl text-lg text-slate-400">
            A showcase of my recent work, research thesis, and presentations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {data.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-xl transition-all hover:border-indigo-400/30 hover:bg-white/[0.03] hover:shadow-2xl hover:shadow-indigo-900/20"
            >
              <div className="flex flex-col gap-6 p-8 h-full">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-indigo-400/20 bg-indigo-400/10 text-indigo-400">
                      {getIcon(project.type)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white leading-tight">
                        {project.title}
                      </h3>
                      {project.category && (
                        <p className="text-sm text-indigo-400 mt-1">{project.category}</p>
                      )}
                    </div>
                  </div>
                  
                  {(project.url || (project.links && project.links.length > 0)) && (
                    <a
                      href={project.url || project.links[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-colors hover:bg-indigo-400/20 hover:text-indigo-400"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  )}
                </div>

                {project.stack && project.stack.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.stack.map((tech: string, i: number) => (
                      <span
                        key={i}
                        className="rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3 py-1 text-xs font-medium text-indigo-400"
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
                        <span className="mt-1.5 flex h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
                        <span className="text-sm leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Decorative gradient overlay */}
              <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-indigo-400/10 blur-3xl transition-all group-hover:bg-indigo-400/20" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
