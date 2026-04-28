from __future__ import annotations

import html
from pathlib import Path


OUTPUT_DIR = Path("/Users/katherinal/Desktop/SoftwareEngineering/2026-group-18/materials/requirements")
SVG_PATH = OUTPUT_DIR / "stakeholder-top-level-needs.svg"
PREVIEW_PATH = OUTPUT_DIR / "stakeholder-top-level-needs-preview.html"

CANVAS_WIDTH = 1200
OUTER_MARGIN = 20
TABLE_WIDTH = 1160
TABLE_X = OUTER_MARGIN
TABLE_Y = OUTER_MARGIN
HEADER_HEIGHT = 44
FONT_SIZE = 14
HEADER_FONT_SIZE = 14
LINE_HEIGHT = 20
CELL_PADDING_X = 16
CELL_PADDING_Y = 16
MIN_ROW_HEIGHT = 72
COLUMN_WIDTHS = [160, 250, 340, 410]
COLUMN_HEADERS = ["Stakeholder", "Top-Level Need", "Related Epics", "Evidence / Validation"]

ROWS = [
    [
        "Players",
        "Intuitive controls, clear HUD feedback, fair difficulty progression, and smooth gameplay",
        "Epic 1 - Core Gameplay Mechanics; Epic 2 - Stress System; Epic 5 - Level Progression; Epic 6 - User Interface and Feedback",
        "Playtesting and Think Aloud feedback on onboarding, HUD clarity, weapon readiness, and difficulty pacing; SUS and NASA-TLX results used to assess usability and workload.",
    ],
    [
        "Game Developers",
        "Modular, maintainable, extensible, and testable system structure",
        "Epic 1 - Core Gameplay Mechanics; Epic 2 - Stress System; Epic 3 - Weapons System; Epic 4 - Enemy and Asteroid Behaviour; Epic 5 - Level Progression; Epic 6 - User Interface and Feedback",
        "Modular implementation across `stress.js`, `game-loop.js`, `level-spawn.js`, `controls.js`, and `menu.js`; acceptance criteria and traceability matrix linking requirements to implementation files.",
    ],
    [
        "Course Instructors",
        "Clear requirements, justified design decisions, process evidence, and traceable development work",
        "All epics",
        "Use-case modelling, user stories, acceptance criteria, requirement refinement evidence, GitHub issue / PR / commit links, and evaluation results.",
    ],
    [
        "Playtesters",
        "Identify usability issues, balancing problems, and gameplay defects that the development team may overlook",
        "Epic 2 - Stress System; Epic 5 - Level Progression; Epic 6 - User Interface and Feedback",
        "Weekly feedback and playtesting evidence led to requirement changes including score-based progression, HUD weapon states, level briefing cards, and enemy missile stress damage instead of instant death.",
    ],
]


def estimate_text_width(text: str) -> float:
    width = 0.0
    for ch in text:
        if ch == " ":
            width += 4.0
        elif ch in ".,;:/!|`'":
            width += 4.5
        elif ch in "-()[]":
            width += 5.0
        elif ch in "MW@%&":
            width += 12.0
        elif ch in "mw":
            width += 10.0
        elif ch.isupper():
            width += 8.8
        elif ch in "fijlrtI1":
            width += 4.8
        elif ch.isdigit():
            width += 7.2
        else:
            width += 7.4
    return width


def wrap_text(text: str, max_width: int) -> list[str]:
    words = text.split()
    if not words:
        return [""]

    space_width = estimate_text_width(" ")
    word_widths = [estimate_text_width(word) for word in words]
    n = len(words)
    costs = [0.0] * (n + 1)
    next_break = [n] * n

    for i in range(n - 1, -1, -1):
        best_cost = float("inf")
        line_width = 0.0
        for j in range(i, n):
            if j > i:
                line_width += space_width
            line_width += word_widths[j]
            if line_width > max_width:
                break
            remaining = max_width - line_width
            badness = remaining * remaining
            if j == n - 1:
                badness *= 0.2
            total_cost = badness + costs[j + 1]
            if total_cost < best_cost:
                best_cost = total_cost
                next_break[i] = j + 1
        costs[i] = best_cost

    lines: list[str] = []
    index = 0
    while index < n:
        end = next_break[index]
        lines.append(" ".join(words[index:end]))
        index = end
    return lines


def block_height(line_count: int, font_size: int) -> int:
    return font_size + max(0, line_count - 1) * LINE_HEIGHT


def svg_text_block(x: int, y: float, lines: list[str], css_class: str) -> str:
    safe_lines = [html.escape(line) for line in lines]
    parts = [f'  <text class="{css_class}" x="{x}" y="{y:.1f}" dominant-baseline="hanging">']
    for index, line in enumerate(safe_lines):
        dy = 0 if index == 0 else LINE_HEIGHT
        parts.append(f'    <tspan x="{x}" dy="{dy}">{line}</tspan>')
    parts.append("  </text>")
    return "\n".join(parts)


