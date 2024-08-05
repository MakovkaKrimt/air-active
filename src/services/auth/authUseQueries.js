import { useQuery } from "@tanstack/react-query";
import AuthAxiosQueries from "./authAxiosQueries";

export default class AuthUseQueries {
  static useCheckEmail = (email, isValid, isDirty) => {
    console.log(`Текущий имеил ${email}`);
    return useQuery({
      queryKey: ["checkEmail", email],
      queryFn: () => AuthAxiosQueries.checkEmailExists(email),
      enabled: !!isValid && !!email && !!isDirty,
    });
  };
}
