// Minimal Markdown -> HTML renderer for the Journal preview pane.
//
// Deliberately hand-rolled (no external markdown lib / no DOMPurify) to keep
// the dependency footprint small, so it must stay strictly ordered:
//   1. Escape &, <, > first — always, on the raw input, before anything else.
//   2. Un-escape ONLY the exact literal strings for a whitelisted <u> tag.
//      This must be a plain string .replace, never a permissive regex (e.g.
//      matching attributes/whitespace) — that would reopen an HTML/attribute
//      injection vector such as <u onmouseover=...>.
//   3. Only after 1-2, run the Markdown -> HTML substitutions below. They
//      insert real tags via string concatenation, so they must never run on
//      unescaped input.
//
// The rendered output is intended for dangerouslySetInnerHTML in a
// *read-only* preview pane only — never wire it to a contentEditable
// surface, or rendered HTML could round-trip back into `content` as if it
// were source Markdown.
//
// Cases this must stay safe against (verified by hand when changing this file):
//   <script>alert(1)</script>
//   <img src=x onerror=alert(1)>
//   <u onmouseover=alert(1)>text</u>
//   a user literally typing the text "&lt;u&gt;"
//   nested: **<u>_x_</u>**

export function mdToHtml(src: string): string {
  let s = src.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Whitelisted underline tag — exact literal match only.
  s = s.split('&lt;u&gt;').join('<u>').split('&lt;/u&gt;').join('</u>');

  // Headings (line-anchored, most specific first).
  s = s
    .replace(/^### (.*)$/gm, '<h3>$1</h3>')
    .replace(/^## (.*)$/gm, '<h2>$1</h2>')
    .replace(/^# (.*)$/gm, '<h1>$1</h1>');

  // Bold, then italic (bold first so **x** isn't partially eaten by italic).
  s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>');

  // Bullet lists — group consecutive "- " lines into one <ul>.
  s = s.replace(/(^|\n)((?:- .*(?:\n|$))+)/g, (_match, lead, block) => {
    const items = block
      .trim()
      .split('\n')
      .map((line: string) => '<li>' + line.replace(/^- /, '') + '</li>')
      .join('');
    return lead + '<ul>' + items + '</ul>';
  });

  // Remaining blank-line-separated blocks become paragraphs, unless they're
  // already a block-level tag we just produced.
  s = s
    .split(/\n{2,}/)
    .map((block) => {
      const trimmed = block.trim();
      if (trimmed === '' || /^<h[1-3]>|^<ul>/.test(trimmed)) return block;
      return '<p>' + block.replace(/\n/g, '<br>') + '</p>';
    })
    .join('\n');

  return s;
}
