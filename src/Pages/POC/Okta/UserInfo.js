import React, { useState } from "react";
import { Typography, Paper, Button } from "@material-ui/core";
import config from "./config";

export default function UserInfo() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchInfo = () => {
    setLoading(true);
    fetch(`${config.oktaInstance.baseUrl}/api/v1/users/me`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setUserInfo(data);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        disabled={loading || !!userInfo}
        onClick={() => fetchInfo()}
      >
        Fetch user info
      </Button>
      <Typography>
        {loading ? "Loading user information..." : "User info:"}
      </Typography>
      <Paper>
        <pre>{JSON.stringify(userInfo, undefined, 2)}</pre>
      </Paper>
    </div>
  );
}
