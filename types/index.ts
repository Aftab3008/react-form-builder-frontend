export type Form = {
  id: number;
  userId: string;
  createdAt: Date;
  published: boolean;
  name: string;
  description: string;
  content: string;
  visits: number;
  submissions: number;
  shareUrl: string;
};

export type FormSubmissions = {
  id: number;
  createdAt: Date;
  formId: number;
  content: string;
};

export interface FormWithRelations extends Form {
  FormSubmissions: FormSubmissions[];
}

export interface FormSubmissionsWithRelations extends FormSubmissions {
  form: Form;
}
