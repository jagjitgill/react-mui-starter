const MenuItems = {
  data: [
    {
      id: "home",
      name: "Home",
      url: "/",
    },
    {
      id: "sign-in",
      name: "Sign In",
      url: "/sign-in",
    },
    {
      id: "poc",
      name: "POCs",
      children: [
        {
          id: "filters",
          name: "Filters",
          url: "/poc/filters",
        },
        {
          id: "poc-okta",
          name: "Okta OIDC",
          url: "/poc/oidc",
        },
        {
          id: "sample-child-3",
          name: "Sample Child-3",
          children: [
            {
              id: "sample-child-3-1",
              name: "Sample Child-3-1",
              url: "/sample-child-3-1",
            },
            {
              id: "sample-child-3-2",
              name: "Sample Child-3-2",
              url: "/sample-child-3-2,",
            },
            {
              id: "sample-child-3-3",
              name: "Sample Child-3-3",
              url: "/sample-child-3-3",
            },
          ],
        },
      ],
    },
  ],
};

export default MenuItems;
