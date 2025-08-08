from django.contrib.auth.decorators import login_required
from django.shortcuts import render

@login_required
def home(request):
    return render(request, 'home.html')

@login_required
def estoque_view(request):
    return render(request, 'estoque.html')

@login_required
def monitor_view(request):
    return render(request, 'monitor.html')

@login_required
def caixa_view(request):
    return render(request, 'caixa.html')