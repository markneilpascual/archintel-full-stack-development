# Generated by Django 4.1 on 2022-08-20 08:44

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Article",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=250, verbose_name="Title")),
                ("slug", models.SlugField(unique=True, verbose_name="Slug")),
                ("content", models.TextField(verbose_name="Content")),
                (
                    "rating",
                    models.IntegerField(
                        validators=[
                            django.core.validators.MinValueValidator(0),
                            django.core.validators.MaxValueValidator(5),
                        ],
                        verbose_name="Rating",
                    ),
                ),
                (
                    "is_published",
                    models.BooleanField(default=False, verbose_name="Is published"),
                ),
                (
                    "created_at",
                    models.DateTimeField(auto_now=True, verbose_name="Created at"),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Category",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "name",
                    models.CharField(max_length=100, unique=True, verbose_name="Name"),
                ),
                ("slug", models.SlugField(unique=True, verbose_name="Slug")),
            ],
        ),
        migrations.CreateModel(
            name="Company",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100, verbose_name="Name")),
            ],
        ),
        migrations.CreateModel(
            name="MediaFile",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=200, verbose_name="Title")),
                ("media", models.FileField(upload_to="files", verbose_name="Media")),
            ],
        ),
        migrations.CreateModel(
            name="Writer",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100, verbose_name="Name")),
                ("role", models.CharField(max_length=100, verbose_name="Role")),
                (
                    "articles",
                    models.ManyToManyField(related_name="articles", to="api.article"),
                ),
            ],
        ),
        migrations.AddField(
            model_name="article",
            name="category",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="articles",
                to="api.category",
            ),
        ),
        migrations.AddField(
            model_name="article",
            name="company",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="articles",
                to="api.company",
            ),
        ),
        migrations.AddField(
            model_name="article",
            name="writer",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="articles_written",
                to="api.writer",
            ),
        ),
    ]
