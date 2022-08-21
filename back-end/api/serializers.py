from unicodedata import category
from wsgiref import validate
from rest_framework import serializers

from .models import Article, Category, Company, Writer


class WriterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Writer
        fields = ['id', 'name', 'role']
        

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['id', 'name']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']


class ArticleSerializer(serializers.ModelSerializer):
    rating = serializers.IntegerField(min_value=0, max_value=5)
    writer = WriterSerializer('writer')
    category = CategorySerializer('category', many=False)
    company = CompanySerializer('company', many=False)
    
    class Meta:
        model = Article
        fields = ['id', 'title', 'slug', 'writer', 'company', 'content','rating','category', 'is_published', 'created_at']
        


class ArticlePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ['id', 'title', 'slug', 'writer', 'company', 'content','rating','category', 'is_published', 'created_at']