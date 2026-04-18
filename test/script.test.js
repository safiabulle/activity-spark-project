const { getActivity } = require("../script");

describe("getActivity function", () => {

    test("should be defined", () => {
        expect(getActivity).toBeDefined();
    });

    test("should return an activity object", async () => {
        const result = await getActivity();
        
        expect(result).toHaveProperty("activity");
        expect(result).toHaveProperty("type");
        expect(result).toHaveProperty("participants");
        expect(result).toHaveProperty("price");
    });

    test("should return an education activity when type is education", async () => {
        const result = await getActivity("education");

        expect(result.type).toBe("education");
        expect(typeof result.activity).toBe("string");
    });

    test("should return a valid activity even if invalid type is given", async () => {
        const result = await getActivity("invalid-type");

        expect(result).not.toBeNull();
        expect(result).toHaveProperty("activity");
    });

});