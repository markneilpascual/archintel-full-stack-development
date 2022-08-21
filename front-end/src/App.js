import React, { forwardRef, useContext, useEffect, useState } from "react";
import { Dropdown, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { Link, Route, Routes } from "react-router-dom";
import CreateArticle from "./pages/article/CreateArticle";
import CompanyThumbnail from "./components/company/CompanyThumbnail";
import WriterBox from "./components/writer/WriterBox";
import AppContext from "./context/AppContext";
import AllMedia from "./pages/AllMedia";
import Dashboard from "./pages/Dashboard";
import Company from "./services/company";
import Writer from "./services/writer";
import ArticleDetail from "./pages/article/ArticleDetail";
import AccountSettings from "./pages/AccountSettings";

function App() {
    const app = useContext(AppContext);
    const [writers, setWriters] = useState([]);
    const [companies, setCompanies] = useState([]);

    const fetchAllWriters = () => {
        Writer.all().then((response) => setWriters(response.data));
    };

    const fetchAllCompanies = () => {
        Company.all().then((response) => setCompanies(response.data));
    };

    const displayCurrentWriter = () => {
        if (app.writer) {
            return (
                <WriterBox
                    writer={{
                        name: app.writer.name,
                        role: app.writer.role,
                    }}
                />
            );
        }

        return (
            <div className="p-2">
                No writer selected yet
                <span className="float-end">
                    <i className="bi bi-caret-down-fill"></i>
                </span>
            </div>
        );
    };

    const displayCurrentCompany = () => {
        if (app.company) {
            return <div>{app.company.name}</div>;
        }

        return <div className="p-2">No company selected yet</div>;
    };

    useEffect(() => {
        fetchAllWriters();
        fetchAllCompanies();
    }, []);

    useEffect(() => {
        if (writers.length >= 1)
            app.actions.setWriter((state) => [...writers].shift());
    }, [writers]);

    useEffect(() => {
        if (companies.length >= 1)
            app.actions.setCompany((state) => [...companies].shift());
    }, [companies]);

    const WriterDropdownToggle = forwardRef((props, ref) => (
        <div
            ref={ref}
            onClick={(e) => props.onClick(e)}
            style={{ pointer: "cursor" }}
        >
            {props.children}
        </div>
    ));

    const WriterDropdownMenu = forwardRef((props, ref) => (
        <div ref={ref} className={props.className} style={props.style}>
            <div className="w-100">
                {React.Children.toArray(props.children).map((child) => {
                    return child;
                })}
            </div>
        </div>
    ));

    const toggleSidebar = (e) => {
        e.preventDefault();
        app.actions.setShowSidebar((state) => !state);
    };

    return (
        <div className="d-flex">
            <Offcanvas
                show={app.showSidebar}
                scroll={window.innerWidth > 500 ? true : false}
                backdrop={window.innerWidth > 500 ? false : true}
                className="d-flex flex-row"
                onHide={(e) => {
                    app.actions.setShowSidebar((state) => false);
                }}
            >
                <div
                    className="flex-grow-0 bg-secondary"
                    style={{ width: "90px", height: "100vh" }}
                >
                    <div
                        style={{
                            overflowY: "scroll",
                            overflowX: "hidden",
                            height: "100%",
                        }}
                    >
                        <Nav className="flex-column">
                            {companies.map((company, i) => {
                                return (
                                    <Nav.Item key={i}>
                                        <Nav.Link
                                            onClick={(e) =>
                                                app.actions.setCompany(
                                                    (state) => company
                                                )
                                            }
                                        >
                                            <CompanyThumbnail
                                                name={company.name}
                                                active={
                                                    app.company.id ===
                                                    company.id
                                                }
                                            />
                                        </Nav.Link>
                                    </Nav.Item>
                                );
                            })}
                        </Nav>
                    </div>
                </div>
                <div
                    className="bg-success text-white position-relative border border-muted border-0 border-end"
                    style={{ width: "100%", height: "100vh" }}
                >
                    <div className="px-3 py-1">
                        <span className="fs-5">{displayCurrentCompany()}</span>
                    </div>
                    <hr className="my-2" />
                    <Dropdown>
                        <Dropdown.Toggle
                            as={WriterDropdownToggle}
                            id="user-dropdown"
                        >
                            {displayCurrentWriter()}
                        </Dropdown.Toggle>
                        <Dropdown.Menu as={WriterDropdownMenu}>
                            {writers.map((writer, i) => {
                                return (
                                    <Dropdown.Item
                                        key={i}
                                        onClick={() =>
                                            app.actions.setWriter(writer)
                                        }
                                    >
                                        <WriterBox
                                            writer={{
                                                name: writer.name,
                                                role: writer.role,
                                            }}
                                        />
                                    </Dropdown.Item>
                                );
                            })}
                        </Dropdown.Menu>
                    </Dropdown>
                    <hr className="my-2" />
                    <div className="text-center p-2">
                        <div className="fw-bold">Walbro</div>
                    </div>
                    <div className="h-100 bg-dark">
                        <Nav className="flex-column p-1">
                            <Nav.Item>
                                <Nav.Link
                                    as={Link}
                                    to="/"
                                    className="sidebar-link"
                                >
                                    Dashboard
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    as={Link}
                                    to="/all-media"
                                    className="sidebar-link"
                                >
                                    All Medias
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    as={Link}
                                    to="/account/settings"
                                    className="sidebar-link"
                                >
                                    Account Settings
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                    <div className="position-absolute bottom-0 w-100">
                        <div className="p-2 bg-success fs-6">
                            <div className="fw-bold">Salesforce Home</div>
                            <div className="fw-bold">
                                v.4.4.0| &copy; 2021 Architectural Corp.
                            </div>
                        </div>
                    </div>
                </div>
            </Offcanvas>

            <div
                className="w-100 flex-grow-1"
                style={{
                    marginLeft:
                        window.innerWidth > 500
                            ? app.showSidebar
                                ? "390px"
                                : "unset"
                            : "unset",
                }}
            >
                <Navbar bg="success" className="w-100 px-3">
                    <Navbar.Brand
                        href="#"
                        className="text-white"
                        onClick={toggleSidebar}
                    >
                        <i className="bi bi-list fs-5"></i>
                    </Navbar.Brand>
                    <Nav className="ms-auto">
                        <Nav.Item>
                            <Nav.Link className="text-white">
                                <i className="bi bi-pc-display-horizontal"></i>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className="text-white">
                                <i className="bi bi-bell-fill"></i>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className="text-white">
                                <i className="bi bi-gear-fill"></i>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className="text-white">
                                <i className="bi bi-clock-history"></i>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar>
                <main className="px-4 py-3">
                    <Routes>
                        <Route path="/">
                            <Route index element={<Dashboard />} />
                            <Route path="all-media" element={<AllMedia />} />
                            <Route
                                path="account/settings"
                                element={<AccountSettings />}
                            />
                            <Route path="article/">
                                <Route
                                    path="create"
                                    element={<CreateArticle />}
                                />
                                <Route
                                    path=":slug"
                                    element={<ArticleDetail />}
                                />
                            </Route>
                        </Route>
                    </Routes>
                </main>
            </div>
        </div>
    );
}

export default App;
