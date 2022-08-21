import _ from "lodash";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import AppContext from "../../context/AppContext";
import Article from "../../services/article";
import Category from "../../services/category";

function CreateArticle() {
    const app = useContext(AppContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        content: "",
        is_published: 0,
        rating: 0,
        category: "",
    });
    const [categories, setCategories] = useState([]);
    const [errorMessage, setErrorMessage] = useState({});

    const fetchCategories = () => {
        Category.all().then((response) =>
            setCategories((state) => response.data)
        );
    };

    const handleUpdate = (e, field) => {
        const data = {};
        data[field] = e.target.value;
        if (field === "title")
            data["slug"] = _.kebabCase(_.lowerCase(e.target.value));
        setFormData((state) => ({ ...state, ...data }));
    };

    const submitArticle = () => {
        const data = {
            company: app.company.id,
            writer: app.writer.id,
            ...formData,
        };

        Article.save(data)
            .then((response) => {
                navigate(`/article/${response.data.slug}`);
            })
            .catch((err) => {
                setErrorMessage(err.response.data);
            });
    };

    const displayErrorFieldMessage = (field) => {
        if (errorMessage[field]) {
            return <div className="text-danger">{errorMessage[field]}</div>;
        }
        return;
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <Card>
            <Card.Body>
                <h2>Create Article</h2>
                <div className="mb-3">
                    <label htmlFor="" className="form-label">
                        Title
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Title"
                        onChange={(e) => {
                            handleUpdate(e, "title");
                        }}
                    />
                    {displayErrorFieldMessage("title")}
                </div>
                <div className="mb-3">
                    <label htmlFor="" className="form-label">
                        Slug
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={formData.slug}
                        placeholder="Slug"
                        onChange={(e) => {
                            handleUpdate(e, "slug");
                        }}
                    />
                    {displayErrorFieldMessage("slug")}
                </div>
                <div className="mb-3">
                    <label htmlFor="" className="form-label">
                        Category
                    </label>
                    <select
                        className="form-select"
                        onChange={(e) => handleUpdate(e, "category")}
                    >
                        {categories.map((category) => {
                            return (
                                <option value={category.id} key={category.id}>
                                    {category.name}
                                </option>
                            );
                        })}
                    </select>
                    {displayErrorFieldMessage("category")}
                </div>
                <div className="mb-3">
                    <label htmlFor="" className="form-label">
                        Content
                    </label>
                    <textarea
                        className="form-control"
                        rows={3}
                        placeholder="Content"
                        onChange={(e) => {
                            handleUpdate(e, "content");
                        }}
                    ></textarea>
                    {displayErrorFieldMessage("content")}
                </div>
                <div className="mb-3">
                    <label htmlFor="" className="form-label">
                        Rating
                    </label>
                    <input
                        type="number"
                        min="0"
                        max="5"
                        className="form-control"
                        onChange={(e) => {
                            handleUpdate(e, "rating");
                        }}
                    />
                    {displayErrorFieldMessage("rating")}
                </div>
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        id="is_published"
                        min="0"
                        max="5"
                        value="1"
                        className="form-check-input"
                        onChange={(e) => {
                            handleUpdate(e, "is_published");
                        }}
                    />
                    <label htmlFor="is_published" className="form-check-label">
                        Is Published
                    </label>
                </div>
                <div className="mb-3">
                    <button
                        className="btn btn-primary"
                        onClick={(e) => {
                            submitArticle();
                        }}
                    >
                        <i className="bi bi-plus"></i> Add Article
                    </button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default CreateArticle;
