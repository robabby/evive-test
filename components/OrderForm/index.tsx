import { Button, Checkbox, Divider, Form, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import React from "react";
import { format } from "date-fns";
import styles from "./styles.module.css";

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

interface MenuRange {
  start: number;
  end: number;
}

interface SegmentsHelper {
  getSegment(hour: string): Menu;
  [MenuTypes.Breakfast]: MenuRange;
  [MenuTypes.Lunch]: MenuRange;
  [MenuTypes.Dinner]: MenuRange;
}

const DAY_SEGMENTS: SegmentsHelper = {
  getSegment(hour: string): Menu {
    const hourInt = parseInt(hour, 10);
    const keys = Object.keys(this) as Menu[];
    let result: Menu;

    keys.forEach(key => {
      if (hourInt >= this[key].start && hourInt <= this[key].end) {
        result = key;
      }
    });

    return result;
  },
  breakfast: {
    start: 1,
    end: 11
  },
  lunch: {
    start: 11,
    end: 16
  },
  dinner: {
    start: 16,
    end: 24
  }
};

const CURRENT_HOUR = format(Date.now(), "H");
const SEGMENT = DAY_SEGMENTS.getSegment(CURRENT_HOUR);
const MENU_ITEM_RULES = {
  required: true,
  validator: (_, value) =>
    value
      ? Promise.resolve()
      : Promise.reject(new Error("Must select a main course"))
};

const { Option } = Select;
const { useEffect, useState } = React;

const OrderForm = () => {
  const [menuType, setMenuType] = useState(SEGMENT);
  const [menu, setMenu] = useState(Menus[SEGMENT]);

  useEffect(() => {
    setMenu(Menus[menuType]);
  }, [menuType]);

  console.log(menu);

  const onFinish = values => {
    console.log("Received values of form:", values);
  };

  return (
    <div className={styles.container}>
      <h3>Pick your menu:</h3>
      <Select
        value={menuType}
        onChange={val => setMenuType(val)}
        style={{ width: 200, marginBottom: 20 }}
      >
        <Option value="breakfast">Breakfast</Option>
        <Option value="lunch">Lunch</Option>
        <Option value="dinner">Dinner</Option>
      </Select>
      <Form layout="vertical" name="meal" onFinish={onFinish}>
        <Form.List
          name="orders"
          rules={[
            {
              validator: async (_, orders) => {
                if (!orders || orders.length < 1) {
                  return Promise.reject(
                    new Error("At least 1 valid order must be selected")
                  );
                }
              }
            }
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  {...field}
                  label={<h2>{`Order #${index + 1}`}</h2>}
                  required={false}
                  key={`${field.key}-${index}`}
                >
                  <Form.Item
                    valuePropName="checked"
                    validateTrigger={["onChange"]}
                    rules={[MENU_ITEM_RULES]}
                    noStyle
                  >
                    <Checkbox>
                      <b>Main Course:</b> {menu.main}
                    </Checkbox>
                  </Form.Item>
                  <Form.Item
                    valuePropName="checked"
                    validateTrigger={["onChange"]}
                    rules={[MENU_ITEM_RULES]}
                    noStyle
                  >
                    <Checkbox>
                      <b>Side:</b> {menu.side}
                    </Checkbox>
                  </Form.Item>
                  {menu?.desert && (
                    <Form.Item
                      {...field}
                      valuePropName="checked"
                      validateTrigger={["onChange"]}
                      rules={[MENU_ITEM_RULES]}
                      noStyle
                    >
                      <Checkbox>
                        <b>Desert:</b> {menu.desert}
                      </Checkbox>
                    </Form.Item>
                  )}
                  <div>
                    <h4>Drinks:</h4>
                    {menu.drinks.map(drink => (
                      <Form.Item
                        key={`${drink}-${index}`}
                        valuePropName="checked"
                        validateTrigger={["onChange"]}
                        rules={[MENU_ITEM_RULES]}
                        noStyle
                      >
                        <Checkbox>{drink}</Checkbox>
                      </Form.Item>
                    ))}
                  </div>
                  {fields.length > 1 ? (
                    <>
                      <Button
                        danger
                        icon={<MinusCircleOutlined />}
                        onClick={() => remove(field.name)}
                        style={{ marginTop: 12 }}
                        type="primary"
                      >
                        Delete Order
                      </Button>
                      <Divider />
                    </>
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                >
                  Add Order
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default OrderForm;
