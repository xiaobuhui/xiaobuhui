# -*- coding: utf-8 -*-
"""
页尾带生成器 · 纹样版（3 个语言变体 → assets/）

用法：
    python tools/build-footer-final.py

依赖：Pillow（pip install Pillow）
路径全部相对本脚本定位，换设备 / 换目录都能跑。
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import os

TOOLS = Path(__file__).resolve().parent
ROOT = TOOLS.parent
SRC = TOOLS / "source" / "kimono.jpg"
OUT = ROOT / "assets"
OUT.mkdir(parents=True, exist_ok=True)

FONT_CANDIDATES = {
    "serif": [
        r"C:/Windows/Fonts/georgia.ttf",
        "/System/Library/Fonts/Supplemental/Georgia.ttf",
        "/usr/share/fonts/truetype/msttcorefonts/georgia.ttf",
    ],
    "cjk_serif": [
        r"C:/Windows/Fonts/simsun.ttc",
        "/System/Library/Fonts/Songti.ttc",
        "/usr/share/fonts/opentype/noto/NotoSerifCJK-Regular.ttc",
        "/usr/share/fonts/truetype/arphic/uming.ttc",
    ],
    "cjk_sans": [
        r"C:/Windows/Fonts/msjh.ttc",
        "/System/Library/Fonts/PingFang.ttc",
        "/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc",
    ],
    "mono": [
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


INK = (43, 39, 37)
ACCENT = (193, 68, 60)
PAPER = (247, 243, 236)
MUTE = (107, 100, 92)

W, H = 1760, 280            # @2x，显示 880x140
CAPTION = "T H A N K S   F O R   V I S I T I N G"
TEX_W = 620                 # 右侧纹样带宽度
MAX_TEXT_W = W - TEX_W - 120 - 60

VARIANTS = [
    ("footer.jpg", "欢迎交流 Java 后端、微服务与 Agent 开发", "cjk_serif", 36),
    ("footer.zh-TW.jpg", "歡迎交流 Java 後端、微服務與 Agent 開發", "cjk_serif", 36),
    ("footer.en.jpg", "Open to conversations on Java backend, microservices, and agents.", "serif", 34),
]

f_cap = ImageFont.truetype(find_font("mono"), 24)


def texture_panel():
    """右侧纹样带：和服红花料 + 左缘羽化"""
    im = Image.open(SRC).convert("RGB")
    crop = im.crop((760, 1990, 1660, 2410))
    scale = H / crop.size[1]
    disp = crop.resize((round(crop.size[0] * scale), H), Image.LANCZOS)
    if disp.size[0] > TEX_W:
        disp = disp.crop((disp.size[0] - TEX_W, 0, disp.size[0], H))
    panel = Image.new("RGB", (TEX_W, H), PAPER)
    panel.paste(disp, (TEX_W - disp.size[0], 0))
    mask = Image.new("L", (TEX_W, H), 255)
    md = ImageDraw.Draw(mask)
    for i in range(150):
        md.line([(i, 0), (i, H)], fill=round(255 * i / 150))
    out = Image.new("RGB", (TEX_W, H), PAPER)
    out.paste(panel, (0, 0), mask)
    return out


def fit_font(role, text, size, max_w):
    """超宽就逐级缩字号"""
    f = ImageFont.truetype(find_font(role), size)
    while size > 20 and f.getlength(text) > max_w:
        size -= 2
        f = ImageFont.truetype(find_font(role), size)
    return f, size


tex = texture_panel()

for fname, closing, role, size in VARIANTS:
    f_close = ImageFont.truetype(find_font(role), size)
    if [ch for ch in closing if ch.strip() and f_close.getmask(ch).getbbox() is None]:
        print(f"[warn] {fname} 主字体缺字，回退 {Path(find_font('cjk_sans')).name}")
        role, size = "cjk_sans", 34
    f_close, used = fit_font(role, closing, size, MAX_TEXT_W)
    if used != size:
        print(f"[info] {fname} 字号 {size} -> {used}")

    canvas = Image.new("RGB", (W, H), PAPER)
    d = ImageDraw.Draw(canvas)
    d.rectangle([0, 0, W, 6], fill=ACCENT)          # 顶部朱红基线

    x0 = 120
    d.rectangle([x0, 92, x0 + 16, 108], fill=ACCENT)
    d.text((x0 + 32, 82), closing, font=f_close, fill=INK)
    d.text((x0, 176), CAPTION, font=f_cap, fill=MUTE)

    canvas.paste(tex, (W - TEX_W, 0))

    path = OUT / fname
    canvas.save(path, quality=92, optimize=True)
    print(f"{fname}  {canvas.size}  {os.path.getsize(path)/1024:.1f} KB")
