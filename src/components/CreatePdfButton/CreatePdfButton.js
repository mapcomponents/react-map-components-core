import React, { useContext, useState } from "react";
import MapContext from "../MapContext";

import createPdf from "./createPdf.js";

import { BiPrinter } from "react-icons/bi";
import Button from "react-bootstrap/Button";

/**
 * CreatePdfButton returns a Button that will create a PDF version of the current map view (dimensions adjusted to fit Din A4 Paper).
 * It expects a MapLibre-gl instance accessible in mapContext.map.
 */
const CreatePdfButton = () => {
  const mapContext = useContext(MapContext);

  return (
    <>
      <Button
        variant="light"
        onClick={() => {
          mapContext.setLoadingMsg("Erzeuge Pdf");
          createPdf(
            mapContext.map,
            mapContext.setLoading
          );
        }}
      >
        <BiPrinter></BiPrinter>
      </Button>
    </>
  );
};

export default CreatePdfButton;