def generate() -> None:
    wrapped_rows: list[list[list[str]]] = []
    row_heights: list[int] = []

    for row in ROWS:
        wrapped_row: list[list[str]] = []
        max_height = MIN_ROW_HEIGHT
        for col_index, cell in enumerate(row):
            available_width = COLUMN_WIDTHS[col_index] - 2 * CELL_PADDING_X
            lines = wrap_text(cell, available_width)
            wrapped_row.append(lines)
            max_height = max(max_height, block_height(len(lines), FONT_SIZE) + 2 * CELL_PADDING_Y)
        wrapped_rows.append(wrapped_row)
        row_heights.append(max_height)

    table_height = HEADER_HEIGHT + sum(row_heights)
    canvas_height = TABLE_Y * 2 + table_height

    column_x = [TABLE_X]
    for width in COLUMN_WIDTHS[:-1]:
        column_x.append(column_x[-1] + width)

    horizontal_lines = [TABLE_Y + HEADER_HEIGHT]
    current_y = TABLE_Y + HEADER_HEIGHT
    for row_height in row_heights[:-1]:
        current_y += row_height
        horizontal_lines.append(current_y)

    parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{CANVAS_WIDTH}" height="{canvas_height}" viewBox="0 0 {CANVAS_WIDTH} {canvas_height}" role="img" aria-labelledby="title desc">',
        "  <title id=\"title\">Stakeholder top-level needs table</title>",
        "  <desc id=\"desc\">Stakeholders, top-level needs, related epics, and evidence or validation.</desc>",
        "  <style>",
        "    .header { font-family: Arial, Helvetica, sans-serif; font-size: 14px; font-weight: 700; fill: #222222; }",
        "    .cell { font-family: Arial, Helvetica, sans-serif; font-size: 14px; fill: #222222; }",
        "    .grid { stroke: #b8b8b8; stroke-width: 1; shape-rendering: crispEdges; }",
        "  </style>",
        f'  <rect x="0" y="0" width="{CANVAS_WIDTH}" height="{canvas_height}" fill="#ffffff"/>',
        f'  <rect x="{TABLE_X}" y="{TABLE_Y}" width="{TABLE_WIDTH}" height="{table_height}" fill="#ffffff" class="grid"/>',
        f'  <rect x="{TABLE_X}" y="{TABLE_Y}" width="{TABLE_WIDTH}" height="{HEADER_HEIGHT}" fill="#efefef" class="grid"/>',
    ]

    current_x = TABLE_X
    for width in COLUMN_WIDTHS[:-1]:
        current_x += width
        parts.append(f'  <line x1="{current_x}" y1="{TABLE_Y}" x2="{current_x}" y2="{TABLE_Y + table_height}" class="grid"/>')

    for line_y in horizontal_lines:
        parts.append(f'  <line x1="{TABLE_X}" y1="{line_y}" x2="{TABLE_X + TABLE_WIDTH}" y2="{line_y}" class="grid"/>')

    header_y = TABLE_Y + HEADER_HEIGHT / 2 + 1
    for index, header in enumerate(COLUMN_HEADERS):
        parts.append(
            f'  <text class="header" x="{column_x[index] + CELL_PADDING_X}" y="{header_y:.1f}" dominant-baseline="middle">{html.escape(header)}</text>'
        )

    row_top = TABLE_Y + HEADER_HEIGHT
    for row_index, wrapped_row in enumerate(wrapped_rows):
        row_height = row_heights[row_index]
        for col_index, lines in enumerate(wrapped_row):
            text_height = block_height(len(lines), FONT_SIZE)
            text_y = row_top + (row_height - text_height) / 2
            text_x = column_x[col_index] + CELL_PADDING_X
            parts.append(svg_text_block(text_x, text_y, lines, "cell"))
        row_top += row_height

    parts.append("</svg>")
    SVG_PATH.write_text("\n".join(parts) + "\n", encoding="utf-8")

    preview_html = f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Stakeholder Top-Level Needs Preview</title>
    <style>
      html,
      body {{
        margin: 0;
        padding: 0;
        width: {CANVAS_WIDTH}px;
        height: {canvas_height}px;
        overflow: hidden;
        background: #ffffff;
      }}

      img {{
        display: block;
        width: {CANVAS_WIDTH}px;
        height: {canvas_height}px;
      }}
    </style>
  </head>
  <body>
    <img
      src="stakeholder-top-level-needs.svg"
      alt="Stakeholder top-level needs table"
      width="{CANVAS_WIDTH}"
      height="{canvas_height}"
    />
  </body>
</html>
"""
    PREVIEW_PATH.write_text(preview_html, encoding="utf-8")


if __name__ == "__main__":
    generate()
