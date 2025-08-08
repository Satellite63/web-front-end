from django.db import models

class Produto(models.Model):
    produto_nome = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    preco = models.DecimalField(max_digits=5, decimal_places=2)
    descricao = models.TextField(max_length=255, blank=True)
    categoria_imagem = models.ImageField(upload_to='photos/produtos/', blank=True)
    esta_disponivel = models.BooleanField()
