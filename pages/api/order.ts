import { NextApiRequest, NextApiResponse } from "next";

const STATUS_MAP = {
  success: "success",
  error: "error"
};

const MENU_TYPES = {
  Breakfast: "Breakfast",
  Lunch: "Lunch",
  Dinner: "Dinner"
};

const MENU_ITEMS = {
  [MENU_TYPES.Breakfast]: {
    main: "Eggs",
    side: "Toast",
    drink: "Coffee",
    water: "Water"
  },
  [MENU_TYPES.Lunch]: {
    main: "Salad",
    side: "Chips",
    drink: "Soda",
    water: "Water"
  },
  [MENU_TYPES.Dinner]: {
    main: "Steak",
    side: "Potatoes",
    drink: "Wine",
    desert: "Cake",
    water: "Water"
  }
};

const REGEX = {
  main: /1/g,
  side: /2/g,
  drink: /3/g,
  desert: /4/g
};

const createOrder = order => {
  let [type, items, ...rest] = order.split(" ");

  if (rest) {
    items += `${rest}`;
  }

  const isValidMenu = MENU_TYPES.hasOwnProperty(type);
  let result = ``;

  if (!isValidMenu) {
    return {
      status: STATUS_MAP.error,
      message: "Invalid menu selection"
    };
  }

  const main = items.match(REGEX.main);

  if (!main) {
    return {
      status: STATUS_MAP.error,
      message: "The order must contain an entree!"
    };
  }

  if (main.length > 1) {
    return {
      status: STATUS_MAP.error,
      message: "Only one entree per order!"
    };
  }

  result += `${MENU_ITEMS[type].main}`;

  const side = items.match(REGEX.side);

  if (!side) {
    return {
      status: STATUS_MAP.error,
      message: "The order must contain a side!"
    };
  }

  result += `, ${MENU_ITEMS[type].side}`;

  if (side.length > 1 && type !== MENU_TYPES.Lunch) {
    return {
      status: STATUS_MAP.error,
      message: "Only one side per order!"
    };
  } else if (type === MENU_TYPES.Lunch && side.length > 1) {
    result += `(${side.length})`;
  }

  const isDinner = type === MENU_TYPES.Dinner;
  const drink = items.match(REGEX.drink);

  if (drink) {
    const drinkCount = drink.length;

    if (drinkCount > 1 && type !== MENU_TYPES.Breakfast) {
      return {
        status: STATUS_MAP.error,
        message: `Only one drink per ${type} order!`
      };
    }

    result += `, ${MENU_ITEMS[type].drink}`;

    if (drinkCount > 1) {
      result += `(${drinkCount})`;
    }

    if (isDinner) {
      result += `, ${MENU_ITEMS[type].water}`;
    }
  } else {
    result += `, ${MENU_ITEMS[type].water}`;
  }

  if (isDinner) {
    const desert = items.match(REGEX.desert);

    if (!desert) {
      return {
        status: STATUS_MAP.error,
        message: "Dinner orders must have a desert!"
      };
    }

    if (desert && desert.length > 1) {
      return {
        status: STATUS_MAP.error,
        message: "Only one desert per order!"
      };
    }

    result += `, ${MENU_ITEMS[type].desert}`;
  }

  return {
    status: STATUS_MAP.success,
    message: result
  };
};

export default function handleOrder(req: NextApiRequest, res: NextApiResponse) {
  const { body, method } = req;
  const { order } = body;

  if (!order) {
    return res.status(500).end("The request did not contain an order.");
  }

  switch (method) {
    case "POST":
      const result = createOrder(order);

      if (result.status === STATUS_MAP.error) {
        res.status(500).json(result);
      } else {
        res.status(200).json(result);
      }

      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
