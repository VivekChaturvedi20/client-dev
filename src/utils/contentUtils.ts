import _ from 'lodash';
import type ContentStore from '../stores/contentStore';

let contentStore:ContentStore;

export function setContentStore(cs:ContentStore) {
    contentStore = cs;
}

export function getContent(contentId: string) {
    const contentItem:string = _.get(contentStore.content, contentId);

    if (_.isUndefined(contentItem)) {
        return `{{ content not found: ${contentId} }}`;
    }
    return contentItem;
}
