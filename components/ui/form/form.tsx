import React from "react";
import { FormProvider, UseFormMethods } from "react-hook-form";

interface Props {
  children: React.ReactNode;
  methods: Omit<UseFormMethods, "handleSubmit">;
  onSubmit: (data: any) => void;
  className?: string;
}

export const Form: React.FC<Props> = ({
  children,
  methods,
  onSubmit,
  ...props
}) => {
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} {...props}>
        {children}
      </form>
    </FormProvider>
  );
};
