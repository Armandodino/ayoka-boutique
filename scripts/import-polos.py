"""Import the 30 supplied polo packshots without changing their originals.
Run from the project: python scripts/import-polos.py [source-directory].
"""
from pathlib import Path
from PIL import Image, ImageOps
import hashlib, json, sys

root = Path(__file__).resolve().parents[1]
source = Path(sys.argv[1]) if len(sys.argv) > 1 else Path.home() / 'Downloads/AYOKA_Collection_Polos_10_Series_30_Images/AYOKA_Collection_Polos_10_Series'
assets = root / 'public/assets'
def read_array(path):
    return json.loads(path.read_text(encoding='utf8').split('= ', 1)[1].rstrip(';\n'))
gallery = read_array(root / 'lib/gallery.ts')
products = read_array(root / 'lib/seed.ts')
images = json.loads((root / 'lib/images.json').read_text(encoding='utf8'))
families = [
    ('Polo Original', 'Un polo uni à manches courtes, avec le logo Ayoka sur la poitrine et l’emblème au dos.', ['Blanc', 'Marine', 'Vert forêt']),
    ('Polo Essential', 'Un polo uni à manches courtes, avec des liserés contrastés au col et aux manches.', ['Bordeaux', 'Cobalt', 'Chocolat']),
    ('Polo Rugby', 'Des rayures larges et contrastées, le logo Ayoka à l’avant et l’emblème au dos.', ['Marine / ivoire', 'Forêt / crème', 'Bordeaux / sable']),
    ('Polo Bicolore', 'Un polo à manches courtes avec des empiècements contrastés sur les épaules.', ['Ivoire / vert', 'Marine / gris', 'Sable / rouille']),
    ('Polo Torsadé', 'Un polo à manches courtes au motif torsadé, signé Ayoka à l’avant et au dos.', ['Écru', 'Lavande', 'Pétrole']),
    ('Polo Contrast', 'Un polo à manches courtes avec une patte de boutonnage contrastée.', ['Anthracite / orange', 'Vert / ivoire', 'Blanc / marine']),
    ('Polo Zippé', 'Un polo à col zippé, avec des détails contrastés sur les épaules et les manches.', ['Bleu glacier', 'Noir / orange', 'Sauge']),
    ('Polo Manches longues', 'Un polo à manches longues, avec le logo Ayoka sur la poitrine et l’emblème au dos.', ['Camel', 'Bleu nuit', 'Prune']),
    ('Polo Rayé', 'Des rayures fines horizontales et la signature Ayoka sur les deux faces.', ['Marine rayé', 'Vert rayé', 'Corail rayé']),
    ('Polo Héritage', 'Un polo à manches courtes, aux liserés orange, blanc et vert au col et aux manches.', ['Noir', 'Ivoire', 'Marine']),
]
files = sorted(source.glob('P??_?_*.png'))
assert len(files) == 30, f'30 images attendues, {len(files)} trouvées'
manifest = []
for series, (name, description, colors) in enumerate(families, 1):
    pid = f'P{series:02}'
    variants = []
    for index, color in enumerate(colors, 1):
        matches = [p for p in files if p.name.startswith(f'{pid}_{index}_')]
        assert len(matches) == 1, f'Image manquante ou dupliquée : {pid}_{index}'
        path = matches[0]
        digest = hashlib.sha256(path.read_bytes()).hexdigest()
        with Image.open(path) as original:
            im = ImageOps.exif_transpose(original).convert('RGB')
        responsive = []
        for width in [120, 320, 640, 960, 1536]:
            width = min(width, im.width)
            url = f'/assets/ayoka-{digest[:12]}-{width}.webp'
            target = root / 'public' / url.lstrip('/')
            if not target.exists():
                im.resize((width, round(im.height * width / im.width)), Image.Resampling.LANCZOS).save(target, 'WEBP', quality=85, method=6)
            responsive.append((width, url))
        canonical = responsive[-1][1]
        images['images'][canonical] = {'src': canonical, 'srcSet': ', '.join(f'{url} {width}w' for width, url in responsive), 'width': im.width, 'height': im.height}
        variants.append({'color': color, 'image': canonical})
        source_name = 'polos/' + path.name
        if not any(item['source'] == source_name for item in gallery):
            gallery.append({'image': canonical, 'title': f'{name} — {color}', 'group': 'polos', 'source': source_name, 'id': max(item['id'] for item in gallery) + 1})
        manifest.append({'file': path.name, 'sha256': digest, 'product': pid, 'color': color, 'image': canonical, 'originalBytes': path.stat().st_size, 'responsiveBytes': sum((root / 'public' / url.lstrip('/')).stat().st_size for _, url in responsive)})
    if not any(p['id'] == pid for p in products):
        products.append({'id': pid, 'name': name, 'category': 'Polos', 'collection': 'Polos', 'description': description + ' Les visuels montrent la face et le dos du modèle.', 'price': None, 'stock': 0, 'sizes': ['S', 'M', 'L', 'XL', 'XXL'], 'variants': variants, 'active': True, 'featured': False, 'position': max(p['position'] for p in products) + 1})
assert len(gallery) == 98 and len(products) == 34
(root / 'lib/gallery.ts').write_text('export const gallery = ' + json.dumps(gallery, ensure_ascii=False) + ';\n', encoding='utf8')
(root / 'lib/seed.ts').write_text('import type { Product } from "./types";\nexport const seedProducts:Product[] = ' + json.dumps(products, ensure_ascii=False) + ';\n', encoding='utf8')
(root / 'lib/images.json').write_text(json.dumps(images, ensure_ascii=False, separators=(',', ':')), encoding='utf8')
(root / 'lib/polos-manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf8')
before = sum(item['originalBytes'] for item in manifest)
after = sum(item['responsiveBytes'] for item in manifest)
print(json.dumps({'images': len(manifest), 'models': 10, 'originalBytes': before, 'allResponsiveBytes': after, 'reductionPercent': round(100 * (1 - after / before), 1), 'products': len(products), 'gallery': len(gallery)}))
