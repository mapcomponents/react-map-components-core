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
          if (!mapContext.mapLocation) {
            mapContext.setErrorMessage("Bitte suchen Sie zuerst nach einem Ort oder einer Adresse.");
            mapContext.setShowErrorMessage(true);
            return false;
          }
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

