export type EmailSubscription = {
  email: string;
  subscribed: boolean;
};

export type AddEmailToListDTO = {
  subscription: EmailSubscription;
};
