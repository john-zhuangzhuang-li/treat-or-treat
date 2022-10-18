# Treat or treat

This project aims at building a fictional online dessert shop for React and MUI practice.  
View the demo [here](https://treat-or-treat.web.app/) on a computer or mobile device!

## Description

The goal is to create a fully responsive website for an online store. While presented as a dessert shop, it should also be easily customizable for other businesses. A treat-or-treat made available for any customer, anytime!

### Features

**Responsive layout**: made with a lot of care and effort to fit various screen sizes.  
**Search, filter, and sort of products**: implemented with considerations to make these functions easy to use.  
**Shopping cart**: presented as a side drawer and is convenient to access and checkout while shopping.  
**Progressively loaded images**: designed to create a smooth browsing experience for lists, slideshow, and background.

### Lessons learned

Since the MUI library supports many styling options, I initially styled the components with CSS modules. But as I gained more experience with the library, the bundled styled and sx prop utilities became advantageous because of their integrity with the theme and the convenience of using them together.  
While I implemented the filter and sort of products in this project with basic React hooks, after I learned more about react-router later, I realized its search params feature could help create a powerful and clean solution for the same purpose. It reminds me that when building new features, try to start from libraries already in use to look for tools.

### Next step

Since a backend is not part of the purpose of this project, it is currently loading dummy data from Firebase in read-only mode. However, since Firebase is already in use, user states can be manageable with its authentication APIs to make more features available.

## Thank you

Thank you for reading, and I appreciate that you took the time to check out my project!  
There is still a long way to go for this project and my learning, and I will keep updating as I learn more. Any advice for this project or front-end skills, in general, will be appreciated. Thanks!
