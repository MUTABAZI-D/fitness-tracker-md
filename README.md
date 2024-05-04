---
# Fitness Tracker App for Coaches

Welcome to the Fitness Tracker App for Coaches – the ultimate tool for elevating your fitness coaching experience. This application is designed to streamline user management, allowing coaches to seamlessly register and edit user information. With a focus on personalization, coaches can log individualized workout sessions directly, providing users with a dynamic platform to track their fitness journey, edit profiles, and achieve their goals. Explore a revolutionary approach to fitness coaching, where technology meets personalization. Get started today! 🏋️‍♂️💪
---

Entities:\*\*

1.  **Workouts**

- Attributes: ID, Name, Type (should be a select field with
  > pre-defined values), Duration, Calories Burned, User ID, Date
  > Performed (timestamp).

1.  **Users**

- Attributes: ID, Name, Age, Weight, Height, location, phone, email

**Features:**

- Admin (Fitness Coach) can register and edit user information.

- Admin can add, edit or remove workout sessions for a selected user

  > (User ID, Workout details).

- Admin can view Users & workout sessions

- Admin can search users & workout sessions

- Admin should view a selected user\'s profile

- Admin should view selected user\'s workout sessions & visualize the

  > report of the calories burned per month for the selected user

- Admin should login & logout (create static username & password for
  > the admin to use while logging in). This info should be inside
  > a .env which is not tracked to GitHub.

```{=html}
<!-- -->
```

- After the login is successful, the user should be redirected to

  > the Dashboard\'s Home page and it should store a token
  > in localstorage (https://www.w3schools.com/jsref/prop_win_localstorage.asp)

- Each dashboard\'s page should first check if the token is available

  > before loading the content, otherwise the user will be redirected
  > to login page.

- When the user logs out, the token is cleared from localstorage then
  > they are redirected to login page

**Project Setup & tools:**

- React JS

- Material UI for design (strictly use this)

- Material UI icons for icons

- Redux Toolkit for central store management

- JSON server for static API
  > (https://www.npmjs.com/package/json-server) this will act as a
  > fake API.

**Remarks:**

- Please make sure to make the app more and more modular. meaning you

  > should be able to create multiple components to increase code
  > readability and neatness

- NEATNESS is crucial in this project. so the review will more strict

- This project will be done in 4 parts, with each part done in a
  > separate branch:

```{=html}
<!-- -->
```

- Project setup (I will do this)

- Authentication (login, secure page routes & logout)

- Users module (CRUD)

- Workouts module (CRUD)

```{=html}
<!-- -->
```

- For every form field add validation using react hook form &

  > yup (Watch video here)

- For every action performed (create user, delete user, etc.) there

  > should be a toast component that shows a message.
  > (https://www.npmjs.com/package/react-toastify)

- Make sure to use the same colors as defined in the theme
  > configuration

**Design:**

- Template

  > design: https://demos.creative-tim.com/nextjs-argon-dashboard/admin/dashboard?\_ga=2.265566602.429323228.1705698585-1373150550.1705698585

- Login page: https://prnt.sc/1y7KiodqnLFX

- Dashboard home page: https://prnt.sc/YbFGnBTHCzRf

```{=html}
<!-- -->
```

- The sidebar links should be white and the icons colors will be blue

- The sections/texts that were crossed, it means they shouldn\'t be

  > designed in this project

- The sidebar links are: (Dashboard, Users, Workouts & logout which

  > should be below the line)

- All dashboard pages, will have the same sidebar, header only the
  > content changes

```{=html}
<!-- -->
```

- Dashboard users page: https://prnt.sc/f3Q3gWuKNtfh

```{=html}
<!-- -->
```

- The content of the page is a table

- on top of the table there should be a well designed search box next
  > to a new user button. and both aligned on the right

```{=html}
<!-- -->
```

- Dashboard workouts page: should be the same as users\' page

- Dashboard user profile page: https://prnt.sc/8iE5zgZ45NS9

```{=html}
<!-- -->
```

- Template

  > design: <https://www.bootdey.com/snippets/view/profile-with-data-and-skills#preview>

- The left card will only contain the name of the user and a random

  > photo

- The card on the right will contain the users info, by clicking

  > the edit button the edit modal shall be opened populated with the
  > users information for the coach to update!

- The bottom cards:

```{=html}
<!-- -->
```

- On the left there will be a table showing all the workouts info for

  > the selected user

- On the right card, there will be a graph that shows the calories
  > burned / month. On top of the graph put 2 date fields one
  > for startDate and another one for endDate and a button for
  > generate. by clicking the generate button a report for the
  > selected period should be shown.
