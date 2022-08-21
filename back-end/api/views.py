from rest_framework import viewsets

from .serializers import ArticleSerializer, ArticlePostSerializer, CategorySerializer, CompanySerializer, WriterSerializer

from .models import Article, Category, Company, Writer


class WriterViewSet(viewsets.ModelViewSet):
    queryset = Writer.objects.all()
    serializer_class = WriterSerializer

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    filterset_fields = ['company']
    lookup_field = "slug"
    
    def get_serializer_class(self):
        if self.action == 'create':
            return ArticlePostSerializer
        return self.serializer_class
    