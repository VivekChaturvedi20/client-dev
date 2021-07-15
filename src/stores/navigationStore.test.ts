import RootStore from './rootStore';
import history from '../utils/history';
import NavigationStore from './navigationStore';

let rootStore:RootStore;
let navigationStore:NavigationStore;

beforeEach(() => {
    rootStore = new RootStore();
    navigationStore = rootStore.navigationStore;
});

test('navigationStore gotoHome', async () => {
    navigationStore.gotoHome();
    expect(history.location.pathname).toBe('/');
});

test('navigationStore gotoCreateClient', async () => {
    navigationStore.gotoCreateClient();
    expect(history.location.pathname).toBe('/clients/create');
});

test('navigationStore gotoUpdateClient', async () => {
    navigationStore.gotoUpdateClient('someClientId');
    expect(history.location.pathname).toBe('/clients/someClientId/update');
});
