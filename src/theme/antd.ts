import { ThemeConfig } from "antd";

const theme: ThemeConfig = {
  token: {
    colorPrimary: "#D31A7A",
    borderRadius: 3,
    fontFamily: "var(--font-hindSiliguri)",
  },
  components: {
    Tabs: {
      // cardBg: "#10BBFA",
      // itemColor: "#fff",
      // itemHoverColor: "#fff",
    },
    Collapse: {
      contentBg: "#fff",
      headerBg: "#fff",
    },
    Checkbox: {
      colorBorder: "gray",
    },
    Rate: {
      starSize: 13,
      starColor: "#ffa534",
    },
  },
};

export { theme };
