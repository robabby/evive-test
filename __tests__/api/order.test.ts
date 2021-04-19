import { createMocks } from "node-mocks-http";
import handleOrder from "../../pages/api/order";

const VALID_ORDERS = {
  breakfast: {
    full: "Breakfast 1,2,3",
    reverse: "Breakfast 2,3,1",
    drinks: "Breakfast 1,2,3,3,3"
  },
  lunch: {
    one: "Lunch 1,2,3",
    two: "Lunch 1,2",
    three: "Lunch 1,2,2"
  },
  dinner: {
    one: "Dinner 1,2,3,4",
    two: "Dinner 1,2,4"
  }
};

const INVALID_ORDERS = {
  breakfast: "Breakfast 1",
  lunch: {
    one: "Lunch 1,1,2,3",
    two: "Lunch"
  },
  dinner: "Dinner 1,2,3"
};

const createOrderRequest = order =>
  createMocks({
    method: "POST",
    body: {
      order
    }
  });

describe("/api/order - Breakfast", () => {
  test("returns expected message with a full Breakfast order", async () => {
    const { req, res } = createOrderRequest(VALID_ORDERS.breakfast.full);

    await handleOrder(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        message: "Eggs, Toast, Coffee"
      })
    );
  });

  test("returns expected message with a reversed Breakfast order", async () => {
    const { req, res } = createOrderRequest(VALID_ORDERS.breakfast.reverse);

    await handleOrder(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        message: "Eggs, Toast, Coffee"
      })
    );
  });

  test("returns expected message for Breakfast order with multiple drinks", async () => {
    const { req, res } = createOrderRequest(VALID_ORDERS.breakfast.drinks);

    await handleOrder(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        message: "Eggs, Toast, Coffee(3)"
      })
    );
  });

  test("returns expected message for invalid Breakfast order", async () => {
    const { req, res } = createOrderRequest(INVALID_ORDERS.breakfast);

    await handleOrder(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        message: "The order must contain a side!"
      })
    );
  });
});

describe("/api/order - Lunch", () => {
  test("returns expected message with a full Lunch order", async () => {
    const { req, res } = createOrderRequest(VALID_ORDERS.lunch.one);

    await handleOrder(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        message: "Salad, Chips, Soda"
      })
    );
  });

  test("returns expected message with a Lunch order with Water", async () => {
    const { req, res } = createOrderRequest(VALID_ORDERS.lunch.two);

    await handleOrder(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        message: "Salad, Chips, Water"
      })
    );
  });

  test("returns expected message with a Lunch order with multiple Chips and Water", async () => {
    const { req, res } = createOrderRequest(VALID_ORDERS.lunch.three);

    await handleOrder(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        message: "Salad, Chips(2), Water"
      })
    );
  });

  test("returns expected message for invalid Lunch order with multiple entrees", async () => {
    const { req, res } = createOrderRequest(INVALID_ORDERS.lunch.one);

    await handleOrder(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        message: "Only one entree per order!"
      })
    );
  });

  test("returns expected message for invalid Lunch order with multiple entrees", async () => {
    const { req, res } = createOrderRequest(INVALID_ORDERS.lunch.two);

    await handleOrder(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        message: "The order must contain an entree!"
      })
    );
  });
});

describe("/api/order - Dinner", () => {
  test("returns expected message with a full Dinner order", async () => {
    const { req, res } = createOrderRequest(VALID_ORDERS.dinner.one);

    await handleOrder(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        message: "Steak, Potatoes, Wine, Water, Cake"
      })
    );
  });

  test("returns expected message with a Dinner order with Water", async () => {
    const { req, res } = createOrderRequest(VALID_ORDERS.dinner.two);

    await handleOrder(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        message: "Steak, Potatoes, Water, Cake"
      })
    );
  });

  test("returns expected message for invalid Dinner order without desert", async () => {
    const { req, res } = createOrderRequest(INVALID_ORDERS.dinner);

    await handleOrder(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        message: "Dinner orders must have a desert!"
      })
    );
  });
});
