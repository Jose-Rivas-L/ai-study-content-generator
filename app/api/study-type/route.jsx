import { db } from "@/configs/db";
import { CHAPTER_NOTES_TABLE, STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
    const {courseId, studyType} = await req.json();
    //TODO: refactor code to improve readability and maintainability by aplying factories or services
    if(studyType == 'ALL'){
        const notes = await db.select().from(CHAPTER_NOTES_TABLE)
        .where(eq(CHAPTER_NOTES_TABLE?.courseId, courseId))

        // Get all the other study type records
        const studyTypeContent = await db.select().from(STUDY_TYPE_CONTENT_TABLE)
        .where(eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId))

        const flashcards = studyTypeContent.find(item => item.type === 'flashcard').content
        const quiz = studyTypeContent.find(item => item.type === 'Quiz').content
        const result ={
            notes: notes,
            flashcard:flashcards,
            quiz:quiz,
            qa:null
        }

        return NextResponse.json({ result: result });
    }
    else if(studyType == 'notes'){
        const notes = await db.select().from(CHAPTER_NOTES_TABLE)
        .where(eq(CHAPTER_NOTES_TABLE?.courseId, courseId))

        return NextResponse.json(notes);
    }
    else{
        const studyTypeContent = await db.select().from(STUDY_TYPE_CONTENT_TABLE)
        .where(and(eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId), 
        eq(STUDY_TYPE_CONTENT_TABLE.type, studyType)))
        return NextResponse.json(studyTypeContent[0]);
    }

}