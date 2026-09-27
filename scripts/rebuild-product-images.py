from pathlib import Path
import subprocess
import cv2
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
PRODUCT_DIR = ROOT / "public" / "img" / "products"
MODEL = ROOT / ".cache" / "FSRCNN_x4.pb"
SOURCE_COMMIT = "41a2de63dfe869e48b8cc74c38d48a6014e425a4"

FILES = [
    "trapo-industrial-cosido-color.png",
    "trapo-industrial-cosido-blanco.png",
    "trapo-industrial-suelto-color.png",
    "trapo-industrial-suelto-blanco.png",
    "merma-jean.png",
    "trapo-industrial-cosido-manual-color.png",
    "waipe-color.png",
    "waipe-blanco.png",
]

ADJUSTMENTS = {
    "waipe-color.png": {"brightness": 1.12, "contrast": 1.07, "color": 1.18},
    "waipe-blanco.png": {"brightness": 1.10, "contrast": 1.09, "color": 0.96},
    "trapo-industrial-cosido-blanco.png": {"brightness": 1.05, "contrast": 1.05, "color": 0.98},
    "trapo-industrial-suelto-blanco.png": {"brightness": 1.05, "contrast": 1.05, "color": 0.98},
}

def restore_original(path: Path):
    rel = path.relative_to(ROOT).as_posix()
    data = subprocess.check_output(["git", "show", f"{SOURCE_COMMIT}:{rel}"])
    path.write_bytes(data)

def neural_upscale(image: Image.Image, sr):
    image = image.convert("RGBA")
    bbox = image.getbbox()
    if bbox:
        image = image.crop(bbox)

    max_side = max(image.size)
    if max_side > 400:
        ratio = 400 / max_side
        image = image.resize(
            (max(1, round(image.width * ratio)), max(1, round(image.height * ratio))),
            Image.Resampling.LANCZOS,
        )

    rgba = np.array(image)
    alpha = rgba[:, :, 3]
    rgb = rgba[:, :, :3]

    neutral = np.full_like(rgb, 247)
    a = (alpha.astype(np.float32) / 255.0)[..., None]
    rgb_for_sr = (rgb * a + neutral * (1.0 - a)).astype(np.uint8)

    up = sr.upsample(cv2.cvtColor(rgb_for_sr, cv2.COLOR_RGB2BGR))
    up = cv2.cvtColor(up, cv2.COLOR_BGR2RGB)
    up_alpha = cv2.resize(alpha, (up.shape[1], up.shape[0]), interpolation=cv2.INTER_CUBIC)

    return Image.fromarray(np.dstack([up, up_alpha]).astype(np.uint8), "RGBA")

def tune(image: Image.Image, filename: str):
    values = ADJUSTMENTS.get(
        filename,
        {"brightness": 1.03, "contrast": 1.05, "color": 1.04},
    )
    alpha = image.getchannel("A")
    rgb = image.convert("RGB")
    rgb = ImageEnhance.Brightness(rgb).enhance(values["brightness"])
    rgb = ImageEnhance.Contrast(rgb).enhance(values["contrast"])
    rgb = ImageEnhance.Color(rgb).enhance(values["color"])
    rgb = rgb.filter(ImageFilter.UnsharpMask(radius=1.5, percent=115, threshold=3))
    rgb.putalpha(alpha)
    return rgb

def studio_canvas(product: Image.Image):
    target = (1600, 1200)
    product.thumbnail((1280, 900), Image.Resampling.LANCZOS)

    canvas = Image.new("RGBA", target, (247, 250, 248, 255))
    alpha = product.getchannel("A")
    shadow_alpha = alpha.filter(ImageFilter.GaussianBlur(22)).point(lambda p: int(p * 0.18))
    shadow = Image.new("RGBA", product.size, (7, 63, 40, 0))
    shadow.putalpha(shadow_alpha)

    x = (target[0] - product.width) // 2
    y = (target[1] - product.height) // 2 - 10
    canvas.alpha_composite(shadow, (x + 10, y + 26))
    canvas.alpha_composite(product, (x, y))
    return canvas.convert("RGB")

def main():
    PRODUCT_DIR.mkdir(parents=True, exist_ok=True)
    sr = cv2.dnn_superres.DnnSuperResImpl_create()
    sr.readModel(str(MODEL))
    sr.setModel("fsrcnn", 4)

    for filename in FILES:
        source = PRODUCT_DIR / filename
        restore_original(source)
        original = Image.open(source)
        reconstructed = neural_upscale(original, sr)
        reconstructed = tune(reconstructed, filename)
        final = studio_canvas(reconstructed)

        output = source.with_suffix(".webp")
        final.save(output, "WEBP", quality=92, method=6)
        source.unlink()
        print(f"Recreated {output.relative_to(ROOT)} -> {final.size}")

if __name__ == "__main__":
    main()
