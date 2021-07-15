import { createContext } from 'react';
import RootStore from '../stores/rootStore';

export default createContext<RootStore>({} as RootStore);
