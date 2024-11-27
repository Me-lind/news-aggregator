import { startNewsPolling } from '../services/newsPollingService';
import { fetchNewsByTopic } from '../services/newsService';
import { Server } from 'socket.io';

const mockNewsData = [
    {
        source: {
            id: null,
            name: "Prtimes.jp",
        },
        author: null,
        title: "TGXバトルズ 2｜渋野日向子 vs 原英莉花｜究極のヴァーチャルゴルフ対決！",
        description: "[株式会社TGX GOLF] Virtual Golf Competition Details",
        url: "https://prtimes.jp/main/html/rd/p/000000006.000149694.html",
        urlToImage: "https://prcdn.freetls.fastly.net/release_image/149694/6/image.png",
        publishedAt: "2024-11-19T06:40:02Z",
        content: "Event details and more information...",
    },
    {
        source: {
            id: null,
            name: "SiliconANGLE News",
        },
        author: "Jason English",
        title: "At KubeCon/CloudNativeCon 2024, AI hype gives way to real application concerns",
        description: "KubeCon event analysis and insights.",
        url: "https://siliconangle.com/2024/11/19/kubecon-cloudnativecon-2024",
        urlToImage: "https://siliconangle.com/images/kubecon.jpg",
        publishedAt: "2024-11-19T06:37:33Z",
        content: "Detailed content about KubeCon event...",
    },
];

jest.mock('../services/newsService', () => ({
    fetchNewsByTopic: jest.fn(),
}));

const ioMock = {
    to: jest.fn(() => ({
        emit: jest.fn(),
    })),
} as unknown as Server;

describe('startNewsPolling', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch news and emit updates for subscribed topics', async () => {
        const mockTopics = ['technology', 'sports'];
        const mockSubscribedTopics = jest.fn().mockResolvedValue(mockTopics);

        jest.mock('../services/subscriptionService', () => ({
            getUniqueSubscribedTopics: mockSubscribedTopics,
        }));

        (fetchNewsByTopic as jest.Mock).mockResolvedValue(mockNewsData);

        const setIntervalMock = jest.spyOn(global, 'setInterval');
        setIntervalMock.mockImplementation((fn: () => void) => {
            fn(); 
            return 1 as unknown as NodeJS.Timeout;
        });

        startNewsPolling(ioMock);

        expect(fetchNewsByTopic).toHaveBeenCalledWith('technology', undefined);
        expect(fetchNewsByTopic).toHaveBeenCalledWith('sports', undefined);
        expect(ioMock.to).toHaveBeenCalledWith('technology');
        expect(ioMock.to).toHaveBeenCalledWith('sports');
        expect(ioMock.to('technology').emit).toHaveBeenCalledWith('newsUpdate', mockNewsData);

        setIntervalMock.mockRestore();
    });
});
