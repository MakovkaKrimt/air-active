import { Button } from '@mui/material'
import { useAllNorms } from '../services/queries'
import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { createNewNorm } from '../services/api'
import { useCreateNorm } from '../services/mutations'
// import { useCreateNorm } from '../services/mutations'

export const Norms = () => {

    const queryClient = useQueryClient()
    const allNormsQuery = useAllNorms()

    const createNewNormMutation = useCreateNorm()
    // const createNewNormMutation = useMutation({
    //     mutationKey: ['createNorm'],
    //     mutationFn: data => createNewNorm(data),
    //     onSettled: () => {
    //         queryClient.invalidateQueries('getAllNorms')
    //     }
    // })


    // if (allNormsQuery.isPending) {
    //     console.log('pending')
    // }

    // if (allNormsQuery.isError) {
    //     console.log(`Error: ${allNormsQuery.error}`)
    // }

    // if (allNormsQuery.isSuccess) {
    //     console.log(allNormsQuery.data)
    // }

    const handleOnClick = () => {
        const data = { name: 'Goomdi', resistivity: 0.12 }
        createNewNormMutation.mutate(data)

    }

    return (
        <>
            <Button
                variant='contained'
                onClick={handleOnClick}
            >Добавить новый</Button>
            {allNormsQuery.data?.data.map((item, index) => {
                return (
                    <p key={index}>{item.name}</p>
                )
            })}
        </>
    )
}

