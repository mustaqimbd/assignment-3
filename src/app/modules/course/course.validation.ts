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


const updateTags = z.object({
    name: z.string().min(1).optional(),
    isDeleted: z.boolean().optional()
});

const updateDetails = z.object({
    level: z.string().min(1).optional(),
    description: z.string().min(1).optional()
});

export const updateCourseDataValidationSchema = z.object({
    title: z.string().min(1).optional(),
    instructor: z.string().min(1).optional(),
    categoryId: z.string().min(1).optional(),
    price: z.number().min(1).optional(),
    tags: z.array(updateTags).min(1).optional(),
    startDate: z.string().min(1).optional(),
    endDate: z.string().min(1).optional(),
    language: z.string().min(1).optional(),
    provider: z.string().min(1).optional(),
    details: updateDetails.optional()
});

