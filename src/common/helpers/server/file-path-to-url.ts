import path from "path";

export const filePathToUrl = (
  filePath: string,
  options: { base?: string; absolute?: boolean }
) => {
  const fileName = path.basename(filePath, path.extname(filePath));
  const url = new URL(
    `${options.base ? `${options.base}/` : ""}${fileName}`,
    process.env.NEXT_PUBLIC_APP_URL
  );
  return options.absolute ? url.toString() : url.pathname;
};
