import React from 'react';
import { motion } from 'motion/react';
import { MessageSquareQuote } from 'lucide-react';

export default function Testimonials({ data }: { data: any[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="testimonials" className="relative flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 sm:px-12 lg:px-24">
      <div className="z-10 flex w-full max-w-5xl flex-col gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-fuchsia-400/20 bg-fuchsia-400/10 text-fuchsia-400 backdrop-blur-md">
              <MessageSquareQuote className="h-6 w-6" />
            </div>
            <h2 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl">
              Testimonials
            </h2>
          </div>
          <p className="max-w-2xl text-lg text-slate-400">
            What colleagues and leaders have to say about my work and impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {data.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
              className="group relative flex flex-col justify-between gap-6 overflow-hidden rounded-3xl border border-white/5 bg-white/[0.01] p-8 backdrop-blur-xl transition-all hover:border-fuchsia-400/30 hover:bg-white/[0.03] hover:shadow-2xl hover:shadow-fuchsia-900/20"
            >
              <div className="relative z-10">
                <MessageSquareQuote className="mb-4 h-8 w-8 text-fuchsia-400/40" />
                <p className="text-sm leading-relaxed text-slate-300 whitespace-pre-line">
                  "{testimonial.text}"
                </p>
              </div>
              
              <div className="relative z-10 mt-6 flex flex-col gap-1 border-t border-white/10 pt-6">
                <h4 className="font-bold text-white">{testimonial.name}</h4>
                <p className="text-xs font-medium text-fuchsia-400 line-clamp-2" title={testimonial.title}>
                  {testimonial.title}
                </p>
                <p className="text-xs text-slate-500 mt-1">{testimonial.date}</p>
              </div>

              {/* Decorative gradient overlay */}
              <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-fuchsia-400/10 blur-3xl transition-all group-hover:bg-fuchsia-400/20" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
