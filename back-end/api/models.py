from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.utils.text import slugify


class Writer(models.Model):
    name = models.CharField("Name", max_length=100)
    role = models.CharField("Role", max_length=100)
    articles = models.ManyToManyField(to="api.Article", related_name="articles")

    
    def __str__(self):
        return self.name

class Company(models.Model):
    name = models.CharField("Name", max_length=100)
    
    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField("Name", max_length=100, unique=True)
    slug = models.SlugField("Slug", unique=True)
    
    def __str__(self):
        return self.name
    

class Article(models.Model):
    writer = models.ForeignKey(Writer, related_name="articles_written", on_delete=models.CASCADE)
    company = models.ForeignKey(Company, related_name="articles", on_delete=models.CASCADE)
    title = models.CharField("Title", max_length=250)
    slug = models.SlugField("Slug", unique=True)
    content = models.TextField("Content")
    rating = models.IntegerField("Rating", validators=[
        MinValueValidator(0),
        MaxValueValidator(5)
    ])
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name="articles")
    is_published = models.BooleanField("Is published", default=False)
    created_at = models.DateTimeField("Created at", auto_now=True)

    def __str__(self):
        return self.title

class MediaFile(models.Model):
    title = models.CharField("Title", max_length=200)
    media = models.FileField("Media", upload_to="files")
    

