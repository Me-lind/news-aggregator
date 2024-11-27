import { getUniqueSubscribedTopics } from "../services/subscriptionService";
import pool from "../config/database";

jest.mock("../config/database", () => ({
    query: jest.fn(),
}));

describe("getUniqueSubscribedTopics", () => {
    it("returns unique subscribed topics from the database", async () => {
        const mockQueryResult = { rows: [{ topic: "tech" }, { topic: "sports" }] };
        (pool.query as jest.Mock).mockResolvedValue(mockQueryResult);

        const result = await getUniqueSubscribedTopics();

        expect(pool.query).toHaveBeenCalledWith("SELECT DISTINCT topic FROM subscriptions");
        expect(result).toEqual(["tech", "sports"]);
    });

    it("throws an error if the query fails", async () => {
        (pool.query as jest.Mock).mockRejectedValue(new Error("DB error"));

        await expect(getUniqueSubscribedTopics()).rejects.toThrow("DB error");
    });
});
