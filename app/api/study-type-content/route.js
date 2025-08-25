
import { getPromptByStudyType } from "@/configs/AiPrompts";
import { db } from "@/configs/db";
import { STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { chapters, courseId, type } = await req.json();

  const prompt = getPromptByStudyType({ studyType: type, topics: chapters });
  console.log("Prompt: ", prompt);

  //Insert Record to DB, Update the status to Generating...

  const result = await db
    .insert(STUDY_TYPE_CONTENT_TABLE)
    .values({
      courseId: courseId,
      content: prompt,
      type: type,
    })
    .returning({ id: STUDY_TYPE_CONTENT_TABLE.id });

  // trigger the Inngest function to generate the content
  await inngest.send({
    name: "studyType.content.generate",
    data: {
      studyType: type,
      prompt: prompt,
      courseId: courseId,
      recordId: result[0].id,
    },
  });

  return NextResponse.json({ result: result[0].id });
}
