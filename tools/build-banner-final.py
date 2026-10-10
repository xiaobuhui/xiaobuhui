# -*- coding: utf-8 -*-
"""
顶部横幅生成器（3 个语言变体 → assets/）

用法：
    python tools/build-banner-final.py

依赖：Pillow（pip install Pillow）
路径全部相对本脚本定位，换设备 / 换目录都能跑。
字体缺失时会给出明确的候选清单提示。
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import os

TOOLS = Path(__file__).resolve().parent
ROOT = TOOLS.parent
SRC = TOOLS / "source" / "kimono.jpg"
OUT = ROOT / "assets"
OUT.mkdir(parents=True, exist_ok=True)

# ---------- 字体（按平台依次探测）----------
FONT_CANDIDATES = {
    "serif_bold": [                                  # 名字
        r"C:/Windows/Fonts/georgiab.ttf",
        "/System/Library/Fonts/Supplemental/Georgia Bold.ttf",
        "/usr/share/fonts/truetype/msttcorefonts/georgiab.ttf",
    ],
    "serif": [                                       # 英文文案
        r"C:/Windows/Fonts/georgia.ttf",
        "/System/Library/Fonts/Supplemental/Georgia.ttf",
        "/usr/share/fonts/truetype/msttcorefonts/georgia.ttf",
    ],
    "cjk_serif": [                                   # 中文副标题
        r"C:/Windows/Fonts/simsun.ttc",
        "/System/Library/Fonts/Songti.ttc",
        "/usr/share/fonts/opentype/noto/NotoSerifCJK-Regular.ttc",
        "/usr/share/fonts/truetype/arphic/uming.ttc",
    ],
    "cjk_sans": [                                    # 中文缺字时的回退
        r"C:/Windows/Fonts/msjh.ttc",
        "/System/Library/Fonts/PingFang.ttc",
        "/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc",
    ],
    "mono": [                                        # overline / 关键字
        r"C:/Windows/Fonts/consola.ttf",
        "/System/Library/Fonts/Menlo.ttc",
        "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf",
    ],
}


def find_font(role):
    for p in FONT_CANDIDATES[role]:
        if Path(p).exists():
            return p
    raise SystemExit(
        f"找不到 {role} 字体，请安装下列任一字体后重试：\n  "
        + "\n  ".join(FONT_CANDIDATES[role])
    )


# ---------- 设计参数 ----------
INK = (43, 39, 37)          # #2B2725
ACCENT = (193, 68, 60)      # #C1443C
PAPER = (247, 243, 236)     # #F7F3EC
MUTE = (107, 100, 92)

W, H = 1760, 600            # @2x，显示 880x300

OVERLINE = "GITHUB.COM/XIAOBUHUI"
NAME = "Hi, I'm xiaobuhui"
KEYWORDS = "Java · Spring Cloud · Spring AI · LangChain · Vue 3 · Astro"

f_over = ImageFont.truetype(find_font("mono"), 30)
f_name = ImageFont.truetype(find_font("serif_bold"), 96)
f_sub_zh = ImageFont.truetype(find_font("cjk_serif"), 38)
f_keys = ImageFont.truetype(find_font("mono"), 26)

VARIANTS = [
    ("banner.jpg", "在读学生 · 后端为主的全栈开发 · 主攻 Agent 方向", f_sub_zh),
    ("banner.zh-TW.jpg", "在讀學生 · 後端為主的前後端開發 · 主攻 Agent 方向", f_sub_zh),
    ("banner.en.jpg", "Backend-focused full-stack developer · AI Agents",
     ImageFont.truetype(find_font("serif"), 34)),
]


def glyphs_ok(text, font):
    """逐字检查字体是否含该字形（getbbox 为 None = 缺字）"""
    return [ch for ch in text if ch.strip() and font.getmask(ch).getbbox() is None]


def draw_spaced(d, xy, text, font, fill, spacing):
    x, y = xy
    for ch in text:
        d.text((x, y), ch, font=font, fill=fill)
        x += font.getlength(ch) + spacing


def photo_panel():
    """右侧照片：裁人物区间 + 左缘羽化融入底色"""
    im = Image.open(SRC).convert("RGB")
    crop = im.crop((140, 430, 1540, 1742))
    panel_w = 680
    scale = H / crop.size[1]
    disp = crop.resize((round(crop.size[0] * scale), H), Image.LANCZOS)
    panel = Image.new("RGB", (panel_w, H), PAPER)
    if disp.size[0] >= panel_w:
        disp = disp.crop((disp.size[0] - panel_w, 0, disp.size[0], H))
    panel.paste(disp, (panel_w - disp.size[0], 0))
    mask = Image.new("L", (panel_w, H), 255)
    md = ImageDraw.Draw(mask)
    for i in range(160):
        md.line([(i, 0), (i, H)], fill=round(255 * i / 160))
    out = Image.new("RGB", (panel_w, H), PAPER)
    out.paste(panel, (0, 0), mask)
    return out, panel_w


panel, pw = photo_panel()

for fname, subtitle, f_sub in VARIANTS:
    font_used = f_sub
    if glyphs_ok(subtitle, f_sub):
        fallback = find_font("cjk_sans")
        print(f"[warn] {fname} 主字体缺字，回退 {Path(fallback).name}")
        font_used = ImageFont.truetype(fallback, 36)

    canvas = Image.new("RGB", (W, H), PAPER)
    d = ImageDraw.Draw(canvas)

    x0 = 120
    d.rectangle([x0, 128, x0 + 18, 146], fill=ACCENT)
    draw_spaced(d, (x0 + 36, 120), OVERLINE, f_over, ACCENT, 8)
    d.text((x0 - 6, 162), NAME, font=f_name, fill=INK)
    d.rectangle([x0, 318, x0 + 168, 325], fill=ACCENT)
    d.text((x0, 356), subtitle, font=font_used, fill=INK)
    draw_spaced(d, (x0, 442), KEYWORDS, f_keys, MUTE, 2)

    canvas.paste(panel, (W - pw, 0))
    d = ImageDraw.Draw(canvas)
    d.rectangle([0, H - 6, W, H], fill=ACCENT)

    path = OUT / fname
    canvas.save(path, quality=92, optimize=True)
    print(f"{fname}  {canvas.size}  {os.path.getsize(path)/1024:.1f} KB")
