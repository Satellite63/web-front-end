from django.contrib import admin
from produto.models import Produto

class ProdutoAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('produto_nome',)}  # Certifique-se de que 'categoria' é o nome do campo
    list_display = ('produto_nome', 'slug')  # O nome do campo no modelo geralmente é em minúsculas

admin.site.register(Produto, ProdutoAdmin)