import { render } from "@testing-library/react";
import { RouterMock } from "common/RouterMock";
import { Header } from "../index";

const blogMenuItems = [
  { title: "Launch", url: "/how-the-launch-works" },
  { title: "Privacy", url: "/privacy-by-design" },
  { title: "About", url: "/about" },
  { title: "Team", url: "/careers" },
];

describe("Header", () => {
  it("renders properly", async () => {
    const { container } = render(
      <RouterMock>
        <Header menuItems={blogMenuItems} />
      </RouterMock>
    );

    expect(container).toBeTruthy();
  });
});
