import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import { useContext } from "react";
import { MMFixPriceContextType, context } from "./Context/MMFixPriceContext";

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Formula() {
  const { fixObj } = useContext(context) as MMFixPriceContextType;
  return (
    <React.Fragment>
      <Title>New fixed price for MM</Title>
      <Typography component="p" variant="h4">
        ${fixObj.price.toFixed(6)}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}></Typography>
      <div>
        <Link color="primary" href="#">
          FUNCTION {fixObj.formula}.
        </Link>
      </div>
    </React.Fragment>
  );
}
