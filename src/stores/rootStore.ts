import AppStore from './appStore';
import ClientAdminStore from './clientAdminStore';
import NavigationStore from './navigationStore';
import ContentStore from './contentStore';
import ErrorStore from './errorStore';
import LoggingStore from './loggingStore';

class RootStore {
    appStore: AppStore;
    clientAdminStore: ClientAdminStore;
    navigationStore: NavigationStore;
    contentStore: ContentStore;
    errorStore: ErrorStore;
    loggingStore: LoggingStore;

    constructor() {
        this.appStore = new AppStore(this);
        this.clientAdminStore = new ClientAdminStore(this);
        this.navigationStore = new NavigationStore(this);
        this.contentStore = new ContentStore(this);
        this.errorStore = new ErrorStore(this);
        this.loggingStore = new LoggingStore(this);
    }
}

export default RootStore;
