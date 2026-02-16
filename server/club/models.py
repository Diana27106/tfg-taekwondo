from django.db import models

# 1. INSTRUCTOR (Relación 1:N con Group)
class Instructor(models.Model):
    name = models.CharField(max_length=100, verbose_name="Nombre Completo")
    rank = models.CharField(max_length=50, verbose_name="Grado (Dan)")
    bio = models.TextField(verbose_name="Biografía")
    photo = models.ImageField(upload_to='instructors/', blank=True, verbose_name="Foto Perfil")

    def __str__(self):
        return f"{self.name} ({self.rank})"

# 2. LOCATION (Relación N:M con Group)
class Location(models.Model):
    name = models.CharField(max_length=100, verbose_name="Nombre de la Sede")
    address = models.CharField(max_length=200, verbose_name="Dirección")
    city = models.CharField(max_length=100, verbose_name="Ciudad")
    google_maps_url = models.URLField(blank=True, verbose_name="Link Google Maps")
    photo = models.ImageField(upload_to='locations/', blank=True, verbose_name="Foto Sede")

    def __str__(self):
        return self.name

# 3. GROUP (El núcleo de la lógica)
class Group(models.Model):
    age_range = models.CharField(max_length=50, verbose_name="Rango de Edad (ej: 6-12 años)")
    schedule = models.CharField(max_length=100, verbose_name="Horario (ej: L-X 17:00)")
    
    # Relación 1:N -> Un instructor da a muchos grupos
    instructor = models.ForeignKey(Instructor, on_delete=models.CASCADE, related_name='groups', verbose_name="Instructor")
    
    # Relación N:M -> Una sede tiene muchos grupos y un grupo puede estar en muchas sedes
    # Django creará automáticamente la tabla intermedia 'club_group_locations'
    locations = models.ManyToManyField(Location, related_name='groups', verbose_name="Sedes donde se imparte")

    def __str__(self):
        return f"Grupo {self.age_range} - {self.instructor.name}"

# 4. EVENTOS
class Event(models.Model):
    title = models.CharField(max_length=200, verbose_name="Título del Evento")
    description = models.TextField(blank=True, verbose_name="Descripción")
    start_date = models.DateTimeField(verbose_name="Fecha Inicio")
    end_date = models.DateTimeField(verbose_name="Fecha Fin")
    registration_link = models.URLField(blank=True, verbose_name="Link Inscripción")
    location = models.CharField(max_length=200, verbose_name="Lugar/Localización") # Texto libre o FK a Location

    def __str__(self):
        return self.title

# 5. SPONSORS
class Sponsor(models.Model):
    name = models.CharField(max_length=100, verbose_name="Empresa")
    logo = models.ImageField(upload_to='sponsors/', verbose_name="Logo")
    website = models.URLField(blank=True, verbose_name="URL Web")
    is_active = models.BooleanField(default=True, verbose_name="¿Activo?")

    def __str__(self):
        return self.name

# 6. NEWS
class News(models.Model):
    title = models.CharField(max_length=200, verbose_name="Título")
    slug = models.SlugField(unique=True)
    published_at = models.DateTimeField(auto_now_add=True, verbose_name="Fecha")
    img1 = models.ImageField(upload_to='news/', verbose_name="Imagen 1")
    img2 = models.ImageField(upload_to='news/', blank=True, null=True, verbose_name="Imagen 2")
    content = models.TextField(verbose_name="Contenido")

    class Meta:
        verbose_name_plural = "Noticias"

    def __str__(self):
        return self.title