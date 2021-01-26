import React, { useContext, useState } from "react";
import MapContext from "../MapContext";

import createPdf from "./createPdf.js";

import { BiPrinter } from "react-icons/bi";
import Button from "react-bootstrap/Button";

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
            mapContext.mapLocation,
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

