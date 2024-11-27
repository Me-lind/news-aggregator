import { fetchNewsByTopic } from "../services/newsService";
import axios from "axios";

jest.mock("axios");

describe("fetchNewsByTopic", () => {
  it("fetches news data for a given topic", async () => {
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

    (axios.get as jest.Mock).mockResolvedValue({ data: mockNewsData });

    const topic = "tech";
    const result = await fetchNewsByTopic(topic);

    expect(axios.get).toHaveBeenCalledWith(
      "https://newsapi.org/v2/everything",
      expect.objectContaining({
        headers: { "X-Api-Key": process.env.NEWS_API_KEY },
        params: expect.objectContaining({ q: topic, sortBy: "publishedAt" }),
      })
    );
    expect(result).toEqual(mockNewsData);
  });

  it("throws an error if the API request fails", async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error("API error"));

    await expect(fetchNewsByTopic("tech")).rejects.toThrow("Failed to fetch news");
  });
});
