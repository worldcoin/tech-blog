import fetch from "jest-fetch-mock";
import { TextDecoder, TextEncoder } from "util";
jest.setMock("node-fetch", fetch);
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

jest.mock("next/config", () => () => ({
  publicRuntimeConfig: {
    NEXT_PUBLIC_APP_URL: "http://localhost:3000",
  },
}));

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));

jest.mock("@sindresorhus/slugify", () => () => "");
