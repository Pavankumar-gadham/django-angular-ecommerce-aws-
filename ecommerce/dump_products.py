from django.core.management import call_command
from django.conf import settings
import os

output_file = os.path.join(settings.BASE_DIR, "products.json")

with open(output_file, "w", encoding="utf-8") as f:
    call_command("dumpdata", "shop.Product", indent=2, stdout=f)

print("Products exported to products.json")
