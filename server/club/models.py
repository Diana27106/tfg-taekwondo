from django.db import models
from django.utils.text import slugify

# 1. INSTRUCTOR (Relación 1:N con Group)
class Instructor(models.Model):
    """
    Representa a un instructor del club.
    
    Attributes:
        name (str): Nombre completo del instructor.
        rank (str): Grado o Dan (ej: 4º DAN).
        bio (str): Biografía corta o descripción del perfil profesional.
        photo (ImageField): Foto de perfil para mostrar en la web pública.
    """
    name = models.CharField(max_length=100, verbose_name="Nombre Completo")
    rank = models.CharField(max_length=50, verbose_name="Grado (Dan)")
    bio = models.TextField(verbose_name="Biografía")
    photo = models.ImageField(upload_to='instructors/', blank=True, verbose_name="Foto Perfil")

    def __str__(self):
        return f"{self.name} ({self.rank})"

# 2. LOCATION (Relación N:M con Group)
class Location(models.Model):
    """
    Representa una sede física donde se imparten las clases.
    
    Attributes:
        name (str): Nombre comercial de la sede.
        address (str): Dirección completa.
        city (str): Ciudad donde se ubica.
        google_maps_url (URLField): Enlace opcional a Google Maps para geolocalización.
        photo (ImageField): Imagen representativa de la sede.
    """
    name = models.CharField(max_length=100, verbose_name="Nombre de la Sede")
    address = models.CharField(max_length=200, verbose_name="Dirección")
    city = models.CharField(max_length=100, verbose_name="Ciudad")
    google_maps_url = models.URLField(blank=True, verbose_name="Link Google Maps")
    photo = models.ImageField(upload_to='locations/', blank=True, verbose_name="Foto Sede")

    def __str__(self):
        return self.name

# 3. GROUP (El núcleo de la lógica)
class Group(models.Model):
    """
    Representa un grupo de entrenamiento (clase).
    Es la entidad central que vincula instructores con sedes y horarios.
    
    Attributes:
        age_range (str): Rango de edad del grupo (ej: Infantiles, Juveniles).
        schedule (str): Descripción del horario (ej: Martes y Jueves 17:00).
        instructor (ForeignKey): El instructor responsable de este grupo.
        locations (ManyToManyField): Las sedes donde este grupo entrena.
    """
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
    """
    Representa un evento próximo (campeonato, seminario, examen).
    
    Attributes:
        title (str): Nombre del evento.
        description (str): Detalles adicionales.
        start_date (DateTimeField): Cuándo empieza.
        end_date (DateTimeField): Cuándo termina.
        registration_link (URLField): Enlace externo para inscripciones.
        location (str): Descripción textual del lugar del evento.
    """
    title = models.CharField(max_length=200, verbose_name="Título del Evento")
    description = models.TextField(blank=True, verbose_name="Descripción")
    start_date = models.DateTimeField(verbose_name="Fecha Inicio")
    end_date = models.DateTimeField(verbose_name="Fecha Fin")
    registration_link = models.URLField(blank=True, verbose_name="Link Inscripción")
    location = models.CharField(max_length=200, verbose_name="Lugar/Localización") # Texto libre o FK a Location

    def __str__(self):
        return self.title

# 7. CHATBOT QUERIES
class ChatQuery(models.Model):
    user_question = models.TextField(verbose_name="Pregunta del Usuario")
    bot_response = models.TextField(verbose_name="Respuesta del Bot")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Fecha y Hora")
    metadata = models.JSONField(null=True, blank=True, verbose_name="Metadatos Extra")

    class Meta:
        verbose_name = "Consulta de Chatbot"
        verbose_name_plural = "Consultas de Chatbot"

    def __str__(self):
        return f"Consulta {self.id} - {self.created_at.strftime('%Y-%m-%d %H:%M')}"

# 8. RAG DOCUMENTS
class ChatDocument(models.Model):
    title = models.CharField(max_length=200, verbose_name="Título del Documento")
    file = models.FileField(upload_to='chat_documents/', verbose_name="Archivo")
    uploaded_at = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de Subida")
    metadata = models.JSONField(null=True, blank=True, verbose_name="Metadatos (Colección, etc.)")

    class Meta:
        verbose_name = "Documento de RAG"
        verbose_name_plural = "Documentos de RAG"

    def __str__(self):
        return self.title

# 5. SPONSORS
class Sponsor(models.Model):
    """
    Empresa patrocinadora o colaboradora del club.
    
    Attributes:
        name (str): Nombre de la empresa.
        logo (ImageField): Imagen del logo.
        website (URLField): Enlace a su sitio web oficial.
        is_active (bool): Controla si aparece o no en la web pública.
    """
    name = models.CharField(max_length=100, verbose_name="Empresa")
    logo = models.ImageField(upload_to='sponsors/', verbose_name="Logo")
    website = models.URLField(blank=True, verbose_name="URL Web")
    is_active = models.BooleanField(default=True, verbose_name="¿Activo?")

    def __str__(self):
        return self.name

# 6. NEWS
class News(models.Model):
    """
    Noticia o entrada del blog.
    
    Attributes:
        title (str): Título de la noticia.
        slug (SlugField): Identificador amigable para URLs.
        published_at (DateTimeField): Fecha de creación.
        img1 (ImageField): Imagen principal.
        img2 (ImageField): Imagen secundaria opcional.
        content (str): Texto completo de la noticia.
    """
    title = models.CharField(max_length=200, verbose_name="Título")
    slug = models.SlugField(unique=True, blank=True)
    published_at = models.DateTimeField(auto_now_add=True, verbose_name="Fecha")
    img1 = models.ImageField(upload_to='news/', verbose_name="Imagen 1")
    img2 = models.ImageField(upload_to='news/', blank=True, null=True, verbose_name="Imagen 2")
    content = models.TextField(verbose_name="Contenido")

    class Meta:
        verbose_name_plural = "Noticias"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title