// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { checkEmailExists, createNewNorm, createUser } from "./api";

// export function useCreateUser() {
//   return useMutation({
//     mutationKey: ["signup"],
//     mutationFn: (data) => createUser(data),
//     // onSettled: () => {
//     // },
//   });
// }

// export function useCreateNorm() {
//   const QueryClient = useQueryClient();
//   return useMutation({
//     mutationKey: ["createNorm"],
//     mutationFn: (data) => createNewNorm(data),
//     onPending: (_, variables) => {
//       console.log(variables);
//     },
//     onSettled: () => {
//       QueryClient.invalidateQueries("getAllNorms");
//     },
//   });
// }
