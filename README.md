# Pomodoro Timer

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

3. Install the dependencies

```
npm install
```

4. Run the development server

```
npm run dev
```


## Leveraging Generative AI for Code Writing

To implement the circular progress bar feature, I asked ChatGPT for a code snippet. I used the prompt: 'Create an animated circular progress bar with a SVG, without using an external library'. The response provided an accurate SVG element with nested circle elements, which I adapted to fit the style and radius I want. The response also provided the percentage function calculation, which I then adjusted with the variables representing work time or break time"

I then prompted for a more stylized circular progress bar with inner tick lines and labels and rounded circle stroke ends using the prompt: "Add tick lines and labels at intervals (evenly distributed based on time value) to the circular progress bar". It responded with an updated code snippet. I then adjusted various radius values to style it better.

I am new to Chakra UI, so ChatGPT came in handy when i had questions such as "How to implement theming with Chakra UI in a Next.js app?" and "How do use theme colors to have a purple highlight color for the circular progress bar and button?"

I also used ChatGPT to create the Jest test scenarios by creating a prompt listing the app features. The response also included steps on how to set up Jest and configure it. However, I had problems running the test because I was importing a JSX React component into the test file. I resolved it by going to the Next.js with documentation on how to setting up Jest with Next.js. The response output the full test file with 4 test scenarios. 

The test "increments cycle count after one complete cycle" failed, though the cycle variable incremented by 1 on the UI when I ran the app. I then prompted ChatGPT on why the test failed along with the error logs and a code snippet of the useEffect hook where the work to break cycle transition takes place. The response suggested that this could be due to a timing issue where the state update for cycles is not happening as expected within the test's timeframe. It suggested that to test the asynchronous updates correctly, I needed to ensure that the assertions account for the updates that happen as a result of the setInterval and the state changes within your component. 
It suggested:
- using the waitFor function provided by React Testing Library to wait for the specified condition to be true, repeatedly calling the callback until it is.
- split the act calls into two separate parts to accurately simulate the timer for both the work and break periods.

Only the last suggestion was required to solve the problem as the act calls should be separate to simulate the passage of time correctly. The test can still pass successfully without using waitFor, because actually the DOM updates immediately when the break session ends to immediately transition the text displaying the cycles from 0 to 1. I think ChatGPT assumed there was asynchronicity involved because the code snippet included 'setTimeout';
