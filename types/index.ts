export type Form = {
  id: string;
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
  id: string;
  createdAt: Date;
  formId: string;
  content: string;
};

export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  refreshToken?: string | null;
};

export interface FormWithRelations extends Form {
  FormSubmissions: FormSubmissions[];
}

export interface FormSubmissionsWithRelations extends FormSubmissions {
  form: Form;
}
