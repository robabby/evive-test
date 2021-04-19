# EVIVE TEST

## Running the app

---

After cloning the app locally `cd` into the `evive-test` directory, run `yarn` to install dependencies and then run `yarn dev` to launch the local webserver.

The app will be available at: [http://localhost:3000](http://localhost:3000)

The implemented API endpoint lives at [http://localhost:3000/api/order](http://localhost:3000/api/order) and expects `POST` requests with a `x-www-form-urlencoded` body. In Postman you will define the `key` as `order` and the `value` as any order format you like (preferrably based on the test examples).

| Key   | Value           |
| ----- | --------------- |
| order | Breakfast 1,2,3 |
| order | Lunch 1,2       |

--

## Running the tests

Run `yarn test __tests__/api/order.test.ts` in a terminal to run the included tests.

--

## Explanation

I opted for Next.js for this test becase:

- I wanted an excuse to use the framework
- Given more time I would have enjoyed setting up an accompanying UI.
  - If you open the project in a web browser, you'll see the start of that concept which I bailed out of due to time constraints.

## Improvements

Things I would have changed or improved.

- Better typescript type checking in the API.
  - I started out developing good type definitions initially, but due to IRL time contraints I wasn't able to invest the effort to reflect that in the API. It can easily be improved to adopt greater type checking.
- Better separation of concerns in the `createOrder` function in `pages/api/order.ts`
  - This function is _super_ linear, excessively large and brittle. Given more time I would refactor it into smaller logical components and middleware handlers.
- In the order of development, (get it working, get it clean, get it fast) this solution is _juuuust_ past "Get it working" and hold a lot of opportunity for imrovement.
- If I could do it over again, I would have skipped Next.js entirely and instead built a dead-simple Express.js app deployed as a Lambda :shrug:.

---

#### Below is the default readme from `create-next-app`

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
