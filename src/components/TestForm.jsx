import { useCheckEmail } from "../services/queries";

export const TestGet = () => {
  // const email = "Goomddawdawdawi@kurwa.com";
  const email = "Goomdi@kurwa.com";
  const emailExistsQuery = useCheckEmail(email);

  if (emailExistsQuery.isError) {
    console.log(emailExistsQuery.error.message);
  }

  if (emailExistsQuery.isSuccess) {
    console.log(emailExistsQuery.data.exists);
  }
};
