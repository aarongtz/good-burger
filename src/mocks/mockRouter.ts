import { NextRouter } from 'next/router';

const createMockRouter = (router: Partial<NextRouter>): any => {
    return {
        basePath: '',
        pathname: '/',
        route: '/',
        query: {},
        asPath: '/',
        back: jest.fn(),
        beforePopState: jest.fn(),
        prefetch:  jest.fn().mockResolvedValue(true),
        push: jest.fn(),
        reload: jest.fn(),
        replace: jest.fn(),
        events: {
            on: jest.fn(),
            off: jest.fn(),
            emit: jest.fn(),
        },
        isFallback: false,
        isLocaleDomain: false,
        isReady: true,
        defaultLocale: 'en',
        domainLocales: [],
        isPreview: false,
        ...router,
    };
};

export default createMockRouter;