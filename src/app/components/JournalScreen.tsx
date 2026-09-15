import { useEffect, useRef, useState, KeyboardEvent } from 'react';
import { Plus, Trash2, Pencil, Bold, Italic, Underline, List, Heading1, Heading2, Heading3, ArrowLeft } from 'lucide-react';
import { JournalNotebook, JournalPageEntry } from '../types';
import { journalApi } from '../services/api';
import { mdToHtml } from '../utils/markdown';

interface JournalScreenProps {
  notebooks: JournalNotebook[];
  onCreateNotebook: (data: { name: string; color?: string }) => Promise<JournalNotebook>;
  onUpdateNotebook: (id: string, data: { name?: string; color?: string }) => Promise<void>;
  onDeleteNotebook: (id: string) => Promise<void>;
}

const DOT_PALETTE = ['#1D9E75', '#378ADD', '#7F77DD', '#EF9F27', '#E24B4A', '#805232'];
const SAVE_DELAY_MS = 1200;

const FONT_STACKS: Record<string, string> = {
  body: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Source Sans 3", Roboto, Helvetica, Arial, sans-serif',
  serif: 'Georgia, "Iowan Old Style", "Palatino Linotype", "Book Antiqua", "Times New Roman", serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace',
};

type MobilePane = 'notebooks' | 'pages' | 'editor';

