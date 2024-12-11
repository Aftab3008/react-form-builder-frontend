import { GetFormById } from "@/app/_actions/form";
import React from "react";
import FormBuilder from "../../_components/FormBuilder";

export default async function BuilderPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const form = await GetFormById(id);

  if (!form) {
    throw new Error("Form not found");
  }

  return <FormBuilder form={form} />;
}
