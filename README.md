# Treat or treat

This project aims at building a fictional online dessert shop for React and MUI practice.
View the demo [here](https://treat-or-treat.web.app/) on a computer or mobile device!

## Description

The goal is to create a fully responsive web app for an online store. While presented as a dessert shop, it should also be easily customizable for other businesses.

### Features

The responsive layout, made with a lot of care and effort, looks good on various screen sizes.
Basic search, filter, and sort of products were implemented, with considerations taken to make these functions easy to use.
Cart is presented as a side drawer of the main content so that it is easily accessible while shopping.
Images in lists, slideshow, and background are loaded progressively to create a smooth browsing experience.

### Lessons learned

Since the MUI library supports many styling options, I initially styled the components with CSS modules. But as I gained more experience with the library, the bundled styled and sx prop utilities became advantageous because of their integrity with the theme and the convenience of using them together.

While I implemented the filter and sort of products in this project with React useState and useEffect, after I learned more about react-router-dom later, I realized its useSearchParams could help create a powerful and clean solution for the same purpose. The latter will likely be how I implement similar functions in my next project.

### Next step

Currently, the app is not connected to a backend and displays local dummy data. Therefore, the next step will be upgrading to an actual backend, making it ready for real-world operation.

## Installation

With the necessary dependencies installed, this project should be ready to run out of the box.

## Thank you

Thank you for reading, and I appreciate that you took the time to check out my project!
There is still a long way to go for this project and my learning, and I will keep updating as I learn more. Any advice for this project or front-end skills, in general, will be appreciated. Thanks!
