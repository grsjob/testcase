import * as React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Card, CardActions, CardContent } from "@mui/material";

export default function Content() {
  return (
    <Paper sx={{ maxWidth: 936,
      margin: "auto",
      overflow: "hidden" }}>
      <Card className='component__card'>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Word of the Day
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    adjective
          </Typography>
          <Typography variant="body2">
                    well meaning and kindly.
            <br />
            {"\"a benevolent smile\""}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Paper>
  );
}