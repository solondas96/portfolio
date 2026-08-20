import React from 'react';
import { motion } from 'motion/react';
import { MessageSquareQuote } from 'lucide-react';

export default function Testimonials({ data }: { data: any[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="testimonials" className="portfolio-section px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="grid gap-5 border-t border-black/20 pt-5 lg:grid-cols-[1fr_2fr]"
        >
          <p className="section-kicker">Testimonials</p>
          <div>
          <h2 className="section-title">Trusted in the work.</h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#4d4c47] sm:text-lg">
            What colleagues and leaders have to say about my work and impact.
          </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 border-t border-black/20 md:grid-cols-2">
          {data.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
              className="group flex min-h-80 flex-col justify-between gap-6 border-b border-black/20 py-7 md:px-7 md:odd:border-r md:first:pl-0"
            >
              <div>
                <MessageSquareQuote className="mb-5 h-7 w-7 text-[#e34f3c]" />
                <p className="text-base leading-relaxed text-[#4d4c47] whitespace-pre-line">
                  "{testimonial.text}"
                </p>
              </div>
              
              <div className="mt-6 flex flex-col gap-1 border-t border-black/20 pt-5">
                <h4 className="font-bold text-[#151514]">{testimonial.name}</h4>
                <p className="text-xs font-medium text-[#e34f3c] line-clamp-2" title={testimonial.title}>
                  {testimonial.title}
                </p>
                <p className="mt-1 text-xs text-[#6c6b64]">{testimonial.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
