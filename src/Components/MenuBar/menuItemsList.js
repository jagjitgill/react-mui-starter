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
      id: "sample",
      name: "Sample 1",
      children: [
        {
          id: "sample-child-1",
          name: "Sample Child-1",
          url: "/sample-child-1",
        },
        {
          id: "sample-child-2",
          name: "Sample Child-2",
          url: "/sample-child-2",
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
