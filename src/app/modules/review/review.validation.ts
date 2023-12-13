import { z } from 'zod';

export const reviewValidationSchema = z.object({
    courseId: z.string().min(1),
    rating: z.number().int().min(1).max(5),
    review: z.string().min(1),
});


