#mercerias
from django.shortcuts import render
from categoria.models import Categoria

def home(request):
    categoria = Categoria.objects.all()

    context = {
        'categoria': categoria
    }

    return render(request, 'home.html', context)

def store(request):
    categoria = Categoria.objects.all()

    context = {
        'categoria': categoria
    }

    return render(request, 'store.html', context)
