import { useAppStore } from "../store/appStore";
import type { QuestionDto } from "../store/appStore";
import { getTelegramAuthHeaders } from "./telegramAuth";

const API_ORIGIN = "https://movie.brandservicebot24.ru";

const formatImageUrl = (url: string | null): string | null => {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `${API_ORIGIN}${url.startsWith("/") ? "" : "/"}${url}`;
};

export const getQuestions = async (): Promise<QuestionDto[]> => {
  const url = new URL(`${API_ORIGIN}/api/get_questions/`);

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

  const rawQuestions = Array.isArray(data) ? data : [];

  const questions = rawQuestions.map((q) => ({
    ...q,
    image: formatImageUrl(q.image),
    answers: q.answers.map((a) => ({
      ...a,
      logo: formatImageUrl(a.logo),
    })),
  }));

  useAppStore.getState().setQuestions(questions);

  return questions;
};