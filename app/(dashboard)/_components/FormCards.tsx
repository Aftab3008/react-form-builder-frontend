import { GetForm } from "@/app/_actions/form";
import React from "react";
import FormCard from "./FormCard";
import { Form } from "@/types";

export default async function FormCards() {
  const form = await GetForm();

  return (
    <>
      {form.map((form: Form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
}
