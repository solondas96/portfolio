import React, { useState, useRef, useEffect } from 'react';
import { Play } from 'lucide-react';
import { PROJECTS_DATA, ProjectItem } from '../data/projects';

interface ProjectTerminalProps {
  onPlayProject: (project: ProjectItem) => void;
  onExit: () => void;
}

interface OutputEntry {
  type: 'input' | 'output' | 'error' | 'success' | 'banner';
  text?: string;
  component?: React.ReactNode;
}

export default function ProjectTerminal({ onPlayProject, onExit }: ProjectTerminalProps) {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [outputs, setOutputs] = useState<OutputEntry[]>([
    {
      type: 'banner',
      text: [
        '╔════════════════════════════════════════════════════════════════════════════════╗',
        '║  SOLON DAS // GITHUB & OPEN SOURCE ECOSYSTEM INTERACTIVE SHELL                 ║',
        '║  Type "help" to view commands, or click any quick action below.               ║',
        '╚════════════════════════════════════════════════════════════════════════════════╝',
      ].join('\n'),
    },
    {
      type: 'output',
      text: 'Type "ls" to list repositories, or "play xoxo" / "play mamba" to launch in-app sandboxes.',
    },
  ]);

  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll ONLY the internal terminal container, never the outer window
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [outputs]);

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    // Add to command history
    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    // Record the user input in terminal
    const newOutputs: OutputEntry[] = [
      ...outputs,
      { type: 'input', text: `solon@github:~/projects$ ${trimmed}` },
    ];

    const parts = trimmed.split(' ').filter(Boolean);
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').toLowerCase();

    switch (cmd) {
      case 'help':
        newOutputs.push({
          type: 'output',
          text: [
            'AVAILABLE COMMANDS:',
            '  ls, list           List all public repositories, category, and tech stacks',
            '  play <id>, run <id> Launch in-app live playable sandbox (e.g. "play xoxo", "play mamba")',
            '  cat <id>, view <id> Inspect architecture, bullets, and metadata of a project',
            '  clone <id>         Copy `git clone <repo>` to your system clipboard',
            '  open <id>          Open project URL or GitHub repository in a new tab',
            '  whoami             Display author role, background, and specialization',
            '  skills, tech       Summary of primary distributed systems & AI stack',
            '  contact            View direct communication handles (email, LinkedIn, GitHub)',
            '  history            List previously executed commands in this session',
            '  clear              Clear terminal history',
            '  exit               Switch back to the Visual Grid view',
          ].join('\n'),
        });
        break;

      case 'whoami':
        newOutputs.push({
          type: 'output',
          text: [
            'USER: Solon Das',
            'ROLE: Data & AI Engineering Leader (AVP @ Swiss Re, Ex-AB InBev, EY, Accenture)',
            'FOCUS: Distributed Systems (Spark, Databricks), Palantir Foundry, Multimodal VLMs & Agentic AI',
            'LOCATION: Bengaluru, India',
          ].join('\n'),
        });
        break;

      case 'skills':
      case 'tech':
      case 'stack':
        newOutputs.push({
          type: 'output',
          text: [
            'PRIMARY TECHNICAL STACK:',
            '  • Big Data & Distributed: Apache Spark, PySpark, Databricks, Palantir Foundry, Kafka, Hadoop',
            '  • Cloud & Architecture:   Azure, AWS, Palantir Apollo, Delta Lake, Snowflake, Iceberg',
            '  • AI & Machine Learning:  LangChain, LangGraph, Azure OpenAI, NL2SQL, Vector DBs, VLMs',
            '  • Languages & Frontend:   Python, Scala, SQL, TypeScript, React, Tailwind CSS',
          ].join('\n'),
        });
        break;

      case 'contact':
        newOutputs.push({
          type: 'output',
          text: [
            'COMMUNICATION HANDLES:',
            '  Email:    solondas96@gmail.com',
            '  Phone:    +91-7008482584',
            '  LinkedIn: https://linkedin.com/in/solondas',
            '  GitHub:   https://github.com/solondas96',
            '  Medium:   https://medium.com/@solondas96',
          ].join('\n'),
        });
        break;

      case 'history':
        newOutputs.push({
          type: 'output',
          text: history.length
            ? history.map((h, i) => `  ${i + 1}  ${h}`).join('\n')
            : 'No commands in history yet.',
        });
        break;

      case 'ls':
      case 'list':
      case 'dir':
      case 'projects':
      case 'll':
        newOutputs.push({
          type: 'output',
          component: (
            <div className="my-2 flex flex-col gap-2 font-mono text-xs">
              <div className="grid grid-cols-[100px_1fr_100px_90px] border-b border-white/20 pb-1 text-[#e34f3c] font-semibold">
                <span>IDENTIFIER</span>
                <span>PROJECT / REPO</span>
                <span>LANGUAGE</span>
                <span>ACTION</span>
              </div>
              {PROJECTS_DATA.map((p) => (
                <div
                  key={p.id}
                  className="grid grid-cols-[100px_1fr_100px_90px] items-center gap-2 hover:bg-white/5 py-1 px-1 rounded transition-colors"
                >
                  <span className="text-[#3a7065] font-bold">{p.id}</span>
                  <span className="text-white truncate">{p.title}</span>
                  <span className="text-[#cd9f28]">{p.language || 'Multi'}</span>
                  <div>
                    {p.isPlayable ? (
                      <button
                        onClick={() => onPlayProject(p)}
                        className="inline-flex items-center gap-1 text-[11px] bg-[#e34f3c] text-white px-1.5 py-0.5 rounded hover:bg-[#ff705e]"
                      >
                        <Play className="h-2.5 w-2.5" /> Play
                      </button>
                    ) : (
                      <span className="text-neutral-500 text-[11px]">Static</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ),
        });
        break;

      case 'play':
      case 'run': {
        if (!arg) {
          newOutputs.push({
            type: 'error',
            text: 'Usage: play <project_id> (Try "play xoxo" or "play mamba")',
          });
          break;
        }
        const target = PROJECTS_DATA.find(
          (p) => p.id.toLowerCase() === arg || p.title.toLowerCase().includes(arg)
        );
        if (target && target.isPlayable) {
          newOutputs.push({
            type: 'success',
            text: `Launching live sandbox for ${target.title}...`,
          });
          onPlayProject(target);
        } else if (target) {
          newOutputs.push({
            type: 'output',
            text: `${target.title} is not an interactive browser game. Use "open ${target.id}" to view its link.`,
          });
        } else {
          newOutputs.push({
            type: 'error',
            text: `Project "${arg}" not found. Type "ls" to view valid identifiers.`,
          });
        }
        break;
      }

      case 'cat':
      case 'view':
      case 'inspect': {
        if (!arg) {
          newOutputs.push({
            type: 'error',
            text: 'Usage: cat <project_id> (e.g. "cat xoxo", "cat copilot", "cat fraud-jobs")',
          });
          break;
        }
        const target = PROJECTS_DATA.find(
          (p) => p.id.toLowerCase() === arg || p.title.toLowerCase().includes(arg)
        );
        if (target) {
          newOutputs.push({
            type: 'output',
            component: (
              <div className="my-2 p-3 rounded border border-white/15 bg-black/40 font-mono text-xs">
                <p className="text-lg font-bold text-[#e34f3c]">{target.title}</p>
                <p className="text-[#3a7065] font-semibold mt-0.5">{target.tagline}</p>
                <p className="mt-2 text-neutral-300 leading-relaxed">{target.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {target.stack.map((t) => (
                    <span key={t} className="bg-white/10 px-2 py-0.5 rounded text-[11px] text-neutral-200">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-3 border-t border-white/10 pt-2 flex flex-col gap-1 text-neutral-400">
                  {target.bullets.map((b, i) => (
                    <p key={i}>• {b}</p>
                  ))}
                </div>
              </div>
            ),
          });
        } else {
          newOutputs.push({
            type: 'error',
            text: `Project "${arg}" not found. Type "ls" for available projects.`,
          });
        }
        break;
      }

      case 'clone': {
        if (!arg) {
          newOutputs.push({
            type: 'error',
            text: 'Usage: clone <project_id> (e.g. "clone xoxo", "clone mamba", "clone resume-os")',
          });
          break;
        }
        const target = PROJECTS_DATA.find(
          (p) => p.id.toLowerCase() === arg || p.title.toLowerCase().includes(arg)
        );
        if (target && target.repoUrl) {
          const cloneCmd = `git clone ${target.repoUrl}.git`;
          navigator.clipboard.writeText(cloneCmd);
          newOutputs.push({
            type: 'success',
            text: `[COPIED TO CLIPBOARD] ${cloneCmd}`,
          });
        } else if (target) {
          newOutputs.push({
            type: 'error',
            text: `No public git repository URL configured for "${target.title}".`,
          });
        } else {
          newOutputs.push({
            type: 'error',
            text: `Project "${arg}" not found.`,
          });
        }
        break;
      }

      case 'open': {
        if (!arg) {
          newOutputs.push({
            type: 'error',
            text: 'Usage: open <project_id>',
          });
          break;
        }
        const target = PROJECTS_DATA.find(
          (p) => p.id.toLowerCase() === arg || p.title.toLowerCase().includes(arg)
        );
        const url = target?.liveUrl || target?.repoUrl;
        if (url) {
          window.open(url, '_blank');
          newOutputs.push({
            type: 'success',
            text: `Opening ${url} in a new tab...`,
          });
        } else {
          newOutputs.push({
            type: 'error',
            text: `Project "${arg}" not found.`,
          });
        }
        break;
      }

      case 'clear':
      case 'cls':
        setOutputs([]);
        setInputVal('');
        return;

      case 'exit':
      case 'quit':
      case 'q':
        onExit();
        return;

      default:
        newOutputs.push({
          type: 'error',
          text: `zsh: command not found: ${cmd}. Type "help" for a list of available commands.`,
        });
        break;
    }

    setOutputs(newOutputs);
    setInputVal('');
  };

  const handleTabCompletion = (current: string) => {
    const trimmed = current.trim();
    if (!trimmed) return;
    const parts = trimmed.split(' ');

    if (parts.length === 1) {
      const availableCommands = [
        'help',
        'ls',
        'list',
        'play',
        'cat',
        'clone',
        'open',
        'clear',
        'exit',
        'whoami',
        'skills',
        'tech',
        'contact',
        'history',
      ];
      const match = availableCommands.find((c) => c.startsWith(parts[0].toLowerCase()));
      if (match) {
        setInputVal(match + ' ');
      }
    } else if (
      parts.length === 2 &&
      ['play', 'cat', 'clone', 'open', 'run', 'inspect', 'view'].includes(parts[0].toLowerCase())
    ) {
      const match = PROJECTS_DATA.find((p) => p.id.toLowerCase().startsWith(parts[1].toLowerCase()));
      if (match) {
        setInputVal(`${parts[0]} ${match.id}`);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(inputVal);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      handleTabCompletion(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInputVal(history[nextIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= history.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIdx);
        setInputVal(history[nextIdx] || '');
      }
    }
  };

  const quickActions = [
    { label: 'ls', cmd: 'ls' },
    { label: 'play xoxo', cmd: 'play xoxo' },
    { label: 'play mamba', cmd: 'play mamba' },
    { label: 'clone xoxo', cmd: 'clone xoxo' },
    { label: 'cat copilot', cmd: 'cat copilot' },
    { label: 'whoami', cmd: 'whoami' },
    { label: 'skills', cmd: 'skills' },
    { label: 'help', cmd: 'help' },
    { label: 'clear', cmd: 'clear' },
  ];

  return (
    <div className="flex flex-col rounded-xl border border-black/25 dark:border-white/20 bg-[#0e0e0d] text-[#f4f0e8] shadow-2xl overflow-hidden font-mono">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-white/15 px-4 py-3 bg-[#171716]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <button
              onClick={onExit}
              className="h-3 w-3 rounded-full bg-[#e34f3c] hover:opacity-80"
              title="Close Terminal"
            />
            <span className="h-3 w-3 rounded-full bg-[#cd9f28]" />
            <span className="h-3 w-3 rounded-full bg-[#3a7065]" />
          </div>
          <span className="text-xs text-neutral-400 font-medium">solon@github:~ (interactive zsh)</span>
        </div>

        <button
          onClick={onExit}
          className="text-xs text-neutral-400 hover:text-white transition-colors underline"
        >
          Exit to Visual Grid [ESC]
        </button>
      </div>

      {/* Terminal Quick Chips */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 px-4 py-2 bg-black/30 text-xs">
        <span className="text-neutral-500">Quick Commands:</span>
        {quickActions.map((qa) => (
          <button
            key={qa.label}
            onClick={(e) => {
              e.preventDefault();
              executeCommand(qa.cmd);
              inputRef.current?.focus({ preventScroll: true });
            }}
            className="rounded border border-white/20 bg-white/5 px-2 py-0.5 text-neutral-300 hover:border-[#e34f3c] hover:bg-[#e34f3c]/20 hover:text-white transition-colors"
          >
            {qa.label}
          </button>
        ))}
      </div>

      {/* Terminal Output Area (Internal scrolling only) */}
      <div
        ref={terminalBodyRef}
        onClick={() => inputRef.current?.focus({ preventScroll: true })}
        className="flex max-h-[500px] min-h-[350px] flex-col overflow-y-auto p-4 text-xs leading-relaxed"
      >
        {outputs.map((out, i) => (
          <div key={i} className="mb-2">
            {out.type === 'input' && (
              <p className="text-emerald-400 font-semibold">{out.text}</p>
            )}
            {out.type === 'output' && (
              <pre className="whitespace-pre-wrap text-neutral-300 font-mono">{out.text}</pre>
            )}
            {out.type === 'error' && (
              <p className="text-rose-400 font-semibold">{out.text}</p>
            )}
            {out.type === 'success' && (
              <p className="text-emerald-300 font-semibold">{out.text}</p>
            )}
            {out.type === 'banner' && (
              <pre className="text-[#e34f3c] font-semibold whitespace-pre-wrap">{out.text}</pre>
            )}
            {out.component}
          </div>
        ))}

        {/* Input prompt line */}
        <div className="flex items-center gap-2 text-xs pt-1">
          <span className="text-[#3a7065] font-semibold shrink-0">solon@github:~/projects$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-white outline-none caret-[#e34f3c] font-mono"
            placeholder="Type a command (e.g. 'play xoxo', 'ls', 'whoami', 'help')..."
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}
