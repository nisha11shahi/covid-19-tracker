import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";

function InfoBox({ title, cases, total }) {
  return (
    <Card>
      <CardContent className="infoBox">
        {/* title */}

        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>
        {/* num of cases */}

        <h2 className="infoBox__cases">{cases}</h2>

        {/* total  */}
        <Typography className="infoBox__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;