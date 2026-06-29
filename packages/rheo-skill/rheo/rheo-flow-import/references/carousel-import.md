# Carousel import rules

Use when the source flow has an **in-screen pager** (`infoSteps`, `currentInfoStep`, horizontal `FlatList` / `PagerView`, dot indicators).

## Rheo carousel behavior (swipe-only)

- Users move between slides by **swiping** (horizontal scroll with snap).
- Optional **`pageControl`** adds dot indicators — not buttons.
- There is **no** Next / Continue button on the carousel layer in the manifest or at runtime.
- On the **last slide** (when `loop` is false and there are 2+ slides), swiping to that slide emits a carousel completion so `screen.next` can run.
- **Single-slide** carousels do not auto-complete; add a `regions.footer` **Continue** (or other) button to advance the flow.
- **`loop: true`** carousels never auto-complete; pair with a separate screen-level CTA when the flow should move on.

## Manifest shape

- One `kind: "carousel"` in `regions.body` (or inside a body stack).
- Each page → child **`stack`** in `carousel.slides[]`.
- `pageControl: { "position": "bottom" }` when source had dot indicators.

## Do not duplicate paging UI

| Source | Import |
|--------|--------|
| Pager pages | `carousel.slides[]` |
| Dot indicators | `pageControl` only |
| Swipe between pages | Default — no extra buttons |
| Footer that only increments pager index | **Omit** — not `regions.footer` |
| Footer / CTA that exits to **next route** | `regions.footer` with `continue` / `go_to_step`, or rely on last-slide swipe completion + `screen.next` |

## Example (swipe + dots)

```json
{
  "regions": {
    "body": {
      "kind": "stack",
      "direction": "vertical",
      "children": [
        {
          "kind": "carousel",
          "slides": [
            {
              "kind": "stack",
              "direction": "vertical",
              "align": "center",
              "children": [
                { "kind": "text", "text": { "default": "Slide 1" }, "style": { "color": "#111111" } }
              ]
            }
          ],
          "pageControl": { "position": "bottom" }
        }
      ]
    }
  },
  "next": { "default": "scr_next" }
}
```

## Completion gate

- [ ] No `button` layers for in-pager next/continue.
- [ ] `screen.next` targets the next **screen** in the flow, not “next slide”.
- [ ] Single-slide carousel screens include a flow-level CTA if the flow must advance without swiping.
