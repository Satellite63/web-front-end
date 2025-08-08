from django.http import HttpResponse
from django.shortcuts import render

def visualizarHome(request):
    return HttpResponse('Home Page')