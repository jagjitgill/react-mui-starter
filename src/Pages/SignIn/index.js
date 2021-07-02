import React from "react";
import PageLayout from "../../Components/Core/PageLayout";
import SignInForm from "../../Components/SignInForm";

const SignIn = () => {
  const handleSignInFormSubmit = (username, password) => {
    alert(`Form submitted u: ${username} p: ${password}`);
  };

  return (
    <PageLayout>
      <SignInForm onFormSubmit={handleSignInFormSubmit} />
    </PageLayout>
  );
};
export default SignIn;
