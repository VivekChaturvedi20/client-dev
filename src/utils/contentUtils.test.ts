import * as ContentUtils from './contentUtils';

test('contentUtils get valid content', () => {
    const content: string = ContentUtils.getContent('application.title');
    expect(content).toBe('Client Administration');
});
