"use client"; // this is a client component

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const App = () => {
  const [gradientType, setGradientType] = useState("linear");
  const [gradientDirection, setGradientDirection] = useState(0);
  const [colorPoints, setColorPoints] = useState([
    { color: "rgba(255, 0, 0, 1)", opacity: 1 },
    { color: "rgba(0, 255, 0, 1)", opacity: 1 },
  ]);
  const router = useRouter();
  const [copySuccess, setCopySuccess] = useState("Copy CSS code");

  function hexToRgba(hex, opacity) {
    hex = hex.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  const handleGradientTypeChange = (e) => {
    console.log(e.target.value, "e.target.value");
    setGradientType(e.target.value);
  };

  const handleGradientDirectionChange = (e) => {
    console.log(e.target.value, "value");
    setGradientDirection(e.target.value);
  };

  const handleAddColorPoint = () => {
    setColorPoints([
      ...colorPoints,
      { color: "rgba(255, 255, 255, 1)", opacity: 1 },
    ]);
  };

  const handleRemoveColorPoint = (index) => {
    const newColorPoints = [...colorPoints];
    newColorPoints.splice(index, 1);
    setColorPoints(newColorPoints);
  };

  const handleColorPointChange = (index, color) => {
    const newColorPoints = [...colorPoints];
    newColorPoints[index].color = hexToRgba(color, colorPoints[index].opacity);
    setColorPoints(newColorPoints);
  };

  const handleOpacityChange = (index, opacity) => {
    const newColorPoints = [...colorPoints];
    newColorPoints[index].opacity = opacity;
    setColorPoints(newColorPoints);
  };

  const gradientString = colorPoints
    .map(({ color, opacity }) => `${color.replace("1)", `${opacity})`)}`)
    .join(", ");

  const cssString = `background-image: ${gradientType}-gradient(${
    gradientType === "radial" ? "circle" : gradientDirection + "deg"
  }  ,  ${gradientString});`;

  const copyToClipboard = () => {
    const cssString = `background-image: ${gradientType}-gradient(${
      gradientType === "radial" ? "circle" : gradientDirection + "deg"
    }  ,  ${gradientString});`;
    navigator.clipboard.writeText(cssString);
    setCopySuccess("Copied!");
    setTimeout(() => {
      setCopySuccess("Copy CSS code");
    }, 3000);
  };

  const handleDownloadSVG = (gradientType) => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
      <defs>
        <${gradientType}Gradient id="gradient" style="display:block;transform(rotate(${
      gradientDirection + "deg"
    }))"   gradientTransform="${
      gradientType === "radial" ? "" : `rotate(${gradientDirection + "deg"})`
    }">
          ${colorPoints
            .map(
              ({ color, opacity }, index) =>
                `<stop offset="${
                  index / (colorPoints.length - 1)
                }" stop-color="${color}" stop-opacity="${opacity}" />`
            )
            .join("\n")}
        </${gradientType}Gradient>
      </defs>
      <rect x="0" y="0" width="600" height="600" fill="url(#gradient)" />
    </svg>`;

    const link = document.createElement("a");
    link.download = `gradient-${gradientType}.svg`;
    link.href = "data:image/svg+xml," + encodeURIComponent(svg);
    link.click();
  };

  return (
    <main
      className={`min-h-screen h-full md:p-20 p-4 md:flex flex-col md:overflow-hidden overflow-x-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black`}
    >
      <div className={`flex flex-grow sm:flex-row flex-col rounded-2xl gap-6`}>
        <div className="w-full h-60 sm:h-auto flex items-center justify-center sm:order-2">
          <div
            className="gradient-preview h-full w-full border border-slate-700 rounded-2xl  sticky top-0"
            style={{
              backgroundImage: `${gradientType}-gradient(${
                gradientType === "radial" ? "circle" : gradientDirection + "deg"
              }  ,  ${gradientString})`,
            }}
          ></div>
        </div>

        <div className="md:w-[380px] flex flex-col p-4 bg-opacity-25 rounded-2xl  backdrop-blur-3xl bg-slate-600 text-white border border-slate-700 sm:order-1">
          <div className="controls">
            <div
              className="control grid grid-cols-2 rounded-xl my-5 border border-slate-700"
              x-data="app"
            >
              <div>
                <input
                  onClick={handleGradientTypeChange}
                  defaultValue={"linear"}
                  type="radio"
                  name="gradient-type-select"
                  id="1"
                  className="peer hidden"
                  checked={gradientType === "linear"}
                />
                <label
                  for="1"
                  className="block cursor-pointer select-none rounded-xl rounded-r-none p-2 text-center bg-white bg-opacity-5 border border-slate-700   transition duration-200   peer-checked:bg-gradient-to-r from-purple-500 to-pink-500  peer-checked:text-white"
                >
                  Linear
                </label>
              </div>

              <div>
                <input
                  onClick={handleGradientTypeChange}
                  defaultValue={"radial"}
                  type="radio"
                  name="gradient-type-select"
                  id="2"
                  className="peer hidden"
                  checked={gradientType === "radial"}
                />
                <label
                  for="2"
                  className="block cursor-pointer select-none rounded-xl rounded-l-none p-2 text-center  bg-white bg-opacity-5 border border-slate-700  transition duration-200  peer-checked:bg-gradient-to-r from-purple-500 to-pink-500  peer-checked:text-white"
                >
                  Radial
                </label>
              </div>
            </div>
            {gradientType !== "radial" && (
              <div className="control">
                <label
                  htmlFor="gradient-direction-select"
                  className="text-sm text-slate-500"
                >
                  Gradient angle, deg
                </label>
                <div className="flex items-center">
                  <input
                    id="gradient-direction-select"
                    className="w-full h-1  appearance-none rounded-md bg-white bg-opacity-5 border border-slate-700"
                    type="range"
                    min={0}
                    max={360}
                    value={gradientDirection}
                    onChange={(e) => handleGradientDirectionChange(e)}
                  />
                  <div className="ml-5">
                    <input
                      type={"text"}
                      className="font-medium text-sm p-2 w-10 text-center h-full flex items-center justify-start rounded-md bg-white bg-opacity-5 border border-slate-700 outline-none focus:outline-none"
                      value={gradientDirection}
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="color-points mt-5 overflow-hidden">
              <div className="mb-3 flex items-center justify-between">
                <label className="text-sm text-slate-500">Color</label>
              </div>
              <div className="max-h-60 overflow-auto mb-5">
                {colorPoints.map((colorPoint, index) => (
                  <div
                    key={index}
                    className="color-point flex items-center justify-between mb-5"
                  >
                    <div
                      style={{ backgroundColor: colorPoint.color }}
                      className={`h-10 w-10 border-0 outline-none rounded-lg cursor-pointer`}
                    >
                      <input
                        className="h-10 w-10 border-0 bg-transparent outline-none rounded-lg opacity-0 cursor-pointer"
                        type="color"
                        value={colorPoint.color}
                        onChange={(e) =>
                          handleColorPointChange(index, e.target.value)
                        }
                      />
                    </div>
                    <div className="px-2 flex">
                      <input
                        className="w-full h-1  appearance-none rounded-md bg-white bg-opacity-5 border border-slate-700"
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={colorPoint.opacity}
                        onChange={(e) =>
                          handleOpacityChange(index, e.target.value)
                        }
                      />
                    </div>
                    <div className="">
                      <input
                        type={"text"}
                        className="font-medium text-sm p-2 w-10 text-center h-full flex items-center justify-start rounded-md bg-white bg-opacity-5 border border-slate-700 outline-none focus:outline-none"
                        value={colorPoint.opacity}
                      />
                    </div>
                    <button
                      className="ml-5 text-xs inline-block rounded bg-white bg-opacity-5 border border-slate-700 transition duration-200 w-8 h-8 font-medium text-white focus:outline-none hover:bg-red-800 focus:ring active:border-red-800"
                      onClick={() => handleRemoveColorPoint(index)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddColorPoint}
            className="w-full text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-5"
          >
            Add Color
          </button>
          <div className="w-full max-h-28 flex-1 text-sm focus:border-none focus:outline-none p-2 rounded-xl resize-none scroll-small overflow-y-auto bg-transparent  bg-white bg-opacity-5 mb-5">
            {cssString}
          </div>
          <button
            type="button"
            onClick={copyToClipboard}
            className="mt-auto w-full text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-5"
          >
            {copySuccess}
          </button>
          {/* <button type="button" onClick={() => handleDownloadSVG(gradientType)} className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-5">
          Download SVG
        </button> */}
        </div>
      </div>
    </main>
  );
};

export default App;
