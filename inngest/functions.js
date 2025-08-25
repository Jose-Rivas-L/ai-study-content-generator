import {
  CHAPTER_NOTES_TABLE,
  STUDY_MATERIAL_TABLE,
  STUDY_TYPE_CONTENT_TABLE,
  USER_TABLE,
} from "@/configs/schema";
import { inngest } from "./client";
import { db } from "@/configs/db";
import { eq } from "drizzle-orm";
import {
  generateNotesAiModel,
  generateQuizAiModel,
  generateStudyTypeContentAiModel,
} from "@/configs/AiModel";

// Map studyType to the corresponding AI model
const aiModels = {
  flashcard: generateStudyTypeContentAiModel,
  Quiz: generateQuizAiModel,
};

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

export const CreateNewUser = inngest.createFunction(
  { id: "create-user" },
  { event: "user.create" },
  async ({ event, step }) => {
    const { user } = event.data;
    //Get event data
    const result = await step.run(
      "Check user and create a new one if does not exist in db",
      async () => {
        //check is user already exist
        const result = await db
          .select()
          .from(USER_TABLE)
          .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));

        //if not, then add to db
        if (result?.length == 0) {
          const userResponse = await db
            .insert(USER_TABLE)
            .values({
              name: user?.fullName,
              email: user?.primaryEmailAddress?.emailAddress,
            })
            .returning({ id: USER_TABLE.id });

          return userResponse;
        }
        return result;
      }
    );

    return "Success";
  }

  //Step: send welcome email notification

  //Step: Send email notification after 3 days once user joined
);

export const GenerateNotes = inngest.createFunction(
  { id: "generate-notes" },
  { event: "notes.generate" },
  async ({ event, step }) => {
    const { course } = event.data;

    // Generate notes for each chapter using AI
    const notesResult = await step.run("Generate chapter notes", async () => {
      const chapters = course?.courseLayout?.chapters;
      let index = 0;
      chapters.forEach(async (chapter) => {
        const prompt =
          "Generate exam material detail content for each chapter. Make sure to include all topic points in the content, make sure to give only the content in HTML(do not add HTML, Head, Body, title tag) the response should have only the html content(do not add the content within a json or another format, just the html) , The chapters: " +
          JSON.stringify(chapter);
        const result = await generateNotesAiModel.sendMessage(prompt);
        const aiResponse = result?.response.text();

        await db.insert(CHAPTER_NOTES_TABLE).values({
          chapterId: index,
          courseId: course?.courseId,
          notes: aiResponse,
        });
        index++;
        return "Completed";
      });
    });

    // Update Status to 'Ready'
    const updateCourseStatusResult = await step.run(
      "Update course status To Ready",
      async () => {
        const result = await db
          .update(STUDY_MATERIAL_TABLE)
          .set({ status: "Ready" })
          .where(eq(STUDY_MATERIAL_TABLE.courseId, course?.courseId));
        return "Success";
      }
    );
  }
);

// Used to generate quiz, flashcard, qa content for each chapter
export const GenerateStudyTypeContent = inngest.createFunction(
  { id: "generate study type content" },
  { event: "studyType.content.generate" },
  async ({ event, step }) => {
    const { studyType, prompt, chapterId, recordId } = event.data;

    const course = await db.select().from(STUDY_MATERIAL_TABLE);

    const aiModel = aiModels[studyType];
    if (!aiModel) {
      throw new Error(`Unsupported studyType: ${studyType}`);
    }

    // Generate study content for the chapter using the selected AI model
    const aiResult = await step.run(
      "Generating study type content",
      async () => {
        const result = await aiModel.sendMessage(prompt);
        const AIResult = JSON.parse(result?.response.text());
        return AIResult;
      }
    );

    // save the result to db

    const dbResult = await step.run(
      "Saving study type content to db",
      async () => {
        const result = await db
          .update(STUDY_TYPE_CONTENT_TABLE)
          .set({
            content: aiResult,
            status: "Ready",
          })
          .where(eq(STUDY_TYPE_CONTENT_TABLE.id, recordId));

        return "Success";
      }
    );
  }
);
