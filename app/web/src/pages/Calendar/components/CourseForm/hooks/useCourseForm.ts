import { useState } from "react"
import { useCourseStore } from "../../../../../store/courseStore";
import type { Color } from "../../../../../constants/colors-constant";

interface UseCourseFormProps {
    initialColor: Color;
    onClose: () => void;
}

const sanitizeCourseName = (name: string) => name.replace(/\s/g, '');
const capitalizeCourseName = (name: string) => name.toUpperCase();

export const useCourseForm = ({ initialColor, onClose }: UseCourseFormProps) => {
    const [courseName, setCourseName] = useState<string>('');
    const [selectedColor, setSelectedColor] = useState<Color>(initialColor);

    const { addCourse, selectCourse } = useCourseStore();

    const onCourseNameChange = (name: string) => {
        setCourseName(capitalizeCourseName(sanitizeCourseName(name)));
    }

    const onSelectColor = (color: Color) => {
        setSelectedColor(color);
    }

    const onCreateCourse = () => {
        const trimCourseName = sanitizeCourseName(courseName);
        const validCourseName = trimCourseName.length <= 150 && trimCourseName.length > 0;

        if (!validCourseName) return;

        const addedCourse = { id: crypto.randomUUID(), name: courseName, color: selectedColor };
        addCourse(addedCourse);
        selectCourse(addedCourse);
        onClose();
    }

    return {
        courseName,
        onCourseNameChange,
        selectedColor,
        onSelectColor,
        onCreateCourse
    }
}