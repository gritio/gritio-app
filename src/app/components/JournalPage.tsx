import { useEffect, useRef, useState } from 'react';
import { Plus, Trash2, Bold, Italic, Underline, List, Heading1, Heading2, Heading3 } from 'lucide-react';
import { JournalSection } from '../types';
import { mdToHtml } from '../utils/markdown';

interface JournalPageProps {
  sections: JournalSection[];
  onCreateSection: (data: { name: string; color?: string }) => Promise<JournalSection>;
  onUpdateSection: (id: string, data: { name?: string; color?: string; content?: string }) => Promise<void>;
  onDeleteSection: (id: string) => Promise<void>;
}

const DOT_PALETTE = ['#1D9E75', '#378ADD', '#7F77DD', '#EF9F27', '#E24B4A', '#805232'];
const SAVE_DELAY_MS = 1200;

const FONT_STACKS: Record<string, string> = {
  body: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Source Sans 3", Roboto, Helvetica, Arial, sans-serif',
  serif: 'Georgia, "Iowan Old Style", "Palatino Linotype", "Book Antiqua", "Times New Roman", serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace',
};

function formatMeta(date: Date | string): string {
  const d = new Date(date);
  return 'Edited ' + d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export function JournalPage({ sections, onCreateSection, onUpdateSection, onDeleteSection }: JournalPageProps) {
  const [activeId, setActiveId] = useState<string | null>(sections[0]?.id ?? null);
  const [title, setTitle] = useState(sections[0]?.name ?? '');
  const [content, setContent] = useState(sections[0]?.content ?? '');
  const [mode, setMode] = useState<'write' | 'preview'>('write');
  const [font, setFont] = useState<'body' | 'serif' | 'mono'>('body');
  const [addingSection, setAddingSection] = useState(false);
  const [newSectionName, setNewSectionName] = useState('');

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const newSectionInputRef = useRef<HTMLInputElement | null>(null);

  // Debounced autosave — captures (id, name, content) at schedule time so a
  // pending save always targets the section it was scheduled for, even if
  // the user switches sections before the timer fires.
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingRef = useRef<{ id: string; name: string; content: string } | null>(null);

  const flushSave = () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
    const pending = pendingRef.current;
    pendingRef.current = null;
    if (pending) {
      onUpdateSection(pending.id, { name: pending.name, content: pending.content }).catch(() => {
        // Best-effort autosave — errors are already logged in journalApi.
      });
    }
  };

  const scheduleSave = (id: string, nextName: string, nextContent: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    pendingRef.current = { id, name: nextName, content: nextContent };
    debounceRef.current = setTimeout(flushSave, SAVE_DELAY_MS);
  };

  // Flush any pending save on unmount so the last ~1.2s of typing isn't lost.
  useEffect(() => {
    return () => flushSave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (addingSection) newSectionInputRef.current?.focus();
  }, [addingSection]);

  // Sections are fetched once at the App level; if they arrive after this
  // component has already mounted with an empty list, select the first one.
  useEffect(() => {
    if (!activeId && sections.length > 0) {
      setActiveId(sections[0].id);
      setTitle(sections[0].name);
      setContent(sections[0].content);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections, activeId]);

  const selectSection = (section: JournalSection) => {
    if (section.id === activeId) return;
    flushSave();
    setActiveId(section.id);
    setTitle(section.name);
    setContent(section.content);
    setMode('write');
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (activeId) scheduleSave(activeId, value, content);
  };

  const handleContentChange = (value: string) => {
    setContent(value);
    if (activeId) scheduleSave(activeId, title, value);
  };

  const openAddSection = () => {
    setNewSectionName('');
    setAddingSection(true);
  };

  const confirmAddSection = async () => {
    const name = newSectionName.trim();
    setAddingSection(false);
    if (!name) return;
    flushSave();
    const color = DOT_PALETTE[Math.floor(Math.random() * DOT_PALETTE.length)];
    const created = await onCreateSection({ name, color });
    setActiveId(created.id);
    setTitle(created.name);
    setContent('');
    setMode('write');
    textareaRef.current?.focus();
  };

  const handleDelete = async (section: JournalSection) => {
    if (!confirm(`Delete "${section.name}"? This can't be undone.`)) return;
    if (section.id === activeId) flushSave();
    await onDeleteSection(section.id);
    if (section.id === activeId) {
      const remaining = sections.filter((s) => s.id !== section.id);
      const next = remaining[0] ?? null;
      setActiveId(next?.id ?? null);
      setTitle(next?.name ?? '');
      setContent(next?.content ?? '');
    }
  };

  // ---- toolbar: insert Markdown syntax into the textarea ----
  const wrapSelection = (before: string, after: string) => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = content.slice(start, end);
    const next = content.slice(0, start) + before + selected + after + content.slice(end);
    handleContentChange(next);
    const cursor = selected ? start + before.length + selected.length + after.length : start + before.length;
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(cursor, cursor);
    });
  };

  const prefixLine = (prefix: string) => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const lineStart = content.lastIndexOf('\n', start - 1) + 1;
    const next = content.slice(0, lineStart) + prefix + content.slice(lineStart);
    handleContentChange(next);
    const cursor = start + prefix.length;
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(cursor, cursor);
    });
  };

  const activeFont = FONT_STACKS[font];

  return (
    <div className="w-full h-full px-3 sm:px-6 py-4 sm:py-6 flex flex-col">
      <style>{`
        .prose-journal h1 { font-size: 1.5rem; font-weight: 700; margin: 0 0 0.6rem; }
        .prose-journal h2 { font-size: 1.2rem; font-weight: 700; margin: 1.1rem 0 0.5rem; }
        .prose-journal h3 { font-size: 1.05rem; font-weight: 700; margin: 0.9rem 0 0.4rem; }
        .prose-journal p { margin: 0 0 0.75rem; }
        .prose-journal ul { margin: 0 0 0.75rem; padding-left: 1.25rem; list-style: disc; }
        .prose-journal strong { font-weight: 700; }
        .prose-journal em { font-style: italic; }
        .prose-journal u { text-decoration: underline; }
      `}</style>
      <h1 className="text-xl sm:text-2xl font-bold mb-1 text-[#805232]">Journal</h1>
      <p className="text-xs sm:text-sm text-gray-600 mb-4">Sections on the left, plain writing on the right — supports Markdown.</p>

      <div className="flex-1 min-h-[560px] grid grid-cols-1 sm:grid-cols-[220px_1fr] bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {/* Sections rail */}
        <div className="border-b sm:border-b-0 sm:border-r border-gray-200 flex flex-col min-w-0">
          <div className="flex items-center justify-between px-3.5 pt-3.5 pb-2.5">
            <h2 className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">Sections</h2>
            <button
              onClick={openAddSection}
              className="w-6 h-6 rounded-md border border-dashed border-gray-300 text-gray-500 hover:border-[#805232] hover:text-[#805232] flex items-center justify-center transition-colors"
              title="Add section"
              aria-label="Add section"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {addingSection && (
            <div className="flex items-center gap-2 px-2 pb-2">
              <input
                ref={newSectionInputRef}
                type="text"
                value={newSectionName}
                onChange={(e) => setNewSectionName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') confirmAddSection();
                  if (e.key === 'Escape') setAddingSection(false);
                }}
                onBlur={confirmAddSection}
                placeholder="Section name…"
                className="flex-1 min-w-0 border border-[#a67557] rounded-md px-2.5 py-1.5 text-sm text-[#805232] focus:outline-none focus:ring-1 focus:ring-[#805232]"
              />
            </div>
          )}

          <ul className="flex-1 overflow-y-auto px-2 pb-2 space-y-0.5">
            {sections.map((section) => (
              <li
                key={section.id}
                onClick={() => selectSection(section)}
                className={`group flex items-center gap-2.5 px-2 py-2 rounded-md cursor-pointer ${
                  section.id === activeId ? 'bg-[#f1e6db]' : 'hover:bg-[#f1e6db]'
                }`}
              >
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: section.color }} />
                <div className="min-w-0 flex-1">
                  <div className={`text-sm font-semibold truncate ${section.id === activeId ? 'text-[#6b4427]' : 'text-gray-800'}`}>
                    {section.name}
                  </div>
                  <div className="text-[11px] text-gray-400">{formatMeta(section.updatedAt)}</div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(section);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded text-gray-400 hover:text-red-600 hover:bg-red-50 transition-opacity flex-shrink-0"
                  title="Delete section"
                  aria-label={`Delete ${section.name}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </li>
            ))}
            {sections.length === 0 && !addingSection && (
              <li className="text-xs text-gray-400 px-2 py-4 text-center">No sections yet — click + to add one.</li>
            )}
          </ul>
        </div>

        {/* Writing canvas */}
        <div className="flex flex-col min-w-0">
          {activeId ? (
            <>
              <div className="flex items-center justify-between px-4 sm:px-6 pt-3.5 pb-3 border-b border-gray-200">
                <input
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  onBlur={flushSave}
                  className="text-lg sm:text-xl font-bold text-gray-900 outline-none flex-1 min-w-0 bg-transparent"
                />
              </div>

              <div className="flex items-center gap-1 flex-wrap px-4 sm:px-6 py-2 border-b border-gray-200">
                <select
                  value={font}
                  onChange={(e) => setFont(e.target.value as 'body' | 'serif' | 'mono')}
                  className="text-xs border border-gray-200 rounded-md px-2 py-1.5 mr-1.5 text-gray-700"
                  aria-label="Font"
                >
                  <option value="body">Sans</option>
                  <option value="serif">Serif</option>
                  <option value="mono">Mono</option>
                </select>
                <div className="w-px self-stretch bg-gray-200 mx-1" />
                <button onClick={() => prefixLine('# ')} className="p-1.5 rounded hover:bg-[#f1e6db] hover:text-[#6b4427] text-gray-600" title="Heading 1"><Heading1 className="w-4 h-4" /></button>
                <button onClick={() => prefixLine('## ')} className="p-1.5 rounded hover:bg-[#f1e6db] hover:text-[#6b4427] text-gray-600" title="Heading 2"><Heading2 className="w-4 h-4" /></button>
                <button onClick={() => prefixLine('### ')} className="p-1.5 rounded hover:bg-[#f1e6db] hover:text-[#6b4427] text-gray-600" title="Heading 3"><Heading3 className="w-4 h-4" /></button>
                <div className="w-px self-stretch bg-gray-200 mx-1" />
                <button onClick={() => wrapSelection('**', '**')} className="p-1.5 rounded hover:bg-[#f1e6db] hover:text-[#6b4427] text-gray-600" title="Bold"><Bold className="w-4 h-4" /></button>
                <button onClick={() => wrapSelection('*', '*')} className="p-1.5 rounded hover:bg-[#f1e6db] hover:text-[#6b4427] text-gray-600" title="Italic"><Italic className="w-4 h-4" /></button>
                <button onClick={() => wrapSelection('<u>', '</u>')} className="p-1.5 rounded hover:bg-[#f1e6db] hover:text-[#6b4427] text-gray-600" title="Underline"><Underline className="w-4 h-4" /></button>
                <button onClick={() => prefixLine('- ')} className="p-1.5 rounded hover:bg-[#f1e6db] hover:text-[#6b4427] text-gray-600" title="Bullet list"><List className="w-4 h-4" /></button>
                <div className="flex-1" />
                <div className="flex border border-gray-200 rounded-md overflow-hidden">
                  <button
                    onClick={() => setMode('write')}
                    className={`text-xs font-semibold px-3 py-1.5 ${mode === 'write' ? 'bg-[#805232] text-white' : 'bg-white text-gray-600'}`}
                  >
                    Write
                  </button>
                  <button
                    onClick={() => setMode('preview')}
                    className={`text-xs font-semibold px-3 py-1.5 ${mode === 'preview' ? 'bg-[#805232] text-white' : 'bg-white text-gray-600'}`}
                  >
                    Preview
                  </button>
                </div>
              </div>

              <div className="flex-1 px-4 sm:px-6 py-4 overflow-y-auto">
                {mode === 'write' ? (
                  <textarea
                    ref={textareaRef}
                    value={content}
                    onChange={(e) => handleContentChange(e.target.value)}
                    onBlur={flushSave}
                    placeholder="Start writing… (Markdown supported)"
                    className="w-full h-full min-h-[360px] outline-none resize-none text-[15px] leading-7 text-gray-900"
                    style={{ fontFamily: activeFont }}
                  />
                ) : (
                  <div
                    className="prose-journal max-w-[68ch] text-[15px] leading-7 text-gray-900"
                    style={{ fontFamily: activeFont }}
                    // mdToHtml escapes all input before allowing only a small,
                    // whitelisted set of tags through — see utils/markdown.ts.
                    dangerouslySetInnerHTML={{ __html: mdToHtml(content) }}
                  />
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
              <div className="w-12 h-12 rounded-xl bg-[#f1e6db] text-[#805232] flex items-center justify-center mb-4">
                <Plus className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-gray-900 mb-1.5">No sections yet</h2>
              <p className="text-sm text-gray-500 max-w-xs mb-4">
                Sections keep your writing organized — one for training, one for work, one for whatever's on your mind.
              </p>
              <button
                onClick={openAddSection}
                className="bg-[#805232] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#6b4427] transition-colors"
              >
                + Add a section
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
