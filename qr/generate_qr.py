# Generovanie QR kódov pre všetky zastavenia
# Použitie:  python3 generate_qr.py
#
# 1) Raz nainštaluj knižnicu:  pip install "qrcode[pil]"
# 2) Nastav BASE na svoju KONEČNÚ adresu webu (s lomkou na konci).
#    Adresu už NEMEŇ, kým máš vytlačené tabule.

import qrcode
from qrcode.constants import ERROR_CORRECT_H
from qrcode.image.svg import SvgPathImage

BASE = "https://SEM-DAJ-SVOJU-ADRESU/"   # napr. https://dobravoda.sk/
POCET_ZASTAVENI = 8

for n in range(1, POCET_ZASTAVENI + 1):
    url = f"{BASE}{n}/"
    qr = qrcode.QRCode(error_correction=ERROR_CORRECT_H, box_size=20, border=4)
    qr.add_data(url)
    qr.make(fit=True)
    qr.make_image(fill_color="black", back_color="white").save(f"qr-{n}.png")
    qr.make_image(image_factory=SvgPathImage).save(f"qr-{n}.svg")
    print(f"zastavenie {n}: {url}")