function toISODate(date: Date | string): string {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatPageDate(date: Date | string): string {
  return new Date(date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
}

function previewOf(content: string): string {
  const firstLine = content.split('\n').find(line => line.trim().length > 0) || '';
  const stripped = firstLine.replace(/^#+\s*/, '').replace(/[*_`]/g, '');
  return stripped.slice(0, 64) || 'Empty page';
}

export function JournalScreen({ notebooks, onCreateNotebook, onUpdateNotebook, onDeleteNotebook }: JournalScreenProps) {
  const [activeNotebookId, setActiveNotebookId] = useState<string | null>(notebooks[0]?.id ?? null);
  const [pages, setPages] = useState<JournalPageEntry[]>([]);
  const [pagesLoading, setPagesLoading] = useState(false);

  const [activePageId, setActivePageId] = useState<string | null>(null);
  const [pageDate, setPageDate] = useState('');
  const [pageTitle, setPageTitle] = useState('');
  const [content, setContent] = useState('');
  const [mode, setMode] = useState<'write' | 'preview'>('write');
  const [font, setFont] = useState<'body' | 'serif' | 'mono'>('body');

  const [addingNotebook, setAddingNotebook] = useState(false);
  const [newNotebookName, setNewNotebookName] = useState('');
  const [addingPage, setAddingPage] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState('');

  const [renamingNotebookId, setRenamingNotebookId] = useState<string | null>(null);
  const [renameNotebookValue, setRenameNotebookValue] = useState('');
  const [renamingPageId, setRenamingPageId] = useState<string | null>(null);
  const [renamePageValue, setRenamePageValue] = useState('');

  const [mobilePane, setMobilePane] = useState<MobilePane>('notebooks');

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const newNotebookInputRef = useRef<HTMLInputElement | null>(null);

  // Debounced autosave — captures (id, fields) at schedule time so a pending
  // save always targets the page it was scheduled for, even if the user
  // switches pages before the timer fires. Title and content edits within
  // the same debounce window are merged into a single request.
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingRef = useRef<{ id: string; title?: string; content?: string } | null>(null);

  const flushSave = () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
    const pending = pendingRef.current;
    pendingRef.current = null;
    if (pending) {
      const { id, ...data } = pending;
      journalApi.updatePage(id, data).then((updated) => {
        setPages(prev => prev.map(p => (p.id === id ? updated : p)));
      }).catch(() => {
        // Best-effort autosave — errors are already logged in journalApi.
      });
    }
  };

  const scheduleSave = (id: string, data: { title?: string; content?: string }) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    pendingRef.current = { ...(pendingRef.current?.id === id ? pendingRef.current : {}), id, ...data };
    debounceRef.current = setTimeout(flushSave, SAVE_DELAY_MS);
  };

  useEffect(() => {
    return () => flushSave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (addingNotebook) newNotebookInputRef.current?.focus();
  }, [addingNotebook]);

  // Notebooks are fetched once at the App level; if they arrive after this
  // component has already mounted with an empty list, select the first one.
  useEffect(() => {
    if (!activeNotebookId && notebooks.length > 0) {
      setActiveNotebookId(notebooks[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notebooks, activeNotebookId]);

  // Load this notebook's pages whenever the selection changes.
  useEffect(() => {
    if (!activeNotebookId) {
      setPages([]);
      return;
    }
    setPagesLoading(true);
    setActivePageId(null);
    setContent('');
    setPageTitle('');
    journalApi.getPages(activeNotebookId).then(fetched => {
      setPages(fetched);
      setPagesLoading(false);
    });
  }, [activeNotebookId]);

  const selectNotebook = (notebook: JournalNotebook) => {
    if (notebook.id === activeNotebookId) return;
    flushSave();
    setActiveNotebookId(notebook.id);
    setMobilePane('pages');
  };

  const selectPage = (page: JournalPageEntry) => {
    if (page.id === activePageId) return;
    flushSave();
    setActivePageId(page.id);
    setPageDate(toISODate(page.date));
    setPageTitle(page.title || '');
    setContent(page.content);
    setMode('write');
    setMobilePane('editor');
  };

  const handleContentChange = (value: string) => {
    setContent(value);
    if (activePageId) scheduleSave(activePageId, { content: value });
  };

  const handleTitleChange = (value: string) => {
    setPageTitle(value);
    if (activePageId) scheduleSave(activePageId, { title: value });
  };

  const handlePageDateChange = async (value: string) => {
    setPageDate(value);
    if (!activePageId) return;
    try {
      const updated = await journalApi.updatePage(activePageId, { date: value });
      setPages(prev => prev.map(p => (p.id === activePageId ? updated : p)));
    } catch {
      // Best-effort — errors already logged in journalApi.
    }
  };

  const openAddNotebook = () => {
    setNewNotebookName('');
    setAddingNotebook(true);
  };

  const confirmAddNotebook = async () => {
    const name = newNotebookName.trim();
    setAddingNotebook(false);
    if (!name) return;
    flushSave();
    const color = DOT_PALETTE[Math.floor(Math.random() * DOT_PALETTE.length)];
    const created = await onCreateNotebook({ name, color });
    setActiveNotebookId(created.id);
    setMobilePane('pages');
  };

  const openRenameNotebook = (notebook: JournalNotebook) => {
    setRenamingNotebookId(notebook.id);
    setRenameNotebookValue(notebook.name);
  };

  const confirmRenameNotebook = async (notebook: JournalNotebook) => {
    const name = renameNotebookValue.trim();
    setRenamingNotebookId(null);
    if (!name || name === notebook.name) return;
    await onUpdateNotebook(notebook.id, { name });
  };

  const handleDeleteNotebook = async (notebook: JournalNotebook) => {
    if (!confirm(`Delete "${notebook.name}" and all its pages? This can't be undone.`)) return;
    if (notebook.id === activeNotebookId) flushSave();
    await onDeleteNotebook(notebook.id);
    if (notebook.id === activeNotebookId) {
      const remaining = notebooks.filter(n => n.id !== notebook.id);
      setActiveNotebookId(remaining[0]?.id ?? null);
    }
  };

  const openAddPage = () => {
    setNewPageTitle('');
    setAddingPage(true);
  };

  const confirmAddPage = async () => {
    setAddingPage(false);
    if (!activeNotebookId) return;
    flushSave();
    const title = newPageTitle.trim();
    const created = await journalApi.createPage(activeNotebookId, {
      date: toISODate(new Date()),
      title: title || undefined,
    });
    setPages(prev => [created, ...prev].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    setActivePageId(created.id);
    setPageDate(toISODate(created.date));
    setPageTitle(created.title || '');
    setContent(created.content);
    setMode('write');
    setMobilePane('editor');
    requestAnimationFrame(() => textareaRef.current?.focus());
  };

  const openRenamePage = (page: JournalPageEntry) => {
    setRenamingPageId(page.id);
    setRenamePageValue(page.title || '');
  };

  const confirmRenamePage = async (page: JournalPageEntry) => {
    const title = renamePageValue.trim();
    setRenamingPageId(null);
    if (title === (page.title || '')) return;
    const updated = await journalApi.updatePage(page.id, { title });
    setPages(prev => prev.map(p => (p.id === page.id ? updated : p)));
    if (page.id === activePageId) setPageTitle(updated.title || '');
  };

  const handleDeletePage = async (page: JournalPageEntry) => {
    if (!confirm(`Delete this page from ${formatPageDate(page.date)}? This can't be undone.`)) return;
    if (page.id === activePageId) flushSave();
    await journalApi.deletePage(page.id);
    setPages(prev => prev.filter(p => p.id !== page.id));
    if (page.id === activePageId) {
      setActivePageId(null);
      setContent('');
      setPageTitle('');
      setMobilePane('pages');
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

  // Toggles "- " on every non-blank line the selection touches (or just the
  // current line with no selection) — turns bullets on if any line lacks
  // one, off only once every line already has one.
  const toggleBulletList = () => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const blockStart = content.lastIndexOf('\n', start - 1) + 1;
    let blockEnd = content.indexOf('\n', end);
    if (blockEnd === -1) blockEnd = content.length;
    const block = content.slice(blockStart, blockEnd);
    const lines = block.split('\n');
    const allBulleted = lines.every(line => line.trim() === '' || /^- /.test(line));
    const nextLines = lines.map(line => {
      if (line.trim() === '') return line;
      return allBulleted ? line.replace(/^- /, '') : '- ' + line;
    });
    const nextBlock = nextLines.join('\n');
    const next = content.slice(0, blockStart) + nextBlock + content.slice(blockEnd);
    handleContentChange(next);
    const cursor = Math.max(blockStart, end + (nextBlock.length - block.length));
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(cursor, cursor);
    });
  };

  // Pressing Enter inside a bullet line continues the list onto the next
  // line; pressing Enter on an already-empty bullet ends the list instead.
  const handleTextareaKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== 'Enter') return;
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    if (start !== end) return;
    const lineStart = content.lastIndexOf('\n', start - 1) + 1;
    const line = content.slice(lineStart, start);
    const match = line.match(/^(\s*)- (.*)$/);
    if (!match) return;
    e.preventDefault();
    const [, indent, rest] = match;
    if (rest.trim() === '') {
      const next = content.slice(0, lineStart) + content.slice(start);
      handleContentChange(next);
      requestAnimationFrame(() => {
        el.focus();
        el.setSelectionRange(lineStart, lineStart);
      });
    } else {
      const insertion = '\n' + indent + '- ';
      const next = content.slice(0, start) + insertion + content.slice(end);
      handleContentChange(next);
      const cursor = start + insertion.length;
      requestAnimationFrame(() => {
        el.focus();
        el.setSelectionRange(cursor, cursor);
      });
    }
  };

  const activeFont = FONT_STACKS[font];
  const activeNotebook = notebooks.find(n => n.id === activeNotebookId) ?? null;
  const activePage = pages.find(p => p.id === activePageId) ?? null;

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
      <p className="text-xs sm:text-sm text-gray-600 mb-4">Notebooks on the left, one page per entry — supports Markdown.</p>

      <div className="flex-1 min-h-[560px] grid grid-cols-1 sm:grid-cols-[200px_240px_1fr] bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {/* Notebooks rail */}
        <div className={`${mobilePane === 'notebooks' ? 'flex' : 'hidden'} sm:flex border-b sm:border-b-0 sm:border-r border-gray-200 flex-col min-w-0`}>
          <div className="flex items-center justify-between px-3.5 pt-3.5 pb-2.5">
            <h2 className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">Notebooks</h2>
            <button
              onClick={openAddNotebook}
              className="w-6 h-6 rounded-md border border-dashed border-gray-300 text-gray-500 hover:border-[#805232] hover:text-[#805232] flex items-center justify-center transition-colors"
              title="Add notebook"
              aria-label="Add notebook"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {addingNotebook && (
            <div className="flex items-center gap-2 px-2 pb-2">
              <input
                ref={newNotebookInputRef}
                type="text"
                value={newNotebookName}
                onChange={(e) => setNewNotebookName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') confirmAddNotebook();
                  if (e.key === 'Escape') setAddingNotebook(false);
                }}
                onBlur={confirmAddNotebook}
                placeholder="Notebook name…"
                className="flex-1 min-w-0 border border-[#a67557] rounded-md px-2.5 py-1.5 text-sm text-[#805232] focus:outline-none focus:ring-1 focus:ring-[#805232]"
              />
            </div>
          )}

          <ul className="flex-1 overflow-y-auto px-2 pb-2 space-y-0.5">
            {notebooks.map((notebook) => (
              <li
                key={notebook.id}
                onClick={() => selectNotebook(notebook)}
                className={`group flex items-center gap-2.5 px-2 py-2 rounded-md cursor-pointer ${
                  notebook.id === activeNotebookId ? 'bg-[#f1e6db]' : 'hover:bg-[#f1e6db]'
                }`}
              >
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: notebook.color }} />
                <div className="min-w-0 flex-1">
                  {renamingNotebookId === notebook.id ? (
                    <input
                      type="text"
                      autoFocus
                      value={renameNotebookValue}
                      onChange={(e) => setRenameNotebookValue(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      onFocus={(e) => e.target.select()}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') confirmRenameNotebook(notebook);
                        if (e.key === 'Escape') setRenamingNotebookId(null);
                      }}
                      onBlur={() => confirmRenameNotebook(notebook)}
                      className="w-full min-w-0 border border-[#a67557] rounded px-1.5 py-0.5 text-sm text-[#805232] focus:outline-none focus:ring-1 focus:ring-[#805232]"
                    />
                  ) : (
                    <div className={`text-sm font-semibold truncate ${notebook.id === activeNotebookId ? 'text-[#6b4427]' : 'text-gray-800'}`}>
                      {notebook.name}
                    </div>
                  )}
                </div>
                {renamingNotebookId !== notebook.id && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openRenameNotebook(notebook);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded text-gray-400 hover:text-[#805232] hover:bg-[#f1e6db] transition-opacity flex-shrink-0"
                    title="Rename notebook"
                    aria-label={`Rename ${notebook.name}`}
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteNotebook(notebook);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded text-gray-400 hover:text-red-600 hover:bg-red-50 transition-opacity flex-shrink-0"
                  title="Delete notebook"
                  aria-label={`Delete ${notebook.name}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </li>
            ))}
            {notebooks.length === 0 && !addingNotebook && (
              <li className="text-xs text-gray-400 px-2 py-4 text-center">No notebooks yet — click + to add one.</li>
            )}
          </ul>
        </div>

        {/* Pages list */}
        <div className={`${mobilePane === 'pages' ? 'flex' : 'hidden'} sm:flex border-b sm:border-b-0 sm:border-r border-gray-200 flex-col min-w-0`}>
          <div className="flex items-center gap-2 px-3.5 pt-3.5 pb-2.5">
            <button
              onClick={() => setMobilePane('notebooks')}
              className="sm:hidden text-gray-400 hover:text-[#805232]"
              aria-label="Back to notebooks"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h2 className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold flex-1 truncate">
              {activeNotebook ? activeNotebook.name : 'Pages'}
            </h2>
            {activeNotebookId && (
              <button
                onClick={openAddPage}
                className="w-6 h-6 rounded-md border border-dashed border-gray-300 text-gray-500 hover:border-[#805232] hover:text-[#805232] flex items-center justify-center transition-colors flex-shrink-0"
                title="Add page"
                aria-label="Add page"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {addingPage && (
            <div className="flex items-center gap-2 px-2 pb-2">
              <input
                type="text"
                autoFocus
                value={newPageTitle}
                onChange={(e) => setNewPageTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') confirmAddPage();
                  if (e.key === 'Escape') setAddingPage(false);
                }}
                placeholder={formatPageDate(new Date())}
                className="flex-1 min-w-0 border border-[#a67557] rounded-md px-2.5 py-1.5 text-sm text-[#805232] focus:outline-none focus:ring-1 focus:ring-[#805232]"
              />
              <button
                onClick={confirmAddPage}
                className="text-xs font-semibold px-2.5 py-1.5 rounded-md bg-[#805232] text-white hover:bg-[#6b4427]"
              >
                Add
              </button>
            </div>
          )}

          <ul className="flex-1 overflow-y-auto px-2 pb-2 space-y-0.5">
            {!activeNotebookId ? (
              <li className="text-xs text-gray-400 px-2 py-4 text-center">Select a notebook first.</li>
            ) : pagesLoading ? (
              <li className="text-xs text-gray-400 px-2 py-4 text-center">Loading…</li>
            ) : pages.length === 0 ? (
              <li className="text-xs text-gray-400 px-2 py-4 text-center">No pages yet — click + to add one.</li>
            ) : (
              pages.map((page) => (
                <li
                  key={page.id}
                  onClick={() => selectPage(page)}
                  className={`group flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer ${
                    page.id === activePageId ? 'bg-[#f1e6db]' : 'hover:bg-[#f1e6db]'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    {renamingPageId === page.id ? (
                      <input
                        type="text"
                        autoFocus
                        value={renamePageValue}
                        onChange={(e) => setRenamePageValue(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        onFocus={(e) => e.target.select()}
                        placeholder={formatPageDate(page.date)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') confirmRenamePage(page);
                          if (e.key === 'Escape') setRenamingPageId(null);
                        }}
                        onBlur={() => confirmRenamePage(page)}
                        className="w-full min-w-0 border border-[#a67557] rounded px-1.5 py-0.5 text-xs text-[#805232] focus:outline-none focus:ring-1 focus:ring-[#805232]"
                      />
                    ) : (
                      <>
                        <div className={`text-xs font-semibold truncate ${page.id === activePageId ? 'text-[#6b4427]' : 'text-gray-800'}`}>
                          {page.title?.trim() || formatPageDate(page.date)}
                        </div>
                        <div className="text-[11px] text-gray-400 truncate">
                          {page.title?.trim() ? `${formatPageDate(page.date)} · ${previewOf(page.content)}` : previewOf(page.content)}
                        </div>
                      </>
                    )}
                  </div>
                  {renamingPageId !== page.id && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openRenamePage(page);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded text-gray-400 hover:text-[#805232] hover:bg-[#f1e6db] transition-opacity flex-shrink-0"
                      title="Rename page"
                      aria-label="Rename page"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePage(page);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded text-gray-400 hover:text-red-600 hover:bg-red-50 transition-opacity flex-shrink-0"
                    title="Delete page"
                    aria-label="Delete page"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Writing canvas */}
        <div className={`${mobilePane === 'editor' ? 'flex' : 'hidden'} sm:flex flex-col min-w-0`}>
          {activePage ? (
            <>
              <div className="flex items-center gap-2 px-4 sm:px-6 pt-3.5 pb-3 border-b border-gray-200">
                <button
                  onClick={() => setMobilePane('pages')}
                  className="sm:hidden text-gray-400 hover:text-[#805232] flex-shrink-0"
                  aria-label="Back to pages"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div className="min-w-0 flex-1 flex flex-col">
                  <input
                    type="text"
                    value={pageTitle}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    onBlur={flushSave}
                    placeholder={formatPageDate(pageDate)}
                    className="text-lg sm:text-xl font-bold text-gray-900 outline-none bg-transparent w-full truncate placeholder:text-gray-400 placeholder:font-bold"
                  />
                  <input
                    type="date"
                    value={pageDate}
                    onChange={(e) => handlePageDateChange(e.target.value)}
                    className="text-xs text-gray-500 outline-none bg-transparent w-fit"
                  />
                </div>
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
                <button onClick={toggleBulletList} className="p-1.5 rounded hover:bg-[#f1e6db] hover:text-[#6b4427] text-gray-600" title="Bullet list"><List className="w-4 h-4" /></button>
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
                    onKeyDown={handleTextareaKeyDown}
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
              <h2 className="text-base font-bold text-gray-900 mb-1.5">
                {!activeNotebookId ? 'No notebooks yet' : 'No page selected'}
              </h2>
              <p className="text-sm text-gray-500 max-w-xs mb-4">
                {!activeNotebookId
                  ? 'A notebook holds pages — one for training, one for work, one for whatever’s on your mind.'
                  : 'Pick a page from the list, or add a new one for today.'}
              </p>
              <button
                onClick={!activeNotebookId ? openAddNotebook : openAddPage}
                className="bg-[#805232] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#6b4427] transition-colors"
              >
                {!activeNotebookId ? '+ Add a notebook' : '+ Add a page'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
