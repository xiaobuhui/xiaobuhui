# tools — 主页素材生成

这个目录是 GitHub 主页（`README.md` 及 9 个语言版本）视觉素材的生成工具。
顶部横幅、底部页尾带都是从 `source/kimono.jpg` 裁切合成的，文案改了重跑脚本即可，不需要手工修图。

## 三个脚本

| 脚本 | 作用 | 产物 |
|---|---|---|
| `build-banner-final.py` | 顶部横幅（880×300 显示，@2x 1760×600） | `assets/banner.jpg` / `banner.zh-TW.jpg` / `banner.en.jpg` |
| `build-footer-final.py` | 底部页尾带（880×140 显示，@2x 1760×280） | `assets/footer.jpg` / `footer.zh-TW.jpg` / `footer.en.jpg` |
| `gen-readmes.mjs` | 生成 10 个语言的 README | `README.md` + 9 个语言文件 |

## 运行

```bash
pip install Pillow                 # 图像脚本依赖，只需装一次

python tools/build-banner-final.py   # 改了横幅文案或版式才需要
python tools/build-footer-final.py   # 改了页尾文案或版式才需要
node   tools/gen-readmes.mjs         # 改正文或语言内容时需要
```

三个脚本都按自身位置定位仓库根目录，克隆到任何路径、任何设备都能直接跑。

字体依赖 Georgia / 宋体（SimSun）/ Consolas，Windows 自带；macOS、Linux 上脚本会按候选列表自动回退到 Songti、PingFang、Noto 等，若一个都找不到会打印需要安装的字体清单。

## 改文案要改哪里

- **横幅文案**（名字、副标题、关键字）→ `build-banner-final.py` 里的 `OVERLINE` / `NAME` / `KEYWORDS` / `VARIANTS`
- **页尾文案** → `build-footer-final.py` 里的 `VARIANTS`
- **README 正文与多语言内容** → `gen-readmes.mjs` 里的 `CONTENT` 对象（10 个语言各一份）

⚠️ 页尾文案写在两处，需要同步：
图内文字在 `build-footer-final.py` 的 `VARIANTS`，图片的 alt 文本在 `gen-readmes.mjs` 的 `CONTENT[lang].footer`。

## 设计参数

- 配色：纸面 `#F7F3EC` / 朱红 `#C1443C` / 近黑 `#2B2725` / 次级字 `#6B645C`
- 字体：名字 Georgia Bold 96、中文副标题 SimSun 38、overline 与关键字 Consolas、页尾 caption Consolas 24
- 横幅照片：`kimono.jpg` 裁 `(140, 430, 1540, 1742)`，左缘 160px 羽化融入底色
- 页尾纹样：`kimono.jpg` 裁 `(760, 1990, 1660, 2410)`，左缘 150px 羽化
- 输出一律 JPG q92（原图全不透明，存 PNG 会大约 4 倍）

## 两个必须知道的约束

1. **GitHub 会剥掉 README 里的 `style` 属性。** 能用来做版面的只有 `<img>`（width / height / align）、`<table>`、`<div align="center">` 和 shields.io 徽章。任何 CSS（背景、圆角、阴影、flex）都无效——所以"设计感"只能烧进图片里。
2. **图片不要和 markdown 标题（`#`）做浮动。** 标题的 `border-bottom` 分割线会横穿图片，看起来像把图切开了。README 的顶部横幅改成整张图之后就绕开了这个问题。
