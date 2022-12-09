const plugin = require("tailwindcss/plugin");

const mirrorHexColors = (colors) =>
  Object.fromEntries(
    colors.map((color, index) => {
      if (!/#[a-f0-9]{6}/.test(color)) {
        throw new Error(
          'All colors should be lowercase hexadecimal strings 7 characters long with "#" sign at the beginning'
        );
      }

      if (colors.indexOf(color) !== index) {
        throw new Error("Colors should be unique");
      }

      if (colors[index - 1] > color) {
        throw new Error("Colors should be sorted alphabetically");
      }

      return [color.substring(1), color];
    })
  );

module.exports = {
  content: ["./src/**/*.{tsx,md,mdx}"],

  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities(
        {
          ".area-span-full": {
            gridArea: "1/1/-1/-1",
          },
        },
        ["responsive"]
      );
    }),

    ({ addUtilities }) =>
      addUtilities({
        ".backface-hidden": {
          backfaceVisibility: "hidden",
        },

        ".transform-preserve": {
          transformStyle: "preserve-3d",
        },

        ".transition-flip": {
          transition: ".8s cubic-bezier(.175, .885, .32, 1.275)",
        },
      }),
  ],

  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 2.2s linear infinite",
      },

      colors: {
        ...mirrorHexColors([
          "#000000",
          "#010101",
          "#181b1f",
          "#183c4a",
          "#191919",
          "#217237",
          "#232526",
          "#29343f",
          "#2e2936",
          "#353535",
          "#4940e0",
          "#596673",
          "#626467",
          "#6bb4a7",
          "#6f7a85",
          "#7068fa",
          "#70868f",
          "#828589",
          "#868686",
          "#8c8c8c",
          "#8c8c92",
          "#8e87ff",
          "#8e9095",
          "#938ca7",
          "#98c379",
          "#9eafc0",
          "#a3b1b7",
          "#a7a7a7",
          "#afafaf",
          "#b1b1b3",
          "#b37af0",
          "#c4c4c4",
          "#c4c4c6",
          "#c7c7c7",
          "#d9d9d9",
          "#dadada",
          "#dde7e9",
          "#dde7ea",
          "#e1e1e1",
          "#e1eaed",
          "#e5c07b",
          "#e8e8ea",
          "#eae7f9",
          "#eaeaea",
          "#edecfe",
          "#f0edf9",
          "#f1512f",
          "#f1f1f1",
          "#f1f2f2",
          "#f4f4f4",
          "#f7f7f7",
          "#f9f9f9",
          "#fb7e67",
          "#ff6848",
          "#fff0ed",
          "#ffffff",
        ]),
      },

      fontWeight: {
        book: 450,
      },

      gridRow: {
        "span-7": "span 7 / span 7",
        "span-9": "span 9 / span 9",
      },

      gridTemplateColumns: {
        "1fr/auto": "1fr auto",
        "1fr/minmax(0/360)/1fr": "1fr minmax(0, calc(360 * .25rem)) 1fr",
        "auto/1fr": "auto 1fr",
        "auto/1fr/auto": "auto 1fr auto",
        "auto/auto/1fr": "auto auto 1fr",
        "1/2/1": "1fr 2fr 1fr",
      },

      gridTemplateRows: {
        "1fr/auto": "1fr auto",
        "auto/1fr": "auto 1fr",
        "auto/1fr/auto": "auto 1fr auto",
      },

      maxHeight: {
        "fill-available": "-webkit-fill-available",
      },

      spacing: {
        10.5: "calc(10.5 * 1rem / 4)",
        13: "calc(13 * 1rem / 4)",
        130: "calc(130 * 1rem / 4)",
        15: "calc(15 * 1rem / 4)",
        160: "calc(160 * 1rem / 4)",
        17: "calc(17 * 1rem / 4)",
        2.5: "calc(2.5 * 1rem / 4)",
        22: "calc(22 * 1rem / 4)",
        25: "calc(25 * 1rem / 4)",
        3.5: "calc(3.5 * 1rem / 4)",
        38: "calc(38 * 1rem / 4)",
        4.5: "calc(4.5 * 1rem / 4)",
        44: "calc(44 * 1rem / 4)",
        5.5: "calc(5.5 * 1rem / 4)",
        6.5: "calc(6.5 * 1rem / 4)",
        66: "calc(66 * 1rem / 4)",
        7.5: "calc(7.5 * 1rem / 4)",
        full: "100%",
        "screen-x": "100vw",
        "screen-y": "100vh",
        "1/5": "20%",
      },

      transitionDuration: {
        DEFAULT: "200ms",
      },

      transitionProperty: {
        "transform/opacity": "transform, opacity",
        "visibility/opacity": "visibility, opacity",
        "transform/colors": "transform, colors",
      },

      width: {
        "max-content": "max-content",
      },
    },

    fontFamily: {
      sans: ["Basel", "sans-serif"],
      serif: ["Untitled Serif", "serif"],
      mono: ["Roboto mono", "monospace"],
    },

    fontSize: {
      10: ["calc(10 * 1rem / 16)", { lineHeight: "calc(12.51 * 1rem / 16)" }],
      11: ["calc(11 * 1rem / 16)", { lineHeight: "1.5" }],
      12: ["calc(12 * 1rem / 16)", { lineHeight: "1.2" }],
      13: ["calc(13 * 1rem / 16)", { lineHeight: "1.2" }],
      14: ["calc(14 * 1rem / 16)", { lineHeight: "1.2" }],
      15: ["calc(15 * 1rem / 16)", { lineHeight: "1.2" }],
      16: ["calc(16 * 1rem / 16)", { lineHeight: "1.2" }],
      18: ["calc(18 * 1rem / 16)", { lineHeight: "1.2" }],
      20: ["calc(20 * 1rem / 16)", { lineHeight: "1.3" }],
      22: ["calc(22 * 1rem / 16)", { lineHeight: "1.3" }],
      24: ["calc(24 * 1rem / 16)", { lineHeight: "1.3" }],
      25: ["calc(25 * 1rem / 16)", { lineHeight: "1.3" }],
      26: ["calc(26 * 1rem / 16)", { lineHeight: "1.2" }],
      28: ["calc(28 * 1rem / 16)", { lineHeight: "1.2" }],
      30: ["calc(30 * 1rem / 16)", { lineHeight: "1.2" }],
      32: ["calc(32 * 1rem / 16)", { lineHeight: "1.2" }],
      36: ["calc(36 * 1rem / 16)", { lineHeight: "1.2" }],
      38: ["calc(38 * 1rem / 16)", { lineHeight: "1.2" }],
      39: ["calc(39 * 1rem / 16)", { lineHeight: "1.2" }],
      40: ["calc(40 * 1rem / 16)", { lineHeight: "1.2" }],
      42: ["calc(42 * 1rem / 16)", { lineHeight: "1.2" }],
      48: ["calc(48 * 1rem / 16)", { lineHeight: "1.2" }],
      50: ["calc(50 * 1rem / 16)", { lineHeight: "1.2" }],
      52: ["calc(52 * 1rem / 16)", { lineHeight: "1.1" }],
      54: ["calc(54 * 1rem / 16)", { lineHeight: "1.1" }],
      60: ["calc(60 * 1rem / 16)", { lineHeight: "1.1" }],
      62: ["calc(62 * 1rem / 16)", { lineHeight: "1.1" }],
      64: ["calc(64 * 1rem / 16)", { lineHeight: "1.1" }],
    },
  },

  plugins: [require("@tailwindcss/typography")],
};
