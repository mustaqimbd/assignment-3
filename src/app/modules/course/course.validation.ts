import { z } from "zod";

const tags = z.object({
    name: z.string().min(1),
    isDeleted: z.boolean().optional()
})

const details = z.object({
    level: z.string().min(1),
    description: z.string().min(1)
})


export const courseDataValidationSchema = z.object({
    title: z.string().min(1),
    instructor: z.string().min(1),
    categoryId: z.string().min(1),
    price: z.number().min(1),
    tags: z.array(tags).min(1),
    startDate: z.string().min(1),
    endDate: z.string().min(1),
    language: z.string().min(1),
    provider: z.string().min(1),
    details: details
})

