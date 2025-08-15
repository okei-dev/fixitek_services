import random
from django.core.management.base import BaseCommand
from django.core.files import File
from pathlib import Path
from app.models import Category, Service, Tag

class Command(BaseCommand):
    help = "Seed services with categories, tags, price, time, and optional photos"

    def handle(self, *args, **kwargs):
        data = {
            "Assembly & Installation": [
                "Bed Assembly", "Chair Assembly", "Couch Assembly", "Coffee Table Assembly",
                "Table Assembly", "Dinning Set Assembly", "Office Furniture Assembly",
                "Office Chair Assembly", "Executive Desk Assembly", "Makeup Vanity Desk Assembly",
                "Dresser Assembly", "Nightstand Assembly", "Bookcase Assembly", "TV Stand Assembly",
                "Entertainment Center Assembly", "Baby Crib Assembly", "Murphy Bed Assembly & Installation",
                "Wine Bar Cabinet Assembly", "Motorized Table Assembly", "Closet Installation",
                "Outdoor Furniture Assembly", "Patio Furniture Set Assembly", "Commercial Patio Heater Assembly",
                "Cantilever Patio Umbrella Assembly", "Swing Daybed Installation", "Sleeping Hammock Installation",
                "Hammock Bed Assembly", "Motorized Awning Installation", "Metal Shed Assembly & Installation",
                "Pool Table Assembly", "Ping Pong Table Assembly", "Trampoline Assembly and Installation Service",
                "Basketball Hoop Installation Service", "Swing Set Assembly and Installation Service",
                "Playset Assembly & Installation Service", "Home Gym Assembly", "Treadmill Assembly",
                "Exercise Bike Assembly", "Elliptical Assembly", "Stair Climber Assembly", "Weight Bench Assembly",
                "Dumbbell Rack Assembly", "Wall Mounted Rack", "Refrigerator Installation Service",
                "Dish Washer Installation", "Stackable Washer / Dryer Installation", "Microwave Installation",
                "Window AC Unit Installation", "Stove Installation", "Kitchen Hood Installation Service",
                "Oven Installation Service", "Trash Compactor Installation Service"
            ],
            "Wall & Ceiling Mounting": [
                "Artwork Installation Service", "Curtain and Drapes Installation Service",
                "Blind Installation Service", "Coat Rack Installation Service", "Mirror Hanging Service",
                "Board Installation", "Overhead Garage Rack Assembly & Installation",
                "Wine Rack Installation", "Clock Installation", "Bicycle Rack Installation",
                "Banister Installation", "Shelf Mounting & Installation", "TV Mount Installation",
                "Exhaust Fan Installation", "Closet Shelving", "Cat Playground Run Installation"
            ],
            "Smart Home & Security": [
                "Video Doorbell Camera Installation", "Security Camera Installation",
                "Door Lock Installation", "Thermostat Installation"
            ],
            "Plumbing Services": [
                "Faucet Installation", "Shutoff Valve Replacement", "Shower Cartridge Installation",
                "Toilet Installation", "Garbage Disposal Installation", "Shower Head Installation",
                "Shower Drain Unclog"
            ],
            "Home Maintenance": [
                "Bathroom Caulking", "Painting", "Drywall Repairs", "Deck Staining"
            ],
            "Safety & Babyproofing": [
                "Baby Gate Installation Service (Stair Barrier)"
            ],
        }


        keyword_tags = {
            "bed": "bedroom",
            "baby": "babyproofing",
            "desk": "office",
            "office": "office",
            "gym": "fitness",
            "bike": "fitness",
            "mirror": "decor",
            "tv": "electronics",
            "mount": "mounting",
            "outdoor": "outdoor",
            "patio": "outdoor",
            "shed": "outdoor",
            "swing": "playground",
            "playset": "playground",
            "trampoline": "playground",
            "basketball": "playground",
            "awning": "outdoor",
            "camera": "security",
            "lock": "security",
            "doorbell": "security",
            "thermostat": "smart",
            "shower": "plumbing",
            "toilet": "plumbing",
            "faucet": "plumbing",
            "microwave": "appliance",
            "oven": "appliance",
            "stove": "appliance",
            "refrigerator": "appliance",
            "washer": "appliance",
            "dryer": "appliance",
            "rack": "storage",
            "shelving": "storage",
            "painting": "maintenance",
            "caulking": "maintenance",
            "repair": "maintenance",
            "staining": "maintenance",
        }

        placeholder_path = Path("app/service_photos/placeholder.jpg") 

        def get_tags(name):
            lowered = name.lower()
            return {tag for keyword, tag in keyword_tags.items() if keyword in lowered}

        for category_name, services in data.items():
            category, _ = Category.objects.get_or_create(name=category_name)

            for service_name in services:
                service, created = Service.objects.get_or_create(name=service_name, category=category)

                service.price = round(random.uniform(49.99, 299.99), 2)
                service.estimated_time = random.choice([30, 60, 90, 120])
                service.description = f"This is a sample description for {service_name}."

                if placeholder_path.exists():
                    with open(placeholder_path, 'rb') as image_file:
                        service.photo.save(f"{service_name.replace(' ', '_')}.jpg", File(image_file), save=False)

                service.save()

                for tag_name in get_tags(service_name):
                    tag, _ = Tag.objects.get_or_create(name=tag_name)
                    service.tags.add(tag)

        self.stdout.write(self.style.SUCCESS("✅ Services seeded with categories, tags, and mock data."))
