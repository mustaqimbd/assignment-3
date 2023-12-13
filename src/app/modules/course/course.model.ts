import { Schema, model } from "mongoose";
import { TCourse, TDetails, TTags } from "./course.interface";

const tagsSchema = new Schema<TTags>({
    name: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
})
const detailsSchema = new Schema<TDetails>({
    level: { type: String, required: true },
    description: { type: String, required: true },
})

const courseSchema = new Schema<TCourse>({
    title: { type: String, required: true, unique: true },
    instructor: { type: String, required: true },
    categoryId: { type: Schema.Types.ObjectId, required: true },
    price: { type: Number, required: true, },
    tags: { type: [tagsSchema], required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    language: { type: String, required: true },
    provider: { type: String, required: true },
    durationInWeeks: { type: Number },
    details: { type: detailsSchema, required: true }
})

courseSchema.methods.toJSON = function () {
    const category = this.toObject()
    console.log(category)
    delete category.__v
    delete category.details._id
    category.tags = category.tags.map(({ _id, ...rest }) => rest);
    return category
}


export const CourseModel = model<TCourse>('Course', courseSchema)

