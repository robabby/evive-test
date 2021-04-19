interface MenuParam {
  menu: Menu;
}

const BREAKFAST_MENU: BreakfastMenu = {
  main: "Eggs",
  side: "Toast",
  drinks: ["Coffee", "Water"]
};

const LUNCH_MENU: LunchMenu = {
  main: "Salad",
  side: "Chips",
  drinks: ["Soda", "Water"]
};

const DINNER_MENU: DinnerMenu = {
  main: "Steak",
  side: "Potatoes",
  drinks: ["Wine", "Water"],
  desert: "Cake"
};

const Menus: Menus = {
  breakfast: BREAKFAST_MENU,
  lunch: LUNCH_MENU,
  dinner: DINNER_MENU
};

export default (req, res) => {
  const { query } = req;
  const { menu }: MenuParam = query;

  res.status(200).json(Menus[menu]);
};
