from django.core.management.base import BaseCommand
from app.models import Category, Service, Tag
from decimal import Decimal

class Command(BaseCommand):
    help = "Seeds services data into the database"

    def handle(self, *args, **kwargs):
        categories_data = [
            ("Furniture Assembly", "Assembly of various furniture items"),
            ("Outdoor Furniture Assembly", "Assembly of outdoor furniture like patio sets"),
            ("Home Security Installation", "Installation of home security devices"),
            ("Wall Hanging & Installations", "Installation of various wall fixtures"),
            ("Plumbing", "Plumbing services such as faucet and toilet installation"),
            ("Appliance Installation", "Installation of household appliances"),
            ("Playground Equipment Installation", "Assembly and installation of playground equipment"),
            ("Light Fixture Installation", "Installation of various lighting fixtures"),
            ("Maintenance Services", "General home maintenance services"),
            ("Gazebo/Pergola Installation", "Installation of outdoor gazebos and pergolas"),
            ("TV Mounting", "TV Mounting services")
        ]

        categories = {}
        for category_name, category_desc in categories_data:
            category, created = Category.objects.get_or_create(name=category_name, description=category_desc)
            categories[category_name] = category
            if created:
                self.stdout.write(self.style.SUCCESS(f'Created category: {category_name}'))
            else:
                self.stdout.write(self.style.SUCCESS(f'Category {category_name} already exists'))

        tags_data = ["Quick Service", "Luxury", "Standard", "Installation", "Assembly", "Maintenance"]
        tags = {}
        for tag_name in tags_data:
            tag, created = Tag.objects.get_or_create(name=tag_name)
            tags[tag_name] = tag
            if created:
                self.stdout.write(self.style.SUCCESS(f'Created tag: {tag_name}'))
            else:
                self.stdout.write(self.style.SUCCESS(f'Tag {tag_name} already exists'))

        services_data = [
            ("Bed Assembly", "Furniture Assembly", Decimal("49.99"), 60, ["Assembly"]),
            ("Chair Assembly", "Furniture Assembly", Decimal("39.99"), 45, ["Assembly"]),
            ("Office Furniture Assembly", "Furniture Assembly", Decimal("69.99"), 90, ["Assembly"]),
            ("Murphy Bed Assembly & Installation service", "Furniture Assembly", Decimal("199.99"), 120, ["Assembly", "Installation"]),
            ("Table Assembly", "Furniture Assembly", Decimal("59.99"), 50, ["Assembly"]),
            ("Coffee Table", "Furniture Assembly", Decimal("39.99"), 30, ["Assembly"]),
            ("Couch Assembly", "Furniture Assembly", Decimal("79.99"), 90, ["Assembly"]),
            ("Dinning set Assembly", "Furniture Assembly", Decimal("149.99"), 120, ["Assembly"]),
            ("Bookcase Assembly", "Furniture Assembly", Decimal("59.99"), 60, ["Assembly"]),
            ("TV Stand Assembly", "Furniture Assembly", Decimal("49.99"), 45, ["Assembly"]),
            ("Entertainment Center Assembly Service", "Furniture Assembly", Decimal("199.99"), 180, ["Assembly"]),
            ("Pool Table Assembly", "Furniture Assembly", Decimal("299.99"), 150, ["Assembly"]),
            ("Closet Installation", "Furniture Assembly", Decimal("89.99"), 120, ["Installation"]),
            ("Dresser Assembly", "Furniture Assembly", Decimal("59.99"), 60, ["Assembly"]),
            ("Baby Crib Assembly", "Furniture Assembly", Decimal("69.99"), 60, ["Assembly"]),
            ("Motorized table assembly", "Furniture Assembly", Decimal("129.99"), 90, ["Assembly"]),
            ("Executive Desk", "Furniture Assembly", Decimal("199.99"), 120, ["Assembly"]),
            ("Wine Bar cabinet", "Furniture Assembly", Decimal("149.99"), 90, ["Assembly"]),
            ("Nightstand Assembly", "Furniture Assembly", Decimal("39.99"), 30, ["Assembly"]),
            ("Office Chair assembly", "Furniture Assembly", Decimal("39.99"), 45, ["Assembly"]),
            ("Makeup vanity Desk Assembly", "Furniture Assembly", Decimal("79.99"), 60, ["Assembly"]),
            ("Hamock Bed Assembly", "Furniture Assembly", Decimal("99.99"), 90, ["Assembly"]),
            
            ("Outdoor Furniture Assembly", "Outdoor Furniture Assembly", Decimal("79.99"), 60, ["Assembly"]),
            ("Metal Shed Assembly & Installation", "Outdoor Furniture Assembly", Decimal("199.99"), 180, ["Assembly", "Installation"]),
            ("Commercial Patio Heater Assembly", "Outdoor Furniture Assembly", Decimal("129.99"), 90, ["Assembly"]),
            ("Patio furniture Set Assembly", "Outdoor Furniture Assembly", Decimal("159.99"), 120, ["Assembly"]),
            ("Cantilever Patio Umbrella Assembly", "Outdoor Furniture Assembly", Decimal("89.99"), 60, ["Assembly"]),
            ("Motorized Awning Installation Service", "Outdoor Furniture Assembly", Decimal("299.99"), 180, ["Installation"]),
            ("Ping pong Table Assembly", "Outdoor Furniture Assembly", Decimal("99.99"), 90, ["Assembly"]),
            ("Swing daybed Installation", "Outdoor Furniture Assembly", Decimal("149.99"), 120, ["Installation"]),
            ("Sleeping Hamock Installation", "Outdoor Furniture Assembly", Decimal("79.99"), 60, ["Installation"]),
            ("Grill Assembly Service", "Outdoor Furniture Assembly", Decimal("79.99"), 60, ["Assembly"]),
            
            ("Fitness equipment assembly", "Appliance Installation", Decimal("129.99"), 120, ["Assembly"]),
            ("Home Gym Assembly", "Appliance Installation", Decimal("299.99"), 180, ["Assembly"]),
            ("Treadmill Assembly", "Appliance Installation", Decimal("149.99"), 90, ["Assembly"]),
            ("Exercise Bike assembly", "Appliance Installation", Decimal("79.99"), 60, ["Assembly"]),
            ("Elliptical Assembly", "Appliance Installation", Decimal("129.99"), 120, ["Assembly"]),
            ("Stair Climber Assembly", "Appliance Installation", Decimal("149.99"), 120, ["Assembly"]),
            ("Dumbbell Rack Assembly", "Appliance Installation", Decimal("49.99"), 60, ["Assembly"]),
            ("Weight Bench Assembly", "Appliance Installation", Decimal("79.99"), 90, ["Assembly"]),
            ("Fitness Mirrow Installation", "Appliance Installation", Decimal("99.99"), 60, ["Installation"]),
            ("Wall Mounted rack", "Appliance Installation", Decimal("59.99"), 45, ["Installation"]),
            
        ]

        for service_name, category_name, price, estimated_time, tags_list in services_data:
            category = categories[category_name]
            service = Service.objects.create(
                name=service_name,
                category=category,
                price=price,
                estimated_time=estimated_time,
                description=f"Professional {service_name.lower()} service."
            )
            
            for tag_name in tags_list:
                tag = tags[tag_name]
                service.tags.add(tag)

            self.stdout.write(self.style.SUCCESS(f'Successfully created service: {service_name}'))
