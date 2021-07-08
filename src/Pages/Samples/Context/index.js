import React from "react";
import Grid from "@material-ui/core/Grid";
import ContextChildOne from "./ContextChildOne";
import ContextChildTwo from "./ContextChildTwo";
import PageLayout from "../../../Components/Core/PageLayout";
import { SampleContextProvider } from "./context";

function ContextSample() {
  return (
    <PageLayout>
      <SampleContextProvider>
        <Grid container>
          <Grid item xs={6}>
            <ContextChildOne />
          </Grid>
          <Grid item xs={6}>
            <ContextChildTwo />
          </Grid>
        </Grid>
      </SampleContextProvider>
    </PageLayout>
  );
}

export default ContextSample;
