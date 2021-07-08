import React from "react";
import Grid from "@material-ui/core/Grid";
import ContextChildOne from "./ContextChildOne";
import ContextChildTwo from "./ContextChildTwo";
import PageLayout from "../../../Components/Core/PageLayout";
import { ContextPOCContextProvider } from "./context";

function ContextPOC() {
  return (
    <PageLayout>
      <ContextPOCContextProvider>
        <Grid container>
          <Grid item xs={6}>
            <ContextChildOne />
          </Grid>
          <Grid item xs={6}>
            <ContextChildTwo />
          </Grid>
        </Grid>
      </ContextPOCContextProvider>
    </PageLayout>
  );
}

export default ContextPOC;
