import { useAppStore } from "../store/appStore";
import type { ResultDto } from "../store/appStore";
import { getTelegramAuthHeaders } from "./telegramAuth";

const API_ORIGIN = "https://movie.brandservicebot24.ru";

export type SaveQuizPayload = {
  user_id: number;
  answers: number[];
};

export type SaveQuizResponse = ResultDto;

export const saveQuiz = async (
  payload: SaveQuizPayload,
): Promise<SaveQuizResponse> => {
  const response = await fetch(`${API_ORIGIN}/api/save_quiz/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getTelegramAuthHeaders(),
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`POST /api/save_quiz/ → HTTP ${response.status}`);
  }

  const data: SaveQuizResponse = await response.json();

  useAppStore.getState().setFinalResponse(data);

  return data;
};