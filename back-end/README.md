Activate virtual environment.

Install application's dependencies
```console
pip install -r requirements.txt
```

Run the migration
```console
python manage.py migrate
```

Create super user
```console
python manage.py createsuperuser
```

Run the server
```console
python manage.py runserver
```

Create company, writers, categories in django admin portal in [http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin).

> Creating company, writers, categories can be possible in [Browsable API](http://127.0.0.1:8000/api).


## API routes

- **Root API** [http://127.0.0.1:8000/api/](http://127.0.0.1:8000/api/)
- **Writers** [http://127.0.0.1:8000/api/writers](http://127.0.0.1:8000/api/writers)
- **Companies** [http://127.0.0.1:8000/api/companies](http://127.0.0.1:8000/api/companies)
- **Articles** [http://127.0.0.1:8000/api/articles](http://127.0.0.1:8000/api/articles)
- **Categories** [http://127.0.0.1:8000/api/categories](http://127.0.0.1:8000/api/categories)

### Creating articles

  - **[POST]** : [http://127.0.0.1:8000/api/articles](http://127.0.0.1:8000/api/articles)
    ***Request body***
    - company : *int*
    - writer : *int*
    - category : *int*
    - rating : *int*
    - is_published : *int(0,1)|boolean*
    - title : *str*
    - slug : *str*
    - content : *str*
    
    ***Returns***
    - company : *int*
    - writer : *int*
    - category : *int*
    - rating : *int*
    - is_published : *int(0,1)|boolean*
    - title : *str*
    - slug : *str*
    - content : *str*
    - created_at: *str|datetime*
