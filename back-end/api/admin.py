from django.contrib import admin

from .models import Article, Category, Writer, Company


admin.site.register(Writer)
admin.site.register(Article)
admin.site.register(Category)
admin.site.register(Company)
