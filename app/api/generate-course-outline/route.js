import { courseOutlineAIModel } from '@/configs/AiModel'
import { db } from '@/configs/db';
import { STUDY_MATERIAL_TABLE } from '@/configs/schema';
import { inngest } from '@/inngest/client';
import {NextResponse} from 'next/server'

export async function POST(req){

    const {courseId, topic, courseType, difficultyLevel, createdBy} = await req.json()
    //Generate course layout using ai
    const prompt = `Generate a study material for ${topic} for ${courseType} and level of difficulty will be ${difficultyLevel} with summary of course, List of chapters along with summary and Emoji icon for each chapter, Topic list in each chapter, all result in JSON format`
    const aiResp = await courseOutlineAIModel.sendMessage(prompt);
    const aiResult = JSON.parse(aiResp.response.text())

    // Save the result along with user input
    const dbResult = await db.insert(STUDY_MATERIAL_TABLE).values({
        courseId:courseId,
        courseType:courseType,
        topic:topic,
        difficultyLevel:difficultyLevel,
        courseLayout: aiResult,
        createdBy:createdBy
    }).returning({resp: STUDY_MATERIAL_TABLE})

    // Trigger the Inngest function to generate notes
    const result = await inngest.send({
        name: 'notes.generate',
        data: {
            course: dbResult[0].resp
        }
    });
    console.log('Inngest function triggered:', result)

    return NextResponse.json({result:dbResult[0]})
}