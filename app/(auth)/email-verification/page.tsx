import React from "react";
import Card from "@/components/card";
import FormHeading from "@/components/formHeading";
import ForgotPasswordEmailVerificationForm from "@/components/form/forgotPasswordEmailVerificationForm";

const EmailVerification = () => {
  return (
    <Card className="w-11/12 md:w-9/12 lg:w-5/12 mx-auto border-0 md:border md:border-[#303030] py-10 bg-transparent md:bg-[#161616] flex flex-col items-center justify-center">
      <div className="mb-8">
        <FormHeading
          title="Verification Code"
          subtitle="Let’s verify its you. Kindly enter your email"
        />
      </div>
      <ForgotPasswordEmailVerificationForm />
    </Card>
  );
};

export default EmailVerification;
