import { endOfDay, format, startOfDay } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Nav, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import StarRating from "../components/article/StarRating";
import AppContext from "../context/AppContext";
import Article from "../services/article";
import Category from "../services/category";
import _ from "lodash";

function AllMedia() {
    const app = useContext(AppContext);
    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState({
        category: "0",
        search: "",
        date: {
            start: "",
            end: "",
        },
    });

    const fetchArticles = () => {
        const filter = {
            company: app.company.id,
        };
        Article.filter(filter).then((response) => {
            setArticles((state) => response.data);
            setFilteredArticles((state) => response.data);
        });
    };

    const fetchCategories = () => {
        Category.all().then((response) =>
            setCategories((state) => response.data)
        );
    };

    const is_published = (is_published) => {
        if (is_published) {
            return <i className="bi bi-square text-primary"></i>;
        }

        return <i className="bi bi-check-square-fill text-primary"></i>;
    };

    const is_for_edit = (is_published) => {
        if (!is_published) {
            return <i className="bi bi-square text-primary"></i>;
        }

        return <i className="bi bi-check-square-fill text-primary"></i>;
    };

    const sortByColumn = (column) => {
        const sortedData = _.sortBy(filteredArticles, column);
        setFilteredArticles((state) => sortedData);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchArticles();
    }, [app.company]);

    useEffect(() => {
        if (articles.length) {
            let filteredArticles = articles || [];

            if (filters.search !== "") {
                console.log("Search");
                filteredArticles = _.filter(filteredArticles, (article) => {
                    console.log(
                        article.title,
                        filters.search,
                        article.title.includes(filters.search)
                    );
                    return article.title.includes(filters.search);
                });
            }

            if (filters.category !== "0") {
                filteredArticles = _.filter(filteredArticles, (article) => {
                    return article.category.id === parseInt(filters.category);
                });
            }

            if (filters.date.start !== "" && filters.date.end !== "") {
                const startDate = startOfDay(new Date(filters.date.start));
                const endDate = endOfDay(new Date(filters.date.end));
                filteredArticles = _.filter(filteredArticles, (article) => {
                    const articleDate = startOfDay(
                        new Date(article.created_at)
                    );
                    return articleDate >= startDate && endDate >= articleDate;
                });
            }

            setFilteredArticles((state) => filteredArticles);
        }
    }, [filters]);

    return (
        <Card>
            <Card.Body>
                <h2>{app.company.name} - All Media</h2>
                <p className="text-muted">
                    This table shows recently researched articles for{" "}
                    {app.company.name}
                </p>
                <div className="my-3 d-flex">
                    <Button variant="primary" className="text-uppercase">
                        Export
                    </Button>
                    <div className="ms-auto">
                        <div className="row">
                            <div className="col-md-4 flex-grow-1">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search"
                                        onKeyUp={(e) => {
                                            setFilters((state) => ({
                                                ...state,
                                                search: e.target.value,
                                            }));
                                        }}
                                    />
                                    <button
                                        className="btn btn-outline-dark"
                                        disabled
                                    >
                                        <i className="bi bi-search"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="input-group">
                                    <input
                                        type="date"
                                        className="form-control"
                                        placeholder="Filter Date Start"
                                        onChange={(e) => {
                                            setFilters((state) => ({
                                                ...state,
                                                date: {
                                                    ...state.date,
                                                    start: e.target.value,
                                                },
                                            }));
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="input-group">
                                    <input
                                        type="date"
                                        className="form-control"
                                        placeholder="Filter Date End"
                                        onChange={(e) => {
                                            setFilters((state) => ({
                                                ...state,
                                                date: {
                                                    ...state.date,
                                                    end: e.target.value,
                                                },
                                            }));
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Nav
                    variant="pills"
                    defaultActiveKey="0"
                    onSelect={(eventKey) => {
                        setFilters((state) => ({
                            ...state,
                            category: eventKey,
                        }));
                    }}
                >
                    <Nav.Item>
                        <Nav.Link eventKey={0}>All</Nav.Link>
                    </Nav.Item>
                    {categories.map((category) => {
                        return (
                            <Nav.Item key={category.id}>
                                <Nav.Link eventKey={category.id}>
                                    {category.name}
                                </Nav.Link>
                            </Nav.Item>
                        );
                    })}
                </Nav>
                <Table striped hover>
                    <thead>
                        <tr>
                            <th>Actions</th>
                            <th>Media Date</th>
                            <th
                                onClick={(e) => {
                                    sortByColumn("created_at");
                                }}
                            >
                                Created Date & Time
                            </th>
                            <th>For Editing</th>
                            <th>Published</th>
                            <th
                                onClick={(e) => {
                                    sortByColumn((d) => d.category.name);
                                }}
                            >
                                Category
                            </th>
                            <th
                                onClick={(e) => {
                                    sortByColumn("title");
                                }}
                            >
                                Title
                            </th>
                            <th
                                onClick={(e) => {
                                    sortByColumn((d) => d.writer.name);
                                }}
                            >
                                Writer
                            </th>
                            <th
                                onClick={(e) => {
                                    sortByColumn("rating");
                                }}
                            >
                                Rating
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredArticles.map((article) => {
                            return (
                                <tr key={article.id}>
                                    <td>
                                        <i className="bi bi-file-earmark-text-fill text-success fs-5 pe-2"></i>
                                        <i className="bi bi-cloud-fill text-primary fs-5"></i>
                                    </td>
                                    <td>
                                        {format(
                                            new Date(article.created_at),
                                            "LLLL dd, yyyy"
                                        )}
                                    </td>
                                    <td>
                                        {format(
                                            new Date(article.created_at),
                                            "LLLL dd, yyyy hh:mm a"
                                        )}
                                    </td>
                                    <td>
                                        {is_published(article.is_published)}
                                    </td>
                                    <td>{is_for_edit(article.is_published)}</td>
                                    <td>{article.category.name}</td>
                                    <td>
                                        <Link to={`article/${article.slug}`}>
                                            {article.title}
                                        </Link>
                                    </td>
                                    <td>{article.writer.name}</td>
                                    <td>
                                        <StarRating rating={article.rating} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
}

export default AllMedia;
