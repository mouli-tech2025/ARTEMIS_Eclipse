# Fix the crammed dashboard title bar

The dashboard header stacks the breadcrumb, page title, and description into a tight 16px-tall row with the sidebar toggle jammed against them. Result: no breathing room, inconsistent vertical rhythm, and the toggle floating oddly next to three lines of text.

## What changes

- Give the header real vertical padding so the three text lines have room instead of being squeezed to the minimum height.
- Align the sidebar toggle to the top of the text block (not vertically centred against a 3-line stack), and add a subtle vertical divider between the toggle and the breadcrumb so the two zones read as separate.
- Tighten the internal rhythm: small gap between breadcrumb and title, slightly larger gap before the description; increase the title size a step and reduce description size so the hierarchy is obvious.
- Give the breadcrumb muted colour with the current page in white (already the pattern) and add a touch more letter spacing so it doesn't crowd the title below.
- Increase the content area padding below the header so the first card isn't hugging the border.
- Keep it responsive: reduced padding and no divider on small screens.

## Technical notes

All edits are in `src/components/dashboard/blog-layout.tsx`, in the `<header>` block and the content wrapper `<div>`:

- Replace `min-h-16 py-3 px-6` with taller padding (`px-6 py-5`, `px-4` on mobile) and `items-start` alignment for the toggle row.
- Wrap the toggle in a shrink-0 container with `mt-0.5` and add a `border-l border-white/10` spacer (hidden below `sm`).
- Text stack: `gap-2`, breadcrumb `text-xs tracking-wide`, title `text-xl font-semibold`, description `text-sm text-muted-foreground` with `mt-0.5`.
- Content wrapper: `p-6` becomes `px-4 py-6 sm:px-6 sm:py-8`.

No layout, routing, or data logic changes; presentation only.
