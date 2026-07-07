import { useAppStore } from "../store/appStore";
import type { QuestionDto } from "../store/appStore";
import { getTelegramAuthHeaders } from "./telegramAuth";

const API_ORIGIN = "https://movie.brandservicebot24.ru";

export const getQuestions = async (limit = 3): Promise<QuestionDto[]> => {
  const url = new URL(`${API_ORIGIN}/api/get_questions/`);

  url.searchParams.set("limit", String(limit));

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      ...getTelegramAuthHeaders(),
    },
  });

  if (!response.ok) {
    throw new Error(`GET ${url.toString()} → HTTP ${response.status}`);
  }

  const data: QuestionDto[] = await response.json();

  const questions = Array.isArray(data) ? data : [];

  useAppStore.getState().setQuestions(questions);

  return questions;
};