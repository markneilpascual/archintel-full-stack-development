import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import AppContext from "../context/AppContext";
import Category from "../services/category";

function AccountSettings() {
    const app = useContext(AppContext);
    const [categories, setCategories] = useState([]);

    const fetchCategories = () => {
        Category.all().then((response) =>
            setCategories((state) => response.data)
        );
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <Card>
            <Card.Body>
                <div className="mb-5">
                    <h3>{app.company.name} - Account Settings</h3>
                    <p className="text-muted">
                        Manage account settings for {app.company.name}
                    </p>
                </div>
                <Row>
                    <Col md="6">
                        <Card>
                            <Card.Body>
                                <h3>General</h3>
                                <div className="mt-5">
                                    <div className="mb-3 form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                        />
                                        <label
                                            htmlFor=""
                                            className="form-check-label text-muted"
                                        >
                                            Require image Caption
                                        </label>
                                        <p className="text-muted">
                                            This will require image caption line
                                            1 upon submit for editing and
                                            publish, Unchecking will disable all
                                            image caption field.
                                        </p>
                                    </div>
                                    <div className="mb-3 form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                        />
                                        <label
                                            htmlFor=""
                                            className="form-check-label text-muted"
                                        >
                                            Require Meta Description
                                        </label>
                                        <p className="text-muted">
                                            This will require description upon
                                            submit for editing and publish,
                                            Unchecking will disable all image
                                            caption field.
                                        </p>
                                    </div>
                                    <div className="mb-3 form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                        />
                                        <label
                                            htmlFor=""
                                            className="form-check-label text-muted"
                                        >
                                            Show Video Text field
                                        </label>
                                        <p className="text-muted">
                                            This will require description upon
                                            submit for editing and publish,
                                            Unchecking will disable all image
                                            caption field.
                                        </p>
                                    </div>
                                    <div className="mb-3 form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                        />
                                        <label
                                            htmlFor=""
                                            className="form-check-label text-muted"
                                        >
                                            Show Video Text field
                                        </label>
                                        <p className="text-muted">
                                            This will show video text field in
                                            the writer/editor panels.
                                        </p>
                                    </div>
                                    <div className="mb-3 form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                        />
                                        <label
                                            htmlFor=""
                                            className="form-check-label text-muted"
                                        >
                                            Enable Video Process
                                        </label>
                                        <p className="text-muted">
                                            This will show video text field in
                                            the writer/editor panels.
                                        </p>
                                    </div>
                                    <div className="mt-3">
                                        <Row>
                                            <Col md="6">
                                                <div className="fs-5 mb-3">
                                                    Summary word count
                                                </div>
                                                <div class="form-floating ">
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        id="minimum"
                                                    />
                                                    <label for="minimum">
                                                        Minimum
                                                    </label>
                                                </div>
                                                <p className="text-muted">
                                                    Below the value will appear
                                                    the count display in red
                                                    text otherwise it will
                                                    appear orange.
                                                </p>
                                                <div class="form-floating ">
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        id="standard"
                                                    />
                                                    <label for="standard">
                                                        Standard
                                                    </label>
                                                </div>
                                                <p className="text-muted">
                                                    Equal or greater than this
                                                    value will appear the count
                                                    display in green text.
                                                </p>
                                                <div class="form-floating ">
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        id="maximum"
                                                    />
                                                    <label for="maximum">
                                                        Maximum
                                                    </label>
                                                </div>
                                                <p className="text-muted fw-6">
                                                    Greater than this value will
                                                    appear the count dispay in
                                                    red text.
                                                </p>
                                            </Col>
                                            <Col md="6">
                                                <div className="fs-5 mb-3">
                                                    Content word count
                                                </div>
                                                <div class="form-floating ">
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        id="minimum"
                                                    />
                                                    <label for="minimum">
                                                        Minimum
                                                    </label>
                                                </div>
                                                <p className="text-muted">
                                                    Below the value will appear
                                                    the count display in red
                                                    text otherwise it will
                                                    appear orange.
                                                </p>
                                                <div class="form-floating ">
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        id="standard"
                                                    />
                                                    <label for="standard">
                                                        Standard
                                                    </label>
                                                </div>
                                                <p className="text-muted">
                                                    Equal or greater than this
                                                    value will appear the count
                                                    display in green text.
                                                </p>
                                                <div class="form-floating ">
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        id="maximum"
                                                    />
                                                    <label for="maximum">
                                                        Maximum
                                                    </label>
                                                </div>
                                                <p className="text-muted fw-6">
                                                    Greater than this value will
                                                    appear the count dispay in
                                                    red text.
                                                </p>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                                <Button variant="success" className="w-100">
                                    Save
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md="6">
                        <Card>
                            <Card.Body>
                                <h3>General</h3>
                                <p className="text-muted">
                                    These setting are category validations on
                                    submitting an article for edit or publish.
                                </p>
                                <div className="mt-5">
                                    <Table size="sm">
                                        <thead>
                                            <tr>
                                                <th
                                                    style={{
                                                        fontSize: "0.75rem",
                                                    }}
                                                >
                                                    Name
                                                </th>
                                                <th
                                                    style={{
                                                        fontSize: "0.75rem",
                                                    }}
                                                >
                                                    Require Summary
                                                </th>
                                                <th
                                                    style={{
                                                        fontSize: "0.75rem",
                                                    }}
                                                >
                                                    Require Content
                                                </th>
                                                <th
                                                    style={{
                                                        fontSize: "0.75rem",
                                                    }}
                                                >
                                                    Require Link in Summary
                                                    <a href="#">
                                                        <i className="bi bi-question-circle-fill"></i>
                                                    </a>
                                                </th>
                                                <th
                                                    style={{
                                                        fontSize: "0.75rem",
                                                    }}
                                                >
                                                    Require Link in Content
                                                    <a href="#">
                                                        <i className="bi bi-question-circle-fill"></i>
                                                    </a>
                                                </th>
                                                <th
                                                    style={{
                                                        fontSize: "0.75rem",
                                                    }}
                                                >
                                                    Prevent Links in Summary
                                                    <a href="#">
                                                        <i className="bi bi-question-circle-fill"></i>
                                                    </a>
                                                </th>
                                                <th
                                                    style={{
                                                        fontSize: "0.75rem",
                                                    }}
                                                >
                                                    Prevent Links in Content
                                                    <a href="#">
                                                        <i className="bi bi-question-circle-fill"></i>
                                                    </a>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {categories.map((category) => {
                                                return (
                                                    <tr key={category.id}>
                                                        <td>{category.name}</td>
                                                        <td className="text-center">
                                                            <input
                                                                type="checkbox"
                                                                className="form-check-input"
                                                            />
                                                        </td>
                                                        <td className="text-center">
                                                            <input
                                                                type="checkbox"
                                                                className="form-check-input"
                                                            />
                                                        </td>
                                                        <td className="text-center">
                                                            <input
                                                                type="checkbox"
                                                                className="form-check-input"
                                                            />
                                                        </td>
                                                        <td className="text-center">
                                                            <input
                                                                type="checkbox"
                                                                className="form-check-input"
                                                            />
                                                        </td>
                                                        <td className="text-center">
                                                            <input
                                                                type="checkbox"
                                                                className="form-check-input"
                                                            />
                                                        </td>
                                                        <td className="text-center">
                                                            <input
                                                                type="checkbox"
                                                                className="form-check-input"
                                                            />
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </Table>
                                </div>
                                <div className="mt-5">
                                <Button variant="success" className="w-100">
                                    Save
                                </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default AccountSettings;
