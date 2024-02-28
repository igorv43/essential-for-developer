import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Deposits() {
  return (
    <React.Fragment>
      <Title>New fixed price for MM</Title>
      <Typography component="p" variant="h4">
        $0.0252
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}></Typography>
      <div>
        <Link color="primary" href="#">
          FUNCTION A.
        </Link>
      </div>
    </React.Fragment>
  );
}
