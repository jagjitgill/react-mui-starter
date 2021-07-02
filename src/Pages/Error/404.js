import Typography from "@material-ui/core/Typography";
import React from "react";
import PageLayout from "../../Components/Core/PageLayout";

const Error404 = () => {
  return (
    <PageLayout>
      <Typography variant="h1">SORRY</Typography>
      <br />
      <Typography variant="h2">we couldn&rsquo;t find that page</Typography>
    </PageLayout>
  );
};

export default Error404;
