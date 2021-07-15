import React, { useContext } from 'react';
import {
    Navbar, Button, Nav, Badge, Card, Container, Row, Col
} from 'react-bootstrap';
import './scss/app.scss';
import {
    Redirect, Switch, Route, Router
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// MSAL imports
import { IPublicClientApplication } from '@azure/msal-browser';
import {
    useMsal, MsalProvider, AuthenticatedTemplate, UnauthenticatedTemplate
} from '@azure/msal-react';
import { ErrorBoundary } from 'react-error-boundary';

import { CustomNavigationClient } from './utils/navigationClient';
import config from './config/config';

import AppLoader from './components/appLoader';
import ClientList from './components/clientAdmin/clientList';
import CreateClient from './components/clientAdmin/createClient';
import UpdateClient from './components/clientAdmin/updateClient';
import UnauthorizedPage from './components/authentication/unauthorizedPage';
import LogoutPage from './components/authentication/logoutPage';
import history from './utils/history';
import { getContent } from './utils/contentUtils';
import styles from './app.module.scss';
import 'react-datepicker/src/stylesheets/datepicker.scss';
import 'react-toastify/dist/ReactToastify.css';
import ErrorCatcher from './components/errors/errorCatcher';
import logo from './assets/logo.svg';
import ErrorModal from './components/errors/errorModal';
import Constants from './constants/appConstants';
import StoreContext from './contexts/storeContext';

type AppProps = {
    pca: IPublicClientApplication
};

function Pages() {
    const { loggingStore } = useContext(StoreContext);

    function signOutClickHandler(instance: IPublicClientApplication) {
        const msalConfig = config.auth.msalConfig;
        const logoutRequest = {
            account: instance.getActiveAccount(),
            mainWindowRedirectUri: msalConfig.auth.redirectUri,
            postLogoutRedirectUri: msalConfig.auth.postLogoutRedirectUri
        };
        instance.logoutRedirect(logoutRequest);
    }

    function SignOutButton() {
        const { instance } = useMsal();

        return (
            <Button variant="outline-light" size="sm" onClick={() => signOutClickHandler(instance)}>
                {getContent('application.buttons.logout')}
            </Button>
        );
    }

    function UserInfo() {
        const { instance } = useMsal();
        const account = instance.getActiveAccount();
        return (
            <div>
                {account?.name || null}
            </div>
        );
    }

    return (
        <Router history={history}>
            <Container fluid className={styles.page}>
                <Row>
                    <Col className={styles['col-override']}>
                        <Navbar bg="dark" variant="dark" fixed="top" className={styles['nav-bar']}>
                            <Navbar.Brand href="/">
                                <img src={logo} alt="logo" />
                                <div style={{ lineHeight: 0, fontSize: '14px', margin: '10px 0 10px 80px' }}>
                                    {getContent('application.title')}
                                </div>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                            <Navbar.Collapse>
                                <Nav className="justify-content-end" style={{ width: '100%', height: '20px', alignItems: 'center' }}>
                                    <AuthenticatedTemplate>
                                        <Badge pill variant="primary" className={styles['user-name']}>
                                            <UserInfo />
                                        </Badge>
                                        <SignOutButton />
                                    </AuthenticatedTemplate>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </Col>
                </Row>
                <Row>
                    <Col className={styles['col-override']}>
                        <ErrorBoundary
                            FallbackComponent={({ error }) => (
                                <ErrorModal error={error} type={Constants.error.types.ERROR_BOUNDRY} />
                            )}
                            onError={async (error: Error) => {
                                await loggingStore.logError(error);
                            }}
                        >
                            <Switch>
                                <Route path="/clients/:id/update">
                                    <AuthenticatedTemplate>
                                        <Card className={styles.content}>
                                            <UpdateClient />
                                        </Card>
                                    </AuthenticatedTemplate>
                                    <UnauthenticatedTemplate>
                                        <Redirect to="/unauthorized" />
                                    </UnauthenticatedTemplate>
                                </Route>
                                <Route path="/clients/create">
                                    <AuthenticatedTemplate>
                                        <Card className={styles.content}>
                                            <CreateClient />
                                        </Card>
                                    </AuthenticatedTemplate>
                                    <UnauthenticatedTemplate>
                                        <Redirect to="/unauthorized" />
                                    </UnauthenticatedTemplate>
                                </Route>
                                <Route path="/unauthorized">
                                    <UnauthorizedPage />
                                </Route>
                                <Route path="/logout">
                                    <LogoutPage />
                                </Route>
                                <Route path="/">
                                    <Card className={styles.content}>
                                        <ClientList />
                                    </Card>
                                </Route>
                            </Switch>
                            <AppLoader />
                            <ToastContainer autoClose={2500} />
                            <ErrorCatcher />
                        </ErrorBoundary>
                    </Col>
                </Row>
                <Row>
                    <Col className={styles['col-override']}>
                        <Navbar variant="dark" fixed="bottom" bg="dark" className={styles['nav-bar-footer']}>
                            <Navbar.Brand href="/" className={styles['nav-bar-footer-text']}>
                                {getContent('application.copyright')}
                            </Navbar.Brand>
                        </Navbar>
                    </Col>
                </Row>
            </Container>
        </Router>
    );
}

function App(props: AppProps) {
    const navigationClient = new CustomNavigationClient(history);
    props.pca.setNavigationClient(navigationClient);
    return (
        <MsalProvider instance={props.pca}>
            <Pages />
        </MsalProvider>
    );
}

export default App;
