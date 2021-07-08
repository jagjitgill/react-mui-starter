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
      id: "samples",
      name: "Samples",
      children: [
        {
          id: "filters",
          name: "Filters",
          url: "/sample/filters",
        },
        {
          id: "context",
          name: "Context",
          url: "/sample/context",
        },
        {
          id: "sample-okta",
          name: "Okta OIDC",
          url: "/sample/oidc",
        },
        {
          id: "sample-menu-3",
          name: "Sample Menu-3",
          children: [
            {
              id: "sample-menu-3-1",
              name: "Sample Menu-3-1",
              url: "/sample-menu-3-1",
            },
            {
              id: "sample-menu-3-2",
              name: "Sample Menu-3-2",
              url: "/sample-menu-3-2,",
            },
            {
              id: "sample-menu-3-3",
              name: "Sample Menu-3-3",
              url: "/sample-menu-3-3",
            },
          ],
        },
      ],
    },
    {
      id: "github",
      name: "GitHub",
      url: "https://github.com/jagjitgill/react-mui-starter",
      external: true,
    },
  ],
};

export default MenuItems;
