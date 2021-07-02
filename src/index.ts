import { CompositeDisposable } from 'atom';
import Logger from './log';
import Fetch from './fetch';

export default {
    subscriptions: new CompositeDisposable(),

    activate(): void {
        Logger.log('Activating package');
    },

    deactivate(): void {
        Logger.log('Deactivating package');
        this.subscriptions?.dispose();
    },

    provideFetch(): unknown {
        Logger.log('Providing service');

        return Fetch;
    }

};
