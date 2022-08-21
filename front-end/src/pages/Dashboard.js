import { format } from "date-fns";
import _ from "lodash";
import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Row, Tab, Table, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";
import ArticlePreviewList from "../components/article/ArticlePreviewList";
import ArticlesAdvance from "../components/article/ArticlesAdvance";
import ArticlesLastSevenDays from "../components/article/ArticlesLastSevenDays";
import ArticlesSentBack from "../components/article/ArticlesSentBack";
import ArticlesToday from "../components/article/ArticlesToday";
import AppContext from "../context/AppContext";
import Article from "../services/article";

function Dashboard() {
    const app = useContext(AppContext);
    const [articles, setArticles] = useState([]);
    const [groupedArticles, setGroupedArticles] = useState({});

    const fetchArticles = () => {
        const filter = {
            company: app.company.id,
        };
        Article.filter(filter).then((response) => {
            setArticles((state) => response.data);
            setGroupedArticles((state) =>
                _.groupBy(response.data, (d) => d.writer.name)
            );
        });
    };

    useEffect(() => {
        fetchArticles();
    }, [app.company]);

    return (
        <Row>
            <Col md="6">
                <Card>
                    <Card.Body>
                        <Card.Title>
                            Welcome to {app.company.name} Writer Dashboard
                        </Card.Title>
                        <Card.Text className="text-muted">
                            Data as of{" "}
                            {format(new Date(), "LLLL dd, yyyy hh:mm a")}
                        </Card.Text>
                        <Button variant="success" as={Link} to="article/create">
                            CREATE ARTICLE
                        </Button>
                    </Card.Body>
                    <Tabs
                        defaultActiveKey="today"
                        id="fill-tab-example"
                        className="mb-3"
                        fill
                    >
                        <Tab eventKey="today" title="TODAY">
                            <ArticlesToday articles={articles} />
                        </Tab>
                        <Tab eventKey="advance" title="ADVANCE">
                            <ArticlesAdvance />
                        </Tab>
                        <Tab eventKey="last_7_days" title="LAST 7 DAYS">
                            <ArticlesLastSevenDays articles={articles} />
                        </Tab>
                        <Tab eventKey="sent_back" title="SENT BACK">
                            <ArticlesSentBack />
                        </Tab>
                    </Tabs>
                </Card>
            </Col>
            <Col md="6">
                <Row className="flex-column gy-4">
                    <Col md="12">
                        <Card>
                            <Card.Body>
                                <Card.Title>Writer Production</Card.Title>
                                <Table size="sm">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Submitted</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {_.keys(groupedArticles).map(
                                            (article) => {
                                                return (
                                                    <tr key={article}>
                                                        <td>{article}</td>
                                                        <td>
                                                            {
                                                                groupedArticles[
                                                                    article
                                                                ].length
                                                            }
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        )}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md="12">
                        <Card>
                            <Card.Body>
                                <Card.Title>Article List Preview</Card.Title>
                            </Card.Body>
                            <ArticlePreviewList articles={articles} />
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default Dashboard;
