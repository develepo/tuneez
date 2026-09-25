import { FastAverageColor } from "fast-average-color";

const fac = new FastAverageColor();

export type PhotoPalette = {
  primary: string;
  secondary: string;
  background: string;
  text: "#111111" | "#ffffff";
};

function rgbToHex(r: number, g: number, b: number) {
  return (
    "#" +
    [r, g, b]
      .map((value) =>
        Math.round(value)
          .toString(16)
          .padStart(2, "0")
      )
      .join("")
  );
}

function mix(
  color1: [number, number, number],
  color2: [number, number, number],
  amount: number
) {
  return color1.map(
    (value, index) =>
      value + (color2[index] - value) * amount
  ) as [number, number, number];
}

export async function getPhotoPalette(
  src: string
): Promise<PhotoPalette> {
  const image = new Image();

  image.crossOrigin = "anonymous";
  image.src = src;

  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () =>
      reject(new Error("Could not analyze image."));
  });

  const color = await fac.getColorAsync(image);

  const [r, g, b] = color.value;

  const base: [number, number, number] = [r, g, b];

  // Mix the photo color heavily toward white.
  // This gives us an atmosphere rather than
  // turning the entire website into the photo's color.
  const background = mix(base, [248, 248, 246], 0.88);

  // Slightly stronger version for accents.
  const accent = mix(base, [20, 20, 20], 0.18);

  const brightness =
    (r * 299 + g * 587 + b * 114) / 1000;

  return {
    primary: rgbToHex(...accent),
    secondary: rgbToHex(
      ...mix(base, [255, 255, 255], 0.35)
    ),
    background: rgbToHex(...background),
    text: brightness > 150 ? "#111111" : "#ffffff",
  };
}