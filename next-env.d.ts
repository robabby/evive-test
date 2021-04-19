/// <reference types="next" />
/// <reference types="next/types/global" />

enum MenuTypes {
  Breakfast = "breakfast",
  Lunch = "lunch",
  Dinner = "dinner"
}

enum Drinks {
  Coffee,
  Soda,
  Water,
  Wine
}

type BreakfastMain = "Eggs";
type BreakfastSide = "Toast";

interface BreakfastMenu {
  main: BreakfastMain;
  side: BreakfastSide;
  drinks: ["Coffee", "Water"];
}

type LunchMain = "Salad";
type LunchSide = "Chips";

interface LunchMenu {
  main: LunchMain;
  side: LunchSide;
  drinks: ["Soda", "Water"];
}

type DinnerMain = "Steak";
type DinnerSide = "Potatoes";
type Desert = "Cake";

interface DinnerMenu {
  main: DinnerMain;
  side: DinnerSide;
  drinks: ["Wine", "Water"];
  desert: Desert;
}

interface Dinner {
  main: DinnerMain;
  side: DinnerSide;
  drink: Drinks.Wine;
  water: Drinks.Water;
  desert: Desert;
}

interface Menus {
  breakfast: BreakfastMenu;
  lunch: LunchMenu;
  dinner: DinnerMenu;
}

type Menu = MenuTypes.Breakfast | MenuTypes.Lunch | MenuTypes.Dinner;

interface BreakfastOrder {
  1: BreakfastMain;
  2: BreakfastSide;
  3?: Drinks.Coffee;
}

interface LunchOrder {
  1: LunchMain;
  2: LunchSide | LunchSide[];
  3?: Drinks.Soda;
}

interface DinnerOrder {
  1: DinnerMain;
  2: DinnerSide;
  3?: Drinks.Wine;
  4: Desert;
}

type Order = BreakfastOrder | LunchOrder | DinnerOrder;
type Meal = Brakfast | Lunch | Dinner;

declare module "*.bmp" {
  const src: string;
  export default src;
}

declare module "*.gif" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.jpeg" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.webp" {
  const src: string;
  export default src;
}

// TODO: Setup an SVGR Custom Template
// https://react-svgr.com/docs/custom-templates/
declare module "*.svg" {
  import * as React from "react";

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  const src: string;
  export default src;
}

declare module "*.scss" {
  const content: { [className: string]: string };
  export = content;
}

declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export = classes;
}
