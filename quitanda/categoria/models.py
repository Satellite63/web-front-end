from django.db import models

# Create your models here.
class Categoria(models.Model):
    categoria_name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    descricao = models.TextField(max_length=255, blank=True)
    categoria_imagem = models.ImageField(upload_to='photos/categories/', blank=True)
