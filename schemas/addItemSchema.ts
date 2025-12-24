import { z } from "zod";

const addItemSchema = z.object({
  name: z.string("Ingredient Name is required"),
  quantity: z.number("Quantity is required"),
});

export type AddItemFormData = z.infer<typeof addItemSchema>;

export default addItemSchema;
