import { Button, CircularProgress, Container, TextField, Typography } from "@mui/material";

import { SubmitHandler, useForm } from "react-hook-form";
import { useAddCategoryMutation } from "../../store/services/categoryApiSlice";
import UseCustomToast from "../../hooks/UseCustomToast";
type Category = {
    name: string;
    description: string;
}
const AddCategory = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Category>();
    const [addCategory] = useAddCategoryMutation();
    const onSubmit: SubmitHandler<Category> = (data: Category) => {
        UseCustomToast(addCategory(data), 'Adding Category');
    }



    return (
        <Container>
            <Typography variant="h6" fontWeight={600}>Add Category</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="Category Name"
                    placeholder="Enter category name"
                    {...register('name', { required: true })}
                    size="small"
                    error={errors.name ? true : false}
                    fullWidth
                />
                <TextField
                    sx={{ mt: 2 }}
                    label="Description"
                    placeholder="Enter description"
                    multiline

                    error={errors.description ? true : false}
                    minRows={4}
                    {...register('description', { required: true })}
                    fullWidth
                />
                <Button type="submit" variant="contained" sx={{ mt: 4, float: 'right' }} >
                    <CircularProgress sx={{ color: 'white', display: 'none' }} />
                    Add Category
                </Button>
                {/* <LoadingButton>dkfj</LoadingButton> */}
            </form>

        </Container>
    );
}

export default AddCategory;
