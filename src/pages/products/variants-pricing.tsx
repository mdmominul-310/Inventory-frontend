/* eslint-disable @typescript-eslint/no-explicit-any */
import { Delete } from "@mui/icons-material";
import { Autocomplete, Box, Button, FilledTextFieldProps, IconButton, OutlinedTextFieldProps, Paper, StandardTextFieldProps, Switch, TextField, TextFieldVariants, Typography, createFilterOptions } from "@mui/material"
import { useEffect, useState } from "react";
import { JSX } from "react/jsx-runtime";

const filter = createFilterOptions<{ title: string; label: string }>();

export type IAttribute = {
    name: string;
    enable?: boolean;
    values: Array<{ label: string; title: string }>;
}
const VariantsPricing = ({
    register,
    setValue,
    getValues,
    errors
}:
    {
        register: any,
        setValue: any,
        getValues: any,
        errors: any
    }
) => {
    const [attributes, setAttributes] = useState<IAttribute[]>([
        {
            name: "Color",
            enable: false,
            values: [
                { label: "Red", title: "Red" },
            ]
        },
        {
            name: "Universal",
            enable: true,
            values: [
                { label: "Universal", title: "Universal" }
            ]
        }

    ]);
    const [applyData, setApplyData] = useState<{ regularPrice?: string; salePrice?: string; quantity?: string; sku: string }>({ sku: "" });
    const enabledAttributes = attributes.filter((attribute) => attribute.enable);

    const combinedValues = enabledAttributes.reduce((acc: { title: string; label: string, values?: [{ title: string, label: string }] }[], attribute) => {
        if (acc.length === 0) {
            return attribute.values.map((value) => (value));
        }
        const newAcc: { title: string; label: string }[] = []; // Add type annotation for newAcc array
        acc.forEach((accItem: { title: string; label: string; values?: [{ label: string; title: string }] }) => {
            attribute.values.forEach((value) => {
                newAcc.push({ title: accItem.label + ">>" + value.label, label: accItem.label + ">>" + value.label });
            });
        });
        return newAcc;

    }, []);




    const handleApply = () => {
        const stock = getValues("stock") || [];
        const newStock = stock.map((stockItem: { variant: string; quantity: string; salePrice: string; regularPrice: string; sku: string }) => {
            stockItem.quantity = applyData.quantity as string;
            stockItem.salePrice = applyData.salePrice as string;
            stockItem.regularPrice = applyData.regularPrice as string;
            stockItem.sku = applyData.sku + stockItem.variant as string;

            return {
                ...stockItem,
            }
        });
        setValue("stock", newStock);
    }
    const handleData = (e: any) => {
        const { name, value } = e.target;
        setApplyData((prev) => ({
            ...prev,
            [name]: value
        } as { regularPrice?: string; salePrice?: string; quantity?: string; sku: string }));
    }

    // this use effect uses for update attributes when no attributes available then add one attributes name universal and when enable one attributes then disable universal attributes
    useEffect(() => {
        if (enabledAttributes.length === 0) {
            setAttributes([
                {
                    name: "Color",
                    enable: false,
                    values: [
                        { label: "Red", title: "Red" },
                    ]
                },
                {
                    name: "Universal",
                    enable: true,
                    values: [
                        { label: "Universal", title: "Universal" }
                    ]
                }
            ]);

        }
        if (enabledAttributes.length > 1) {
            const newAttributes = [...attributes];
            newAttributes.map((attribute) => {
                if (attribute.name === "Universal") {
                    attribute.enable = false;
                }
            }
            )
            setAttributes(newAttributes);
        }
    }
        , [attributes, enabledAttributes]);

    // set stock label
    useEffect(() => {
        const stock = getValues("stock") || [];
        const newStock = combinedValues.map((value, index) => {
            const stockItem = stock[index] || {};
            return {
                ...stockItem,
                variant: value.label
            }
        });

        setValue("stock", newStock);
    }
        , [combinedValues, getValues, setValue]);

    /// set attributes values to hooks forom
    useEffect(() => {
        setValue("attributes", attributes);
    }
        , [attributes, getValues, setValue]);
    return (
        <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" fontSize={15}>Stock,Variants and Pricing</Typography>
            <Box>
                {
                    attributes.map((attribute, index) => (
                        <Box key={index}>
                            <Box key={index} sx={{ my: 2, gap: 4, display: attribute.name === 'Universal' && !attribute.enable ? 'none' : 'flex' }}>
                                <TextField
                                    sx={{ width: "20%" }}
                                    label={attribute.name}
                                    placeholder="Enter your attributes name"
                                    onChange={(e: any) => {
                                        const newAttributes = [...attributes];
                                        newAttributes[index].name = e.target.value;
                                        setAttributes(newAttributes);
                                    }
                                    }
                                    disabled={!attribute.enable}
                                    variant="outlined"
                                    size="small"
                                />

                                <Autocomplete
                                    sx={{ width: "60%" }}
                                    multiple
                                    filterOptions={(options: Array<{ title: string; label: string; }>, params: { inputValue: any; getOptionLabel: (option: { title: string; label: string; }) => string; }) => {
                                        const filtered = filter(options, params);
                                        const { inputValue } = params;
                                        // Suggest the creation of a new value
                                        const isExisting = options.some((option) => inputValue === option.title);
                                        if (inputValue !== '' && !isExisting) {
                                            filtered.push({
                                                label: inputValue,
                                                title: inputValue,
                                            });
                                        }
                                        return filtered as Array<{ title: string; label: string; }>; // Specify the return type as an array of objects with the properties 'title' and 'label'
                                    }}

                                    // value={getValues("tags") || []}
                                    value={attributes[index].values}
                                    size="small"
                                    onChange={(_event: any, value: any) => {
                                        const newAttributes = [...attributes];
                                        newAttributes[index].values = value;
                                        setAttributes(newAttributes);
                                    }}
                                    disabled={!attribute.enable}
                                    options={attributes[index].values}
                                    getOptionLabel={(option: { label: string; }) => option.label}
                                    renderInput={(params: JSX.IntrinsicAttributes & { variant?: TextFieldVariants | undefined; } & Omit<FilledTextFieldProps | OutlinedTextFieldProps | StandardTextFieldProps, "variant">) => <TextField {...params} label={attribute.name} size="small" />}
                                />
                                <IconButton
                                    onClick={() => {
                                        const newAttributes = [...attributes];
                                        newAttributes.splice(index, 1);
                                        setAttributes(newAttributes);
                                    }
                                    }
                                    disabled={attribute.name === 'Universal' || attribute.name === 'Color'}
                                >
                                    <Delete color={
                                        attribute.name === 'Universal' || attribute.name === 'Color' ? 'disabled' : 'error'

                                    } />
                                </IconButton>

                                <Switch
                                    checked={attributes[index].enable}
                                    onChange={(e: any) => {
                                        const newAttributes = [...attributes];
                                        newAttributes[index].enable = e.target.checked;
                                        setAttributes(newAttributes);
                                    }}
                                />
                            </Box>

                        </Box>
                    ))
                }
                <Button
                    variant="contained"
                    onClick={() => {
                        const newAttributes = [...attributes];
                        newAttributes.push({
                            name: "",
                            enable: true,
                            values: []
                        });
                        setAttributes(newAttributes);
                    }}
                >
                    Add Attributes
                </Button>
            </Box>
            {/* apply all form data to all variants */}
            <Box sx={{ my: 1 }}>
                <Typography variant="h6" fontSize={15}>Stock and Price</Typography>

                <Box sx={{ my: 2, display: 'flex', gap: 4 }}>

                    <TextField
                        sx={{ width: "30%" }}
                        label="Regular Price"
                        placeholder="Enter your price"
                        variant="outlined"
                        size="small"
                        name="regularPrice"
                        onChange={handleData}



                    />
                    <TextField
                        sx={{ width: "30%" }}
                        label="Sale Price"
                        placeholder="Enter your price"
                        variant="outlined"
                        size="small"
                        name="salePrice"
                        onChange={handleData}
                    />
                    <TextField
                        sx={{ width: "20%" }}
                        label="Stock"
                        placeholder="Enter your stock"
                        variant="outlined"
                        size="small"
                        name="quantity"
                        onChange={handleData}
                    />
                    <TextField
                        sx={{ width: "20%" }}
                        label="SKU"
                        placeholder="Enter your SKU"
                        variant="outlined"
                        size="small"
                        name="sku"
                        onChange={handleData}
                    />
                    <Button
                        sx={{ width: "20%" }}
                        variant="contained"
                        onClick={handleApply}
                    >
                        Apply to all
                    </Button>
                </Box>



                {
                    combinedValues.map((value, index) => (
                        <Box key={index} sx={{ my: 2, display: 'flex', gap: 4 }}>
                            <TextField
                                sx={{ width: "20%" }}
                                label={value.label}
                                value={value.label}
                                // placeholder="Enter your variant name"
                                variant="outlined"
                                size="small"
                                disabled
                                error={errors?.stock?.[index] ? true : false}
                                {...register(`stock[${index}].variant`, { required: true })}
                            />
                            <TextField
                                sx={{ width: "60%", }}
                                label="Regular Price"
                                focused
                                variant="outlined"
                                size="small"
                                error={errors?.stock?.[index].regularPrice ? true : false}
                                {...register(`stock[${index}].regularPrice`, { required: true })}
                            />
                            <TextField
                                sx={{ width: "60%" }}
                                focused
                                label="Sale Price"
                                placeholder="Enter your price"
                                variant="outlined"
                                size="small"
                                error={errors.stock?.[index].salePrice ? true : false}
                                {...register(`stock[${index}].salePrice`, { required: true })}
                            />
                            <TextField
                                sx={{ width: "20%" }}
                                focused
                                label="Stock"
                                placeholder="Enter your stock"
                                variant="outlined"
                                size="small"
                                error={errors.stock?.[index].quantity ? true : false}
                                {...register(`stock[${index}].quantity`, { required: true })}
                            />
                            <TextField
                                sx={{ width: "20%" }}
                                focused
                                label="SKU"
                                placeholder="Enter your SKU"
                                variant="outlined"
                                size="small"
                                error={errors.stock?.[index].sku ? true : false}
                                {...register(`stock[${index}].sku`, { required: true })}
                            />
                        </Box>
                    ))
                }
            </Box>

        </Paper >
    )
}

export default VariantsPricing