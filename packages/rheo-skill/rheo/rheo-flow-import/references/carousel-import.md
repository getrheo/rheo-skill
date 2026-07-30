# Carousel import rules

Use when the source flow has an **in-screen pager** (`infoSteps`, `currentInfoStep`, horizontal `FlatList` / `PagerView`, dot indicators).

## Rheo carousel behavior (swipe by default)

- Users move between slides by **swiping** (horizontal scroll with snap). Swipe is always available.
- Optional **`pageControl`** adds dot indicators — not buttons.
- On the **last slide** (when `loop` is false and there are 2+ slides), arriving at that slide emits a carousel completion so `screen.next` can run.
- **Single-slide** carousels do not auto-complete; add a `regions.footer` **Continue** (or other) button to advance the flow.
- **`loop: true`** carousels never auto-complete; pair with a separate screen-level CTA when the flow should move on.

## Optional Next button (`advance_carousel`)

A button may page the carousel when the source screen genuinely has a Next control:

- Action shape: `{ "kind": "advance_carousel", "targetLayerId": "<carousel layer id>", "onLast": "noop" | "complete" }`.
- `targetLayerId` must name **exactly one** `carousel` layer on the **same screen**.
- `onLast` is optional and defaults to `"noop"` (stay on the last slide). Use `"complete"` when tapping Next on the last slide should finish the carousel and follow `screen.next`.
- `loop: true` and single-slide carousels never complete through this action — they wrap or do nothing.
- Advancing from second-to-last to last emits carousel completion just like a swipe, so a `"complete"` `onLast` only matters when the user is **already** on the last slide.
- Runtime support: **Web and React Native**. Flutter and SwiftUI decode the action but do nothing on tap, so do not rely on it for flow exit on those platforms — use a `continue` button instead.

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
| Footer that only increments pager index, with no visible Next affordance | **Omit** — swipe already covers it |
| Explicit **Next** button in the source pager | `button` with `advance_carousel` targeting the carousel |
| Footer / CTA that exits to **next route** | `regions.footer` with `continue` / `go_to_step`, or rely on last-slide completion + `screen.next` |

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

## Example (explicit Next button)

```json
{
  "regions": {
    "body": {
      "kind": "stack",
      "direction": "vertical",
      "children": [
        {
          "id": "lyr_car_intro",
          "kind": "carousel",
          "slides": [
            {
              "kind": "stack",
              "direction": "vertical",
              "children": [
                { "kind": "text", "text": { "default": "Slide 1" }, "style": { "color": "#111111" } }
              ]
            },
            {
              "kind": "stack",
              "direction": "vertical",
              "children": [
                { "kind": "text", "text": { "default": "Slide 2" }, "style": { "color": "#111111" } }
              ]
            }
          ],
          "pageControl": { "position": "bottom" }
        }
      ]
    },
    "footer": {
      "kind": "button",
      "variant": "primary",
      "action": { "kind": "advance_carousel", "targetLayerId": "lyr_car_intro", "onLast": "complete" },
      "children": [
        { "kind": "text", "text": { "default": "Next" }, "style": { "color": "#FFFFFF" } }
      ]
    }
  },
  "next": { "default": "scr_next" }
}
```

## Completion gate

- [ ] No `button` layers that only mimic paging without an `advance_carousel` action.
- [ ] Every `advance_carousel` button targets a `carousel` on the same screen.
- [ ] `screen.next` targets the next **screen** in the flow, not “next slide”.
- [ ] Single-slide carousel screens include a flow-level CTA if the flow must advance without swiping.
