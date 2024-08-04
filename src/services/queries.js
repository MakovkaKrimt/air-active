// import { useQuery } from "@tanstack/react-query";
// import { checkEmailExists, getAllNorms } from "./api";

// export const useCheckEmail = (email) => {
//   return useQuery({
//     queryKey: ["checkEmail", email],
//     queryFn: () => checkEmailExists(email),
//     enabled: !!email,
//   });
// };

// export function useAllNorms() {
//   return useQuery({
//     queryKey: ["getAllNorms"],
//     queryFn: getAllNorms,
//     refetchOnWindowFocus: false,
//   });
// }
